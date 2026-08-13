const express = require('express');
const router = express.Router();
const { updateProfile, getStudentProfile } = require('../controllers/studentController');
const { authenticate } = require('../middlewares/authMiddleware');

// PUT /api/students/profile - Student updates own profile
router.put('/profile', authenticate, updateProfile);

// GET /api/students/:id/profile - Employer views a specific student's public profile
router.get('/:id/profile', authenticate, getStudentProfile);

module.exports = router;
