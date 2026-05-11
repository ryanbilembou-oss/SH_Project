const API_BASE = "http://172.16.90.10:8082";
const userId = Number(localStorage.getItem("id_user"));
const role = localStorage.getItem("role");

if (!userId || role !== "senior") {
  window.location.href = "/users/login.php";
}

let interventions = [];
let tousLesAvis = [];
let filtreCourant = "tous";
let categorieActuelle = null;
let noteSelectionnee = 0;
let interventionSelectionnee = null;
let litigeInterventionId = null;
let litigeProId = null;

(async () => {
  await Promise.all([loadInterventions(), loadAvis()]);
  renderCategories();
})();

let mesLitiges = [];

async function loadInterventions() {
  const container = document.getElementById("interventionsList");
  try {
    const [resInter, resLitiges] = await Promise.all([
      fetch(`${API_BASE}/admin/intervention/get`),
      fetch(
        `${API_BASE}/admin/litiges/get_by_user?id_user=${userId}&role=senior`,
      ),
    ]);
    const all = await resInter.json();
    const litiges = await resLitiges.json();
    mesLitiges = Array.isArray(litiges) ? litiges : [];
    interventions = Array.isArray(all)
      ? all
          .filter((i) => i.id_senior === userId)
          .sort(
            (a, b) =>
              new Date(b.date_heure_debut) - new Date(a.date_heure_debut),
          )
      : [];
    await mettreAJourStatutsAuto();
    renderInterventions();
  } catch {
    container.innerHTML = emptyState(
      "exclamation-circle",
      "Erreur de chargement.",
    );
  }
}

async function loadAvis() {
  try {
    const res = await fetch(`${API_BASE}/admin/note_avis/get`);
    const all = await res.json();
    tousLesAvis = Array.isArray(all) ? all : [];
  } catch {
    tousLesAvis = [];
  }
}

async function mettreAJourStatutsAuto() {
  const now = new Date();
  const updates = [];
  for (const i of interventions) {
    if (i.statut === "annulee" || i.statut === "terminee") continue;
    const debut = new Date(i.date_heure_debut);
    const fin = new Date(i.date_heure_fin);
    let nouveauStatut = null;
    if (fin < now) nouveauStatut = "terminee";
    else if (debut <= now && now <= fin && i.statut === "planifiee")
      nouveauStatut = "en_cours";
    if (nouveauStatut) {
      i.statut = nouveauStatut;
      updates.push(
        fetch(`${API_BASE}/admin/intervention/update`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: i.id,
            id_pro: i.id_pro,
            id_senior: i.id_senior,
            id_service: i.id_service,
            bio_intervention: i.bio_intervention,
            date_heure_debut: i.date_heure_debut,
            date_heure_fin: i.date_heure_fin,
            lieu: i.lieu,
            statut: nouveauStatut,
            commission_montant: i.commission_montant,
            prix: i.prix,
            est_medical: i.est_medical,
          }),
        }),
      );
    }
  }
  if (updates.length) await Promise.all(updates);
}

function renderCategories() {
  const cats = [
    ...new Set(interventions.map((i) => i.nom_service).filter(Boolean)),
  ].sort();
  const container = document.getElementById("filtresCatInter");
  container
    .querySelectorAll(".btn-cat-inter:not(#cat-inter-tous)")
    .forEach((b) => b.remove());
  cats.forEach((cat) => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.className =
      "btn-cat-inter px-5 py-2 rounded-full font-fira text-sm bg-white border-2 border-[#7CABD3] text-[#7CABD3] hover:bg-[#7CABD3] hover:text-white transition-all";
    btn.onclick = () => {
      filtrerCategorie(cat);
      document.querySelectorAll(".btn-cat-inter").forEach((b) => {
        b.className =
          "btn-cat-inter px-5 py-2 rounded-full font-fira text-sm bg-white border-2 border-[#7CABD3] text-[#7CABD3] hover:bg-[#7CABD3] hover:text-white transition-all";
      });
      btn.className =
        "btn-cat-inter px-5 py-2 rounded-full font-fira text-sm bg-[#7CABD3] text-white transition-all";
    };
    container.appendChild(btn);
  });
}

