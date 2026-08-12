
// Admin routes - student onboarding API eka (protected)
const express = require('express');
const { addSingleStudent, bulkAddStudents } = require('../controllers/adminController'); // Import admin controller functions
const { authenticate } = require('../middlewares/authMiddleware');
const { checkRole } = require('../middlewares/roleMiddleware'); // Import checkRole middleware

const router = express.Router();

// Me routes wala token eka aniwaryaya (JWT verify middleware eka)
router.use(authenticate);

// POST /api/admin/students/single - Ek student kenek add karanna (Admin only)
router.post('/students/single', checkRole('ADMIN'), addSingleStudent);

// POST /api/admin/students/bulk - Godak students la ekawara add karanna (Admin only)
router.post('/students/bulk', checkRole('ADMIN'), bulkAddStudents);

module.exports = router;
