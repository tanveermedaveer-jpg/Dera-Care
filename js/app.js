// Live update phone clock
function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  minutes = minutes < 10 ? '0' + minutes : minutes;
  const phoneTimeEl = document.getElementById('phone-time');
  if (phoneTimeEl) phoneTimeEl.innerText = `${hours}:${minutes}`;
}
setInterval(updateClock, 1000);
updateClock();

// Doctor specialist static dataset with advanced profile fields
const doctorsData = [
  { 
    id: 0, 
    name: "Dr. Test Specialist", 
    specialty: "General Physician & Heart Specialist", 
    hospital: "Dera Care Testing Clinic, D.I. Khan", 
    fee: 1000, 
    avatar: "TS", 
    rating: 5.0,
    credentials: "MBBS, FCPS - Family Medicine & Cardiology",
    timings: "Mon - Sat: 10:00 AM - 05:00 PM",
    about: "Dr. Test Specialist is a dedicated testing profile set up for validating the live WhatsApp booking redirection and support routing mechanisms of Dera Care.",
    phone: "923103716116"
  },
  { 
    id: 1, 
    name: "Dr. Saifullah Khan", 
    specialty: "Heart", 
    hospital: "DHQ Hospital D.I. Khan", 
    fee: 1500, 
    avatar: "SK", 
    rating: 4.9,
    credentials: "MBBS, FCPS - Cardiology",
    timings: "Mon - Sat: 04:00 PM - 09:00 PM",
    about: "Dr. Saifullah Khan is a premier cardiologist in D.I. Khan with 12+ years of experience in managing cardiac emergencies, hypertension, coronary diseases, and heart failure.",
    phone: "923001234561"
  },
  { 
    id: 2, 
    name: "Dr. Ayesha Malik", 
    specialty: "Children", 
    hospital: "Mufti Mahmood Hospital", 
    fee: 1200, 
    avatar: "AM", 
    rating: 4.8,
    credentials: "MBBS, FCPS - Pediatrics",
    timings: "Mon - Fri: 02:00 PM - 06:00 PM",
    about: "Dr. Ayesha Malik provides complete child development checkups, pediatric critical care, immunization counseling, and diagnostic workups for neonatal disorders.",
    phone: "923001234562"
  },
  { 
    id: 3, 
    name: "Dr. Zafar Iqbal", 
    specialty: "Bones", 
    hospital: "City Hospital D.I. Khan", 
    fee: 1000, 
    avatar: "ZI", 
    rating: 4.7,
    credentials: "MBBS, MS - Orthopedic Surgery",
    timings: "Mon - Sat: 05:00 PM - 09:00 PM",
    about: "Dr. Zafar Iqbal specializes in orthopedic trauma, joint replacements, complex fractures, bone density assessments, and athletic rehabilitation maps.",
    phone: "923001234563"
  },
  { 
    id: 4, 
    name: "Dr. Farzana Rehman", 
    specialty: "Eyes", 
    hospital: "DHQ Hospital D.I. Khan", 
    fee: 1100, 
    avatar: "FR", 
    rating: 4.8,
    credentials: "MBBS, FCPS - Ophthalmology",
    timings: "Mon - Fri: 09:00 AM - 01:00 PM",
    about: "Dr. Farzana Rehman is a leading eye surgeon providing premium laser eye surgery, cataract procedures, glaucoma treatment, and routine vision evaluations.",
    phone: "923001234564"
  },
  { 
    id: 5, 
    name: "Dr. Kamran Lodhi", 
    specialty: "Dental", 
    hospital: "Mufti Mahmood Hospital", 
    fee: 1200, 
    avatar: "KL", 
    rating: 4.6,
    credentials: "BDS, FCPS - Oral & Dental Surgery",
    timings: "Mon - Sat: 03:00 PM - 08:00 PM",
    about: "Dr. Kamran Lodhi specializes in aesthetic dentistry, root canals, oral surgeries, implantology, and premium teeth alignments.",
    phone: "923001234565"
  }
];

// Scheduled slot dataset containing detailed booking info
let appointmentsData = [
  { 
    id: 1, 
    doctor: "Dr. Saifullah Khan", 
    hospital: "DHQ Hospital", 
    specialty: "Cardiology", 
    date: "2026-08-31", 
    time: "10:30 AM", 
    avatar: "SK",
    patientName: "Rizwan Khan",
    patientPhone: "0300 9876543"
  }
];

// DOM selectors
const skipBtn = document.getElementById('btn-skip');
const loginContainer = document.getElementById('login-container');
const homeContainer = document.getElementById('home-container');
const logoutModal = document.getElementById('logout-modal');
const logoutConfirmBtn = document.getElementById('btn-logout-confirm');
const logoutCancelBtn = document.getElementById('btn-logout-cancel');

// Google Sign-In Selectors
const googleBtn = document.getElementById('btn-google');
const googleModal = document.getElementById('google-modal');
const closeGoogleBtn = document.getElementById('btn-close-google');
const googleAccountBtns = document.querySelectorAll('.google-acc-btn');

// Terms & Privacy Selectors
const termsLinkBtn = document.getElementById('link-terms');
const privacyLinkBtn = document.getElementById('link-privacy');
const termsModal = document.getElementById('terms-modal');
const privacyModal = document.getElementById('privacy-modal');
const closeTermsBtn = document.getElementById('btn-close-terms');
const closePrivacyBtn = document.getElementById('btn-close-privacy');

// Other Modals
const specialtiesModal = document.getElementById('specialties-modal');
const closeSpecialtiesBtn = document.getElementById('btn-close-specialties');
const hospitalsModal = document.getElementById('hospitals-modal');
const closeHospitalsBtn = document.getElementById('btn-close-hospitals');
const medicineModal = document.getElementById('medicine-modal');
const closeMedicineBtn = document.getElementById('btn-close-medicine');
const labModal = document.getElementById('lab-modal');
const closeLabBtn = document.getElementById('btn-close-lab');
const bookingModal = document.getElementById('booking-modal');
const closeBookingBtn = document.getElementById('btn-close-booking');
const doctorProfileModal = document.getElementById('doctor-profile-modal');
const voiceOverlay = document.getElementById('voice-overlay');
const btnVoiceSearch = document.getElementById('btn-voice-search');

// Toast Selectors
const toast = document.getElementById('toast');
const toastDesc = document.getElementById('toast-desc');
const toastTitle = document.getElementById('toast-title');
const toastIconBox = document.getElementById('toast-icon-box');

// Theme Toggle Selectors
const themeToggles = document.querySelectorAll('.btn-theme-toggle');
const mobileFrame = document.getElementById('mobile-frame');

// Tab content areas selectors
const homeDashboardView = document.getElementById('home-dashboard-view');
const homeAppointmentsView = document.getElementById('home-appointments-view');
const homeRecordsView = document.getElementById('home-records-view');
const homeProfileView = document.getElementById('home-profile-view');

// Navigation buttons
const btnNavHome = document.getElementById('btn-nav-home');
const btnNavSlots = document.getElementById('btn-nav-slots');
const btnNavRecords = document.getElementById('btn-nav-records');
const btnNavProfile = document.getElementById('btn-nav-profile');

const navButtons = [btnNavHome, btnNavSlots, btnNavRecords, btnNavProfile];
const tabViews = [homeDashboardView, homeAppointmentsView, homeRecordsView, homeProfileView];

// SPA navigation tab router
function switchTab(activeBtn, activeView) {
  tabViews.forEach(v => { if (v) v.classList.add('hidden'); });
  if (activeView) activeView.classList.remove('hidden');

  navButtons.forEach(btn => {
    if (!btn) return;
    btn.classList.remove('text-[var(--accent-color)]');
    btn.classList.add('text-[var(--text-muted)]');
    const span = btn.querySelector('span:last-child');
    if (span) span.className = 'text-[8px] font-semibold mt-0.5 uppercase tracking-wide';
  });

  if (activeBtn) {
    activeBtn.classList.remove('text-[var(--text-muted)]');
    activeBtn.classList.add('text-[var(--accent-color)]');
    const span = activeBtn.querySelector('span:last-child');
    if (span) span.className = 'text-[8px] font-extrabold mt-0.5 uppercase tracking-wide';
  }
}

if (btnNavHome) btnNavHome.addEventListener('click', () => switchTab(btnNavHome, homeDashboardView));
if (btnNavSlots) {
  btnNavSlots.addEventListener('click', () => {
    switchTab(btnNavSlots, homeAppointmentsView);
    renderAppointments();
  });
}
if (btnNavRecords) btnNavRecords.addEventListener('click', () => switchTab(btnNavRecords, homeRecordsView));
if (btnNavProfile) btnNavProfile.addEventListener('click', () => switchTab(btnNavProfile, homeProfileView));

// PERSISTENT DATA STORE
const DC = {
  getAdminCreds() {
    const stored = localStorage.getItem('dc_admin_creds');
    if (stored) return JSON.parse(stored);
    return { username: 'MSadaf', password: 'Sadaf@9099' };
  },
  saveAdminCreds(u, p) {
    localStorage.setItem('dc_admin_creds', JSON.stringify({ username: u, password: p }));
  },
  getDoctors() {
    const stored = localStorage.getItem('dc_doctors');
    return stored ? JSON.parse(stored) : [];
  },
  saveDoctors(list) {
    localStorage.setItem('dc_doctors', JSON.stringify(list));
  },
  getPatients() {
    const stored = localStorage.getItem('dc_patients');
    return stored ? JSON.parse(stored) : [];
  },
  savePatients(list) {
    localStorage.setItem('dc_patients', JSON.stringify(list));
  }
};

