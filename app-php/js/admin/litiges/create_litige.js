var API_BASE = "http://144.76.74.130:8082";

(async () => {
  await loadInterventions();
  document.getElementById("submitBtn").addEventListener("click", handleSubmit);
})();

async function loadInterventions() {
  try {
    const res = await fetch(`${API_BASE}/admin/intervention/get`);
    if (!res.ok) throw new Error();
    const interventions = await res.json();
    const select = document.getElementById("id_intervention");
    if (!interventions.length) {
      select.innerHTML = `<option value="">Aucune intervention disponible</option>`;
      return;
    }
    select.innerHTML =
      `<option value="">-- Choisir une intervention --</option>` +
      interventions
        .map(
          (i) =>
            `<option value="${i.id}">#${i.id} - ${esc(i.lieu)} (${esc(i.statut)})</option>`,
        )
        .join("");
  } catch {
    document.getElementById("id_intervention").innerHTML =
      `<option value="">Erreur chargement</option>`;
  }
}

async function handleSubmit() {
  const id_intervention = Number(
    document.getElementById("id_intervention").value,
  );
  const motif = document.getElementById("motif").value.trim();
  const statut = document.getElementById("statut").value;
  const submitBtn = document.getElementById("submitBtn");

  if (!id_intervention) {
    showToast("Veuillez choisir une intervention.", "error");
    return;
  }
  if (!motif) {
    showToast("Le motif est obligatoire.", "error");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i>Création...`;

  try {
    const res = await fetch(`${API_BASE}/admin/litiges/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_intervention, motif, statut }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.erreur || "Erreur serveur.");
    showToast("Litige créé avec succès !", "success");
    setTimeout(() => {
      window.location.href = "admin_litiges.php";
    }, 1500);
  } catch (err) {
    showToast(err.message || "Erreur lors de la création.", "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<i class="fas fa-plus mr-2"></i>Créer le litige`;
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
