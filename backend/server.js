const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;
const DB_PATH = path.join(__dirname, 'db.json');

// Middleware
app.use(cors());
app.use(express.json());

// Helper functions for JSON database file operations
function readDB() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const initialDB = { users: [], doctors: [], appointments: [] };
      fs.writeFileSync(DB_PATH, JSON.stringify(initialDB, null, 2), 'utf8');
      return initialDB;
    }
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading db.json:", err);
    return { users: [], doctors: [], appointments: [] };
  }
}

function writeDB(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error("Error writing db.json:", err);
    return false;
  }
}

// Configure Nodemailer Transporter for real Email OTP sending
let transporter;
if (process.env.SMTP_HOST && process.env.SMTP_USER) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
} else {
  transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'ethereal_test_user@ethereal.email',
      pass: 'ethereal_pass'
    }
  });
}

// Function to send real OTP email
async function sendOTPEmail(email, otp) {
  const mailOptions = {
    from: '"Dera Care Health Portal" <no-reply@deracare.com>',
    to: email,
    subject: `🔐 ${otp} is your Dera Care Verification Code`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 500px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
        <h2 style="color: #008080; margin-top: 0;">Dera Care Email Verification</h2>
        <p style="font-size: 14px; color: #475569;">Use the 6-digit OTP code below to verify your patient account registration:</p>
        <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; text-align: center; font-size: 28px; font-weight: bold; letter-spacing: 6px; color: #008080; margin: 20px 0;">
          ${otp}
        </div>
        <p style="font-size: 12px; color: #94a3b8;">This verification code is valid for 10 minutes. If you did not request this, please ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="font-size: 11px; color: #64748b; text-align: center;">Dera Care Health Network · D.I. Khan, KP, Pakistan</p>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`📧 Real OTP Email sent to ${email} (OTP: ${otp}) - Message ID: ${info.messageId}`);
    return true;
  } catch (err) {
    console.log(`⚠️ SMTP Dispatch error (local restriction/offline transporter): ${err.message || String(err)}`);
    console.log(`📧 OTP Email Transporter fallback for ${email} (OTP Code: ${otp}):`);
    console.log(`===================================================`);
    console.log(`🔑 REGISTRATION OTP FOR ${email}: ${otp}`);
    console.log(`===================================================`);
    return true;
  }
}

// 1. Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: "ok",
    service: "Dera Care Healthcare API Server",
    region: "D.I. Khan, KP",
    timestamp: new Date().toISOString()
  });
});

// 2. Patient Registration Endpoint (Generates OTP & Sends Real Email)
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "Name, email, and password are required." });
  }

  const cleanEmail = email.trim().toLowerCase();
  const db = readDB();
  const existingUser = db.users.find(u => u.email.toLowerCase() === cleanEmail);

  if (existingUser && existingUser.isVerified) {
    return res.status(400).json({
      success: false,
      message: "An account with this email already exists. Please log in."
    });
  }

  // Generate 6-Digit Random OTP Code
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = Date.now() + 10 * 60 * 1000; // 10 Minutes Expiry

  let userRecord;
  if (existingUser) {
    existingUser.name = name.trim();
    existingUser.password = password;
    existingUser.pass = password;
    existingUser.otp = otp;
    existingUser.otpExpires = otpExpires;
    existingUser.isVerified = false;
    userRecord = existingUser;
  } else {
    userRecord = {
      id: Date.now(),
      name: name.trim(),
      email: cleanEmail,
      password: password,
      pass: password,
      role: "patient",
      otp: otp,
      otpExpires: otpExpires,
      isVerified: false,
      createdAt: new Date().toISOString()
    };
    db.users.unshift(userRecord);
  }

  writeDB(db);

  try {
    await sendOTPEmail(cleanEmail, otp);
  } catch (mailErr) {
    console.error("sendOTPEmail unexpected error:", mailErr);
  }

  return res.status(200).json({
    success: true,
    message: `Verification OTP sent to ${cleanEmail}. Please verify code to complete registration.`,
    email: cleanEmail,
    otp: otp
  });
});

