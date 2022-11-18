const express = require("express");
const app = express();
const seagullRoutes = require("./routes/seagullRoutes");
const expertiseRoutes = require("./routes/expertiseRoutes");
const adminRoutes = require("./routes/adminRoutes");
const sequelize = require("./data/db");
const Seagull = require("./models/seagullModel");
const Expertise = require("./models/expertiseModel");

app.use(express.static("public"));
app.use(express.static("node_modules"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use(seagullRoutes);
app.use(expertiseRoutes);
app.use(adminRoutes);

app.listen(3400, () => {
  console.log("server initalized...");
});
