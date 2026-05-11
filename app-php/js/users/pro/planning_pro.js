const API_BASE = "http://172.16.90.10:8082";
const userId = Number(localStorage.getItem("id_user"));
const role = localStorage.getItem("role");

if (!userId || role !== "pro") {
  window.location.href = "/users/login.php";
}

let interventions = [];
let disponibilites = [];
let currentMonday = getMonday(new Date());

const JOURS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const JOURS_FULL = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];
const HEURES = Array.from({ length: 17 }, (_, i) => i + 7);

(async () => {
  await Promise.all([loadInterventions(), loadDisponibilites()]);
  renderCalendar();
  initNavigation();
})();

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

function parseHeure(str, fallback) {
  if (!str) return fallback;
  if (str.includes(" ")) return str.split(" ")[1].slice(0, 5);
  if (str.includes("T")) return str.split("T")[1].slice(0, 5);
  return str.slice(0, 5);
}

function getHeureDecimal(str) {
  if (!str) return 0;
  const h = formatHeure(str);
  if (h === "—") return 0;
  const [hh, mm] = h.split(":").map(Number);
  return hh + mm / 60;
}

function formatDate(date) {
  return date.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" });
}

function getDayFR(str) {
  const d = new Date(str);
  return d.toLocaleDateString("fr-FR", {
    timeZone: "Europe/Paris",
    day: "2-digit",
    month: "2-digit",
  });
}

function getMonday(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
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

async function loadInterventions() {
  try {
    const res = await fetch(`${API_BASE}/admin/intervention/get`);
    const all = await res.json();
    interventions = Array.isArray(all)
      ? all.filter((i) => i.id_pro === userId)
      : [];
  } catch {
    interventions = [];
  }
}

async function loadDisponibilites() {
  try {
    const res = await fetch(`${API_BASE}/admin/planning_pro/get`);
    const all = await res.json();
    disponibilites = Array.isArray(all)
      ? all.filter((p) => p.id_pro === userId)
      : [];
  } catch {
    disponibilites = [];
  }
  renderDisponibilites();
}

function updateWeekLabel() {
  const end = new Date(currentMonday);
  end.setDate(end.getDate() + 6);
  document.getElementById("weekLabel").textContent =
    `${formatDate(currentMonday)} — ${formatDate(end)}`;
}

function renderCalendar() {
  updateWeekLabel();
  const grid = document.getElementById("calendarGrid");
  const ROW_HEIGHT = 56;
  const START_HOUR = 7;

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(currentMonday);
    d.setDate(d.getDate() + i);
    return d;
  });

  let html = `<div style="display:grid; grid-template-columns:60px repeat(7,1fr); border-bottom:1px solid #f3f4f6;">`;
  html += `<div style="height:56px;"></div>`;
  days.forEach((d, i) => {
    const isToday = formatDate(d) === formatDate(new Date());
    html += `<div style="height:56px; display:flex; flex-direction:column; align-items:center; justify-content:center; border-left:1px solid #f3f4f6; ${isToday ? "background:#EFF6FF;" : ""}">
      <div style="font-size:13px; font-weight:700; color:#6b7280; font-family:'Fira Sans Condensed',sans-serif;">${JOURS[i]}</div>
      <div style="font-size:16px; font-weight:900; color:${isToday ? "#7CABD3" : "#1A2B49"}; font-family:'Fira Sans Condensed',sans-serif;">${formatDate(d)}</div>
    </div>`;
  });
  html += `</div>`;

  html += `<div style="display:grid; grid-template-columns:60px repeat(7,1fr); position:relative;">`;
  HEURES.forEach((h) => {
    html += `<div style="height:${ROW_HEIGHT}px; border-top:1px solid #f9fafb; display:flex; align-items:flex-start; padding-top:4px; padding-right:8px; justify-content:flex-end;">
      <span style="font-size:12px; color:#9ca3af; font-family:'Fira Sans Condensed',sans-serif;">${String(h).padStart(2, "0")}:00</span>
    </div>`;
    days.forEach((d) => {
      const isToday = formatDate(d) === formatDate(new Date());
      html += `<div style="height:${ROW_HEIGHT}px; border-top:1px solid #f9fafb; border-left:1px solid #f3f4f6; position:relative; ${isToday ? "background:#FAFEFF;" : ""}"></div>`;
    });
  });

  interventions.forEach((i) => {
    const jourIndex = days.findIndex(
      (d) => formatDate(d) === getDayFR(i.date_heure_debut),
    );
    if (jourIndex === -1) return;
    const debutH = getHeureDecimal(i.date_heure_debut);
    const finH = getHeureDecimal(i.date_heure_fin);
    if (debutH < START_HOUR) return;
    const top = (debutH - START_HOUR) * ROW_HEIGHT;
    const height = Math.max((finH - debutH) * ROW_HEIGHT, 30);
    html += `<div style="
      position:absolute; top:${top}px; height:${height}px;
      left:calc((100% - 60px) * ${jourIndex} / 7 + 60px + 2px);
      width:calc((100% - 60px) / 7 - 4px);
      background:#FCE297; border:2px solid #F5C842;
      border-radius:12px; padding:6px 8px; font-size:12px; overflow:hidden; z-index:10;">
      <div style="font-weight:900; color:#1A2B49; font-family:'Fira Sans Condensed',sans-serif;">${formatHeure(i.date_heure_debut)}</div>
      <div style="color:#1A2B49; font-size:11px; margin-top:2px; font-family:'Fira Sans Condensed',sans-serif;">${esc(i.bio_intervention || "Intervention")}</div>
      <div style="color:#6b7280; font-size:10px;">${esc(i.lieu || "")}</div>
    </div>`;
  });

  html += `</div>`;
  html += `<div style="display:flex; gap:16px; padding:16px 20px; border-top:2px solid #f3f4f6; font-size:14px; font-family:'Fira Sans Condensed',sans-serif;">
    <span style="display:flex; align-items:center; gap:6px; font-weight:700;">
      <span style="width:14px; height:14px; background:#FCE297; border:2px solid #F5C842; border-radius:4px; display:inline-block;"></span> Intervention
    </span>
  </div>`;

  grid.innerHTML = html;
}

