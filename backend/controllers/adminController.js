// Admin controller - student onboarding (admin keneku studentla add karana eka)
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { User } = require('../models');

// Ambiguous characters (0, O, 1, l, I) bharai eka wala nathi - random 8 char password eka hadanna
const generatePassword = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
  let password = '';
  for (let i = 0; i < 8; i++) {
    password += chars[crypto.randomInt(chars.length)];
  }
  return password;
};


// Students la email ekak nathi nisa placeholder email eka hadanna
// (User.email NOT NULL nisa) - university_id eka unique nisa email eka da unique
const buildStudentEmail = (universityId) => {
  return `${universityId.toLowerCase()}@student.local`;
};

// Ek student kenek add karanna
const addSingleStudent = async (req, res) => {
  try {
    const { name, university_id, skills } = req.body;

    if (!name || !university_id) {
      return res.status(400).json({ message: 'name and university_id are required' });
    }

    // Duplicate university_id ekak thiyenawada kiyala check kirima
    const existing = await User.findOne({ where: { university_id } });
    if (existing) {
      return res.status(409).json({ message: 'A student with this university_id already exists' });
    }

    // Auto-generated password eka hash karala save kirima
    const generatedPassword = generatePassword();
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    const student = await User.create({
      name,
      email: buildStudentEmail(university_id),
      password: hashedPassword,
      role: 'STUDENT',
      university_id,
      isOpenToWork: false,
      skills: skills || [],
      mustChangePassword: true, // First login ekedei password eka change karanna oba
    });

    res.status(201).json({
      message: 'Student added successfully. Share the generated password with them.',
      generatedPassword, // Admin eka password eka student ekata denna one
      student: {
        id: student.id,
        name: student.name,
        university_id: student.university_id,
        role: student.role,
        isOpenToWork: student.isOpenToWork,
        skills: student.skills,
      },
    });
  } catch (error) {
    console.error('addSingleStudent error:', error);
    res.status(500).json({ message: 'Server error while adding student' });
  }
};

// Godak students la ekawara add karanna (bulk)
const bulkAddStudents = async (req, res) => {
  try {
    const { students } = req.body;

    if (!Array.isArray(students) || students.length === 0) {
      return res.status(400).json({ message: 'students must be a non-empty array' });
    }

    const results = [];
    for (const student of students) {
      const { name, university_id, skills } = student;

      if (!name || !university_id) {
        return res.status(400).json({
          message: `Each student needs name and university_id (failed on: ${university_id || 'missing id'})`,
        });
      }

      const existing = await User.findOne({ where: { university_id } });
      if (existing) {
        return res.status(409).json({ message: `Duplicate university_id in request or DB: ${university_id}` });
      }

      const generatedPassword = generatePassword();
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);

      const created = await User.create({
        name,
        email: buildStudentEmail(university_id),
        password: hashedPassword,
        role: 'STUDENT',
        university_id,
        isOpenToWork: false,
        skills: skills || [],
        mustChangePassword: true,
      });

      results.push({ university_id: created.university_id, password: generatedPassword });
    }

    res.status(201).json({
      message: 'Students added successfully. Share the generated passwords with them.',
      students: results,
    });
  } catch (error) {
    console.error('bulkAddStudents error:', error);
    res.status(500).json({ message: 'Server error while adding students in bulk' });
  }
};

// Pending and recent employer accounts list karanna (companies + retailers)
const listEmployerApprovals = async (req, res) => {
  try {
    const employers = await User.findAll({
      where: { role: 'EMPLOYER' },
      attributes: [
        'id',
        'name',
        'email',
        'phoneNumber',
        'companyName',
        'industry',
        'hrContactName',
        'shopName',
        'businessType',
        'serviceType',
        'location',
        'ownerName',
        'employerType',
        'approvalStatus',
        'approvedAt',
        'createdAt',
      ],
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({
      success: true,
      data: employers,
    });
  } catch (error) {
    console.error('listEmployerApprovals error:', error);
    return res.status(500).json({ message: 'Server error while loading employer approvals' });
  }
};

const approveEmployer = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user || user.role !== 'EMPLOYER') {
      return res.status(404).json({ message: 'Employer account not found' });
    }

    user.approvalStatus = 'APPROVED';
    user.approvedAt = new Date();
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Employer approved successfully',
      data: {
        id: user.id,
        approvalStatus: user.approvalStatus,
        approvedAt: user.approvedAt,
      },
    });
  } catch (error) {
    console.error('approveEmployer error:', error);
    return res.status(500).json({ message: 'Server error while approving employer' });
  }
};

const rejectEmployer = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user || user.role !== 'EMPLOYER') {
      return res.status(404).json({ message: 'Employer account not found' });
    }

    user.approvalStatus = 'REJECTED';
    user.approvedAt = null;
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Employer rejected successfully',
      data: {
        id: user.id,
        approvalStatus: user.approvalStatus,
      },
    });
  } catch (error) {
    console.error('rejectEmployer error:', error);
    return res.status(500).json({ message: 'Server error while rejecting employer' });
  }
};

module.exports = {
  addSingleStudent,
  bulkAddStudents,
  listEmployerApprovals,
  approveEmployer,
  rejectEmployer,
};
