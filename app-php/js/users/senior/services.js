const API_BASE = "http://172.16.90.10:8082";
const userId = Number(localStorage.getItem("id_user"));
const role = localStorage.getItem("role");

if (!userId || role !== "senior") window.location.href = "/users/login.php";

let tousServices = [];
let mesDemandes = [];
let selectedOffreId = null;
let vueActuelle = "tous";
let categorieActuelle = null;
let offresActuelles = [];
let proSelectionne = null;
let idsProsRef = [];
let planningProSelectionne = [];
let dateSelectionnee = null;
let creneauSelectionne = null;
let currentMois = new Date();

const MOIS_LABELS = [
  "Janvier",
  "Fevrier",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Aout",
  "Septembre",
  "Octobre",
  "Novembre",
  "Decembre",
];
const JOURS_MINI = ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"];

(async () => {
  await Promise.all([loadServices(), loadMesDemandes()]);
  renderCategories();
  appliquerFiltres();
  document
    .getElementById("btnEnvoyerDemande")
    .addEventListener("click", envoyerDemande);

  const preselPro = Number(localStorage.getItem("demande_id_pro"));
  const preselService = Number(localStorage.getItem("demande_id_service"));
  if (preselPro && preselService) {
    localStorage.removeItem("demande_id_pro");
    localStorage.removeItem("demande_id_service");
    const service = tousServices.find((s) => s.id === preselService);
    if (service) {
      await ouvrirOverlay(service.id, service.nom);
      const offre = offresActuelles.find((o) => o.id_pro === preselPro);
      if (offre) await selectionnerPro(offre.id_offre);
    }
  }
})();

async function loadServices() {
  try {
    const res = await fetch(`${API_BASE}/admin/service/get`);
    tousServices = await res.json();
    if (!Array.isArray(tousServices)) tousServices = [];
  } catch {
    document.getElementById("servicesList").innerHTML =
      `<p class="text-red-400 text-center col-span-3">Erreur de chargement.</p>`;
  }
}

async function loadMesDemandes() {
  try {
    const res = await fetch(
      `${API_BASE}/admin/demande_service/get_by_senior?id=${userId}`,
    );
    const all = await res.json();
    mesDemandes = Array.isArray(all) ? all : [];
    const now = new Date();
    const expirees = mesDemandes.filter(
      (d) => d.statut === "en_attente" && new Date(d.date_souhaitee) < now,
    );
    if (expirees.length) {
      await Promise.all(
        expirees.map((d) =>
          fetch(`${API_BASE}/admin/demande_service/update`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id_demande: d.id_demande,
              statut: "annulee",
            }),
          }),
        ),
      );
      const res2 = await fetch(
        `${API_BASE}/admin/demande_service/get_by_senior?id=${userId}`,
      );
      const all2 = await res2.json();
      mesDemandes = Array.isArray(all2) ? all2 : [];
    }
  } catch {
    mesDemandes = [];
  }
}

function changerVue(vue) {
  vueActuelle = vue;
  document
    .getElementById("barreRecherche")
    .classList.toggle("hidden", vue !== "tous");
  document.querySelectorAll(".btn-vue").forEach((btn) => {
    btn.className =
      "btn-vue px-6 py-2 rounded-full font-fira text-sm uppercase transition-all bg-white border-2 border-gray-300 text-gray-500 hover:bg-gray-200";
  });
  const map = {
    tous: "btn-vue px-6 py-2 rounded-full font-fira text-sm uppercase transition-all bg-[#1A2B49] text-white",
    en_cours:
      "btn-vue px-6 py-2 rounded-full font-fira text-sm uppercase transition-all bg-[#7CABD3] text-white",
    terminees:
      "btn-vue px-6 py-2 rounded-full font-fira text-sm uppercase transition-all bg-gray-500 text-white",
  };
  document.getElementById(`btn-vue-${vue}`).className = map[vue];
  appliquerFiltres();
}

