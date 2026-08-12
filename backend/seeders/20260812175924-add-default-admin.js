'use strict';

const bcrypt = require('bcrypt');
const crypto = require('crypto');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Default admin password eka hash karanna (admin123 - 10 salt rounds)
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // updateOnDuplicate: email eka unique nisa seed eka nidarwath run karana eka safe
    // (danna passe password/name update karanna)
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: crypto.randomUUID(),
          name: 'System Admin',
          email: 'admin@unitasker.lk',
          password: hashedPassword,
          role: 'ADMIN',
          university_id: null,
          isOpenToWork: false,
          mustChangePassword: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      // updateOnDuplicate + upsertKeys: email eka unique nisa seed eka nidarwath run karana eka safe
      // (danna passe password/name update karanna - ON CONFLICT (email) DO UPDATE)
      {
        updateOnDuplicate: ['password', 'name', 'role', 'updatedAt'],
        upsertKeys: ['email'],
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', { email: 'admin@unitasker.lk' });
  }
};
