var API_BASE = "http://144.76.74.130:8082";
const urlParams = new URLSearchParams(window.location.search);
const factureId = urlParams.get("id");

(async () => {
  await loadFacture();
})();

async function loadFacture() {
  const container = document.getElementById("factureContainer");
  if (!factureId) {
    container.innerHTML = `<p class="text-red-500 text-center">ID manquant.</p>`;
    return;
  }
  try {
    const res = await fetch(`${API_BASE}/admin/facture/getone?id=${factureId}`);
    if (!res.ok) throw new Error();
    const f = await res.json();

    container.innerHTML = `
      <div class="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">

        <div class="bg-gradient-to-r from-yellow-700 to-yellow-500 p-6 flex items-center gap-6">
          <div class="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white text-2xl">
            <i class="fas fa-receipt"></i>
          </div>
          <div>
            <h2 class="text-2xl font-bold text-white">Facture #${f.id_facture}</h2>
            ${f.id_intervention ? `<p class="text-yellow-100 text-sm mt-1">Intervention #${f.id_intervention}</p>` : ""}
          </div>
          ${
            f.pdf_url
              ? `
          <div class="ml-auto">
            <a href="${esc(f.pdf_url)}" target="_blank" class="bg-white text-yellow-700 hover:bg-yellow-50 px-4 py-2 rounded-lg font-bold text-sm transition flex items-center gap-2">
              <i class="fas fa-file-pdf text-red-500"></i> Télécharger PDF
            </a>
          </div>`
              : ""
          }
        </div>

        <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
            <h4 class="font-bold text-yellow-700 uppercase text-xs tracking-wider mb-3">
              <i class="fas fa-paper-plane mr-1"></i> Émetteur
            </h4>
            <div class="font-bold text-gray-800">${esc(f.nom_emetteur)} ${esc(f.prenom_emetteur)}</div>
            <div class="text-xs text-gray-400 mt-1">ID #${f.id_emetteur}</div>
          </div>

          <div class="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <h4 class="font-bold text-blue-700 uppercase text-xs tracking-wider mb-3">
              <i class="fas fa-inbox mr-1"></i> Récepteur
            </h4>
            <div class="font-bold text-gray-800">${esc(f.nom_recepteur)} ${esc(f.prenom_recepteur)}</div>
            <div class="text-xs text-gray-400 mt-1">ID #${f.id_recepteur}</div>
          </div>

          ${infoCard("fas fa-file-invoice", "Montant HT", parseFloat(f.montant_ht).toFixed(2) + " €")}
          ${infoCard("fas fa-file-invoice-dollar", "Montant TTC", parseFloat(f.montant_ttc).toFixed(2) + " €")}
          ${infoCard("fas fa-percent", "Commission SH", parseFloat(f.commission_sh).toFixed(2) + " €")}
          ${f.id_intervention ? infoCard("fas fa-hand-holding-heart", "Intervention liée", "#" + f.id_intervention) : ""}
        </div>
      </div>`;
  } catch {
    container.innerHTML = `<p class="text-red-500 text-center">Impossible de charger la facture.</p>`;
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
