// server.js
const app = require('./app.js')
const http = require('http')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { getTime, getLocationTime } = require('./utils/timeStamp.js')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/User.js')


const server = http.createServer(app)
const io = socketio(server)

io.on('connection', (socket) => {
    console.log("NEW CONNECTION REQUEST")
    socket.on('join', ({ username, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, username, room });
        if (error) {
            return callback(error)
        }

        socket.join(user.room);

        socket.emit("message", { user: "Admin", text: `Welcome ${user.username}!`, time: getTime() });
        socket.broadcast.to(user.room).emit("message", { user: "Admin", text: `${user.username} has joined!`, time: getTime() });

        callback();
    });

    const filter = new Filter();
    socket.on("Send", (data, callback) => {
        const user = getUser(socket.id);
        if (!user) return callback("User not found");

        if (filter.isProfane(data)) {
            return callback("Profanity is not allowed!");
        }

        io.to(user.room).emit("message", { user: user.username, text: data, time: getTime() });
        callback();
    });

    socket.on("SendLocation", (coords, callback) => {
        const user = getUser(socket.id);
        if (!user) return callback("User not found");

        io.to(user.room).emit("message", {
            user: user.username,
            text: `User shared location: https://google.com/maps?q=${coords.latitude},${coords.longitude}`,
            time: getLocationTime()
        });

        callback();
    });

    socket.on("disconnect", () => {
        const user = removeUser(socket.id);
        if (user) {
            io.to(user.room).emit("message", { user: "Admin", text: `${user.username} has left the chat.`, time: getTime() });
        }
    });
});

module.exports = server;