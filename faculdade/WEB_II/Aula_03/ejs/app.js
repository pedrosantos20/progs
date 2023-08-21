const express = require("express");
let app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));

app
    .get('/palindromo', (req, res) => {
        res.render("palindromo/palindromo");
    })
    .get('/palindromo/resultado', (req, res) => {
        const q = req.query.q;
        res.render("palindromo/resultado/resultado", {q});
    })
    .post('/palindromo/resultado', (req, res) => {
        const q = req.body.q;
        
        res.render("palindromo/resultado/resultado", {q});
    })
    
    app.listen(3000, () => {
        console.log("Servidor ligado na porta 3000");
    })