function filtrerCategorie(cat) {
  categorieActuelle = cat;
  document.querySelectorAll(".btn-cat").forEach((b) => {
    b.className =
      "btn-cat px-5 py-2 rounded-full font-fira text-sm bg-white border-2 border-[#7CABD3] text-[#7CABD3] hover:bg-[#7CABD3] hover:text-white transition-all";
  });
  if (!cat)
    document.getElementById("cat-tous").className =
      "btn-cat px-5 py-2 rounded-full font-fira text-sm bg-[#1A2B49] text-white transition-all";
  appliquerFiltres();
}

function appliquerFiltres() {
  const recherche = (document.getElementById("inputRecherche")?.value || "")
    .toLowerCase()
    .trim();
  if (vueActuelle === "tous") {
    let filtered = [...tousServices];
    if (categorieActuelle)
      filtered = filtered.filter((s) => s.nom_categorie === categorieActuelle);
    if (recherche)
      filtered = filtered.filter(
        (s) =>
          s.nom?.toLowerCase().includes(recherche) ||
          s.description?.toLowerCase().includes(recherche) ||
          s.nom_categorie?.toLowerCase().includes(recherche),
      );
    renderServices(filtered);
  } else if (vueActuelle === "en_cours") {
    renderDemandes(
      mesDemandes.filter(
        (d) => d.statut === "en_attente" || d.statut === "accepte",
      ),
    );
  } else if (vueActuelle === "terminees") {
    renderDemandes(
      mesDemandes.filter((d) =>
        ["termine", "refuse", "annulee"].includes(d.statut),
      ),
    );
  }
}

function renderCategories() {
  const cats = [
    ...new Set(tousServices.map((s) => s.nom_categorie).filter(Boolean)),
  ].sort();
  const container = document.getElementById("filtresCat");
  container
    .querySelectorAll(".btn-cat:not(#cat-tous)")
    .forEach((b) => b.remove());
  cats.forEach((cat) => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.className =
      "btn-cat px-5 py-2 rounded-full font-fira text-sm bg-white border-2 border-[#7CABD3] text-[#7CABD3] hover:bg-[#7CABD3] hover:text-white transition-all";
    btn.onclick = () => {
      filtrerCategorie(cat);
      document.querySelectorAll(".btn-cat").forEach((b) => {
        b.className =
          "btn-cat px-5 py-2 rounded-full font-fira text-sm bg-white border-2 border-[#7CABD3] text-[#7CABD3] hover:bg-[#7CABD3] hover:text-white transition-all";
      });
      btn.className =
        "btn-cat px-5 py-2 rounded-full font-fira text-sm bg-[#7CABD3] text-white transition-all";
    };
    container.appendChild(btn);
  });
}

function renderServices(services) {
  const container = document.getElementById("servicesList");
  if (!services.length) {
    container.innerHTML = `
      <div class="text-center col-span-3 py-16">
        <iconify-icon icon="mdi:briefcase-off" class="text-5xl text-gray-300 mb-3 block"></iconify-icon>
        <p class="text-gray-400 italic">Aucun service trouve.</p>
      </div>`;
    return;
  }
  container.innerHTML = services
    .map((s) => {
      const nbDemandes = mesDemandes.filter(
        (d) =>
          d.id_service === s.id &&
          (d.statut === "en_attente" || d.statut === "accepte"),
      ).length;
      const badge =
        nbDemandes > 0
          ? `<span class="text-xs font-fira text-[#7CABD3] bg-[#7CABD3]/10 px-2 py-0.5 rounded-full">${nbDemandes} en cours</span>`
          : "";
      return `
    <div class="group bg-white p-8 rounded-[40px] border-2 border-transparent hover:border-[#7CABD3] hover:shadow-xl transition-all duration-500">
      <div class="flex justify-between items-start mb-4 flex-wrap gap-2">
        <div class="flex items-center gap-2 flex-wrap">
          <span class="bg-[#7CABD3]/10 text-[#7CABD3] text-sm font-fira px-3 py-1 rounded-full">${esc(s.nom_categorie || "Service")}</span>
          ${badge}
        </div>
        <span class="font-fira text-[#1A2B49] text-lg">${s.prix_reference ? s.prix_reference + " €/h" : "Sur devis"}</span>
      </div>
      <h4 class="font-fira text-[#1A2B49] text-2xl mb-3">${esc(s.nom)}</h4>
      <p class="text-base text-gray-400 mb-6 leading-relaxed line-clamp-2">${esc(s.description || "")}</p>
      <button onclick="ouvrirOverlay(${s.id}, '${esc(s.nom)}')"
        class="w-full py-3 bg-[#1A2B49] text-white rounded-full font-fira text-sm uppercase hover:bg-[#7CABD3] transition-all">
        <iconify-icon icon="mdi:account-search" class="mr-1"></iconify-icon>
        Voir les prestataires
      </button>
    </div>`;
    })
    .join("");
}

