const express = require('express');
const router = express.Router();
const { updateProfile } = require('../controllers/studentController');
const { authenticate } = require('../middlewares/authMiddleware');

// PUT /api/students/profile
router.put('/profile', authenticate, updateProfile);

module.exports = router;
