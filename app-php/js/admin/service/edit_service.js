var API_BASE = "http://144.76.74.130:8082";
const urlParams = new URLSearchParams(window.location.search);
const serviceId = urlParams.get("id");

(async () => {
  await loadCategories();
  await loadService();
  document.getElementById("submitBtn").addEventListener("click", handleSubmit);
})();

async function loadCategories() {
  try {
    const res = await fetch(`${API_BASE}/admin/service/categorie_service/get`);
    const categories = await res.json();
    const select = document.getElementById("id_categorie");
    select.innerHTML =
      `<option value="">-- Choisir une catégorie --</option>` +
      categories
        .map(
          (c) =>
            `<option value="${c.id_categorie}">${esc(c.nom_categorie)}</option>`,
        )
        .join("");
  } catch {
    document.getElementById("id_categorie").innerHTML =
      `<option value="">Erreur chargement</option>`;
  }
}

async function loadService() {
  if (!serviceId) {
    showToast("ID manquant.", "error");
    return;
  }
  try {
    const res = await fetch(`${API_BASE}/admin/service/getone?id=${serviceId}`);
    if (!res.ok) throw new Error();
    const s = await res.json();

    document.getElementById("nom").value = s.nom || "";
    document.getElementById("prix_reference").value = s.prix_reference || "";
    document.getElementById("image_url").value = s.image_url || "";
    document.getElementById("description").value = s.description || "";
    document.getElementById("id_categorie").value = s.id_categorie || "";
  } catch {
    showToast("Impossible de charger le service.", "error");
  }
}

async function handleSubmit() {
  const nom = document.getElementById("nom").value.trim();
  const id_categorie = Number(document.getElementById("id_categorie").value);
  const prix_reference = parseFloat(
    document.getElementById("prix_reference").value,
  );
  const image_url = document.getElementById("image_url").value.trim() || null;
  const description =
    document.getElementById("description").value.trim() || null;
  const submitBtn = document.getElementById("submitBtn");

  if (!nom) {
    showToast("Le nom est obligatoire.", "error");
    return;
  }
  if (!id_categorie) {
    showToast("Veuillez choisir une catégorie.", "error");
    return;
  }
  if (isNaN(prix_reference) || prix_reference < 0) {
    showToast("Le prix ne peut pas être négatif.", "error");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i>Enregistrement...`;

  try {
    const res = await fetch(`${API_BASE}/admin/service/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: Number(serviceId),
        id_categorie,
        nom,
        prix_reference,
        image_url,
        description,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.erreur || "Erreur serveur.");
    showToast("Service mis à jour !", "success");
    setTimeout(() => {
      window.location.href = "admin_service.php";
    }, 1500);
  } catch (err) {
    showToast(err.message || "Erreur lors de la mise à jour.", "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<i class="fas fa-save mr-2"></i>Enregistrer`;
  }
}

function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  const msgSpan = document.getElementById("toastMessage");
  const icon = document.getElementById("toastIcon");
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
