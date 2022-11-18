const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");

const Expertise = sequelize.define(
  "expertise",
  {
    expertiseId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    expertiseName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

async function sync() {
  await Expertise.sync({ alter: true });

  console.log("expertise table created");
  const count = await Expertise.count();
  if (count == 0) {
    await Expertise.bulkCreate([
      { expertiseName: "friendly" },
      { expertiseName: "emotinonal" },
    ]);
  }

  //  const exp1 = await Expertise.create({ expertiseName: "friendly" });
}

sync();

module.exports = Expertise;
