document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("servico-detalhes");

  // Pega o id do serviço da URL: servico.html?id=1
  const urlParams = new URLSearchParams(window.location.search);
  const servicoId = urlParams.get("id");

  if (!servicoId) {
    container.innerHTML = "<p>ID do serviço não informado na URL.</p>";
    return;
  }

  try {
    const res = await fetch(`http://localhost:3000/api/servico/${servicoId}`);

    if (!res.ok) {
      container.innerHTML = `<p>Erro ao carregar o serviço: ${res.statusText}</p>`;
      return;
    }

    const servico = await res.json();

    container.innerHTML = `
      <img src="${servico.foto || 'https://via.placeholder.com/800x400'}" alt="${servico.titulo}">
      <h2>${servico.titulo}</h2>
      <p><strong>Categoria:</strong> ${servico.categoria}</p>
      <p>${servico.descricao}</p>
      <p>${servico.descricaolonga}</p>
      <div class="preco">R$ ${Number(servico.preco).toFixed(2)}</div>
      <div class="empresa">
        <img src="${servico.foto_empresa || 'https://via.placeholder.com/50'}" alt="${servico.nome}">
        <div>
          <strong>${servico.nome}</strong><br>
          <span>${servico.descricao_empresa || ''}</span>
        </div>
      </div>
    `;
  } catch (err) {
    container.innerHTML = `<p>Erro de conexão: ${err.message}</p>`;
  }
});
