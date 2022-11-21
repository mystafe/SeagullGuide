const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");

const Story = sequelize.define(
  "story",
  {
    title: { type: DataTypes.STRING, allownull: false },
    content: { type: DataTypes.STRING, allownull: false },
  },
  { timestamps: true, updatedAt: false }
);
module.exports = Story;
