const Sequelize = require("sequelize");
const config = require("../helpers/config");
const mysql = require("mysql2");
const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  {
    dialect: "mysql",
    host: config.db.host,
    define: { timestamps: false },
    logging: false,
  }
);

async function connect() {
  try {
    await sequelize.authenticate();
    console.log("my sql connection established");
  } catch (er) {
    console.log(er);
  }
}

connect();

module.exports = sequelize;
