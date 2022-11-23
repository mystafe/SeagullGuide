const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");

//middlewares
app.use(express.static("public"));
app.use(express.static("node_modules"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "Test key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 5,
    },
  })
);

const authRoutes = require("./routes/authRoutes");
const seagullRoutes = require("./routes/seagullRoutes");
const adminRoutes = require("./routes/adminRoutes");
const storyRoutes = require("./routes/storyRoutes");

const sequelize = require("./data/db");
const dummyData = require("./data/dummyData");
const Seagull = require("./models/seagullModel");
const Expertise = require("./models/expertiseModel");
const User = require("./models/userModel");
const Story = require("./models/seagullStoryModel");

Seagull.belongsToMany(Expertise, { through: "seagullExpertises" });
Expertise.belongsToMany(Seagull, { through: "seagullExpertises" });

Story.belongsTo(User);
User.hasMany(Story);

//populate
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

app.use(authRoutes);
app.use("/admin", adminRoutes);
app.use(storyRoutes);
app.use(seagullRoutes);

app.listen(3400, () => {
  console.log("server initalized...");
});
