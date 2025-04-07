document.getElementById('form-personagem').addEventListener('submit', async function (e) {
  e.preventDefault();

  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyNYSTPfDOPU-vyUXg4C0ao4VftjKoBFeVgDmt5AVeyDEu9tp6zFdbcdoPn_g9QEcKfdA/exec"; // sua URL

  // Captura os dados do formulário
  const nome = document.getElementById('nome').value;
  const sexo = document.getElementById('sexo').value;
  const raca = document.getElementById('raca').value;
  const classe = document.getElementById('classe').value;
  const historia = document.getElementById('historia').value;
  // const origem = document.getElementById('origem').value; // só se quiser adicionar

  const personagem = {
    nome,
    sexo,
    raca,
    classe,
    historia,
    key: "rpg123"  // chave de segurança
  };

  // Envia para a planilha do Google
  try {
    const resposta = await axios.post(GOOGLE_SCRIPT_URL, personagem);
    console.log("Resposta da planilha:", resposta.data);
  } catch (erro) {
    console.error("Erro ao enviar para planilha:", erro);
  }

  // Exibe o resumo no frontend
  const resumo = `
Nome: ${personagem.nome}
Sexo: ${personagem.sexo}
Raça: ${personagem.raca}
Classe: ${personagem.classe}
História: ${personagem.historia}
  `;

  document.getElementById('historia-gerada').textContent = resumo;
  document.getElementById('resumo-personagem').style.display = 'block';

  // Envia para o backend local
  fetch('/personagem', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(personagem)
  })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error('Erro ao enviar para o servidor:', err));
});
