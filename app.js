//Express
const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

//Routes
const authRoutes = require("./routes/authRoutes");
const seagullRoutes = require("./routes/seagullRoutes");
const adminRoutes = require("./routes/adminRoutes");
const storyRoutes = require("./routes/storyRoutes");

//Custom Modules
const sequelize = require("./data/db");
const dummyData = require("./data/dummyData");

//Template Engine
app.set("view engine", "ejs");

//Models
const Seagull = require("./models/seagullModel");
const Expertise = require("./models/expertiseModel");
const User = require("./models/userModel");
const Story = require("./models/seagullStoryModel");
const Role = require("./models/roleModel");

//Middlewares
const locals = require("./middlewares/locals");
const csurf = require("csurf");

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "23bc83de-a927-4271-97a6-00b0749a2c2cx",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 15,
    },
    store: new SequelizeStore({ db: sequelize }),
  })
);
app.use(csurf());

app.use(locals);
app.use(express.static("public"));
app.use(express.static("node_modules"));

Seagull.belongsToMany(Expertise, { through: "seagullExpertises" });
Expertise.belongsToMany(Seagull, { through: "seagullExpertises" });

Story.belongsTo(User);
User.hasMany(Story);
User.belongsToMany(Role, { through: "userroles" });
Role.belongsToMany(User, { through: "userroles" });

//populate
(async () => {
  try {
    // await sequelize.sync({ force: true });
    // await dummyData();
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
