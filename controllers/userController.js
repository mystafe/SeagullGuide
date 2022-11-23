const User = require("../models/userModel");
const bcrpyt = require("bcrypt");

exports.DeleteUserGet = async (req, res) => {
  console.log("DeleteUserGet");
  try {
  } catch (error) {
    console.log(error);
  }
  res.render("adminViews/adminDeleteUser");
};
exports.DeleteUserPost = async (req, res) => {
  console.log("DeleteUserPost");
  try {
  } catch (error) {
    console.log(error);
  }
  res.redirect("adminViews/adminUsers");
};
exports.GetUsers = async (req, res) => {
  console.log("GetUsers");
  console.log(req.session.isAuth);
  try {
    const users = await User.findAll();
    return res.render("adminViews/adminUsers", {
      users,
      isAuth: req.session.isAuth,
    });
  } catch (error) {
    console.log(error);
  }
  res.render("/", { isAuth: req.session.isAuth });
};
exports.EditUserGet = async (req, res) => {
  console.log("EditUserGet");
  try {
  } catch (error) {
    console.log(error);
  }
  res.render("adminViews/adminUserEdit");
};
exports.EditUserPost = async (req, res) => {
  console.log("EditUserPost");
  try {
  } catch (error) {
    console.log(error);
  }
  res.redirect("adminViews/adminUsers");
};
exports.CreateUserGet = async (req, res) => {
  console.log("CreateUserGet");
  try {
  } catch (error) {
    console.log(error);
  }
  res.render("adminViews/adminUserCreate");
};
exports.CreateUserPost = async (req, res) => {
  console.log("CreateUserPost");
  const { username, fullname, email, password } = req.body;
  const isverified = 1;
  const passwordhash = await bcrpyt.hash(password, 10);
  //role default admin later

  try {
    await User.create({ username, fullname, email, passwordhash, isverified });
  } catch (error) {
    console.log(error);
  }
  return res.redirect("/admin/users");
};
