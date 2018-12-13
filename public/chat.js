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
        message: message.value // Emit the message value to the server 
    }) 
});

message.addEventListener('keypress', function() {
    socket.emit("typing", handle.value)
})
socket.on("chat", function(data) {
    // <button type="submit" >Vote Up</button>
    insertedHtml = ['<div class=row"> <div class="col">', '</div><div class="col"> <form class="vote-up"><button type="submit">Vote Up</button> </form>  </div><div class="col"><form class="vote-up"><button type="submit">Vote Down</button> </form></div></div>']
    feedback.innerHTML = "";
    // output.innerHTML += insertedHtml[0] + "<p><strong>" + data.handle + ":</strong>" + data.message +  insertedHtml[1]
    output.innerHTML += "<p><strong>" + data.handle + ":</strong>" + data.message

})

socket.on("typing", function(data) {
    console.log("That data " + data)
    feedback.innerHTML = '<p><em>' + data + " is typing a message ... </em></p>";
})