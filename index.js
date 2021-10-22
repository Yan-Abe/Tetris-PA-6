import TelaJogo from './src/view.js';
import Jogo from './src/jogo.js';

const telaJogo = new TelaJogo(document.getElementById("app"), 480, 640);
const jogo = new Jogo();



const gameStatus = jogo.getStatus();

telaJogo.renderCampoJogo(gameStatus);
telaJogo.renderPainelLateral(gameStatus);
