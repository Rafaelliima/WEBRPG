document.getElementById("form-personagem").addEventListener("submit", function (event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const sexo = document.getElementById("sexo").value;
  const raca = document.getElementById("raca").value;
  const classe = document.getElementById("classe").value;
  const historiaEscolha = document.getElementById("historiaEscolha").value;

  const personagem = {
    nome,
    sexo,
    raca,
    classe,
    historiaEscolha
  };

  personagem.historia = gerarHistoria(personagem);

  // Salvar localmente
  localStorage.setItem("personagem", JSON.stringify(personagem));

  // Enviar para Google Sheets (coloque sua URL aqui)
  fetch("SUA_URL_DO_SCRIPT_AQUI", {
    method: "POST",
    body: JSON.stringify(personagem),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.text())
    .then(data => console.log("Enviado para Sheets:", data))
    .catch(err => console.error("Erro ao enviar:", err));

  // Mostrar história gerada
  const historiaArea = document.getElementById("historia-gerada");
  historiaArea.textContent = personagem.historia;

  document.getElementById("resumo-personagem").style.display = "block";

  alert("Personagem criado com sucesso!");
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
