// Admin routes - student onboarding API eka (protected)
const express = require('express');
const { addSingleStudent, bulkAddStudents } = require('../controllers/adminController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

// Me routes wala token eka aniwaryaya (JWT verify middleware eka)
router.use(authenticate);

// POST /api/admin/students/single - Ek student kenek add karanna
router.post('/students/single', addSingleStudent);

// POST /api/admin/students/bulk - Godak students la ekawara add karanna
router.post('/students/bulk', bulkAddStudents);

module.exports = router;
