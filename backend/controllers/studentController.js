// Student Controller - managing student gigs
const { Gig } = require('../models');

// 1. Get all gigs for the logged-in student (GET /api/student/gigs)
const getStudentGigs = async (req, res, next) => {
  try {
    const studentId = req.user.id;
    const gigs = await Gig.findAll({
      where: { studentId },
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({
      success: true,
      data: gigs,
    });
  } catch (error) {
    next(error);
  }
};

// 2. Create a new gig for the student (POST /api/student/gigs)
const createStudentGig = async (req, res, next) => {
  try {
    const studentId = req.user.id;
    const { title, category, subcategory, tags, price, description, status } = req.body;

    if (!title || !category || price === undefined || price === null) {
      return res.status(400).json({
        success: false,
        message: 'title, category, and price are required.',
      });
    }

    // Determine initial status based on request (default to PENDING)
    let initialStatus = 'PENDING';
    if (status && ['DRAFT', 'PENDING', 'PAUSED'].includes(status.toUpperCase())) {
      initialStatus = status.toUpperCase();
    }

    // Create the gig
    const newGig = await Gig.create({
      studentId,
      title,
      category,
      subcategory,
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : []),
      price,
      description,
      status: initialStatus,
    });

    res.status(201).json({
      success: true,
      message: 'Gig created successfully',
      data: newGig,
    });
  } catch (error) {
    next(error);
  }
};

// 3. Update a gig (PUT /api/student/gigs/:id)
const updateStudentGig = async (req, res, next) => {
  try {
    const studentId = req.user.id;
    const { id } = req.params;
    const { title, category, subcategory, tags, price, description, status } = req.body;

    const gig = await Gig.findOne({ where: { id, studentId } });

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: 'Gig not found or unauthorized to update.',
      });
    }

    // Update fields
    if (title !== undefined) gig.title = title;
    if (category !== undefined) gig.category = category;
    if (subcategory !== undefined) gig.subcategory = subcategory;
    if (tags !== undefined) {
      gig.tags = Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : []);
    }
    if (price !== undefined) gig.price = price;
    if (description !== undefined) gig.description = description;

    // Any update to a gig that isn't explicitly set to DRAFT/PAUSED
    // should reset its status to PENDING for admin re-approval
    if (status) {
      if (['DRAFT', 'PENDING', 'PAUSED'].includes(status.toUpperCase())) {
        gig.status = status.toUpperCase();
      } else {
        gig.status = 'PENDING';
      }
    } else {
      // If no status is specified in the update body, default to PENDING (re-approve)
      // unless it was previously a DRAFT
      if (gig.status !== 'DRAFT') {
        gig.status = 'PENDING';
      }
    }

    await gig.save();

    res.status(200).json({
      success: true,
      message: 'Gig updated successfully and is pending approval',
      data: gig,
    });
  } catch (error) {
    next(error);
  }
};

// 4. Delete a gig (DELETE /api/student/gigs/:id)
const deleteStudentGig = async (req, res, next) => {
  try {
    const studentId = req.user.id;
    const { id } = req.params;

    const gig = await Gig.findOne({ where: { id, studentId } });

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: 'Gig not found or unauthorized to delete.',
      });
    }

    await gig.destroy();

    res.status(200).json({
      success: true,
      message: 'Gig deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStudentGigs,
  createStudentGig,
  updateStudentGig,
  deleteStudentGig,
};