function filtrerCategorie(cat) {
  categorieActuelle = cat;
  if (!cat) {
    document.getElementById("cat-inter-tous").className =
      "btn-cat-inter px-5 py-2 rounded-full font-fira text-sm bg-[#1A2B49] text-white transition-all";
  }
  renderInterventions();
}

function filtrerStatut(statut) {
  filtreCourant = statut;
  document.querySelectorAll(".filtre-btn").forEach((btn) => {
    btn.classList.remove(
      "bg-[#1A2B49]",
      "text-white",
      "bg-[#7CABD3]",
      "bg-[#FCE297]",
      "bg-green-400",
      "bg-red-400",
    );
  });
  const configs = {
    tous: { id: "filtre-tous", css: ["bg-[#1A2B49]", "text-white"] },
    planifiee: { id: "filtre-planifiee", css: ["bg-[#7CABD3]", "text-white"] },
    en_cours: {
      id: "filtre-en_cours",
      css: ["bg-[#FCE297]", "text-[#1A2B49]"],
    },
    terminee: { id: "filtre-terminee", css: ["bg-green-400", "text-white"] },
    annulee: { id: "filtre-annulee", css: ["bg-red-400", "text-white"] },
  };
  const c = configs[statut];
  if (c) document.getElementById(c.id)?.classList.add(...c.css);
  renderInterventions();
}

