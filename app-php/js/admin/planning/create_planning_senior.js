var API_BASE = "http://localhost:8082";
const urlParams = new URLSearchParams(window.location.search);
const idSeniorFromUrl = urlParams.get("id_senior");

(async () => {
  await Promise.all([loadSeniors(), loadInterventions()]);
  document.getElementById("submitBtn").addEventListener("click", handleSubmit);
})();

async function loadSeniors() {
  try {
    const res = await fetch(`${API_BASE}/admin/profile_senior/get`);
    const seniors = await res.json();
    const select = document.getElementById("id_senior");
    select.innerHTML =
      `<option value="">-- Choisir un senior --</option>` +
      seniors
        .map(
          (s) =>
            `<option value="${s.id_user}" ${s.id_user === Number(idSeniorFromUrl) ? "selected" : ""}>${esc(s.nom)} ${esc(s.prenom)}</option>`,
        )
        .join("");
  } catch {
    document.getElementById("id_senior").innerHTML =
      `<option value="">Erreur</option>`;
  }
}

async function loadInterventions() {
  try {
    const res = await fetch(`${API_BASE}/admin/intervention/get`);
    const interventions = await res.json();
    document.getElementById("id_intervention").innerHTML =
      `<option value="">-- Aucune --</option>` +
      interventions
        .map(
          (i) =>
            `<option value="${i.id}">#${i.id} - ${esc(i.lieu)} (${esc(i.statut)})</option>`,
        )
        .join("");
  } catch {
    document.getElementById("id_intervention").innerHTML =
      `<option value="">Erreur</option>`;
  }
}

async function handleSubmit() {
  const id_senior = Number(document.getElementById("id_senior").value);
  const id_intervention =
    Number(document.getElementById("id_intervention").value) || null;
  const rappel_notification =
    document.getElementById("rappel_notification").value || null;
  const note_perso = document.getElementById("note_perso").value.trim() || null;
  const submitBtn = document.getElementById("submitBtn");

  if (!id_senior) {
    showToast("Veuillez choisir un senior.", "error");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i>Ajout...`;

  try {
    const res = await fetch(`${API_BASE}/admin/planning_senior/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_senior,
        id_intervention,
        rappel_notification,
        note_perso,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.erreur || "Erreur serveur.");
    showToast("Entrée ajoutée !", "success");
    setTimeout(() => {
      window.location.href = "admin_planning_senior.php";
    }, 1500);
  } catch (err) {
    showToast(err.message || "Erreur lors de l'ajout.", "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<i class="fas fa-plus mr-2"></i>Ajouter`;
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
