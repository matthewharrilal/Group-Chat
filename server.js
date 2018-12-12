require('./data/chat-db')
require('dotenv').config();
var express = require("express")
var app = express()
var socket = require("socket.io")
const JSON = require("circular-json")
const localStorage = require("store")
var cookieParser = require('cookie-parser');
var exphbs = require('express-handlebars');
var Auth = require("./controllers/auth")
var Message = require("./controllers/message")
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const checkAuth = require("./middleware/checkAuth");
const isUserAuthorized = require("./middleware/isUserAuthorized");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(expressValidator()); // Add after body parser initialization!
app.use(cookieParser());
app.use(checkAuth)

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

// Main Template => main.handlebars
app.set('view engine', 'handlebars');

Auth(app)

var username;

app.get('/', (req, res) => {
    if (!req.user) {
        res.redirect("/signup/new")
    } else {
        console.log("LOCALSS " + JSON.stringify(res.locals))
        localStorage.set("username", res.locals.user["username"])
        // localStorage.setItem("username", res.locals.user["username"]);
        // if (!localStorage.get("username")) {
        //     console.log("USERNAMEE " + localStorage.get("newUsername"))
        // } else {
        //     console.log("USERNAMEE " + localStorage.get("username"))
        // }



        res.render("./chat")
    }
});

// Check if the user is authorized if they have had a chance to login
app.use(isUserAuthorized)
Message(app)


var server = app.listen(4000, function (err) {
    console.log("Listening on port 4000")
})

app.use(express.static("public"));

var io = socket(server)

io.on("connection", function (client) {
    // console.log("This is the socket " + JSON.stringify(socket.id))
    console.log("Made socket connection!", client.id)

    client.on("chat", function (data) {
        console.log(JSON.stringify(data.handle) + " " + JSON.stringify(data.message))
        var username = localStorage.get("username") ? localStorage.get("username") : localStorage.get("newUsername")

        data.handle = username
        io.sockets.emit("chat", data) // Refers to all sockets connected to this io connection
    })

    client.on("typing", function (data) {
        var username = localStorage.get("username") ? localStorage.get("username") : localStorage.get("newUsername")
        console.log("USERNAMEEEE " + username)
        client.broadcast.emit("typing", username) // broadcast from the single as oppose to 
    })
})