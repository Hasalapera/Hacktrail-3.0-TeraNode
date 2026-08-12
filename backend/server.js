// ============================================================
// UniLift Backend — server.js
// PERN Stack | Phase 1: In-Memory Auth & Onboarding API
// ============================================================

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize } = require('./models'); // Sequelize instance eka models walin import kirima
const authRoutes = require('./routes/authRoutes'); // Auth routes import kirima
const adminRoutes = require('./routes/adminRoutes'); // Admin routes import kirima

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
  res.send('Hacktrail API is running perfectly! 🚀 (Using CommonJS & Supabase DB)');
});

// Auth API Routes (POST /api/auth/register, POST /api/auth/login)
app.use('/api/auth', authRoutes);

// Admin API Routes (POST /api/admin/students/single, POST /api/admin/students/bulk)
app.use('/api/admin', adminRoutes);

// Server eka start kirimata pera DB connection eka check kirima
sequelize.authenticate()
  .then(() => {
    console.log('✅ Supabase PostgreSQL Database Connected Successfully!');
    
    // DB connect unata passe Server eka start kirima
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Unable to connect to the database:', error);
  });
