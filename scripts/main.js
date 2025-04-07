
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("a[data-page]");
  const conteudo = document.getElementById("conteudo");

  links.forEach(link => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();
      const page = link.getAttribute("data-page");
      const res = await fetch(`${page}.html`);
      const html = await res.text();
      conteudo.innerHTML = html;
    });
  });

  // Carrega início por padrão
  document.querySelector("a[data-page='home']").click();
});
