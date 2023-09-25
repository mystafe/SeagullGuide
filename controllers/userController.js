const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const mailApp = require("../helpers/sendMail");
const config = require("../helpers/config");
const crypto = require("crypto");
const Role = require("../models/roleModel");
const { render } = require("ejs");
const mongoose = require("mongoose");

exports.VerifyUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    const email = user.email;
    const passwordtoken = crypto.randomBytes(32).toString("hex");
    console.log(email, passwordtoken);
    user.passwordtoken = passwordtoken;
    await user.save();
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
  try {
    const user = await User.findById(id);
    return res.render("adminViews/adminDeleteUser", { user });
  } catch (error) {
    console.log(error);
  }
  res.redirect("/admin/users");
};

exports.DeleteUserPost = async (req, res) => {
  console.log("DeleteUserPost");
  const Oldid = req.body.id;
  const id = req.params.id;
  console.log(Oldid);
  console.log(id);
  var username = "";
  try {
    const deletedUser = await User.findById(id);
    if (deletedUser) {
      username = deletedUser.username;
      await User.deleteOne({ _id: id });
    }
  } catch (error) {
    console.log(error);
  }
  return res.redirect(`/admin/users?action=delete&username=${username}`);
};

exports.GetUsers = async (req, res) => {
  console.log("GetUsers");
  try {
    const users = await User.find().populate("roles");
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
  const id = req.params.id;
  try {
    const user = await User.findById(id).populate("roles");
    const roles = await Role.find();
    return res.render("adminViews/adminUserEdit", { user, roles });
  } catch (error) {
    console.log(error);
  }
  res.render("adminViews/adminUserEdit", {});
};

exports.EditUserPost = async (req, res) => {
  console.log("EditUserPost");
  const userid = req.body.userid;
  const username = req.body.username;
  const fullname = req.body.fullname;
  const email = req.body.email;
  const roleids = req.body.roleids;
  const isverified = req.body.isverified;
  try {
    const user = await User.findById(userid);
    user.username = username;
    user.fullname = fullname;
    user.email = email;
    user.isverified = isverified;

    const userRoles = [];
    if (roleids) {
      if (!Array.isArray(roleids)) {
        roleids = [roleids];
      }
      roleids.forEach((roleId) => {
        userRoles.push(mongoose.Types.ObjectId(roleId));
      });
    }
    user.roles = userRoles;

    await user.save();
  } catch (error) {
    console.log(error.message);
  }
  res.redirect("/admin/users");
};

exports.CreateUserGet = async (req, res) => {
  console.log("CreateUserGet");
  res.render("adminViews/adminUserCreate", {});
};

exports.CreateUserPost = async (req, res) => {
  console.log("CreateUserPost");
  const { username, fullname, email, password } = req.body;
  const isverified = 1;
  const passwordhash = await bcrypt.hash(password, 10);
  try {
    const newUser = new User({
      username,
      fullname,
      email,
      passwordhash,
      isverified,
    });
    await newUser.save();
  } catch (error) {
    console.log(error);
  }
  return res.redirect("/admin/users");
};

exports.EditRolePost = async (req, res) => {
  console.log("EditRolePost");
  const roleid = req.body.roleid;
  try {
    const ids = req.body["userids[]"];
    if (ids == undefined) {
      await User.updateMany({}, { $pull: { roles: roleid } });
    } else {
      const userIds = Array.isArray(ids) ? ids : [ids];
      await User.updateMany(
        { _id: { $in: userIds } },
        { $addToSet: { roles: roleid } }
      );
    }
  } catch (error) {
    console.log(error);
  }
  return res.redirect("/admin/roles");
};

exports.EditRoleGet = async (req, res) => {
  console.log("EditRoleGet");
  const id = req.params.id;
  try {
    const role = await Role.findById(id).populate("users");
    const users = await User.find();
    return res.render("adminViews/adminRoleEdit", { role, users });
  } catch (error) {
    console.log(error);
  }
  return res.redirect("/admin/roles");
};
