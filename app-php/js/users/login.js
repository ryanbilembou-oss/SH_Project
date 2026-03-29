document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;

      const loginData = {
        email: email,
        password: password,
      };

      try {
        // 1. Appel à l'API Go (Port 8082) pour la vérification BDD
        const response = await fetch("http://localhost:8082/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });

        if (response.ok) {
          const result = await response.json();
          console.log("✅ Go : OK. Création de la session PHP...");

          // 2. ÉTAPE CRUCIALE : Création de la session côté PHP (Port 8080)
          // Utilisation d'un chemin absolu (/users/...) pour éviter les erreurs de dossier
          const sessionResponse = await fetch("/users/set_session.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: "email=" + encodeURIComponent(email),
          });

          const sessionStatus = await sessionResponse.text();
          console.log("🔹 PHP Session Status :", sessionStatus);

          // 3. Redirection vers l'accueil
          alert(`✅ Ravi de vous revoir, ${result.prenom} !`);
          window.location.href = "../index.php";
        } else {
          alert("❌ Identifiants incorrects.");
        }
      } catch (err) {
        console.error("Erreur réseau :", err);
        alert("❌ Impossible de contacter l'API Go.");
      }
    });
  }
});
