"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Actors", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      first_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      rating: {
        type: Sequelize.DECIMAL(3, 1),
        defaultValue: null,
      },
      favorite_movie_id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        defaultValue: null,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Actors");
  },
};
