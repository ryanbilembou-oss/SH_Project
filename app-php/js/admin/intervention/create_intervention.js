var API_BASE = "http://localhost:8082";

(async () => {
  await Promise.all([loadPros(), loadSeniors(), loadServices()]);
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
            `<option value="${p.id_user}">${esc(p.nom)} ${esc(p.prenom)}</option>`,
        )
        .join("");
  } catch {
    document.getElementById("id_pro").innerHTML =
      `<option value="">Erreur chargement</option>`;
  }
}

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
            `<option value="${s.id_user}">${esc(s.nom)} ${esc(s.prenom)}</option>`,
        )
        .join("");
  } catch {
    document.getElementById("id_senior").innerHTML =
      `<option value="">Erreur chargement</option>`;
  }
}

async function loadServices() {
  try {
    const res = await fetch(`${API_BASE}/admin/service/get`);
    const services = await res.json();
    const select = document.getElementById("id_service");
    select.innerHTML =
      `<option value="">-- Choisir un service --</option>` +
      services
        .map(
          (s) =>
            `<option value="${s.id}">${esc(s.nom)} (${parseFloat(s.prix_reference).toFixed(2)} €)</option>`,
        )
        .join("");
  } catch {
    document.getElementById("id_service").innerHTML =
      `<option value="">Erreur chargement</option>`;
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
  if (!date_heure_debut) {
    showToast("La date de début est obligatoire.", "error");
    return;
  }
  if (!date_heure_fin) {
    showToast("La date de fin est obligatoire.", "error");
    return;
  }
  if (!lieu) {
    showToast("Le lieu est obligatoire.", "error");
    return;
  }
  if (isNaN(prix) || prix < 0) {
    showToast("Le prix est invalide.", "error");
    return;
  }
  if (isNaN(commission_montant) || commission_montant < 0) {
    showToast("La commission est invalide.", "error");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i>Création...`;

  try {
    const res = await fetch(`${API_BASE}/admin/intervention/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
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
    showToast("Intervention créée avec succès !", "success");
    setTimeout(() => {
      window.location.href = "admin_intervention.php";
    }, 1500);
  } catch (err) {
    showToast(err.message || "Erreur lors de la création.", "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<i class="fas fa-plus mr-2"></i>Créer l'intervention`;
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
