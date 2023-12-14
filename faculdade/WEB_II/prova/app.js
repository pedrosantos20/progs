const express = require('express')
const request = require('request')
const app = express()
const path = require('path')
const mongoose = require('mongoose');

//Conexão com BD
mongoose.connect('mongodb://127.0.0.1:27017/favoritos', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
    console.log("Conexão estabelecida com o banco!");
})
    .catch(err =>{
    console.log("Erro ao conectar com o banco!");
    console.log(err);
});

const favoritoSchema = new mongoose.Schema({
    nome: String,
    autor: String
});
const LivroFavorito = mongoose.model("livro",favoritoSchema);
//FIm da Conexão com BD
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('busca')
})

app
    .get('/busca', (req, res) => {
        let {busca, tipo} = req.query
        if (!tipo) tipo = ""
        let resposta = {}
        request("https://www.googleapis.com/books/v1/volumes?q=" + tipo + busca, (error, response, body) => {
            if(!error && response.statusCode == 200){
                resposta = JSON.parse(body)
            }
            res.render('resultadoBusca', {resposta})
        })
    })
    .post('/salvar', async (req, res) => {
        try {
          const nome = req.body.nome;
          const autor = req.body.autor;
          const newBook = new LivroFavorito({
            nome,
            autor
          });
          await newBook.save();
          res.json({ message: 'Livro salvo com sucesso' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Erro interno do servidor' });
        }
      })

app.listen(3000, () => console.log("Servidor ligado na porta 3000!"))