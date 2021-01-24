const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const controller = require('./controllers/messages.controller')

const port = process.env.PORT || 3001

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({ credentials: true, origin: true }))

io.on('connection', (socket) => {    
    socket.on('join', (data) => {
        let message = controller.respond(data)
        io.to(`${message.roomName}`).emit('userjoin', message.user);
    });

    socket.on('new message', (data) => {
        let message = controller.respond(data)
        io.broadcast.to(`${message.roomName}`).emit('updateChat', message)
    });
    
    socket.on('join', (data) => {

        console.log(userNickname +" : has joined the chat "  )

        socket.broadcast.emit('userjoinedthechat',userNickname +" : has joined the chat ")
    });

    socket.on('disconnect', (data) => {
        socket.broadcast.emit("userdisconnect", ' user left')
    });
});

http.listen(3000, () => {
    console.log('Node app is running on port 3000')
});

require("./routes/index")(app)
app.listen(port, () => console.log("listening on Port " + port))
