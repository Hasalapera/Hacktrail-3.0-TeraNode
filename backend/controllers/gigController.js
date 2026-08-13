// Gig Controller - public gig listing (freelancer marketplace)
const { Gig, User } = require('../models');

// GET /api/gigs - Approved gigs from real students, with freelancer details
const getApprovedGigs = async (req, res, next) => {
  try {
    const gigs = await Gig.findAll({
      where: { status: 'APPROVED' },
      include: [
        {
          model: User,
          as: 'student',
          attributes: ['id', 'name', 'email', 'university_id', 'isOpenToWork', 'location', 'skills'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({
      success: true,
      data: gigs,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getApprovedGigs };
