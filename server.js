require('./data/chat-db')
var express = require("express")
var app = express()
var socket = require("socket.io")
const JSON = require("circular-json")
var exphbs = require('express-handlebars');
var Auth = require("./controllers/auth")
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(expressValidator()); // Add after body parser initialization!


app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

// Main Template => main.handlebars
app.set('view engine', 'handlebars');

Auth(app)

app.get('/', (req, res) => {
    res.render("./layouts/main")
})

var server = app.listen(4000, function(err) {
    console.log("Listening on port 4000")
})

app.use(express.static("public"));

var io = socket(server)

io.on("connection", function(client) {
    // console.log("This is the socket " + JSON.stringify(socket.id))
    console.log("Made socket connection!", client.id)

    client.on("chat", function(data) {
        console.log(JSON.stringify(data.handle) + " " + JSON.stringify(data.message))
        io.sockets.emit("chat", data) // Refers to all sockets connected to this io connection
    })

    client.on("typing", function(data) {
        client.broadcast.emit("typing", data) // broadcast from the single as oppose to 
    })
})

