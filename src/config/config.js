const path = require("path");

const config = {
  port: process.env.PORT || 3000,
  dbPath: path.join(__dirname, "../data/db/db.json"),
};

module.exports = config;
