const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const app=express();
const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer(app); 
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});


app.use(cors());
app.use(bodyParser.json());

const connectedUsers = new Map();

// Socket.IO setup
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('register', (userId) => {
    connectedUsers.set(userId, socket.id);
    console.log(`Registered user ${userId} -> ${socket.id}`);
  });

  socket.on('disconnect', () => {
    for (let [userId, socketId] of connectedUsers.entries()) {
      if (socketId === socket.id) {
        connectedUsers.delete(userId);
        console.log(` Disconnected: ${userId}`);
        break;
      }
    }
  });
});

app.set('socketio', io);
app.set('connectedUsers', connectedUsers);

const userRoute=require('./user/userRoute');
const vendorRoute=require('./vendors/vendorsRoute');
const notificationRoute=require('./notification/notificationRoute');
const menuRoute=require('./menu/menuRoute');
const breakFastRoute=require('./breakfast/breakFastRoute');
const dinnerRoute=require('./dinner/dinnerRoute');
const requestRoute=require('./request/requestRoute');

app.use('/',userRoute);
app.use('/',vendorRoute);
app.use('/',notificationRoute);
app.use('/',menuRoute);
app.use('/',breakFastRoute);
app.use('/',dinnerRoute);
app.use('/',requestRoute);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});