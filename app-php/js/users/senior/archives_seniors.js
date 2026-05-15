const API_BASE = "http://144.76.74.130:8082";
const userId = Number(localStorage.getItem("id_user"));
const role = localStorage.getItem("role");

if (!userId || role !== "senior") window.location.href = "/users/login.php";

let currentFilter = "mensuel";
let allArchives = [];

document.addEventListener("DOMContentLoaded", async () => {
  await fetchArchives();
  renderArchives();
});

async function fetchArchives() {
  try {
    const [devisRes, facturesRes] = await Promise.all([
      fetch(`${API_BASE}/admin/devis/get_by_senior?id=${userId}`),
      fetch(`${API_BASE}/admin/facture/get`),
    ]);

    const devis = await devisRes.json();
    const allFactures = await facturesRes.json();
    const factures = Array.isArray(allFactures)
      ? allFactures.filter((f) => f.id_recepteur === userId)
      : [];

    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

    allArchives = [
      ...(Array.isArray(devis) ? devis : []).map((d) => ({
        ...d,
        type: "devis",
        date_tri: new Date(d.date_validite),
      })),
      ...factures.map((f) => ({
        ...f,
        type: "facture",
        date_tri: new Date(f.date_heure_debut || "2000-01-01"),
      })),
    ].filter((item) => !isNaN(item.date_tri) && item.date_tri < twoMonthsAgo);
  } catch (e) {
    console.error(e);
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
  renderArchives();
}

function renderArchives() {
  const container = document.getElementById("archives-container");
  if (!allArchives.length) {
    container.innerHTML = `
      <div class="bg-white p-12 rounded-[40px] border-2 border-dashed border-gray-200 text-center">
        <iconify-icon icon="mdi:archive-outline" class="text-6xl text-gray-200 mb-4 block"></iconify-icon>
        <p class="text-gray-400 italic text-xl">Vous n'avez pas encore d'archives.</p>
        <p class="text-sm text-gray-400 mt-2">Les documents de plus de 2 mois apparaitront ici.</p>
      </div>`;
    return;
  }

  const groups = {};
  allArchives
    .sort((a, b) => b.date_tri - a.date_tri)
    .forEach((item) => {
      let key = "";
      if (currentFilter === "mensuel") {
        key = item.date_tri.toLocaleDateString("fr-FR", {
          month: "long",
          year: "numeric",
        });
      } else if (currentFilter === "trimestriel") {
        const quarter = Math.floor(item.date_tri.getMonth() / 3) + 1;
        key = `Trimestre ${quarter} — ${item.date_tri.getFullYear()}`;
      } else {
        key = `${item.date_tri.getFullYear()}`;
      }
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
    });

  container.innerHTML = Object.keys(groups)
    .map(
      (key) => `
    <div class="bg-white rounded-[40px] shadow-sm overflow-hidden border-2 border-transparent hover:border-[#7CABD3] transition-all mb-4">
      <button onclick="toggleGroup('${key}')" class="w-full px-8 py-6 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors">
        <h3 class="text-2xl font-fira uppercase tracking-tighter text-[#1A2B49] flex items-center gap-3">
          <iconify-icon icon="mdi:calendar-month" class="text-[#7CABD3]"></iconify-icon>
          ${key}
        </h3>
        <iconify-icon id="icon-${key}" icon="mdi:chevron-down" class="rotate-icon text-2xl text-[#1A2B49]"></iconify-icon>
      </button>
      <div id="content-${key}" class="accordion-content px-8 pb-8 space-y-4">
        ${groups[key].map((item) => (item.type === "devis" ? renderDevisItem(item) : renderFactureItem(item))).join("")}
      </div>
    </div>`,
    )
    .join("");
}

function toggleGroup(key) {
  const content = document.getElementById(`content-${key}`);
  const icon = document.getElementById(`icon-${key}`);
  content.classList.toggle("open");
  icon.classList.toggle("open");
}

function renderDevisItem(d) {
  const dateC = d.date_creation
    ? new Date(d.date_creation).toLocaleDateString("fr-FR")
    : "—";
  return `
    <div class="p-6 rounded-[30px] bg-gray-50 border-2 border-transparent hover:border-gray-200 transition-all flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl">
          <iconify-icon icon="mdi:file-document-outline"></iconify-icon>
        </div>
        <div>
          <h4 class="font-fira text-[#1A2B49] text-lg uppercase">${esc(d.nom_service || "Service")}</h4>
          <p class="text-xs text-gray-400">Par ${esc(d.prenom_pro || "")} ${esc(d.nom_pro || "")} • Le ${dateC}</p>
        </div>
      </div>
      <div class="text-right">
        <p class="font-fira text-[#1A2B49] text-xl font-bold">${Number(d.montant_ttc).toFixed(2)} EUR</p>
        <span class="text-xs uppercase font-fira tracking-widest text-gray-400">Devis ${esc(d.statut)}</span>
      </div>
    </div>`;
}

function renderFactureItem(f) {
  const dateC = f.date_creation
    ? new Date(f.date_creation).toLocaleDateString("fr-FR")
    : "—";
  const isRembourse = f.statut === "rembourse";
  return `
    <div class="p-6 rounded-[30px] ${isRembourse ? "bg-gray-100 opacity-60" : "bg-gray-50"} border-2 border-transparent hover:border-gray-200 transition-all flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 ${isRembourse ? "bg-red-100 text-red-400" : "bg-emerald-100 text-emerald-600"} rounded-2xl flex items-center justify-center text-2xl">
          <iconify-icon icon="${isRembourse ? "mdi:receipt-text-remove" : "mdi:receipt"}"></iconify-icon>
        </div>
        <div>
          <h4 class="font-fira text-[#1A2B49] text-lg uppercase">${esc(f.type_achat || "Facture")}</h4>
          <p class="text-xs text-gray-400">Le ${dateC}</p>
        </div>
      </div>
      <div class="text-right">
        <p class="font-fira text-[#1A2B49] text-xl font-bold ${isRembourse ? "line-through text-gray-400" : ""}">${Number(f.montant_ttc).toFixed(2)} EUR</p>
        <span class="text-xs uppercase font-fira tracking-widest ${isRembourse ? "text-red-400" : "text-emerald-600"}">${isRembourse ? "Rembourse" : "Payee"}</span>
      </div>
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
