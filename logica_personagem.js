let pontosRestantes = 10;
const atributos = {
  forca: 0,
  inteligencia: 0,
  destreza: 0
};

function adicionarPonto(atributo) {
  if (pontosRestantes > 0) {
    atributos[atributo]++;
    pontosRestantes--;
    document.getElementById(`${atributo}Valor`).textContent = atributos[atributo];
    document.getElementById("pontosRestantes").textContent = pontosRestantes;
  }
}

document.getElementById("form-personagem").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const raca = document.getElementById("raca").value;
  const classe = document.getElementById("classe").value;
  const origem = document.getElementById("origem").value;

  const historia = `
    ${nome}, um(a) ${classe} ${raca} vindo de uma origem como "${origem}".
    Sua jornada começou marcada pela ${origem.toLowerCase()}, forjando habilidades únicas em sua classe.
    Carregando ${atributos.forca} pontos de força, ${atributos.inteligencia} de inteligência e ${atributos.destreza} de destreza,
    o destino de ${nome} começa agora.
  `;

  const historiaDiv = document.getElementById("historia-final");
  historiaDiv.innerHTML = `<h3>História de ${nome}</h3><p>${historia}</p>`;
  historiaDiv.classList.remove("escondido");

  // Salvar personagem no localStorage
  const personagem = { nome, raca, classe, origem, atributos };
  localStorage.setItem("personagem", JSON.stringify(personagem));
});
