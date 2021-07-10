const express = require("express");
const router = express.Router();

// controllers
const eventController = require("../../controllers/v1/event");

// GET | /events | fetch all events
// -------------------------------------------
router.get("/", eventController.fetchAllEvents);

module.exports = router;
