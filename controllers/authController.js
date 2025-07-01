const Professor = require('../models/Professor');
const Aluno = require('../models/Aluno');
const bcrypt = require('bcrypt');

exports.paginaInicial = (req, res) => res.render('index');

exports.registro = async (req, res) => {
  const { username, password } = req.body;
  const existe = await Professor.findOne({ username });
  if (existe) return res.render('index', { error: 'Usuário já existe' });

  const novo = new Professor({ username, password });
  await novo.save();
  res.redirect('/login');
};

exports.loginPage = (req, res) => res.render('login');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const professor = await Professor.findOne({ username });
  if (professor && await bcrypt.compare(password, professor.password)) {
    req.session.profId = professor._id;
    res.redirect('/dashboard');
  } else {
    res.render('login', { error: 'Credenciais inválidas' });
  }
};

exports.dashboard = async (req, res) => {
  if (!req.session.profId) return res.redirect('/login');
  const alunos = await Aluno.find();
  res.render('dashboard', { alunos });
};