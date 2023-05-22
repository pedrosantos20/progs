function fatorial(n){
    let r=1;
    for(let i = n; i>1; i--){
        r = r*i;
    }
    return r;
}
let n = prompt("Digite o número: ");
alert(fatorial(n));