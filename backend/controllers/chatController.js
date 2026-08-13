const { Op } = require('sequelize');
const { User, Conversation, DirectMessage } = require('../models');

// GET /api/chat/users - Search users to chat with
const searchUsers = async (req, res) => {
  try {
    const { search, roleFilter } = req.query;
    
    const where = {
      id: { [Op.ne]: req.user.id } // exclude self
    };

    if (roleFilter) {
      where.role = roleFilter;
      // If filtering Students, strictly check open to work status
      if (roleFilter === 'STUDENT') {
        where.isOpenToWork = true;
      }
    }

    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search.trim()}%` } },
        { email: { [Op.iLike]: `%${search.trim()}%` } },
        { username: { [Op.iLike]: `%${search.trim()}%` } },
        { university_id: { [Op.iLike]: `%${search.trim()}%` } }
      ];
    }

    const users = await User.findAll({
      where,
      attributes: ['id', 'name', 'email', 'role', 'university_id', 'username', 'isOpenToWork'],
      limit: 30
    });

    res.json({ success: true, data: users });
  } catch (error) {
    console.error('searchUsers error:', error);
    res.status(500).json({ message: 'Server error while searching users' });
  }
};

// GET /api/chat/conversations - Retrieve active conversations list for req.user
const getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: [
          { participant1Id: req.user.id },
          { participant2Id: req.user.id }
        ]
      },
      include: [
        {
          model: User,
          as: 'participant1',
          attributes: ['id', 'name', 'email', 'role', 'university_id', 'username']
        },
        {
          model: User,
          as: 'participant2',
          attributes: ['id', 'name', 'email', 'role', 'university_id', 'username']
        },
        {
          model: DirectMessage,
          as: 'messages',
          limit: 1,
          order: [['createdAt', 'DESC']]
        }
      ]
    });

    const formatted = conversations.map(c => {
      const otherParticipant = c.participant1Id === req.user.id ? c.participant2 : c.participant1;
      const latestMessage = c.messages && c.messages[0] ? c.messages[0] : null;
      return {
        id: c.id,
        otherParticipant,
        latestMessage,
        updatedAt: c.updatedAt
      };
    });

    // Sort by latest message date descending
    formatted.sort((a, b) => {
      const timeA = a.latestMessage ? new Date(a.latestMessage.createdAt) : new Date(a.updatedAt);
      const timeB = b.latestMessage ? new Date(b.latestMessage.createdAt) : new Date(b.updatedAt);
      return timeB - timeA;
    });

    res.json({ success: true, data: formatted });
  } catch (error) {
    console.error('getConversations error:', error);
    res.status(500).json({ message: 'Server error while fetching conversations' });
  }
};

// GET /api/chat/conversations/:id/messages - Get message history
const getMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const conversation = await Conversation.findByPk(id);
    
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    // Verify user is part of conversation
    if (conversation.participant1Id !== req.user.id && conversation.participant2Id !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Mark messages from other sender as read
    await DirectMessage.update(
      { isRead: true },
      {
        where: {
          conversationId: id,
          senderId: { [Op.ne]: req.user.id },
          isRead: false
        }
      }
    );

    const messages = await DirectMessage.findAll({
      where: { conversationId: id },
      order: [['createdAt', 'ASC']]
    });

    res.json({ success: true, data: messages });
  } catch (error) {
    console.error('getMessages error:', error);
    res.status(500).json({ message: 'Server error while fetching message logs' });
  }
};

// POST /api/chat/messages - Send a message
const sendMessage = async (req, res) => {
  try {
    const { receiverId, content } = req.body;

    if (!receiverId || !content || !content.trim()) {
      return res.status(400).json({ message: 'receiverId and content are required' });
    }

    if (receiverId === req.user.id) {
      return res.status(400).json({ message: 'Cannot chat with yourself' });
    }

    // Ensure recipient exists
    const recipient = await User.findByPk(receiverId);
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }

    // Enforce p1 < p2 room sorting uniqueness
    const p1 = req.user.id < receiverId ? req.user.id : receiverId;
    const p2 = req.user.id < receiverId ? receiverId : req.user.id;

    let [conversation] = await Conversation.findOrCreate({
      where: { participant1Id: p1, participant2Id: p2 }
    });

    const message = await DirectMessage.create({
      conversationId: conversation.id,
      senderId: req.user.id,
      content: content.trim(),
      isRead: false
    });

    res.status(201).json({ success: true, data: message });
  } catch (error) {
    console.error('sendMessage error:', error);
    res.status(500).json({ message: 'Server error while sending message' });
  }
};

module.exports = {
  searchUsers,
  getConversations,
  getMessages,
  sendMessage
};
