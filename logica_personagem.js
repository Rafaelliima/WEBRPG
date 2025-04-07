document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-personagem");
  const pontosRestantesSpan = document.getElementById("pontosRestantes");
  const atributos = {
    forca: 0,
    inteligencia: 0,
    destreza: 0
  };
  let pontosDisponiveis = 10;

  function atualizarDisplay() {
    document.getElementById("valor-forca").textContent = atributos.forca;
    document.getElementById("valor-inteligencia").textContent = atributos.inteligencia;
    document.getElementById("valor-destreza").textContent = atributos.destreza;
    pontosRestantesSpan.textContent = pontosDisponiveis;
    document.querySelectorAll(".btn-atributo").forEach(btn => {
      btn.disabled = pontosDisponiveis <= 0;
    });
  }

  // Botões de incremento
  document.getElementById("btn-forca").addEventListener("click", () => {
    if (pontosDisponiveis > 0) {
      atributos.forca++;
      pontosDisponiveis--;
      atualizarDisplay();
    }
  });

  document.getElementById("btn-inteligencia").addEventListener("click", () => {
    if (pontosDisponiveis > 0) {
      atributos.inteligencia++;
      pontosDisponiveis--;
      atualizarDisplay();
    }
  });

  document.getElementById("btn-destreza").addEventListener("click", () => {
    if (pontosDisponiveis > 0) {
      atributos.destreza++;
      pontosDisponiveis--;
      atualizarDisplay();
    }
  });

  // Bloqueia recarregamento acidental
  window.onbeforeunload = () => {
    return "Tem certeza que quer sair? Suas alterações podem ser perdidas.";
  };

  // Envio do formulário
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (pontosDisponiveis > 0) {
      alert("Você ainda tem pontos para distribuir!");
      return;
    }

    const nome = document.getElementById("nome").value.trim();
    const raca = document.getElementById("raca").value;
    const classe = document.getElementById("classe").value;

    const personagem = {
      nome,
      raca,
      classe,
      ...atributos
    };

    console.log("Personagem criado:", personagem);
    alert(`Personagem criado com sucesso! Bem-vindo, ${nome} o ${classe} ${raca}.`);
    // Aqui você pode redirecionar para a próxima página do jogo
  });

  atualizarDisplay();
});
