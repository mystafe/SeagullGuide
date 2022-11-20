const express = require("express");
const app = express();
const seagullRoutes = require("./routes/seagullRoutes");
const adminRoutes = require("./routes/adminRoutes");
const sequelize = require("./data/db");
const dummyData = require("./data/dummyData");
const Seagull = require("./models/seagullModel");
const Expertise = require("./models/expertiseModel");

// Expertise.hasMany(Seagull, {
//   foreignKey: { name: "expertiseId", allowNull: true, defaultValue: 1 },
//   onDelete: "RESTRICT",
//   onUpdate: "RESTRICT",
// });

Seagull.belongsToMany(Expertise, { through: "seagullExpertises" });
Expertise.belongsToMany(Seagull, { through: "seagullExpertises" });

(async () => {
  try {
    await sequelize.sync({ force: true });
  } catch (error) {
    console.log(error);
  }

  try {
    await dummyData();
  } catch (error) {
    console.log(error);
  }
})();

app.use(express.static("public"));
app.use(express.static("node_modules"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use(seagullRoutes);
app.use(adminRoutes);

app.listen(3400, () => {
  console.log("server initalized...");
});
