const nodemailer = require("nodemailer");
const config = require("./config");

var transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  secureConnection: false,
  port: 587,
  tls: {
    ciphers: "SSLv3",
  },
  auth: {
    user: config.mail.user,
    //from: config.mail.from,
    pass: config.mail.pass,
  },
});

module.exports = transporter;
