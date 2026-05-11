const API_BASE = "http://localhost:8082";
let allRef = [];
let filtreCourant = "actifs";

(async () => {
  await load();
})();

async function load() {
  try {
    const res = await fetch(`${API_BASE}/admin/referencement/get_tous`);
    allRef = await res.json();
    if (!Array.isArray(allRef)) allRef = [];
    renderKPI();
    renderListe();
  } catch {
    document.getElementById("listeRef").innerHTML =
      `<p class="text-red-400 italic">Erreur de chargement.</p>`;
  }
}

function renderKPI() {
  const actifs = allRef.filter((r) => r.actif).length;
  const caTotal = allRef.reduce((s, r) => s + Number(r.prix || 0), 0);
  document.getElementById("kpiActifs").textContent = actifs;
  document.getElementById("kpiTotal").textContent = allRef.length;
  document.getElementById("kpiCA").textContent = caTotal.toFixed(2) + " €";
}

function filtrer(f) {
  filtreCourant = f;
  document.querySelectorAll(".filtre-btn").forEach((b) => {
    b.className =
      "filtre-btn px-5 py-2 rounded-full font-fira text-sm uppercase bg-white border-2 border-gray-200 text-gray-500 transition-all";
  });
  document.getElementById(`btn-${f}`).className =
    "filtre-btn px-5 py-2 rounded-full font-fira text-sm uppercase bg-yellow-400 text-white transition-all";
  renderListe();
}

function renderListe() {
  const container = document.getElementById("listeRef");
  let data = [...allRef];
  if (filtreCourant === "actifs") data = data.filter((r) => r.actif);
  if (filtreCourant === "expires") data = data.filter((r) => !r.actif);

  if (!data.length) {
    container.innerHTML = `
              <div class="bg-white rounded-2xl p-8 text-center shadow-sm">
                <iconify-icon icon="mdi:star-off" class="text-5xl text-gray-300 mb-3 block"></iconify-icon>
                <p class="text-gray-400 italic">Aucun référencement${filtreCourant !== "tous" ? " pour ce filtre" : ""}.</p>
              </div>`;
    return;
  }

  container.innerHTML = data
    .map((r) => {
      const debut = new Date(r.date_debut).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      const fin = new Date(r.date_fin).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      const jours = Math.ceil(
        (new Date(r.date_fin) - new Date()) / (1000 * 60 * 60 * 24),
      );

      return `
            <div class="bg-white rounded-2xl shadow-sm p-6 border-l-4 ${r.actif ? "border-yellow-400" : "border-gray-200"}">
                <div class="flex items-center justify-between flex-wrap gap-4">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 ${r.actif ? "bg-yellow-50" : "bg-gray-50"} rounded-full flex items-center justify-center">
                            <iconify-icon icon="mdi:star-circle" class="text-2xl ${r.actif ? "text-yellow-400" : "text-gray-300"}"></iconify-icon>
                        </div>
                        <div>
                            <p class="font-fira text-gray-800 text-xl">${esc(r.prenom)} ${esc(r.nom)}</p>
                            ${r.nom_entreprise ? `<p class="text-gray-400 text-sm">${esc(r.nom_entreprise)}</p>` : ""}
                        </div>
                    </div>
                    <div class="flex items-center gap-4">
                        <span class="text-xs font-fira px-3 py-1.5 rounded-full ${r.actif ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-500"}">
                            ${r.actif ? `⭐ Actif — ${jours > 0 ? jours + "j restants" : "expire aujourd'hui"}` : "Expiré"}
                        </span>
                        <span class="font-fira text-gray-700">${Number(r.prix).toFixed(2)} €</span>
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-4 mt-4">
                    <div class="bg-gray-50 rounded-xl p-3 text-center">
                        <p class="text-xs text-gray-400 mb-1">Formule</p>
                        <p class="font-fira text-gray-700">${r.type === "semaine" ? "1 Semaine" : "1 Mois"}</p>
                    </div>
                    <div class="bg-gray-50 rounded-xl p-3 text-center">
                        <p class="text-xs text-gray-400 mb-1">Début</p>
                        <p class="font-fira text-gray-700 text-sm">${debut}</p>
                    </div>
                    <div class="bg-gray-50 rounded-xl p-3 text-center">
                        <p class="text-xs text-gray-400 mb-1">Fin</p>
                        <p class="font-fira text-gray-700 text-sm">${fin}</p>
                    </div>
                </div>
            </div>`;
    })
    .join("");
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
