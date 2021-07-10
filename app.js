// Import core modules
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

// Import Logging
const logger = require("morgan");

// Import API Routes

// Import MySQL DB configuration
const credentials = require("./config/db_credentials.js");

// Start the MySQL DB configuration
var conn = mysql.createConnection(credentials);

// Connect to the MySQL Database
conn.connect(function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Connection Established");
});

// Start Express app
const app = express();

// Add CORS Support
app.use(cors());
app.options("*", cors());

// Get the MySQL db connection
app.use(function (req, res, next) {
  req.con = conn;
  next();
});

// Start the logger
app.use(logger("dev"));

//Set the body parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Start the routes

// Start the App
const server = app.listen(process.env.PORT || 8080, () => {
  const port = server.address().port;
  console.log(`App listening on port ${port}`);
});
