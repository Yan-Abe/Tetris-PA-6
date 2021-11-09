import TelaJogo from "./view.js";
import Jogo from "./jogo.js";
import Controller from "./controller.js";

const telaJogo = new TelaJogo(document.getElementById("app"), 480, 640);
const jogo = new Jogo();
const controller = new Controller(jogo, telaJogo);