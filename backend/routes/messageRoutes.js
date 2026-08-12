// Message routes eka define karanna (Express 5 Router)
const express = require('express');
const {
  sendMessage,
  getMessages,
} = require('../controllers/messageController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

// Siyalu message routes authenticate karanna aniwaryai
router.use(authenticate);

// POST /api/messages - Send a message
router.post('/', sendMessage);

// GET /api/messages/:jobId - Get messages for a specific job
router.get('/:jobId', getMessages);

module.exports = router;
