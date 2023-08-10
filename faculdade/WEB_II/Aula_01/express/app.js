const express = require("express");
let app = express();

app
    .get('/', (req, res) => {
        res.send("Bem vindo ao meu exercício!");
    })
    .get('/nome/:nome', (req, res) => {
        res.send("Bem vindo(a) " + req.params.nome);
    })


    .get('/repetir/:palavra/:num', (req, res) => {
        let p = req.params.palavra;
        let m = "";
        for(let i=0;i<req.params.num;i++){
            m += p + " "
        }
        res.send(m);
    })


    .get('/som/cao', (req, res) => {
        res.send("O cachorro faz 'Auuu Auuu Auuu'.");
    })
    .get('/som/gato', (req, res) => {
        res.send("O gato faz 'Miauuu'.");
    })
    .get('/som/vaca', (req, res) => {
        res.send("A vaca faz 'Mooon'.");
    })
    .get('/som/ovelha', (req, res) => {
        res.send("A ovelha faz 'Meeeee'.");
    })
    .get('/som/cavalo', (req, res) => {
        res.send("O cavalo faz 'Rhiiiii'.");
    })
    .get('/som/:animal', (req, res) => {
        res.send("Animal desconhecido.");
    })


    
    .get('/repetir/:palavra/:num', (req, res) => {
        let p = req.query.palavra;
        let m = "";
        for(let i=0;i<req.query.num;i++){
            m += p + " "
        }
        res.send(m);
    })


app.listen(3000, () => {
    console.log("Servidor ligado na porta 3000");
})