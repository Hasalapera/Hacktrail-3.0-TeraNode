const { Sequelize } = require('sequelize');
require('dotenv').config();

// Supabase PostgreSQL Database connection setup (SSL athulathwa)
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  logging: false, // Console eke queries run wena eka pennana eka nawathwai
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Supabase cloud DB ekata connect wenna meka awashyai
    }
  }
});

module.exports = sequelize;