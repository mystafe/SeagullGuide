const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo').default; // Import connect-mongo

const cookieParser = require ("cookie-parser");
const { Store } = require("express-session");
const app = express();
const mongodb = require("./data/db");
// const csurf = require("csurf");

//Routes
const authRoutes = require("./routes/authRoutes");
const seagullRoutes = require("./routes/seagullRoutes");
const adminRoutes = require("./routes/adminRoutes");
const storyRoutes = require("./routes/storyRoutes");

//Custom Modules
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

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(
//   session({
//     secret: '23bc83de-a927-4271-97a6-00b0749a2c2cx',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       maxAge: 1000 * 60 * 15,
//     },
//     store: new MongoStore({ url:mongodb.conString }), // Use connect-mongo to store sessions in MongoDB
//   })
// );
// app.use(csurf());

app.use(locals);
app.use(express.static("public"));
app.use(express.static("node_modules"));



// Set up other relationships as needed

// Story.belongsTo(User);
// User.hasMany(Story);
// User.belongsToMany(Role, { through: "UserRoles" });
// Role.belongsToMany(User, { through: "UserRoles" });

//populate database with dummy data via mongoose
(async () => {
  try {
    // await Seagull.deleteMany({});
    // await Expertise.deleteMany({});
    // await User.deleteMany({});
    // await Story.deleteMany({});
    // await Role.deleteMany({});

    // const seagulls = await Seagull.insertMany(dummyData.seagulls);
    // const expertises = await Expertise.insertMany(dummyData.expertises);
    // const users = await User.insertMany(dummyData.users);
    // const stories = await Story.insertMany(dummyData.stories);
    // const roles = await Role.insertMany(dummyData.roles);
    await dummyData();

    console.log("Database populated successfully");
  } catch (error) {
    console.log(error);
  }
})();

app.use(authRoutes);
app.use("/admin", adminRoutes);
app.use(storyRoutes);
app.use("/",seagullRoutes);


app.listen(3400, () => {
  console.log("server initalized...");
});
