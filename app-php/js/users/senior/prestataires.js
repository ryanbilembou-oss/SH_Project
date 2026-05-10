const API_BASE = "http://localhost:8082";
const userId = Number(localStorage.getItem("id_user"));
const role = localStorage.getItem("role");

if (!userId || role !== "senior") window.location.href = "/users/login.php";

let tousLesPros = [];
let prosReferencies = [];
let toutesOffres = [];
let tousAvis = [];
let tousPlanning = [];
let toutesCategories = [];

(async () => {
  await chargerDonnees();
  appliquerFiltres();
})();

async function chargerDonnees() {
  try {
    const [resPros, resRef, resOffres, resAvis, resPlanning, resCats] =
      await Promise.all([
        fetch(`${API_BASE}/admin/profile_pro/get_with_users`),
        fetch(`${API_BASE}/admin/referencement/get_actifs`),
        fetch(`${API_BASE}/admin/offre_prestataire/get`),
        fetch(`${API_BASE}/admin/note_avis/get`),
        fetch(`${API_BASE}/admin/planning_pro/get`),
        fetch(`${API_BASE}/admin/service/categorie_service/get`),
      ]);

    const pros = await resPros.json();
    prosReferencies = await resRef.json();
    toutesOffres = await resOffres.json();
    tousAvis = await resAvis.json();
    tousPlanning = await resPlanning.json();
    toutesCategories = await resCats.json();

    tousLesPros = Array.isArray(pros)
      ? pros.filter((p) => p.statut_validation === "valide")
      : [];

    if (!Array.isArray(prosReferencies)) prosReferencies = [];
    if (!Array.isArray(toutesOffres)) toutesOffres = [];
    if (!Array.isArray(tousAvis)) tousAvis = [];
    if (!Array.isArray(tousPlanning)) tousPlanning = [];

    remplirCategories();
  } catch (e) {
    console.error(e);
    document.getElementById("prosList").innerHTML =
      `<p class="text-red-400 col-span-2 text-center italic">Erreur de chargement.</p>`;
  }
}

function remplirCategories() {
  const select = document.getElementById("filtreCategorie");
  if (!Array.isArray(toutesCategories)) return;
  toutesCategories.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c.id_categorie;
    opt.textContent = c.nom_categorie;
    select.appendChild(opt);
  });
}

function getPrixMin(idPro) {
  const offres = toutesOffres.filter((o) => o.id_pro === idPro);
  if (!offres.length) return null;
  return Math.min(...offres.map((o) => Number(o.prix_personnalise)));
}

function getNoteCalculee(idPro) {
  const pro = tousLesPros.find((p) => p.id_user === idPro);
  return pro?.note_moyenne || 0;
}

function estReference(idPro) {
  return prosReferencies.some((r) => r.id_pro === idPro);
}

function getOffresParCategorie(idPro) {
  const offres = toutesOffres.filter((o) => o.id_pro === idPro);
  const cats = new Set();
  offres.forEach((o) => {
    const cat = toutesCategories.find((c) => {
      const servicesRef = toutesOffres.filter((off) => off.id_pro === idPro);
      return false;
    });
  });
  return offres;
}

function appliquerFiltres() {
  const recherche = document
    .getElementById("filtreRecherche")
    .value.toLowerCase();
  const categorieId =
    Number(document.getElementById("filtreCategorie").value) || null;
  const noteMin = Number(document.getElementById("filtreNote").value);
  const prixMax = Number(document.getElementById("filtrePrix").value);
  const refOnly = document.getElementById("filtreRef").checked;
  const tri = document.getElementById("filtreTri").value;

  let filtres = tousLesPros.filter((p) => {
    const nom =
      `${p.prenom || ""} ${p.nom || ""} ${p.nom_entreprise || ""}`.toLowerCase();
    if (recherche && !nom.includes(recherche)) return false;

    const note = getNoteCalculee(p.id_user);
    if (note < noteMin) return false;

    const prixMin = getPrixMin(p.id_user);
    if (prixMin !== null && prixMin > prixMax) return false;

    if (refOnly && !estReference(p.id_user)) return false;

    if (categorieId) {
      const offres = toutesOffres.filter((o) => o.id_pro === p.id_user);
      if (!offres.length) return false;
    }

    return true;
  });

  filtres.sort((a, b) => {
    const aRef = estReference(a.id_user);
    const bRef = estReference(b.id_user);
    const aNote = getNoteCalculee(a.id_user);
    const bNote = getNoteCalculee(b.id_user);
    const aPrix = getPrixMin(a.id_user) || 0;
    const bPrix = getPrixMin(b.id_user) || 0;

    if (aRef && !bRef) return -1;
    if (!aRef && bRef) return 1;

    if (tri === "note") return bNote - aNote;
    if (tri === "prix_asc") return aPrix - bPrix;
    if (tri === "prix_desc") return bPrix - aPrix;
    return 0;
  });

  document.getElementById("nbResultats").textContent =
    `${filtres.length} prestataire${filtres.length > 1 ? "s" : ""} trouve${filtres.length > 1 ? "s" : ""}`;
  renderPros(filtres);
}

