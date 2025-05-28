// controllers/salvosController.js
const db = require('../models/db');

// Salvar um serviço para um usuário
exports.salvarServico = async (req, res) => {
  const { usuario_id, servico_id } = req.body;

  try {
    // Verifica se já está salvo para evitar duplicatas
    const [existe] = await db.query(
      "SELECT * FROM salvos WHERE usuario_id = ? AND servico_id = ?",
      [usuario_id, servico_id]
    );
    if (existe.length > 0) {
      return res.status(400).json({ mensagem: 'Serviço já salvo.' });
    }

    await db.query(
      "INSERT INTO salvos (usuario_id, servico_id) VALUES (?, ?)",
      [usuario_id, servico_id]
    );

    res.status(201).json({ mensagem: 'Serviço salvo com sucesso!' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Listar serviços salvos de um usuário
exports.listarSalvos = async (req, res) => {
  const usuarioId = req.params.usuarioId;

  try {
    const [result] = await db.query(`
      SELECT servico.id, servico.titulo, servico.foto
      FROM servico
      INNER JOIN salvos ON servico.id = salvos.servico_id
      WHERE salvos.usuario_id = ?
      ORDER BY salvos.datahora DESC
    `, [usuarioId]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
