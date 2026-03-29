var API_BASE = "http://localhost:8082";
const urlParams = new URLSearchParams(window.location.search);
const litigeId = urlParams.get("id");

(async () => {
  await loadLitige();
  document.getElementById("submitBtn").addEventListener("click", handleSubmit);
})();

async function loadLitige() {
  if (!litigeId) {
    showToast("ID manquant.", "error");
    return;
  }
  try {
    const res = await fetch(`${API_BASE}/admin/litiges/getone?id=${litigeId}`);
    if (!res.ok) throw new Error();
    const l = await res.json();
    document.getElementById("motif").value = l.motif || "";
    document.getElementById("statut").value = l.statut || "ouvert";
  } catch {
    showToast("Impossible de charger le litige.", "error");
  }
}

async function handleSubmit() {
  const motif = document.getElementById("motif").value.trim();
  const statut = document.getElementById("statut").value;
  const submitBtn = document.getElementById("submitBtn");

  if (!motif) {
    showToast("Le motif est obligatoire.", "error");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i>Enregistrement...`;

  try {
    const res = await fetch(`${API_BASE}/admin/litiges/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_litige: Number(litigeId), motif, statut }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.erreur || "Erreur serveur.");
    showToast("Litige mis à jour !", "success");
    setTimeout(() => {
      window.location.href = "admin_litiges.php";
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
