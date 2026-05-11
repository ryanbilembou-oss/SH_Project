const API_BASE = "http://144.76.74.130:8082";
const userId = Number(localStorage.getItem("id_user"));
const role = localStorage.getItem("role");

if (!userId || role !== "senior") {
  window.location.href = "/users/login.php";
}

let plannings = [];
let interventions = [];
let evenements = [];
let currentMonday = getMonday(new Date());

const JOURS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const HEURES = Array.from({ length: 17 }, (_, i) => i + 7);

(async () => {
  await Promise.all([loadPlannings(), loadInterventions(), loadEvenements()]);
  renderCalendar();
  initNavigation();
})();

async function loadPlannings() {
  try {
    const res = await fetch(`${API_BASE}/senior/planning/get?id=${userId}`);
    plannings = await res.json();
    if (!Array.isArray(plannings)) plannings = [];
  } catch {
    plannings = [];
  }
}
async function loadInterventions() {
  try {
    const res = await fetch(`${API_BASE}/admin/intervention/get`);
    const all = await res.json();
    interventions = Array.isArray(all)
      ? all.filter((i) => i.id_senior === userId)
      : [];
    console.log("Interventions:", interventions);
    console.log("Test date:", getDayFR(interventions[0]?.date_heure_debut));
    console.log("Test formatDate lundi:", formatDate(currentMonday));
  } catch {
    interventions = [];
  }
}

async function loadEvenements() {
  try {
    const res = await fetch(
      `${API_BASE}/admin/inscription_evenement/get_by_user?id=${userId}`,
    );
    const all = await res.json();
    evenements = Array.isArray(all)
      ? all.filter((e) => e.statut !== "annule")
      : [];
  } catch {
    evenements = [];
  }
}

