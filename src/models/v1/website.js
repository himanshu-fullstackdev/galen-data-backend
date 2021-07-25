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
      field: "scrape_url",
      type: Sequelize.STRING,
      allowNull: false,
    },
    scrapeId: {
      field: "scrape_id",
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    mainTag: {
      field: "main_tag",
      type: Sequelize.STRING,
      allowNull: false,
    },
    titleTag: {
      field: "title_tag",
      type: Sequelize.STRING,
      allowNull: false,
    },
    dateTag: {
      field: "date_tag",
      type: Sequelize.STRING,
      allowNull: false,
    },
    locationTag: {
      field: "location_tag",
      type: Sequelize.STRING,
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
                mainTag: element.mainTag,
                titleTag: element.titleTag,
                dateTag: element.dateTag,
                locationTag: element.locationTag,
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