function renderPros(pros) {
  const container = document.getElementById("prosList");

  if (!pros.length) {
    container.innerHTML = `
      <div class="col-span-2 bg-white p-8 rounded-[40px] border-2 border-dashed border-gray-200 text-center">
        <iconify-icon icon="mdi:account-search" class="text-4xl text-gray-300 mb-3 block"></iconify-icon>
        <p class="text-gray-400 italic">Aucun prestataire pour ces criteres.</p>
      </div>`;
    return;
  }

  container.innerHTML = pros
    .map((p) => {
      const note = getNoteCalculee(p.id_user);
      const prixMin = getPrixMin(p.id_user);
      const ref = estReference(p.id_user);
      const etoiles = renderEtoiles(note);
      const offres = toutesOffres.filter((o) => o.id_pro === p.id_user);
      const nbOffres = offres.length;

      return `
    <div onclick="ouvrirProfil(${p.id_user})"
      class="card-pro bg-white p-6 rounded-[30px] border-2 ${ref ? "border-[#FCE297]" : "border-transparent"} hover:border-[#7CABD3] hover:shadow-xl cursor-pointer">
      <div class="flex items-start justify-between mb-4">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 bg-[#7CABD3]/10 rounded-full flex items-center justify-center flex-shrink-0">
            <iconify-icon icon="mdi:account-tie" class="text-3xl text-[#7CABD3]"></iconify-icon>
          </div>
          <div>
            <p class="font-fira text-[#1A2B49] text-xl">${esc(p.prenom || "")} ${esc(p.nom || "")}</p>
            <p class="text-gray-400 text-sm">${esc(p.nom_entreprise || "Independant")}</p>
          </div>
        </div>
        ${
          ref
            ? `<span class="bg-[#FCE297] text-[#1A2B49] text-xs px-3 py-1 rounded-full font-fira uppercase font-bold flex-shrink-0">
          <iconify-icon icon="mdi:star-circle"></iconify-icon> Sponsorisé
        </span>`
            : ""
        }
      </div>

      <div class="flex items-center gap-2 mb-3">
        <span class="text-[#FCE297] text-lg">${etoiles}</span>
        <span class="font-fira text-[#1A2B49] text-sm">${note > 0 ? note.toFixed(1) : "Nouveau"}</span>
      </div>

      <div class="flex items-center justify-between">
        <span class="text-gray-400 text-sm font-fira">${nbOffres} offre${nbOffres > 1 ? "s" : ""}</span>
        ${prixMin !== null ? `<span class="font-fira text-[#1A2B49] font-bold">a partir de ${prixMin.toFixed(2)} EUR</span>` : `<span class="text-gray-300 text-sm font-fira italic">Sur devis</span>`}
      </div>

      <div class="mt-4 pt-4 border-t border-gray-100 flex gap-2">
        <button onclick="event.stopPropagation(); contacterPro(${p.id_user}, '${esc(p.prenom || "")} ${esc(p.nom || "")}')"
          class="flex-1 py-2 bg-[#7CABD3]/10 text-[#7CABD3] rounded-full font-fira uppercase text-xs hover:bg-[#7CABD3] hover:text-white transition-all">
          <iconify-icon icon="mdi:message-text" class="mr-1"></iconify-icon> Contacter
        </button>
        <button onclick="event.stopPropagation(); ouvrirProfil(${p.id_user})"
          class="flex-1 py-2 bg-[#1A2B49]/5 text-[#1A2B49] rounded-full font-fira uppercase text-xs hover:bg-[#1A2B49] hover:text-white transition-all">
          <iconify-icon icon="mdi:eye" class="mr-1"></iconify-icon> Voir profil
        </button>
      </div>
    </div>`;
    })
    .join("");
}

