// Message Controller - Sending and retrieving messages for jobs
const { Message, Job, User } = require('../models');

// 1. Send Message (POST /api/messages)
const sendMessage = async (req, res, next) => {
  try {
    const { jobId, receiverId, content } = req.body;
    const senderId = req.user.id;

    // Required fields check karanna
    if (!jobId || !receiverId || !content) {
      return res.status(400).json({
        success: false,
        message: 'jobId, receiverId, and content are required.',
      });
    }

    // Job eka thiyenawada balanna
    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found.',
      });
    }

    // Requester (sender) me job eke employer da nathnam assigned student da kiyala check kirima
    const isEmployer = job.employerId === senderId;
    const isStudent = job.studentId === senderId;

    if (!isEmployer && !isStudent) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You are not a participant in this job negotiation.',
      });
    }

    // Message create karanna
    const message = await Message.create({
      jobId,
      senderId,
      receiverId,
      content,
    });

    // Sender details ekka response eka yawanna
    const messageWithSender = await Message.findByPk(message.id, {
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['id', 'name', 'role', 'university_id'],
        },
      ],
    });

    return res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: messageWithSender,
    });
  } catch (error) {
    next(error);
  }
};

// 2. Get Messages for a Job (GET /api/messages/:jobId)
const getMessages = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const userId = req.user.id;

    // Job eka thiyenawada balanna
    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found.',
      });
    }

    // Requester me job eke employer da nathnam assigned student da check kirima
    const isEmployer = job.employerId === userId;
    const isStudent = job.studentId === userId;

    if (!isEmployer && !isStudent) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You are not authorized to view messages for this job.',
      });
    }

    // Siyalu messages fetch karanna (createdAt ascending order)
    const messages = await Message.findAll({
      where: { jobId },
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['id', 'name', 'role', 'university_id'],
        },
      ],
      order: [['createdAt', 'ASC']],
    });

    return res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendMessage,
  getMessages,
};
