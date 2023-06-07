"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Genre.hasMany(models.Movie, {
        as: "movies",
        foreignKey: "genre_id",
      });
    }
  }
  Genre.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      ranking: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
      },
      active: {
        type: DataTypes.INTEGER(1).UNSIGNED,
        allowNull: false,
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
      underscored: true,
      sequelize,
      modelName: "Genre",
    }
  );
  return Genre;
};
