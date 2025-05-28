const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rota de cadastro
router.post('/cadastro', usuarioController.cadastrarUsuario);

// Rota de login
router.post('/login', usuarioController.loginUsuario);

// Rota de perfil
router.get('/:id', usuarioController.getPerfil);

module.exports = router;
