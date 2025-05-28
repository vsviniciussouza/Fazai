document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("usuario-dados");

  const userStr = localStorage.getItem("usuario");
  const tipo = localStorage.getItem("tipo");

  if (!userStr || tipo !== "usuario") {
    container.innerHTML = "<p>Você precisa estar logado como usuário para acessar esta página.</p>";
    return;
  }

  const usuario = JSON.parse(userStr);

  try {
    const res = await fetch(`http://localhost:3000/api/usuario/${usuario.id}`);

    if (!res.ok) {
      container.innerHTML = `<p>Erro ao carregar perfil: ${res.statusText}</p>`;
      return;
    }

    const dados = await res.json();

    container.innerHTML = `
      <img src="${dados.foto || 'https://via.placeholder.com/100'}" alt="${dados.nome}">
      <h2>${dados.nome}</h2>
      <p><strong>Email:</strong> ${dados.email}</p>
      <p><strong>Telefone:</strong> ${dados.tel || 'Não informado'}</p>
    `;

  } catch (err) {
    container.innerHTML = `<p>Erro de conexão: ${err.message}</p>`;
  }
});
