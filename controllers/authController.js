const User = require("../models/userModel");
const bcrpyt = require("bcrypt");

exports.get_register = async function (req, res) {
  console.log("get_register");
  try {
  } catch (er) {
    console.log(er);
  }
  res.render("authViews/register", { isAuth: req.session.isAuth });
};

exports.post_register = async function (req, res) {
  console.log("post_register");
  const username = req.body.username;
  const fullname = req.body.fullname;
  const email = req.body.email;
  const password = req.body.password;
  const passwordhash = await bcrpyt.hash(password, 10);

  try {
    await User.create({ username, fullname, email, passwordhash });
    console.log(User);
  } catch (er) {
    console.log(er);
  }
  return res.redirect("login");
};

exports.get_login = async function (req, res) {
  console.log("get_login");
  try {
  } catch (er) {
    console.log(er);
  }
  res.render("authViews/login", {
    message: {},
    isAuth: req.session.isAuth, //isAuth: req.cookies.isAuth
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
        isAuth: req.cookies.isAuth,
      });
    }

    if (user) {
      const verify = await bcrpyt.compare(password, user.passwordhash);
      if (verify) {
        //res.cookie("isAuth", 1);
        req.session.isAuth = 1;

        return res.redirect("/");
      } else {
        return res.render("authViews/login", {
          message: { text: "Wrong PASSWORD or username", style: "warning" },
          //isAuth: req.cookies.isAuth,
        });
      }
    }
  } catch (er) {
    console.log(er);
  }
  return res.redirect("/login", {
    message: { text: "User not found", style: "warning" },
    isAuth: req.cookies.isAuth,
  });
};

exports.get_password = async function (req, res) {
  console.log("get_password");
  try {
  } catch (er) {
    console.log(er);
  }
  res.render("authViews/forgetPassword", { isAuth: req.session.isAuth });
};

exports.post_password = async function (req, res) {
  console.log("post_password");
  try {
    console.log("post_password");
    return res.render("authViews/login", {
      message: { text: "Reset link has been sent", style: "success" },
      isAuth: req.session.isAuth,
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
  res.render("authViews/notautharized", { isAuth: req.session.isAuth });
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
  return res.redirect("/");
};
