document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const tipo = document.getElementById("tipo").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const msg = document.getElementById("login-msg");

  try {
    const res = await fetch(`http://localhost:3000/api/${tipo}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, senha })
    });

    const data = await res.json();

    if (!res.ok) {
      msg.style.color = "red";
      msg.textContent = data.mensagem || "Erro ao fazer login.";
      return;
    }

    // Salva os dados do usuário ou empresa no localStorage
    localStorage.setItem("tipo", tipo);
    localStorage.setItem("usuario", JSON.stringify(data[tipo]));

    msg.style.color = "green";
    msg.textContent = "Login realizado com sucesso!";

    setTimeout(() => {
      if (tipo === "usuario") {
        window.location.href = "usuario.html";
      } else {
        window.location.href = "empresa.html";
      }
    }, 1000);

  } catch (error) {
    msg.style.color = "red";
    msg.textContent = "Erro de conexão com o servidor.";
  }
});
