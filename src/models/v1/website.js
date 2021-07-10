const Sequelize = require("sequelize");

const sequelize = require("../../../config/db_credentials");

const Website = sequelize.define("website", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  website: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  scrapeUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Website;