function initNavigation() {
  document.getElementById("prevWeek").addEventListener("click", () => {
    currentMonday.setDate(currentMonday.getDate() - 7);
    renderCalendar();
  });
  document.getElementById("nextWeek").addEventListener("click", () => {
    currentMonday.setDate(currentMonday.getDate() + 7);
    renderCalendar();
  });
}

function renderDisponibilites() {
  const container = document.getElementById("disponibilitesList");

  if (!disponibilites.length) {
    container.innerHTML = `
      <div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-gray-200 text-center col-span-2">
        <iconify-icon icon="mdi:clock-remove" class="text-4xl text-gray-300 mb-3 block"></iconify-icon>
        <p class="text-gray-400 italic">Aucun créneau de disponibilité défini.</p>
      </div>`;
    return;
  }

  const sorted = [...disponibilites].sort((a, b) => {
    if ((a.jour_semaine ?? 0) !== (b.jour_semaine ?? 0))
      return (a.jour_semaine ?? 0) - (b.jour_semaine ?? 0);
    return (a.heure_debut ?? "").localeCompare(b.heure_debut ?? "");
  });

  container.innerHTML = sorted
    .map((p) => {
      const jourLabel = JOURS_FULL[(p.jour_semaine ?? 1) - 1] ?? "—";
      const actifCss = p.est_actif
        ? "border-[#7CABD3] bg-white"
        : "border-gray-200 bg-gray-50 opacity-60";
      const actifBadge = p.est_actif
        ? `<span class="text-xs font-fira uppercase text-[#7CABD3] border-b-2 border-[#7CABD3] pb-0.5">Actif</span>`
        : `<span class="text-xs font-fira uppercase text-gray-400 border-b-2 border-gray-300 pb-0.5">Inactif</span>`;

      return `
      <div class="group bg-white p-6 rounded-[40px] border-2 ${actifCss} hover:shadow-lg transition-all duration-300 flex items-center gap-4">
        <div class="bg-[#7CABD3] text-white rounded-[20px] px-5 py-3 text-center min-w-[90px]">
          <p class="font-fira uppercase text-sm">${jourLabel}</p>
        </div>
        <div class="flex-1">
          <p class="font-fira text-[#1A2B49] text-xl">
            ${esc(parseHeure(p.heure_debut, "—"))} → ${esc(parseHeure(p.heure_fin, "—"))}
          </p>
          <div class="mt-1">${actifBadge}</div>
        </div>
        <div class="flex gap-2">
          <button onclick="ouvrirModalEdition(${p.id_planning})"
            class="w-10 h-10 flex items-center justify-center rounded-full border-2 border-[#7CABD3] text-[#7CABD3] hover:bg-[#7CABD3] hover:text-white transition-all">
            <iconify-icon icon="mdi:pencil"></iconify-icon>
          </button>
          <button onclick="supprimerCreneau(${p.id_planning})"
            class="w-10 h-10 flex items-center justify-center rounded-full border-2 border-red-300 text-red-400 hover:bg-red-400 hover:text-white transition-all">
            <iconify-icon icon="mdi:delete"></iconify-icon>
          </button>
        </div>
      </div>`;
    })
    .join("");
}
function ouvrirModalAjout() {
  document.getElementById("modalTitre").textContent = "Ajouter un creneau";
  document.getElementById("inputIdPlanning").value = "";
  document.getElementById("inputJour").value = "1";
  document.getElementById("inputDebut").value = "09:00";
  document.getElementById("inputFin").value = "18:00";
  document.getElementById("inputDuree").value = "60";
  document.getElementById("inputPause").value = "0";
  document.getElementById("inputActif").checked = true;
  document.getElementById("modalCreneau").classList.remove("hidden");
}

