let p = prompt("Digite uma Palavra");
let np = ""
for (var i = p.length - 1; i >= 0; i--) { 
    np += p[i];}
alert(np);
if(p.toUpperCase==np.toUpperCase){
    alert("São Palindromos");}