async function ouvrirOverlay(idService, nomService) {
  document.getElementById("overlayServiceTitre").textContent = nomService;
  document.getElementById("overlayNbPros").textContent = "Chargement...";
  document.getElementById("listePros").innerHTML =
    `<p class="text-gray-400 italic text-center py-8">Chargement...</p>`;
  document.getElementById("panelPro").innerHTML = `
    <div class="flex-1 flex items-center justify-center text-center text-gray-300">
      <div>
        <iconify-icon icon="mdi:account-circle" class="text-8xl mb-4 block"></iconify-icon>
        <p class="font-fira uppercase tracking-widest text-sm">Selectionnez un prestataire</p>
      </div>
    </div>`;
  document.getElementById("overlayPrestataires").classList.remove("hidden");

  try {
    const [resOffres, resRef] = await Promise.all([
      fetch(
        `${API_BASE}/admin/offre_prestataire/get_by_service?id_service=${idService}`,
      ),
      fetch(`${API_BASE}/admin/referencement/get_actifs`),
    ]);
    offresActuelles = await resOffres.json();
    if (!Array.isArray(offresActuelles)) offresActuelles = [];
    const refActifs = await resRef.json();
    idsProsRef = Array.isArray(refActifs) ? refActifs.map((r) => r.id_pro) : [];
    document.getElementById("overlayNbPros").textContent =
      `${offresActuelles.length} prestataire${offresActuelles.length > 1 ? "s" : ""} disponible${offresActuelles.length > 1 ? "s" : ""}`;
    renderPrestataires();
  } catch {
    document.getElementById("listePros").innerHTML =
      `<p class="text-red-400 text-center">Erreur de chargement.</p>`;
  }
}

function fermerOverlay() {
  document.getElementById("overlayPrestataires").classList.add("hidden");
  offresActuelles = [];
  proSelectionne = null;
}

function renderPrestataires() {
  const container = document.getElementById("listePros");
  const tri = document.getElementById("triPro").value;
  let offres = [...offresActuelles];

  offres.sort((a, b) => {
    const aRef = idsProsRef.includes(a.id_pro) ? 1 : 0;
    const bRef = idsProsRef.includes(b.id_pro) ? 1 : 0;
    if (bRef !== aRef) return bRef - aRef;
    if (tri === "note") return (b.note_moyenne || 0) - (a.note_moyenne || 0);
    if (tri === "prix_asc") return a.prix_personnalise - b.prix_personnalise;
    if (tri === "prix_desc") return b.prix_personnalise - a.prix_personnalise;
    return 0;
  });

  if (!offres.length) {
    container.innerHTML = `
      <div class="text-center py-8">
        <iconify-icon icon="mdi:account-off" class="text-4xl text-gray-300 mb-2 block"></iconify-icon>
        <p class="text-gray-400 italic">Aucun prestataire disponible.</p>
      </div>`;
    return;
  }

  container.innerHTML = offres
    .map((o) => {
      const moy = Number(o.note_moyenne) || 0;
      const noteStars =
        moy > 0
          ? `${"★".repeat(Math.round(moy))}${"☆".repeat(5 - Math.round(moy))} (${moy.toFixed(1)})`
          : "☆☆☆☆☆";
      const demandeActive = mesDemandes.find(
        (d) =>
          d.id_offre === o.id_offre &&
          (d.statut === "en_attente" || d.statut === "accepte"),
      );
      const isSelected = proSelectionne?.id_offre === o.id_offre;
      const isSponsored = idsProsRef.includes(o.id_pro);

      return `
    <div onclick="selectionnerPro(${o.id_offre})"
      class="cursor-pointer p-4 rounded-[20px] border-2 mb-3 transition-all duration-200
        ${isSelected ? "border-[#7CABD3] bg-[#7CABD3]/5" : isSponsored ? "border-[#FCE297] bg-[#FCE297]/5" : "border-gray-100 bg-white hover:border-[#7CABD3]"}">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 ${isSponsored ? "bg-[#FCE297]/30" : "bg-[#7CABD3]/10"} rounded-full flex items-center justify-center flex-shrink-0">
          <iconify-icon icon="mdi:account" class="text-2xl ${isSponsored ? "text-[#1A2B49]" : "text-[#7CABD3]"}"></iconify-icon>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <p class="font-fira text-[#1A2B49] text-base">${esc(o.prenom_pro)} ${esc(o.nom_pro)}</p>
            ${isSponsored ? `<span class="text-xs bg-[#FCE297] text-[#1A2B49] px-2 py-0.5 rounded-full font-fira"><iconify-icon icon="mdi:star-circle"></iconify-icon> Sponsorise</span>` : ""}
            ${demandeActive ? `<span class="text-xs font-fira text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full">En cours</span>` : ""}
          </div>
          <p class="text-sm text-gray-400">${esc(o.nom_entreprise || "Independant")}</p>
          <div class="flex items-center justify-between mt-1">
            <span class="text-yellow-400 text-sm">${noteStars}</span>
            <span class="font-fira text-[#1A2B49] text-sm">${Number(o.prix_personnalise).toFixed(2)} €/h</span>
          </div>
        </div>
      </div>
    </div>`;
    })
    .join("");
}

