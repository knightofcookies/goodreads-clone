const config = require("./utils/config");
const logger = require("./utils/logger");
const express = require("express");
require("express-async-errors");
const mongoose = require("mongoose");

const app = express();

mongoose.set("strictQuery", false);
logger.info(`Server running on port ${config.PORT}`);
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MONGODB:', error.message)
  })

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
