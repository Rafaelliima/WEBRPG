document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-personagem');
  const historiaContainer = document.createElement('div');
  historiaContainer.classList.add('historia-gerada');
  form.after(historiaContainer);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const sexo = document.getElementById('sexo').value;
    const raca = document.getElementById('raca').value;
    const classe = document.getElementById('classe').value;
    const historiaEscolha = document.getElementById('historia').value;

    if (!nome || !sexo || !raca || !classe || !historiaEscolha) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const historia = gerarHistoria({ nome, sexo, raca, classe, historiaEscolha });
    historiaContainer.innerText = historia;

    // Em breve: salvar local e enviar para planilha
  });

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
});
