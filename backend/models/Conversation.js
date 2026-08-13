const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Conversation = sequelize.define('Conversation', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  participant1Id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  participant2Id: {
    type: DataTypes.UUID,
    allowNull: false,
  }
}, {
  // Composite unique index to prevent duplicate rooms between two participants
  indexes: [
    {
      unique: true,
      fields: ['participant1Id', 'participant2Id']
    }
  ]
});

module.exports = Conversation;