// LOGIN CAROUSEL — Swipe Navigation
(function initLoginCarousel() {
  const track = document.getElementById('login-carousel-track');
  const clip = document.getElementById('login-carousel-clip');
  if (!track || !clip) return;

  const TOTAL = 3;
  let currentSlide = 0;
  let dragStartX = 0;
  let dragDeltaX = 0;
  let isDragging = false;
  const THRESHOLD = 50;

  const DOT_COLORS = ['var(--accent-color)', 'var(--accent-color)', 'var(--accent-color)'];

  function goToSlide(idx) {
    idx = Math.max(0, Math.min(TOTAL - 1, idx));
    currentSlide = idx;
    track.style.transition = 'transform 0.35s cubic-bezier(0.4,0,0.2,1)';
    track.style.transform = `translateX(${-idx * 100}%)`;
    updateDots(idx);
  }

  function updateDots(idx) {
    for (let i = 0; i < TOTAL; i++) {
      const d = document.getElementById('dot-' + i);
      if (!d) continue;
      d.style.background = i === idx ? DOT_COLORS[idx] : '';
      d.classList.toggle('w-4', i === idx);
      d.classList.toggle('w-1\\.5', i !== idx);
      d.classList.toggle('bg-[var(--text-muted)]/40', i !== idx);
    }
  }

  function onDragStart(clientX) {
    isDragging = true;
    dragStartX = clientX;
    dragDeltaX = 0;
    track.style.transition = 'none';
  }

  function onDragMove(clientX) {
    if (!isDragging) return;
    dragDeltaX = clientX - dragStartX;
    const base = -currentSlide * 100;
    const pct = (dragDeltaX / clip.offsetWidth) * 100;
    const clamped = Math.max(-(TOTAL - 1) * 100, Math.min(0, base + pct));
    track.style.transform = `translateX(${clamped}%)`;
  }

  function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    if (dragDeltaX < -THRESHOLD && currentSlide < TOTAL - 1) {
      goToSlide(currentSlide + 1);
    } else if (dragDeltaX > THRESHOLD && currentSlide > 0) {
      goToSlide(currentSlide - 1);
    } else {
      goToSlide(currentSlide);
    }
  }

  clip.addEventListener('touchstart', e => {
    if (e.target.closest('input, button, select, textarea, label, a')) return;
    onDragStart(e.touches[0].clientX);
  }, { passive: true });

  clip.addEventListener('touchmove', e => {
    if (!isDragging) return;
    onDragMove(e.touches[0].clientX);
  }, { passive: true });

  clip.addEventListener('touchend', () => onDragEnd(), { passive: true });
  clip.addEventListener('touchcancel', () => onDragEnd(), { passive: true });

  clip.addEventListener('mousedown', e => {
    if (e.target.closest('input, button, select, textarea, label, a')) return;
    onDragStart(e.clientX);
    e.preventDefault();
  });
  window.addEventListener('mousemove', e => {
    if (isDragging) onDragMove(e.clientX);
  });
  window.addEventListener('mouseup', () => {
    if (isDragging) onDragEnd();
  });

  window.carouselGoToSlide = goToSlide;
  updateDots(0);
})();

function togglePasswordVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const isPass = input.type === 'password';
  input.type = isPass ? 'text' : 'password';
  const svg = btn.querySelector('svg');
  if (svg) {
    if (isPass) {
      svg.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.033 10.033 0 014.122-.977c4.478 0 8.268 2.943 9.542 7a10.017 10.017 0 01-4.132 5.411m0 0L21 21M3 3l18 18" />`;
    } else {
      svg.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />`;
    }
  }
}

function switchRole(role) {}

const allScreens = ['login-container', 'home-container', 'doctor-dashboard', 'admin-panel', 'terms-view', 'privacy-view'];
function showScreen(id) {
  try {
    if (id === 'patient-dashboard' || id === 'home-view' || id === 'patient-view') {
      id = 'home-container';
    }
    if (id === 'login-view') id = 'login-container';
    if (id === 'doctor-portal') id = 'doctor-dashboard';

    const target = document.getElementById(id);
    if (!target) {
      console.warn(`Target screen #${id} not found in DOM.`);
      const fallback = document.getElementById('admin-panel') || document.getElementById('login-container');
      if (fallback) {
        fallback.style.setProperty('display', 'flex', 'important');
        fallback.style.setProperty('position', 'absolute', 'important');
        fallback.style.setProperty('top', '0', 'important');
        fallback.style.setProperty('left', '0', 'important');
        fallback.style.setProperty('right', '0', 'important');
        fallback.style.setProperty('bottom', '0', 'important');
        fallback.style.setProperty('width', '100%', 'important');
        fallback.style.setProperty('height', '100%', 'important');
        fallback.style.setProperty('transform', 'none', 'important');
        fallback.style.setProperty('--tw-translate-x', '0px', 'important');
        fallback.style.setProperty('opacity', '1', 'important');
        fallback.style.setProperty('pointer-events', 'auto', 'important');
        fallback.style.setProperty('visibility', 'visible', 'important');
        fallback.style.setProperty('z-index', '100', 'important');
        fallback.classList.remove('translate-x-full', '-translate-x-full', 'opacity-0', 'pointer-events-none', 'hidden');
        fallback.classList.add('translate-x-0', 'opacity-100');
      }
      return;
    }

    // Hide all non-target screens
    document.querySelectorAll('#login-container, #home-container, #doctor-dashboard, #admin-panel, #terms-view, #privacy-view').forEach(el => {
      if (el !== target) {
        el.style.setProperty('display', 'none', 'important');
        el.style.setProperty('opacity', '0', 'important');
        el.style.setProperty('pointer-events', 'none', 'important');
        el.style.setProperty('visibility', 'hidden', 'important');
        el.classList.add('translate-x-full', 'opacity-0', 'pointer-events-none', 'hidden');
        el.classList.remove('translate-x-0', 'opacity-100');
      }
    });

    // Make target active screen 100% visible
    target.style.setProperty('display', 'flex', 'important');
    target.style.setProperty('position', 'absolute', 'important');
    target.style.setProperty('top', '0', 'important');
    target.style.setProperty('left', '0', 'important');
    target.style.setProperty('right', '0', 'important');
    target.style.setProperty('bottom', '0', 'important');
    target.style.setProperty('width', '100%', 'important');
    target.style.setProperty('height', '100%', 'important');
    target.style.setProperty('transform', 'none', 'important');
    target.style.setProperty('--tw-translate-x', '0px', 'important');
    target.style.setProperty('--tw-translate-y', '0px', 'important');
    target.style.setProperty('opacity', '1', 'important');
    target.style.setProperty('pointer-events', 'auto', 'important');
    target.style.setProperty('visibility', 'visible', 'important');
    target.style.setProperty('z-index', '100', 'important');
    target.classList.remove('translate-x-full', '-translate-x-full', 'opacity-0', 'pointer-events-none', 'hidden');
    target.classList.add('translate-x-0', 'opacity-100');

    if (id === 'admin-panel') {
      const statsTab = document.getElementById('admin-tab-stats');
      if (statsTab) {
        statsTab.classList.remove('hidden');
        statsTab.style.setProperty('display', 'block', 'important');
        statsTab.style.setProperty('visibility', 'visible', 'important');
        statsTab.style.setProperty('opacity', '1', 'important');
      }
      try { if (typeof renderAdminDoctorList === 'function') renderAdminDoctorList(); } catch(e) {}
      try { if (typeof updateAdminStats === 'function') updateAdminStats(); } catch(e) {}
    }
  } catch (err) {
    console.error("Error in showScreen:", err);
  }
}

function openModal(id) {
  const m = document.getElementById(id);
  if (!m) return;
  m.style.setProperty('display', 'flex', 'important');
  m.classList.remove('hidden');
  setTimeout(() => {
    m.classList.remove('translate-y-full');
  }, 10);
}

function closeModal(id) {
  const m = document.getElementById(id);
  if (!m) return;
  m.classList.add('translate-y-full');
  setTimeout(() => {
    m.style.setProperty('display', 'none', 'important');
    m.classList.add('hidden');
  }, 300);
}

function selectAuthAccount(name, email) {
  closeModal('auth-modal');
  currentSession = { isGuest: false, name: name, email: email };
  updateProfileUI();
  showToast("Signing In...", `Authenticated as ${name}`, "success");
  const usernameEl = document.getElementById('home-username');
  if (usernameEl) usernameEl.textContent = name.split(' ')[0];
  setTimeout(() => {
    showScreen('patient-dashboard');
    if (typeof switchTab === 'function' && typeof btnNavHome !== 'undefined') {
      switchTab(btnNavHome, homeDashboardView);
    }
    showToast("Welcome Back ✓", `Logged in as ${name}.`, "success");
  }, 700);
}

window.openModal = openModal;
window.closeModal = closeModal;
window.selectAuthAccount = selectAuthAccount;
window.closeModals = function() {
  const t = document.getElementById('terms-modal');
  const p = document.getElementById('privacy-modal');
  if (t) t.style.display = 'none';
  if (p) p.style.display = 'none';
};

function openRegisterView() {
  const overlay = document.getElementById('register-overlay');
  if (!overlay) return;
  overlay.style.setProperty('display', 'flex', 'important');
  setTimeout(() => {
    overlay.style.transform = 'translateY(0%)';
  }, 10);
  ['patient-signup-name','patient-signup-email','patient-signup-pass'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

function closeRegisterView() {
  const overlay = document.getElementById('register-overlay');
  if (!overlay) return;
  overlay.style.transform = 'translateY(100%)';
  setTimeout(() => {
    overlay.style.setProperty('display', 'none', 'important');
  }, 350);
}

async function handlePatientSignup(e) {
  if (e) e.preventDefault();

  const nameEl = document.getElementById('patient-signup-name');
  const emailEl = document.getElementById('patient-signup-email');
  const passEl = document.getElementById('patient-signup-pass');

  const name = nameEl ? nameEl.value.trim() : "";
  const email = emailEl ? emailEl.value.trim() : "";
  const pass = passEl ? passEl.value.trim() : "";

  if (!name || !email) {
    showToast("Missing Parameters", "Please enter your full name and email address.", "error");
    return;
  }

  const userData = { name: name, email: email };
  localStorage.setItem('currentUser', JSON.stringify(userData));

  // Connect to Node.js Backend API
  try {
    const res = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password: pass })
    });
    const data = await res.json();
    if (data.success && data.user) {
      userData.id = data.user.id;
    }
  } catch (err) {
    console.log("Backend server offline, using local storage fallback.");
  }

  const storedPatients = DC.getPatients();
  if (!storedPatients.some(p => p.email === email)) {
    storedPatients.unshift(userData);
    DC.savePatients(storedPatients);
  }

  currentSession = {
    isGuest: false,
    name: name,
    email: email
  };
  updateProfileUI();

  if (nameEl) nameEl.value = '';
  if (emailEl) emailEl.value = '';
  if (passEl) passEl.value = '';

  closeRegisterView();
  showScreen('patient-dashboard');

  if (typeof switchTab === 'function' && typeof btnNavHome !== 'undefined') {
    switchTab(btnNavHome, homeDashboardView);
  }

  const usernameHeader = document.getElementById('home-username');
  if (usernameHeader) usernameHeader.textContent = name.split(' ')[0];

  showToast("Account Created ✓", `Welcome ${name}! Account registered successfully.`, "success");
}