async function selectionnerPro(idOffre) {
  proSelectionne = offresActuelles.find((o) => o.id_offre === idOffre);
  renderPrestataires();
  const panel = document.getElementById("panelPro");
  panel.innerHTML = `<p class="text-gray-400 italic text-center py-8">Chargement du profil...</p>`;

  try {
    const o = proSelectionne;
    const isSponsored = idsProsRef.includes(o.id_pro);
    const [resInter, resPlanning] = await Promise.all([
      fetch(`${API_BASE}/admin/intervention/get`),
      fetch(`${API_BASE}/admin/planning_pro/get`),
    ]);
    const allInter = await resInter.json();
    const idsInterPro = Array.isArray(allInter)
      ? allInter.filter((i) => i.id_pro === o.id_pro).map((i) => Number(i.id))
      : [];
    const resAvis = await fetch(`${API_BASE}/admin/note_avis/get`);
    const allAvis = await resAvis.json();
    const avisPro = Array.isArray(allAvis)
      ? allAvis
          .filter(
            (a) =>
              a.id_intervention != null &&
              idsInterPro.includes(Number(a.id_intervention)),
          )
          .sort(
            (a, b) =>
              new Date(b.date_publication) - new Date(a.date_publication),
          )
          .slice(0, 5)
      : [];
    const allPlanning = await resPlanning.json();
    const planningPro = Array.isArray(allPlanning)
      ? allPlanning.filter((p) => p.id_pro === o.id_pro && p.est_actif)
      : [];
    const moyenneCalculee = avisPro.length
      ? avisPro.reduce((s, a) => s + (a.note || 0), 0) / avisPro.length
      : 0;
    const noteAffichee =
      moyenneCalculee > 0
        ? `${"★".repeat(Math.round(moyenneCalculee))}${"☆".repeat(5 - Math.round(moyenneCalculee))} (${moyenneCalculee.toFixed(1)})`
        : "Pas encore note";
    const JOURS = [
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
      "Dimanche",
    ];
    const planningHtml = planningPro.length
      ? `<div class="space-y-2">${planningPro
          .sort((a, b) => (a.jour_semaine ?? 0) - (b.jour_semaine ?? 0))
          .map(
            (p) => `
        <div class="flex items-center justify-between bg-[#7CABD3]/5 px-4 py-2 rounded-[15px]">
          <span class="font-fira text-[#1A2B49] text-sm">${JOURS[(p.jour_semaine ?? 1) - 1]}</span>
          <span class="font-fira text-[#7CABD3] text-sm">${parseHeure(p.heure_debut)} → ${parseHeure(p.heure_fin)}</span>
        </div>`,
          )
          .join("")}</div>`
      : `<p class="text-gray-300 italic text-sm">Aucune disponibilite renseignee.</p>`;
    const avisHtml = avisPro.length
      ? avisPro
          .map(
            (a) => `
        <div class="border-b border-gray-100 pb-3 last:border-0">
          <div class="flex justify-between items-center">
            <span class="text-yellow-400 text-sm">${"★".repeat(a.note)}${"☆".repeat(5 - a.note)}</span>
            <span class="text-gray-300 text-xs font-fira">${(a.date_publication || "").split("T")[0]}</span>
          </div>
          ${a.commentaire ? `<p class="text-gray-500 text-sm italic mt-1">"${esc(a.commentaire)}"</p>` : ""}
        </div>`,
          )
          .join("")
      : `<p class="text-gray-300 italic text-sm">Aucun avis pour le moment.</p>`;

    panel.innerHTML = `
      <div class="space-y-6">
        <div class="flex items-center gap-4">
          <div class="w-20 h-20 ${isSponsored ? "bg-[#FCE297]/20" : "bg-[#7CABD3]/10"} rounded-full flex items-center justify-center flex-shrink-0">
            <iconify-icon icon="mdi:account" class="text-4xl ${isSponsored ? "text-[#1A2B49]" : "text-[#7CABD3]"}"></iconify-icon>
          </div>
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <h4 class="font-fira text-[#1A2B49] text-2xl">${esc(o.prenom_pro)} ${esc(o.nom_pro)}</h4>
              ${isSponsored ? `<span class="text-xs bg-[#FCE297] text-[#1A2B49] px-2 py-1 rounded-full font-fira"><iconify-icon icon="mdi:star-circle"></iconify-icon> Sponsorise</span>` : ""}
            </div>
            <p class="text-gray-400 text-sm">${esc(o.nom_entreprise || "Independant")}</p>
            <p class="text-yellow-400 text-base mt-1">${noteAffichee}</p>
          </div>
        </div>
        <div class="bg-[#1A2B49] text-white px-6 py-4 rounded-[20px]">
          <p class="font-fira uppercase text-xs tracking-widest opacity-70">Tarif</p>
          <p class="font-fira text-3xl mt-1">${Number(o.prix_personnalise).toFixed(2)} €/h</p>
        </div>
        ${o.bio ? `<div><p class="font-fira uppercase text-xs tracking-widest text-gray-400 mb-2">A propos</p><p class="text-gray-500 text-base leading-relaxed">${esc(o.bio)}</p></div>` : ""}
        <div>
          <p class="font-fira uppercase text-xs tracking-widest text-gray-400 mb-3"><iconify-icon icon="mdi:clock-outline" class="mr-1"></iconify-icon>Disponibilites</p>
          ${planningHtml}
        </div>
        <div>
          <p class="font-fira uppercase text-xs tracking-widest text-gray-400 mb-3"><iconify-icon icon="mdi:star" class="mr-1"></iconify-icon>Derniers avis</p>
          ${avisHtml}
        </div>
        <button onclick="choisirPrestataire(${o.id_offre}, '${esc(o.prenom_pro)} ${esc(o.nom_pro)}', ${o.prix_personnalise})"
          class="w-full py-4 bg-[#7CABD3] text-white rounded-full font-fira uppercase hover:bg-[#1A2B49] transition-all">
          <iconify-icon icon="mdi:calendar-plus" class="mr-2"></iconify-icon>
          Faire une demande
        </button>
      </div>`;
  } catch (e) {
    panel.innerHTML = `<p class="text-red-400 text-center">Erreur de chargement.</p>`;
  }
}

