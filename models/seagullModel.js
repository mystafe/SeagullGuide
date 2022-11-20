const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");

const Seagull = sequelize.define(
  "seagull",
  {
    seagullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    urlSlug: {
      type: DataTypes.STRING,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isFavorite: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    isAlive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  },
  { timestamps: true }
);

module.exports = Seagull;
