"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Movie.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: { type: DataTypes.STRING, allowNull: false },
      rating: { type: DataTypes.DECIMAL(3, 1), allowNull: false },
      awards: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      release_date: { type: DataTypes.DATE, allowNull: false },
      length: DataTypes.INTEGER,
      genre_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Movie",
      createdAt: "created_at",
      updatedAt: "updated_at",
      underscored: true,
    }
  );
  return Movie;
};
