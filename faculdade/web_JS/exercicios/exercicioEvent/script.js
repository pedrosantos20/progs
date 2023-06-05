let b = document.querySelector("button");
let color = document.querySelector("body");
function bgc(){
    let n = Math.floor(10*Math.random());
    let bg = ["black","rebeccapurple","royalblue","red","green","yellowgreen","pink","brown","gray","sandybrown"];
    color.style.backgroundColor = bg[n];
    console.log(bg[n]);
}
b.addEventListener("click", bgc);

