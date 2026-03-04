document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;

      console.log("Données récupérées :", email);

      const params = new URLSearchParams();
      params.append("email", email);
      params.append("password", password);

      try {
        const response = await fetch("http://localhost:8081/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: params.toString(),
        });

        const resultText = await response.text();

        if (response.ok) {
          alert(resultText);
          window.location.href = "index.php";
        } else {
          alert("Erreur : " + resultText);
        }
      } catch (err) {
        console.error("Erreur de connexion :", err);
        alert("L'API Go ne répond pas sur le port 8081.");
      }
    });
  }
});
