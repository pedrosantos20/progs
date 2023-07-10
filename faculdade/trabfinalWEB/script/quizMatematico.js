let dificuldade = 10;
let vidas = 5;
let pontos = 0;
let maximo = 20;


let n1;
let n2;
let operacao;
let sinal;

function iniciarJogo() {
    
        
    if (pontos >= maximo) {
        dificuldade = dificuldade + 10;
        maximo = maximo + 20;
    }
    n1 = Math.floor(dificuldade * Math.random());
    n2 = Math.floor(dificuldade * Math.random());
    operacao = Math.floor(4 * Math.random());
    sinal = "";

    if (operacao == 0) {
        sinal = "+"
    }
    else if (operacao == 1) {
        sinal = "-";
    }
    else if (operacao == 2) {
        sinal = "*";
    }
    else if (operacao == 3) {
        while (n1 % n2 != 0) {
            n1 = Math.floor(dificuldade * Math.random());
            n2 = Math.floor(dificuldade * Math.random());
        }
        sinal = "÷";
    }
    const vida = document.getElementById("vida");
    if (vidas == 5) {
        document.getElementById("vida").innerHTML = "<img src='../img/coracao.svg' alt='' width='80px' height='80px'><img src='../img/coracao.svg' alt='' width='80px' height='80px'><img src='../img/coracao.svg' alt='' width='80px' height='80px'><img src='../img/coracao.svg' alt='' width='80px' height='80px'><img src='../img/coracao.svg' alt='' width='80px' height='80px'>";
    }
    if (vidas == 4) {
        document.getElementById("vida").innerHTML = "<img src='../img/coracao.svg' alt='' width='80px' height='80px'><img src='../img/coracao.svg' alt='' width='80px' height='80px'><img src='../img/coracao.svg' alt='' width='80px' height='80px'><img src='../img/coracao.svg' alt='' width='80px' height='80px'>";
    }
    if (vidas == 3) {
        document.getElementById("vida").innerHTML = "<img src='../img/coracao.svg' alt='' width='80px' height='80px'><img src='../img/coracao.svg' alt='' width='80px' height='80px'><img src='../img/coracao.svg' alt='' width='80px' height='80px'>";
    }
    if (vidas == 2) {
        document.getElementById("vida").innerHTML = "<img src='../img/coracao.svg' alt='' width='80px' height='80px'><img src='../img/coracao.svg' alt='' width='80px' height='80px'>";
    }
    if (vidas == 1) {
        document.getElementById("vida").innerHTML = "<img src='../img/coracao.svg' alt='' width='80px' height='80px'>";
    }
    const pergunta = document.getElementById("pergunta");
    pergunta.innerHTML = `Qual o resultado de: <br><br> ${n1} ${sinal} ${n2} ?`;
    const ponto = document.getElementById("ponto");
    ponto.innerHTML = `PONTOS: ${pontos}`;
}

iniciarJogo();

document.getElementById("enviar").onclick = function (e) {
    verifica();
    document.getElementById("valor").value = "";
    e.preventDefault();
};

function verifica() {
    const resposta = document.getElementById("valor").value;
    let respostaCorreta;

    if (operacao == 0) {
        respostaCorreta = n1 + n2;
    }
    else if (operacao == 1) {
        respostaCorreta = n1 - n2;
    }
    else if (operacao == 2) {
        respostaCorreta = n1 * n2;
    }
    else if (operacao == 3) {
        respostaCorreta = n1 / n2;
    }

    if (respostaCorreta == resposta) {
        alert("Você Acertou!");
        pontos = pontos + 5;
        iniciarJogo();
    } else {
        alert("Você Errou");
        vidas = vidas - 1;
        if (vidas == 0) {
            alert("GAME OVER! VOCÊ PERDEU!");
            let c = confirm("Deseja Jogar Novamente?");
            if (c == true) {
                vidas = 5;
                pontos = 0;
                iniciarJogo();
                return;
            } else {
                window.location.href = "../index.html";
            }
        }
        
        iniciarJogo();
    }
}

