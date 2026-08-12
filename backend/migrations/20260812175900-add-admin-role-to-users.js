'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Users table eke role ENUM ekata 'ADMIN' value eka add karanna
    // (moolika create-users migration eketh 'enum_Users_role' widiyata hadala thiyenawa)
    await queryInterface.sequelize.query(
      `ALTER TYPE "enum_Users_role" ADD VALUE IF NOT EXISTS 'ADMIN';`
    );
  },

  async down(queryInterface, Sequelize) {
    // PostgreSQL enum eken value ekak remove karanna puluwan na (type eka recreate karala)
    // nisa down migration eka empty - note: role column eke ADMIN values thiyenawada 'STUDENT'/'EMPLOYER'
    // walata manually update karanna one
    console.log('Note: enum_Users_role cannot be rolled back automatically.');
  }
};
