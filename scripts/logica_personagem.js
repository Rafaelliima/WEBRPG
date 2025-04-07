
let pontosRestantes = 10;
const atributos = {
  forca: 0,
  inteligencia: 0,
  destreza: 0
};

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("atributo-btn")) {
    const atributo = e.target.getAttribute("data-atributo");
    if (pontosRestantes > 0) {
      atributos[atributo]++;
      pontosRestantes--;
      document.getElementById(atributo).textContent = atributos[atributo];
      document.getElementById("pontosRestantes").textContent = pontosRestantes;
    }
  }
});

document.getElementById("form-personagem").addEventListener("submit", function (e) {
  e.preventDefault();
  const nome = document.getElementById("nome").value;
  const classe = document.getElementById("classe").value;
  const raca = document.getElementById("raca").value;

  const historia = `Em um mundo sombrio, ${nome}, um(a) ${classe} ${raca}, embarca numa jornada com força ${atributos.forca}, inteligência ${atributos.inteligencia} e destreza ${atributos.destreza}.`;
  document.getElementById("historia-gerada").innerText = historia;

  localStorage.setItem("personagem", JSON.stringify({ nome, classe, raca, ...atributos }));

  // Envio para Sheets (exemplo, precisa configurar Apps Script)
  fetch("https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec", {
    method: "POST",
    body: JSON.stringify({ nome, classe, raca, ...atributos }),
    headers: { "Content-Type": "application/json" }
  });
});
