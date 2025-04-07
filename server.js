const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

// Middleware para permitir JSON
app.use(express.json());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Redirecionar '/' para 'index.html'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para receber dados do personagem
app.post('/personagem', (req, res) => {
  console.log('Personagem recebido:', req.body);
  res.json({ mensagem: 'Personagem salvo com sucesso!' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