window.handlePatientSignup = handlePatientSignup;

function loadSavedUserSession() {
  try {
    const adminSaved = localStorage.getItem('dc_current_session');
    if (adminSaved) {
      const sess = JSON.parse(adminSaved);
      if (sess && sess.role === 'admin') {
        currentSession = sess;
        const lbl = document.getElementById('admin-logged-in-label');
        if (lbl) lbl.textContent = `Logged in as ${sess.name}`;
        const disp = document.getElementById('admin-display-username');
        if (disp) disp.textContent = sess.name;
        setTimeout(() => {
          showScreen('admin-panel');
        }, 100);
        return;
      }
    }
    const saved = localStorage.getItem('currentUser');
    if (saved) {
      const u = JSON.parse(saved);
      if (u && u.name && u.email) {
        currentSession = { isGuest: false, name: u.name, email: u.email };
        updateProfileUI();
        const usernameHeader = document.getElementById('home-username');
        if (usernameHeader) usernameHeader.textContent = u.name.split(' ')[0];
      }
    }
  } catch(e) {}
}

let currentSession = {
  isGuest: true,
  name: "Guest User",
  email: "guest@deracare.pk"
};

function updateProfileUI() {
  const nameEl = document.getElementById('profile-display-name');
  const emailEl = document.getElementById('profile-display-email');
  const badgeHeader = document.getElementById('profile-badge-header');
  const badgeTag = document.getElementById('profile-badge-tag');
  const upgradeBanner = document.getElementById('guest-upgrade-banner');
  const acctType = document.getElementById('profile-acct-type');
  const apptCount = document.getElementById('profile-appt-count');

  if (nameEl) nameEl.textContent = currentSession.name;
  if (emailEl) emailEl.textContent = currentSession.email;
  if (apptCount) apptCount.textContent = appointmentsData.length;

  if (currentSession.isGuest) {
    if (badgeHeader) badgeHeader.textContent = "Guest Mode";
    if (badgeTag) {
      badgeTag.textContent = "Guest Mode (Limited Access)";
      badgeTag.className = "px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 text-[8px] font-bold border border-amber-500/20";
    }
    if (upgradeBanner) upgradeBanner.classList.remove('hidden');
    if (acctType) acctType.textContent = "Guest Session";
  } else {
    if (badgeHeader) badgeHeader.textContent = "Patient Account";
    if (badgeTag) {
      badgeTag.textContent = "Verified Patient";
      badgeTag.className = "px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-[8px] font-bold border border-emerald-500/20";
    }
    if (upgradeBanner) upgradeBanner.classList.add('hidden');
    if (acctType) acctType.textContent = "Registered Account";
  }
}

function openGuestRegisterModal() {
  const modal = document.getElementById('guest-register-modal');
  if (modal) modal.classList.remove('hidden', 'translate-y-full');
}
function closeGuestRegisterModal() {
  const modal = document.getElementById('guest-register-modal');
  if (modal) {
    modal.classList.add('translate-y-full');
    setTimeout(() => modal.classList.add('hidden'), 300);
  }
}
function closeGuestModalAndGoLogin() {
  closeGuestRegisterModal();
  setTimeout(() => logoutToLogin(), 350);
}