function ouvrirModalEdition(idPlanning) {
  const p = disponibilites.find((d) => d.id_planning === idPlanning);
  if (!p) return;
  document.getElementById("modalTitre").textContent = "Modifier le creneau";
  document.getElementById("inputIdPlanning").value = p.id_planning;
  document.getElementById("inputJour").value = p.jour_semaine ?? 1;
  document.getElementById("inputDebut").value = parseHeure(
    p.heure_debut,
    "09:00",
  );
  document.getElementById("inputFin").value = parseHeure(p.heure_fin, "18:00");
  document.getElementById("inputDuree").value = p.duree_intervention || 60;
  document.getElementById("inputPause").value = p.pause_entre || 0;
  document.getElementById("inputActif").checked = p.est_actif;
  document.getElementById("modalCreneau").classList.remove("hidden");
}

async function sauvegarderCreneau() {
  const idPlanning = Number(document.getElementById("inputIdPlanning").value);
  const jour = Number(document.getElementById("inputJour").value);
  const debut = document.getElementById("inputDebut").value;
  const fin = document.getElementById("inputFin").value;
  const duree = Number(document.getElementById("inputDuree").value);
  const pause = Number(document.getElementById("inputPause").value);
  const actif = document.getElementById("inputActif").checked;

  if (!debut || !fin) {
    showToast("Remplissez les heures.", "error");
    return;
  }
  if (debut >= fin) {
    showToast("L'heure de fin doit etre apres le debut.", "error");
    return;
  }

  const debutMin = timeToMin(debut);
  const finMin = timeToMin(fin);

  if (finMin - debutMin < duree) {
    showToast(
      `La plage horaire est trop courte pour une intervention de ${duree} min.`,
      "error",
    );
    return;
  }

  const chevauchement = disponibilites.find((p) => {
    if (p.jour_semaine !== jour) return false;
    if (idPlanning > 0 && p.id_planning === idPlanning) return false;
    const pDebut = timeToMin(parseHeure(p.heure_debut, "00:00"));
    const pFin = timeToMin(parseHeure(p.heure_fin, "00:00"));
    return debutMin < pFin && finMin > pDebut;
  });

  if (chevauchement) {
    showToast(
      `Chevauchement avec un creneau existant le ${JOURS_FULL[jour - 1]}.`,
      "error",
    );
    return;
  }

  try {
    let res;
    if (idPlanning > 0) {
      res = await fetch(`${API_BASE}/admin/planning_pro/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_planning: idPlanning,
          jour_semaine: jour,
          heure_debut: debut,
          heure_fin: fin,
          duree_intervention: duree,
          pause_entre: pause,
          est_actif: actif,
        }),
      });
    } else {
      res = await fetch(`${API_BASE}/admin/planning_pro/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_pro: userId,
          jour_semaine: jour,
          heure_debut: debut,
          heure_fin: fin,
          duree_intervention: duree,
          pause_entre: pause,
          est_actif: actif,
        }),
      });
    }

    if (res.ok) {
      fermerModal();
      showToast(
        idPlanning > 0 ? "Creneau mis a jour !" : "Creneau ajoute !",
        "success",
      );
      await loadDisponibilites();
    } else {
      showToast("Erreur lors de la sauvegarde.", "error");
    }
  } catch {
    showToast("Erreur reseau.", "error");
  }
}

