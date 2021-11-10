class CocontroleRemoto {
  constructor(socket) {
    this.socket = socket;
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  /**
   * Handler para captura de cliques do teclado.
   */
  handleKeyDown(event) {
    const id_tela = document.getElementById("id_tela").value
    console.log("emitindo keyDown");
    console.log(event);
    this.socket.emit("keyDown", { cod: event.keyCode, id_tela});
  }

  handleKeyUp(event) {
    this.socket.emit("keyUp", { cod: event.keyCode });
  }
}

var socket = io();
var h2 = document.getElementById("sockte_id");

let controle = null;
socket.on("connect", function () {
  console.log(socket.io.engine.id);
  controle = new CocontroleRemoto(socket);
});

// Seta para cima
function arrUp() {
  controle.handleKeyDown({ keyCode: 38 });
}
//Seta esquerda
function arrLeft() {
  controle.handleKeyDown({ keyCode: 37 });
}
// Seta para direita
function arrDow() {
  controle.handleKeyDown({ keyCode: 40 });
}
// Seta para direita
function arrRigt() {
  controle.handleKeyDown({ keyCode: 39 });
}
//Enter
function actionEnter() {
  controle.handleKeyDown({ keyCode: 13 });
}
