import TelaJogo from "./src/view.js";
import Jogo from "./src/jogo.js";

const telaJogo = new TelaJogo(document.getElementById("app"), 480, 640);
const jogo = new Jogo();

const reder = (gameStatus) => {
  telaJogo.limpaTela();
  telaJogo.renderCampoJogo(gameStatus);
  telaJogo.renderPainelLateral(gameStatus);
};

const atualizaTela = () => {
  const gameStatus = jogo.getStatus();
  reder(gameStatus);
};

//
atualizaTela();

/**
 * Handler para captura de cliques do teclado.
 */
const handleKeyDown = (event) => {
  const state = jogo.getStatus();
  switch (event.keyCode) {
    case 37: //Seta esquerda
      jogo.movePecaParaEsquerda();

      break;
    case 38: // Seta para cima
      jogo.rotacionaPeca();
      break;
    case 39: // Seta para direita
      jogo.movePecaParaDireita();
      break;
    case 40: //Seta para baixo
      jogo.movePecaParaBaixo();
      break;
  }

  atualizaTela();
};

// Coloca o hadler para escutar os evendo de keyDow
document.addEventListener("keydown", handleKeyDown);
