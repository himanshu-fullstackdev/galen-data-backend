## Requirements.

---

* node v14.17.0
* npm 6.14.13
* Mysql

## Configuration.

---

* `config/db_credentials.js` - This file contains configuration for the database.

## Dependencies.

---

* [async](https://www.npmjs.com/package/async) - sync is a utility module which provides straight-forward, powerful functions for working with asynchronous JavaScript. Although originally designed for use with Node.js and installable via npm i async, it can also be used directly in the browser.
* [axios](https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser and node.js
* [cheerio](https://www.npmjs.com/package/cheerio) - Fast, flexible & lean implementation of core jQuery designed specifically for the server.
* [cors](https://www.npmjs.com/package/cors) - CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
* [express](https://www.npmjs.com/package/express) - Fast, unopinionated, minimalist web framework for node.
* [morgan](https://www.npmjs.com/package/morgan) - HTTP request logger middleware for node.js
* [mysql2](https://www.npmjs.com/package/mysql2) - MySQL client for Node.js with focus on performance. Supports prepared statements, non-utf8 encodings, binary log protocol, compression, ssl
* [node-cron](https://www.npmjs.com/package/node-cron) - The node-cron module is tiny task scheduler in pure JavaScript for node.js based on GNU crontab. This module allows you to schedule task in node.js using full crontab syntax.
* [sequelize](https://www.npmjs.com/package/sequelize) - Sequelize is a promise-based Node.js ORM tool for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more.
* [nodemon](https://www.npmjs.com/package/nodemon) - nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.

### How do I get set up? ###

---

Run commands in project terminal.

1. clone this repo via `git clone https://himanshu73188@bitbucket.org/himanshu73188/galen-data-backend.git`.

2. Run `cd galen-data-backend`.

3. Run `npm install`.

4. Create a sql database DB & add the configuration details in config/db_credentials.js

5. Run `npm run start-dev` start App with Hot reloading using nodemon

6. In postman, Check with `http://localhost:8080/:url`. Default Port:- 8080.

## Application Structure

---

* `app.js` - The entry point to our application. This file defines our express server and connects it to Mysql.
* `config/` - This folder contains configuration for sequelize ORM.
* `controllers/` - This folder contains the business logic of our app.
* `routes/` - This folder contains the route definitions for our API.
* `src/Model/` - This folder contains the models of mysql sequelize.
* `src/Data/` - This folder contains the initial data of mysql sequelize.
* `utils/` - This folder contains helper programs.

### What is this repository for? ###

* **Quick Summary**

    ---

    Given a list of different websites having information about tech events in the US, we need to scrape them to collect data, store them into a database and then provide a simple web view for that information allowing for sorting and filtering.. We need the following information in our database

     * The name of the website
     * The event name or title
     * Event Date
     * Location of the event


* **router Definitions**

    ---

    * `GET v1/events` - fetch all events

* **CRON jobs**

    ---

    update scrape data every 24 hours
```
    const cron                       = require('node-cron');

    // Run scrapeWebsites after every 24 hours.
    cron.schedule('0 0 0 * * *', () => {
      scrapeWebsites();
    });
```

## Steps to assign error code to newly created API call:

1. On Creating a new controller file, decide an unique error code in 1000s respectively.

2. If adding API call to already existed controller file, check already defined error code in starting of controller file and assign an incremental unique error code to newly created API call.

3. Already Used Error Codes are ( #1000 ).

### Who do I talk to? ###

* Repo admin - himanshu73188@gmail.com