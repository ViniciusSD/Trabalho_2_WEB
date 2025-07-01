require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mustacheExpress = require('mustache-express');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const Aluno = require('./models/Aluno'); // <== IMPORTANTE

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB conectado');

    // Verifica se já há alunos e insere alguns de exemplo se não houver
    const count = await Aluno.countDocuments();
    if (count === 0) {
      await Aluno.insertMany([
        { nome: 'Ana Oliveira', curso: 'Engenharia de Software', idade: 21 },
        { nome: 'Carlos Lima', curso: 'Análise de Sistemas', idade: 23 },
        { nome: 'Marina Souza', curso: 'Ciência da Computação', idade: 22 }
      ]);
      console.log('Alunos de exemplo inseridos.');
    }
  })
  .catch(err => console.error('Erro ao conectar MongoDB:', err));

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
  secret: 'chave-secreta',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use('/', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Servidor rodando em http://localhost:${PORT}'));