function renderInterventions() {
  const container = document.getElementById("interventionsList");
  let filtrees =
    filtreCourant === "tous"
      ? interventions
      : interventions.filter((i) => i.statut === filtreCourant);
  if (categorieActuelle)
    filtrees = filtrees.filter((i) => i.nom_service === categorieActuelle);

  if (!filtrees.length) {
    container.innerHTML = `
      <div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-gray-200 text-center">
        <iconify-icon icon="mdi:calendar-remove" class="text-4xl text-gray-300 mb-3 block"></iconify-icon>
        <p class="text-gray-400 italic">Aucune intervention${filtreCourant !== "tous" ? " avec ce statut" : ""}${categorieActuelle ? " dans cette categorie" : ""}.</p>
      </div>`;
    return;
  }

  const mois = [
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

  container.innerHTML = filtrees
    .map((i) => {
      const debut = new Date(i.date_heure_debut);
      const statutConfig = {
        planifiee: {
          css: "text-[#7CABD3] border-[#7CABD3]",
          label: "Planifiee",
          bg: "bg-[#7CABD3] text-white",
        },
        en_cours: {
          css: "text-[#1A2B49] border-[#FCE297]",
          label: "En cours",
          bg: "bg-[#FCE297] text-[#1A2B49]",
        },
        terminee: {
          css: "text-green-500 border-green-400",
          label: "Terminee",
          bg: "bg-green-400 text-white",
        },
        annulee: {
          css: "text-red-400 border-red-300",
          label: "Annulee",
          bg: "bg-red-300 text-white",
        },
      };
      const st = statutConfig[i.statut] || {
        css: "text-gray-400 border-gray-300",
        label: i.statut,
        bg: "bg-gray-300 text-white",
      };
      const litigeExistant = mesLitiges.find((l) => l.id_intervention === i.id);
      const litigeBadge = litigeExistant
        ? `
<a href="/users/seniors/litiges.php" class="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-fira uppercase mt-1 hover:bg-orange-500 hover:text-white transition-all">
  <iconify-icon icon="mdi:alert-circle"></iconify-icon>
  Litige ${litigeExistant.statut_detail || litigeExistant.statut}
</a>`
        : "";

      let avisSection = "";
      if (i.statut === "terminee") {
        const avisExistant = tousLesAvis.find(
          (a) => Number(a.id_intervention) === Number(i.id),
        );
        if (avisExistant) {
          const note = avisExistant.note || 0;
          avisSection = `
        <div class="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2">
          <span class="text-[#FCE297] text-xl">${"★".repeat(note)}${"☆".repeat(5 - note)}</span>
          <span class="text-gray-400 text-sm font-fira italic">${avisExistant.commentaire ? `"${esc(avisExistant.commentaire)}"` : "Avis envoye"}</span>
        </div>`;
        } else {
          avisSection = `
        <div class="mt-3 pt-3 border-t border-gray-100">
          <button onclick="ouvrirModalAvis(${i.id}, '${esc(i.nom_service || "Intervention")}', '${esc(i.prenom_pro || "")} ${esc(i.nom_pro || "")}')"
            class="flex items-center gap-2 px-5 py-2 bg-[#FCE297] text-[#1A2B49] rounded-full font-fira uppercase text-sm hover:bg-[#1A2B49] hover:text-white transition-all">
            <iconify-icon icon="mdi:star"></iconify-icon> Laisser un avis
          </button>
        </div>`;
        }
      }

      const litigeSection =
        i.statut === "terminee" && !litigeExistant
          ? `
    <div class="mt-2">
      <button onclick="ouvrirModalLitige(${i.id}, ${i.id_pro})"
        class="flex items-center gap-2 px-5 py-2 bg-orange-50 text-orange-500 rounded-full font-fira uppercase text-sm hover:bg-orange-500 hover:text-white transition-all">
        <iconify-icon icon="mdi:alert-circle"></iconify-icon> Signaler un probleme
      </button>
    </div>`
          : "";

      const annulerSection =
        i.statut === "planifiee"
          ? `
    <div class="mt-3 pt-3 border-t border-gray-100">
      <button onclick="annulerIntervention(${i.id})"
        class="flex items-center gap-2 px-5 py-2 bg-red-50 text-red-500 rounded-full font-fira uppercase text-sm hover:bg-red-500 hover:text-white transition-all">
        <iconify-icon icon="mdi:close-circle"></iconify-icon> Annuler et se faire rembourser
      </button>
    </div>`
          : "";

      return `
    <div class="group bg-white p-6 rounded-[40px] border-2 border-transparent hover:border-[#7CABD3] hover:shadow-xl transition-all duration-300 flex gap-5">
      <div class="flex-shrink-0 ${st.bg} rounded-[20px] w-20 text-center py-3 h-fit">
        <p class="text-2xl font-fira leading-none">${debut.getDate()}</p>
        <p class="text-xs uppercase tracking-widest opacity-90">${mois[debut.getMonth()]}</p>
        <p class="text-xs mt-1 opacity-80">${debut.getFullYear()}</p>
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between gap-3">
          <p class="font-fira uppercase text-[#1A2B49] text-xl">${esc(i.nom_service || "Intervention")}</p>
          <span class="font-fira text-xs uppercase tracking-widest border-b-2 pb-0.5 flex-shrink-0 ${st.css}">${st.label}</span>
        </div>
        <p class="text-gray-400 text-base mt-1">
          <iconify-icon icon="mdi:account" class="text-[#7CABD3]"></iconify-icon>
          ${esc(i.prenom_pro || "")} ${esc(i.nom_pro || "")}
        </p>
        <p class="text-gray-400 text-base">
          <iconify-icon icon="mdi:clock-outline" class="text-[#7CABD3]"></iconify-icon>
          ${formatHeure(i.date_heure_debut)} → ${formatHeure(i.date_heure_fin)}
        </p>
        <p class="text-gray-400 text-base">
          <iconify-icon icon="mdi:map-marker" class="text-[#7CABD3]"></iconify-icon>
          ${esc(i.lieu)}
        </p>
        <p class="font-fira text-[#1A2B49] text-lg mt-1">${Number(i.prix).toFixed(2)} €</p>
        ${litigeBadge}
        ${annulerSection}
        ${avisSection}
        ${litigeSection}
      </div>
    </div>`;
    })
    .join("");
}

async function annulerIntervention(idIntervention) {
  if (
    !confirm("Annuler cette intervention ? Vous serez rembourse integralement.")
  )
    return;
  try {
    const res = await fetch(`${API_BASE}/admin/stripe/refund/intervention`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_intervention: idIntervention,
        id_senior: userId,
      }),
    });
    if (res.ok) {
      showToast("Intervention annulee. Remboursement en cours.", "success");
      await loadInterventions();
    } else {
      const data = await res.json();
      showToast(data.erreur || "Erreur lors de l'annulation.", "error");
    }
  } catch {
    showToast("Erreur reseau.", "error");
  }
}

