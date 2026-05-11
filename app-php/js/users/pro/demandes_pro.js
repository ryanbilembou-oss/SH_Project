const API_BASE = "http://172.16.90.10:8082";
const userId = Number(localStorage.getItem("id_user"));
const role = localStorage.getItem("role");

if (!userId || role !== "pro") {
  window.location.href = "/users/login.php";
}

let demandes = [];
let toutesLesDemandes = [];
let filtreCourant = "en_attente";
let demandeSelectionnee = null;
let monPlanning = [];
let maCommission = 15;

(async () => {
  await Promise.all([loadDemandes(), loadMonPlanning()]);
})();

async function loadMonPlanning() {
  try {
    const [resPlanning, resProfil] = await Promise.all([
      fetch(`${API_BASE}/admin/planning_pro/get`),
      fetch(`${API_BASE}/admin/profile_pro/getone?id=${userId}`),
    ]);
    const all = await resPlanning.json();
    monPlanning = Array.isArray(all)
      ? all.filter((p) => p.id_pro === userId && p.est_actif)
      : [];
    const profil = await resProfil.json();
    if (profil && profil.commission) {
      maCommission = Number(profil.commission);
    }
  } catch {
    monPlanning = [];
  }
}

async function loadDemandes() {
  const container = document.getElementById("demandesList");
  try {
    const res = await fetch(`${API_BASE}/admin/demande_service/get`);
    const all = await res.json();
    toutesLesDemandes = Array.isArray(all)
      ? all.filter((d) => d.id_pro === userId)
      : [];
    const expireesAnnulees = await annulerDemandesExpirees(toutesLesDemandes);
    if (expireesAnnulees) {
      const res2 = await fetch(`${API_BASE}/admin/demande_service/get`);
      const all2 = await res2.json();
      toutesLesDemandes = Array.isArray(all2)
        ? all2.filter((d) => d.id_pro === userId)
        : [];
    }
    filtrer(filtreCourant);
  } catch {
    container.innerHTML = emptyState(
      "exclamation-circle",
      "Erreur de chargement.",
    );
  }
}

