let r = Math.floor(10*Math.random())+1;
let n = -1
while(r != n){
n = prompt("Tente Acertar um número de 1 a 10: ");
    if(n > 10 || n < 1){
        alert("Número Inválido!");
    } else {
        if(n==r){
            alert("Parabéns! Você acertou.");}
        if(n>r){
            alert("Muito alto. Tente de novo!");}
        if(n<r){
            alert("Muito baixo. Tente de novo!");}}}