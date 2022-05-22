const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const { generateMsg } = require("./msg");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  socket.emit(
    "newMsg",
    generateMsg("Welcome! you are connected through the socket.io")
  );

  socket.broadcast.emit(
    "newMsg",
    generateMsg("A new user joined the chat room")
  );

  socket.on("sendMsg", (msg, callback) => {
    io.emit("newMsg", generateMsg(msg));
    callback();
  });

  socket.on("sendLocation", (msg, callback) => {
    io.emit("locationMsg", generateMsg(msg));
    callback();
  });

  socket.on("disconnect", () => {
    io.emit("newMsg", generateMsg("A user just left the chat room"));
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
