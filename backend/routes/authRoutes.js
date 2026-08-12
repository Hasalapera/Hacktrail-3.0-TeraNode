const express = require('express');
const router = express.Router();
const { login, changePassword } = require('../controllers/authController');

// POST /auth/login
router.post('/login', login);

// POST /auth/change-password
router.post('/change-password', changePassword);

module.exports = router;
