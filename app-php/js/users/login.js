document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const loginData = {
        email: email,
        password_hash: password,
      };

      try {
        const response = await fetch("http://localhost:8082/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginData),
        });

        if (response.ok) {
          alert("Connexion réussie !");
          window.location.href = "index.php";
        } else {
          const errorText = await response.text();
          alert("Erreur : " + errorText);
        }
      } catch (err) {
        alert("L'API Go ne répond pas (Port 8082).");
      }
    });
  }
});