function getMonday(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatDate(date) {
  return date.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" });
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
  if (str.includes("T")) return str.split("T")[1].slice(0, 5);
  return str.slice(0, 5);
}

function getHeureDecimal(str) {
  const h = formatHeure(str);
  const [hh, mm] = h.split(":").map(Number);
  return hh + mm / 60;
}

function getDayFR(str) {
  const d = new Date(str);
  return d.toLocaleDateString("fr-FR", {
    timeZone: "Europe/Paris",
    day: "2-digit",
    month: "2-digit",
  });
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

  let html = `<div style="display: grid; grid-template-columns: 60px repeat(7, 1fr); border-bottom: 1px solid #f3f4f6;">`;
  html += `<div style="height: 56px;"></div>`;
  days.forEach((d, i) => {
    const isToday = formatDate(d) === formatDate(new Date());
    html += `<div style="height: 56px; display: flex; flex-direction: column; align-items: center; justify-content: center; border-left: 1px solid #f3f4f6; ${isToday ? "background: #EFF6FF;" : ""}">
      <div style="font-size: 13px; font-weight: 700; color: #6b7280; font-family: 'Fira Sans Condensed', sans-serif;">${JOURS[i]}</div>
      <div style="font-size: 16px; font-weight: 900; color: ${isToday ? "#7CABD3" : "#1A2B49"}; font-family: 'Fira Sans Condensed', sans-serif;">${formatDate(d)}</div>
    </div>`;
  });
  html += `</div>`;

  html += `<div style="display: grid; grid-template-columns: 60px repeat(7, 1fr); position: relative;">`;
  HEURES.forEach((h) => {
    html += `<div style="height: ${ROW_HEIGHT}px; border-top: 1px solid #f9fafb; display: flex; align-items: flex-start; padding-top: 4px; padding-right: 8px; justify-content: flex-end;">
      <span style="font-size: 12px; color: #9ca3af; font-family: 'Fira Sans Condensed', sans-serif;">${String(h).padStart(2, "0")}:00</span>
    </div>`;
    days.forEach((d) => {
      const isToday = formatDate(d) === formatDate(new Date());
      html += `<div style="height: ${ROW_HEIGHT}px; border-top: 1px solid #f9fafb; border-left: 1px solid #f3f4f6; position: relative; ${isToday ? "background: #FAFEFF;" : ""}"></div>`;
    });
  });

  interventions.forEach((i) => {
    const jourIndex = days.findIndex(
      (d) => formatDate(d) === getDayFR(i.date_heure_debut || i.date_debut),
    );
    if (jourIndex === -1) return;
    const debutH = getHeureDecimal(i.date_heure_debut || i.date_debut);
    const finH = getHeureDecimal(i.date_heure_fin || i.date_fin);
    if (debutH < START_HOUR) return;
    const top = (debutH - START_HOUR) * ROW_HEIGHT;
    const height = Math.max((finH - debutH) * ROW_HEIGHT, 30);
    html += `<div style="
      position: absolute; top: ${top}px; height: ${height}px;
      left: calc((100% - 60px) * ${jourIndex} / 7 + 60px + 2px);
      width: calc((100% - 60px) / 7 - 4px);
      background: #FCE297; border: 2px solid #F5C842;
      border-radius: 12px; padding: 6px 8px; font-size: 12px; overflow: hidden; z-index: 10;">
      <div style="font-weight: 900; color: #1A2B49; font-family: 'Fira Sans Condensed', sans-serif;">${formatHeure(i.date_heure_debut || i.date_debut)}</div>
      <div style="color: #1A2B49; font-size: 11px; margin-top: 2px; font-family: 'Fira Sans Condensed', sans-serif;"> ${esc(i.nom_service || "Intervention")}</div>
      ${i.nom_pro ? `<div style="color: #6b7280; font-size: 10px;">${esc(i.prenom_pro)} ${esc(i.nom_pro)}</div>` : ""}
    </div>`;
  });

  evenements.forEach((e) => {
    if (!e.date_heure) return;
    const jourIndex = days.findIndex(
      (d) => formatDate(d) === getDayFR(e.date_heure),
    );
    if (jourIndex === -1) return;
    const debutH = getHeureDecimal(e.date_heure);
    if (debutH < START_HOUR) return;
    const top = (debutH - START_HOUR) * ROW_HEIGHT;
    html += `<div style="
      position: absolute; top: ${top}px; height: 56px;
      left: calc((100% - 60px) * ${jourIndex} / 7 + 60px + 2px);
      width: calc((100% - 60px) / 7 - 4px);
      background: #7CABD3; border: 2px solid #5a8bb5;
      border-radius: 12px; padding: 6px 8px; font-size: 12px; overflow: hidden; z-index: 10;">
      <div style="font-weight: 900; color: white; font-family: 'Fira Sans Condensed', sans-serif;">${formatHeure(e.date_heure)}</div>
      <div style="color: white; font-size: 11px; margin-top: 2px; font-family: 'Fira Sans Condensed', sans-serif;"> ${esc(e.titre_evenement)}</div>
    </div>`;
  });

  plannings.forEach((p) => {
    if (!p.rappel_notification) return;
    const jourIndex = days.findIndex(
      (d) => formatDate(d) === getDayFR(p.rappel_notification),
    );
    if (jourIndex === -1) return;
    const rappelH = getHeureDecimal(p.rappel_notification);
    if (rappelH < START_HOUR) return;
    const top = (rappelH - START_HOUR) * ROW_HEIGHT;
    html += `<div style="
      position: absolute; top: ${top}px; height: 40px;
      left: calc((100% - 60px) * ${jourIndex} / 7 + 60px + 2px);
      width: calc((100% - 60px) / 7 - 4px);
      background: #FFFFF6; border: 2px solid #FCE297;
      border-radius: 12px; padding: 6px 8px; font-size: 12px; overflow: hidden; z-index: 10;">
      <div style="font-weight: 900; color: #1A2B49; font-family: 'Fira Sans Condensed', sans-serif;">🔔 ${formatHeure(p.rappel_notification)}</div>
      ${p.note_perso ? `<div style="color: #6b7280; font-size: 10px;">${esc(p.note_perso)}</div>` : ""}
    </div>`;
  });

  html += `</div>`;

  html += `<div style="display: flex; gap: 16px; padding: 16px 20px; border-top: 2px solid #f3f4f6; font-size: 14px; font-family: 'Fira Sans Condensed', sans-serif;">
    <span style="display: flex; align-items: center; gap: 6px; font-weight: 700;">
      <span style="width: 14px; height: 14px; background: #FCE297; border: 2px solid #F5C842; border-radius: 4px; display: inline-block;"></span> Intervention
    </span>
    <span style="display: flex; align-items: center; gap: 6px; font-weight: 700;">
      <span style="width: 14px; height: 14px; background: #7CABD3; border: 2px solid #5a8bb5; border-radius: 4px; display: inline-block;"></span> Événement
    </span>
    <span style="display: flex; align-items: center; gap: 6px; font-weight: 700;">
      <span style="width: 14px; height: 14px; background: #FFFFF6; border: 2px solid #FCE297; border-radius: 4px; display: inline-block;"></span> Rappel
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

function esc(str) {
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
