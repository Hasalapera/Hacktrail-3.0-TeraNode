
// Admin routes - student onboarding API eka (protected)
const express = require('express');
const { addSingleStudent, bulkAddStudents, getPendingGigs, updateGigStatus } = require('../controllers/adminController'); // Import admin controller functions
const { authenticate } = require('../middlewares/authMiddleware');
const { checkRole } = require('../middlewares/roleMiddleware'); // Import checkRole middleware

const router = express.Router();

// Me routes wala token eka aniwaryaya (JWT verify middleware eka)
router.use(authenticate);

// Student Onboarding (Admin only)
router.post('/students/single', checkRole('ADMIN'), addSingleStudent);
router.post('/students/bulk', checkRole('ADMIN'), bulkAddStudents);

// Gig Approvals (Admin only)
router.get('/gigs/pending', checkRole('ADMIN'), getPendingGigs);
router.put('/gigs/:id/status', checkRole('ADMIN'), updateGigStatus);

module.exports = router;
