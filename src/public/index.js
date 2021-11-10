import TelaJogo from "./view.js";
import Jogo from "./jogo.js";
import Controller from "./controller.js";

const telaJogo = new TelaJogo(document.getElementById("app"), 480, 640);
const jogo = new Jogo();
const controller = new Controller(jogo, telaJogo);

var socket = io();
var h2 = document.getElementById("sockte_id");

socket.on("connect", function () {
  h2.innerHTML = "ID: " + socket.io.engine.id;
  console.log(socket.io.engine.id);
});

 

socket.on("keyDown", (elem1) => {
  console.log("on keyDown: ");
  console.log( elem1);
  if(socket.io.engine.id==elem1.id_tela)
    controller.actionKeyDown(elem1.cod);
});

socket.on("keyUp", (elem1) => {
  console.log("on keyUp");
  if(socket.io.engine.id==elem1.id_tela)
    controller.actionKeyUp(elem1.cod);
});
