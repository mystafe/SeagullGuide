const User = require("../models/userModel");
const bcrpyt = require("bcrypt");
const mailApp = require("../helpers/sendMail");
const config = require("../helpers/config");
const crypto = require("crypto");

exports.VerifyUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id);
    const email = user.email;
    const passwordtoken = await crypto.randomBytes(32).toString("hex");
    console.log(email, passwordtoken);
    await user.update({ passwordtoken });
    await mailApp.sendMail({
      from: config.mail.from,
      to: email,
      subject: "Verify your account",
      html: `<div class="card">
      <p>You can verify your account using the link below</p>
      <p>
        <a href="localhost:3400/user/verify?passwordtoken=${passwordtoken}">Verify My Account</a>
      </p>
    </div>
  `,
    });
    return res.redirect(
      `/admin/users?action=verification&username=${user.username}`
    );
  } catch (error) {
    console.log(error);
  }
  res.redirect("/login");
};

exports.DeleteUserGet = async (req, res) => {
  console.log("DeleteUserGet");
  const id = req.params.id;
  const user = await User.findByPk(id);

  try {
  } catch (error) {
    console.log(error);
  }
  res.render("adminViews/adminDeleteUser", { user });
};
exports.DeleteUserPost = async (req, res) => {
  console.log("DeleteUserPost");

  const Oldid = req.body.id;
  const id = req.params.id;
  console.log(Oldid);
  console.log(id);
  var username = "";
  try {
    const deletedUser = await User.findByPk(id);
    if (deletedUser) {
      try {
        username = deletedUser.username;
        await User.destroy({
          where: {
            id,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
  return res.redirect(`/admin/users?action=delete&username=${username}`);
};
exports.GetUsers = async (req, res) => {
  console.log("GetUsers");
  try {
    const users = await User.findAll();
    return res.render("adminViews/adminUsers", {
      users,
      username: req.query.username,
      action: req.query.action,
    });
  } catch (error) {
    console.log(error);
  }
  res.render("/", { username: req.query.username, action: req.query.action });
};
exports.EditUserGet = async (req, res) => {
  console.log("EditUserGet");
  try {
  } catch (error) {
    console.log(error);
  }
  res.render("adminViews/adminUserEdit", {});
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
  res.render("adminViews/adminUserCreate", {});
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
