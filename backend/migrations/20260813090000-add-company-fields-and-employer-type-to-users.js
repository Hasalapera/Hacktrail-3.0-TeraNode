'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('Users');

    if (!table.companyName) {
      await queryInterface.addColumn('Users', 'companyName', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }

    if (!table.industry) {
      await queryInterface.addColumn('Users', 'industry', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }

    if (!table.hrContactName) {
      await queryInterface.addColumn('Users', 'hrContactName', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }

    if (!table.employerType) {
      await queryInterface.addColumn('Users', 'employerType', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
  },

  async down(queryInterface) {
    const table = await queryInterface.describeTable('Users');

    if (table.companyName) {
      await queryInterface.removeColumn('Users', 'companyName');
    }

    if (table.industry) {
      await queryInterface.removeColumn('Users', 'industry');
    }

    if (table.hrContactName) {
      await queryInterface.removeColumn('Users', 'hrContactName');
    }

    if (table.employerType) {
      await queryInterface.removeColumn('Users', 'employerType');
    }
  },
};
