// routes/servico.js
const express = require('express');
const router = express.Router();
const servicoController = require('../controllers/servicoController');

// Criar serviço
router.post('/criar', servicoController.criarServico);

router.get('/feed', servicoController.listarServicos);

router.get('/:id', servicoController.detalhesServico);

router.get('/categoria/listar', servicoController.listarCategorias);


router.get('/empresa/:empresaId', servicoController.servicosPorEmpresa);

module.exports = router;
