// import modules
const { parentPort, workerData, isMainThread } = require("worker_threads");
const cheerio = require("cheerio");

// import models
const EventModel = require("../src/models/v1/event");

addScrapeData = function (data) {
  let $ = cheerio.load(data.arr);

  Array.from(data.arr).forEach((element) => {
    let dateTagFinal = "";
    let dateTagArray = data.dateTag.split(", ");
    dateTagArray.forEach((tag, index) => {
      let hyphen =
        dateTagArray.length > 1 && index < dateTagArray.length - 1 ? "-" : "";
      dateTagFinal += $(element).find(tag).text().trim() + hyphen;
    });
    EventModel.Event.findOrCreate({
      where: {
        title: $(element).find(data.titleTag).text().trim(),
        date: dateTagFinal,
        location: $(element).find(data.locationTag).text().trim(),
        websiteId: data.websiteId,
      },
    });
  });
};

exports.fetchScrapeData = function (data, mainTag) {
  let $ = cheerio.load(data.data);
  let websiteData = [];
  websiteData = $(mainTag);
  return websiteData;
};

// check that the data was called as a worker thread
if (!isMainThread) {
  // we post a message through the parent port, to emit the "message" event
  parentPort.postMessage(addScrapeData(workerData));
}