async function annulerDemandesExpirees(demandes) {
  const now = new Date();
  const expirees = demandes.filter(
    (d) => d.statut === "en_attente" && new Date(d.date_souhaitee) < now,
  );
  if (!expirees.length) return false;
  await Promise.all(
    expirees.map((d) =>
      fetch(`${API_BASE}/admin/demande_service/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_demande: d.id_demande, statut: "annulee" }),
      }),
    ),
  );
  return true;
}

function filtrer(statut) {
  filtreCourant = statut;
  document.querySelectorAll(".filtre-btn").forEach((btn) => {
    btn.classList.remove(
      "bg-[#FCE297]",
      "text-[#1A2B49]",
      "bg-[#7CABD3]",
      "bg-red-400",
      "bg-gray-400",
      "text-white",
    );
  });
  const configs = {
    en_attente: {
      id: "filtre-en_attente",
      css: ["bg-[#FCE297]", "text-[#1A2B49]"],
    },
    accepte: { id: "filtre-accepte", css: ["bg-[#7CABD3]", "text-white"] },
    refuse: { id: "filtre-refuse", css: ["bg-red-400", "text-white"] },
    annulee: { id: "filtre-annulee", css: ["bg-gray-400", "text-white"] },
  };
  const c = configs[statut];
  if (c) document.getElementById(c.id)?.classList.add(...c.css);
  demandes = toutesLesDemandes.filter((d) => d.statut === statut);
  renderDemandes();
}

function renderDemandes() {
  const container = document.getElementById("demandesList");
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

  if (!demandes.length) {
    const labels = {
      en_attente: "en attente",
      accepte: "acceptee",
      refuse: "refusee",
      annulee: "annulee",
    };
    container.innerHTML = `
      <div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-gray-200 text-center">
        <iconify-icon icon="mdi:inbox-remove" class="text-4xl text-gray-300 mb-3 block"></iconify-icon>
        <p class="text-gray-400 italic">Aucune demande ${labels[filtreCourant] || ""}.</p>
      </div>`;
    return;
  }

  container.innerHTML = demandes
    .map((d) => {
      const date = new Date(d.date_souhaitee);
      const heure = !isNaN(date)
        ? date.toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "";
      const dateStr = isNaN(date)
        ? d.date_souhaitee
        : `${date.getDate()} ${mois[date.getMonth()]} ${date.getFullYear()} ${heure ? "a " + heure : ""}`;
      const datePassee = date < new Date();

      const statutConfig = {
        en_attente: {
          border: "border-[#FCE297]",
          bg: "bg-[#FCE297]",
          label: "",
          labelCss: "",
        },
        accepte: {
          border: "border-green-300",
          bg: "bg-green-100",
          label: "Acceptee",
          labelCss: "text-green-500",
        },
        refuse: {
          border: "border-red-300",
          bg: "bg-red-50",
          label: "Refusee",
          labelCss: "text-red-400",
        },
        annulee: {
          border: "border-gray-200",
          bg: "bg-gray-100",
          label: "Annulee",
          labelCss: "text-gray-400",
        },
      };
      const sc = statutConfig[d.statut] ?? statutConfig.en_attente;

      return `
    <div class="bg-white p-6 rounded-[40px] border-2 ${sc.border} hover:shadow-xl transition-all duration-300 flex items-center gap-5 ${d.statut === "annulee" ? "opacity-60" : ""}">
      <div class="flex-shrink-0 ${sc.bg} rounded-[20px] w-16 h-16 flex items-center justify-center">
        <iconify-icon icon="mdi:account-clock" class="text-3xl text-[#1A2B49]"></iconify-icon>
      </div>
      <div class="flex-1 min-w-0">
        <p class="font-fira uppercase text-[#1A2B49] text-xl">${esc(d.nom_service || "Service")}</p>
        <p class="text-gray-400 text-base mt-1">
          <iconify-icon icon="mdi:account" class="text-[#7CABD3]"></iconify-icon>
          ${esc(d.prenom_senior || "")} ${esc(d.nom_senior || "")}
        </p>
        <p class="${datePassee && d.statut === "en_attente" ? "text-red-400" : "text-gray-400"} text-base">
          <iconify-icon icon="mdi:calendar" class="text-[#7CABD3]"></iconify-icon>
          ${esc(dateStr)} ${datePassee && d.statut === "en_attente" ? "⚠️" : ""}
        </p>
        ${d.message ? `<p class="text-gray-300 text-sm mt-1 italic">"${esc(d.message)}"</p>` : ""}
      </div>
      <div class="flex-shrink-0 text-right flex flex-col items-end gap-3">
        <p class="font-fira text-[#1A2B49] text-lg">${Number(d.prix_personnalise).toFixed(2)} €/h</p>
        ${sc.label ? `<span class="font-fira text-xs uppercase tracking-widest ${sc.labelCss}">${sc.label}</span>` : ""}
        ${
          d.statut === "en_attente"
            ? `
        <div class="flex gap-2">
          <button onclick="ouvrirModalAccepter(${d.id_demande})"
            class="flex items-center gap-1 px-5 py-2 rounded-full bg-[#7CABD3] text-white font-fira uppercase text-sm hover:bg-[#1A2B49] transition-all">
            <iconify-icon icon="mdi:check"></iconify-icon> Accepter
          </button>
          <button onclick="refuserDemande(${d.id_demande})"
            class="flex items-center gap-1 px-5 py-2 rounded-full border-2 border-red-300 text-red-400 font-fira uppercase text-sm hover:bg-red-400 hover:text-white transition-all">
            <iconify-icon icon="mdi:close"></iconify-icon> Refuser
          </button>
        </div>`
            : ""
        }
      </div>
    </div>`;
    })
    .join("");
}

function getJourSemaine(dateStr) {
  const d = new Date(dateStr);
  const jsDay = d.getDay();
  return jsDay === 0 ? 7 : jsDay;
}

function parseHeure(str) {
  if (!str) return "";
  if (str.includes(" ")) return str.split(" ")[1].slice(0, 5);
  if (str.includes("T")) return str.split("T")[1].slice(0, 5);
  return str.slice(0, 5);
}

function calculerPrixModal() {
  const debut = document.getElementById("inputHeureDebut").value;
  const fin = document.getElementById("inputHeureFin").value;
  const el = document.getElementById("prixCalcule");
  if (!el || !debut || !fin || debut >= fin) return;
  const [hd, md] = debut.split(":").map(Number);
  const [hf, mf] = fin.split(":").map(Number);
  const duree = (hf * 60 + mf - (hd * 60 + md)) / 60;
  const prix = demandeSelectionnee?.prix_personnalise || 0;
  const montantHT = prix * duree;
  const montantTTC = montantHT * 1.2;
  el.textContent = `${duree.toFixed(1)}h — HT : ${montantHT.toFixed(2)} € — TTC : ${montantTTC.toFixed(2)} €`;
}

function ouvrirModalAccepter(idDemande) {
  demandeSelectionnee = demandes.find((d) => d.id_demande === idDemande);
  if (!demandeSelectionnee) return;
  const d = demandeSelectionnee;

  document.getElementById("modalAccepterSous").textContent =
    `${d.nom_service} — ${d.prenom_senior || ""} ${d.nom_senior || ""} — ${(d.date_souhaitee || "").split("T")[0]}`;
  document.getElementById("inputIdDemande").value = idDemande;
  document.getElementById("inputLieu").value = "";
  document.getElementById("inputBioIntervention").value = d.message || "";

  const jourDemande = getJourSemaine(d.date_souhaitee);
  const creneauJour = monPlanning.find((p) => p.jour_semaine === jourDemande);

  if (creneauJour) {
    const heureDebut = parseHeure(creneauJour.heure_debut) || "09:00";
    const duree = creneauJour.duree_intervention || 60;
    const [hd, md] = heureDebut.split(":").map(Number);
    const finMin = hd * 60 + md + duree;
    const heureFin = `${String(Math.floor(finMin / 60)).padStart(2, "0")}:${String(finMin % 60).padStart(2, "0")}`;

    document.getElementById("inputHeureDebut").value = heureDebut;
    document.getElementById("inputHeureFin").value = heureFin;
    document.getElementById("infoPlanning").textContent =
      `Creneau : ${heureDebut} → ${heureFin} (${duree} min)`;
    document.getElementById("infoPlanning").classList.remove("hidden");
  } else {
    document.getElementById("inputHeureDebut").value = "09:00";
    document.getElementById("inputHeureFin").value = "10:00";
    document.getElementById("infoPlanning").classList.add("hidden");
  }

  document.getElementById("inputHeureDebut").oninput = calculerPrixModal;
  document.getElementById("inputHeureFin").oninput = calculerPrixModal;
  calculerPrixModal();

  document.getElementById("modalAccepter").classList.remove("hidden");
}

function fermerModal() {
  document.getElementById("modalAccepter").classList.add("hidden");
  demandeSelectionnee = null;
}

async function confirmerAcceptation() {
  const d = demandeSelectionnee;
  if (!d) return;

  const heureDebut = document.getElementById("inputHeureDebut").value;
  const heureFin = document.getElementById("inputHeureFin").value;
  const lieu = document.getElementById("inputLieu").value.trim();
  const bio = document.getElementById("inputBioIntervention").value.trim();

  if (!heureDebut || !heureFin) {
    showToast("Renseignez les heures.", "error");
    return;
  }
  if (heureDebut >= heureFin) {
    showToast("L'heure de fin doit etre apres le debut.", "error");
    return;
  }
  if (!lieu) {
    showToast("Renseignez le lieu.", "error");
    return;
  }

  const dateBase = (d.date_souhaitee || "").split("T")[0].split(" ")[0];
  const dateHeureDebut = `${dateBase}T${heureDebut}:00`;
  const dateHeureFin = `${dateBase}T${heureFin}:00`;

  const [hd, md] = heureDebut.split(":").map(Number);
  const [hf, mf] = heureFin.split(":").map(Number);
  const dureeHeures = (hf * 60 + mf - (hd * 60 + md)) / 60;

  const montantHT = d.prix_personnalise * dureeHeures;
  const montantTTC = montantHT * 1.2;
  const commissionMontant = (montantHT * maCommission) / 100;

  try {
    const resInter = await fetch(`${API_BASE}/admin/intervention/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_pro: d.id_pro,
        id_senior: d.id_senior,
        id_service: d.id_service,
        bio_intervention: bio || null,
        date_heure_debut: dateHeureDebut,
        date_heure_fin: dateHeureFin,
        lieu,
        statut: "planifiee",
        commission_montant: commissionMontant,
        prix: montantHT,
        est_medical: false,
      }),
    });

    if (!resInter.ok && resInter.status !== 201) {
      showToast("Erreur creation intervention.", "error");
      return;
    }
    const dataInter = await resInter.json();

    await fetch(`${API_BASE}/admin/devis/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_pro: d.id_pro,
        id_senior: d.id_senior,
        id_service: d.id_service,
        id_intervention: dataInter.id,
        montant_ht: montantHT,
        montant_ttc: montantTTC,
        taux_commission: maCommission,
        date_validite: dateBase,
        statut: "en_attente",
      }),
    });

    await fetch(`${API_BASE}/admin/demande_service/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_demande: d.id_demande, statut: "accepte" }),
    });

    fermerModal();
    showToast("Intervention planifiee et devis cree !", "success");
    await loadDemandes();
  } catch {
    showToast("Erreur reseau.", "error");
  }
}

async function refuserDemande(idDemande) {
  if (!confirm("Refuser cette demande ?")) return;
  try {
    const res = await fetch(`${API_BASE}/admin/demande_service/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_demande: idDemande, statut: "refuse" }),
    });
    if (res.ok) {
      showToast("Demande refusee.", "success");
      await loadDemandes();
    } else showToast("Erreur.", "error");
  } catch {
    showToast("Erreur reseau.", "error");
  }
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
    type === "success" ? "✓" : type === "error" ? "✗" : "i";
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
