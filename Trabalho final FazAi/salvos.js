document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("salvos-lista");

  const user = JSON.parse(localStorage.getItem("usuario"));
  const usuarioId = user ? user.id : null;

  if (!usuarioId) {
    container.innerHTML = "<p>Você precisa estar logado para ver seus serviços salvos.</p>";
    return;
  }

  try {
    const res = await fetch(`http://localhost:3000/api/salvos/usuario/${usuarioId}`);
    if (!res.ok) throw new Error("Falha ao carregar serviços salvos.");

    const servicosSalvos = await res.json();

    if (servicosSalvos.length === 0) {
      container.innerHTML = "<p>Nenhum serviço salvo.</p>";
      return;
    }

    const html = `
      <h2>Meus Favoritos</h2>
      <div class="salvos-lista">
        ${servicosSalvos.map(servico => `
          <div class="salvo-card">
            <img src="${servico.foto || 'https://via.placeholder.com/300x150'}" alt="${servico.titulo}">
            <h4>${servico.titulo}</h4>
            <a href="servico.html?id=${servico.id}">Ver detalhes</a>
          </div>
        `).join('')}
      </div>
    `;

    container.innerHTML = html;

  } catch (err) {
    container.innerHTML = `<p>Erro: ${err.message}</p>`;
  }
});
