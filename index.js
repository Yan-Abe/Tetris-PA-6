import TelaJogo from "./src/view.js";
import Jogo from "./src/jogo.js";
import Controller from "./src/controller.js";

const telaJogo = new TelaJogo(document.getElementById("app"), 480, 640);
const jogo = new Jogo();
const controller = new Controller(jogo, telaJogo);

 
