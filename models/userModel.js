const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");

const User = sequelize.define(
  "user",
  {
    username: { type: DataTypes.STRING, allowNull: false },
    fullname: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    isverified: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: 0 },
    passwordhash: { type: DataTypes.STRING },
    passwordtoken: { type: DataTypes.STRING },
    tokenexpiresin: { type: DataTypes.STRING },
  },
  { timestamps: true }
);

module.exports = User;
