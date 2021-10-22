 
class Controller {
    constructor(jogo, telaJogo) {
      this.jogo = jogo;
      this.telaJogo = telaJogo;
      this.intervalId = null;
      this.indRodando = false;
  
      document.addEventListener("keydown", this.handleKeyDown.bind(this));
      this.telaJogo.renderTelaInicial();
      
    }
  
    atualiza() {
      this.jogo.movePecaParaBaixo();
      this.atualizaTetelaJogo();
    }
  
    joga() {
      this.indRodando = true;
      this.iniciaTempo();
      this.atualizaTetelaJogo();
    }
  
    pause() {
      this.indRodando = false;
      this.pararTempo();
      this.atualizaTetelaJogo();
    }
  
    reinicia() {
      this.jogo.reinicia();
      this.joga();
    }
  
    atualizaTetelaJogo() {
      const status = this.jogo.getStatus();
      if (status.fimDeJogo) {
        this.pararTempo();
        this.telaJogo.fimDeJogo(status);
        return;
      }if(!this.indRodando) {
        this.telaJogo.renderPausa();
      }else {
        this.telaJogo.render(status);
      }
    }
  
    iniciaTempo() {
      const speed = 1000 - this.jogo.getStatus().nivel * 100;
  
      // seta um intervalo para atualizar conform a velocidade
      if (!this.intervalId) {
        this.intervalId = setInterval(
          () => {
            this.atualiza();
          },
          speed > 0 ? speed : 100
        );
      }
    }
  
