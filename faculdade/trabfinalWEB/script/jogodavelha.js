//variavel para mudar jogador na tela
const playerName = document.querySelector(".playerName");
const placarX = document.querySelector(".placarX");
const placarO = document.querySelector(".placarO");
//variaveis globais
let casaSelecionada;
let letra = "X";
let x = 0;
let o = 0;
//Posições possiveis
let posicoes = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];
//declarando função pra iniciar jogo
function iniciarJogo() {
    casaSelecionada = [];
    //retorna X ao reiniciar jogo
    letra = "X";
    //mostrando player atual
    playerName.innerHTML = `JOGADOR DA VEZ:${letra}`;
    document.querySelectorAll(".jogodavelha button").forEach((item) => {
        item.innerHTML = "";
        item.addEventListener("click", movimento);
    });
    //placar
    placarX.innerHTML = x;
    placarO.innerHTML = o;
}
//Iniciando o Jogo
iniciarJogo();
//cliques para adicionar valores no jogo
function movimento(e) {
    const index = e.target.getAttribute("casa");
    e.target.innerHTML = letra;
    e.target.removeEventListener("click", movimento);
    casaSelecionada[index] = letra;
    //chamando função para verificar ganhador
    setTimeout(() => {
        check();
    }, [100]);
    //trocando jogador
    letra = letra === "X" ? "O" : "X";
    playerName.innerHTML = `JOGADOR DA VEZ: ${letra}`;
}
//função para verificar ganhador
function check() {
    let verificaGanhador = letra === "X" ? "O" : "X";
    //verificando os itens selecionados
    const items = casaSelecionada
        .map((item, i) => [item, i])
        .filter((item) => item[0] === verificaGanhador)
        .map((item) => item[1]);
    //percorrendo array de posições possíveis para definir ganhador
    for (pos of posicoes) {
        //verificando se há ganhador
        if (pos.every((item) => items.includes(item))) {
            let c = confirm("O JOGADOR '" + verificaGanhador + "' GANHOU! DESEJA JOGAR NOVAMENTE?");
            if (c == true) {
                //atualiizando placar
                if (verificaGanhador == "X") {
                    x++;
                }
                if (verificaGanhador == "O") {
                    o++;
                }
                iniciarJogo();
                return;
            } else {
                window.location.href = "../index.html";
            }
        }
    }
    //verifica se deu empate
    if (casaSelecionada.filter((item) => item).length === 9) {
        let c = confirm("DEU EMPATE! DESEJA CONTINUAR?");
        if (c == true) {
            iniciarJogo();
            return;
        } else {
            window.location.href = "../index.html";
        }
    }
}