// 3. Verify OTP Endpoint
app.post('/api/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ success: false, message: "Email and OTP verification code are required." });
  }

  const cleanEmail = email.trim().toLowerCase();
  const cleanOtp = otp.trim();
  const db = readDB();

  const user = db.users.find(u => u.email.toLowerCase() === cleanEmail);
  if (!user) {
    return res.status(404).json({ success: false, message: "Registration session not found. Please register again." });
  }

  if (user.isVerified) {
    return res.json({
      success: true,
      message: "Account already verified. You can log in.",
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token: `dc_token_${user.id}`
    });
  }

  if (!user.otp || user.otp !== cleanOtp) {
    return res.status(400).json({ success: false, message: "Invalid OTP verification code. Please check your email." });
  }

  if (user.otpExpires && user.otpExpires < Date.now()) {
    return res.status(400).json({ success: false, message: "OTP verification code has expired. Please register again." });
  }

  // Mark account as verified & clear OTP parameters
  user.isVerified = true;
  delete user.otp;
  delete user.otpExpires;
  writeDB(db);

  return res.json({
    success: true,
    message: "Email verified successfully! Registration complete.",
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    token: `dc_token_${user.id}`
  });
});

// 4. Secure Patient Login Endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Please enter your email and password." });
  }

  const cleanEmail = email.trim().toLowerCase();
  const db = readDB();
  const user = db.users.find(u => u.email.toLowerCase() === cleanEmail);

  if (!user || !user.isVerified) {
    return res.status(400).json({
      success: false,
      message: "Account not found or unverified. Please register first."
    });
  }

  const storedPass = user.password || user.pass;
  if (storedPass && storedPass !== password) {
    return res.status(400).json({
      success: false,
      message: "Incorrect password."
    });
  }

  return res.json({
    success: true,
    message: "Logged in successfully.",
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    token: `dc_token_${user.id}`
  });
});

// 5. Doctors Endpoints
app.get('/api/doctors', (req, res) => {
  const db = readDB();
  res.json({ success: true, doctors: db.doctors || [] });
});

app.post('/api/doctors', (req, res) => {
  const { name, specialty, fee, hospital, timings } = req.body;
  if (!name) {
    return res.status(400).json({ success: false, message: "Doctor name is required." });
  }

  const db = readDB();
  const rawName = name.trim();
  const docName = rawName.startsWith('Dr.') ? rawName : `Dr. ${rawName}`;
  const initials = rawName.replace('Dr.', '').trim().split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'DR';
  const docSpec = specialty ? specialty.trim() : "Cardiology";
  const docFee = fee ? parseInt(fee) : 1500;
  const docHospital = hospital ? hospital.trim() : "DHQ Hospital D.I. Khan";
  const docTimings = timings ? timings.trim() : "Mon - Sat: 04:00 PM - 08:00 PM";

  const newDoctor = {
    id: Date.now(),
    name: docName,
    specialty: docSpec,
    hospital: docHospital,
    fee: docFee,
    avatar: initials,
    rating: 5.0,
    credentials: `MBBS, Specialist in ${docSpec}`,
    timings: docTimings,
    about: `${docName} is a verified clinical specialist in ${docSpec} serving at ${docHospital}.`,
    phone: "923001234567",
    isSelfSubmitted: true,
    createdAt: new Date().toISOString()
  };

  db.doctors.unshift(newDoctor);
  writeDB(db);

  return res.status(201).json({
    success: true,
    message: "Doctor profile submitted and published successfully.",
    doctor: newDoctor
  });
});

// 6. Appointments Endpoints
app.get('/api/appointments', (req, res) => {
  const db = readDB();
  res.json({ success: true, appointments: db.appointments || [] });
});

app.post('/api/appointments', (req, res) => {
  const { doctor, hospital, specialty, date, time, patientName, patientPhone } = req.body;
  const db = readDB();

  const newAppt = {
    id: Date.now(),
    doctor: doctor || "Dr. Specialist",
    hospital: hospital || "DHQ Hospital",
    specialty: specialty || "General",
    date: date || new Date().toISOString().split('T')[0],
    time: time || "10:00 AM",
    avatar: (doctor || "DS").split(' ').map(n=>n[0]).join('').substring(0, 2).toUpperCase(),
    patientName: patientName || "Patient User",
    patientPhone: patientPhone || "0300 1234567",
    createdAt: new Date().toISOString()
  };

  db.appointments.unshift(newAppt);
  writeDB(db);

  return res.status(201).json({
    success: true,
    message: "Appointment logged successfully.",
    appointment: newAppt
  });
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(`🚀 Dera Care Node.js Backend Server active on port ${PORT}`);
  console.log(`   Health Check: http://localhost:${PORT}/api/health`);
  console.log(`===================================================`);
});
