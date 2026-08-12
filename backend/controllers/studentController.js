// ============================================================
// Student Controller
// Handles: Complete Profile
// ============================================================

const { users } = require('../data/store');

// POST /student/complete-profile
const completeProfile = (req, res) => {
  const { username, firstName, lastName, university, year, degree, phone } = req.body;

  // Validate required fields
  if (!username || !firstName || !lastName || !university || !year) {
    return res.status(400).json({
      success: false,
      message: 'username, firstName, lastName, university, and year are required.',
    });
  }

  // Validate year
  const validYears = [1, 2, 3, 4, 5];
  if (!validYears.includes(Number(year))) {
    return res.status(400).json({
      success: false,
      message: 'year must be a number between 1 and 5.',
    });
  }

  // Find user
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found.',
    });
  }

  // Guard: must have changed password first
  if (user.isFirstLogin) {
    return res.status(403).json({
      success: false,
      message: 'You must change your temporary password before completing your profile.',
    });
  }

  // ✅ Update basicDetails and mark profile as completed
  user.basicDetails = {
    firstName,
    lastName,
    university,
    year: Number(year),
    degree: degree || null,
    phone: phone || user.phone,
  };
  user.profileCompleted = true;

  return res.status(200).json({
    success: true,
    message: 'Profile completed successfully! Welcome to UniLift 🚀',
    action: 'REDIRECT_TO_DASHBOARD',
    data: {
      username: user.username,
      profileCompleted: user.profileCompleted,
      basicDetails: user.basicDetails,
    },
  });
};

module.exports = { completeProfile };
