const API_BASE = "http://localhost:8082";
const id = new URLSearchParams(window.location.search).get("id");

async function loadCategorie() {
  const res = await fetch(
    `${API_BASE}/admin/article/categorie_article/getone?id=${id}`,
  );
  const cat = await res.json();

  document.getElementById("id_categorie").value = cat.id_categorie;
  document.getElementById("nom_categorie").value = cat.nom_categorie;
  document.getElementById("formLoader").classList.add("hidden");
  document.getElementById("editCategorieForm").classList.remove("hidden");
}

document.getElementById("submitBtn").addEventListener("click", async () => {
  const nom = document.getElementById("nom_categorie").value.trim();
  if (!nom) return;

  const res = await fetch(
    `${API_BASE}/admin/article/categorie_article/update`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_categorie: parseInt(id),
        nom_categorie: nom,
      }),
    },
  );

  if (res.ok) {
    showToast("Catégorie mise à jour !", "success");
    setTimeout(() => {
      window.location.href = "admin_categorie_article.php";
    }, 1500);
  } else {
    showToast("Erreur lors de la mise à jour.", "error");
  }
});

function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  const msgSpan = document.getElementById("toastMessage");
  const icon = document.getElementById("toastIcon");
  const styles = {
    success: { cls: "fas fa-check-circle", color: "text-emerald-400" },
    error: { cls: "fas fa-times-circle", color: "text-red-400" },
  };
  const s = styles[type];
  msgSpan.textContent = message;
  if (icon) icon.className = `${s.cls} ${s.color} text-xl`;
  container.classList.remove("-translate-y-20", "opacity-0");
  container.classList.add("translate-y-0", "opacity-100");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => {
    container.classList.remove("translate-y-0", "opacity-100");
    container.classList.add("-translate-y-20", "opacity-0");
  }, 3000);
}

loadCategorie();
