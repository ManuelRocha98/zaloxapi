const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const controller = require('./controllers/messages.controller')

const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({ credentials: true, origin: true }))

io.on('connection', (socket) => {

    console.log('user connected')

    socket.on('join', function(userNickname) {

        console.log(userNickname + " : has joined the chat ");

        socket.broadcast.emit('userjoinedthechat', userNickname + " : has joined the chat ");

        /* let message = controller.respond(data)
        io.to(`${message.roomName}`).emit('new member', message.user); */
    });


    socket.on('messagedetection', (senderNickname, messageContent, roomName) => {

        console.log(senderNickname + " :" + messageContent)

        //create a message object 
        let message = { "message": messageContent, "senderNickname": senderNickname, "roomName": roomName }

        // send the message to the client side  
        io.emit('message', message);

        let data = { senderNickname, messageContent, roomName }
        let message2 = controller.respond(data)
        io.to(`${message2.roomName}`).emit('updateChat', message2)

    });


    socket.on('disconnect', function() {
        console.log(' user has left ')
        socket.broadcast.emit("userdisconnect", " user has left ")
    });



});

require("./routes/index")(app)

http.listen(process.env.PORT || 3000, () => {
    console.log('Node app is running on port 3000')
});
