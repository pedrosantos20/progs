//REQUIRE
const express = require('express');
const request = require('request');
const path = require('path');
const db = require("./db");
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require ('passport-local').Strategy;
const bcrypt = require('bcrypt');



const app = express();

// SETS
app
    .set('view engine', 'ejs')
    .set('views', path.join(__dirname, 'views'));

// USES
app
    .use(express.urlencoded({ extended: true }))
    .use(express.static(path.join(__dirname, 'public')))
    .use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }))
    .use(passport.initialize())
    .use(passport.session());


// ROTAS
app
    //Gets
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
      const pizzas = [
          { id: 1, titulo: 'Pizza de Calabresa', quantidade: req.query.pcalabresa || 0, preco: 20 },
          { id: 2, titulo: 'Pizza de Frango com Catupiry', quantidade: req.query.pfrango || 0, preco: 20 },
          { id: 3, titulo: 'Pizza de Quatro Queijos', quantidade: req.query.pqueijos || 0, preco: 19 },
          { id: 4, titulo: 'Pizza de Stogonoff de Carne', quantidade: req.query.pstrcarne || 0, preco: 25 },
          { id: 5, titulo: 'Pizza de Stogonoff de Frango', quantidade: req.query.pstrcfrango || 0, preco: 23 },
          { id: 6, titulo: 'Pizza de Camarão', quantidade: req.query.pcamarao || 0, preco: 30 },
          { id: 7, titulo: 'Pizza de Chocolate Preto', quantidade: req.query.pchocopreto || 0, preco: 22 },
          { id: 8, titulo: 'Pizza de Chocolate Branco', quantidade: req.query.pchocobranco || 0, preco: 22 },
          { id: 9, titulo: 'Pizza de Chocolate Preto com Morango', quantidade: req.query.pchocopretocmorango || 0, preco: 24 },
      ];
  
      const bebidas = [
          { id: 1, titulo: 'Coca-Cola', quantidade: req.query.cocacola || 0, preco: 7.50 },
          { id: 2, titulo: 'Guaraná', quantidade: req.query.guarana || 0, preco: 8.50 },
          { id: 6, titulo: 'Sprite', quantidade: req.query.sprite || 0, preco: 7.50 },
          { id: 7, titulo: 'Água', quantidade: req.query.agua || 0, preco: 5 },
          { id: 3, titulo: 'Polar', quantidade: req.query.polar || 0, preco: 10 },
          { id: 4, titulo: 'Heineken', quantidade: req.query.heineken || 0, preco: 12 },
          { id: 5, titulo: 'Budweiser', quantidade: req.query.budweiser || 0, preco: 12 },
      ];
  
      const totalCompra = calcularTotalCompra(pizzas, bebidas);

      res.render('confirmaPedido', { pizzas, bebidas, totalCompra });
  })
    //Posts
    .post('/cadastrar', async (req, res) => {
      const { nome, cpf, endereco, email, senha, confirmarSenha } = req.body;
    
      // Verifica se a senha e a confirmação são iguais
      if (senha !== confirmarSenha) {
        return res.redirect('/cadastro_erro');
      }
    
      try {
        // Gera o hash da senha
        const hashedSenha = await bcrypt.hash(senha, 10);
    
        // Salva o usuário no banco de dados com a senha hasheada
        await db.insertCliente({
          cpf, nome, endereco, senha: hashedSenha, email
        });
    
        res.redirect('/cadastro_sucesso');
      } catch (error) {
        console.error(error);
        res.redirect('/cadastro_erro');
      }
    })

    .post('/login', passport.authenticate('local', {
          successRedirect: '/success',
          failureRedirect: '/login',
          failureFlash: true,
        })
    )

    .post('/pedidoConfirmado', async (req, res) => {
      const pizzas = JSON.parse(req.body.pizzas);
      const bebidas = JSON.parse(req.body.bebidas);
      const totalCompra = parseFloat(req.body.totalCompra);
    
  
      try {
        // Salvar dados no banco de dados usando o módulo db.js
        await db.connect();
    
        // Salvar dados na tabela 'pedido'
        const [pedidoResult] = await db.insertPedido(req.user.CPF, totalCompra, 'PIX');
        const Cod_Pedido = pedidoResult.insertId;
    
        // Salvar dados na tabela 'bebida_pedido'
        for (const bebida of bebidas) {
          await db.insertBebidaPedido(Cod_Pedido, bebida.id, bebida.quantidade);
        }
    
        // Salvar dados na tabela 'pizza_pedido'
        for (const pizza of pizzas) {
          await db.insertPizzaPedido(Cod_Pedido, pizza.id, pizza.quantidade);
        }
    
        // Adicione aqui a lógica para renderizar a página 'pedidoConfirmado.ejs'
        res.render('pedidoConfirmado', { totalCompra });
      } catch (error) {
        console.error('Erro ao salvar pedido:', error);
        res.status(500).send('Erro ao processar o pedido.');
      }
    })
  



    .listen(3000, () => {
        console.log("Servidor ligado na porta 3000");
    })


    
    // AUTENTICAÇÃO
    passport.use(new LocalStrategy(
      async (cpf, password, done) => {
        const connection = await db.connect();
    
        try {
          const [user] = await connection.execute('SELECT * FROM users WHERE CPF = ?', [cpf]);
    
          if (!user || user.length === 0) {
            return done(null, false, { message: 'Usuário não encontrado.' });
          }
    
          const passwordMatch = await bcrypt.compare(password, user[0].senha);
    
          if (!passwordMatch) {
            return done(null, false, { message: 'Senha incorreta.' });
          }
    
          return done(null, user[0]);
        } catch (error) {
          return done(error);
        }
      }
    ));
    
    // Serialização e desserialização do usuário para armazenar no cookie da sessão
    passport.serializeUser((user, done) => done(null, user.cpf));
    passport.deserializeUser(async (cpf, done) => {
      const connection = await db.connect();
    
      try {
        const [user] = await connection.execute('SELECT * FROM users WHERE CPF = ?', [cpf]);
        done(null, user[0]);
      } catch (error) {
        done(error);
      }
    })