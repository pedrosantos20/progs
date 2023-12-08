//REQUIRE
const express = require('express');
const request = require('request');
const path = require('path');
const db = require("./db");
const session = require('express-session');
const bcrypt = require('bcrypt');

const sessionMiddleware = session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
});

const app = express();

// SETS
app
    .set('view engine', 'ejs')
    .set('views', path.join(__dirname, 'views'));

// USES
app
    .use(express.urlencoded({ extended: true }))
    .use(express.static(path.join(__dirname, 'public')))
    .use(sessionMiddleware)
    .use(require('express-flash')())

  
    app.use(async (req, res, next) => {
      // Verifica se há uma sessão existente
      if (req.session.user) {
        try {
          // Recupera dados do usuário a partir da sessão
          console.log(req.session.user.CPF)
          const [user] = await db.execute('SELECT * FROM cliente WHERE CPF = ?', [req.session.user.CPF]);
          req.session.user = { cpf: user.CPF, nome: user.Nome, email: user.email, endereco: user.Endereco }
        } catch (error) {
          console.error('Erro ao obter dados do usuário:', error);
        }
      }
      next();
    })
  

// ROTAS
app
    //Gets
    .get('/', (req, res) => {
      if (req.session.user) {
          // Recupera dados do usuário a partir da sessão
          const [user] = db.execute('SELECT * FROM cliente WHERE CPF = ?', [req.session.user.CPF]);
          req.session.user = { cpf: user.CPF, nome: user.Nome, email: user.email, endereco: user.Endereco }
          res.render('index', { user: req.session.user });
      }else{
        res.render('index', { user: req.session.user });
      }  
    })
    .get('/index', (req, res) => {
      if (req.session.user) {
          // Recupera dados do usuário a partir da sessão
          const [user] = db.execute('SELECT * FROM cliente WHERE CPF = ?', [req.session.user.CPF]);
          req.session.user = { cpf: user.CPF, nome: user.Nome, email: user.email, endereco: user.Endereco }
          res.render('index', { user: req.session.user });
      }else{
        res.render('index', { user: req.session.user });
      } 
    })
    .get('/login', (req, res) => {
      if (req.session.user) {
        res.render('success');
      }
        res.render('login');
    })
    .get('/cadastro', (req, res) => {
        res.render('cadastro');
    })
    

    .get('/pedido', (req, res) => {
      if (!req.session.user) {
        return res.redirect('/login');
      }
      res.render('pedido', { user: req.session.user });
    })
    .get('/success', (req, res) => {
      if (!req.session.user) {
        return res.redirect('/login');
      }
      // Renderizar a página de perfil com os dados do usuário
      
      res.render('perfil', { user: req.session.user});
  })
    .get('/logout', (req, res) => {
      req.logout();
      res.redirect('/'); 
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
      function calcularTotalCompra(pizzas, bebidas) {
        const totalPizzas = pizzas.reduce((total, pizza) => total + pizza.quantidade * pizza.preco, 0);
        const totalBebidas = bebidas.reduce((total, bebida) => total + bebida.quantidade * bebida.preco, 0);
      
        return totalPizzas + totalBebidas;
      }
  
      const totalCompra = calcularTotalCompra(pizzas, bebidas);
      if (!req.session.user) {
        return res.redirect('/login');
      }
      const pizzasFilter = pizzas.filter(pizza => pizza.quantidade > 0)
      const bebidasFilter = bebidas.filter(bebida => bebida.quantidade > 0)

      res.render('confirmaPedido', { pizzasFilter, bebidasFilter, totalCompra, user: req.session.user  });
  })
      .get('/cadastro_sucesso', (req, res) => {
        res.render('cadastroSucesso', { user: req.session.user });
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
        res.redirect('/login');
      }
    })
    
    .post('/logar', async (req, res) => {
      try {
        const { cpf, senha } = req.body;
    
        // Busca o usuário no banco de dados usando o CPF
        const [user] = await db.execute('SELECT * FROM cliente WHERE CPF = ?', [cpf]);
        
        if (!user || user.length === 0) {
          // Usuário não encontrado
          console.log('Usuário não encontrado');
          return res.redirect('/login');
        }
    
        // Verifica a senha usando o bcrypt
        
        const passwordMatch = await bcrypt.compare(senha, user.senha);
    
        if (!passwordMatch) {
          // Senha incorreta
          console.log('Senha incorreta');
          return res.redirect('/login');
        }
    
        // Autenticação bem-sucedida
        req.session.user = { cpf: user.CPF, nome: user.Nome, email: user.email, endereco: user.Endereco }; 
        console.log('Login bem-sucedido');
        // Redirecionar para a página de sucesso ou fazer qualquer outra ação necessária
        res.redirect('/success?cpf='+cpf);
      } catch (error) {
        console.error('Erro durante a autenticação:', error);
        res.status(500).send('Erro durante a autenticação.');
      }
    })

      

    .post('/pedidoConfirmado', async (req, res) => {
      const pizzas = JSON.parse(req.body.pizzas);
      const bebidas = JSON.parse(req.body.bebidas);
      const totalCompra = parseFloat(req.body.totalCompra);
      const user = String(req.body.cpf);

      console.log(user);
  
      try {
        // Salvar dados no banco de dados usando o módulo db.js
        await db.connect();
    
        // Salvar dados na tabela 'pedido'
        const [pedidoResult] = await db.insertPedido(user, totalCompra, 'PIX');
        const Cod_Pedido = pedidoResult.insertId;
    
        // Salvar dados na tabela 'bebida_pedido'
        for (const bebida of bebidas) {
          await db.insertBebidaPedido(Cod_Pedido, bebida.id, bebida.quantidade);
        }
    
        // Salvar dados na tabela 'pizza_pedido'
        for (const pizza of pizzas) {
          await db.insertPizzaPedido(Cod_Pedido, pizza.id, pizza.quantidade);
        }
        res.render('pedidoConfirmado', { totalCompra, user: req.session.user });
      } catch (error) {
        console.error('Erro ao salvar pedido:', error);
        res.status(500).send('Erro ao processar o pedido.');
      }
    })
  



    .listen(3000, () => {
        console.log("Servidor ligado na porta 3000");
    })