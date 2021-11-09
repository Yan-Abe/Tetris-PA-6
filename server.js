const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use("/static", express.static(__dirname + "/src/public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });


app.get("/game", (req, res) => {
    res.sendFile(__dirname + "/game.html");
  });


app.get("/controle", (req, res) => {
    res.sendFile(__dirname + "/controle.html");
  });

const games = [];
io.on("connection", (socket) => {
  console.log("a user connected");
  games.push(socket.id);

  socket.on("disconnect", () => {
    games.pop(socket.id);
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
