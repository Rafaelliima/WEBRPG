document.getElementById("form-personagem").addEventListener("submit", function (event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const sexo = document.getElementById("sexo").value;
  const raca = document.getElementById("raca").value;
  const classe = document.getElementById("classe").value;
  const historiaEscolha = document.getElementById("historiaEscolha").value;

  // Gerando a história final
  const personagem = {
    nome,
    sexo,
    raca,
    classe,
    historiaEscolha
  };

  // Gerar a história baseada nas escolhas do usuário
  personagem.historia = gerarHistoria(personagem);

  // Salvar localmente
  localStorage.setItem("personagem", JSON.stringify(personagem));

  // Enviar para o Google Sheets através do proxy
  const url = 'https://script.google.com/macros/s/AKfycbyNYSTPfDOPU-vyUXg4C0ao4VftjKoBFeVgDmt5AVeyDEu9tp6zFdbcdoPn_g9QEcKfdA/exec';
  const proxyUrl = 'https://corsproxy.io/?key=ec339eb9&url=' + encodeURIComponent(url);

  fetch(proxyUrl, {
    method: 'POST',
    body: JSON.stringify(personagem),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())  // Se a resposta for JSON
  .then(response => {
    console.log('Resposta:', response);
    alert('Personagem criado com sucesso!');
  })
  .catch(error => {
    console.error('Erro ao enviar:', error);
    alert('Ocorreu um erro ao criar o personagem.');
  });
});

// Função que gera a história final com base nas escolhas
function gerarHistoria({ nome, sexo, raca, classe, historiaEscolha }) {
  const titulosClasse = {
    Guerreiro: "o Bravo",
    Mago: "o Sábio",
    Ladino: "o Sombrio"
  };

  const origens = {
    orfao: `cresceu sem família nas ruas frias de Arveth, desenvolvendo astúcia e sobrevivência.`,
    nobre: `descende de uma família aristocrata de Velkaria, mas buscou fugir do luxo para trilhar seu próprio destino.`,
    campones: `viveu uma vida simples nas plantações do Vale de Meredin até o destino bater à porta.`,
    exilado: `foi expulso de sua terra natal após um acontecimento misterioso, carregando um passado sombrio.`
  };

  const historiaBase = `
  ${nome}, ${sexo === 'masculino' ? 'nascido' : 'nascida'} da raça ${raca}, é conhecido como ${titulosClasse[classe]}.
  ${nome} ${origens[historiaEscolha] || 'teve uma origem desconhecida.'}
  Hoje, como um(a) ${classe.toLowerCase()}, caminha pelas terras de Eldoria em busca de glória, respostas ou redenção.`;

  return historiaBase.trim();
}