    pararTempo() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    }
  
    /**
     * Handler para captura de cliques do teclado.
     */
    handleKeyDown(event) {
      const state = this.jogo.getStatus();
  
      switch (event.keyCode) {
        case 13: //Enter
          if (state.fimDeJogo) {
            this.reinicia();
          } else if (this.indRodando) {
            this.pause();
          } else {
            this.joga();
          }
          break;
        case 37: //Seta esquerda
          this.jogo.movePecaParaEsquerda();
  
          break;
        case 38: // Seta para cima
          this.jogo.rotacionaPeca();
          break;
        case 39: // Seta para direita
          this.jogo.movePecaParaDireita();
          break;
        case 40: //Seta para baixo
        
          this.jogo.movePecaParaBaixo();
          break;
      }
  
      this.atualizaTetelaJogo();
    }
  
    handleKeyUp(event) {
      switch (event.keyCode) {
        case 40: //Down arrow
          this.iniciaTempo();
          break;
      }
    }
  }

  class TelaJogo {
    static colors = {
      1: "cyan",
      2: "aqua",
      3: "orange",
      4: "yellow",
      5: "green",
      6: "purple",
      7: "red",
    };
  
    constructor(appTag, w, h) {
      console.log("#1");
      // a tela do jogo sera uma matriz de 10x20
      this.linhas = 20;
      this.colunas = 10;
  
      // largura do campo
      this.width = w;
      this.height = h;
      this.appTag = appTag;
  
      this.canvas = document.createElement("canvas");
      this.context = this.canvas.getContext("2d");
  
      // largura do campo
      this.canvas.width = this.width;
      this.canvas.height = this.height;
  
      // Largura da borda do campo de jogo
      this.larguraBordaTela = 4;
  
      this.larguraBordaTela = 4;
      this.telaX = this.larguraBordaTela;
      this.telaY = this.larguraBordaTela;
      // largura da tela (2/3 da tela)
      this.telaWidth = (this.width * 2) / 3;
      // altura da tela
      this.telaHeight = this.height;
      this.telaWidthInterno = this.telaWidth - this.larguraBordaTela * 2;
      this.telaHeightInterno = this.telaHeight - this.larguraBordaTela * 2;
  
      // defini tamanho dos blocos
      this.blocoWidth = this.telaWidthInterno / this.colunas;
      this.blocoHeight = this.telaHeightInterno / this.linhas;
      console.log(
        "1;w=" + this.telaWidthInterno + ";h=" + this.telaHeightInterno
      );
      console.log("2;w=" + this.blocoWidth + ";h=" + this.blocoHeight);
      console.log("3;l=" + this.linhas + ";c=" + this.colunas);
      this.painelX = this.telaWidth + 10;
      this.painelY = 0;
      this.painelWidth = this.width / 3;
      this.painelHeight = this.height;
  
      // adiciona a tag canvas no HTML
      this.appTag.appendChild(this.canvas);
      console.log("#2");
  
      return this;
    }
  
    render(gameStatus) {
      this.limpaTela();
      this.renderCampoJogo(gameStatus);
      this.renderPainelLateral(gameStatus);
    }
  
    /**
     * Renderiza o pinel lateral com as informações
     * de pontuação e nivel
     */
    renderPainelLateral({ nivel, pontuacao, linhas }) {
      this.context.textAlign = "start";
      this.context.textBaseline = "top";
      this.context.fillStyle = "white";
      this.context.font = '14px "Press Start 2P"';
  
      this.context.fillText(
        `Pontuação: ${pontuacao}`,
        this.painelX,
        this.painelY + 0
      );
      this.context.fillText(`Linhas: ${linhas}`, this.painelX, this.painelY + 24);
      this.context.fillText(`Nivel: ${nivel}`, this.painelX, this.painelY + 48);
    }
  
    /**
     * Renderiza um bloco
     */
    renderBloco(x, y, width, height, color) {
      this.context.fillStyle = color;
      this.context.strokeStyle = "black";
      this.context.lineWidth = 2;
      // desenha o retangulo
      this.context.fillRect(x, y, width, height);
      this.context.strokeRect(x, y, width, height);
    }
  
    /**
     * Renderiza o campo de jogo
     */
    renderCampoJogo({ campoDeJogo }) {
      for (let y = 0; y < campoDeJogo.length; y++) {
        const line = campoDeJogo[y];
        for (let x = 0; x < line.length; x++) {
          const bloco = line[x];
  
          if (bloco) {
            this.renderBloco(
              x * this.blocoWidth,
              y * this.blocoHeight,
              this.blocoWidth,
              this.blocoHeight,
              TelaJogo.colors[bloco]
            );
          }
        }
      }
      // Desenhando o quadro em volta do campo
      this.context.strokeStyle = "white"; // cor
      this.context.lineWidth = this.larguraBordaTela; // espeçura da borda
      // desenha um retângulo traçado de acordo com o strokeStyle atual
      this.context.strokeRect(0, 0, this.telaWidth, this.telaHeight);
    }
  
    limpaTela() {
      this.context.clearRect(0, 0, this.width, this.height);
    }
  
    /**
     * Renderiza menssagem de fim de jogo
     */
    fimDeJogo({ pontuacao }) {
      console.log("fimDeJogo")
      this.limpaTela();
  
      this.context.fillStyle = "white";
      this.context.font = '18px "Press Start 2P"';
      this.context.textAlign = "center";
      this.context.textBaseline = "middle";
      this.context.fillText("GAME OVER", this.width / 2, this.height / 2 - 48);
      this.context.fillText(`Pontuação: ${pontuacao}`, this.width / 2, this.height / 2);
      this.context.fillText(
        "Pressione ENTER para reiniciar",
        this.width / 2,
        this.height / 2 + 48
      );
    }
  
    renderPausa() {
      this.context.fillStyle = "rgba(0,0,0,0.75";
      this.context.fillRect(0, 0, this.width, this.height);
  
      this.context.fillStyle = "white";
      this.context.font = '18px "Press Start 2P"';
      this.context.textAlign = "center";
      this.context.textBaseline = "middle";
      this.context.fillText(
        "Pressione ENTER para continuar",
        this.width / 2,
        this.height / 2
      );
    }
  
    renderTelaInicial() {
      this.context.fillStyle = "white";
      this.context.font = '18px "Press Start 2P"';
      this.context.textAlign = "center";
      this.context.textBaseline = "middle";
      this.context.fillText(
        "Precione ENTER para iniciar",
        this.width / 2,
        this.height / 2
      );
    }
  }

  class Jogo {
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
          case1: peca.blocos = [
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

  
const telaJogo = new TelaJogo(document.getElementById("app"), 480, 640);
const jogo = new Jogo();
const controller = new Controller(jogo, telaJogo);

 
