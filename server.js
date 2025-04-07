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
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyNYSTPfDOPU-vyUXg4C0ao4VftjKoBFeVgDmt5AVeyDEu9tp6zFdbcdoPn_g9QEcKfdA/exec';

// Rota que recebe os dados do personagem
app.post('/personagem', async (req, res) => {
  const personagem = req.body;
  console.log('Personagem recebido:', personagem);

  try {
    // Envia os dados para o Google Sheets via seu script
    await axios.post(GOOGLE_SCRIPT_URL, personagem);
    res.json({ mensagem: 'Personagem salvo com sucesso no Google Sheets!' });
  } catch (error) {
    console.error('Erro ao enviar para o Google Sheets:', error.message);
    res.status(500).json({ mensagem: 'Erro ao salvar personagem.' });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
