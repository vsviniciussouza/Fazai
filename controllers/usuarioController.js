const db = require('../models/db');

// Cadastro de usuário
exports.cadastrarUsuario = async (req, res) => {
  const { nome, email, tel, foto, senha } = req.body;

  try {
    const [existe] = await db.query("SELECT id FROM usuario WHERE email = ?", [email]);
    if (existe.length > 0) {
      return res.status(400).json({ mensagem: 'Email já cadastrado.' });
    }

    await db.query(
      "INSERT INTO usuario (nome, email, tel, foto, senha) VALUES (?, ?, ?, ?, ?)",
      [nome, email, tel, foto, senha]
    );
    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Login de usuário
exports.loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const [result] = await db.query("SELECT * FROM usuario WHERE email = ? AND senha = ?", [email, senha]);
    if (result.length === 0) {
      return res.status(401).json({ mensagem: 'Email ou senha incorretos.' });
    }

    res.json({ mensagem: 'Login bem-sucedido!', usuario: result[0] });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Perfil do usuário
exports.getPerfil = async (req, res) => {
  const id = req.params.id;

  try {
    const [result] = await db.query("SELECT nome, email, tel, foto FROM usuario WHERE id = ?", [id]);
    if (result.length === 0) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    }

    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
