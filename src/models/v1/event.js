const Sequelize = require("sequelize");

const sequelize = require("../../../config/db_credentials");

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
      type: Sequelize.DATE,
      allowNull: false,
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      afterSync: async function (options) {
        try {
          const events = await Event.findAll();
          if (events.length == 0) {
            eventController.scrapeWebsites();
          }
        } catch (err) {
          console.log(err);
        }
      },
    },
  }
);

module.exports = Event;
