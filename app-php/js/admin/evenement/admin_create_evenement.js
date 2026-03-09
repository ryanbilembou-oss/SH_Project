document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("createFullEvenementForm");
  const successToast = document.getElementById("successToast");
  const btnSubmit = form.querySelector('button[type="submit"]');

  if (!form) {
    console.error("Formulaire non trouvé !");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    btnSubmit.disabled = true;
    const originalBtnText = btnSubmit.innerHTML;
    btnSubmit.innerHTML =
      '<i class="fas fa-spinner fa-spin mr-2"></i> En cours...';

    const dateVal = document.getElementById("date").value;
    const heureVal = document.getElementById("heure").value;

    const dateHeureSQL = `${dateVal} ${heureVal}:00`;

    const eventData = {
      id_categorie: 1,
      titre: document.getElementById("titre").value,
      description: "",
      date_heure: dateHeureSQL,
      lieu: document.getElementById("lieu").value,
      prix_ticket: parseFloat(document.getElementById("prix_ticket").value),
      nb_places_max: parseInt(
        document.getElementById("nb_places_max").value,
        10,
      ),
    };

    try {
      const response = await fetch(
        "http://localhost:8082/admin/evenement/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(eventData),
        },
      );

      const result = await response.json();

      if (response.ok && result.status === "success") {
        successToast.classList.remove("-translate-y-full", "opacity-0");
        successToast.classList.add("translate-y-0", "opacity-100");

        setTimeout(() => {
          window.location.href = "admin_evenement.php";
        }, 2000);
      } else {
        throw new Error(result.message || "Le serveur a refusé la création.");
      }
    } catch (error) {
      console.error("Détails de l'erreur :", error);

      let errorMsg = "Impossible de joindre l'API.";
      if (error.message.includes("Failed to fetch")) {
        errorMsg =
          "Connexion refusée. Vérifie que l'API Go tourne sur le port 8081 et que le CORS est activé.";
      } else {
        errorMsg = error.message;
      }

      alert(`❌ Erreur : ${errorMsg}`);

      btnSubmit.disabled = false;
      btnSubmit.innerHTML = originalBtnText;
    }
  });
});
