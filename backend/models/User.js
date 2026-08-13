const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('STUDENT', 'EMPLOYER', 'ADMIN'),
    allowNull: false,
  },
  university_id: {
    // e.g., 'TG/2022/1357' - Only for students (username widiyata use wena nisa unique)
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  isOpenToWork: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Student profile eke toggle karanna puluwan
  },
  skills: {
    type: DataTypes.ARRAY(DataTypes.STRING), // e.g., ['Graphic Design', 'PC Repair']
    defaultValue: [],
  },
  mustChangePassword: {
    // Auto-generated password eka dena nisa, first login ekedi change karanna oba
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  about: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  languages: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

module.exports = User;