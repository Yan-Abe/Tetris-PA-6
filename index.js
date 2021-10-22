import TelaJogo from './src/view.js';

const telaJogo = new TelaJogo(document.getElementById("app"), 480, 640);

function criarCampoDeJogo() {
  const campoDeJogo = [];
  for (let y = 0; y < 20; y++) {
    campoDeJogo[y] = [];
    for (let x = 0; x < 10; x++) {
      campoDeJogo[y][x] = 1;
    }
  }
  return campoDeJogo;
}

const gameStatus = { level: 1, score:0, lines:0 , campoDeJogo: criarCampoDeJogo()}

telaJogo.renderCampoJogo(gameStatus);
telaJogo.renderPainelLateral(gameStatus);
