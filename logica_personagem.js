document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-personagem");
    const resultado = document.getElementById("resultado");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const nome = document.getElementById("nome").value.trim();
      const raca = document.getElementById("raca").value;
      const historico = document.getElementById("historico").value.trim();
      const personalidade = document.getElementById("personalidade").value.trim();
      const objetivo = document.getElementById("objetivo").value.trim();
      const fraqueza = document.getElementById("fraqueza").value.trim();
  
      if (!nome || !historico || !personalidade || !objetivo || !fraqueza) {
        alert("⚠️ Preencha todos os campos.");
        return;
      }
  
      const personagem = {
        nome,
        raca,
        classe: "Aprendiz",
        experiencia: 0,
        ouro: 0,
        atributos: {},
        titulos: [],
        inventario: [],
        reputacao: "Neutro",
        influencia: "Nenhuma",
        alinhamento: "Neutro"
      };
  
      // Salva no localStorage
      localStorage.setItem("personagem", JSON.stringify(personagem));
  
      // Mostra no HTML
      resultado.innerHTML = `
        <h3>🎉 Personagem criado!</h3>
        <p><strong>👤 Nome:</strong> ${nome}</p>
        <p><strong>🧬 Raça:</strong> ${raca}</p>
        <p><strong>📜 Histórico:</strong> ${historico}</p>
        <p><strong>🧠 Personalidade:</strong> ${personalidade}</p>
        <p><strong>🎯 Objetivo:</strong> ${objetivo}</p>
        <p><strong>⚠️ Fraqueza:</strong> ${fraqueza}</p>
        <p><strong>🪄 Classe:</strong> Aprendiz</p>
        <p><strong>🏅 Nível:</strong> 1 | <strong>⭐ XP:</strong> 0 | <strong>💰 Ouro:</strong> 0</p>
      `;
  
      // Envia para Google Sheets
      fetch("https://script.google.com/macros/s/AKfycbwdtk4LW2jGahmx2PZpim-RIUfD6-DL_uD9Jl0Hja8L3kT5dSz_4F33P5Desc3cq32OGw/exec", {
        method: "POST",
        body: JSON.stringify(personagem),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => res.text())
      .then(resposta => {
        console.log("✅ Enviado ao Web App:", resposta);
      })
      .catch(erro => {
        console.error("❌ Falha ao enviar:", erro);
      });
    });
  });
  