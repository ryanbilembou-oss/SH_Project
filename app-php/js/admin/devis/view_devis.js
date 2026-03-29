var API_BASE = "http://localhost:8082";
const urlParams = new URLSearchParams(window.location.search);
const devisId = urlParams.get("id");

(async () => {
  await loadDevis();
})();

async function loadDevis() {
  const container = document.getElementById("devisContainer");
  if (!devisId) {
    container.innerHTML = `<p class="text-red-500 text-center">ID manquant.</p>`;
    return;
  }
  try {
    const res = await fetch(`${API_BASE}/admin/devis/getone?id=${devisId}`);
    if (!res.ok) throw new Error();
    const d = await res.json();

    const date = d.date_validite
      ? new Date(d.date_validite).toLocaleDateString("fr-FR")
      : "—";
    const statutClass =
      {
        en_attente: "bg-yellow-100 text-yellow-700",
        accepte: "bg-emerald-100 text-emerald-700",
        refuse: "bg-red-100 text-red-700",
        expire: "bg-gray-100 text-gray-700",
      }[d.statut] || "bg-gray-100 text-gray-700";

    container.innerHTML = `
      <div class="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">

        <div class="bg-gradient-to-r from-yellow-700 to-yellow-500 p-6 flex items-center gap-6">
          <div class="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white text-2xl">
            <i class="fas fa-file-alt"></i>
          </div>
          <div>
            <h2 class="text-2xl font-bold text-white">Devis #${d.id_devis}</h2>
            <p class="text-yellow-100 text-sm mt-1">${esc(d.nom_service)}</p>
            <div class="mt-2">
              <span class="text-xs font-bold px-3 py-1 rounded-full ${statutClass}">${esc(d.statut)}</span>
            </div>
          </div>
          <div class="ml-auto">
            <a href="admin_edit_devis.php?id=${d.id_devis}" class="bg-white text-yellow-700 hover:bg-yellow-50 px-4 py-2 rounded-lg font-bold text-sm transition flex items-center gap-2">
              <i class="fas fa-edit"></i> Modifier
            </a>
          </div>
        </div>

        <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
            <h4 class="font-bold text-yellow-700 uppercase text-xs tracking-wider mb-3">
              <i class="fas fa-briefcase mr-1"></i> Prestataire
            </h4>
            <div class="font-bold text-gray-800">${esc(d.nom_pro)} ${esc(d.prenom_pro)}</div>
            <div class="text-xs text-gray-400 mt-1">ID #${d.id_pro}</div>
          </div>

          <div class="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <h4 class="font-bold text-blue-700 uppercase text-xs tracking-wider mb-3">
              <i class="fas fa-user-clock mr-1"></i> Senior
            </h4>
            <div class="font-bold text-gray-800">${esc(d.nom_senior)} ${esc(d.prenom_senior)}</div>
            <div class="text-xs text-gray-400 mt-1">ID #${d.id_senior}</div>
          </div>

          ${infoCard("fas fa-file-invoice", "Montant HT", parseFloat(d.montant_ht).toFixed(2) + " €")}
          ${infoCard("fas fa-file-invoice-dollar", "Montant TTC", parseFloat(d.montant_ttc).toFixed(2) + " €")}
          ${infoCard("fas fa-percent", "Taux commission", parseFloat(d.taux_commission).toFixed(2) + " %")}
          ${infoCard("fas fa-calendar", "Date validité", date)}
          ${d.id_intervention ? infoCard("fas fa-hand-holding-heart", "Intervention liée", "#" + d.id_intervention) : ""}
        </div>
      </div>`;
  } catch {
    container.innerHTML = `<p class="text-red-500 text-center">Impossible de charger le devis.</p>`;
  }
}

function infoCard(icon, label, value) {
  return `
    <div class="bg-gray-50 rounded-lg p-4 border border-gray-100">
      <div class="text-xs text-gray-400 uppercase font-bold mb-1"><i class="${icon} mr-1"></i>${label}</div>
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
