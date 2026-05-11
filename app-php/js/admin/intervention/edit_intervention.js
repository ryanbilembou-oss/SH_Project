var API_BASE = "http://172.16.90.10:8082";
const urlParams = new URLSearchParams(window.location.search);
const interventionId = urlParams.get("id");

(async () => {
  await Promise.all([loadPros(), loadSeniors(), loadServices()]);
  await loadIntervention();
  document.getElementById("submitBtn").addEventListener("click", handleSubmit);
})();

async function loadPros() {
  try {
    const res = await fetch(`${API_BASE}/admin/profile_pro/get`);
    const pros = await res.json();
    document.getElementById("id_pro").innerHTML =
      `<option value="">-- Choisir --</option>` +
      pros
        .map(
          (p) =>
            `<option value="${p.id_user}">${esc(p.nom)} ${esc(p.prenom)}</option>`,
        )
        .join("");
  } catch {
    document.getElementById("id_pro").innerHTML =
      `<option value="">Erreur</option>`;
  }
}

async function loadSeniors() {
  try {
    const res = await fetch(`${API_BASE}/admin/profile_senior/get`);
    const seniors = await res.json();
    document.getElementById("id_senior").innerHTML =
      `<option value="">-- Choisir --</option>` +
      seniors
        .map(
          (s) =>
            `<option value="${s.id_user}">${esc(s.nom)} ${esc(s.prenom)}</option>`,
        )
        .join("");
  } catch {
    document.getElementById("id_senior").innerHTML =
      `<option value="">Erreur</option>`;
  }
}

async function loadServices() {
  try {
    const res = await fetch(`${API_BASE}/admin/service/get`);
    const services = await res.json();
    document.getElementById("id_service").innerHTML =
      `<option value="">-- Choisir --</option>` +
      services
        .map((s) => `<option value="${s.id}">${esc(s.nom)}</option>`)
        .join("");
  } catch {
    document.getElementById("id_service").innerHTML =
      `<option value="">Erreur</option>`;
  }
}

async function loadIntervention() {
  if (!interventionId) return;
  try {
    const res = await fetch(
      `${API_BASE}/admin/intervention/getone?id=${interventionId}`,
    );
    if (!res.ok) throw new Error();
    const i = await res.json();

    document.getElementById("id_pro").value = i.id_pro;
    document.getElementById("id_senior").value = i.id_senior;
    document.getElementById("id_service").value = i.id_service;
    document.getElementById("statut").value = i.statut;
    document.getElementById("prix").value = i.prix;
    document.getElementById("commission_montant").value = i.commission_montant;
    document.getElementById("lieu").value = i.lieu;
    document.getElementById("bio_intervention").value =
      i.bio_intervention || "";
    document.getElementById("est_medical").checked = i.est_medical;

    if (i.date_heure_debut) {
      document.getElementById("date_heure_debut").value =
        i.date_heure_debut.slice(0, 16);
    }
    if (i.date_heure_fin) {
      document.getElementById("date_heure_fin").value = i.date_heure_fin.slice(
        0,
        16,
      );
    }
  } catch {
    showToast("Impossible de charger l'intervention.", "error");
  }
}

async function handleSubmit() {
  const id_pro = Number(document.getElementById("id_pro").value);
  const id_senior = Number(document.getElementById("id_senior").value);
  const id_service = Number(document.getElementById("id_service").value);
  const statut = document.getElementById("statut").value;
  const date_heure_debut = document.getElementById("date_heure_debut").value;
  const date_heure_fin = document.getElementById("date_heure_fin").value;
  const prix = parseFloat(document.getElementById("prix").value);
  const commission_montant = parseFloat(
    document.getElementById("commission_montant").value,
  );
  const lieu = document.getElementById("lieu").value.trim();
  const bio_intervention =
    document.getElementById("bio_intervention").value.trim() || null;
  const est_medical = document.getElementById("est_medical").checked;
  const submitBtn = document.getElementById("submitBtn");

  if (!id_pro) {
    showToast("Veuillez choisir un prestataire.", "error");
    return;
  }
  if (!id_senior) {
    showToast("Veuillez choisir un senior.", "error");
    return;
  }
  if (!id_service) {
    showToast("Veuillez choisir un service.", "error");
    return;
  }
  if (!lieu) {
    showToast("Le lieu est obligatoire.", "error");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i>Enregistrement...`;

  try {
    const res = await fetch(`${API_BASE}/admin/intervention/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: Number(interventionId),
        id_pro,
        id_senior,
        id_service,
        statut,
        date_heure_debut,
        date_heure_fin,
        prix,
        commission_montant,
        lieu,
        bio_intervention,
        est_medical,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.erreur || "Erreur serveur.");
    showToast("Intervention mise à jour !", "success");
    setTimeout(() => {
      window.location.href = "admin_intervention.php";
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
