const Sequelize = require("sequelize");

const sequelize = require("../../../config/db_credentials");

// import models
const Website = require("../../models/v1/website");

// controllers
const eventController = require("../../../controllers/v1/event");

const Event = sequelize.define(
  "event",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    date: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    websiteId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Website,
        key: "id",
      },
    },
  },
  {
    hooks: {
      afterSync: async function (options) {
        try {
          const events = await Event.findAll();
          if (events.length == 0) {
            // scrape websites for the first time
            eventController.scrapeWebsites();
          }
        } catch (err) {
          console.log(err);
        }
      },
    },
  }
);

exports.Event = Event;
