const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");

const Expertise = sequelize.define(
  "expertise",
  {
    expertiseName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    urlSlug: {
      type: DataTypes.STRING,
    },
    iconUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { timestamps: false }
);

module.exports = Expertise;
