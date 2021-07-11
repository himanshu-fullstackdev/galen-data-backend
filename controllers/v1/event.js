//Error code - 1000

// import modules
const async = require("async");
const cron = require("node-cron");
const axios = require("axios");
const { Worker } = require("worker_threads");
const os = require("os");

// import models
const Website = require("../../src/models/v1/website");
const EventModel = require("../../src/models/v1/event");

// import utils
const scraper = require("../../util/scraper");

// total number of cpus
const cpuCount = os.cpus().length;

exports.fetchAllEvents = async function (req, res, next) {
  const eventsData = [];

  try {
    // fetch all websites from the website table
    const websites = await Website.findAll();

    // loop through the fetched websites array
    if (websites.length > 0) {
      async.forEachOf(
        websites,
        async function (website, index) {
          // fetch all events from the event table w.r.t website id
          console.log(Event);
          const events = await EventModel.Event.findAll({
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
            return res
              .status(200)
              .send({ status: "success", data: eventsData });
          }
        }
      );
    } else {
      return res.status(200).send({ status: "success", data: [] });
    }
  } catch (err) {
    // return error
    return res.status(500).send({ status: "failure", code: "1000x0002" });
  }
};

exports.scrapeWebsites = async function (req, res, next) {
  try {
    // fetch all websites from the website table
    const websites = await Website.findAll();

    // loop through the fetched websites array
    if (websites.length > 0) {
      async.forEachOf(
        websites,
        async function (website, index) {
          const res = await axios.get(website.scrapeUrl);
          let websiteData = scraper.fetchScrapeData(res, website.scrapeId);

          const segmentsPerWorker = Math.round(websiteData.length / cpuCount);
          const promises = Array(cpuCount)
            .fill()
            .map((_, index) => {
              let arrayToScrape = [];
              if (index === 0) {
                // the first segment
                arrayToScrape = websiteData.slice(0, segmentsPerWorker);
              } else if (index === cpuCount - 1) {
                // the last segment
                arrayToScrape = websiteData.slice(segmentsPerWorker * index);
              } else {
                // intermediate segments
                arrayToScrape = websiteData.slice(
                  segmentsPerWorker * index,
                  segmentsPerWorker * (index + 1)
                );
              }
              return scrapeDataWithWorker(
                arrayToScrape,
                website.scrapeId,
                website.id
              );
            });
          const segmentsResults = await Promise.all(promises);
        },
        (err) => {
          if (err) {
            console.log(err);
          } else {
            // return success response
            console.log("scrape data added");
          }
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
};

// Run scrapeWebsites after every 24 hours.
cron.schedule("0 0 0 * * *", () => {
  scrapeWebsites();
});

// we turn the worker activation into a promise
const scrapeDataWithWorker = (arr, scrapeId, websiteId) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./util/scraper.js", {
      workerData: { arr: arr, scrapeId: scrapeId, websiteId: websiteId },
    });
    worker.on("message", resolve);
    worker.on("error", reject);
  });
};
