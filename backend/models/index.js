// models/index.js
const sequelize = require('../config/connection');
const User = require('./User');
const Job = require('./Job');
const Message = require('./Message');
const Gig = require('./Gig');

// Employer kenekta Jobs godak thiyenna puluwan
User.hasMany(Job, { foreignKey: 'employerId', as: 'postedJobs' });
Job.belongsTo(User, { foreignKey: 'employerId', as: 'employer' }); // This foreign key is implicitly created by hasMany

// Student kenekta Jobs godak karanna (hired) puluwan
User.hasMany(Job, { foreignKey: 'studentId', as: 'tasks' });
Job.belongsTo(User, { foreignKey: 'studentId', as: 'freelancer' });

// Student kenekta Gigs godak thiyenna puluwan
User.hasMany(Gig, { foreignKey: 'studentId', as: 'gigs' });
Gig.belongsTo(User, { foreignKey: 'studentId', as: 'student' });

// Messages Relationships
User.hasMany(Message, { foreignKey: 'senderId', as: 'sentMessages' });
Message.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });

User.hasMany(Message, { foreignKey: 'receiverId', as: 'receivedMessages' });
Message.belongsTo(User, { foreignKey: 'receiverId', as: 'receiver' });

Job.hasMany(Message, { foreignKey: 'jobId', as: 'messages' });
Message.belongsTo(Job, { foreignKey: 'jobId', as: 'job' });

module.exports = {
  sequelize,
  User,
  Job,
  Message,
  Gig
};