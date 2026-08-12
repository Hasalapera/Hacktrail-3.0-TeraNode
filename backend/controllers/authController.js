// ============================================================
// Auth Controller
// Handles: Student Login & Change Password
// ============================================================

const { users } = require('../data/store');

// POST /auth/login
const login = (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'username and password are required.',
    });
  }

  // Find user in the store
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials. Username not found.',
    });
  }

  // Check password
  if (user.password !== password) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials. Incorrect password.',
    });
  }

  // ✅ Credentials are correct — check if it's the first login
  if (user.isFirstLogin) {
    return res.status(200).json({
      success: true,
      isFirstLogin: true,
      message: 'Login successful. Please change your temporary password.',
      action: 'REDIRECT_TO_CHANGE_PASSWORD', // Frontend reads this flag
      userId: user.id,
      username: user.username,
    });
  }

  // ✅ Regular login — check profile completion
  return res.status(200).json({
    success: true,
    isFirstLogin: false,
    profileCompleted: user.profileCompleted,
    message: user.profileCompleted
      ? 'Login successful. Welcome back!'
      : 'Login successful. Please complete your profile.',
    action: user.profileCompleted ? 'REDIRECT_TO_DASHBOARD' : 'REDIRECT_TO_COMPLETE_PROFILE',
    userId: user.id,
    username: user.username,
  });
};

// POST /auth/change-password
const changePassword = (req, res) => {
  const { username, oldPassword, newPassword } = req.body;

  // Validate input
  if (!username || !oldPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: 'username, oldPassword, and newPassword are required.',
    });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({
      success: false,
      message: 'New password must be at least 8 characters long.',
    });
  }

  if (oldPassword === newPassword) {
    return res.status(400).json({
      success: false,
      message: 'New password must be different from the old password.',
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

  // Verify old password
  if (user.password !== oldPassword) {
    return res.status(401).json({
      success: false,
      message: 'Old password is incorrect.',
    });
  }

  // ✅ Update password and clear first-login flag
  user.password = newPassword;
  user.isFirstLogin = false;

  return res.status(200).json({
    success: true,
    message: 'Password changed successfully. You can now log in with your new password.',
    action: user.profileCompleted ? 'REDIRECT_TO_DASHBOARD' : 'REDIRECT_TO_COMPLETE_PROFILE',
  });
};

module.exports = { login, changePassword };
