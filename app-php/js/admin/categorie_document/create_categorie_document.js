var API_BASE = "http://172.16.90.10:8082";

(async () => {
  await loadTypes();
  document.getElementById("submitBtn").addEventListener("click", handleSubmit);
})();

async function loadTypes() {
  try {
    const res = await fetch(`${API_BASE}/admin/type_prestataire/get`);
    const types = await res.json();
    document.getElementById("id_type").innerHTML =
      `<option value="">-- Choisir un type --</option>` +
      types
        .map((t) => `<option value="${t.id_type}">${esc(t.nom_type)}</option>`)
        .join("");
  } catch {
    document.getElementById("id_type").innerHTML =
      `<option value="">Erreur</option>`;
  }
}

async function handleSubmit() {
  const id_type = Number(document.getElementById("id_type").value);
  const nom_categorie = document.getElementById("nom_categorie").value.trim();
  const submitBtn = document.getElementById("submitBtn");

  if (!id_type) {
    showToast("Veuillez choisir un type.", "error");
    return;
  }
  if (!nom_categorie) {
    showToast("Le nom est obligatoire.", "error");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i>Création...`;

  try {
    const res = await fetch(`${API_BASE}/admin/categorie_document/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_type, nom_categorie }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.erreur || "Erreur serveur.");
    showToast("Catégorie créée !", "success");
    setTimeout(() => {
      window.location.href = "admin_categorie_document.php";
    }, 1500);
  } catch (err) {
    showToast(err.message || "Erreur lors de la création.", "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<i class="fas fa-plus mr-2"></i>Créer`;
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
