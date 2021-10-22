export default class TelaJogo {
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
