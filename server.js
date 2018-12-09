var express = require("express")
var app = express()
var socket = require("socket.io")
const JSON = require("circular-json")

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