async function choisirPrestataire(idOffre, nomPro, prix) {
  selectedOffreId = idOffre;
  const offre = offresActuelles.find((o) => o.id_offre === idOffre);

  document.getElementById("modalDemandeTitre").textContent =
    "Demande de service";
  document.getElementById("modalDemandePro").textContent = nomPro;
  document.getElementById("modalDemandePrix").textContent =
    Number(prix).toFixed(2) + " €/h";
  document.getElementById("messageDemande").value = "";
  dateSelectionnee = null;
  creneauSelectionne = null;
  currentMois = new Date();

  document.getElementById("etapeJour").classList.remove("hidden");
  document.getElementById("etapeCreneau").classList.add("hidden");
  document.getElementById("etapeMessage").classList.add("hidden");

  const dejaEnCours = mesDemandes.find(
    (d) =>
      d.id_offre === idOffre &&
      (d.statut === "en_attente" || d.statut === "accepte"),
  );
  document
    .getElementById("warningDemande")
    .classList.toggle("hidden", !dejaEnCours);

  try {
    const res = await fetch(`${API_BASE}/admin/planning_pro/get`);
    const all = await res.json();
    planningProSelectionne = Array.isArray(all)
      ? all.filter((p) => p.id_pro === offre?.id_pro && p.est_actif)
      : [];
  } catch {
    planningProSelectionne = [];
  }

  renderCalendarMini();

  const modal = document.getElementById("modalDemande");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  setTimeout(() => modal.classList.remove("opacity-0"), 10);
}

