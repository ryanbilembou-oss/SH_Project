var API_BASE = "http://144.76.74.130:8082";
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("id");

document.getElementById("submitBtn").addEventListener("click", handleSubmit);

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
  const commission =
    parseFloat(document.getElementById("commission").value) || 15;
  const rib = document.getElementById("rib").value.trim();
  const adresse_pro = document.getElementById("adresse_pro").value.trim();
  const bio = document.getElementById("bio").value.trim();
  const submitBtn = document.getElementById("submitBtn");

  if (!userId) {
    showToast("ID user manquant.", "error");
    return;
  }
  if (!nom) {
    showToast("Le nom est obligatoire.", "error");
    return;
  }
  if (!prenom) {
    showToast("Le prénom est obligatoire.", "error");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i>Création...`;

  try {
    const res = await fetch(`${API_BASE}/admin/profile_pro/create`, {
      method: "POST",
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
        commission,
        rib,
        adresse_pro,
        bio,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.erreur || "Erreur serveur.");
    showToast("Profil créé avec succès !", "success");
    setTimeout(() => {
      window.location.href = "admin_profile_pro.php";
    }, 1500);
  } catch (err) {
    showToast(err.message || "Erreur lors de la création.", "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<i class="fas fa-plus mr-2"></i>Créer le profil`;
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
