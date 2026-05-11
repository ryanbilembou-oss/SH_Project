var API_BASE = "http://172.16.90.10:8082";
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("id");

(async () => {
  await loadProfile();
})();

async function loadProfile() {
  const container = document.getElementById("profileContainer");
  if (!userId) {
    container.innerHTML = `<p class="text-red-500 text-center">ID manquant.</p>`;
    return;
  }
  try {
    const res = await fetch(
      `${API_BASE}/admin/profile_pro/getone?id=${userId}`,
    );
    if (!res.ok) throw new Error();
    const p = await res.json();

    const date = p.date_naissance
      ? new Date(p.date_naissance).toLocaleDateString("fr-FR")
      : "—";
    const validationClass =
      p.statut_validation === "valide"
        ? "bg-emerald-100 text-emerald-700"
        : p.statut_validation === "en_attente"
          ? "bg-yellow-100 text-yellow-700"
          : "bg-red-100 text-red-700";
    const abonnement = p.is_subscription_valid
      ? `<span class="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">Actif</span>`
      : `<span class="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full">Inactif</span>`;
    const note = parseFloat(p.note_moyenne || 0).toFixed(1);

    container.innerHTML = `
      <div class="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">

        <!-- Header profil -->
        <div class="bg-gradient-to-r from-yellow-700 to-yellow-500 p-6 flex items-center gap-6">
          <div class="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-3xl">
            ${esc(p.prenom?.[0] || "?")}${esc(p.nom?.[0] || "")}
          </div>
          <div>
            <h2 class="text-2xl font-bold text-white">${esc(p.nom)} ${esc(p.prenom)}</h2>
            <p class="text-yellow-100 text-sm mt-1">${esc(p.nom_entreprise || "Indépendant")} · ID #${p.id_user}</p>
            <div class="mt-2 flex gap-2">
              <span class="text-xs font-bold px-3 py-1 rounded-full ${validationClass}">${esc(p.statut_validation)}</span>
              ${abonnement}
            </div>
          </div>
          <div class="ml-auto text-right">
            <div class="text-white font-bold text-2xl">★ ${note}</div>
            <div class="text-yellow-200 text-xs">Note moyenne</div>
            <a href="admin_edit_profile_pro.php?id=${p.id_user}" class="mt-2 inline-block bg-white text-yellow-700 hover:bg-yellow-50 px-4 py-2 rounded-lg font-bold text-sm transition">
              <i class="fas fa-edit mr-1"></i> Modifier
            </a>
          </div>
        </div>

        <!-- Infos -->
        <div class="p-6">
          <h4 class="font-bold text-gray-600 uppercase text-xs tracking-wider mb-4 border-b pb-2">Informations personnelles</h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            ${infoCard("fas fa-venus-mars", "Genre", p.genre)}
            ${infoCard("fas fa-birthday-cake", "Date de naissance", date)}
            ${infoCard("fas fa-phone", "Téléphone", p.telephone_pro)}
          </div>

          <h4 class="font-bold text-gray-600 uppercase text-xs tracking-wider mb-4 border-b pb-2">Informations professionnelles</h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            ${infoCard("fas fa-building", "Entreprise", p.nom_entreprise)}
            ${infoCard("fas fa-id-card", "SIRET", p.siret)}
            ${infoCard("fas fa-gavel", "Statut juridique", p.statut_juridique)}
            ${infoCard("fas fa-map-marker-alt", "Adresse pro", p.adresse_pro)}
            ${infoCard("fas fa-percent", "Commission", p.commission ? p.commission + "%" : null)}
            ${infoCard("fas fa-university", "RIB", p.rib)}
          </div>

          ${
            p.bio
              ? `
          <h4 class="font-bold text-gray-600 uppercase text-xs tracking-wider mb-4 border-b pb-2">Bio</h4>
          <div class="bg-gray-50 rounded-lg p-4 text-sm text-gray-700">${esc(p.bio)}</div>`
              : ""
          }
        </div>
      </div>`;
  } catch {
    container.innerHTML = `<p class="text-red-500 text-center">Impossible de charger le profil.</p>`;
  }
}

function infoCard(icon, label, value) {
  return `
    <div class="bg-gray-50 rounded-lg p-4 border border-gray-100">
      <div class="text-xs text-gray-400 uppercase font-bold mb-1">
        <i class="${icon} mr-1"></i>${label}
      </div>
      <div class="text-gray-800 font-semibold text-sm">${esc(value || "—")}</div>
    </div>`;
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
