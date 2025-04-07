const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

// Middleware para receber JSON
app.use(express.json());

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint para salvar personagem (pode simular salvamento por enquanto)
app.post('/personagem', (req, res) => {
  console.log('Personagem recebido:', req.body);
  res.json({ mensagem: 'Personagem salvo com sucesso!' });
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
