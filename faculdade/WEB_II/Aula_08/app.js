const express = require('express');
const request = require('request');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

//Conexão com BD
mongoose.connect('mongodb://127.0.0.1:27017/previsao', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
    console.log("Conexão estabelecida com o banco!");
})
    .catch(err =>{
    console.log("Erro ao conectar com o banco!");
    console.log(err);
});

const previsaoSchema = new mongoose.Schema({
    cidade: String
});
const previsao = mongoose.model("Previsao",previsaoSchema);
//FIm da Conexão com BD


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('busca');
});
app.get('/busca', (req, res) => {
    let busca = req.query.busca
    let resposta = {};
    request("https://api.hgbrasil.com/weather?key=SUA-CHAVE&city_name=" + busca, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            resposta = JSON.parse(body);
        }
        
        res.render('resultadobusca', {resposta})
        cidades = resposta.results.city_name;
        const insert = new previsao({
            cidade: cidades
        });
        insert.save();
    })
});
app.get('/historico', async (req, res) => {
    const select = await previsao.find({});
    res.render('historico', {select});
})
app.listen(3000, () => console.log("Servidor ligado na porta 3000!"));