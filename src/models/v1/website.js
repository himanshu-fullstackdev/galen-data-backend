const Sequelize = require("sequelize");

const sequelize = require("../../../config/db_credentials");

const websitesData = require("../../data/websites");

const Website = sequelize.define(
  "website",
  {
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
    scrapeId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    hooks: {
      afterSync: async function (options) {
        try {
          const websites = await Website.findAll();
          if (websites.length == 0) {
            // add initial data
            websitesData.forEach((element) => {
              Website.create({
                website: element.website,
                scrapeUrl: element.scrapeUrl,
                scrapeId: element.scrapeId,
              });
            });
          }
        } catch (err) {
          console.log(err);
        }
      },
    },
  }
);

module.exports = Website;
