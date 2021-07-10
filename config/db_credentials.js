const Sequelize = require("sequelize");

const sequelize = new Sequelize("galen_data", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
