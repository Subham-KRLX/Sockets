const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();

// parse JSON bodies for API requests
app.use(express.json());

const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    socket.broadcast.emit('chat message', msg);
  });
});

// mount users router
const usersRouter = require('./users/routes');
app.use('/users', usersRouter);

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});

