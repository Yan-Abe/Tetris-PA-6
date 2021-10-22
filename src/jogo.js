export default class Jogo {

  constructor() {
    this.pontuacao = 0;
    this.linhas = 0;
    this.campoDeJogo = this.criarCampoDeJogo();
    this.pecaAtual = this.criarPeca();
  }

  /**
   * Cria uma nova peça
   * @returns {}
   */
  criarPeca() {
    // TODO adicionar mais peças
    const peca = {};
    peca.blocos = [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    peca.x = 4;
    peca.y = -1;

    return peca;
  }

  /**
   * Criaum campo de jogo vazio
   * @returns
   */
  criarCampoDeJogo() {
    const campoDeJogo = [];
    for (let y = 0; y < 20; y++) {
      campoDeJogo[y] = [];
      for (let x = 0; x < 10; x++) {
        campoDeJogo[y][x] = 0;
      }
    }
    return campoDeJogo;
  }

  getStatus() {
    const campoDeJogo = this.criarCampoDeJogo();
    const { y: PecaY, x: PecaX, blocos } = this.pecaAtual;

    for (let y = 0; y < this.campoDeJogo.length; y++) {
      campoDeJogo[y] = [];
      for (let x = 0; x < this.campoDeJogo[y].length; x++) {
        campoDeJogo[y][x] = this.campoDeJogo[y][x];
      }
    }

    for (let y = 0; y < blocos.length; y++) {
      for (let x = 0; x < blocos[y].length; x++) {
        if (blocos[y][x]) {
          campoDeJogo[PecaY + y][PecaX + x] = blocos[y][x];
        }
      }
    }

    return {
      pontuacao: this.pontuacao,
      nivel: this.nivel,
      linhas: this.lines,
      proximaPeca: this.proximaPeca,
      campoDeJogo
    };
  }
}