function openAdminLogoutModal() {
  const modal = document.getElementById('admin-logout-modal');
  if (modal) modal.classList.remove('hidden', 'translate-y-full');
}
function closeAdminLogoutModal() {
  const modal = document.getElementById('admin-logout-modal');
  if (modal) {
    modal.classList.add('translate-y-full');
    setTimeout(() => modal.classList.add('hidden'), 300);
  }
}
function confirmAdminExit() {
  closeAdminLogoutModal();
  setTimeout(() => {
    ['admin-user-input', 'admin-pass-input', 'admin-new-username', 'admin-current-pass', 'admin-new-pass', 'admin-confirm-pass'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    logoutToLogin();
    showToast("Admin Session Closed", "Successfully logged out of Admin Control Panel.", "success");
  }, 350);
}

function openDoctorLogoutModal() {
  const modal = document.getElementById('doctor-logout-modal');
  if (modal) modal.classList.remove('hidden', 'translate-y-full');
}
function closeDoctorLogoutModal() {
  const modal = document.getElementById('doctor-logout-modal');
  if (modal) {
    modal.classList.add('translate-y-full');
    setTimeout(() => modal.classList.add('hidden'), 300);
  }
}
function confirmDoctorExit() {
  closeDoctorLogoutModal();
  setTimeout(() => {
    ['doctor-id-input', 'doctor-pin-input'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    logoutToLogin();
    showToast("Doctor Session Closed", "Successfully logged out of Doctor Portal.", "success");
  }, 350);
}

let isDoctorOnDuty = true;
function toggleDoctorDutyStatus(btn) {
  isDoctorOnDuty = !isDoctorOnDuty;
  if (isDoctorOnDuty) {
    btn.className = "flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 focus:outline-none transition-all";
    btn.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span><span class="text-[9px] font-extrabold uppercase tracking-wider">ON DUTY</span>`;
    showToast("Duty Status", "Doctor status set to ON DUTY.", "success");
  } else {
    btn.className = "flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 focus:outline-none transition-all";
    btn.innerHTML = `<span class="w-2 h-2 rounded-full bg-rose-500"></span><span class="text-[9px] font-extrabold uppercase tracking-wider">OFF DUTY</span>`;
    showToast("Duty Status", "Doctor status set to OFF DUTY.", "error");
  }
}

let docConfirmedCount = 8;
let docPendingCount = 3;

function acceptDoctorRequest(btn, patientName) {
  const card = btn.closest('.glass-card');
  if (!card) return;
  
  docConfirmedCount++;
  docPendingCount = Math.max(0, docPendingCount - 1);
  
  const confirmedEl = document.getElementById('doc-stat-confirmed');
  const pendingEl = document.getElementById('doc-stat-pending');
  if (confirmedEl) confirmedEl.textContent = docConfirmedCount;
  if (pendingEl) pendingEl.textContent = docPendingCount;

  const actionBox = btn.parentElement;
  if (actionBox) {
    actionBox.innerHTML = `<span class="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[9px] font-extrabold border border-emerald-500/20">✓ Accepted</span>`;
  }
  showToast("Request Accepted ✓", `Appointment confirmed for ${patientName}.`, "success");
}

function rejectDoctorRequest(btn, patientName) {
  const card = btn.closest('.glass-card');
  if (!card) return;

  docPendingCount = Math.max(0, docPendingCount - 1);
  const pendingEl = document.getElementById('doc-stat-pending');
  if (pendingEl) pendingEl.textContent = docPendingCount;

  card.style.transition = "all 0.3s ease-out";
  card.style.opacity = "0";
  card.style.transform = "translateX(50px)";
  
  setTimeout(() => {
    card.style.display = "none";
  }, 300);

  showToast("Request Declined", `Appointment request from ${patientName} declined.`, "error");
}

function openDocAvailabilityModal() {
  const modal = document.getElementById('doc-availability-modal');
  if (modal) modal.classList.remove('hidden', 'translate-y-full');
}

function closeDocAvailabilityModal() {
  const modal = document.getElementById('doc-availability-modal');
  if (modal) {
    modal.classList.add('translate-y-full');
    setTimeout(() => modal.classList.add('hidden'), 300);
  }
}

function saveDoctorAvailability() {
  const days = document.getElementById('doc-avail-days').value;
  const morning = document.getElementById('doc-avail-morning').value;
  closeDocAvailabilityModal();
  showToast("Hours Saved ✓", `Working slots updated: ${days} (${morning})`, "success");
}

function openDocPrescriptionModal() {
  const modal = document.getElementById('doc-prescription-modal');
  if (modal) modal.classList.remove('hidden', 'translate-y-full');
}

function closeDocPrescriptionModal() {
  const modal = document.getElementById('doc-prescription-modal');
  if (modal) {
    modal.classList.add('translate-y-full');
    setTimeout(() => modal.classList.add('hidden'), 300);
  }
}

function issueDigitalPrescription() {
  const patient = document.getElementById('doc-rx-patient').value.trim();
  const meds = document.getElementById('doc-rx-meds').value.trim();
  if (!patient || !meds) {
    showToast("Missing Parameters", "Please enter patient name and medication details.", "error");
    return;
  }
  closeDocPrescriptionModal();
  showToast("Rx Issued ✓", `Digital prescription dispatched to ${patient}.`, "success");
  document.getElementById('doc-rx-diagnosis').value = '';
  document.getElementById('doc-rx-meds').value = '';
}

function renderDoctorPatientChat() {
  const select = document.getElementById('doc-chat-patient-select');
  const stream = document.getElementById('doc-chat-stream');
  if (!select || !stream) return;
  const patientName = select.value;

  if (!chatHistories[patientName]) {
    chatHistories[patientName] = [
      { sender: "them", text: `Assalam-o-Alaikum Doctor, I have a query regarding my symptoms and medication schedule.`, time: getCurrentTimeString() }
    ];
  }

  stream.innerHTML = "";
  chatHistories[patientName].forEach(msg => {
    if (msg.sender === "me" || msg.sender === "doctor") {
      stream.innerHTML += `
        <div class="flex justify-end">
          <div class="bg-[var(--accent-color)] text-[#0D1B2A] rounded-xl rounded-tr-none p-2 max-w-[85%] text-[10px] font-bold leading-snug">
            <span>${msg.text}</span>
            <span class="block text-[7px] opacity-75 text-right mt-0.5">${msg.time} ✓✓</span>
          </div>
        </div>
      `;
    } else {
      stream.innerHTML += `
        <div class="flex justify-start">
          <div class="bg-white/10 text-[var(--text-color)] border border-white/10 rounded-xl rounded-tl-none p-2 max-w-[85%] text-[10px] font-medium leading-snug">
            <span class="block text-[8px] font-extrabold text-[var(--accent-color)]">${patientName}</span>
            <span>${msg.text}</span>
            <span class="block text-[7px] text-[var(--text-muted)] mt-0.5">${msg.time}</span>
          </div>
        </div>
      `;
    }
  });
  stream.scrollTop = stream.scrollHeight;
}

function sendDoctorReply() {
  const select = document.getElementById('doc-chat-patient-select');
  const input = document.getElementById('doc-chat-reply-input');
  if (!select || !input) return;

  const patientName = select.value;
  const replyText = input.value.trim();
  if (!replyText) return;

  if (!chatHistories[patientName]) chatHistories[patientName] = [];

  chatHistories[patientName].push({
    sender: "doctor",
    text: replyText,
    time: getCurrentTimeString()
  });

  input.value = "";
  renderDoctorPatientChat();
  showToast("Reply Sent ✓", `Message sent to ${patientName}.`, "success");
}

let isAdminPassRevealed = false;
function toggleAdminCredsPassVisibility(btn) {
  const passTextEl = document.getElementById('admin-creds-pass-text');
  if (!passTextEl) return;
  const creds = DC.getAdminCreds();
  isAdminPassRevealed = !isAdminPassRevealed;
  if (isAdminPassRevealed) {
    passTextEl.textContent = creds.password;
    passTextEl.className = "text-[10px] font-extrabold text-[var(--accent-color)] tracking-wide";
  } else {
    passTextEl.textContent = "••••••••";
    passTextEl.className = "text-[10px] font-extrabold text-emerald-400";
  }
}

function openChangePassModal() {
  if (currentSession.isGuest) {
    showToast("Guest Session", "Guest accounts do not have a password. Please log in or register.", "error");
    return;
  }
  const modal = document.getElementById('change-pass-modal');
  if (modal) modal.classList.remove('hidden', 'translate-y-full');
}
function closeChangePassModal() {
  const modal = document.getElementById('change-pass-modal');
  if (modal) {
    modal.classList.add('translate-y-full');
    setTimeout(() => modal.classList.add('hidden'), 300);
  }
}

function changePatientPassword() {
  if (currentSession.isGuest) {
    showToast("Guest Session", "Guest accounts do not have a password. Please log in or register.", "error");
    return;
  }
  const currentP = document.getElementById('profile-current-pass').value.trim();
  const newP = document.getElementById('profile-new-pass').value.trim();
  const confirmP = document.getElementById('profile-confirm-pass').value.trim();

  if (!currentP || !newP || !confirmP) {
    showToast("Missing Fields", "Please fill in all password fields.", "error");
    return;
  }
  let patients = DC.getPatients();
  let pIndex = patients.findIndex(p => p.email === currentSession.email);
  if (pIndex === -1 || patients[pIndex].password !== currentP) {
    showToast("Wrong Password", "Your current password is incorrect.", "error");
    return;
  }
  if (newP !== confirmP) {
    showToast("Mismatch", "New password and confirmation do not match.", "error");
    return;
  }
  if (newP.length < 6) {
    showToast("Weak Password", "Password must be at least 6 characters.", "error");
    return;
  }
  patients[pIndex].password = newP;
  DC.savePatients(patients);
  showToast("Password Updated ✓", "Your password has been changed successfully.", "success");
  ['profile-current-pass', 'profile-new-pass', 'profile-confirm-pass'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  closeChangePassModal();
}

function handlePatientLogin() {
  const email = document.getElementById('patient-login-email').value.trim().toLowerCase();
  const pass = document.getElementById('patient-login-pass').value.trim();
  if (!email || !pass) {
    showToast('Missing Fields', 'Please enter your email and password.', 'error');
    return;
  }
  const patients = DC.getPatients();
  const match = patients.find(p => p.email === email && p.password === pass);
  if (!match) {
    showToast('Invalid Credentials', 'Email or password is incorrect.', 'error');
    return;
  }
  currentSession = {
    isGuest: false,
    name: match.name,
    email: match.email
  };
  updateProfileUI();
  showToast('Welcome Back ✓', `Logged in as ${match.name}. Loading dashboard...`, 'success');
  const usernameEl = document.getElementById('home-username');
  if (usernameEl) usernameEl.textContent = match.name.split(' ')[0];
  setTimeout(() => {
    showScreen('home-container');
  }, 800);
}

function handlePatientSignup() {
  const name = document.getElementById('patient-signup-name').value.trim();
  const email = document.getElementById('patient-signup-email').value.trim().toLowerCase();
  const pass = document.getElementById('patient-signup-pass').value.trim();
  if (!name || !email || !pass) {
    showToast('Missing Fields', 'Please fill in all fields.', 'error');
    return;
  }
  if (!email.includes('@') || !email.includes('.')) {
    showToast('Invalid Email', 'Please enter a valid email address.', 'error');
    return;
  }
  if (pass.length < 6) {
    showToast('Weak Password', 'Password must be at least 6 characters.', 'error');
    return;
  }
  let patients = DC.getPatients();
  if (patients.find(p => p.email === email)) {
    showToast('Already Registered', 'An account with this email already exists.', 'error');
    closeRegisterView();
    document.getElementById('patient-login-email').value = email;
    return;
  }
  patients.push({ name, email, password: pass, createdAt: new Date().toISOString() });
  DC.savePatients(patients);
  
  currentSession = {
    isGuest: false,
    name: name,
    email: email
  };
  updateProfileUI();

  showToast('Account Created ✓', `Welcome, ${name}! Please log in below.`, 'success');
  closeRegisterView();
  setTimeout(() => {
    document.getElementById('patient-login-email').value = email;
    document.getElementById('patient-login-pass').value = '';
  }, 350);
}

function handleDoctorLogin() {
  try {
    const idEl = document.getElementById('doctor-id-input');
    const pinEl = document.getElementById('doctor-pin-input');
    const id = idEl ? idEl.value.trim() : "";
    const pin = pinEl ? pinEl.value.trim() : "";

    if (!id || !pin) {
      showToast('Missing Fields', 'Please enter your Doctor ID and PIN Code.', 'error');
      return;
    }
    const doctors = DC.getDoctors();
    const match = doctors.find(d => d.docId === id && d.pin === pin);
    if (!match) {
      showToast('Access Denied', 'Invalid Doctor ID or PIN Code. Contact your Admin.', 'error');
      return;
    }
    showToast('Authenticated ✓', `Welcome, ${match.name}! Loading your portal...`, 'success');
    
    const docNameEl = document.getElementById('doc-dashboard-name');
    if (docNameEl) docNameEl.textContent = match.name;

    if (typeof renderDoctorPatientChat === 'function') renderDoctorPatientChat();

    setTimeout(() => {
      showScreen('doctor-dashboard');
    }, 400);
  } catch (err) {
    console.error("Doctor Login Error:", err);
    showScreen('doctor-dashboard');
  }
}

function handleAdminLogin(e) {
  if (e) {
    e.preventDefault();
    if (typeof e.stopPropagation === 'function') e.stopPropagation();
  }
  try {
    const userEl = document.getElementById('admin-user-input');
    const passEl = document.getElementById('admin-pass-input');
    const phoneInput = userEl ? userEl.value.trim() : "";
    const passwordInput = passEl ? passEl.value.trim() : "";

    if (!phoneInput || !passwordInput) {
      showToast('Missing Fields', 'Please enter your Admin Phone Number and Password.', 'error');
      return;
    }

    const isMasterPhone = (phoneInput === '03103716116' && passwordInput === 'Sadaf@9099');
    const isMasterUser = (phoneInput === 'MSadaf' && passwordInput === 'Sadaf@9099');
    const creds = DC.getAdminCreds();
    const isStored = (phoneInput === creds.username && passwordInput === creds.password);

    if (!isMasterPhone && !isMasterUser && !isStored) {
      showToast('Access Denied', 'Invalid Admin Phone Number or Password.', 'error');
      return;
    }

    currentSession = {
      isGuest: false,
      role: 'admin',
      name: "Admin (03103716116)",
      phone: "03103716116",
      email: "msadaf.admin@deracare.pk"
    };

    const activeDisplay = isMasterPhone ? 'Admin (03103716116)' : (isMasterUser ? 'MSadaf' : creds.username);
    const lbl = document.getElementById('admin-logged-in-label');
    if (lbl) lbl.textContent = `Logged in as ${activeDisplay}`;
    
    const disp = document.getElementById('admin-display-username');
    if (disp) disp.textContent = activeDisplay;

    // Force hide login container completely
    const loginCard = document.getElementById('login-container');
    if (loginCard) {
      loginCard.style.setProperty('display', 'none', 'important');
      loginCard.style.setProperty('opacity', '0', 'important');
      loginCard.style.setProperty('pointer-events', 'none', 'important');
      loginCard.style.setProperty('visibility', 'hidden', 'important');
      loginCard.classList.add('translate-x-full', 'opacity-0', 'hidden');
    }

    // Force display admin panel directly with maximum specificity inline styles
    const adminPanel = document.getElementById('admin-panel');
    if (adminPanel) {
      document.querySelectorAll('#login-container, #home-container, #doctor-dashboard, #terms-view, #privacy-view, .app-view').forEach(el => {
        el.style.setProperty('display', 'none', 'important');
        el.style.setProperty('opacity', '0', 'important');
        el.style.setProperty('visibility', 'hidden', 'important');
        el.classList.add('translate-x-full', 'hidden');
      });

      adminPanel.style.setProperty('display', 'flex', 'important');
      adminPanel.style.setProperty('flex-direction', 'column', 'important');
      adminPanel.style.setProperty('visibility', 'visible', 'important');
      adminPanel.style.setProperty('opacity', '1', 'important');
      adminPanel.style.setProperty('width', '100%', 'important');
      adminPanel.style.setProperty('height', '100%', 'important');
      adminPanel.style.setProperty('position', 'absolute', 'important');
      adminPanel.style.setProperty('top', '0', 'important');
      adminPanel.style.setProperty('left', '0', 'important');
      adminPanel.style.setProperty('right', '0', 'important');
      adminPanel.style.setProperty('bottom', '0', 'important');
      adminPanel.style.setProperty('overflow-y', 'auto', 'important');
      adminPanel.style.setProperty('transform', 'none', 'important');
      adminPanel.style.setProperty('--tw-translate-x', '0px', 'important');
      adminPanel.style.setProperty('--tw-translate-y', '0px', 'important');
      adminPanel.style.setProperty('z-index', '99999', 'important');
      adminPanel.style.setProperty('background', '#0b1120', 'important');
      adminPanel.style.setProperty('color', '#ffffff', 'important');
      adminPanel.classList.remove('translate-x-full', '-translate-x-full', 'opacity-0', 'pointer-events-none', 'hidden');
      adminPanel.classList.add('translate-x-0', 'opacity-100');
    }

    try { if (typeof renderAdminDoctorList === 'function') renderAdminDoctorList(); } catch(err) {}
    try { if (typeof updateAdminStats === 'function') updateAdminStats(); } catch(err) {}
    try { if (typeof switchAdminTab === 'function') switchAdminTab('stats'); } catch(err) {}

    showToast('Admin Access Granted ✓', `Welcome Admin: 03103716116`, 'success');
  } catch (err) {
    console.error("Admin Login Error:", err);
    showScreen('admin-panel');
  }
}

window.handleAdminLogin = handleAdminLogin;

function logoutToLogin() {
  document.querySelectorAll('.app-view, #login-container, #home-container, #doctor-dashboard, #admin-panel').forEach(el => {
    el.style.setProperty('display', 'none', 'important');
    el.classList.add('translate-x-full','opacity-0','pointer-events-none','hidden');
    el.classList.remove('translate-x-0','opacity-100');
  });
  if (loginContainer) {
    loginContainer.style.setProperty('display', 'flex', 'important');
    loginContainer.classList.remove('translate-x-full', '-translate-x-full', 'opacity-0', 'pointer-events-none', 'hidden');
    loginContainer.classList.add('translate-x-0', 'opacity-100');
  }
  closeRegisterView();
  if (typeof window.carouselGoToSlide === 'function') {
    window.carouselGoToSlide(0);
  }
  ['doctor-id-input','doctor-pin-input','admin-user-input','admin-pass-input',
   'patient-login-email','patient-login-pass'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  switchPatientTab('login');
}

function switchAdminTab(tab) {
  ['stats','doctors','profile'].forEach(t => {
    const tabEl = document.getElementById('admin-tab-' + t);
    if (tabEl) tabEl.classList.add('hidden');
    const btn = document.getElementById('atab-' + t);
    if (btn) {
      btn.style.background = '';
      btn.style.color = '';
      btn.classList.add('text-[var(--text-muted)]');
      btn.classList.remove('shadow-sm');
    }
  });
  const activeTabEl = document.getElementById('admin-tab-' + tab);
  if (activeTabEl) activeTabEl.classList.remove('hidden');
  const active = document.getElementById('atab-' + tab);
  if (active) {
    active.classList.remove('text-[var(--text-muted)]');
    active.style.background = 'var(--accent-color)';
    active.style.color = 'var(--primary-btn-text)';
    active.classList.add('shadow-sm');
  }
  if (tab === 'doctors') renderAdminDoctorList();
}

let editingDocId = null;

function saveDoctor() {
  const name = document.getElementById('add-doc-name').value.trim();
  const specialty = document.getElementById('add-doc-specialty').value.trim();
  const hospital = document.getElementById('add-doc-hospital').value.trim();
  const docId = document.getElementById('add-doc-id').value.trim();
  const pin = document.getElementById('add-doc-pin').value.trim();

  if (!name || !docId || !pin) {
    showToast('Missing Fields', 'Name, Doctor ID, and PIN Code are required.', 'error');
    return;
  }

  let doctors = DC.getDoctors();

  if (editingDocId !== null) {
    const idx = doctors.findIndex(d => d.docId === editingDocId);
    if (idx > -1) {
      doctors[idx] = { name, specialty, hospital, docId, pin };
    }
    showToast('Updated ✓', `${name}'s profile has been updated.`, 'success');
  } else {
    if (doctors.find(d => d.docId === docId)) {
      showToast('Duplicate ID', 'A doctor with this ID already exists.', 'error');
      return;
    }
    doctors.push({ name, specialty, hospital, docId, pin });
    showToast('Doctor Added ✓', `${name} has been registered successfully.`, 'success');
  }

  DC.saveDoctors(doctors);
  cancelDoctorEdit();
  renderAdminDoctorList();
  updateAdminStats();
}

function editDoctor(docId) {
  const doctors = DC.getDoctors();
  const doc = doctors.find(d => d.docId === docId);
  if (!doc) return;
  editingDocId = docId;
  document.getElementById('add-doc-name').value = doc.name;
  document.getElementById('add-doc-specialty').value = doc.specialty;
  document.getElementById('add-doc-hospital').value = doc.hospital;
  document.getElementById('add-doc-id').value = doc.docId;
  document.getElementById('add-doc-pin').value = doc.pin;
  document.getElementById('doc-form-title-icon').textContent = '✏️';
  document.getElementById('doc-form-title').textContent = 'Edit Doctor Profile';
  document.getElementById('btn-cancel-edit').classList.remove('hidden');
  document.getElementById('add-doc-name').focus();
}

function deleteDoctor(docId) {
  let doctors = DC.getDoctors();
  const doc = doctors.find(d => d.docId === docId);
  doctors = doctors.filter(d => d.docId !== docId);
  DC.saveDoctors(doctors);
  showToast('Deleted', `${doc ? doc.name : 'Doctor'} removed from registry.`, 'error');
  renderAdminDoctorList();
  updateAdminStats();
}

function cancelDoctorEdit() {
  editingDocId = null;
  ['add-doc-name','add-doc-specialty','add-doc-hospital','add-doc-id','add-doc-pin']
    .forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
  document.getElementById('doc-form-title-icon').textContent = '➕';
  document.getElementById('doc-form-title').textContent = 'Add New Doctor';
  document.getElementById('btn-cancel-edit').classList.add('hidden');
}

function renderAdminDoctorList() {
  try {
    const doctors = DC.getDoctors() || [];
    const container = document.getElementById('admin-doctor-list');
    const countEl = document.getElementById('admin-doc-count');
    if (!container) return;
    if (countEl) countEl.textContent = `${doctors.length} doctor${doctors.length !== 1 ? 's' : ''}`;
    if (doctors.length === 0) {
      container.innerHTML = `<div class="text-center py-8 text-[var(--text-muted)]">
        <div class="text-3xl mb-2">🩺</div>
        <p class="text-[10px] font-bold">No doctors registered yet.</p>
        <p class="text-[9px]">Use the form above to add your first doctor.</p>
      </div>`;
      return;
    }
    container.innerHTML = doctors.map((doc) => {
      if (!doc) return '';
      const docName = doc.name || 'Doctor Specialist';
      const docSpec = doc.specialty || 'General';
      const docHosp = doc.hospital || 'DHQ Hospital';
      const docId = doc.docId || 'ID-000';
      const initials = docName.split(' ').filter(Boolean).map(n => n[0]).join('').slice(0,2).toUpperCase() || 'DR';

      return `
        <div class="glass-card p-3.5 rounded-2xl border border-white/5 space-y-2">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2.5">
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold flex-shrink-0"
                   style="background:linear-gradient(135deg,#00A86B,#00E5FF);color:#fff;">
                ${initials}
              </div>
              <div>
                <p class="text-[11px] font-extrabold text-[var(--text-color)]">${docName}</p>
                <p class="text-[9px] text-[var(--text-muted)]">${docSpec} · ${docHosp}</p>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between pt-1 border-t border-[var(--border-color)]">
            <div class="flex space-x-3">
              <span class="text-[9px] text-[var(--text-muted)]">ID: <span class="font-extrabold text-[var(--text-color)]">${docId}</span></span>
              <span class="text-[9px] text-[var(--text-muted)]">PIN: <span class="font-extrabold text-[var(--text-color)]">••••</span></span>
            </div>
            <div class="flex space-x-1.5">
              <button onclick="editDoctor('${docId}')" class="h-7 px-2.5 rounded-lg bg-[var(--accent-color)]/10 text-[var(--accent-color)] text-[8px] font-extrabold border border-[var(--accent-color)]/20 hover:bg-[var(--accent-color)]/20 transition-colors focus:outline-none">✏️ Edit</button>
              <button onclick="deleteDoctor('${docId}')" class="h-7 px-2.5 rounded-lg bg-rose-500/10 text-rose-400 text-[8px] font-extrabold border border-rose-500/20 hover:bg-rose-500/20 transition-colors focus:outline-none">🗑 Delete</button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  } catch (err) {
    console.error("renderAdminDoctorList error:", err);
    const container = document.getElementById('admin-doctor-list');
    if (container) {
      container.innerHTML = `<div class="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold text-center">⚠️ Doctor list load exception. Showing default view.</div>`;
    }
  }
}

function updateAdminStats() {
  try {
    const docCount = (DC.getDoctors() || []).length;
    const patientCount = Math.max(247, (DC.getPatients() || []).length);
    const docEl = document.getElementById('admin-stat-doctors');
    const patientEl = document.getElementById('admin-stat-patients');
    if (docEl) docEl.textContent = docCount;
    if (patientEl) patientEl.textContent = patientCount;
  } catch(err) {
    console.error("updateAdminStats error:", err);
  }
}

function saveAdminProfile() {
  const newUser = document.getElementById('admin-new-username').value.trim();
  const currentPass = document.getElementById('admin-current-pass').value.trim();
  const newPass = document.getElementById('admin-new-pass').value.trim();
  const confirmPass = document.getElementById('admin-confirm-pass').value.trim();

  if (!currentPass) {
    showToast('Verify Required', 'Please enter your current password to make changes.', 'error');
    return;
  }
  const creds = DC.getAdminCreds();
  if (currentPass !== creds.password) {
    showToast('Wrong Password', 'Current password is incorrect.', 'error');
    return;
  }
  const finalUser = newUser || creds.username;
  let finalPass = creds.password;
  if (newPass) {
    if (newPass !== confirmPass) {
      showToast('Mismatch', 'New password and confirmation do not match.', 'error');
      return;
    }
    if (newPass.length < 6) {
      showToast('Weak Password', 'Password must be at least 6 characters.', 'error');
      return;
    }
    finalPass = newPass;
  }
  DC.saveAdminCreds(finalUser, finalPass);
  document.getElementById('admin-display-username').textContent = finalUser;
  document.getElementById('admin-logged-in-label').textContent = `Logged in as ${finalUser}`;
  ['admin-new-username','admin-current-pass','admin-new-pass','admin-confirm-pass']
    .forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
  showToast('Settings Saved ✓', 'Admin credentials updated successfully.', 'success');
}

themeToggles.forEach(btn => {
  btn.addEventListener('click', () => {
    mobileFrame.classList.toggle('theme-dark');
    updateThemeIcons();
  });
});

function updateThemeIcons() {
  const isDark = mobileFrame.classList.contains('theme-dark');
  themeToggles.forEach(btn => {
    if (isDark) {
      btn.innerHTML = `
        <svg class="w-4.5 h-4.5 text-[var(--toggle-icon-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"></path>
        </svg>
      `;
    } else {
      btn.innerHTML = `
        <svg class="w-4.5 h-4.5 text-[var(--toggle-icon-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
        </svg>
      `;
    }
  });
}

let toastTimeout;
function showToast(title, description, type = "success") {
  if (!toast || !toastTitle || !toastDesc) return;
  toastTitle.textContent = title;
  toastDesc.textContent = description;
  
  if (type === "success") {
    toastIconBox.className = "p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/30 text-emerald-400";
    toastIconBox.innerHTML = `
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    `;
  } else {
    toastIconBox.className = "p-2 bg-rose-500/10 rounded-xl border border-rose-500/30 text-rose-400";
    toastIconBox.innerHTML = `
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
      </svg>
    `;
  }

  toast.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
  
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
  }, 3000);
}

if (skipBtn) {
  skipBtn.addEventListener('click', () => {
    currentSession = { isGuest: true, name: "Guest User", email: "guest@deracare.pk" };
    updateProfileUI();
    showToast("Guest Session Active", "Entering Dera Care as a Guest...", "success");
    const usernameEl = document.getElementById('home-username');
    if (usernameEl) usernameEl.textContent = 'Guest';
    showScreen('home-container');
    switchTab(btnNavHome, homeDashboardView);
  });
}

if (googleBtn) {
  googleBtn.addEventListener('click', () => {
    if (googleModal) googleModal.classList.remove('hidden', 'translate-y-full');
  });
}
if (closeGoogleBtn) {
  closeGoogleBtn.addEventListener('click', () => {
    if (googleModal) {
      googleModal.classList.add('translate-y-full');
      setTimeout(() => googleModal.classList.add('hidden'), 300);
    }
  });
}

if (btnVoiceSearch) {
  btnVoiceSearch.addEventListener('click', () => {
    voiceOverlay.classList.remove('hidden', 'translate-y-full');
    const voiceTranscript = document.getElementById('voice-transcript');
    voiceTranscript.textContent = '"Listening..."';

    setTimeout(() => {
      voiceTranscript.textContent = '"Saying: Dr. Saifullah..."';
    }, 1000);

    setTimeout(() => {
      voiceTranscript.textContent = '"Saying: Dr. Saifullah... Heart specialist..."';
    }, 2000);

    setTimeout(() => {
      voiceOverlay.classList.add('translate-y-full');
      setTimeout(() => voiceOverlay.classList.add('hidden'), 300);

      const homeSearchInput = document.getElementById('home-search-input');
      if (homeSearchInput) {
        homeSearchInput.value = "Saifullah";
        renderDoctorsList(activeDoctorsFilter, "Saifullah");
      }
      showToast("Voice Recognized", "Searching matches for 'Dr. Saifullah Khan'", "success");
    }, 3200);
  });
}

let activeDoctorsFilter = "";
function renderDoctorsList(filterSpec = "", searchQuery = "") {
  const container = document.getElementById('doctors-list-container');
  const clearFilterBtn = document.getElementById('btn-clear-filter');
  if (!container) return;
  container.innerHTML = "";

  let list = doctorsData;
  
  if (filterSpec !== "") {
    list = list.filter(d => d.specialty.toLowerCase().includes(filterSpec.toLowerCase()) || filterSpec.toLowerCase().includes(d.specialty.toLowerCase()));
    if (clearFilterBtn) clearFilterBtn.classList.remove('hidden');
  } else {
    if (clearFilterBtn) clearFilterBtn.classList.add('hidden');
  }

  if (searchQuery !== "") {
    const query = searchQuery.toLowerCase();
    list = list.filter(d => d.name.toLowerCase().includes(query) || d.specialty.toLowerCase().includes(query));
  }

  if (list.length === 0) {
    container.innerHTML = `
      <div class="glass-card p-6 text-center rounded-2xl text-[var(--text-muted)] text-xs font-semibold">
        No doctors found matching filters in D.I. Khan.
      </div>
    `;
    return;
  }

  list.forEach(doc => {
    container.innerHTML += `
      <div class="glass-card p-4 rounded-2xl flex items-center justify-between border border-white/5">
        <div class="flex items-center space-x-3.5">
          <div class="w-11 h-11 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center text-lg font-bold">${doc.avatar}</div>
          <div class="space-y-0.5">
            <h4 class="text-[12px] font-bold text-[var(--text-color)]">${doc.name}</h4>
            <p class="text-[9px] text-[var(--text-muted)] font-semibold">${doc.specialty} Specialist | ${doc.hospital}</p>
            <div class="flex items-center space-x-2 text-[9px] font-semibold">
              <span class="text-amber-400 flex items-center">⭐ ${doc.rating}</span>
              <span class="text-[var(--text-muted)]">Rs. ${doc.fee} Fee</span>
            </div>
          </div>
        </div>
        <div class="flex flex-col space-y-1.5 flex-shrink-0">
          <button onclick="openDoctorProfile(${doc.id})" class="h-6 px-2.5 rounded-md border border-[var(--border-color)] hover:border-[var(--accent-color)] text-[var(--text-color)] text-[8px] font-bold focus:outline-none transition-colors">Profile</button>
          <button onclick="triggerSpecificBooking('${doc.name}', '${doc.specialty}')" class="h-6 px-2.5 rounded-md bg-[var(--accent-color)] text-[var(--bg-color)] text-[8px] font-extrabold uppercase focus:outline-none active:scale-95 transition-all">Book</button>
        </div>
      </div>
    `;
  });
}

const homeSearchInput = document.getElementById('home-search-input');
if (homeSearchInput) {
  homeSearchInput.addEventListener('input', (e) => {
    renderDoctorsList(activeDoctorsFilter, e.target.value);
  });
}

function filterDoctorsBySpecialty(specialty) {
  activeDoctorsFilter = specialty;
  const searchVal = homeSearchInput ? homeSearchInput.value : "";
  renderDoctorsList(specialty, searchVal);
  showToast("Filter Applied", `Showing ${specialty} specialists.`, "success");
  const anchor = document.getElementById('doctors-anchor');
  if (anchor) anchor.scrollIntoView({ behavior: 'smooth' });
}

function clearDoctorsFilter() {
  activeDoctorsFilter = "";
  const searchVal = homeSearchInput ? homeSearchInput.value : "";
  renderDoctorsList("", searchVal);
  showToast("Filters Cleared", "Showing all specialties.", "success");
}

let selectedProfileDoc = null;
function openDoctorProfile(id) {
  const doc = doctorsData.find(d => d.id === id);
  if (!doc) return;
  selectedProfileDoc = doc;

  document.getElementById('profile-avatar').textContent = doc.avatar;
  document.getElementById('profile-name').textContent = doc.name;
  document.getElementById('profile-spec').textContent = doc.specialty + " Specialist";
  document.getElementById('profile-credentials').textContent = doc.credentials;
  document.getElementById('profile-hospital').textContent = doc.hospital;
  document.getElementById('profile-timings').textContent = doc.timings;
  document.getElementById('profile-fee').textContent = `PKR ${doc.fee.toLocaleString()}`;
  document.getElementById('profile-about').textContent = doc.about;

  if (doctorProfileModal) doctorProfileModal.classList.remove('hidden', 'translate-y-full');
}

function closeDoctorProfile() {
  if (doctorProfileModal) {
    doctorProfileModal.classList.add('translate-y-full');
    setTimeout(() => doctorProfileModal.classList.add('hidden'), 300);
  }
  selectedProfileDoc = null;
}

function triggerBookingFromProfile() {
  if (!selectedProfileDoc) return;
  const dName = selectedProfileDoc.name;
  const dSpec = selectedProfileDoc.specialty;
  closeDoctorProfile();
  setTimeout(() => {
    triggerSpecificBooking(dName, dSpec);
  }, 350);
}

function renderAppointments() {
  const container = document.getElementById('appointments-list-container');
  if (!container) return;
  container.innerHTML = "";

  if (appointmentsData.length === 0) {
    container.innerHTML = `
      <div class="glass-card p-8 text-center rounded-2xl text-[var(--text-muted)] py-12">
        <span class="text-3xl">📅</span>
        <p class="text-xs font-bold mt-2">No active appointments found.</p>
      </div>
    `;
    return;
  }

  appointmentsData.forEach(app => {
    container.innerHTML += `
      <div class="glass-card p-4 rounded-2xl border border-white/5 space-y-3.5">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm font-bold">${app.avatar}</div>
            <div>
              <h4 class="text-xs font-bold text-[var(--text-color)]">${app.doctor}</h4>
              <p class="text-[9px] text-[var(--text-muted)] font-semibold">${app.specialty} | ${app.hospital}</p>
            </div>
          </div>
          <span class="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[8px] font-bold uppercase tracking-wider border border-emerald-500/10">Confirmed</span>
        </div>
        
        <div class="text-[9px] text-[var(--text-muted)] font-semibold pl-1 space-y-1">
          <p>Patient Name: <span class="text-[var(--text-color)] font-bold">${app.patientName}</span></p>
          <p>Contact Phone: <span class="text-[var(--text-color)] font-bold">${app.patientPhone}</span></p>
        </div>

        <div class="flex justify-between items-center text-[10px] text-[var(--text-muted)] font-semibold pt-1.5 border-t border-[var(--border-color)]">
          <span>📅 Date: ${app.date}</span>
          <span>🕙 Slot: ${app.time}</span>
        </div>
        <button onclick="cancelAppointment(${app.id})" class="w-full h-9 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] font-bold uppercase tracking-wider transition-all focus:outline-none hover:bg-rose-500/20">
          Cancel Appointment
        </button>
      </div>
    `;
  });
}

function cancelAppointment(id) {
  appointmentsData = appointmentsData.filter(a => a.id !== id);
  renderAppointments();
  showToast("Appointment Cancelled", "Doctor slot released back to portal.", "success");
}

function openSpecialtiesModal() {
  if (specialtiesModal) specialtiesModal.classList.remove('hidden', 'translate-y-full');
}
if (closeSpecialtiesBtn) {
  closeSpecialtiesBtn.addEventListener('click', () => {
    specialtiesModal.classList.add('translate-y-full');
    setTimeout(() => specialtiesModal.classList.add('hidden'), 300);
  });
}

function selectSpecialtyFromModal(specialty) {
  specialtiesModal.classList.add('translate-y-full');
  setTimeout(() => specialtiesModal.classList.add('hidden'), 300);
  filterDoctorsBySpecialty(specialty);
}

const srvDoctors = document.getElementById('srv-doctors');
if (srvDoctors) {
  srvDoctors.addEventListener('click', () => {
    const anchor = document.getElementById('doctors-anchor');
    if (anchor) anchor.scrollIntoView({ behavior: 'smooth' });
    showToast("Find Doctors", "Scrolled to cardiology & children specialist slots.", "success");
  });
}

const srvHospitals = document.getElementById('srv-hospitals');
if (srvHospitals) {
  srvHospitals.addEventListener('click', () => {
    if (hospitalsModal) hospitalsModal.classList.remove('hidden', 'translate-y-full');
  });
}
if (closeHospitalsBtn) {
  closeHospitalsBtn.addEventListener('click', () => {
    hospitalsModal.classList.add('translate-y-full');
    setTimeout(() => hospitalsModal.classList.add('hidden'), 300);
  });
}

const srvPharmacy = document.getElementById('srv-pharmacy');
if (srvPharmacy) {
  srvPharmacy.addEventListener('click', () => {
    if (medicineModal) medicineModal.classList.remove('hidden', 'translate-y-full');
  });
}
if (closeMedicineBtn) {
  closeMedicineBtn.addEventListener('click', () => {
    medicineModal.classList.add('translate-y-full');
    setTimeout(() => medicineModal.classList.add('hidden'), 300);
  });
}

const srvLabs = document.getElementById('srv-labs');
if (srvLabs) {
  srvLabs.addEventListener('click', () => {
    if (labModal) labModal.classList.remove('hidden', 'translate-y-full');
  });
}
if (closeLabBtn) {
  closeLabBtn.addEventListener('click', () => {
    labModal.classList.add('translate-y-full');
    setTimeout(() => labModal.classList.add('hidden'), 300);
  });
}

let selectedLabTestName = "";
function selectLabTest(element, name, price) {
  document.querySelectorAll('.lab-item-card').forEach(c => c.classList.remove('border-[var(--accent-color)]'));
  element.classList.add('border-[var(--accent-color)]');
  selectedLabTestName = name;
}

function confirmLabBooking() {
  if (selectedLabTestName === "") {
    showToast("Select Test", "Please click on a diagnostic test panel to select it.", "error");
    return;
  }
  showToast("Lab Appt Confirmed", `Rider will contact for home sample collection of ${selectedLabTestName}.`, "success");
  labModal.classList.add('translate-y-full');
  setTimeout(() => labModal.classList.add('hidden'), 300);
  selectedLabTestName = "";
}

const btnBannerBook = document.getElementById('btn-banner-book');
if (btnBannerBook) {
  btnBannerBook.addEventListener('click', () => {
    triggerSpecificBooking("Dr. Saifullah Khan", "Heart");
  });
}

let selectedDoctorBooking = "";
let selectedSpecialtyBooking = "";
function triggerSpecificBooking(docName, specialty) {
  if (currentSession.isGuest) {
    openGuestRegisterModal();
    return;
  }
  selectedDoctorBooking = docName;
  selectedSpecialtyBooking = specialty;
  document.getElementById('booking-doc-name').textContent = docName;
  document.getElementById('booking-doc-spec').textContent = specialty + " Specialist";
  
  document.getElementById('booking-patient-name').value = currentSession.name !== "Guest User" ? currentSession.name : "";
  document.getElementById('booking-patient-phone').value = "";
  document.getElementById('booking-date').value = "";
  document.getElementById('booking-time').value = "";
  document.getElementById('booking-notes').value = "";

  if (bookingModal) bookingModal.classList.remove('hidden', 'translate-y-full');
}

if (closeBookingBtn) {
  closeBookingBtn.addEventListener('click', () => {
    bookingModal.classList.add('translate-y-full');
    setTimeout(() => bookingModal.classList.add('hidden'), 300);
  });
}

function confirmBooking() {
  const pName = document.getElementById('booking-patient-name').value.trim();
  const pPhone = document.getElementById('booking-patient-phone').value.trim();
  const bDate = document.getElementById('booking-date').value;
  const bTime = document.getElementById('booking-time').value;
  const notes = document.getElementById('booking-notes').value.trim();

  if (!pName || !pPhone || !bDate || !bTime) {
    showToast("Missing Parameters", "Please fill in patient name, contact phone, select a date and time slot.", "error");
    return;
  }

  const docObj = doctorsData.find(d => d.name === selectedDoctorBooking) || { phone: "923001234561", hospital: "DHQ Hospital" };
  const docHospital = docObj.hospital;

  const newId = appointmentsData.length + 1;
  const initials = selectedDoctorBooking.split(' ').map(n => n[0]).join('');
  appointmentsData.push({
    id: newId,
    doctor: selectedDoctorBooking,
    hospital: docHospital,
    specialty: selectedSpecialtyBooking,
    date: bDate,
    time: bTime,
    avatar: initials.replace("Dr.", ""),
    patientName: pName,
    patientPhone: pPhone
  });

  docPendingCount++;
  const pendingEl = document.getElementById('doc-stat-pending');
  if (pendingEl) pendingEl.textContent = docPendingCount;

  if (!chatHistories[selectedDoctorBooking]) {
    chatHistories[selectedDoctorBooking] = [
      { sender: "them", text: `Hello ${pName}! ${selectedDoctorBooking}'s clinical team has received your consultation booking request.`, time: getCurrentTimeString() }
    ];
  }
  chatHistories[selectedDoctorBooking].push({
    sender: "me",
    text: `📅 *In-App Appointment Request*:\n• *Patient:* ${pName}\n• *Date:* ${bDate} at ${bTime}${notes ? `\n• *Symptoms/Notes:* ${notes}` : ""}`,
    time: getCurrentTimeString()
  });

  bookingModal.classList.add('translate-y-full');
  setTimeout(() => bookingModal.classList.add('hidden'), 300);

  showToast("Booking Request Sent ✓", `Appointment request logged for ${selectedDoctorBooking}.`, "success");

  switchTab(btnNavSlots, homeAppointmentsView);
  renderAppointments();
}

let activeChatName = "";
let activeChatAvatar = "";
let activeChatPhone = "";
let chatHistories = {};

function renderWhatsAppDoctorList() {
  const container = document.getElementById('whatsapp-doctor-list');
  const inAppContainer = document.getElementById('in-app-patient-doctor-list');
  
  const renderItem = (doc) => `
    <div class="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="w-9 h-9 rounded-full bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/20 text-[var(--accent-color)] flex items-center justify-center text-xs font-bold">${doc.avatar}</div>
        <div>
          <h4 class="text-[11px] font-bold text-[var(--text-color)]">${doc.name}</h4>
          <p class="text-[8px] text-[var(--text-muted)] font-semibold">${doc.specialty} Specialist</p>
        </div>
      </div>
      <button onclick="startInAppChat('${doc.name.replace(/'/g, "\\'")}', '${doc.avatar}', '${doc.phone}')" class="h-7 px-3 rounded-lg bg-[var(--accent-color)] text-[#0D1B2A] text-[9px] font-extrabold uppercase flex items-center space-x-1 transition-all shadow-md active:scale-95 focus:outline-none">
        <span>💬 In-App Chat</span>
      </button>
    </div>
  `;

  if (container) {
    container.innerHTML = doctorsData.map(renderItem).join('');
  }
  if (inAppContainer) {
    inAppContainer.innerHTML = doctorsData.map(renderItem).join('');
  }
}

function getCurrentTimeString() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return `${hours}:${minutes} ${ampm}`;
}

function startInAppChat(name, avatar, phone) {
  activeChatName = name;
  activeChatAvatar = avatar;
  activeChatPhone = phone;

  document.getElementById('chat-header-avatar').textContent = avatar;
  document.getElementById('chat-header-name').textContent = name;

  const messagesContainer = document.getElementById('in-app-chat-messages');
  messagesContainer.innerHTML = `
    <div class="flex justify-center my-2">
      <span class="px-3 py-1 bg-black/20 text-slate-300 text-[8px] font-bold rounded-lg uppercase tracking-wider">🔒 End-to-end encrypted chat with Dera Care</span>
    </div>
  `;

  if (!chatHistories[name]) {
    const timeStr = getCurrentTimeString();
    chatHistories[name] = [
      {
        sender: "them",
        text: name === 'Support Helpline' ? 
          'Hello! How can Dera Care support desk assist your health today?' : 
          `Hello! ${name}'s clinical assistant here. Please send details of your health condition or prescription queries.`,
        time: timeStr
      }
    ];
  }

  chatHistories[name].forEach(msg => {
    if (msg.sender === "me") {
      messagesContainer.innerHTML += `
        <div class="flex justify-end">
          <div class="bg-[var(--wa-bubble-sent-bg)] text-[var(--wa-bubble-sent-text)] self-end rounded-2xl rounded-tr-none p-2.5 max-w-[80%] text-[11px] shadow-sm font-semibold leading-relaxed flex flex-col items-end whitespace-pre-line">
            <span>${msg.text}</span>
            <span class="text-[8px] opacity-60 mt-0.5">${msg.time} ✓✓</span>
          </div>
        </div>
      `;
    } else {
      messagesContainer.innerHTML += `
        <div class="flex justify-start">
          <div class="bg-[var(--card-bg)] text-[var(--text-color)] border border-[var(--border-color)] self-start rounded-2xl rounded-tl-none p-2.5 max-w-[80%] text-[11px] shadow-sm font-medium leading-relaxed flex flex-col items-start whitespace-pre-line">
            <span>${msg.text}</span>
            <span class="text-[8px] text-[var(--text-muted)] mt-0.5">${msg.time}</span>
          </div>
        </div>
      `;
    }
  });

  const windowEl = document.getElementById('in-app-chat-window');
  if (windowEl) {
    windowEl.classList.remove('hidden');
    setTimeout(() => {
      windowEl.classList.remove('translate-x-full');
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 50);
  }
}

function exitInAppChat() {
  const windowEl = document.getElementById('in-app-chat-window');
  if (windowEl) {
    windowEl.classList.add('translate-x-full');
    setTimeout(() => {
      windowEl.classList.add('hidden');
    }, 300);
  }
  activeChatName = "";
  activeChatAvatar = "";
  activeChatPhone = "";
}

function sendInAppChatMessage() {
  const input = document.getElementById('in-app-chat-input');
  if (!input) return;
  const msg = input.value.trim();
  if (msg === "") return;
  
  const timeStr = getCurrentTimeString();
  const messagesContainer = document.getElementById('in-app-chat-messages');
  
  if (!chatHistories[activeChatName]) {
    chatHistories[activeChatName] = [];
  }
  chatHistories[activeChatName].push({
    sender: "me",
    text: msg,
    time: timeStr
  });

  messagesContainer.innerHTML += `
    <div class="flex justify-end">
      <div class="bg-[var(--wa-bubble-sent-bg)] text-[var(--wa-bubble-sent-text)] self-end rounded-2xl rounded-tr-none p-2.5 max-w-[80%] text-[11px] shadow-sm font-semibold leading-relaxed flex flex-col items-end whitespace-pre-line">
        <span>${msg}</span>
        <span class="text-[8px] opacity-60 mt-0.5">${timeStr} ✓✓</span>
      </div>
    </div>
  `;

  input.value = "";
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  setTimeout(() => {
    let reply = "";
    if (activeChatName === 'Support Helpline') {
      reply = "Hello! Dera Care Support team has received your ticket query. An administrator will respond shortly to resolve your inquiry.";
    } else {
      reply = `Hello! I have forwarded your message to ${activeChatName} for clinical review. Please expect a follow-up directly here or on your registered mobile contact.`;
    }

    const replyTime = getCurrentTimeString();
    chatHistories[activeChatName].push({
      sender: "them",
      text: reply,
      time: replyTime
    });

    messagesContainer.innerHTML += `
      <div class="flex justify-start">
        <div class="bg-[var(--card-bg)] text-[var(--text-color)] border border-[var(--border-color)] self-start rounded-2xl rounded-tl-none p-2.5 max-w-[80%] text-[11px] shadow-sm font-medium leading-relaxed flex flex-col items-start whitespace-pre-line">
          <span>${reply}</span>
          <span class="text-[8px] text-[var(--text-muted)] mt-0.5">${replyTime}</span>
        </div>
      </div>
    `;
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    showToast("Consultation Update", "New clinical reply received.", "success");
  }, 1200);
}

function openExternalWhatsAppFromChat() {
  const targetPhone = activeChatPhone || "923000000000";
  const text = encodeURIComponent(`Hello! I am chatting via the Dera Care mobile app and want to open our official consultation channel.`);
  const whatsappUrl = `https://wa.me/${targetPhone}?text=${text}`;
  window.open(whatsappUrl, '_blank');
  showToast("Redirecting...", "Opening official WhatsApp consultation...", "success");
}

const chatInput = document.getElementById('in-app-chat-input');
if (chatInput) {
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      sendInAppChatMessage();
    }
  });
}

