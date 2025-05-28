// web-frontend/empresa.js

document.addEventListener("DOMContentLoaded", () => {
  // Simulando os dados da empresa com id = 1
  const empresaId = 1;

  const mockEmpresa = {
    id: 1,
    nome: "Empresa 1",
    foto: "https://via.placeholder.com/80",
    descricao: "Soluções em limpeza e manutenção.",
    descricao_longa: "Especializados em serviços residenciais e comerciais.",
    servicos: [
      {
        id: 1,
        titulo: "Limpeza de ar-condicionado",
        foto: "https://via.placeholder.com/300x150"
      },
      {
        id: 2,
        titulo: "Manutenção elétrica",
        foto: "https://via.placeholder.com/300x150"
      }
    ]
  };

  const container = document.getElementById("empresa-perfil");

  const html = `
    <div class="empresa-info">
      <img src="${mockEmpresa.foto}" alt="${mockEmpresa.nome}">
      <div>
        <h2>${mockEmpresa.nome}</h2>
        <p>${mockEmpresa.descricao}</p>
      </div>
    </div>
    <div class="empresa-desc">
      <p>${mockEmpresa.descricao_longa}</p>
    </div>

    <h3>Serviços oferecidos:</h3>
    <div class="servicos-lista">
      ${mockEmpresa.servicos.map(servico => `
        <div class="servico-card">
          <img src="${servico.foto}" alt="${servico.titulo}">
          <h4>${servico.titulo}</h4>
          <a href="servico.html?id=${servico.id}">Ver detalhes</a>
        </div>
      `).join("")}
    </div>
  `;

  container.innerHTML = html;
});
