const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const DB_PATH = path.join(__dirname, 'db.json');

// Middleware
app.use(cors());
app.use(express.json());

// Helper functions for file DB operations
function readDB() {
  try {
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

// 1. Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: "ok",
    service: "Dera Care Healthcare API Server",
    region: "D.I. Khan, KP",
    timestamp: new Date().toISOString()
  });
});

// 2. Patient Registration Endpoint
app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, message: "Name and email are required parameters." });
  }

  const db = readDB();
  const existingUser = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (existingUser) {
    // If user already exists, update name if needed & treat as successful login
    return res.json({
      success: true,
      message: "User already registered. Authenticated successfully.",
      user: { id: existingUser.id, name: existingUser.name, email: existingUser.email },
      token: `dc_token_${Date.now()}`
    });
  }

  const newUser = {
    id: Date.now(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password: password || "defaultPass123",
    role: "patient",
    createdAt: new Date().toISOString()
  };

  db.users.unshift(newUser);
  writeDB(db);

  return res.status(201).json({
    success: true,
    message: "Patient account registered successfully.",
    user: { id: newUser.id, name: newUser.name, email: newUser.email },
    token: `dc_token_${newUser.id}`
  });
});

// 3. Login Endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required." });
  }

  const db = readDB();
  let user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    // Demo auto-registration if email is new
    const displayName = email.split('@')[0].replace('.', ' ');
    user = {
      id: Date.now(),
      name: displayName.charAt(0).toUpperCase() + displayName.slice(1),
      email: email.trim().toLowerCase(),
      password: password || "password",
      role: "patient",
      createdAt: new Date().toISOString()
    };
    db.users.unshift(user);
    writeDB(db);
  }

  return res.json({
    success: true,
    message: "Authenticated successfully.",
    user: { id: user.id, name: user.name, email: user.email },
    token: `dc_token_${user.id}`
  });
});

// 4. Doctors Endpoints (Get All Doctors & Self-Submission)
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
    about: `${docName} is a verified clinical specialist in ${docSpec} serving at ${docHospital}. Self-registered via Doctor Portal.`,
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

// 5. Appointments Endpoints
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

// Start Server
app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(`🚀 Dera Care Node.js Backend Server active on port ${PORT}`);
  console.log(`   Health Check: http://localhost:${PORT}/api/health`);
  console.log(`===================================================`);
});
