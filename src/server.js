// server.js
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

let timerState = {
  time: 0,
  isRunning: false,
};

io.on("connection", (socket) => {
  socket.emit("initialState", timerState);

  socket.on("start", () => {
    timerState.isRunning = true;
    io.emit("updateState", timerState);
  });

  socket.on("stop", () => {
    timerState.isRunning = false;
    io.emit("updateState", timerState);
  });

  socket.on("reset", () => {
    timerState.time = 0;
    timerState.isRunning = false;
    io.emit("updateState", timerState);
  });

  socket.on("disconnect", () => {
    // Cleanup if needed
  });
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
