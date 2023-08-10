const express = require("express");
let app = express();

app.set("view engine", "ejs");

app
    .get('/', (req, res) => {
        res.render("home");
    })
    .get('/aleatorio', (req, res) => {
        res.render("aleatorio/aleatorio");
    })
    .get('/palindromo', (req, res) => {
        const q = req.query.q;
        res.render("palindromo/palindromo", {q});
    })
    
    app.listen(3000, () => {
        console.log("Servidor ligado na porta 3000");
    })