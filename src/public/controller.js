export default  class Controller {
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