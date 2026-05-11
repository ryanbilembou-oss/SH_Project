var API_BASE = "http://172.16.90.10:8082";
const urlParams = new URLSearchParams(window.location.search);
const conseilId = urlParams.get("id");

(async () => {
  await loadConseil();
  document.getElementById("submitBtn").addEventListener("click", handleSubmit);
})();

async function loadConseil() {
  if (!conseilId) {
    showToast("ID manquant.", "error");
    return;
  }
  try {
    const res = await fetch(`${API_BASE}/admin/conseil/getone?id=${conseilId}`);
    if (!res.ok) throw new Error();
    const c = await res.json();
    document.getElementById("titre").value = c.titre || "";
    document.getElementById("categorie").value = c.categorie || "";
    document.getElementById("contenu").value = c.contenu || "";
  } catch {
    showToast("Impossible de charger le conseil.", "error");
  }
}

async function handleSubmit() {
  const titre = document.getElementById("titre").value.trim();
  const categorie = document.getElementById("categorie").value.trim() || null;
  const contenu = document.getElementById("contenu").value.trim();
  const submitBtn = document.getElementById("submitBtn");

  if (!titre) {
    showToast("Le titre est obligatoire.", "error");
    return;
  }
  if (!contenu) {
    showToast("Le contenu est obligatoire.", "error");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i>Enregistrement...`;

  try {
    const res = await fetch(`${API_BASE}/admin/conseil/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_conseil: Number(conseilId),
        titre,
        categorie,
        contenu,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.erreur || "Erreur serveur.");
    showToast("Conseil mis à jour !", "success");
    setTimeout(() => {
      window.location.href = "admin_conseil.php";
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
