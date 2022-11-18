const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");

const Seagull = sequelize.define("seagull", {
  seagullId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  seagullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expertiseId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 1,
  },
  isFavorite: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isAlive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

async function sync() {
  await Seagull.sync();
  console.log("seagull table created");

  const count = await Seagull.count();
  console.log(count);
  if (count == 0) {
    await Seagull.bulkCreate([
      {
        seagullId: 1,
        seagullName: "test01",
        expertiseId: 1,
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Larus_pacificus_Bruny_Island.jpg/640px-Larus_pacificus_Bruny_Island.jpg?1668616711760",
        isAlive: 1,
        isFavorite: 0,
      },
      {
        seagullId: 2,
        seagullName: "test02",
        expertiseId: 2,
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/a/a1/Swallow-tailed-gull.jpg",
        isAlive: 1,
        isFavorite: 1,
      },
    ]);
  }
}

sync({ alter: true });

module.exports = Seagull;
