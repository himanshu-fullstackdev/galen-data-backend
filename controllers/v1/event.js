//Error code - 1000

// import modules
const async = require("async");

// import models
const Website = require("../../src/models/v1/website");
const Event = require("../../src/models/v1/event");

exports.fetchAllEvents = async function (req, res, next) {
  const eventsData = [];

  try {
    // fetch all websites from the website table
    const websites = await Website.findAll();

    // loop through the fetched websites array
    async.forEachOf(
      websites,
      async function (website, index) {
        // fetch all events from the event table w.r.t website id
        const events = await Event.findAll({
          where: { websiteId: website.id },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        });

        // push data to the eventsData array
        eventsData.push({
          id: website.id,
          website: website.website,
          scrapeUrl: website.scrapeUrl,
          events: events,
        });
      },
      (err) => {
        if (err) {
          // return error
          const error = {
            status: "failure",
            message: "Error: Please do it again",
            code: "1000x0001",
            error: err,
          };
          return res.status(500).send(error);
        } else {
          // return success response
          return res.status(200).send({ status: "success", data: eventsData });
        }
      }
    );
  } catch (err) {
    // return error
    return res.status(500).send({ status: "failure", code: "1000x0002" });
  }
};
