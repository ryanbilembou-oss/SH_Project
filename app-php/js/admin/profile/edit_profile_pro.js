var API_BASE = "http://172.16.90.10:8082";
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("id");

(async () => {
  await loadProfile();
  document.getElementById("submitBtn").addEventListener("click", handleSubmit);
})();

async function loadProfile() {
  if (!userId) {
    showToast("ID manquant.", "error");
    return;
  }
  try {
    const res = await fetch(
      `${API_BASE}/admin/profile_pro/getone?id=${userId}`,
    );
    if (!res.ok) throw new Error();
    const p = await res.json();
    document.getElementById("nom").value = p.nom || "";
    document.getElementById("prenom").value = p.prenom || "";
    document.getElementById("nom_entreprise").value = p.nom_entreprise || "";
    document.getElementById("siret").value = p.siret || "";
    document.getElementById("telephone_pro").value = p.telephone_pro || "";
    document.getElementById("genre").value = p.genre || "";
    document.getElementById("statut_juridique").value =
      p.statut_juridique || "";
    document.getElementById("is_subscription_valid").value =
      p.is_subscription_valid ? "true" : "false";
    document.getElementById("commission").value = p.commission || 15;
    document.getElementById("rib").value = p.rib || "";
    document.getElementById("adresse_pro").value = p.adresse_pro || "";
    document.getElementById("bio").value = p.bio || "";
    if (p.date_naissance) {
      document.getElementById("date_naissance").value =
        p.date_naissance.split("T")[0];
    }

    const badge = document.getElementById("statut_validation_badge");
    if (badge) {
      const statutClass =
        p.statut_validation === "valide"
          ? "bg-emerald-100 text-emerald-700 border-emerald-200"
          : p.statut_validation === "refuse"
            ? "bg-red-100 text-red-700 border-red-200"
            : "bg-yellow-100 text-yellow-700 border-yellow-200";
      badge.className = `text-xs font-bold px-3 py-2 rounded-lg border ${statutClass}`;
      badge.textContent = p.statut_validation || "en_attente";
    }
  } catch {
    showToast("Impossible de charger le profil.", "error");
  }
}

async function handleSubmit() {
  const nom = document.getElementById("nom").value.trim();
  const prenom = document.getElementById("prenom").value.trim();
  const nom_entreprise = document.getElementById("nom_entreprise").value.trim();
  const siret = document.getElementById("siret").value.trim();
  const telephone_pro = document.getElementById("telephone_pro").value.trim();
  const genre = document.getElementById("genre").value;
  const date_naissance = document.getElementById("date_naissance").value;
  const statut_juridique = document
    .getElementById("statut_juridique")
    .value.trim();
  const is_subscription_valid =
    document.getElementById("is_subscription_valid").value === "true";
  const commission = parseFloat(document.getElementById("commission").value);
  const rib = document.getElementById("rib").value.trim();
  const adresse_pro = document.getElementById("adresse_pro").value.trim();
  const bio = document.getElementById("bio").value.trim();
  const submitBtn = document.getElementById("submitBtn");

  if (!nom) {
    showToast("Le nom est obligatoire.", "error");
    return;
  }
  if (!prenom) {
    showToast("Le prénom est obligatoire.", "error");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i>Enregistrement...`;

  try {
    const res = await fetch(`${API_BASE}/admin/profile_pro/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_user: Number(userId),
        nom,
        prenom,
        nom_entreprise,
        siret,
        telephone_pro,
        genre,
        date_naissance,
        statut_juridique,
        is_subscription_valid,
        commission,
        rib,
        adresse_pro,
        bio,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.erreur || "Erreur serveur.");
    showToast("Profil mis à jour !", "success");
    setTimeout(() => {
      window.location.href = "admin_profile_pro.php";
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
