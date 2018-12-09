// Make Connection

var socket = io.connect("localhost:4000")

// Querying the DOM 
var message = document.getElementById("message");
var handle = document.getElementById("handle");
var send = document.getElementById("sendMessage");
var output = document.getElementById("output")
var feedback = document.getElementById("feedback")

// Emit Events
// Listen for when user clicks the send button
send.addEventListener("click", function() {
    socket.emit("chat", {
        message: message.value, // Emit the message value to the server 
        handle: handle.value
    }) 
});

message.addEventListener('keypress', function() {
    socket.emit("typing", handle.value)
})
socket.on("chat", function(data) {
    feedback.innerHTML = "";
    output.innerHTML += "<p><strong>" + data.handle + ":</strong>" + data.message 
})

socket.on("typing", function(data) {
    feedback.innerHTML = '<p><em>' + data + " is typing a message ... </em></p>";
})