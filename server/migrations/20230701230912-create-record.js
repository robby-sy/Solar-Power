'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Records', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ProjectId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:"Projects",
          key:"id"
        }
      },
      voltage: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      current: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      power: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      temperature: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      humidity: {
        type: Sequelize.FLOAT
      },
      intensity:{
        type : Sequelize.FLOAT
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Records');
  }
};