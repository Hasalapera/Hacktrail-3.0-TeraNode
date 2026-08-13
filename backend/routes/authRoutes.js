// Auth routes eka define karanna (Express 5 Router)
const express = require('express');
const { register, registerRetailer, login, changeFirstPassword, me } = require('../controllers/authController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

// POST /api/auth/register - Register employer user eka
router.post('/register', register);

// POST /api/auth/register/retailer - Register retailer/shop account
router.post('/register/retailer', registerRetailer);

// POST /api/auth/login - Login karala token eka ganna
router.post('/login', login);

// POST /api/auth/change-first-password - First login ekedi auto-generated password eka change karanna
router.post('/change-first-password', changeFirstPassword);

// GET /api/auth/me - Logged-in user eke details ganna (token verify wela)
router.get('/me', authenticate, me);

module.exports = router;
