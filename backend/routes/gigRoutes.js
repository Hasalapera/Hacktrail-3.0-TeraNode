// Gig routes eka define karanna (Express 5 Router)
const express = require('express');
const { getApprovedGigs } = require('../controllers/gigController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

// Siyalu gig routes authenticate middleware magin protect karal thiyenawa
router.use(authenticate);

// GET /api/gigs - Approved student gigs (freelancer marketplace browse)
router.get('/', getApprovedGigs);

module.exports = router;
