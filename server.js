const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const games = [];

app.use("/static", express.static(__dirname + "/src/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/telas", (req, res) => {
  res.json(games)
});


app.get("/game", (req, res) => {
    res.sendFile(__dirname + "/game.html");
  });


app.get("/controle", (req, res) => {
    res.sendFile(__dirname + "/controle.html");
  });

io.on("connection", (socket) => {
  console.log("a user connected");
  games.push(socket.id);

  socket.on("disconnect", () => {
    games.pop(socket.id);
    console.log("user disconnected");
  });
 
  socket.on("keyDown", (elem1) => {
    console.log("on keyDown");
    io.emit('keyDown', elem1)
  });

  socket.on("keyUp", (elem1) => {
    console.log("on keyUp");
    io.emit('keyUp', elem1)
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
