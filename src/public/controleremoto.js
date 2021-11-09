export default  class Controller {
    constructor(socket) {
      
  
      document.addEventListener("keydown", this.handleKeyDown.bind(this)); 
      
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