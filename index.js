
const Campo = (elemento, w, h )=>{
    console.log("#1")
    this.linhas = 20
    this.colunas = 10

    // largura do campo
    this.width = w
    this.height = h
    this.element = elemento;

    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");

    // largura do campo
    this.canvas.width = this.width
    this.canvas.height = this.height

    // Largura da borda do campo de jogo
    this.larguraBordaTela = 4;

    this.larguraBordaTela = 4;
    this.telaX = this.larguraBordaTela;
    this.telaY = this.larguraBordaTela;
    this.telaWidth = (this.width * 2) / 3;
    this.telaHeight = this.height;
    this.telaWidthInterno =
      this.telaWidth - this.larguraBordaTela * 2;
    this.telaHeightInterno =
      this.telaHeight - this.larguraBordaTela * 2;

    this.blockWidth = this.telaWidthInterno / linhas;
    this.blockHeight = this.telaHeightInterno / colunas;

    this.painelX = this.telaWidth + 10;
    this.painelY = 0;
    this.painelWidth = this.width / 3;
    this.painelHeight = this.height;

    this.element.appendChild(this.canvas);
    console.log("#1")
};


const campo = Campo(document.getElementById("app"), 480, 640);