function getJourSemaineISO(date) {
  const d = date.getDay();
  return d === 0 ? 7 : d;
}

function isJourDispo(date) {
  const jourISO = getJourSemaineISO(date);
  return planningProSelectionne.some((p) => p.jour_semaine === jourISO);
}

function renderCalendarMini() {
  document.getElementById("moisLabel").textContent =
    `${MOIS_LABELS[currentMois.getMonth()]} ${currentMois.getFullYear()}`;
  const container = document.getElementById("calendarMini");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let html = JOURS_MINI.map(
    (j) =>
      `<div class="text-center text-xs text-gray-400 font-fira py-1">${j}</div>`,
  ).join("");

  const premierJour = new Date(
    currentMois.getFullYear(),
    currentMois.getMonth(),
    1,
  );
  const jourDebut = getJourSemaineISO(premierJour) - 1;
  const nbJours = new Date(
    currentMois.getFullYear(),
    currentMois.getMonth() + 1,
    0,
  ).getDate();

  for (let i = 0; i < jourDebut; i++) html += `<div></div>`;

  for (let j = 1; j <= nbJours; j++) {
    const date = new Date(currentMois.getFullYear(), currentMois.getMonth(), j);
    const passe = date < today;
    const dispo = isJourDispo(date);
    const isSelected =
      dateSelectionnee &&
      date.toDateString() === dateSelectionnee.toDateString();

    let css =
      "text-center text-sm py-1.5 rounded-full font-fira cursor-default ";
    if (passe || !dispo) css += "text-gray-200";
    else if (isSelected) css += "bg-[#1A2B49] text-white cursor-pointer";
    else
      css +=
        "bg-[#7CABD3]/10 text-[#7CABD3] hover:bg-[#7CABD3] hover:text-white cursor-pointer transition-all";

    const onclick =
      !passe && dispo
        ? `onclick="selectionnerJour(${date.getFullYear()}, ${date.getMonth()}, ${j})"`
        : "";
    html += `<div class="${css}" ${onclick}>${j}</div>`;
  }

  container.innerHTML = html;
}

function moisPrecedent() {
  currentMois = new Date(
    currentMois.getFullYear(),
    currentMois.getMonth() - 1,
    1,
  );
  renderCalendarMini();
}

function moisSuivant() {
  currentMois = new Date(
    currentMois.getFullYear(),
    currentMois.getMonth() + 1,
    1,
  );
  renderCalendarMini();
}

function selectionnerJour(year, month, day) {
  dateSelectionnee = new Date(year, month, day);
  renderCalendarMini();
  afficherCreneaux();
}

