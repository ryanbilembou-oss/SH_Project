var API_BASE = "http://localhost:8082";
const urlParams = new URLSearchParams(window.location.search);
const agendaId = urlParams.get("id");

(async () => {
  await Promise.all([loadInterventions()]);
  await loadPlanning();
  document.getElementById("submitBtn").addEventListener("click", handleSubmit);
})();

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

async function loadPlanning() {
  if (!agendaId) return;
  try {
    const res = await fetch(
      `${API_BASE}/admin/planning_senior/getone?id=${agendaId}`,
    );
    if (!res.ok) throw new Error();
    const p = await res.json();
    document.getElementById("id_intervention").value = p.id_intervention || "";
    document.getElementById("note_perso").value = p.note_perso || "";
    if (p.rappel_notification) {
      document.getElementById("rappel_notification").value =
        p.rappel_notification.slice(0, 16);
    }
  } catch {
    showToast("Impossible de charger l'entrée.", "error");
  }
}

async function handleSubmit() {
  const id_intervention =
    Number(document.getElementById("id_intervention").value) || null;
  const rappel_notification =
    document.getElementById("rappel_notification").value || null;
  const note_perso = document.getElementById("note_perso").value.trim() || null;
  const submitBtn = document.getElementById("submitBtn");

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i>Enregistrement...`;

  try {
    const res = await fetch(`${API_BASE}/admin/planning_senior/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_agenda: Number(agendaId),
        id_intervention,
        rappel_notification,
        note_perso,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.erreur || "Erreur serveur.");
    showToast("Entrée mise à jour !", "success");
    setTimeout(() => {
      window.location.href = "admin_planning_senior.php";
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
