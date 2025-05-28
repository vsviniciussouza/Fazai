// controllers/empresaController.js
const db = require('../models/db');

// Cadastro de empresa
exports.cadastrarEmpresa = async (req, res) => {
  const { email, senha, nome, descricao, foto, descricao_longa } = req.body;

  try {
    const [existe] = await db.query("SELECT id FROM empresa WHERE email = ?", [email]);
    if (existe.length > 0) {
      return res.status(400).json({ mensagem: 'Email já cadastrado.' });
    }

    await db.query(
      "INSERT INTO empresa (email, senha, nome, descricao, foto, descricao_longa) VALUES (?, ?, ?, ?, ?, ?)",
      [email, senha, nome, descricao, foto, descricao_longa]
    );
    res.status(201).json({ mensagem: 'Empresa cadastrada com sucesso!' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Login de empresa
exports.loginEmpresa = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const [result] = await db.query("SELECT * FROM empresa WHERE email = ? AND senha = ?", [email, senha]);
    if (result.length === 0) {
      return res.status(401).json({ mensagem: 'Email ou senha incorretos.' });
    }

    res.json({ mensagem: 'Login bem-sucedido!', empresa: result[0] });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Perfil da empresa
exports.getPerfil = async (req, res) => {
  const id = req.params.id;

  try {
    const [result] = await db.query(
      "SELECT nome, foto, descricao, descricao_longa FROM empresa WHERE id = ?",
      [id]
    );

    if (result.length === 0) {
      return res.status(404).json({ mensagem: 'Empresa não encontrada.' });
    }

    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
