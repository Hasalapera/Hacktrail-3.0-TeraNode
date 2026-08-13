const { User } = require('../models');

// Student profile setup and update
const updateProfile = async (req, res) => {
  try {
    const { name, username, phoneNumber, email, university_id } = req.body;

    // Auth middleware attaches the decoded token payload to req.user
    const studentId = req.user.id;

    if (!name || !username || !phoneNumber || !email || !university_id) {
      return res.status(400).json({ message: 'Full name, username, phone number, university ID and email are required.' });
    }

    const user = await User.findByPk(studentId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const normalizedUsername = username.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedUniversityId = university_id.trim();

    const existingUsername = await User.findOne({ where: { username: normalizedUsername } });
    if (existingUsername && existingUsername.id !== studentId) {
      return res.status(409).json({ message: 'Username is already taken' });
    }

    const existingEmail = await User.findOne({ where: { email: normalizedEmail } });
    if (existingEmail && existingEmail.id !== studentId) {
      return res.status(409).json({ message: 'Email is already taken' });
    }

    const existingUniversityId = await User.findOne({ where: { university_id: normalizedUniversityId } });
    if (existingUniversityId && existingUniversityId.id !== studentId) {
      return res.status(409).json({ message: 'University ID is already linked to another account' });
    }

    user.name = name.trim();
    user.username = normalizedUsername;
    user.phoneNumber = phoneNumber.trim();
    user.email = normalizedEmail;
    user.university_id = normalizedUniversityId;

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        university_id: user.university_id,
        isOpenToWork: user.isOpenToWork,
        skills: user.skills,
      }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error during profile update' });
  }
};

// Employer eken student profile eka balanna (job apply karapasse)
// GET /api/students/:id/profile - Employer role witharai
const getStudentProfile = async (req, res) => {
  try {
    const { id } = req.params;

    // Only EMPLOYER or ADMIN can view a student profile
    if (req.user.role !== 'EMPLOYER' && req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Access denied. Employers only.' });
    }

    const student = await User.findByPk(id, {
      attributes: ['id', 'name', 'username', 'email', 'phoneNumber', 'university_id', 'isOpenToWork', 'skills'],
    });

    if (!student || student.role === undefined) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ user: student });
  } catch (error) {
    console.error('getStudentProfile error:', error);
    res.status(500).json({ message: 'Server error fetching student profile' });
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
  updateProfile,
  getStudentProfile,
  getStudentGigs,
  createStudentGig,
  updateStudentGig,
  deleteStudentGig,
};
