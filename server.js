
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());


const usuarioRoutes = require('./routes/usuario');
const empresaRoutes = require('./routes/empresa');
const servicoRoutes = require('./routes/servico');
const salvosRoutes = require('./routes/salvos');
const chatRoutes = require('./routes/chat');
//const mensagemRoutes = require('./routes/mensagem');//

app.use('/api/usuario', usuarioRoutes);
app.use('/api/empresa', empresaRoutes);
app.use('/api/servico', servicoRoutes);
app.use('/api/salvos', salvosRoutes);
app.use('/api/chat', chatRoutes);
//app.use('/api/mensagem', mensagemRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
const db = require('./models/db');

db.query('SELECT 1')
  .then(() => console.log('✅ Conexão com MySQL OK'))
  .catch((err) => console.error('❌ Erro na conexão com MySQL:', err.message));
