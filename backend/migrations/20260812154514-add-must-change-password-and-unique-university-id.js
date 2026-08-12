'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // mustChangePassword column eka add karanna (student password change kala yuthu da kiyana eka track karanna)
    await queryInterface.addColumn('Users', 'mustChangePassword', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });

    // university_id eka unique karanna (students la username widiyata use wena nisa)
    // Note: column eka dekata kalin thiyenawa - unique constraint eka hadana eka witharai meka karanna
    await queryInterface.addIndex('Users', ['university_id'], {
      unique: true,
      name: 'Users_university_id_unique',
    });
  },

  async down(queryInterface, Sequelize) {
    // Revert: unique index eka un eka giya passe column eka un karanna
    await queryInterface.removeIndex('Users', 'Users_university_id_unique');
    await queryInterface.removeColumn('Users', 'mustChangePassword');
  }
};
