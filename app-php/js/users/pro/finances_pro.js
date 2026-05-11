const API_BASE = "http://172.16.90.10:8082";
const userId = Number(localStorage.getItem("id_user"));
const role = localStorage.getItem("role");

if (!userId || role !== "pro") window.location.href = "/users/login.php";

let allFactures = [];
let allInter = [];
let allVirements = [];
let filtrePeriode = "tout";
let filtreCategorie = "tout";

(async () => {
  await Promise.all([loadFinances(), loadVirements()]);
})();

async function loadFinances() {
  try {
    const [resFactures, resInter, resVirements] = await Promise.all([
      fetch(`${API_BASE}/admin/facture/get`),
      fetch(`${API_BASE}/admin/intervention/get`),
      fetch(`${API_BASE}/admin/virement/get_by_pro?id_pro=${userId}`),
    ]);

    allFactures =
      (await resFactures.json()).filter(
        (f) => f.id_emetteur === userId && f.type_achat === "intervention",
      ) || [];
    allInter = (await resInter.json()).filter((i) => i.id_pro === userId) || [];
    allVirements = (await resVirements.json()) || [];

    renderFiltres();
    appliquerFiltres();
  } catch {
    document.getElementById("kpiGrid").innerHTML =
      `<p class="text-red-400 text-center col-span-3">Erreur de chargement.</p>`;
  }
}

