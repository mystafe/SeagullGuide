const User = require("../models/userModel");
const bcrpyt = require("bcrypt");
const mailApp = require("../helpers/sendMail");
const config = require("../helpers/config");
const crypto = require("crypto");
const Role = require("../models/roleModel");
const { render } = require("ejs");
const sequelize = require("../data/db");

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
    const users = await User.findAll({
      include: { model: Role },
    });

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
    const user = await User.findByPk(id, {
      include: { model: Role },
    });
    const roles = await Role.findAll();
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
    const user = await User.findByPk(userid);
    user.update({ username, fullname, email, isverified });

    await sequelize.query(`delete from userroles where userId=${userid}`);
    if (roleids == undefined) {
    } else if (roleids.length < 2) {
      await sequelize.query(
        `insert into userroles values (${userid},${roleids} )`
      );
    } else {
      await roleids.forEach((roleid) => {
        sequelize.query(`insert into userroles values (${userid},${roleid})`);
      });
    }
  } catch (error) {
    console.log(error.message);
  }
  res.redirect("/admin/users");
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

exports.EditRolePost = async (req, res) => {
  console.log("EditRolePost");
  const roleid = req.body.roleid;
  try {
    const ids = req.body["userids[]"];
    if (ids == undefined) {
      await sequelize.query(`delete from userroles where roleId=${roleid}`);
    } else if (ids.length < 2) {
      await sequelize.query(`delete from userroles where roleId=${roleid}`);
      await sequelize.query(`insert into userroles values (${ids},${roleid})`);
    } else {
      await sequelize.query(`delete from userroles where roleId=${roleid} `);
      await ids.forEach((id) => {
        sequelize.query(`insert into userroles values (${id},${roleid})`);
      });
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
    const role = await Role.findByPk(id, { include: { model: User } });
    const users = await User.findAll({ include: { model: Role } });
    return res.render("adminViews/adminRoleEdit", { role, users });
  } catch (error) {
    console.log(error);
  }
  return res.redirect("/admin/roles");
};
