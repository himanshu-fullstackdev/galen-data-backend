const { parentPort, workerData, isMainThread } = require("worker_threads");
const cheerio = require("cheerio");
const EventModel = require("../src/models/v1/event");

function scrapeData(data) {
  let $ = cheerio.load(data.arr);

  if (data.scrapeId === 1) {
    Array.from(data.arr).forEach((element) => {
      EventModel.Event.findOrCreate({
        where: {
          title: $(element).find("th:eq(0) a").text().trim(),
          date:
            $(element).find("td:eq(1)").text().trim() +
            "-" +
            $(element).find("td:eq(2)").text().trim(),
          location: $(element).find("td:eq(3)").text().trim(),
          websiteId: data.websiteId,
        },
      });
    });
  } else if (data.scrapeId === 2) {
    Array.from(data.arr).forEach((element) => {
      EventModel.Event.findOrCreate({
        where: {
          title: $(element).find("div:eq(1)").text().trim(),
          date: $(element).find("div:eq(0)").text().trim(),
          location: $(element).find("div:eq(2)").text().trim(),
          websiteId: data.websiteId,
        },
      });
    });
  }
}

// check that the data was called as a worker thread
if (!isMainThread) {
  // we post a message through the parent port, to emit the "message" event
  parentPort.postMessage(scrapeData(workerData));
}
