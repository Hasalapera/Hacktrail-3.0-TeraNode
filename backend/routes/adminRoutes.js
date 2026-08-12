const express = require('express');
const router = express.Router();
const { addStudents } = require('../controllers/adminController');

// POST /admin/add-students
router.post('/add-students', addStudents);

module.exports = router;
