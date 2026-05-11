var API_BASE = "http://144.76.74.130:8082";

(async () => {
  await Promise.all([loadPros(), loadServices()]);
  document.getElementById("submitBtn").addEventListener("click", handleSubmit);
})();

async function loadPros() {
  try {
    const res = await fetch(`${API_BASE}/admin/profile_pro/get`);
    const pros = await res.json();
    document.getElementById("id_pro").innerHTML =
      `<option value="">-- Choisir un prestataire --</option>` +
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
      `<option value="">-- Choisir un service --</option>` +
      services
        .map((s) => `<option value="${s.id}">${esc(s.nom)}</option>`)
        .join("");
  } catch {
    document.getElementById("id_service").innerHTML =
      `<option value="">Erreur</option>`;
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
  if (isNaN(prix_personnalise) || prix_personnalise < 0) {
    showToast("Le prix est invalide.", "error");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i>Création...`;

  try {
    const res = await fetch(`${API_BASE}/admin/offre_prestataire/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_pro,
        id_service,
        titre,
        prix_personnalise,
        bio,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.erreur || "Erreur serveur.");
    showToast("Offre créée !", "success");
    setTimeout(() => {
      window.location.href = "admin_offre_prestataire.php";
    }, 1500);
  } catch (err) {
    showToast(err.message || "Erreur lors de la création.", "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<i class="fas fa-plus mr-2"></i>Créer`;
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
