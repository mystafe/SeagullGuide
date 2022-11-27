const User = require("../models/userModel");
const bcrpyt = require("bcrypt");
const { Op } = require("sequelize");
const emailApp = require("../helpers/sendMail");
const config = require("../helpers/config");
const crypto = require("crypto");

exports.VerifyUserWithToken = async (req, res) => {
  console.log("VerifyUserWithToken");
  const passwordtoken = req.query.passwordtoken;
  const verifyuser = await User.findOne({ where: { passwordtoken } });
  if (verifyuser && verifyuser.tokenexpiresin > Date.now()) {
    await verifyuser.update({
      isverified: true,
      passwordtoken: null,
      tokenexpiresin: null,
    });
    return res.render("authViews/login", {
      message: { text: "Your account has been verified", style: "success" },
    });
  }
  return res.render("authViews/login", {
    message: { text: "link is not valid or expired", style: "danger" },
  });
};

exports.get_verification = async (req, res) => {
  console.log("get_verification");
  return res.render("authViews/verification");
};
exports.post_verification = async (req, res) => {
  console.log("post_verification");
  const email = req.body.email;
  try {
    const user = await User.findOne({ where: { email } });
    const passwordtoken = await crypto.randomBytes(32).toString("hex");
    const tokenexpiresin = Date.now() + 60 * 60 * 1000;
    await user.update({
      passwordtoken,
      tokenexpiresin,
    });
    try {
      await emailApp.sendMail({
        from: config.mail.from,
        to: user.email,
        subject: "Verify your account",
        html: `<p>You can verify your account using link below</p>
        <hr>  

        <a href="127.0.0.1:3400/user/verify?passwordtoken=${passwordtoken}">Verify My Account</a> `,
      });
    } catch (error) {
      console.log(error.message);
    }
  } catch (error) {
    console.log(error);
  }
  return res.render("authViews/login", {
    message: { text: "Verify mail  has been sent", style: "success" },
  });
};

exports.get_register = async function (req, res) {
  console.log("get_register");
  try {
  } catch (er) {
    console.log(er);
  }
  res.render("authViews/register", {});
};

exports.post_register = async function (req, res) {
  console.log("post_register");
  const username = req.body.username;
  const fullname = req.body.fullname;
  const email = req.body.email;
  const password = req.body.password;
  const passwordhash = await bcrpyt.hash(password, 10);
  try {
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username: username }, { email: email }],
      },
    });
    if (existingUser) return res.redirect("/");
    const user = await User.create({ username, fullname, email, passwordhash });
    req.session.isAuth = true;

    await emailApp.sendMail({
      from: config.mail.from,
      to: email,
      subject: "Welcome to SeagullGuide",
      text: "Your account has been created succesfully",
    });
    return res.redirect(`/admin/users?action=create&username=${username}`);
  } catch (er) {
    console.log(er);
  }
  return res.redirect("/login");
};

exports.get_login = async function (req, res) {
  console.log("get_login");
  try {
  } catch (er) {
    console.log(er);
  }
  res.render("authViews/login", {
    message: {},
  });
};

exports.post_login = async function (req, res) {
  console.log("post_login");
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.render("authViews/login", {
        message: { text: "Wrong password or USERNAME", style: "warning" },
      });
    }

    if (user) {
      const verify = await bcrpyt.compare(password, user.passwordhash);

      if (verify) {
        req.session.isAuth = 1;
        const roles = await user.getRoles();
        req.session.isAdmin = !roles.every(
          (role) => role.dataValues.rolename != "Admin"
        );
        req.session.fullname = user.fullname;
        const url = req.query.returnUrl || "/";
        return res.redirect(url);
      } else {
        return res.render("authViews/login", {
          message: { text: "Wrong PASSWORD or username", style: "warning" },
        });
      }
    }
  } catch (er) {
    console.log(er);
  }
  return res.redirect("/login", {
    message: { text: "User not found", style: "warning" },
  });
};

exports.get_password = async function (req, res) {
  console.log("get_password");
  try {
  } catch (er) {
    console.log(er);
  }
  res.render("authViews/forgetPassword", {});
};

exports.post_password = async function (req, res) {
  console.log("post_password");
  try {
    const email = req.body.email;
    const user = await User.findOne({ where: { email } });
    const passwordhash = await bcrpyt.hash("123456", 10);
    console.log(email);
    console.log(passwordhash);
    await user.update({ passwordhash });
    return res.render("authViews/login", {
      message: { text: "Your password has been resest", style: "success" },
    });
  } catch (er) {
    console.log(er);
  }
  res.redirect("adminViews/forgetpassword", {
    message: { text: "Mail adress could not find", style: "danger" },
  });
};

exports.get_newpassword = async function (req, res) {
  console.log("get_password");
  try {
  } catch (er) {
    console.log(er);
  }
  res.render("authViews/forgetPassword", {});
};

exports.post_newpassword = async function (req, res) {
  console.log("post_password");
  try {
    return res.render("authViews/login", {
      message: { text: "Reset link has been sent", style: "success" },
    });
  } catch (er) {
    console.log(er);
  }
  res.redirect("adminViews/forgetpassword", {
    message: { text: "Mail adress could not find", style: "danger" },
  });
};

exports.get_noAuth = async function (req, res) {
  console.log("get_noAuth");
  try {
  } catch (er) {
    console.log(er);
  }
  res.render("authViews/notautharized", {});
};

exports.get_logout = async (req, res) => {
  console.log("get_logout");
  //res.clearCookie("isAuth");
  //req.session.isAuth = 0;
  await req.session.destroy();
  try {
  } catch (error) {
    console.log(error);
  }
  return res.redirect("/login");
};
