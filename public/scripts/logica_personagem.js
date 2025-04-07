document.getElementById('form-personagem').addEventListener('submit', function (e) {
  e.preventDefault();

  const personagem = {
    nome: document.getElementById('nome').value,
    sexo: document.getElementById('sexo').value,
    raca: document.getElementById('raca').value,
    classe: document.getElementById('classe').value,
    origem: document.getElementById('historiaEscolha').value
  };

  // Exibe no frontend
  const resumo = `
Nome: ${personagem.nome}
Sexo: ${personagem.sexo}
Raça: ${personagem.raca}
Classe: ${personagem.classe}
Origem: ${personagem.origem}
  `;

  document.getElementById('historia-gerada').textContent = resumo;
  document.getElementById('resumo-personagem').style.display = 'block';

  // Envia para o servidor
  fetch('/personagem', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(personagem)
  })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error('Erro ao enviar:', err));
});
