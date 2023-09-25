const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const emailApp = require("../helpers/sendMail");
const config = require("../helpers/config");
const crypto = require("crypto");

exports.VerifyUserWithToken = async (req, res) => {
  console.log("VerifyUserWithToken");
  const passwordtoken = req.query.passwordtoken;
  
  try {
    const verifyuser = await User.findOne({ passwordtoken });

    if (verifyuser && verifyuser.tokenexpiresin > Date.now()) {
      await verifyuser.updateOne({
        isverified: true,
        passwordtoken: null,
        tokenexpiresin: null,
      });

      return res.render("authViews/login", {
        message: { text: "Your account has been verified", style: "success" },
      });
    }
  } catch (error) {
    console.error("Error verifying user:", error);
  }

  return res.render("authViews/login", {
    message: { text: "Link is not valid or expired", style: "danger" },
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
    const user = await User.findOne({ email });

    if (user) {
      const passwordtoken = crypto.randomBytes(32).toString("hex");
      const tokenexpiresin = Date.now() + 60 * 60 * 1000;

      await user.updateOne({
        passwordtoken,
        tokenexpiresin,
      });

      try {
        await emailApp.sendMail({
          from: config.mail.from,
          to: user.email,
          subject: "Verify your account",
          html: `<p>You can verify your account using the link below:</p>
          <hr>  
          <a href="127.0.0.1:3400/user/verify?passwordtoken=${passwordtoken}">Verify My Account</a> `,
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  } catch (error) {
    console.error("Error sending verification email:", error);
  }

  return res.render("authViews/login", {
    message: { text: "Verification mail has been sent", style: "success" },
  });
};

exports.get_register = async (req, res) => {
  console.log("get_register");
  res.render("authViews/register", {});
};

exports.post_register = async (req, res) => {
  console.log("post_register");
  const username = req.body.username;
  const fullname = req.body.fullname;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.redirect("/");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      fullname,
      email,
      password: passwordHash,
    });

    await user.save();

    req.session.isAuth = true;

    await emailApp.sendMail({
      from: config.mail.from,
      to: email,
      subject: "Welcome to SeagullGuide",
      text: "Your account has been created successfully",
    });

    return res.redirect(`/admin/users?action=create&username=${username}`);
  } catch (err) {
    console.error("Error registering user:", err);
  }

  return res.redirect("/login");
};

exports.get_login = async (req, res) => {
  console.log("get_login");
  res.render("authViews/login", {
    message: {},
  });
};

exports.post_login = async (req, res) => {
  console.log("post_login");
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.render("authViews/login", {
        message: { text: "Wrong password or username", style: "warning" },
      });
    }

    const verify = await bcrypt.compare(password, user.password);

    if (verify) {
      req.session.isAuth = 1;
      const roles = user.roles;
      req.session.isAdmin = roles.includes("Admin");
      req.session.fullname = user.fullname;
      const url = req.query.returnUrl || "/";
      return res.redirect(url);
    } else {
      return res.render("authViews/login", {
        message: { text: "Wrong password or username", style: "warning" },
      });
    }
  } catch (err) {
    console.error("Error logging in:", err);
  }

  return res.redirect("/login");
};

exports.get_password = async (req, res) => {
  console.log("get_password");
  res.render("authViews/forgetPassword", {});
};

exports.post_password = async (req, res) => {
  console.log("post_password");
  const email = req.body.email;

  try {
    const user = await User.findOne({ email });
    const passwordhash = await bcrypt.hash("123456", 10);

    await user.updateOne({ passwordhash });

    return res.render("authViews/login", {
      message: { text: "Your password has been reset", style: "success" },
    });
  } catch (err) {
    console.error("Error resetting password:", err);
  }

  return res.render("adminViews/forgetpassword", {
    message: { text: "Mail address could not be found", style: "danger" },
  });
};

exports.get_newpassword = async (req, res) => {
  console.log("get_password");
  res.render("authViews/forgetPassword", {});
};

exports.post_newpassword = async (req, res) => {
  console.log("post_password");
  res.render("authViews/login", {
    message: { text: "Reset link has been sent", style: "success" },
  });
};

exports.get_noAuth = async (req, res) => {
  console.log("get_noAuth");
  res.render("authViews/notautharized", {});
};

exports.get_logout = async (req, res) => {
  console.log("get_logout");
  await req.session.destroy();
  return res.redirect("/login");
};
