// controllers/servicoController.js
const db = require('../models/db');

// Criar novo serviço
exports.criarServico = async (req, res) => {
  const { foto, categoria, titulo, descricao, descricaolonga, preco, empresa_id } = req.body;

  try {
    await db.query(
      "INSERT INTO servico (foto, categoria, titulo, descricao, descricaolonga, preco, empresa_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [foto, categoria, titulo, descricao, descricaolonga, preco, empresa_id]
    );
    res.status(201).json({ mensagem: 'Serviço criado com sucesso!' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Listar todos os serviços (feed)
exports.listarServicos = async (req, res) => {
  try {
    const [result] = await db.query(`
      SELECT servico.id, servico.foto, categoria, titulo, servico.datahora, empresa.foto AS foto_empresa, empresa.nome 
      FROM servico
      INNER JOIN empresa ON servico.empresa_id = empresa.id
      ORDER BY servico.datahora DESC
    `);
    res.json(result);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Detalhes de um serviço
exports.detalhesServico = async (req, res) => {
  const id = req.params.id;

  try {
    const [result] = await db.query(`
      SELECT servico.foto, categoria, titulo, servico.descricao, servico.descricaolonga, servico.datahora,
             empresa.foto AS foto_empresa, empresa.nome, empresa.descricao
      FROM servico
      INNER JOIN empresa ON servico.empresa_id = empresa.id
      WHERE servico.id = ?
    `, [id]);

    if (result.length === 0) {
      return res.status(404).json({ mensagem: 'Serviço não encontrado.' });
    }

    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Listar categorias únicas
exports.listarCategorias = async (req, res) => {
  try {
    const [result] = await db.query("SELECT DISTINCT categoria FROM servico");
    res.json(result);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Listar serviços de uma empresa
exports.servicosPorEmpresa = async (req, res) => {
  const empresaId = req.params.empresaId;

  try {
    const [result] = await db.query(`
      SELECT servico.id, servico.titulo, servico.foto, servico.datahora
      FROM servico
      WHERE empresa_id = ?
      ORDER BY servico.datahora DESC
    `, [empresaId]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
