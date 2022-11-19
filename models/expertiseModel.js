const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");

const Expertise = sequelize.define(
  "expertise",
  {
    expertiseName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = Expertise;
