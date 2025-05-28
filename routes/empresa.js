// routes/empresa.js
const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresaController');

// Rota de cadastro
router.post('/cadastro', empresaController.cadastrarEmpresa);

// Rota de login
router.post('/login', empresaController.loginEmpresa);

// Rota de perfil
router.get('/:id', empresaController.getPerfil);

module.exports = router;
