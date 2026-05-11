var API_BASE = "http://172.16.90.10:8082";
const urlParams = new URLSearchParams(window.location.search);
const offreId = urlParams.get("id");

(async () => {
  await Promise.all([loadPros(), loadServices()]);
  await loadOffre();
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

async function loadOffre() {
  if (!offreId) return;
  try {
    const res = await fetch(
      `${API_BASE}/admin/offre_prestataire/getone?id=${offreId}`,
    );
    if (!res.ok) throw new Error();
    const o = await res.json();
    document.getElementById("id_pro").value = o.id_pro;
    document.getElementById("id_service").value = o.id_service;
    document.getElementById("titre").value = o.titre || "";
    document.getElementById("prix_personnalise").value = o.prix_personnalise;
    document.getElementById("bio").value = o.bio || "";
  } catch {
    showToast("Impossible de charger l'offre.", "error");
  }
}

async function handleSubmit() {
  const id_pro = Number(document.getElementById("id_pro").value);
  const id_service = Number(document.getElementById("id_service").value);
  const titre = document.getElementById("titre").value.trim();
  const prix_personnalise = parseFloat(
    document.getElementById("prix_personnalise").value,
  );
  const bio = document.getElementById("bio").value.trim() || null;
  const submitBtn = document.getElementById("submitBtn");

  if (!id_pro) {
    showToast("Veuillez choisir un prestataire.", "error");
    return;
  }
  if (!id_service) {
    showToast("Veuillez choisir un service.", "error");
    return;
  }
  if (!titre) {
    showToast("Le titre est obligatoire.", "error");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i>Enregistrement...`;

  try {
    const res = await fetch(`${API_BASE}/admin/offre_prestataire/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_offre: Number(offreId),
        id_pro,
        id_service,
        titre,
        prix_personnalise,
        bio,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.erreur || "Erreur serveur.");
    showToast("Offre mise à jour !", "success");
    setTimeout(() => {
      window.location.href = "admin_offre_prestataire.php";
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
