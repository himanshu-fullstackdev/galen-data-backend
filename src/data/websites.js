const Websites = [
  {
    website: "https://www.computerworld.com",
    scrapeUrl:
      "https://www.computerworld.com/article/3313417/tech-event-calendar-2020-upcoming-shows-conferences-and-it-expos.html",
    scrapeId: 1,
    mainTag: "#cwsearchabletable tbody tr",
    titleTag: "th:eq(0) a",
    dateTag: "td:eq(1), td:eq(2)",
    locationTag: "td:eq(3)",
  },
  {
    website: "https://www.techmeme.com",
    scrapeUrl: "https://www.techmeme.com/events",
    scrapeId: 2,
    mainTag: "#events .rhov a",
    titleTag: "div:eq(1)",
    dateTag: "div:eq(0)",
    locationTag: "div:eq(2)",
  },
];

module.exports = Websites;
