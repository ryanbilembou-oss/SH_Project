var API_BASE = "http://144.76.74.130:8082";
const urlParams = new URLSearchParams(window.location.search);
const idProFromUrl = urlParams.get("id_pro");

(async () => {
  await loadPros();
  document.getElementById("submitBtn").addEventListener("click", handleSubmit);
})();

async function loadPros() {
  try {
    const res = await fetch(`${API_BASE}/admin/profile_pro/get`);
    const pros = await res.json();
    const select = document.getElementById("id_pro");
    select.innerHTML =
      `<option value="">-- Choisir un prestataire --</option>` +
      pros
        .map(
          (p) =>
            `<option value="${p.id_user}" ${p.id_user === Number(idProFromUrl) ? "selected" : ""}>${esc(p.nom)} ${esc(p.prenom)}</option>`,
        )
        .join("");
  } catch {
    document.getElementById("id_pro").innerHTML =
      `<option value="">Erreur</option>`;
  }
}

async function handleSubmit() {
  const id_pro = Number(document.getElementById("id_pro").value);
  const jour_semaine = Number(document.getElementById("jour_semaine").value);
  const heure_debut = document.getElementById("heure_debut").value;
  const heure_fin = document.getElementById("heure_fin").value;
  const est_actif = document.getElementById("est_actif").checked;
  const submitBtn = document.getElementById("submitBtn");

  if (!id_pro) {
    showToast("Veuillez choisir un prestataire.", "error");
    return;
  }
  if (!heure_debut) {
    showToast("L'heure de début est obligatoire.", "error");
    return;
  }
  if (!heure_fin) {
    showToast("L'heure de fin est obligatoire.", "error");
    return;
  }
  if (heure_debut >= heure_fin) {
    showToast("L'heure de fin doit être après l'heure de début.", "error");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i>Ajout...`;

  try {
    const res = await fetch(`${API_BASE}/admin/planning_pro/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_pro,
        jour_semaine,
        heure_debut,
        heure_fin,
        est_actif,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.erreur || "Erreur serveur.");
    showToast("Créneau ajouté !", "success");
    setTimeout(() => {
      window.location.href = "admin_planning_pro.php";
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
