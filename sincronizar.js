function sincronizarPersonagem() {
    const status = document.getElementById("status-sincronizacao");
    const personagem = JSON.parse(localStorage.getItem("personagem"));
  
    if (!personagem) {
      status.textContent = "❌ Nenhum personagem encontrado no armazenamento local.";
      return;
    }
  
    fetch("https://script.google.com/macros/s/AKfycbwdtk4LW2jGahmx2PZpim-RIUfD6-DL_uD9Jl0Hja8L3kT5dSz_4F33P5Desc3cq32OGw/exec", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(personagem),
    })
    .then(() => {
      status.textContent = "✅ Personagem sincronizado com sucesso!";
    })
    .catch((error) => {
      console.error("Erro na sincronização:", error);
      status.textContent = "❌ Erro ao sincronizar.";
    });
  }
  