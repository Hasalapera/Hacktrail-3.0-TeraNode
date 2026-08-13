const express = require('express');
const router = express.Router();
const {
  updateProfile,
  getStudentProfile,
  getStudentGigs,
  createStudentGig,
  updateStudentGig,
  deleteStudentGig,
} = require('../controllers/studentController');
const { authenticate } = require('../middlewares/authMiddleware');
const { checkRole } = require('../middlewares/roleMiddleware');

// ── Student profile routes (any authenticated role) ─────────────────────
// PUT /api/students/profile - Student updates own profile
router.put('/profile', authenticate, updateProfile);

// GET /api/students/:id/profile - Employer views a specific student's public profile
router.get('/:id/profile', authenticate, getStudentProfile);

// ── Student gig routes (STUDENT only) ───────────────────────────────────
// Require student login for all these routes
router.use('/gigs', authenticate, checkRole('STUDENT'));

router.get('/gigs', getStudentGigs);
router.post('/gigs', createStudentGig);
router.put('/gigs/:id', updateStudentGig);
router.delete('/gigs/:id', deleteStudentGig);

module.exports = router;
