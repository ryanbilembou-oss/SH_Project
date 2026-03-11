const API_BASE = "http://localhost:8082";

(async () => {
  document.getElementById("submitBtn").addEventListener("click", handleSubmit);
})();

async function handleSubmit() {
  const nom = document.getElementById("nom").value.trim();
  const id_categorie = 1;
  const prix = parseFloat(document.getElementById("prix").value);
  const stock = parseInt(document.getElementById("stock").value);
  const image_url = document.getElementById("image_url").value.trim() || null;
  const bio = document.getElementById("bio").value.trim() || null;
  const submitBtn = document.getElementById("submitBtn");

  if (!nom) {
    showToast("Le nom est obligatoire.", "error");
    return;
  }

  if (isNaN(prix) || prix < 0) {
    showToast("Le prix ne peut pas être négatif.", "error");
    return;
  }
  if (isNaN(stock) || stock < 0) {
    showToast("Le stock ne peut pas être négatif.", "error");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i>Création...`;

  try {
    const res = await fetch(`${API_BASE}/admin/article/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_categorie, nom, prix, stock, image_url, bio }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Erreur serveur.");

    showToast("Article créé avec succès !", "success");
    setTimeout(() => {
      window.location.href = "admin_article.php";
    }, 1500);
  } catch (err) {
    console.error("[create_article.js]", err);
    showToast(err.message || "Erreur lors de la création.", "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<i class="fas fa-plus mr-2"></i>Créer l'article`;
  }
}

function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  const msgSpan = document.getElementById("toastMessage");
  const icon = document.getElementById("toastIcon");
  if (!container || !msgSpan) return;

  const styles = {
    success: { cls: "fas fa-check-circle", color: "text-emerald-400" },
    error: { cls: "fas fa-times-circle", color: "text-red-400" },
    info: { cls: "fas fa-info-circle", color: "text-blue-400" },
  };
  const s = styles[type] || styles.info;
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

function esc(str) {
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
