const API_BASE = "http://144.76.74.130:8082";
const userId = Number(localStorage.getItem("id_user"));
const role = localStorage.getItem("role");

if (!userId || role !== "pro") window.location.href = "/users/login.php";

let currentFilter = "mensuel";
let allDevis = [];
let allFactures = [];

(async () => {
  await Promise.all([fetchDevis(), fetchFactures()]);
  renderAll();
})();

async function fetchDevis() {
  try {
    const res = await fetch(`${API_BASE}/admin/devis/get`);
    const all = await res.json();
    allDevis = Array.isArray(all) ? all.filter((d) => d.id_pro === userId) : [];
  } catch {
    console.error("Erreur chargement devis");
  }
}

async function fetchFactures() {
  try {
    const res = await fetch(`${API_BASE}/admin/facture/get`);
    const all = await res.json();
    allFactures = Array.isArray(all)
      ? all.filter((f) => f.id_emetteur === userId)
      : [];
  } catch {
    console.error("Erreur chargement factures");
  }
}

function setFilter(type) {
  currentFilter = type;
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("bg-[#1A2B49]", "text-white");
    btn.classList.add("text-[#1A2B49]", "hover:bg-gray-100");
  });
  const activeBtn = document.getElementById(`btn-${type}`);
  activeBtn.classList.add("bg-[#1A2B49]", "text-white");
  activeBtn.classList.remove("text-[#1A2B49]", "hover:bg-gray-100");
  renderAll();
}

function renderAll() {
  renderDevis();
  renderFactures();
}

function groupItems(items, dateField) {
  const groups = {};
  items.forEach((item) => {
    const date = new Date(item[dateField] || Date.now());
    let key = "";
    if (currentFilter === "mensuel") {
      key = date.toLocaleString("fr-FR", { month: "long", year: "numeric" });
    } else if (currentFilter === "trimestriel") {
      const quarter = Math.floor(date.getMonth() / 3) + 1;
      key = `Trimestre ${quarter} — ${date.getFullYear()}`;
    } else {
      key = `${date.getFullYear()}`;
    }
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
  });
  return groups;
}

function renderDevis() {
  const container = document.getElementById("section-devis");
  if (!allDevis.length) {
    container.innerHTML = `
      <div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-gray-200 text-center">
        <p class="text-gray-400 italic text-lg">Aucun devis archive.</p>
      </div>`;
    return;
  }

  const groups = groupItems(allDevis, "date_validite");
  const statutLabels = {
    en_attente: { text: "En attente", color: "bg-yellow-100 text-yellow-700" },
    accepte: { text: "Accepte", color: "bg-emerald-100 text-emerald-700" },
    refuse: { text: "Refuse", color: "bg-red-100 text-red-700" },
    annule: { text: "Annule", color: "bg-gray-100 text-gray-500" },
    paye: { text: "Paye", color: "bg-blue-100 text-blue-700" },
  };

  container.innerHTML = Object.keys(groups)
    .map((key) => {
      const devisHtml = groups[key]
        .map((d) => {
          const statut = statutLabels[d.statut] || {
            text: d.statut,
            color: "bg-gray-100 text-gray-500",
          };
          const dateV = d.date_validite
            ? new Date(d.date_validite).toLocaleDateString("fr-FR")
            : "—";
          const isRembourse = d.statut === "annule";
          return `
      <div class="p-6 rounded-[30px] ${isRembourse ? "bg-gray-100 opacity-60" : "bg-gray-50"} border border-gray-100 mb-3">
        <div class="flex justify-between items-start">
          <div>
            <h5 class="font-fira text-[#1A2B49] text-lg">${esc(d.nom_service || "Devis")}</h5>
            <p class="text-xs text-gray-400 mt-0.5">Senior : ${esc(d.prenom_senior || "")} ${esc(d.nom_senior || "")} • Valide le ${dateV}</p>
          </div>
          <span class="text-xs font-fira px-3 py-1 rounded-full uppercase ${statut.color}">${statut.text}</span>
        </div>
        <div class="flex gap-4 mt-3">
          <span class="font-fira text-[#1A2B49] font-bold">${Number(d.montant_ttc).toFixed(2)} EUR TTC</span>
          <span class="text-gray-400 text-xs mt-0.5">Comm. ${d.taux_commission}%</span>
        </div>
      </div>`;
        })
        .join("");

      return `
    <div class="bg-white rounded-[40px] border-2 border-transparent hover:border-[#7CABD3] transition-all overflow-hidden mb-4 shadow-sm">
      <button onclick="this.nextElementSibling.classList.toggle('hidden'); this.querySelector('.arrow').classList.toggle('rotate-180')"
        class="w-full px-8 py-6 flex justify-between items-center bg-white hover:bg-gray-50 transition-all outline-none">
        <span class="text-xl font-fira uppercase text-[#1A2B49] font-bold">${key}</span>
        <iconify-icon icon="mdi:chevron-down" class="arrow text-2xl text-[#7CABD3] transition-all"></iconify-icon>
      </button>
      <div class="hidden px-8 pb-6 border-t border-gray-100 pt-6 bg-white">
        ${devisHtml}
      </div>
    </div>`;
    })
    .join("");
}

