const express = require('express');
const request = require('request');
const app = express();
const path = require('path');
const db = require("./db");



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app
    .get('/', (req, res) => {
        res.render('index');
    })
    .get('/login', (req, res) => {
        res.render('login');
    })
    .get('/cadastro', (req, res) => {
        res.render('cadastro');
    })
    .get('/pedido', (req, res) => {
        res.render('pedido');
    })
    .get('/confirmaPedido', (req, res) => {
        const itensPedido = {
        //PIZZAS
            'Pizza de Calabresa': req.query.pcalabresa || 0,
            'Pizza de  Frango com Catupiry': req.query.pfrango || 0,
            'Pizza de  Quatro Queijos': req.query.pqueijos || 0,
            'Pizza de Stogonoff de Carne': req.query.pstrcarne || 0,
            'Pizza de Stogonoff de Frango': req.query.pstrcfrango || 0,
            'Pizza de Camarão': req.query.pcamarao || 0,
            'Pizza de Chocolate Preto': req.query.pchocopreto || 0,
            'Pizza de Chocolate Branco': req.query.pchocobranco || 0,
            'Pizza de Chocolate Preto com Morango': req.query.pchocopretocmorango || 0,
        //Bebidas
            'Coca-Cola': req.query.cocacola || 0,
            'Guaraná': req.query.guarana || 0,
            'Sprite': req.query.sprite || 0,
            'Água': req.query.agua || 0,
            'Polar': req.query.polar || 0,
            'Heineken': req.query.heineken || 0,
            'Budweiser': req.query.budweiser || 0,
        };
      
        res.render('confirmaPedido', { itensPedido });
      })



    .listen(3000, () => {
        console.log("Servidor ligado na porta 3000");
    })