// Auth routes eka define karanna (Express 5 Router)
const express = require('express');
const { register, login, changeFirstPassword } = require('../controllers/authController');

const router = express.Router();

// POST /api/auth/register - Register employer user eka
router.post('/register', register);

// POST /api/auth/login - Login karala token eka ganna
router.post('/login', login);

// POST /api/auth/change-first-password - First login ekedi auto-generated password eka change karanna
router.post('/change-first-password', changeFirstPassword);

module.exports = router;
