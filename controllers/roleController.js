const Role = require("../models/roleModel");
const User = require("../models/userModel");

exports.getRoles = async (req, res) => {
  const username = req.query.username;
  const action = req.query.action;

  try {
    const roles = await Role.find().populate("users");
    return res.render("adminViews/adminRoles", {
      roles,
      username,
      action,
    });
  } catch (error) {
    console.error("Error fetching roles:", error);
    return res.status(500).send("Internal Server Error");
  }
};

exports.DeleteRolePost = async (req, res) => {
  console.log("DeleteRolePost");
  const roleid = req.body.roleid;
  const userid = req.body.userid;

  try {
    await User.findByIdAndUpdate(
      userid,
      { $pull: { roles: roleid } },
      { new: true }
    );

    return res.redirect(`/admin/roles?action=remove&userid=${userid}`);
  } catch (error) {
    console.error("Error deleting role from user:", error);
    return res.status(500).send("Internal Server Error");
  }
};

exports.DeleteRoleGet = async (req, res) => {
  console.log("DeleteRoleGet");
  // To do
  return res.status(404).send("Not Found");
};
