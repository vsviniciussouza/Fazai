document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const chatId = urlParams.get("id");
  const container = document.getElementById("mensagens");
  const input = document.getElementById("inputMensagem");
  const btnEnviar = document.getElementById("btnEnviar");

  const user = JSON.parse(localStorage.getItem("usuario"));
  const tipo = localStorage.getItem("tipo");

  if (!chatId) {
    container.innerHTML = "<p>Chat não especificado.</p>";
    return;
  }

  if (!user || tipo !== "usuario") {
    container.innerHTML = "<p>Você precisa estar logado como usuário para acessar este chat.</p>";
    return;
  }

  async function carregarMensagens() {
    try {
      const res = await fetch(`http://localhost:3000/api/chat/mensagens/${chatId}`);
      if (!res.ok) throw new Error("Erro ao carregar mensagens.");
      const mensagens = await res.json();

      container.innerHTML = mensagens.map(m => {
        // remetente pode ser 'usuario' ou 'empresa', você deve definir isso na API
        const classe = m.remetente === 'usuario' ? 'remetente' : 'destinatario';
        return `<div class="mensagem ${classe}">${m.conteudo}</div>`;
      }).join("");

      container.scrollTop = container.scrollHeight; // scroll para o final
    } catch (error) {
      container.innerHTML = `<p>Erro: ${error.message}</p>`;
    }
  }

  btnEnviar.addEventListener("click", async () => {
    const texto = input.value.trim();
    if (!texto) return;

    try {
      const res = await fetch(`http://localhost:3000/api/chat/mensagem`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          conteudo: texto,
          remetente: "usuario"
        })
      });
      if (!res.ok) throw new Error("Erro ao enviar mensagem.");

      input.value = "";
      await carregarMensagens();
    } catch (error) {
      alert("Erro ao enviar mensagem: " + error.message);
    }
  });

  // Carrega mensagens inicialmente
  carregarMensagens();

  // Atualiza mensagens a cada 5 segundos (para simular chat ao vivo)
  setInterval(carregarMensagens, 5000);
});
