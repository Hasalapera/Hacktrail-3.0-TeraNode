'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('Users');

    if (!table.approvalStatus) {
      await queryInterface.addColumn('Users', 'approvalStatus', {
        type: Sequelize.ENUM('PENDING', 'APPROVED', 'REJECTED'),
        allowNull: false,
        defaultValue: 'APPROVED',
      });
    }

    if (!table.approvedAt) {
      await queryInterface.addColumn('Users', 'approvedAt', {
        type: Sequelize.DATE,
        allowNull: true,
      });
    }
  },

  async down(queryInterface) {
    const table = await queryInterface.describeTable('Users');

    if (table.approvedAt) {
      await queryInterface.removeColumn('Users', 'approvedAt');
    }

    if (table.approvalStatus) {
      await queryInterface.removeColumn('Users', 'approvalStatus');
    }

    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Users_approvalStatus";');
  },
};
