// Make Connection

var socket = io.connect("localhost:4000")

// Querying the DOM 
var message = document.getElementById("message");
var handle = document.getElementById("handle");
var send = document.getElementById("sendMessage");
var output = document.getElementById("output")

// Emit Events
// Listen for when user clicks the send button
send.addEventListener("click", function() {
    socket.emit("chat", {
        message: message.value, // Emit the message value to the server 
        handle: handle.value
    }) 
});

socket.on("chat", function(data) {
    output.innerHTML += "<p><strong>" + data.handle + ":</strong>" + data.message + "/p"
})