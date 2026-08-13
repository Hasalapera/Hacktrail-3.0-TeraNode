'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Gigs', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      studentId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false
      },
      subcategory: {
        type: Sequelize.STRING,
        allowNull: true
      },
      tags: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: []
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('DRAFT', 'PENDING', 'APPROVED', 'REJECTED', 'PAUSED'),
        defaultValue: 'PENDING'
      },
      impressions: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      clicks: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      orders: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      cancellations: {
        type: Sequelize.STRING,
        defaultValue: '0%'
      },
      thumbnail: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Gigs');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Gigs_status";');
  }
};
