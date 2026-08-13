// ============================================================
// Hacktrail-3.0-TeraNode Backend — server.js
// PERN Stack | CommonJS | Supabase PostgreSQL
// ============================================================

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const jobRoutes = require('./routes/jobRoutes'); // Import job routes
const { sequelize } = require('./models'); // Sequelize instance eka models walin import kirima
const authRoutes = require('./routes/authRoutes'); // Auth routes import kirima
const adminRoutes = require('./routes/adminRoutes'); // Admin routes import kirima
const studentRoutes = require('./routes/studentRoutes'); // Student routes import kirima
const chatRoutes = require('./routes/chatRoutes'); // Chat routes import kirima
const gigRoutes = require('./routes/gigRoutes'); // Gig routes import kirima
const { authenticate } = require('./middlewares/authMiddleware'); // JWT verify middleware eka

// .env file eke thiyena variables load karanna
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// ── Middleware ────────────────────────────────────────────────
// Vite dev server (http://localhost:5173) walin request accept karanna CORS configure kirima
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());

// ── Routes ───────────────────────────────────────────────────
// Moolika API Route eka
app.get('/', (req, res) => {
  res.send('Hacktrail API is running perfectly! 🚀 (Using CommonJS & Supabase DB)');
});

// Auth API Routes (POST /api/auth/register, POST /api/auth/login, GET /api/auth/me)
app.use('/api/auth', authRoutes);

// Admin API Routes (POST /api/admin/students/single, POST /api/admin/students/bulk)
app.use('/api/admin', adminRoutes);

// Student Gigs API Routes
app.use('/api/student', studentRoutes);

// Job API Routes (POST /api/jobs, GET /api/jobs, etc.)
app.use('/api/jobs', jobRoutes);

// Student API Routes
const studentRoutes = require('./routes/studentRoutes');
app.use('/api/students', studentRoutes);
// Chat API Routes (GET /api/chat/users, /api/chat/conversations, POST /api/chat/messages)
app.use('/api/chat', authenticate, chatRoutes);

// Gig API Routes (GET /api/gigs - approved student gigs for the freelancer marketplace)
app.use('/api/gigs', gigRoutes);

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
