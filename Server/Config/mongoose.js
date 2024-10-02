const mongoose = require('mongoose');

require('dotenv').config(); 

const uri = process.env.MONGODB_URI;

// mongoose.connect("mongodb://127.0.0.1:27017/weChat");

mongoose.connect(uri);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: Failed to connect to MongoDB"));

db.once("open", function () {
  console.log("Connected to MongoDB successfully");
});

module.exports = db;

