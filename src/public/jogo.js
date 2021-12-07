export default class Jogo {
    constructor(colunas = 10, linhas = 20) {
      this.nColunas = colunas;
      this.nLinhas = linhas;
      this.reinicia();
    }
  
    reinicia() {
      this.pontuacao = 0;
      this.linhas = 0;
      this.nivel = 0;
      this.campoDeJogo = this.criarCampoDeJogo();
      this.pecaAtual = this.criarPeca();
      this.fimDeJogo = false;
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
        linhas: this.linhas,
        proximaPeca: this.proximaPeca,
        campoDeJogo,
        fimDeJogo: this.fimDeJogo,
      };
    }
  
    /**
     * Move a peça atual para baixo
     **/
    movePecaParaBaixo() {
      if (this.fimDeJogo) return;
  
      // incrementa a posição no ixo Y
      this.pecaAtual.y += 1;
  
      if (this.temColizao()) {
        // reverte
        this.pecaAtual.y -= 1;
        this.bloqueiaPeca();
        const removLinhas = this.removeLinhas();
        this.atualizaPontuacao(removLinhas);
        this.atualizaPeca();
      }
  
      if (this.temColizao()) {
        this.fimDeJogo = true;
      }
    }
    /**
     * Move a peça atual para Esquerda
     **/
    movePecaParaEsquerda() {
      // Decrementa a posição no ixo X
      this.pecaAtual.x -= 1;
      if (this.temColizao()) this.pecaAtual.x += 1;
    }
  
    /**
     * Move a peça atual para Direita
     **/
    movePecaParaDireita() {
      // Incrementa a posição no ixo X
      this.pecaAtual.x += 1;
      if (this.temColizao()) this.pecaAtual.x -= 1;
    }
  
    /**
     * Verifica se a peça atual esta colidindo
     * com a parede ou com um bloco.
     */
    temColizao() {
      const { y: pecaY, x: pecaX, blocos } = this.pecaAtual;
  
      for (let y = 0; y < blocos.length; y++) {
        for (let x = 0; x < blocos[y].length; x++) {
          if (
            blocos[y][x] &&
            // se passou a parede
            (this.campoDeJogo[pecaY + y] === undefined ||
              this.campoDeJogo[pecaY + y][pecaX + x] === undefined ||
              // se colidiu com um bloco
              this.campoDeJogo[pecaY + y][pecaX + x])
          ) {
            return true;
          }
        }
      }
    }
  
    /**
     * rotaciona a peça atual
     */
    rotacionaPeca() {
      this.rotacionaBlocos();
  
      if (this.temColizao()) {
        this.rotacionaBlocos(false);
      }
    }
  
    /**
     * Rotaciona os blocos da peça atual
     *
     */
    rotacionaBlocos(sentidoHorario = true) {
      const blocos = this.pecaAtual.blocos;
      const length = blocos.length;
      const x = Math.floor(length / 2);
      const y = length - 1;
  
      for (let i = 0; i < x; i++) {
        for (let j = i; j < y - i; j++) {
          const temp = blocos[i][j];
  
          if (sentidoHorario) {
            blocos[i][j] = blocos[y - j][i];
            blocos[y - j][i] = blocos[y - i][y - j];
            blocos[y - i][y - j] = blocos[j][y - i];
            blocos[j][y - i] = temp;
          } else {
            blocos[i][j] = blocos[j][y - i];
            blocos[j][y - i] = blocos[y - i][y - j];
            blocos[y - i][y - j] = blocos[y - j][i];
            blocos[y - j][i] = temp;
          }
        }
      }
    }
  
    /**
     * bloqueia peça no tabuleiro
     */
    bloqueiaPeca() {
      const { y: pecaY, x: pecaX, blocos } = this.pecaAtual;
  
      for (let y = 0; y < blocos.length; y++) {
        for (let x = 0; x < blocos[y].length; x++) {
          if (blocos[y][x]) {
            this.campoDeJogo[pecaY + y][pecaX + x] = blocos[y][x];
          }
        }
      }
    }
  
    /**
     * Cria uma nova peça
     */
    atualizaPeca() {
      this.pecaAtual = this.criarPeca();
    }
  
    /**
     * remove as linhas completas
     */
    removeLinhas() {
      let linhas = [];
      // para cada linha no tabuleiro
      for (let y = this.nLinhas - 1; y >= 0; y--) {
        // conta quantos blocos nesssa linha
        let numeroDeBlocos = 0;
        for (let x = 0; x < this.nColunas; x++) {
          if (this.campoDeJogo[y][x]) {
            numeroDeBlocos += 1;
          }
        }
  
        // se fazio
        if (numeroDeBlocos === 0) {
          break;
        }
        // se a linha não esta completa passa para proxima
        else if (numeroDeBlocos < this.nColunas) {
          continue;
        }
        // se linha completa
        else if (numeroDeBlocos === this.nColunas) {
          linhas.unshift(y);
        }
      }
  
      for (let index of linhas) {
        // remove linha
        this.campoDeJogo.splice(index, 1);
        // adicionalinha vazia
        this.campoDeJogo.unshift(new Array(this.nColunas).fill(0));
      }
  
      return linhas.length;
    }
  
    atualizaPontuacao(linhasRemovidas) {
      if (linhasRemovidas > 0) {
        const pontos = {
          1: 40,
          2: 100,
          3: 300,
          4: 1200,
        };
  
        this.pontuacao += pontos[linhasRemovidas] * (this.nivel + 1);
        this.linhas += linhasRemovidas;
        this.nivel = Math.floor(this.linhas * 0.1);
        console.log(this.pontuacao, this.linhas, this.nivel);
      }
    }
  
    /**
     * Cria uma nova peça
     * @returns {}
     */
    criarPeca() {
      const peca = {};
      const index = Math.floor(Math.random() * 7);
      switch (index) {
        case 0:
          peca.blocos = [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
          ];
          break;
          case 1: peca.blocos = [
            [0, 0, 0],
            [2, 2, 2],
            [0, 0, 2],
          ];
          break;
        case 2:
          peca.blocos = [
            [0, 0, 0],
            [3, 3, 3],
            [3, 0, 0],
          ];
          break;
        case 3:
          peca.blocos = [
            [0, 0, 0, 0],
            [0, 4, 4, 0],
            [0, 4, 4, 0],
            [0, 0, 0, 0],
          ];
          break;
        case 4:
          peca.blocos = [
            [0, 0, 0],
            [0, 5, 5],
            [5, 5, 0],
          ];
          break;
        case 5:
          peca.blocos = [
            [0, 0, 0],
            [6, 6, 6],
            [0, 6, 0],
          ];
          break;
        default:
          peca.blocos = [
            [0, 0, 0],
            [7, 7, 0],
            [0, 7, 7],
          ];
          break;
      }
      peca.x = 4;
      peca.y = -1;
  
      return peca;
    }
  }
