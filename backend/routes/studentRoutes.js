const express = require('express');
const router = express.Router();
const { updateProfile, getStudentProfile } = require('../controllers/studentController');
const { authenticate } = require('../middlewares/authMiddleware');

// PUT /api/students/profile - Student updates own profile
router.put('/profile', authenticate, updateProfile);

// GET /api/students/:id/profile - Employer views a specific student's public profile
router.get('/:id/profile', authenticate, getStudentProfile);
const {
  getStudentGigs,
  createStudentGig,
  updateStudentGig,
  deleteStudentGig
} = require('../controllers/studentController');
const { authenticate } = require('../middlewares/authMiddleware');
const { checkRole } = require('../middlewares/roleMiddleware');

const router = express.Router();

// Require student login for all these routes
router.use(authenticate);
router.use(checkRole('STUDENT'));

router.get('/gigs', getStudentGigs);
router.post('/gigs', createStudentGig);
router.put('/gigs/:id', updateStudentGig);
router.delete('/gigs/:id', deleteStudentGig);

module.exports = router;
