const express = require('express');
const { Server } = require("socket.io");
const { createServer } = require('http');
const { join } = require('node:path');

const app = express();
const server = createServer(app);
const io = new Server(server);

let users = {};

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on("connection", (socket) => {
  console.log("connected:", socket.id);

  socket.on("register", (userId) => {
    users[userId] = socket.id;
    console.log(`User registered: ${userId} with socket ${socket.id}`);
  });

  socket.on("privateMessage", ({ toUser, message }) => {
    const toSocketId = users[toUser];
    if (toSocketId) {
      io.to(toSocketId).emit("privateMessage", { fromUser: getUserBySocketId(socket.id), message });
    }
  });

  socket.on("joinRoom", (roomName) => {
    socket.join(roomName);
    console.log(`Socket ${socket.id} joined room ${roomName}`);
  });

  socket.on("groupMessage", ({ roomName, message }) => {
    socket.to(roomName).emit("groupMessage", { roomName, fromUser: getUserBySocketId(socket.id), message });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    for (let userId in users) {
      if (users[userId] === socket.id) {
        delete users[userId];
        break;
      }
    }
  });
});

function getUserBySocketId(socketId) {
  return Object.keys(users).find(key => users[key] === socketId);
}

server.listen(3005, () => {
  console.log('Server running at http://localhost:3005');
});