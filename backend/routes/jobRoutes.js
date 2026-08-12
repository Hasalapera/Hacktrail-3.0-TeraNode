// Job routes eka define karanna (Express 5 Router)
const express = require('express');
const {
  createJob,
  getEmployerJobs, // Import the new function
  getAllJobs,
  getJobById,
  assignJob,
  completeJob,
} = require('../controllers/jobController');
const { authenticate } = require('../middlewares/authMiddleware');
const { checkRole } = require('../middlewares/roleMiddleware');

const router = express.Router();

// Siyalu routes authenticate middleware magin protect karal thiyenawada
router.use(authenticate);

// POST /jobs - Employer create job
router.post('/', checkRole('EMPLOYER'), createJob);

// GET /jobs - List all open jobs (for students to browse)
router.get('/', getAllJobs);

// GET /jobs/my-gigs - List all jobs posted by the logged-in employer
router.get('/my-gigs', checkRole('EMPLOYER'), getEmployerJobs);

// GET /jobs/:id - Get single job details
router.get('/:id', getJobById);

// PUT /jobs/:id/assign - Student accepts job
router.put('/:id/assign', checkRole('STUDENT'), assignJob);

// PUT /jobs/:id/complete - Employer marks job as complete
router.put('/:id/complete', checkRole('EMPLOYER'), completeJob);

module.exports = router;