async function ouvrirProfil(idPro) {
  document.getElementById("panelOverlay").classList.remove("hidden");
  document.getElementById("panelPro").style.transform = "translateX(0)";
  document.getElementById("panelContent").innerHTML = `
    <div class="flex items-center justify-center py-20">
      <iconify-icon icon="mdi:loading" class="text-4xl text-[#7CABD3] animate-spin"></iconify-icon>
    </div>`;

  const pro = tousLesPros.find((p) => p.id_user === idPro);
  if (pro)
    document.getElementById("panelNom").textContent =
      `${pro.prenom || ""} ${pro.nom || ""}`;

  try {
    const [resProfil, resAvisInter, resInter] = await Promise.all([
      fetch(`${API_BASE}/admin/profile_pro/getone?id=${idPro}`),
      fetch(`${API_BASE}/admin/note_avis/get`),
      fetch(`${API_BASE}/admin/intervention/get`),
    ]);

    const profil = await resProfil.json();
    const avisAll = await resAvisInter.json();
    const interAll = await resInter.json();

    const interPro = Array.isArray(interAll)
      ? interAll.filter((i) => i.id_pro === idPro).map((i) => i.id)
      : [];
    const avisPro = Array.isArray(avisAll)
      ? avisAll.filter((a) => interPro.includes(Number(a.id_intervention)))
      : [];

    const offres = toutesOffres.filter((o) => o.id_pro === idPro);
    const planning = tousPlanning.filter(
      (p) => p.id_pro === idPro && p.est_actif,
    );
    const ref = estReference(idPro);
    const note = getNoteCalculee(idPro);

    const joursLabels = {
      1: "Lundi",
      2: "Mardi",
      3: "Mercredi",
      4: "Jeudi",
      5: "Vendredi",
      6: "Samedi",
      7: "Dimanche",
    };

    document.getElementById("panelContent").innerHTML = `
      <div class="flex items-center gap-5 mb-8">
        <div class="w-20 h-20 bg-[#7CABD3]/10 rounded-full flex items-center justify-center">
          <iconify-icon icon="mdi:account-tie" class="text-5xl text-[#7CABD3]"></iconify-icon>
        </div>
        <div>
          <h4 class="font-fira text-[#1A2B49] text-3xl">${esc(profil.prenom || "")} ${esc(profil.nom || "")}</h4>
          <p class="text-gray-400">${esc(profil.nom_entreprise || "Independant")}</p>
          <div class="flex items-center gap-2 mt-1">
            <span class="text-[#FCE297]">${renderEtoiles(note)}</span>
            <span class="font-fira text-sm text-[#1A2B49]">${note > 0 ? note.toFixed(1) + " / 5" : "Nouveau"}</span>
            <span class="text-gray-300 text-sm">(${avisPro.length} avis)</span>
          </div>
          ${
            ref
              ? `<span class="inline-flex items-center gap-1 mt-1 bg-[#FCE297] text-[#1A2B49] text-xs px-3 py-1 rounded-full font-fira uppercase font-bold">
            <iconify-icon icon="mdi:star-circle"></iconify-icon> Sponsorisé
          </span>`
              : ""
          }
        </div>
      </div>

      ${
        profil.bio
          ? `
      <div class="bg-gray-50 rounded-[20px] p-5 mb-6">
        <p class="font-fira uppercase text-xs tracking-widest text-gray-400 mb-2">A propos</p>
        <p class="text-gray-600">${esc(profil.bio)}</p>
      </div>`
          : ""
      }

      <div class="flex gap-3 mb-8">
        <button onclick="contacterPro(${idPro}, '${esc(profil.prenom || "")} ${esc(profil.nom || "")}')"
          class="flex-1 py-3 bg-[#7CABD3] text-white rounded-full font-fira uppercase hover:bg-[#1A2B49] transition-all">
          <iconify-icon icon="mdi:message-text" class="mr-2"></iconify-icon> Contacter
        </button>
        <a href="/users/seniors/services.php"
          class="flex-1 py-3 bg-[#FCE297] text-[#1A2B49] rounded-full font-fira uppercase hover:bg-[#1A2B49] hover:text-white transition-all text-center">
          <iconify-icon icon="mdi:briefcase-plus" class="mr-2"></iconify-icon> Demander
        </a>
      </div>

      <div class="mb-8">
        <h5 class="font-fira uppercase text-[#1A2B49] text-lg mb-4">Ses offres (${offres.length})</h5>
        ${
          offres.length
            ? offres
                .map(
                  (o) => `
<div class="bg-white border-2 border-gray-100 rounded-[20px] p-4 mb-3 hover:border-[#7CABD3] transition-all cursor-pointer"
  onclick="demanderService(${idPro}, ${o.id_service || "null"})">
  <div class="flex justify-between items-start">
    <div class="flex-1">
      <p class="font-fira text-[#1A2B49]">${esc(o.titre || "Offre")}</p>
      ${o.bio ? `<p class="text-gray-400 text-sm mt-1">${esc(o.bio)}</p>` : ""}
    </div>
    <div class="flex items-center gap-3 ml-4 flex-shrink-0">
      <p class="font-fira text-[#1A2B49] font-bold">${Number(o.prix_personnalise).toFixed(2)} EUR</p>
      <span class="bg-[#7CABD3]/10 text-[#7CABD3] text-xs px-3 py-1 rounded-full font-fira uppercase hover:bg-[#7CABD3] hover:text-white transition-all">
        Demander
      </span>
    </div>
  </div>
</div>`,
                )
                .join("")
            : `<p class="text-gray-400 italic">Aucune offre disponible.</p>`
        }
      </div>

      <div class="mb-8">
        <h5 class="font-fira uppercase text-[#1A2B49] text-lg mb-4">Disponibilites</h5>
        ${
          planning.length
            ? `
        <div class="grid grid-cols-2 gap-3">
          ${planning
            .map(
              (p) => `
          <div class="bg-gray-50 rounded-[15px] p-3 flex justify-between items-center">
            <span class="font-fira text-[#1A2B49] text-sm">${joursLabels[p.jour_semaine] || "—"}</span>
            <span class="text-gray-400 text-xs">${formatHeurePlanning(p.heure_debut)} → ${formatHeurePlanning(p.heure_fin)}</span>
          </div>`,
            )
            .join("")}
        </div>`
            : `<p class="text-gray-400 italic">Planning non renseigne.</p>`
        }
      </div>

      <div>
        <h5 class="font-fira uppercase text-[#1A2B49] text-lg mb-4">Avis clients (${avisPro.length})</h5>
        ${
          avisPro.length
            ? avisPro
                .slice(0, 5)
                .map((a) => {
                  const note = a.note || 0;
                  const date = a.date_publication
                    ? new Date(a.date_publication).toLocaleDateString("fr-FR")
                    : "—";
                  return `
          <div class="bg-white border-2 border-gray-100 rounded-[20px] p-4 mb-3">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-[#FCE297]">${renderEtoiles(note)}</span>
              <span class="text-gray-300 text-xs font-fira">${date}</span>
            </div>
            ${a.commentaire ? `<p class="text-gray-600 text-sm italic">"${esc(a.commentaire)}"</p>` : ""}
          </div>`;
                })
                .join("")
            : `<p class="text-gray-400 italic">Aucun avis pour le moment.</p>`
        }
      </div>`;
  } catch (e) {
    console.error(e);
    document.getElementById("panelContent").innerHTML =
      `<p class="text-red-400 text-center">Erreur de chargement.</p>`;
  }
}

function fermerPanel() {
  document.getElementById("panelPro").style.transform = "translateX(100%)";
  document.getElementById("panelOverlay").classList.add("hidden");
}

function contacterPro(idPro, nom) {
  localStorage.setItem("msg_destinataire_id", idPro);
  localStorage.setItem("msg_destinataire_nom", nom);
  window.location.href = "/users/seniors/messagerie_senior.php";
}

function resetFiltres() {
  document.getElementById("filtreRecherche").value = "";
  document.getElementById("filtreCategorie").value = "";
  document.getElementById("filtreNote").value = 0;
  document.getElementById("noteVal").textContent = "0";
  document.getElementById("filtrePrix").value = 200;
  document.getElementById("prixVal").textContent = "200€";
  document.getElementById("filtreRef").checked = false;
  document.getElementById("filtreTri").value = "ref_note";
  appliquerFiltres();
}

function renderEtoiles(note) {
  const plein = Math.floor(note);
  const demi = note % 1 >= 0.5 ? 1 : 0;
  const vide = 5 - plein - demi;
  return "★".repeat(plein) + (demi ? "½" : "") + "☆".repeat(vide);
}

function formatHeurePlanning(str) {
  if (!str) return "—";
  if (str.includes("T")) return str.split("T")[1].slice(0, 5);
  if (str.includes(" ")) return str.split(" ")[1].slice(0, 5);
  return str.slice(0, 5);
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
function demanderService(idPro, idService) {
  localStorage.setItem("demande_id_pro", idPro);
  if (idService) localStorage.setItem("demande_id_service", idService);
  window.location.href = "/users/seniors/services.php";
}
