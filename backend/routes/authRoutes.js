// Auth routes eka define karanna (Express 5 Router)
const express = require('express');

const { register, login, changeFirstPassword, me, updateProfile, registerCompany } = require('../controllers/authController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

// POST /api/auth/register - Register employer user eka
router.post('/register', register);

// POST /api/auth/register/company - Register company account
router.post('/register/company', registerCompany);

// POST /api/auth/register/retailer - Register retailer/shop account
router.post('/register/retailer', registerRetailer);

// POST /api/auth/login - Login karala token eka ganna
router.post('/login', login);

// POST /api/auth/change-first-password - First login ekedi auto-generated password eka change karanna
router.post('/change-first-password', changeFirstPassword);

// GET /api/auth/me - Logged-in user eke details ganna (token verify wela)
router.get('/me', authenticate, me);

// PUT /api/auth/profile - Logged-in user eke profile update karන්න
router.put('/profile', authenticate, updateProfile);

module.exports = router;
