// controllers/chatController.js
const db = require('../models/db');

// Criar chat
exports.criarChat = async (req, res) => {
  const { usuario_id, empresa_id } = req.body;

  try {
    // Verifica se o chat já existe
    const [existe] = await db.query(
      "SELECT id FROM chat WHERE usuario_id = ? AND empresa_id = ?",
      [usuario_id, empresa_id]
    );
    if (existe.length > 0) {
      return res.status(200).json({ mensagem: 'Chat já existe.', chat_id: existe[0].id });
    }

    const [resultado] = await db.query(
      "INSERT INTO chat (status, usuario_id, empresa_id) VALUES (?, ?, ?)",
      [1, usuario_id, empresa_id]
    );

    res.status(201).json({ mensagem: 'Chat criado!', chat_id: resultado.insertId });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};


// Listar mensagens de um chat
// Listar chats de um usuário com última mensagem e nome da empresa como contatoNome
exports.listarChats = async (req, res) => {
  const usuarioId = req.params.usuarioId;

  try {
    const [result] = await db.query(`
      SELECT 
        chat.id,
        chat.status,
        empresa.nome AS contatoNome,
        empresa.foto,
        (SELECT mensagem.conteudo 
         FROM mensagem 
         WHERE mensagem.chat_id = chat.id 
         ORDER BY mensagem.datahora DESC 
         LIMIT 1) AS ultimaMensagem
      FROM chat
      INNER JOIN empresa ON chat.empresa_id = empresa.id
      WHERE chat.usuario_id = ?
      ORDER BY chat.datahora DESC
    `, [usuarioId]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};


// Enviar mensagem
exports.enviarMensagem = async (req, res) => {
  const { chat_id, conteudo, remetente } = req.body;

  try {
    await db.query(
      "INSERT INTO mensagem (chat_id, conteudo, remetente) VALUES (?, ?, ?)",
      [chat_id, conteudo, remetente]
    );

    res.status(201).json({ mensagem: 'Mensagem enviada!' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
// Listar mensagens de um chat
exports.listarMensagens = async (req, res) => {
  const chatId = req.params.chatId;

  try {
    const [mensagens] = await db.query(
      `SELECT id, chat_id, conteudo, remetente, datahora 
       FROM mensagem 
       WHERE chat_id = ? 
       ORDER BY datahora ASC`,
      [chatId]
    );

    res.json(mensagens);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

