var API_BASE = "http://172.16.90.10:8082";
const urlParams = new URLSearchParams(window.location.search);
const devisId = urlParams.get("id");

(async () => {
  await Promise.all([loadPros(), loadSeniors(), loadServices()]);
  await loadDevis();
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

async function loadDevis() {
  if (!devisId) return;
  try {
    const res = await fetch(`${API_BASE}/admin/devis/getone?id=${devisId}`);
    if (!res.ok) throw new Error();
    const d = await res.json();
    document.getElementById("id_pro").value = d.id_pro;
    document.getElementById("id_senior").value = d.id_senior;
    document.getElementById("id_service").value = d.id_service;
    document.getElementById("statut").value = d.statut;
    document.getElementById("montant_ht").value = d.montant_ht;
    document.getElementById("montant_ttc").value = d.montant_ttc;
    document.getElementById("taux_commission").value = d.taux_commission;
    document.getElementById("date_validite").value = d.date_validite
      ? d.date_validite.split("T")[0]
      : "";
  } catch {
    showToast("Impossible de charger le devis.", "error");
  }
}

async function handleSubmit() {
  const id_pro = Number(document.getElementById("id_pro").value);
  const id_senior = Number(document.getElementById("id_senior").value);
  const id_service = Number(document.getElementById("id_service").value);
  const statut = document.getElementById("statut").value;
  const montant_ht = parseFloat(document.getElementById("montant_ht").value);
  const montant_ttc = parseFloat(document.getElementById("montant_ttc").value);
  const taux_commission = parseFloat(
    document.getElementById("taux_commission").value,
  );
  const date_validite = document.getElementById("date_validite").value;
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
  if (!date_validite) {
    showToast("La date de validité est obligatoire.", "error");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i>Enregistrement...`;

  try {
    const res = await fetch(`${API_BASE}/admin/devis/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_devis: Number(devisId),
        id_pro,
        id_senior,
        id_service,
        statut,
        montant_ht,
        montant_ttc,
        taux_commission,
        date_validite,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.erreur || "Erreur serveur.");
    showToast("Devis mis à jour !", "success");
    setTimeout(() => {
      window.location.href = "admin_devis.php";
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