const phoneInput = document.getElementById('phone-input');
const countrySelect = document.getElementById('country-select');
if (phoneInput && countrySelect) {
  phoneInput.addEventListener('input', (e) => {
    let digits = e.target.value.replace(/\D/g, '');
    let selectedVal = countrySelect.value;
    
    let formatted = '';
    if (selectedVal === '+92') {
      if (digits.length > 3) {
        formatted = digits.slice(0, 3) + ' ' + digits.slice(3, 10);
      } else {
        formatted = digits;
      }
    } else {
      formatted = digits; 
    }
    
    e.target.value = formatted;
    if (typeof validateInputState === 'function') validateInputState();
  });
}

googleAccountBtns.forEach(acc => {
  acc.addEventListener('click', () => {
    const pElements = acc.querySelectorAll('p');
    const nameText = pElements.length > 0 ? pElements[0].textContent : "User";
    const mailText = pElements.length > 1 ? pElements[1].textContent : "user@deracare.com";
    
    if (googleModal) {
      googleModal.classList.add('translate-y-full');
      setTimeout(() => googleModal.classList.add('hidden'), 300);
    }

    showToast("Signing In...", `Authenticating ${nameText}...`, "success");

    setTimeout(() => {
      currentSession = { isGuest: false, name: nameText, email: mailText };
      updateProfileUI();
      showScreen('patient-dashboard');
      const usernameEl = document.getElementById('home-username');
      if (usernameEl) usernameEl.textContent = nameText.split(' ')[0];
      switchTab(btnNavHome, homeDashboardView);
      showToast("Welcome Back ✓", `Logged in as ${nameText}.`, "success");
    }, 900);
  });
});

