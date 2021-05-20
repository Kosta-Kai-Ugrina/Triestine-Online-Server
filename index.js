const express = require("express");
const h = require("http");
const { exit } = require("process");
var app = express();
var server = h.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(`${__dirname}/node_modules`));
app.get("/", function (req, res, next) {
  res.send("Dobar dan sada pozdravljam ljude");
});

server.listen(50000);
io.on("connection", (socket) => {
  socket.on("cardPlayed", (msg) => {
    console.log("card has been played: ", msg);
  });
  socket.on("message", (msg) => {
    console.log("MESSAGE RECEIVED: ", msg);
    socket.emit("message", "hello there too");
  });
});
