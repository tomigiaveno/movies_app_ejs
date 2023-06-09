"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Movies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      title: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      rating: {
        type: Sequelize.DECIMAL(3, 1).UNSIGNED,
        allowNull: false,
      },
      awards: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
      },
      release_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      length: {
        type: Sequelize.INTEGER(10).UNSIGNED,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Movies");
  },
};