const appleBtn = document.getElementById('btn-apple');
if (appleBtn) {
  appleBtn.addEventListener('click', () => {
    if (googleModal) {
      googleModal.classList.remove('hidden', 'translate-y-full');
    }
  });
}

function openTermsModal() {
  if (termsModal) termsModal.classList.remove('hidden', 'translate-y-full');
}
function openPrivacyModal() {
  if (privacyModal) privacyModal.classList.remove('hidden', 'translate-y-full');
}

if (termsLinkBtn) {
  termsLinkBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openTermsModal();
  });
}

if (closeTermsBtn) {
  closeTermsBtn.addEventListener('click', () => {
    termsModal.classList.add('translate-y-full');
    setTimeout(() => termsModal.classList.add('hidden'), 300);
  });
}

if (privacyLinkBtn) {
  privacyLinkBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openPrivacyModal();
  });
}

if (closePrivacyBtn) {
  closePrivacyBtn.addEventListener('click', () => {
    privacyModal.classList.add('translate-y-full');
    setTimeout(() => privacyModal.classList.add('hidden'), 300);
  });
}

if (logoutCancelBtn) {
  logoutCancelBtn.addEventListener('click', () => {
    logoutModal.classList.add('translate-y-full');
    setTimeout(() => logoutModal.classList.add('hidden'), 300);
  });
}

