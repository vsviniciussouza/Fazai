// routes/chat.js
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Criar novo chat
router.post('/criar', chatController.criarChat);

// Listar chats de um usuário
router.get('/usuario/:usuarioId', chatController.listarChats);

// Exibir mensagens de um chat
router.get('/mensagens/:chatId', chatController.listarMensagens);

// Enviar nova mensagem
router.post('/mensagem', chatController.enviarMensagem);

module.exports = router;