function renderDisponibilites() {
  const container = document.getElementById("disponibilitesList");

  if (!disponibilites.length) {
    container.innerHTML = `
      <div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-gray-200 text-center col-span-2">
        <iconify-icon icon="mdi:clock-remove" class="text-4xl text-gray-300 mb-3 block"></iconify-icon>
        <p class="text-gray-400 italic">Aucun creneau de disponibilite defini.</p>
      </div>`;
    return;
  }

  const sorted = [...disponibilites].sort((a, b) => {
    if ((a.jour_semaine ?? 0) !== (b.jour_semaine ?? 0))
      return (a.jour_semaine ?? 0) - (b.jour_semaine ?? 0);
    return (a.heure_debut ?? "").localeCompare(b.heure_debut ?? "");
  });

  container.innerHTML = sorted
    .map((p) => {
      const jourLabel = JOURS_FULL[(p.jour_semaine ?? 1) - 1] ?? "—";
      const actifCss = p.est_actif
        ? "border-[#7CABD3] bg-white"
        : "border-gray-200 bg-gray-50 opacity-60";
      const actifBadge = p.est_actif
        ? `<span class="text-xs font-fira uppercase text-[#7CABD3] border-b-2 border-[#7CABD3] pb-0.5">Actif</span>`
        : `<span class="text-xs font-fira uppercase text-gray-400 border-b-2 border-gray-300 pb-0.5">Inactif</span>`;
      const duree = p.duree_intervention || 60;
      const pause = p.pause_entre || 0;

      const debutMin = timeToMin(parseHeure(p.heure_debut, "09:00"));
      const finMin = timeToMin(parseHeure(p.heure_fin, "18:00"));
      const nbSlots = Math.floor((finMin - debutMin) / (duree + pause));

      return `
    <div class="group bg-white p-6 rounded-[40px] border-2 ${actifCss} hover:shadow-lg transition-all duration-300 flex items-center gap-4">
      <div class="bg-[#7CABD3] text-white rounded-[20px] px-5 py-3 text-center min-w-[90px]">
        <p class="font-fira uppercase text-sm">${jourLabel}</p>
      </div>
      <div class="flex-1">
        <p class="font-fira text-[#1A2B49] text-xl">${esc(parseHeure(p.heure_debut, "—"))} → ${esc(parseHeure(p.heure_fin, "—"))}</p>
        <div class="flex gap-3 mt-1 flex-wrap">
          ${actifBadge}
          <span class="text-xs text-gray-400 font-fira">${duree} min / intervention</span>
          ${pause > 0 ? `<span class="text-xs text-gray-400 font-fira">${pause} min de pause</span>` : ""}
          <span class="text-xs text-[#7CABD3] font-fira">${nbSlots} creneau${nbSlots > 1 ? "x" : ""} disponible${nbSlots > 1 ? "s" : ""}</span>
        </div>
      </div>
      <div class="flex gap-2">
        <button onclick="ouvrirModalEdition(${p.id_planning})"
          class="w-10 h-10 flex items-center justify-center rounded-full border-2 border-[#7CABD3] text-[#7CABD3] hover:bg-[#7CABD3] hover:text-white transition-all">
          <iconify-icon icon="mdi:pencil"></iconify-icon>
        </button>
        <button onclick="supprimerCreneau(${p.id_planning})"
          class="w-10 h-10 flex items-center justify-center rounded-full border-2 border-red-300 text-red-400 hover:bg-red-400 hover:text-white transition-all">
          <iconify-icon icon="mdi:delete"></iconify-icon>
        </button>
      </div>
    </div>`;
    })
    .join("");
}

async function supprimerCreneau(idPlanning) {
  if (!confirm("Supprimer ce créneau ?")) return;
  try {
    const res = await fetch(
      `${API_BASE}/admin/planning_pro/delete?id=${idPlanning}`,
      {
        method: "DELETE",
      },
    );
    if (res.ok) {
      showToast("Créneau supprimé.", "success");
      await loadDisponibilites();
    } else {
      showToast("Erreur lors de la suppression.", "error");
    }
  } catch {
    showToast("Erreur réseau.", "error");
  }
}
function timeToMin(str) {
  if (!str) return 0;
  const [h, m] = str.split(":").map(Number);
  return h * 60 + (m || 0);
} /*
async function checkAbonnement() {
  try {
    const res = await fetch(
      `${API_BASE}/admin/profile_senior/getone?id=${userId}`,
    );
    $;
    const p = await res.json();
    if (!p.is_subscription_valid) {
      window.location.href = "/users/seniors/abonnement.php";
    }
  } catch {}
}
*/
function fermerModal() {
  document.getElementById("modalCreneau").classList.add("hidden");
}
