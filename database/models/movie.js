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
      Movie.belongsTo(models.Genre, {
        as: "genre",
        foreignKey: "genre_id",
      });

      Movie.belongsToMany(models.Actor, {
        as: "actors",
        through: "actor_movie",
        foreignKey: "movie_id",
        otherKey: "actor_id",
        //onDelete: 'cascade',
      });
    }
  }
  Movie.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: { type: DataTypes.STRING, allowNull: false },
      rating: { type: DataTypes.DECIMAL(3, 1).UNSIGNED, allowNull: false },
      awards: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      release_date: { type: DataTypes.DATE, allowNull: false },
      length: DataTypes.INTEGER.UNSIGNED,
    },
    {
      sequelize,
      modelName: "Movie",
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      underscored: true,
      paranoid: true,
    }
  );
  return Movie;
};
