
// Admin routes - student onboarding API eka (protected)
const express = require('express');
const {
	addSingleStudent,
	bulkAddStudents,
	listEmployerApprovals,
	approveEmployer,
	rejectEmployer,
	getPendingGigs,
	updateGigStatus,
} = require('../controllers/adminController'); // Import admin controller functions
const { authenticate } = require('../middlewares/authMiddleware');
const { checkRole } = require('../middlewares/roleMiddleware'); // Import checkRole middleware

const router = express.Router();

// Me routes wala token eka aniwaryaya (JWT verify middleware eka)
router.use(authenticate);

// Student Onboarding (Admin only)
router.post('/students/single', checkRole('ADMIN'), addSingleStudent);
router.post('/students/bulk', checkRole('ADMIN'), bulkAddStudents);

// GET /api/admin/employers - List company/retailer approval queue (Admin only)
router.get('/employers', checkRole('ADMIN'), listEmployerApprovals);

// PUT /api/admin/employers/:id/approve - Approve employer account (Admin only)
router.put('/employers/:id/approve', checkRole('ADMIN'), approveEmployer);

// PUT /api/admin/employers/:id/reject - Reject employer account (Admin only)
router.put('/employers/:id/reject', checkRole('ADMIN'), rejectEmployer);
// Gig Approvals (Admin only)
router.get('/gigs/pending', checkRole('ADMIN'), getPendingGigs);
router.put('/gigs/:id/status', checkRole('ADMIN'), updateGigStatus);

module.exports = router;
