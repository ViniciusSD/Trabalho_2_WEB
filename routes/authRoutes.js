const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');

router.get('/', controller.paginaInicial);
router.post('/register', controller.registro);
router.get('/login', controller.loginPage);
router.post('/login', controller.login);
router.get('/dashboard', controller.dashboard);

module.exports = router;

//testar