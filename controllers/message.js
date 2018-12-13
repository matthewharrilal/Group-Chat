const User = require("../models/user")
const jsdom = require("jsdom").JSDOM
const chatTemplate = require("../views/chat.handlebars")

var dom = new jsdom(chatTemplate);
console.log("DOM " + JSON.stringify(dom))

// var messageContent = document.getElementById("output")

module.exports = (app) => {
    // app.post("/users/:userId/messages", (req, res) => {
    app.get("/messages", (req, res) => {
        console.log("YERRR")
        
        res.send("YERR REACHED THE MESSAGES ROUTE")
    });
}