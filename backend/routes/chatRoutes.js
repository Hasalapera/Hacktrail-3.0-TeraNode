// Chat routes eka define karanna (Express 5 Router)
// /api/chat walata mount karala authenticate middleware magin protect karanawa
const express = require('express');
const {
  searchUsers,
  getConversations,
  getMessages,
  sendMessage,
} = require('../controllers/chatController');

const router = express.Router();

// GET /api/chat/users - Search users to chat with (?search=&roleFilter=)
router.get('/users', searchUsers);

// GET /api/chat/conversations - Logged-in user ge conversations list eka
router.get('/conversations', getConversations);

// GET /api/chat/conversations/:id/messages - Conversation ekak message history eka
router.get('/conversations/:id/messages', getMessages);

// POST /api/chat/messages - Message ekak yawanna (receiverId + content)
router.post('/messages', sendMessage);

module.exports = router;
