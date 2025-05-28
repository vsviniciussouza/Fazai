// routes/salvos.js
const express = require('express');
const router = express.Router();
const salvosController = require('../controllers/salvosController');

// Salvar serviço
router.post('/salvar', salvosController.salvarServico);

// Listar serviços salvos de um usuário
router.get('/usuario/:usuarioId', salvosController.listarSalvos);

module.exports = router;
