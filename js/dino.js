
let pontos = 0;
let posicaoDoCactus = 0;
const dino = window.document.querySelector(".dino");
const fundo = window.document.querySelector(".fundo");
const placar = window.document.createElement("h2");
placar.classList.add("placar");
placar.innerHTML = "Pontos: " + pontos;
window.document.body.appendChild(placar);

 let posicao = 0;
 let estaPulando = false;
 let eOFim = false;

let somPulo = new Audio();
somPulo.src = "sons/jump.mp3";
somPulo.volume = 0.2;
somPulo.load();

window.document.addEventListener("keyup", pressionouTocou);
window.document.addEventListener("touchend", pressionouTocou);

function pressionouTocou(evento){
        
        if(evento.keyCode === 32){
            somPulo.currentTime = 0.0;
            somPulo.play();
            
            if(!estaPulando){
                pulo();
            }
        }
        if(evento.type == "touchend"){
            somPulo.currentTime = 0.0;
            somPulo.play();
             if(!estaPulando){
                pulo();
            }
        }
}

function pulo(){
    estaPulando = true;   
    let intervaloDeCima = setInterval(() => {

        if(posicao <= 160){
            posicao += 20;
            dino.style.bottom = posicao + "px";

            if(posicaoDoCactus > 10 && posicaoDoCactus <= 200 && posicao > 60 && posicao <= 85 ){
             pontos++;
             placar.innerHTML = "Pontos: " + pontos;
             console.log("posicao do Cactus", posicaoDoCactus, "e posicao", posicao, "e pontos", pontos);
            }
            } 

        else{
            window.clearInterval(intervaloDeCima);
            let intervaloDebaixo = window.setInterval(() => {
                posicao -= 20;
                dino.style.bottom = posicao + "px";

                if(posicao <= 0){
                    window.clearInterval(intervaloDebaixo);
                    estaPulando = false;
                }
            }, 20);
        }
               
    }, 20);
        
}

function criarCactus(){
    let novoCactus = Math.random() * 6000;
    let posicaoCactus = 1000;
    const cactus = window.document.createElement("div");
    cactus.classList.add("cactus");
    fundo.appendChild(cactus);
    cactus.style.left = 1000 + "px";

    if(eOFim){ return;}

    let moverEsquerda = setInterval(() => {

        if(posicaoCactus < -60){
            window.clearInterval(moverEsquerda);
            fundo.removeChild(cactus);
        }

        else if(posicaoCactus > 0 && posicaoCactus < 60 && posicao < 60){
            window.clearInterval(moverEsquerda);
            eOFim = true;
            window.document.body.innerHTML = "<div><h2 class='placar'>Pontos: " + pontos + "</h2>"
            + "<h1 class='fim'>Game Over!</h1></div>";
        }

        else{
            posicaoCactus -= 10;
            cactus.style.left = posicaoCactus + "px"; 
            posicaoDoCactus = posicaoCactus;
        }
    }, 20);
    setTimeout(criarCactus, novoCactus);

}

criarCactus();