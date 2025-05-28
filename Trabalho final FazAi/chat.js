document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("lista-chats");
  const user = JSON.parse(localStorage.getItem("usuario"));
  const tipo = localStorage.getItem("tipo");

  if (!user || tipo !== "usuario") {
    container.innerHTML = "<p>Você precisa estar logado como usuário para ver suas conversas.</p>";
    return;
  }

  try {
    // Supondo que sua rota para pegar chats do usuário seja algo como:
    // GET /api/chat/usuario/:usuarioId
    const res = await fetch(`http://localhost:3000/api/chat/usuario/${user.id}`);
    if (!res.ok) {
      throw new Error("Erro ao carregar conversas.");
    }
    const chats = await res.json();

    if (chats.length === 0) {
      container.innerHTML = "<p>Você não tem conversas ainda.</p>";
      return;
    }

    container.innerHTML = `
      <h2>Minhas Conversas</h2>
      <ul class="lista-chats">
        ${chats.map(chat => `
          <li>
            <a href="chat-detalhe.html?id=${chat.id}">
              <strong>${chat.contatoNome}</strong><br>
              <small>${chat.ultimaMensagem || 'Sem mensagens ainda'}</small>
            </a>
          </li>
        `).join('')}
      </ul>
    `;

  } catch (error) {
    container.innerHTML = `<p>Erro: ${error.message}</p>`;
  }
});
