const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const router = require('./router');
const {addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');


const app = express();
const server = http.createServer(app);

const io = socketio(server, {
    cors : {
        origin: "http://localhost:3000",
    }
});

io.on('connection', (socket) => {
    console.log('We have connections !!');

    socket.on('join', ({ name, room }, callback) => {
        console.log(name, room);
        const { error, user } = addUser({id : socket.id, name, room});
        if(error) {
            return callback(error);
        }
        socket.join(user.room);

        socket.emit('message', { user : 'admin', text : `${user.name}, welcome to the room ${user.room}`});

        socket.broadcast.to(user.room).emit('message', {user : 'admin', text : `${user.name} has joined`});


        callback();
    });
    
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('message', {user: user.name, text : message});
        callback();
    });

    socket.on('disconnectted', () => {
        const user = removeUser(socket.id);
        if(user) {
            io.to(user.room).emit('message', {user : 'admin', text : `${user.name} has left`});
        }
        console.log('User has left!!!');
    });
    
});

app.use(cors());
app.use(router);

// set port number
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});