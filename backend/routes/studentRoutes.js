const express = require('express');
const router = express.Router();
const { completeProfile } = require('../controllers/studentController');

// POST /student/complete-profile
router.post('/complete-profile', completeProfile);

module.exports = router;
