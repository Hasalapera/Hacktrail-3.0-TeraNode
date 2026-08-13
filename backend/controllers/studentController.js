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

module.exports = {
  updateProfile
};
