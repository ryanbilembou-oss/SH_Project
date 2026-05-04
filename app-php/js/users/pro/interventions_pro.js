const API_BASE = "http://localhost:8082";
const userId = Number(localStorage.getItem("id_user"));
const role = localStorage.getItem("role");

if (!userId || role !== "pro") {
  window.location.href = "/users/login.php";
}

let interventions = [];
let filtreCourant = "tous";

(async () => {
  await Promise.all([loadInterventions(), loadBadgeDemandes()]);
})();

async function loadBadgeDemandes() {
  try {
    const res = await fetch(`${API_BASE}/admin/demande_service/get`);
    const all = await res.json();
    const enAttente = Array.isArray(all)
      ? all.filter((d) => d.id_pro === userId && d.statut === "en_attente")
          .length
      : 0;
    const badge = document.getElementById("badgeDemandes");
    if (enAttente > 0) {
      badge.textContent = enAttente;
      badge.classList.remove("hidden");
    }
  } catch {}
}

async function loadInterventions() {
  const container = document.getElementById("interventionsList");
  try {
    const res = await fetch(`${API_BASE}/admin/intervention/get`);
    const all = await res.json();
    interventions = Array.isArray(all)
      ? all.filter((i) => i.id_pro === userId)
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

async function mettreAJourStatutsAuto() {
  const now = new Date();
  const updates = [];

  for (const i of interventions) {
    if (i.statut === "annulee" || i.statut === "terminee") continue;
    const debut = new Date(i.date_heure_debut);
    const fin = new Date(i.date_heure_fin);
    let nouveauStatut = null;

    if (fin < now) {
      nouveauStatut = "terminee";
    } else if (debut <= now && now <= fin && i.statut === "planifiee") {
      nouveauStatut = "en_cours";
    }

    if (nouveauStatut) {
      i.statut = nouveauStatut;
      updates.push(updateStatutAPI(i, nouveauStatut));
    }
  }

  if (updates.length) await Promise.all(updates);
}

async function updateStatutAPI(i, nouveauStatut) {
  try {
    await fetch(`${API_BASE}/admin/intervention/update`, {
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
    });
  } catch {}
}

function renderInterventions() {
  const container = document.getElementById("interventionsList");
  const filtrees =
    filtreCourant === "tous"
      ? interventions
      : interventions.filter((i) => i.statut === filtreCourant);

  if (!filtrees.length) {
    container.innerHTML = `
      <div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-gray-200 text-center">
        <iconify-icon icon="mdi:calendar-remove" class="text-4xl text-gray-300 mb-3 block"></iconify-icon>
        <p class="text-gray-400 italic">Aucune intervention${filtreCourant !== "tous" ? " avec ce statut" : ""}.</p>
      </div>`;
    return;
  }

  const mois = [
    "Jan",
    "Fév",
    "Mar",
    "Avr",
    "Mai",
    "Jun",
    "Jul",
    "Aoû",
    "Sep",
    "Oct",
    "Nov",
    "Déc",
  ];

  container.innerHTML = filtrees
    .map((i) => {
      const debut = new Date(i.date_heure_debut);
      const statutConfig = {
        planifiee: {
          css: "text-[#7CABD3] border-[#7CABD3]",
          label: "Planifiée",
          bg: "bg-[#7CABD3] text-white",
        },
        en_cours: {
          css: "text-[#1A2B49] border-[#FCE297]",
          label: "En cours",
          bg: "bg-[#FCE297] text-[#1A2B49]",
        },
        terminee: {
          css: "text-green-500 border-green-400",
          label: "Terminée",
          bg: "bg-green-400 text-white",
        },
        annulee: {
          css: "text-red-400 border-red-300",
          label: "Annulée",
          bg: "bg-red-300 text-white",
        },
      };
      const st = statutConfig[i.statut] || {
        css: "text-gray-400 border-gray-300",
        label: i.statut,
        bg: "bg-gray-300 text-white",
      };
      const peutAnnuler = i.statut !== "annulee" && i.statut !== "terminee";

      return `
      <div class="group bg-white p-6 rounded-[40px] border-2 border-transparent hover:border-[#7CABD3] hover:shadow-xl transition-all duration-300 flex items-center gap-5">

        <div class="flex-shrink-0 ${st.bg} rounded-[20px] w-20 text-center py-3">
          <p class="text-2xl font-fira leading-none">${debut.getDate()}</p>
          <p class="text-xs uppercase tracking-widest opacity-90">${mois[debut.getMonth()]}</p>
          <p class="text-xs mt-1 opacity-80">${debut.getFullYear()}</p>
        </div>

        <div class="flex-1 min-w-0">
          <p class="font-fira uppercase text-[#1A2B49] text-xl truncate">${esc(i.nom_service || "Intervention")}</p>
          <p class="text-gray-400 text-base mt-1">
            <iconify-icon icon="mdi:account" class="text-[#7CABD3]"></iconify-icon>
            ${esc(i.prenom_senior || "")} ${esc(i.nom_senior || "")}
          </p>
          <p class="text-gray-400 text-base">
            <iconify-icon icon="mdi:clock-outline" class="text-[#7CABD3]"></iconify-icon>
            ${formatHeure(i.date_heure_debut)} → ${formatHeure(i.date_heure_fin)}
          </p>
          <p class="text-gray-400 text-base">
            <iconify-icon icon="mdi:map-marker" class="text-[#7CABD3]"></iconify-icon>
            ${esc(i.lieu)}
          </p>
          ${i.bio_intervention ? `<p class="text-gray-300 text-sm mt-1 italic">"${esc(i.bio_intervention)}"</p>` : ""}
        </div>

        <div class="flex-shrink-0 text-right flex flex-col items-end gap-2">
          <p class="font-fira text-[#1A2B49] text-2xl font-bold">${Number(i.prix).toFixed(2)} €</p>
          <span class="font-fira text-xs uppercase tracking-widest border-b-2 pb-0.5 ${st.css}">${st.label}</span>
          ${
            peutAnnuler
              ? `
          <button onclick="annulerIntervention(${i.id})"
            class="mt-1 px-4 py-2 rounded-full border-2 border-red-300 text-red-400 font-fira uppercase text-xs hover:bg-red-400 hover:text-white transition-all">
            <iconify-icon icon="mdi:close"></iconify-icon> Annuler
          </button>`
              : ""
          }
        </div>
      </div>`;
    })
    .join("");
}

function filtrer(statut) {
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

async function annulerIntervention(idIntervention) {
  if (!confirm("Annuler cette intervention ?")) return;
  const i = interventions.find((x) => x.id === idIntervention);
  if (!i) return;
  try {
    const res = await fetch(`${API_BASE}/admin/intervention/update`, {
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
        statut: "annulee",
        commission_montant: i.commission_montant,
        prix: i.prix,
        est_medical: i.est_medical,
      }),
    });
    if (res.ok) {
      showToast("Intervention annulée.", "success");
      await loadInterventions();
    } else {
      showToast("Erreur lors de l'annulation.", "error");
    }
  } catch {
    showToast("Erreur réseau.", "error");
  }
}

function formatHeure(str) {
  if (!str) return "—";
  const d = new Date(str);
  if (!isNaN(d.getTime())) {
    return d.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Paris",
    });
  }
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
  const msg = document.getElementById("toastMsg");
  const icon = document.getElementById("toastIcon");
  msg.textContent = message;
  icon.textContent = type === "success" ? "✓" : type === "error" ? "✗" : "i";
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
