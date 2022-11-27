const sequelize = require("../data/db");
const Role = require("../models/roleModel");
const User = require("../models/userModel");

exports.getRoles = async (req, res) => {
  const username = req.query.username;
  const action = req.query.action;
  const roles = await Role.findAll({
    include: {
      model: User,
    },
  });

  try {
  } catch (error) {
    console.log(error);
  }
  return res.render("adminViews/adminRoles", {
    roles,
    username,
    action,
  });
};

exports.DeleteRolePost = async (req, res) => {
  console.log("DeleteRolePost");
  console.log(req.body);
  const roleid = req.body.roleid;
  const userid = req.body.userid;
  try {
    const { QueryTypes } = require("sequelize");
    const query = await sequelize.query(
      `delete FROM userroles where userId=${userid} and roleId=${roleid}`
    );

    //    const query = await sequelize.query("select top 1 * from userroles");
    console.log(query);
  } catch (error) {
    console.log(error);
  }
  const username = req.body.username;

  try {
  } catch (error) {
    console.log(error);
  }
  return res.redirect(`/admin/roles?action=remove&username=${username}`);
};
exports.DeleteRoleGet = async (req, res) => {
  console.log("DeleteRoleGet");
  const id = req.params.id;

  console.log(id);
  console.log(req.body);

  try {
    const roleid = req.body.roleid;
    const userid = req.body.userid;

    console.log(roleid, userid);
  } catch (error) {
    console.log(error);
  }
  // res.render("adminViews/adminRoleDelete");
};
