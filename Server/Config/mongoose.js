const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/weChat");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: Failed to connect to MongoDB"));

db.once("open", function () {
  console.log("Connected to MongoDB");
});

module.exports = db;

