// Job Controller - Jobs posting, listing, viewing, and assigning
const { Job, User } = require('../models');

// 1. Create Job (POST /api/jobs) - Employer witharai
const createJob = async (req, res, next) => {
  try {
    const { title, description, category, paymentType, amount } = req.body;

    // Aniwaryaya fields check karanna
    if (!title || !description || !category || !paymentType || amount === undefined || amount === null) {
      return res.status(400).json({
        success: false,
        message: 'title, description, category, paymentType, and amount are required.',
      });
    }

    // Payment type validation
    if (!['TASK_BASED', 'DAILY_WAGE'].includes(paymentType)) {
      return res.status(400).json({
        success: false,
        message: 'paymentType must be either TASK_BASED or DAILY_WAGE.',
      });
    }

    // New Job create karanna (employerId eka logged-in user generic token eken labeno)
    const job = await Job.create({
      title,
      description,
      category,
      paymentType,
      amount,
      status: 'OPEN',
      employerId: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: 'Job created successfully',
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

// 2. Get All Open Jobs (GET /api/jobs) - Open jobs witharai, employer details ekka
const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.findAll({
      where: { status: 'OPEN' },
      include: [
        {
          model: User,
          as: 'employer',
          attributes: ['id', 'name', 'email'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};

// 2.1. Get All Jobs for the Logged-in Employer (GET /api/jobs/my-gigs)
const getEmployerJobs = async (req, res, next) => {
  try {
    const jobs = await Job.findAll({
      where: { employerId: req.user.id }, // Filter by logged-in employer's ID
      include: [
        {
          model: User,
          as: 'employer',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: User,
          as: 'freelancer',
          attributes: ['id', 'name', 'email', 'university_id'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    next(error);
  }
};

// 3. Get Job by ID (GET /api/jobs/:id) - Single job detailing employer & freelancer
const getJobById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const job = await Job.findByPk(id, {
      include: [
        {
          model: User,
          as: 'employer',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: User,
          as: 'freelancer',
          attributes: ['id', 'name', 'email', 'university_id'],
        },
      ],
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

// 4. Assign Job to Student (PUT /api/jobs/:id/assign) - Student only
const assignJob = async (req, res, next) => {
  try {
    const { id } = req.params;

    const job = await Job.findByPk(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    // Job status check karanna (Open wunoth witharai apply/assign karanna puluwan)
    if (job.status !== 'OPEN') {
      return res.status(400).json({
        success: false,
        message: 'Job is no longer open for assignment.',
      });
    }

    // Student accept karal status IN_PROGRESS kirima saha studentId attach kirima
    job.status = 'IN_PROGRESS';
    job.studentId = req.user.id;
    await job.save();

    // Reload job with association details
    const updatedJob = await Job.findByPk(id, {
      include: [
        {
          model: User,
          as: 'employer',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: User,
          as: 'freelancer',
          attributes: ['id', 'name', 'email', 'university_id'],
        },
      ],
    });

    return res.status(200).json({
      success: true,
      message: 'Job assigned successfully',
      data: updatedJob,
    });
  } catch (error) {
    next(error);
  }
};

// 5. Complete Job (PUT /api/jobs/:id/complete) - Employer only
const completeJob = async (req, res, next) => {
  try {
    const { id } = req.params;

    const job = await Job.findByPk(id);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Only the employer who posted the job can mark it as complete
    if (job.employerId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Forbidden: You are not the employer of this job.' });
    }

    // Job must be in IN_PROGRESS status to be completed
    if (job.status !== 'IN_PROGRESS') {
      return res.status(400).json({ success: false, message: 'Job must be in IN_PROGRESS status to be completed.' });
    }

    job.status = 'COMPLETED';
    await job.save();

    return res.status(200).json({ success: true, message: 'Job marked as completed.', data: job });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getEmployerJobs,
  getJobById,
  assignJob,
  completeJob,
};