function afficherCreneaux() {
  const jourISO = getJourSemaineISO(dateSelectionnee);
  const planning = planningProSelectionne.filter(
    (p) => p.jour_semaine === jourISO,
  );

  const slots = [];
  planning.forEach((p) => {
    const debut = parseHeureToMin(p.heure_debut);
    const fin = parseHeureToMin(p.heure_fin);
    for (let t = debut; t + 60 <= fin; t += 60) slots.push(t);
  });

  const dateStr = dateSelectionnee.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  document.getElementById("jourSelectionneLabel").textContent = dateStr;

  const container = document.getElementById("creneauxList");
  if (!slots.length) {
    container.innerHTML = `<p class="text-gray-400 italic text-sm col-span-3">Aucun creneau disponible.</p>`;
  } else {
    container.innerHTML = slots
      .map((t) => {
        const hh = String(Math.floor(t / 60)).padStart(2, "0");
        const mm = String(t % 60).padStart(2, "0");
        const label = `${hh}:${mm}`;
        const isSelected = creneauSelectionne === label;
        return `
      <button onclick="selectionnerCreneau('${label}')"
        class="py-2 px-3 rounded-[15px] font-fira text-sm border-2 transition-all
               ${isSelected ? "bg-[#1A2B49] text-white border-[#1A2B49]" : "border-[#7CABD3] text-[#7CABD3] hover:bg-[#7CABD3] hover:text-white"}">
        ${label}
      </button>`;
      })
      .join("");
  }

  document.getElementById("etapeJour").classList.add("hidden");
  document.getElementById("etapeCreneau").classList.remove("hidden");
  document.getElementById("etapeMessage").classList.add("hidden");
}

function selectionnerCreneau(heure) {
  creneauSelectionne = heure;
  const dateStr = dateSelectionnee.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  document.getElementById("recapCreneau").innerHTML = `
    <iconify-icon icon="mdi:calendar-check" class="text-[#7CABD3] mr-2"></iconify-icon>
    <strong>${dateStr}</strong> a <strong>${heure}</strong>`;
  document.getElementById("etapeCreneau").classList.add("hidden");
  document.getElementById("etapeMessage").classList.remove("hidden");
}

function retourEtapeJour() {
  document.getElementById("etapeJour").classList.remove("hidden");
  document.getElementById("etapeCreneau").classList.add("hidden");
  document.getElementById("etapeMessage").classList.add("hidden");
}

function retourEtapeCreneau() {
  document.getElementById("etapeCreneau").classList.remove("hidden");
  document.getElementById("etapeMessage").classList.add("hidden");
}

function parseHeure(str) {
  if (!str) return "—";
  if (str.includes(" ")) return str.split(" ")[1].slice(0, 5);
  if (str.includes("T")) return str.split("T")[1].slice(0, 5);
  return str.slice(0, 5);
}

function parseHeureToMin(str) {
  if (!str) return 0;
  let h, m;
  if (str.includes("T")) {
    const time = str.split("T")[1];
    [h, m] = time.split(":").map(Number);
  } else if (str.includes(" ")) {
    [h, m] = str.split(" ")[1].split(":").map(Number);
  } else {
    [h, m] = str.split(":").map(Number);
  }
  return h * 60 + (m || 0);
}

function fermerModalDemande() {
  const modal = document.getElementById("modalDemande");
  modal.classList.add("opacity-0");
  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }, 300);
}

