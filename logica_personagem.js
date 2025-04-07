document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-personagem");
  const pontosRestantesSpan = document.getElementById("pontosRestantes");

  const atributos = {
    forca: document.getElementById("forca"),
    inteligencia: document.getElementById("inteligencia"),
    destreza: document.getElementById("destreza"),
  };

  const totalPontos = 10;

  function atualizarPontosRestantes() {
    const usados = Object.values(atributos).reduce(
      (acc, input) => acc + parseInt(input.value),
      0
    );
    const restantes = totalPontos - usados;
    pontosRestantesSpan.textContent = restantes;

    Object.values(atributos).forEach((input) => {
      input.max = parseInt(input.value) + restantes;
    });

    return restantes;
  }

  Object.values(atributos).forEach((input) =>
    input.addEventListener("input", atualizarPontosRestantes)
  );

  atualizarPontosRestantes();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (atualizarPontosRestantes() !== 0) {
      alert("Você precisa distribuir todos os 10 pontos de atributos.");
      return;
    }

    const nome = document.getElementById("nome").value.trim();
    const raca = document.getElementById("raca").value;
    const classe = document.getElementById("classe").value;

    const historia = gerarHistoria(nome, raca, classe, atributos);
    alert(historia);

    // Espaço reservado para salvar no backend/future database:
    // salvarPersonagem({ nome, raca, classe, atributos, historia });

    form.reset();
    atualizarPontosRestantes();
  });

  function gerarHistoria(nome, raca, classe, atributos) {
    let cidadeNatal = gerarCidadeNatal(raca);
    let clDescricao = descricaoClasse(classe);
    let racDescricao = descricaoRaca(raca);
    let personalidade = gerarTraçoPersonalidade(atributos);

    return `🧙 Olá, ${nome}!

Você é um(a) ${classe} da raça ${raca}, natural da cidade de ${cidadeNatal}. ${clDescricao} ${racDescricao}

Desde cedo, demonstrou traços de ${personalidade}, algo que moldaria sua jornada. Agora, começa sua aventura pelas terras de Eldoran, um continente repleto de perigos, mistérios e glória.

Que sua jornada seja digna de um herói.`;
  }

  function gerarCidadeNatal(raca) {
    const cidades = {
      Humano: ["Varelia", "Durnham", "Caminhador"],
      Elfo: ["Luzérea", "Sylvana", "Nymm'Quel"],
      Anão: ["Thordrim", "Karzun", "Forja-Funda"]
    };
    let lista = cidades[raca];
    return lista[Math.floor(Math.random() * lista.length)];
  }

  function descricaoClasse(classe) {
    const textos = {
      Guerreiro: "Treinado nas artes da guerra, sua força bruta é admirada (e temida) nos campos de batalha.",
      Mago: "Estudioso dos antigos grimórios, domina o mana com maestria e conjura magias esquecidas pelo tempo.",
      Ladino: "Ágil, silencioso e astuto, suas lâminas dançam nas sombras enquanto seus olhos vigiam o caos."
    };
    return textos[classe];
  }

  function descricaoRaca(raca) {
    const textos = {
      Humano: "Adaptável e resiliente, sua espécie floresce nas mais diversas regiões.",
      Elfo: "Ligado à natureza e às estrelas, possui uma sabedoria e longevidade impressionantes.",
      Anão: "Mestre das forjas e das pedras, seu povo constrói impérios sob as montanhas."
    };
    return textos[raca];
  }

  function gerarTraçoPersonalidade(atributos) {
    const f = parseInt(atributos.forca.value);
    const i = parseInt(atributos.inteligencia.value);
    const d = parseInt(atributos.destreza.value);

    if (f > i && f > d) return "força e bravura";
    if (i > f && i > d) return "inteligência e curiosidade";
    if (d > f && d > i) return "agilidade e esperteza";

    return "equilíbrio entre corpo e mente";
  }
});
