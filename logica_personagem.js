document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-personagem');
  const pontosRestantesSpan = document.getElementById('pontosRestantes');
  const atributos = {
    forca: document.getElementById('forca'),
    inteligencia: document.getElementById('inteligencia'),
    destreza: document.getElementById('destreza')
  };

  const atualizarPontos = () => {
    let total = 0;
    for (let key in atributos) {
      total += parseInt(atributos[key].value) || 0;
    }
    const restantes = 10 - total;
    pontosRestantesSpan.textContent = restantes;

    for (let key in atributos) {
      atributos[key].max = parseInt(atributos[key].value) + restantes;
    }
  };

  for (let key in atributos) {
    atributos[key].addEventListener('input', atualizarPontos);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let total = 0;
    for (let key in atributos) {
      total += parseInt(atributos[key].value) || 0;
    }

    if (total > 10) {
      alert("Você distribuiu mais de 10 pontos!");
      return;
    }

    const dados = {
      nome: document.getElementById('nome').value.trim(),
      raca: document.getElementById('raca').value,
      classe: document.getElementById('classe').value,
      atributos: {
        forca: atributos.forca.value,
        inteligencia: atributos.inteligencia.value,
        destreza: atributos.destreza.value
      }
    };

    fetch('https://script.google.com/macros/s/AKfycbwdtk4LW2jGahmx2PZpim-RIUfD6-DL_uD9Jl0Hja8L3kT5dSz_4F33P5Desc3cq32OGw/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    })
    .then(res => res.ok ? alert('✅ Personagem criado com sucesso!') : Promise.reject(res))
    .catch(err => {
      console.error('❌ Falha ao enviar:', err);
      alert('Erro ao criar personagem.');
    });
  });

  atualizarPontos();
});
