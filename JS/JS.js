class Bola{
    constructor(jogo){
        this.positionX = 250;
        this.positionY =  200;
        this.velocidadeX = 5;
        this.velocidadeY = 4;
        this.jogo = jogo;

        this.bola = document.getElementById('bola');
        this.tela = document.getElementById('principal');

        const propriedade = this.tela.getBoundingClientRect();
        this.alturaTela = propriedade.height;
        this.larguraTela = propriedade.width;
        console.log(this.larguraTela);
    }
    movimentar(){
        this.positionX+=this.velocidadeX;
        this.bola.style.left = `${this.positionX}px`;
        this.positionY+=this.velocidadeY;
        this.bola.style.top = `${this.positionY}px`;

    }
    checarbordas(){
        if(this.positionX<=0){
        this.jogo.pontuar(2);
        this.jogo.parar();
        this.bola.style.left = `50%`;
        this.bola.style.top = `50%`;
        }
        else if(this.positionX+30>=this.larguraTela){
        this.jogo.pontuar(1);
        this.jogo.parar();
        this.bola.style.left = `50%`;
        this.bola.style.top = `50%`;
        }


        if(this.positionX + 30 >= this.larguraTela){
            this.velocidadeX *= -1;
        }if(this.positionX <= 0){
            this.velocidadeX *= -1;
        }

        if(this.positionY + 30 >= this.alturaTela){
            this.velocidadeY *= -1;
        }if(this.positionY <= 0){
            this.velocidadeY *= -1;
        }
    }
    impactojogador(jogador){
        this.ymenor = jogador.posicaoY;
        this.ymaior = jogador.posicaoY + jogador.altura;

        if(jogador.id == 1){
            this.xreferencia = jogador.largura;        
            if(this.positionX-15<=this.xreferencia && this.positionX-15>0){
              if(this.positionY >= this.ymenor && this.positionY<=this.ymaior){
                this.velocidadeX*=-1;
              }
            }
        }
        else if(jogador.id == 2){       
            this.xreferencia = jogador.posicaoX;      
            if(this.positionX + 30 >=this.xreferencia && this.positionX< 500){
                if(this.positionY>=this.ymenor && this.positionY <= this.ymaior){
                this.velocidadeX*=-1;
                }
            }
        }
    }
}
class jogador{
    constructor(ID){
        this.id=ID;
        this.altura = 80;
        this.largura = 25;
        this.velocidade = 20;
        this.posicaoY = 200;
        
        if(this.id == 1){
            this.posicaoX = document.getElementById('jogador1').offsetLeft;
        }
        else if(this.id == 2){
            this.posicaoX = document.getElementById('jogador2').offsetLeft;
        }
        this.tela = document.getElementById('principal');
    }

    movimentarjogador(teclapressionada){
       
        this.jogador1 = document.getElementById('jogador1');
        this.jogador2 = document.getElementById('jogador2');

        if(this.id==1){
        if(teclapressionada == 1){
            if(this.posicaoY>=0){ 
            this.posicaoY -= this.velocidade;
            this.jogador1.style.top = `${this.posicaoY}px`;
            }else{
            this.posicaoY = 0;
            }
        }
        if(teclapressionada == 2){      
            if(this.posicaoY + this.altura<400){
            this.posicaoY +=this.velocidade;
            this.jogador1.style.top = `${this.posicaoY}px`;
            }
        }
    }
    
    if(this.id==2){
        if(teclapressionada == 38){
          if(this.posicaoY + this.altura>=0){
            this.posicaoY -= this.velocidade;
            this.jogador2.style.top = `${this.posicaoY}px`;
          }else{
            this.posicaoY = 0;
          }
        }
        if(teclapressionada == 40){
            if(this.posicaoY + this.altura <=400){
            this.posicaoY +=this.velocidade;
            this.jogador2.style.top = `${this.posicaoY}px`;
            }
        }
          
    }
}
}
class jogo{
    constructor(){
        this.ponto1 = 0;
        this.ponto2 = 0;
        this.rodando = true;

        this.pontuacao1 = document.getElementById('pontuacao1');
        this.pontuacao2 = document.getElementById('pontuacao2');
        
    }
    pontuar(p){
        if(p == 1){
            this.ponto1++;
            this.pontuacao1.innerHTML = this.ponto1;
        }
        else if(p == 2){
            this.ponto2++;
            this.pontuacao2.innerHTML = this.ponto2;
        }
    }
    iniciar(){
        this.rodando = true;
    }
    parar(){
        this.rodando = false;
    }
}

var jogo1 = new jogo();
var bola1 = new Bola(jogo1);
var jogador1 = new jogador(1);
var jogador2 = new jogador(2);

var verificar = setInterval ( () => {
    if(jogo1.rodando == true){ draw();}
} , 22);

document.addEventListener('keydown', function(e){
    e = e || window.event;
    var key = e.keyCode || e.which;

    if(event.shiftKey){
        jogador1.movimentarjogador(1);
    }
    if(event.ctrlKey){
        jogador1.movimentarjogador(2);
    }
    if(key){
        jogador2.movimentarjogador(key);
    }
    if(key){
        jogador2.movimentarjogador(key);
    }
    if(key == '13'){
        jogo1.iniciar();
    }
}, 10);

document.addEventListener('keydown', function(e){
    e = e || window.event;
    var key1 = e.keyCode || e.which;
    if(key1 == '13'){
        jogo1.iniciar();
    }
});

function draw(){

    bola1.movimentar();
    bola1.checarbordas();
    bola1.impactojogador(jogador1);
    bola1.impactojogador(jogador2);
    jogo1.pontuar();
}