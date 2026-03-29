const API_BASE = "http://localhost:8082";
const userId = Number(localStorage.getItem("id_user"));
const role = localStorage.getItem("role");

if (!userId || role !== "senior") window.location.href = "/users/login.php";

(async () => {
  await Promise.all([loadDevis(), loadFactures()]);
})();

async function loadDevis() {
  try {
    const res = await fetch(`${API_BASE}/admin/devis/get`);
    const all = await res.json();
    const mesDevis = Array.isArray(all)
      ? all.filter((d) => d.id_senior === userId)
      : [];
    const container = document.getElementById("section-devis");
    if (!mesDevis.length) {
      container.innerHTML = `<div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-gray-200 text-center"><p class="text-gray-400 italic text-lg">Aucun devis pour le moment.</p></div>`;
      return;
    }
    container.innerHTML = mesDevis
      .map((d) => {
        const statutColor =
          d.statut === "accepte"
            ? "bg-emerald-100 text-emerald-700"
            : d.statut === "refuse"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700";
        return `
        <div class="bg-white p-8 rounded-[40px] border-2 border-transparent hover:border-[#7CABD3] hover:shadow-xl transition-all duration-500">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h4 class="font-black text-[#1A2B49] text-xl">${esc(d.nom_service || "Service")}</h4>
              <p class="text-gray-400 text-base mt-1">Prestataire : ${esc(d.nom_pro || "—")} ${esc(d.prenom_pro || "")}</p>
            </div>
            <span class="text-sm font-black px-4 py-2 rounded-full uppercase ${statutColor}">${esc(d.statut)}</span>
          </div>
          <div class="flex justify-between items-center mt-4">
            <p class="text-gray-400 text-base">📅 ${d.date_creation ? new Date(d.date_creation).toLocaleDateString("fr-FR") : "—"}</p>
            <p class="font-black text-[#1A2B49] text-xl">${d.montant_total ? d.montant_total + " €" : "Sur devis"}</p>
          </div>
        </div>`;
      })
      .join("");
  } catch {
    console.error("Erreur devis");
  }
}

async function loadFactures() {
  try {
    const res = await fetch(`${API_BASE}/admin/facture/get`);
    const all = await res.json();
    const mesFactures = Array.isArray(all)
      ? all.filter((f) => f.id_senior === userId)
      : [];
    const container = document.getElementById("section-factures");
    if (!mesFactures.length) {
      container.innerHTML = `<div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-gray-200 text-center"><p class="text-gray-400 italic text-lg">Aucune facture pour le moment.</p></div>`;
      return;
    }
    container.innerHTML = mesFactures
      .map((f) => {
        const statutColor =
          f.statut_paiement === "paye"
            ? "bg-emerald-100 text-emerald-700"
            : "bg-yellow-100 text-yellow-700";
        return `
        <div class="bg-white p-8 rounded-[40px] border-2 border-transparent hover:border-[#7CABD3] hover:shadow-xl transition-all duration-500">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h4 class="font-black text-[#1A2B49] text-xl">Facture #${f.id_facture}</h4>
              <p class="text-gray-400 text-base mt-1">${esc(f.nom_service || "—")}</p>
            </div>
            <span class="text-sm font-black px-4 py-2 rounded-full uppercase ${statutColor}">${esc(f.statut_paiement || "en attente")}</span>
          </div>
          <div class="flex justify-between items-center mt-4">
            <p class="text-gray-400 text-base">📅 ${f.date_emission ? new Date(f.date_emission).toLocaleDateString("fr-FR") : "—"}</p>
            <p class="font-black text-[#1A2B49] text-xl">${f.montant_total ? f.montant_total + " €" : "—"}</p>
          </div>
        </div>`;
      })
      .join("");
  } catch {
    console.error("Erreur factures");
  }
}

function showTab(tab) {
  document
    .getElementById("section-devis")
    .classList.toggle("hidden", tab !== "devis");
  document
    .getElementById("section-factures")
    .classList.toggle("hidden", tab !== "factures");
  document.getElementById("tab-devis").className =
    `px-8 py-3 rounded-full font-black uppercase text-sm transition-all ${tab === "devis" ? "bg-[#1A2B49] text-white" : "bg-white border-2 border-[#7CABD3] text-[#7CABD3]"}`;
  document.getElementById("tab-factures").className =
    `px-8 py-3 rounded-full font-black uppercase text-sm transition-all ${tab === "factures" ? "bg-[#1A2B49] text-white" : "bg-white border-2 border-[#7CABD3] text-[#7CABD3]"}`;
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