function renderFiltres() {
  const categories = [
    ...new Set(allFactures.map((f) => f.nom_categorie).filter(Boolean)),
  ].sort();

  document.getElementById("filtresContainer").innerHTML = `
    <div class="flex flex-wrap gap-3 mb-6">
      <div class="flex gap-2 flex-wrap">
        ${["tout", "mensuel", "trimestriel", "semestriel", "annuel"]
          .map(
            (p) => `
          <button onclick="setPeriode('${p}')" id="periode-${p}"
            class="filtre-periode px-5 py-2 rounded-full font-fira text-sm border-2 border-[#7CABD3] text-[#7CABD3] hover:bg-[#7CABD3] hover:text-white transition-all ${p === "tout" ? "bg-[#1A2B49] text-white border-[#1A2B49]" : ""}">
            ${p === "tout" ? "Tout" : p === "mensuel" ? "Ce mois" : p === "trimestriel" ? "3 mois" : p === "semestriel" ? "6 mois" : "Cette année"}
          </button>`,
          )
          .join("")}
      </div>
      ${
        categories.length
          ? `
      <div class="flex gap-2 flex-wrap">
        <button onclick="setCategorie('tout')" id="cat-tout"
          class="filtre-cat px-5 py-2 rounded-full font-fira text-sm border-2 border-gray-300 text-gray-500 hover:bg-gray-200 transition-all bg-gray-200">
          Toutes categories
        </button>
        ${categories
          .map(
            (c) => `
          <button onclick="setCategorie('${c}')" id="cat-${c}"
            class="filtre-cat px-5 py-2 rounded-full font-fira text-sm border-2 border-gray-300 text-gray-500 hover:bg-gray-200 transition-all">
            ${esc(c)}
          </button>`,
          )
          .join("")}
      </div>`
          : ""
      }
    </div>`;
}

function setPeriode(p) {
  filtrePeriode = p;
  document.querySelectorAll(".filtre-periode").forEach((b) => {
    b.className =
      "filtre-periode px-5 py-2 rounded-full font-fira text-sm border-2 border-[#7CABD3] text-[#7CABD3] hover:bg-[#7CABD3] hover:text-white transition-all";
  });
  const btn = document.getElementById(`periode-${p}`);
  if (btn)
    btn.className =
      "filtre-periode px-5 py-2 rounded-full font-fira text-sm border-2 border-[#1A2B49] bg-[#1A2B49] text-white transition-all";
  appliquerFiltres();
}

function setCategorie(c) {
  filtreCategorie = c;
  document.querySelectorAll(".filtre-cat").forEach((b) => {
    b.className =
      "filtre-cat px-5 py-2 rounded-full font-fira text-sm border-2 border-gray-300 text-gray-500 hover:bg-gray-200 transition-all";
  });
  const btn = document.getElementById(`cat-${c}`);
  if (btn)
    btn.className =
      "filtre-cat px-5 py-2 rounded-full font-fira text-sm border-2 border-gray-300 bg-gray-200 text-gray-700 transition-all";
  appliquerFiltres();
}

function getDateMin() {
  const now = new Date();
  switch (filtrePeriode) {
    case "mensuel":
      return new Date(now.getFullYear(), now.getMonth(), 1);
    case "trimestriel":
      return new Date(now.getFullYear(), now.getMonth() - 3, 1);
    case "semestriel":
      return new Date(now.getFullYear(), now.getMonth() - 6, 1);
    case "annuel":
      return new Date(now.getFullYear(), 0, 1);
    default:
      return null;
  }
}

function appliquerFiltres() {
  const dateMin = getDateMin();

  let factures = allFactures.filter((f) => {
    const inter = allInter.find((i) => i.id === f.id_intervention);
    const date = inter?.date_heure_debut
      ? new Date(inter.date_heure_debut)
      : null;
    if (dateMin && date && date < dateMin) return false;
    if (filtreCategorie !== "tout" && f.nom_categorie !== filtreCategorie)
      return false;
    return true;
  });

  let virements = allVirements.filter((v) => {
    const date = v.date_virement
      ? new Date(v.date_virement)
      : new Date(v.date_creation);
    if (dateMin && date < dateMin) return false;
    return true;
  });

  const totalTTC = factures.reduce((s, f) => s + Number(f.montant_ttc || 0), 0);
  const totalCommission = factures.reduce(
    (s, f) => s + Number(f.commission_sh || 0),
    0,
  );
  const gainNet = virements.reduce((s, v) => s + Number(v.montant || 0), 0);
  const nbTerminees = allInter.filter((i) => {
    if (i.statut !== "terminee") return false;
    if (dateMin && new Date(i.date_heure_fin) < dateMin) return false;
    return true;
  }).length;

  document.getElementById("kpiGrid").innerHTML = `
    <div class="bg-[#1A2B49] text-white p-8 rounded-[40px] text-center">
      <iconify-icon icon="mdi:cash-multiple" class="text-5xl text-[#7CABD3] mb-3 block"></iconify-icon>
      <p class="text-4xl font-fira">${totalTTC.toFixed(2)} EUR</p>
      <p class="text-sm uppercase font-fira tracking-widest mt-1 opacity-70">Total encaisse</p>
    </div>
    <div class="bg-white p-8 rounded-[40px] border-2 border-red-100 text-center">
      <iconify-icon icon="mdi:percent" class="text-5xl text-red-300 mb-3 block"></iconify-icon>
      <p class="text-4xl font-fira text-[#1A2B49]">${totalCommission.toFixed(2)} EUR</p>
      <p class="text-sm uppercase font-fira tracking-widest mt-1 text-gray-400">Commission Silver Happy</p>
    </div>
    <div class="bg-white p-8 rounded-[40px] border-2 border-green-200 text-center">
      <iconify-icon icon="mdi:bank-transfer" class="text-5xl text-green-400 mb-3 block"></iconify-icon>
      <p class="text-4xl font-fira text-green-600">${gainNet.toFixed(2)} EUR</p>
      <p class="text-sm uppercase font-fira tracking-widest mt-1 text-gray-400">
        Gain net · ${nbTerminees} intervention${nbTerminees > 1 ? "s" : ""}
      </p>
    </div>`;

  renderRevenusParService(factures);
  renderHistoriqueMensuel(virements);
  renderVirements(virements);
}

function renderRevenusParService(factures) {
  const container = document.getElementById("revenusParService");

  const parService = {};
  factures.forEach((f) => {
    const nomService = f.nom_service || "Autre";
    const nomCat = f.nom_categorie || "Sans categorie";
    const key = `${nomCat} — ${nomService}`;
    if (!parService[key])
      parService[key] = { total: 0, nb: 0, categorie: nomCat };
    parService[key].total += Number(f.montant_ht) - Number(f.commission_sh);
    parService[key].nb++;
  });

  const sorted = Object.entries(parService).sort(
    (a, b) => b[1].total - a[1].total,
  );
  const max = sorted[0]?.[1].total || 1;

  if (!sorted.length) {
    container.innerHTML = `<p class="text-gray-400 italic">Aucune donnée pour cette periode.</p>`;
    return;
  }

  container.innerHTML = sorted
    .map(([nom, data]) => {
      const pct = Math.round((data.total / max) * 100);
      return `
    <div class="bg-white p-5 rounded-[20px] border-2 border-transparent hover:border-[#7CABD3] transition-all">
      <div class="flex justify-between items-center mb-2">
        <div>
          <p class="font-fira text-[#1A2B49]">${esc(nom)}</p>
          <p class="text-gray-400 text-xs">${data.nb} intervention${data.nb > 1 ? "s" : ""}</p>
        </div>
        <p class="font-fira text-green-600 text-sm">${data.total.toFixed(2)} EUR</p>
      </div>
      <div class="h-2 bg-gray-100 rounded-full">
        <div class="h-2 bg-[#7CABD3] rounded-full" style="width: ${pct}%"></div>
      </div>
    </div>`;
    })
    .join("");
}

function renderHistoriqueMensuel(virements) {
  const container = document.getElementById("historiqueMensuel");

  const parMois = {};
  virements.forEach((v) => {
    const date = v.date_virement
      ? new Date(v.date_virement)
      : new Date(v.date_creation);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    if (!parMois[key]) parMois[key] = { total: 0, nb: 0 };
    parMois[key].total += Number(v.montant);
    parMois[key].nb++;
  });

  const sorted = Object.entries(parMois)
    .sort((a, b) => b[0].localeCompare(a[0]))
    .slice(0, 6);
  const moisLabels = [
    "Jan",
    "Fev",
    "Mar",
    "Avr",
    "Mai",
    "Jun",
    "Jul",
    "Aou",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  if (!sorted.length) {
    container.innerHTML = `<p class="text-gray-400 italic">Aucune donnée pour cette periode.</p>`;
    return;
  }

  container.innerHTML = sorted
    .map(([key, data]) => {
      const [year, month] = key.split("-");
      const label = `${moisLabels[parseInt(month) - 1]} ${year}`;
      return `
    <div class="bg-white p-5 rounded-[20px] border-2 border-transparent hover:border-[#7CABD3] transition-all flex justify-between items-center">
      <p class="font-fira text-[#1A2B49]">${label}</p>
      <div class="text-right">
        <p class="font-fira text-green-600">${data.total.toFixed(2)} EUR</p>
        <p class="text-gray-400 text-sm">${data.nb} virement${data.nb > 1 ? "s" : ""}</p>
      </div>
    </div>`;
    })
    .join("");
}

function renderVirements(virements) {
  const container = document.getElementById("virementsList");

  if (!virements.length) {
    container.innerHTML = `
      <div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-gray-200 text-center">
        <iconify-icon icon="mdi:bank-off" class="text-4xl text-gray-300 mb-3 block"></iconify-icon>
        <p class="text-gray-400 italic">Aucun virement pour cette periode.</p>
      </div>`;
    return;
  }

  container.innerHTML = virements
    .map((v) => {
      const date = v.date_virement
        ? new Date(v.date_virement).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        : new Date(v.date_creation).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });

      return `
    <div class="bg-white p-6 rounded-[30px] border-2 border-transparent hover:border-[#7CABD3] transition-all flex items-center justify-between gap-4">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center flex-shrink-0">
          <iconify-icon icon="mdi:bank-transfer" class="text-2xl text-emerald-500"></iconify-icon>
        </div>
        <div>
          <p class="font-fira text-[#1A2B49] text-lg">${esc(v.nom_service || "Prestation")}</p>
          <p class="text-gray-400 text-sm">
            ${v.prenom_senior ? esc(v.prenom_senior) + " " + esc(v.nom_senior) : ""}
            ${date ? " — " + date : ""}
          </p>
        </div>
      </div>
      <div class="text-right flex-shrink-0">
        <p class="font-fira text-emerald-600 text-2xl">+${Number(v.montant).toFixed(2)} EUR</p>
        <span class="text-xs font-fira px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 uppercase">Effectue</span>
      </div>
    </div>`;
    })
    .join("");
}

async function loadVirements() {}

function showToast(message, type = "info") {
  const toast = document.getElementById("toast");
  document.getElementById("toastMsg").textContent = message;
  document.getElementById("toastIcon").textContent =
    type === "success" ? "V" : type === "error" ? "X" : "i";
  toast.classList.remove("-translate-y-20", "opacity-0");
  toast.classList.add("translate-y-0", "opacity-100");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => {
    toast.classList.remove("translate-y-0", "opacity-100");
    toast.classList.add("-translate-y-20", "opacity-0");
  }, 3000);
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
