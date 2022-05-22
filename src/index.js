const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const { generateMsg } = require("./msg");
const { addUser, removeUser, getUser, getUserInRoom } = require("./users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  socket.on("join", ({ username, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, username, room });
    if (error) {
      return callback(error);
    }
    socket.join(user.room);

    socket.emit(
      "newMsg",
      generateMsg(
        "Welcome! you are connected through the socket.io",
        user.username
      )
    );

    socket.broadcast
      .to(user.room)
      .emit(
        "newMsg",
        generateMsg(`${user.username} just joined the room`, user.username)
      );

    callback();
  });

  socket.on("sendMsg", (msg, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("newMsg", generateMsg(msg, user.username));
    callback();
  });

  socket.on("sendLocation", (msg, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("locationMsg", generateMsg(msg, user.username));
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        "newMsg",
        generateMsg(`${user.username} just left the room`, user.username)
      );
    }
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
