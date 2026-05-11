const API_BASE = "http://172.16.90.10:8082";

const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get("id");

const formLoader = document.getElementById("formLoader");
const editForm = document.getElementById("editForm");
const submitBtn = document.getElementById("submitBtn");

(async () => {
  if (!articleId) {
    showError("Aucun ID d'article fourni dans l'URL.");
    return;
  }
  await loadArticle(articleId);
  submitBtn.addEventListener("click", handleSubmit);
})();

async function loadArticle(id) {
  try {
    const res = await fetch(`${API_BASE}/admin/article/getone?id=${id}`);
    if (!res.ok) throw new Error(`Article introuvable (${res.status})`);

    const a = await res.json();

    document.getElementById("article_id").value = a.id;
    document.getElementById("nom").value = a.nom || "";
    document.getElementById("prix").value = a.prix ?? 0;
    document.getElementById("stock").value = a.stock ?? 0;
    document.getElementById("image_url").value = a.image_url || "";
    document.getElementById("bio").value = a.bio || "";

    const select = document.getElementById("id_categorie");
    if (select) select.value = a.id_categorie;

    formLoader.classList.add("hidden");
    editForm.classList.remove("hidden");
  } catch (err) {
    console.error("[loadArticle]", err);
    showError(err.message);
  }
}

async function handleSubmit() {
  const id = parseInt(document.getElementById("article_id").value);
  const nom = document.getElementById("nom").value.trim();
  const id_categorie = 1;
  const prix = parseFloat(document.getElementById("prix").value);
  const stock = parseInt(document.getElementById("stock").value);
  const image_url = document.getElementById("image_url").value.trim() || null;
  const bio = document.getElementById("bio").value.trim() || null;

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
  submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i>Enregistrement...`;

  try {
    const res = await fetch(`${API_BASE}/admin/article/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        id_categorie,
        nom,
        prix,
        stock,
        image_url,
        bio,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Erreur serveur.");

    showToast("Article mis à jour avec succès !", "success");
    setTimeout(() => {
      window.location.href = "admin_articles.php";
    }, 1500);
  } catch (err) {
    console.error("[edit_article.js]", err);
    showToast(err.message || "Erreur lors de la mise à jour.", "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<i class="fas fa-save mr-2"></i>Enregistrer les modifications`;
  }
}

function showError(message) {
  formLoader.innerHTML = `
    <div class="p-20 text-center">
      <i class="fas fa-exclamation-circle text-4xl mb-3 block text-red-400"></i>
      <p class="text-red-500 font-semibold text-sm">${message}</p>
      <a href="admin_articles.php" class="mt-4 inline-block text-xs text-blue-600 underline hover:text-blue-800">
        Retour au catalogue
      </a>
    </div>`;
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
