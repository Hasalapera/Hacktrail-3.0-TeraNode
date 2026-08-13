// 'import' wenuwata 'require' pawichchi kirima (CommonJS)
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { User } = require('../models');

// JWT eka generate karana helper function eka
const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const buildUserResponse = (user) => ({
  id: user.id,
  name: user.name,
  companyName: user.companyName,
  industry: user.industry,
  hrContactName: user.hrContactName,
  shopName: user.shopName,
  businessType: user.businessType,
  serviceType: user.serviceType,
  location: user.location,
  ownerName: user.ownerName,
  employerType: user.employerType,
  approvalStatus: user.approvalStatus,
  approvedAt: user.approvedAt,
  email: user.email,
  username: user.username,
  phoneNumber: user.phoneNumber,
  role: user.role,
  university_id: user.university_id,
  isOpenToWork: user.isOpenToWork,
  skills: user.skills,
});

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
      companyName: name,
      email,
      password: hashedPassword,
      role: 'EMPLOYER',
      employerType: 'COMPANY',
      approvalStatus: 'PENDING',
      approvedAt: null,
      isOpenToWork: false,
      skills: [],
    });

    const token = generateToken(user.id, user.role);

    res.status(201).json({
      message: 'Employer registered successfully',
      token,
      user: buildUserResponse(user),
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

const registerCompany = async (req, res) => {
  try {
    const {
      companyName,
      industry,
      hrContactName,
      email,
      contactNumber,
      password,
    } = req.body;

    if (!companyName || !industry || !hrContactName || !email || !contactNumber || !password) {
      return res.status(400).json({
        message: 'companyName, industry, hrContactName, email, contactNumber and password are required',
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address.' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters.' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: companyName,
      companyName,
      industry,
      hrContactName,
      email,
      phoneNumber: contactNumber,
      password: hashedPassword,
      role: 'EMPLOYER',
      employerType: 'COMPANY',
      approvalStatus: 'PENDING',
      approvedAt: null,
      isOpenToWork: false,
      skills: [],
    });

    const token = generateToken(user.id, user.role);

    res.status(201).json({
      message: 'Company registered successfully. Waiting for admin approval.',
      token,
      user: buildUserResponse(user),
    });
  } catch (error) {
    console.error('Company registration error:', error);
    res.status(500).json({ message: 'Server error during company registration' });
  }
};

const registerRetailer = async (req, res) => {
  try {
    const {
      shopName,
      businessType,
      serviceType,
      location,
      ownerName,
      email,
      phoneNumber,
      password,
    } = req.body;

    if (!shopName || !businessType || !location || !ownerName || !email || !phoneNumber || !password) {
      return res.status(400).json({
        message: 'shopName, businessType, location, ownerName, email, phoneNumber and password are required',
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address.' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters.' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: ownerName,
      shopName,
      businessType,
      serviceType: serviceType || businessType,
      location,
      ownerName,
      email,
      phoneNumber,
      password: hashedPassword,
      role: 'EMPLOYER',
      employerType: 'RETAILER',
      approvalStatus: 'PENDING',
      approvedAt: null,
      isOpenToWork: false,
      skills: [],
    });

    const token = generateToken(user.id, user.role);

    res.status(201).json({
      message: 'Retailer registered successfully. Waiting for admin approval.',
      token,
      user: buildUserResponse(user),
    });
  } catch (error) {
    console.error('Retailer registration error:', error);
    res.status(500).json({ message: 'Server error during retailer registration' });
  }
};

// Login user eka - email EKATH university_id (student username) withara login karanna puluwan
const login = async (req, res) => {
  try {
    const { email, university_id, password } = req.body;

    if ((!email && !university_id) || !password) {
      return res.status(400).json({ message: 'email or university_id, and password are required' });
    }

    // Mokadda identifier eka kiyala balala e anuva where clause eka hadanna
    // Eka parata email ekak ho university_id ekak witharai check karanne
    const whereClause = {};
    if (email) {
      whereClause.email = email;
    } else {
      whereClause.university_id = university_id;
    }

    const user = await User.findOne({ where: whereClause });
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

    if (user.role === 'EMPLOYER' && user.approvalStatus !== 'APPROVED') {
      return res.status(403).json({
        message: 'Your account is waiting for admin approval.',
        approvalStatus: user.approvalStatus,
      });
    }

    const token = generateToken(user.id, user.role);

    res.json({
      message: 'Login successful',
      token,
      user: buildUserResponse(user),
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
      user: buildUserResponse(user),
    });
  } catch (error) {
    console.error('changeFirstPassword error:', error);
    res.status(500).json({ message: 'Server error while changing password' });
  }
};

// Current logged-in user eke details return karanna (protected - JWT token eka awashya)
const me = async (req, res) => {
  try {
    // req.user middleware eken set karanawa (authMiddleware)
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: buildUserResponse(user),
    });
  } catch (error) {
    console.error('Me error:', error);
    res.status(500).json({ message: 'Server error while fetching user' });
  }
};

module.exports = { register, registerCompany, registerRetailer, login, changeFirstPassword, me };