function renderFactures() {
  const container = document.getElementById("section-factures");
  if (!allFactures.length) {
    container.innerHTML = `
      <div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-gray-200 text-center">
        <p class="text-gray-400 italic text-lg">Aucune facture archivee.</p>
      </div>`;
    return;
  }

  const groups = groupItems(allFactures, "date_heure_debut");

  container.innerHTML = Object.keys(groups)
    .map((key) => {
      const facturesHtml = groups[key]
        .map((f) => {
          const isRembourse = f.statut === "rembourse";
          const dateAffichee = f.date_heure_debut
            ? new Date(f.date_heure_debut).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            : "—";
          const typeLabels = {
            intervention: "Intervention",
            panier: "Achat boutique",
            abonnement: "Abonnement",
          };
          const typeLabel =
            typeLabels[f.type_achat] || f.type_achat || "Facture";

          return `
      <div class="p-6 rounded-[30px] ${isRembourse ? "bg-gray-100 opacity-60" : "bg-gray-50"} border border-gray-100 mb-3">
        <div class="flex items-start justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 ${isRembourse ? "bg-red-100 text-red-400" : "bg-emerald-100 text-emerald-600"} rounded-xl flex items-center justify-center">
              <iconify-icon icon="${isRembourse ? "mdi:receipt-text-remove" : "mdi:receipt"}"></iconify-icon>
            </div>
            <div>
              <p class="text-xs font-fira uppercase tracking-widest ${isRembourse ? "text-red-400" : "text-emerald-600"} mb-0.5">Facture • ${typeLabel}</p>
              <p class="font-fira text-[#1A2B49]">${esc(f.nom_service || f.type_achat || "Document")}</p>
              <p class="text-xs text-gray-400">${esc(f.prenom_recepteur || "")} ${esc(f.nom_recepteur || "")} • ${dateAffichee}</p>
            </div>
          </div>
          <div class="text-right flex-shrink-0">
            <p class="font-fira text-lg font-bold ${isRembourse ? "line-through text-gray-400" : "text-[#1A2B49]"}">${Number(f.montant_ttc).toFixed(2)} EUR</p>
            <span class="text-xs font-fira uppercase ${isRembourse ? "text-red-400" : "text-emerald-600"}">${isRembourse ? "Rembourse" : "Payee"}</span>
            ${f.pdf_url ? `<a href="${f.pdf_url}" target="_blank" class="block text-xs text-[#7CABD3] hover:underline font-fira mt-1">Telecharger PDF</a>` : ""}
          </div>
        </div>
      </div>`;
        })
        .join("");

      return `
    <div class="bg-white rounded-[40px] border-2 border-transparent hover:border-[#7CABD3] transition-all overflow-hidden mb-4 shadow-sm">
      <button onclick="this.nextElementSibling.classList.toggle('hidden'); this.querySelector('.arrow').classList.toggle('rotate-180')"
        class="w-full px-8 py-6 flex justify-between items-center bg-white hover:bg-gray-50 transition-all outline-none">
        <span class="text-xl font-fira uppercase text-[#1A2B49] font-bold">${key}</span>
        <iconify-icon icon="mdi:chevron-down" class="arrow text-2xl text-[#7CABD3] transition-all"></iconify-icon>
      </button>
      <div class="hidden px-8 pb-6 border-t border-gray-100 pt-6 bg-white">
        ${facturesHtml}
      </div>
    </div>`;
    })
    .join("");
}

function showTab(tab) {
  document
    .getElementById("section-devis")
    .classList.toggle("hidden", tab !== "devis");
  document
    .getElementById("section-factures")
    .classList.toggle("hidden", tab !== "factures");
  document.getElementById("tab-devis").className =
    `px-8 py-3 rounded-full font-fira uppercase text-sm transition-all shadow-sm ${tab === "devis" ? "bg-[#1A2B49] text-white" : "bg-white border-2 border-[#7CABD3] text-[#7CABD3]"}`;
  document.getElementById("tab-factures").className =
    `px-8 py-3 rounded-full font-fira uppercase text-sm transition-all shadow-sm ${tab === "factures" ? "bg-[#1A2B49] text-white" : "bg-white border-2 border-[#7CABD3] text-[#7CABD3]"}`;
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
