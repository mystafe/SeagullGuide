const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");

const Story = sequelize.define(
  "story",
  {
    content: { type: DataTypes.STRING, allownull: false },
    imageUrl: { type: DataTypes.STRING, allownull: false },
  },
  { timestamps: true, updatedAt: false }
);
module.exports = Story;
