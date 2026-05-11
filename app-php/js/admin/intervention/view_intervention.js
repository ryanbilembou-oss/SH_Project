var API_BASE = "http://172.16.90.10:8082";
const urlParams = new URLSearchParams(window.location.search);
const interventionId = urlParams.get("id");

(async () => {
  await loadIntervention();
})();

async function loadIntervention() {
  const container = document.getElementById("interventionContainer");
  if (!interventionId) {
    container.innerHTML = `<p class="text-red-500 text-center">ID manquant.</p>`;
    return;
  }
  try {
    const res = await fetch(
      `${API_BASE}/admin/intervention/getone?id=${interventionId}`,
    );
    if (!res.ok) throw new Error();
    const i = await res.json();

    const dateDebut = i.date_heure_debut
      ? new Date(i.date_heure_debut).toLocaleString("fr-FR")
      : "—";
    const dateFin = i.date_heure_fin
      ? new Date(i.date_heure_fin).toLocaleString("fr-FR")
      : "—";
    const statutClass =
      {
        planifiee: "bg-blue-100 text-blue-700",
        en_cours: "bg-yellow-100 text-yellow-700",
        terminee: "bg-emerald-100 text-emerald-700",
        annulee: "bg-red-100 text-red-700",
      }[i.statut] || "bg-gray-100 text-gray-700";

    const seniorBlock = i.est_medical
      ? `<div class="bg-gray-100 rounded-xl p-4 border border-gray-200">
          <h4 class="font-bold text-gray-500 uppercase text-xs tracking-wider mb-3">
            <i class="fas fa-lock mr-1"></i> Senior
          </h4>
          <div class="flex items-center gap-2 text-gray-500 italic text-sm">
            <i class="fas fa-shield-alt text-gray-400"></i>
            Données anonymisées — RDV médical confidentiel
          </div>
        </div>`
      : `<div class="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <h4 class="font-bold text-blue-700 uppercase text-xs tracking-wider mb-3">
            <i class="fas fa-user-clock mr-1"></i> Senior
          </h4>
          <div class="font-bold text-gray-800">${esc(i.nom_senior)} ${esc(i.prenom_senior)}</div>
          <div class="text-xs text-gray-400 mt-1">ID #${i.id_senior}</div>
        </div>`;

    container.innerHTML = `
      <div class="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">

        <div class="bg-gradient-to-r from-cyan-800 to-cyan-600 p-6 flex items-center gap-6">
          <div class="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white text-2xl">
            <i class="fas fa-hand-holding-heart"></i>
          </div>
          <div>
            <h2 class="text-2xl font-bold text-white">Intervention #${i.id}</h2>
            <p class="text-cyan-200 text-sm mt-1">${esc(i.nom_service)}</p>
            <div class="mt-2 flex gap-2">
              <span class="text-xs font-bold px-3 py-1 rounded-full ${statutClass}">${esc(i.statut)}</span>
              ${i.est_medical ? '<span class="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full"><i class="fas fa-heartbeat mr-1"></i>Médical</span>' : ""}
            </div>
          </div>
          <div class="ml-auto">
            <a href="admin_edit_intervention.php?id=${i.id}" class="bg-white text-cyan-700 hover:bg-cyan-50 px-4 py-2 rounded-lg font-bold text-sm transition flex items-center gap-2">
              <i class="fas fa-edit"></i> Modifier
            </a>
          </div>
        </div>

        <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

          <div class="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
            <h4 class="font-bold text-yellow-700 uppercase text-xs tracking-wider mb-3">
              <i class="fas fa-briefcase mr-1"></i> Prestataire
            </h4>
            <div class="font-bold text-gray-800">${esc(i.nom_pro)} ${esc(i.prenom_pro)}</div>
            <div class="text-xs text-gray-400 mt-1">ID #${i.id_pro}</div>
          </div>

          ${seniorBlock}

          ${infoCard("fas fa-calendar-check", "Date début", dateDebut)}
          ${infoCard("fas fa-calendar-times", "Date fin", dateFin)}
          ${infoCard("fas fa-map-marker-alt", "Lieu", i.lieu)}
          ${infoCard("fas fa-euro-sign", "Prix", parseFloat(i.prix).toFixed(2) + " €")}
          ${infoCard("fas fa-percent", "Commission", parseFloat(i.commission_montant).toFixed(2) + " €")}
          ${infoCard("fas fa-heartbeat", "Médical", i.est_medical ? "Oui" : "Non")}

          ${
            i.bio_intervention
              ? `
          <div class="md:col-span-2 bg-gray-50 rounded-lg p-4 border border-gray-100">
            <div class="text-xs text-gray-400 uppercase font-bold mb-1"><i class="fas fa-align-left mr-1"></i>Description</div>
            <div class="text-gray-800 text-sm">${esc(i.bio_intervention)}</div>
          </div>`
              : ""
          }
        </div>
      </div>`;
  } catch {
    container.innerHTML = `<p class="text-red-500 text-center">Impossible de charger l'intervention.</p>`;
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
