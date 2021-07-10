// Import core modules
const express = require("express");
const cors = require("cors");

// Import Logging
const logger = require("morgan");

// Import MySQL DB configuration
const sequelize = require("./config/db_credentials.js");

// Import Models
const Website = require("./src/models/v1/website");
const Event = require("./src/models/v1/event");

// Import API Routes

// Start Express app
const app = express();

// Add CORS Support
app.use(cors());
app.options("*", cors());

// Start the logger
app.use(logger("dev"));

//Set the body parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// MySQL Associations
Event.belongsTo(Website, { constraints: true, onDelete: "CASCADE" });
Website.hasMany(Event);

// Start the routes

// Connect the db & Start the App
sequelize
  .sync()
  .then((result) => {
    // Start the App
    const server = app.listen(process.env.PORT || 8080, () => {
      const port = server.address().port;
      console.log(`App listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
