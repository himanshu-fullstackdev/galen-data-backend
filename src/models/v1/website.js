const Sequelize = require("sequelize");

const sequelize = require("../../../config/db_credentials");

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
  },
  {
    hooks: {
      afterSync: async function (options) {
        try {
          const websites = await Website.findAll();
          if (websites.length == 0) {
            Website.create({
              website: "https://www.computerworld.com",
              scrapeUrl:
                "https://www.computerworld.com/article/3313417/tech-event-calendar-2020-upcoming-shows-conferences-and-it-expos.html",
            });
            Website.create({
              website: "https://www.techmeme.com",
              scrapeUrl: "https://www.techmeme.com/events",
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