function ouvrirModalAvis(idIntervention, nomService, nomPro) {
  interventionSelectionnee = idIntervention;
  noteSelectionnee = 0;
  document.getElementById("inputIdIntervention").value = idIntervention;
  document.getElementById("modalAvisSous").textContent =
    `${nomService} — ${nomPro}`;
  document.getElementById("inputCommentaire").value = "";
  updateEtoiles(0);
  document.getElementById("modalAvis").classList.remove("hidden");
}

function fermerModalAvis() {
  document.getElementById("modalAvis").classList.add("hidden");
  interventionSelectionnee = null;
  noteSelectionnee = 0;
}

function setNote(n) {
  noteSelectionnee = n;
  updateEtoiles(n);
}

function updateEtoiles(n) {
  for (let i = 1; i <= 5; i++) {
    const star = document.getElementById(`star-${i}`);
    star.classList.toggle("text-[#FCE297]", i <= n);
    star.classList.toggle("text-gray-200", i > n);
  }
}

async function envoyerAvis() {
  if (!noteSelectionnee) {
    showToast("Choisissez une note.", "error");
    return;
  }
  const commentaire = document.getElementById("inputCommentaire").value.trim();
  try {
    const res = await fetch(`${API_BASE}/admin/note_avis/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_intervention: interventionSelectionnee,
        note: noteSelectionnee,
        commentaire: commentaire || null,
      }),
    });
    if (res.status === 409) {
      fermerModalAvis();
      showToast("Vous avez deja note cette intervention.", "error");
      return;
    }
    if (res.ok || res.status === 201) {
      fermerModalAvis();
      showToast("Avis envoye ! Merci.", "success");
      await Promise.all([loadInterventions(), loadAvis()]);
    } else {
      showToast("Erreur lors de l'envoi.", "error");
    }
  } catch {
    showToast("Erreur reseau.", "error");
  }
}

function ouvrirModalLitige(idIntervention, idPro) {
  litigeInterventionId = idIntervention;
  litigeProId = idPro;
  document.getElementById("modalLitigeMotif").value = "";
  document.getElementById("modalLitige").classList.remove("hidden");
}

function fermerModalLitige() {
  document.getElementById("modalLitige").classList.add("hidden");
  litigeInterventionId = null;
  litigeProId = null;
}

async function envoyerLitige() {
  const motif = document.getElementById("modalLitigeMotif").value.trim();
  if (!motif) {
    showToast("Decrivez votre probleme.", "error");
    return;
  }
  try {
    const res = await fetch(`${API_BASE}/admin/litiges/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_intervention: litigeInterventionId,
        id_senior: userId,
        id_pro: litigeProId,
        motif,
        ouvert_par: "senior",
      }),
    });
    if (res.status === 409) {
      showToast("Un litige est deja ouvert pour cette intervention.", "error");
      fermerModalLitige();
      return;
    }
    if (!res.ok) throw new Error();
    showToast("Litige ouvert. L'admin va vous contacter.", "success");
    fermerModalLitige();
  } catch {
    showToast("Erreur lors de l'ouverture du litige.", "error");
  }
}

function formatHeure(str) {
  if (!str) return "—";
  const d = new Date(str);
  if (!isNaN(d.getTime()))
    return d.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Paris",
    });
  if (str.includes(" ")) return str.split(" ")[1].slice(0, 5);
  if (str.includes("T")) return str.split("T")[1].slice(0, 5);
  return str.slice(0, 5);
}

function emptyState(icon, text) {
  return `
    <div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-gray-200 text-center">
      <iconify-icon icon="mdi:${icon}" class="text-4xl text-gray-300 mb-3 block"></iconify-icon>
      <p class="text-gray-400 italic">${text}</p>
    </div>`;
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