if (logoutConfirmBtn) {
  logoutConfirmBtn.addEventListener('click', () => {
    logoutModal.classList.add('translate-y-full');
    setTimeout(() => logoutModal.classList.add('hidden'), 300);
    showToast("Signed Out", "Demo session cleared and reset successfully.", "success");
    logoutToLogin();
  });
}

function loadSelfSubmittedDoctors() {
  try {
    const saved = localStorage.getItem('dc_self_doctors');
    if (saved) {
      const list = JSON.parse(saved);
      if (Array.isArray(list)) {
        list.forEach(doc => {
          if (!doctorsData.some(d => d.id === doc.id)) {
            doctorsData.unshift(doc);
          }
        });
      }
    }
  } catch(e) {}
}

function submitDoctorSelfProfile() {
  const nameInput = document.getElementById('doc-self-name');
  const specInput = document.getElementById('doc-self-specialty');
  const feeInput = document.getElementById('doc-self-fee');
  const hospitalInput = document.getElementById('doc-self-hospital');
  const timingsInput = document.getElementById('doc-self-timings');

  const rawName = nameInput ? nameInput.value.trim() : "";
  const specialty = specInput ? specInput.value.trim() : "Cardiology";
  const fee = feeInput && feeInput.value ? parseInt(feeInput.value) : 1500;
  const hospital = hospitalInput && hospitalInput.value.trim() ? hospitalInput.value.trim() : "DHQ Hospital D.I. Khan";
  const timings = timingsInput && timingsInput.value.trim() ? timingsInput.value.trim() : "Mon - Sat: 04:00 PM - 08:00 PM";

  if (!rawName) {
    showToast("Missing Parameters", "Please enter your doctor full name.", "error");
    return;
  }

  const name = rawName.startsWith('Dr.') ? rawName : `Dr. ${rawName}`;
  const initials = rawName.replace('Dr.', '').trim().split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'DR';

  const newDoc = {
    id: Date.now(),
    name: name,
    specialty: specialty,
    hospital: hospital,
    fee: fee,
    avatar: initials,
    rating: 5.0,
    credentials: `MBBS, Specialist in ${specialty}`,
    timings: timings,
    about: `${name} is a verified clinical specialist in ${specialty} serving at ${hospital}. Self-registered via Doctor Portal.`,
    phone: "923001234567",
    isSelfSubmitted: true
  };

  doctorsData.unshift(newDoc);

  try {
    const saved = JSON.parse(localStorage.getItem('dc_self_doctors') || '[]');
    saved.unshift(newDoc);
    localStorage.setItem('dc_self_doctors', JSON.stringify(saved));
  } catch(e) {}

  renderDoctorsList();
  renderWhatsAppDoctorList();

  const docDashName = document.getElementById('doc-dashboard-name');
  if (docDashName) docDashName.textContent = newDoc.name;

  if (nameInput) nameInput.value = '';
  if (feeInput) feeInput.value = '';
  if (hospitalInput) hospitalInput.value = '';
  if (timingsInput) timingsInput.value = '';

  showToast("Profile Published ✓", `${newDoc.name} is now live on the Patient Home Dashboard!`, "success");
}

window.submitDoctorSelfProfile = submitDoctorSelfProfile;

// Initial load configurations
loadSavedUserSession();
loadSelfSubmittedDoctors();
renderDoctorsList();
renderWhatsAppDoctorList();

// Register PWA ServiceWorker for standalone installation
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => console.log('PWA ServiceWorker registered successfully:', reg.scope))
      .catch((err) => console.log('PWA ServiceWorker registration failed:', err));
  });
}
