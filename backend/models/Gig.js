const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Gig = sequelize.define('Gig', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  studentId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subcategory: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('DRAFT', 'PENDING', 'APPROVED', 'REJECTED', 'PAUSED'),
    defaultValue: 'PENDING',
  },
  impressions: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  clicks: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  orders: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  cancellations: {
    type: DataTypes.STRING,
    defaultValue: '0%',
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Gig;
