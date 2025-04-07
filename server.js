const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');

const PORT = 3000;

// Middleware para permitir receber JSON
app.use(express.json());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// URL do seu Web App do Google Script
const axios = require('axios');

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyNYSTPfDOPU-vyUXg4C0ao4VftjKoBFeVgDmt5AVeyDEu9tp6zFdbcdoPn_g9QEcKfdA/exec";

// Dentro da sua rota POST
app.post('/personagem', async (req, res) => {
  const personagem = req.body;
  console.log('Personagem recebido:', personagem);

  try {
    await axios.post(GOOGLE_SCRIPT_URL, personagem);
    res.json({ mensagem: 'Personagem salvo com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar para Google Sheets:', error);
    res.status(500).json({ mensagem: 'Erro ao salvar personagem na planilha' });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
