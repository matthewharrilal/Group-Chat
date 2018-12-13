/* Mongoose Connection */
const mongoose = require("mongoose");
assert = require("assert");
require('dotenv').config()

mongoose.Promise = global.Promise;

if(process.env.MLAB_URL) {
    mongoose.connect(process.env.MLAB_URL);
    console.log('Connected to MongoDB on this uri ' + process.env.MLAB_URL)
  } else {
  
    // Connect to local database
    console.log("WORLD ENDER DESTROYER")
    mongoose.connect("mongodb://localhost/chat-db");
  }
  
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection Error:"));
mongoose.set("debug", true);

module.exports = mongoose.connection;