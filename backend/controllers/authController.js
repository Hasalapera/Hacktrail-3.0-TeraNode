// 'import' wenuwata 'require' pawichchi kirima (CommonJS)
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { User } = require('../models');

// JWT eka generate karana helper function eka
const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register user eka - EMPLOYER kenekuta witharai self-register karanna puluwan
// (Students la self-register karanna ba - admin kenek add karanna one)
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Aniwaryaya fields check karanna
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'name, email and password are required' });
    }

    // Role eka diya nothari 'EMPLOYER' wenna oba; STUDENT self-register karanna ba
    if (role && role !== 'EMPLOYER') {
      return res.status(403).json({ message: 'Self-registration is only allowed for EMPLOYER accounts. Students are onboarded by an admin.' });
    }

    // Email eka already use karala thiyenawada kiyala check kirima
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Password eka bcrypt walin hash karala save kirima
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'EMPLOYER',
      isOpenToWork: false,
      skills: [],
    });

    const token = generateToken(user.id, user.role);

    res.status(201).json({
      message: 'Employer registered successfully',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isOpenToWork: user.isOpenToWork,
        skills: user.skills,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Login user eka - email EKATH university_id (student username) withara login karanna puluwan
const login = async (req, res) => {
  try {
    const { email, university_id, password } = req.body;

    const identifier = email || university_id;
    if (!identifier || !password) {
      return res.status(400).json({ message: 'email or university_id, and password are required' });
    }

    // email ekath university_id ekath dekama hoyaganna
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: identifier }, { university_id: identifier }],
      },
    });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Password eka match wena eka bcrypt compare karala check kirima
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // First login ekedi auto-generated password eka change karanna oba
    // - JWT eka denne na, eka change karala ganna kiyala message eka denawa
    if (user.mustChangePassword === true) {
      return res.status(200).json({
        requirePasswordChange: true,
        university_id: user.university_id,
        message: 'Please change your password to continue.',
      });
    }

    const token = generateToken(user.id, user.role);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        university_id: user.university_id,
        isOpenToWork: user.isOpenToWork,
        skills: user.skills,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// First login ekedi auto-generated password eka change karanna
const changeFirstPassword = async (req, res) => {
  try {
    const { university_id, oldPassword, newPassword } = req.body;

    if (!university_id || !oldPassword || !newPassword) {
      return res.status(400).json({ message: 'university_id, oldPassword and newPassword are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'newPassword must be at least 6 characters' });
    }

    const user = await User.findOne({ where: { university_id } });
    if (!user) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Old password eka verify karanna
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid old password' });
    }

    // New password eka hash karala update karanna, change eka karala nisa flag eka false karanna
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.mustChangePassword = false;
    await user.save();

    // Danna passe standard auth JWT eka return karanna
    const token = generateToken(user.id, user.role);

    res.json({
      message: 'Password changed successfully. You are now logged in.',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        university_id: user.university_id,
        isOpenToWork: user.isOpenToWork,
        skills: user.skills,
      },
    });
  } catch (error) {
    console.error('changeFirstPassword error:', error);
    res.status(500).json({ message: 'Server error while changing password' });
  }
};

module.exports = { register, login, changeFirstPassword };
