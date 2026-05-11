var API_BASE = "http://144.76.74.130:8082";
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
      `${API_BASE}/admin/profile_senior/getone?id=${userId}`,
    );
    if (!res.ok) throw new Error();
    const p = await res.json();

    const date = p.date_naissance
      ? new Date(p.date_naissance).toLocaleDateString("fr-FR")
      : "—";
    const abonnement = p.is_subscription_valid
      ? `<span class="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">Actif</span>`
      : `<span class="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full">Inactif</span>`;

    container.innerHTML = `
      <div class="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
        
        <!-- Header profil -->
        <div class="bg-gradient-to-r from-blue-900 to-blue-700 p-6 flex items-center gap-6">
          <div class="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-3xl">
            ${esc(p.prenom?.[0] || "?")}${esc(p.nom?.[0] || "")}
          </div>
          <div>
            <h2 class="text-2xl font-bold text-white">${esc(p.nom)} ${esc(p.prenom)}</h2>
            <p class="text-blue-200 text-sm mt-1">Senior · ID #${p.id_user}</p>
            <div class="mt-2">${abonnement}</div>
          </div>
          <div class="ml-auto">
            <a href="admin_edit_profile_senior.php?id=${p.id_user}" class="bg-white text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg font-bold text-sm transition flex items-center gap-2">
              <i class="fas fa-edit"></i> Modifier
            </a>
          </div>
        </div>

        <!-- Infos -->
        <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          ${infoCard("fas fa-venus-mars", "Genre", p.genre)}
          ${infoCard("fas fa-birthday-cake", "Date de naissance", date)}
          ${infoCard("fas fa-phone", "Téléphone", p.telephone)}
          ${infoCard("fas fa-map-marker-alt", "Adresse", p.adresse)}
          ${infoCard("fas fa-sign-in-alt", "Première connexion", p.is_first_login ? "Oui" : "Non")}
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
