document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("feed-container");

  try {
    const res = await fetch("http://localhost:3000/api/servico/feed");
    const servicos = await res.json();

    if (!res.ok) {
      container.innerHTML = "<p>Erro ao carregar serviços.</p>";
      return;
    }

    if (servicos.length === 0) {
      container.innerHTML = "<p>Nenhum serviço disponível no momento.</p>";
      return;
    }

    servicos.forEach(servico => {
      const card = document.createElement("div");
      card.className = "servico-card";

      card.innerHTML = `
        <img src="${servico.foto || 'https://via.placeholder.com/300x200'}" alt="${servico.titulo}">
        <h3>${servico.titulo}</h3>
        <p><strong>Categoria:</strong> ${servico.categoria}</p>
        <p><strong>Empresa:</strong> ${servico.nome}</p>
        <button onclick="salvarServico(${servico.id})">Salvar</button>
      `;

      container.appendChild(card);
    });

  } catch (err) {
    container.innerHTML = `<p>Erro de conexão com o servidor: ${err.message}</p>`;
  }
});

// Salvar serviço
async function salvarServico(servicoId) {
  const tipo = localStorage.getItem("tipo");
  const user = JSON.parse(localStorage.getItem("usuario"));

  if (!user || tipo !== "usuario") {
    alert("Você precisa estar logado como usuário para salvar serviços.");
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/api/salvos/salvar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        usuario_id: user.id,
        servico_id: servicoId
      })
    });

    const data = await res.json();
    alert(data.mensagem || "Serviço salvo!");

  } catch (err) {
    alert("Erro ao salvar serviço.");
  }
}
