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
    socket.on('new member', (data) => {
        console.log(data)
        io.emit("new member", data);
        /* let message = controller.respond(data)
        io.to(`${message.roomName}`).emit('userjoin', message.user); */
    });

    socket.on('chat message', (data) => {
        console.log(data)
        io.emit("chat message", data);
        /* let message = controller.respond(data)
        io.broadcast.to(`${message.roomName}`).emit('updateChat', message) */
    });

    socket.on('disconnect', (data) => {
        socket.broadcast.emit("userdisconnect", ' user left')
    });
});

require("./routes/index")(app)

http.listen(3000, () => {
    console.log('Node app is running on port 3000')
});
