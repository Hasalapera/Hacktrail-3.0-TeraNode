const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  senderId: {
    type: DataTypes.UUID,
    allowNull: false,
    // Associations in models/index.js define the reference
  },
  receiverId: {
    type: DataTypes.UUID,
    allowNull: false,
    // Associations in models/index.js define the reference
  },
  jobId: {
    type: DataTypes.UUID,
    allowNull: false,
    // Associations in models/index.js define the reference
  }
});

module.exports = Message;