// ============================================================
// Admin Controller
// Handles: Simulated Excel upload → generates credentials
// ============================================================

const { users } = require('../data/store');

// --- Helper: Generate Username ---
// Format: uni_<name>_<4-digit-number>  e.g. uni_nimal_4821
const generateUsername = (name, index) => {
  const cleanName = name.toLowerCase().replace(/\s+/g, '');
  const suffix = String(Math.floor(1000 + Math.random() * 9000));
  return `uni_${cleanName}_${suffix}`;
};

// --- Helper: Generate Random Password ---
// 8-character alphanumeric temp password
const generatePassword = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let password = '';
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

// --- Helper: Simulate SMS Service ---
const sendSms = (phone, username, password) => {
  console.log('--------------------------------------');
  console.log(`📱 SMS SENT TO: ${phone}`);
  console.log(`   Your UniLift username : ${username}`);
  console.log(`   Your temporary password: ${password}`);
  console.log(`   Please log in and change your password immediately.`);
  console.log('--------------------------------------');
};

// POST /admin/add-students
const addStudents = (req, res) => {
  const { students } = req.body;

  // Validate payload
  if (!students || !Array.isArray(students) || students.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Request body must contain a non-empty "students" array.',
    });
  }

  const createdStudents = [];

  students.forEach((student, index) => {
    const { phone, name } = student;

    if (!phone || !name) {
      console.warn(`⚠️  Skipping entry at index ${index}: missing phone or name.`);
      return; // skip this entry
    }

    const username = generateUsername(name, index);
    const password = generatePassword();
    const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

    const newUser = {
      id: newId,
      phone,
      username,
      password,
      isFirstLogin: true,
      profileCompleted: false,
      basicDetails: {},
    };

    users.push(newUser);
    sendSms(phone, username, password);

    createdStudents.push({ id: newId, phone, username });
  });

  return res.status(201).json({
    success: true,
    message: `${createdStudents.length} student(s) added successfully. SMS credentials sent.`,
    data: createdStudents,
  });
};

module.exports = { addStudents };
