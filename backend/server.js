// ============================================================
// UniLift Backend — server.js
// PERN Stack | Phase 1: In-Memory Auth & Onboarding API
// ============================================================

const express = require('express');
const cors    = require('cors');
const dotenv  = require('dotenv');

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Routes ───────────────────────────────────────────────────
const adminRoutes   = require('./routes/adminRoutes');
const authRoutes    = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');

app.use('/admin',   adminRoutes);
app.use('/auth',    authRoutes);
app.use('/student', studentRoutes);

// ── Health Check ─────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'UniLift API is running 🚀',
    version: '1.0.0 (In-Memory Mode)',
    endpoints: [
      'POST /admin/add-students',
      'POST /auth/login',
      'POST /auth/change-password',
      'POST /student/complete-profile',
    ],
  });
});

// ── 404 Handler ──────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
});

// ── Start Server ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 UniLift API server started`);
  console.log(`   URL  : http://localhost:${PORT}`);
  console.log(`   Mode : In-Memory (no DB required)`);
  console.log(`   Time : ${new Date().toLocaleString()}\n`);
});