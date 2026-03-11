document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;

      console.log("Tentative de connexion pour :", email);

      const loginData = {
        email: email,
        password_hash: password,
      };

      try {
        const response = await fetch("http://localhost:8081/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });

        if (response.ok) {
          const result = await response.json();
          alert("Connexion réussie !");
          window.location.href = "index.php";
        } else {
          const errorText = await response.text();
          alert("Erreur de connexion : " + errorText);
        }
      } catch (err) {
        console.error("Erreur réseau :", err);
        alert(
          "Impossible de contacter l'API Go. Vérifie que le conteneur Docker tourne sur le port 8081."
        );
      }
    });
  }
});
