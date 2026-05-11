const API_BASE = "http://144.76.74.130:8082";

document
  .getElementById("createCategorieForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const nom = document.getElementById("nom_categorie").value.trim();
    if (!nom) return;

    const res = await fetch(
      `${API_BASE}/admin/evenement/categorie_evenement/create`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom_categorie: nom }),
      },
    );

    if (res.ok) {
      const toast = document.getElementById("successToast");
      toast.classList.remove("-translate-y-full", "opacity-0");
      toast.classList.add("translate-y-0", "opacity-100");
      setTimeout(() => {
        window.location.href = "admin_categorie_evenement.php";
      }, 2000);
    } else {
      alert("Erreur lors de la création.");
    }
  });
