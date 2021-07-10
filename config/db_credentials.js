const Sequelize = require("sequelize");

const sequelize = new Sequelize("galen_data", "root", "", {
  dialect: "mysql",
  host: "localhost",
  logging: false,
});

module.exports = sequelize;
