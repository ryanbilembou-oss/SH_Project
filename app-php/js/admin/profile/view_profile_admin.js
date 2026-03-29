var API_BASE = "http://localhost:8082";
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
      `${API_BASE}/admin/profile_admin/getone?id=${userId}`,
    );
    if (!res.ok) throw new Error();
    const p = await res.json();

    container.innerHTML = `
      <div class="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">

        <!-- Header profil -->
        <div class="bg-gradient-to-r from-red-800 to-red-600 p-6 flex items-center gap-6">
          <div class="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-3xl">
            ${esc(p.prenom?.[0] || "?")}${esc(p.nom?.[0] || "")}
          </div>
          <div>
            <h2 class="text-2xl font-bold text-white">${esc(p.nom)} ${esc(p.prenom)}</h2>
            <p class="text-red-200 text-sm mt-1">Administrateur · ID #${p.id_user}</p>
          </div>
          <div class="ml-auto">
            <a href="admin_edit_profile_admin.php?id=${p.id_user}" class="bg-white text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg font-bold text-sm transition flex items-center gap-2">
              <i class="fas fa-edit"></i> Modifier
            </a>
          </div>
        </div>

        <!-- Infos -->
        <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          ${infoCard("fas fa-venus-mars", "Genre", p.genre)}
          ${infoCard("fas fa-phone", "Téléphone", p.telephone)}
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