async function envoyerDemande() {
  if (!dateSelectionnee || !creneauSelectionne) {
    showToast("Choisissez un jour et un creneau.", "error");
    return;
  }

  const [hh, mm] = creneauSelectionne.split(":").map(Number);
  const dateHeure = new Date(dateSelectionnee);
  dateHeure.setHours(hh, mm, 0, 0);
  const dateISO = dateHeure.toISOString();

  const btn = document.getElementById("btnEnvoyerDemande");
  btn.disabled = true;
  btn.textContent = "Envoi...";

  try {
    const res = await fetch(`${API_BASE}/admin/demande_service/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_senior: userId,
        id_offre: selectedOffreId,
        date_souhaitee: dateISO,
        message: document.getElementById("messageDemande").value,
      }),
    });

    if (res.status === 409) {
      showToast("Vous avez deja une demande pour cette date.", "error");
      fermerModalDemande();
      return;
    }
    if (!res.ok) throw new Error();

    showToast("Demande envoyee !", "success");
    fermerModalDemande();
    fermerOverlay();
    await loadMesDemandes();
    appliquerFiltres();
  } catch {
    showToast("Erreur lors de l'envoi.", "error");
  } finally {
    btn.disabled = false;
    btn.textContent = "Envoyer la demande";
  }
}

function renderDemandes(demandes) {
  const container = document.getElementById("servicesList");
  if (!demandes.length) {
    const msg =
      vueActuelle === "en_cours"
        ? "Aucune demande en cours."
        : "Aucune demande terminee ou annulee.";
    const icon =
      vueActuelle === "en_cours"
        ? "mdi:clock-outline"
        : "mdi:check-circle-outline";
    container.innerHTML = `
      <div class="text-center col-span-3 py-16">
        <iconify-icon icon="${icon}" class="text-5xl text-gray-300 mb-3 block"></iconify-icon>
        <p class="text-gray-400 italic">${msg}</p>
      </div>`;
    return;
  }

  const statutLabels = {
    en_attente: {
      text: "En attente",
      color: "bg-orange-100 text-orange-600",
      icon: "mdi:clock-outline",
    },
    accepte: {
      text: "Accepte",
      color: "bg-emerald-100 text-emerald-700",
      icon: "mdi:check-circle",
    },
    termine: {
      text: "Termine",
      color: "bg-gray-100 text-gray-500",
      icon: "mdi:check-all",
    },
    refuse: {
      text: "Refuse",
      color: "bg-red-100 text-red-600",
      icon: "mdi:close-circle",
    },
    annulee: {
      text: "Annulee",
      color: "bg-gray-100 text-gray-400",
      icon: "mdi:cancel",
    },
  };

  container.innerHTML = demandes
    .map((d) => {
      const s = statutLabels[d.statut] || {
        text: d.statut,
        color: "bg-gray-100 text-gray-500",
        icon: "mdi:help",
      };
      const isTermine = ["termine", "refuse", "annulee"].includes(d.statut);
      const actions =
        d.statut === "en_attente"
          ? `
      <button onclick="annulerDemande(${d.id_demande})"
        class="px-4 py-2 bg-red-100 text-red-600 rounded-full font-fira text-sm uppercase hover:bg-red-600 hover:text-white transition-all">
        Annuler
      </button>`
          : "";
      const msgAnnulee =
        d.statut === "annulee"
          ? `<p class="text-gray-400 text-sm italic mt-2"><iconify-icon icon="mdi:information" class="mr-1"></iconify-icon>Demande expiree.</p>`
          : "";

      return `
    <div class="group bg-white p-8 rounded-[40px] border-2 ${isTermine ? "opacity-70 border-gray-200" : "border-transparent hover:border-[#7CABD3] hover:shadow-xl"} transition-all duration-500">
      <div class="flex justify-between items-start mb-4">
        <span class="bg-[#7CABD3]/10 text-[#7CABD3] text-sm font-fira px-3 py-1 rounded-full">${esc(d.nom_service)}</span>
        <span class="px-3 py-1 rounded-full font-fira text-sm ${s.color}">
          <iconify-icon icon="${s.icon}" class="mr-1"></iconify-icon>${s.text}
        </span>
      </div>
      <h4 class="font-fira text-[#1A2B49] text-2xl mb-3">${esc(d.nom_service)}</h4>
      <div class="space-y-1 mb-4">
        <p class="text-base text-gray-500"><iconify-icon icon="mdi:account" class="mr-1 text-[#7CABD3]"></iconify-icon>${esc(d.prenom_pro || "")} ${esc(d.nom_pro || "")}</p>
        <p class="text-base text-gray-500"><iconify-icon icon="mdi:calendar" class="mr-1 text-[#7CABD3]"></iconify-icon>Date souhaitee : ${esc((d.date_souhaitee || "").split("T")[0])}</p>
        <p class="text-base text-gray-500"><iconify-icon icon="mdi:currency-eur" class="mr-1 text-[#7CABD3]"></iconify-icon>${Number(d.prix_personnalise).toFixed(2)} €/h</p>
      </div>
      ${msgAnnulee}
      <div class="flex justify-end">${actions}</div>
    </div>`;
    })
    .join("");
}

async function annulerDemande(idDemande) {
  if (!confirm("Annuler cette demande ?")) return;
  try {
    const res = await fetch(
      `${API_BASE}/admin/demande_service/delete?id=${idDemande}`,
      { method: "DELETE" },
    );
    if (!res.ok) throw new Error();
    showToast("Demande annulee.", "success");
    await loadMesDemandes();
    appliquerFiltres();
  } catch {
    showToast("Erreur lors de l'annulation.", "error");
  }
}

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
