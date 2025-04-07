const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Habilitar o envio de JSON
app.use(express.json());

// Rota para enviar os dados do personagem para o Google Sheets
app.post('/enviar-personagem', (req, res) => {
  const personagem = req.body;

  const url = 'https://script.google.com/macros/s/AKfycbyNYSTPfDOPU-vyUXg4C0ao4VftjKoBFeVgDmt5AVeyDEu9tp6zFdbcdoPn_g9QEcKfdA/exec';

  // Enviar para o Google Sheets via Google Apps Script
  axios.post(url, personagem)
    .then(response => {
      res.json({ message: 'Dados enviados com sucesso!', data: response.data });
    })
    .catch(error => {
      res.status(500).json({ message: 'Erro ao enviar dados', error: error.message });
    });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
