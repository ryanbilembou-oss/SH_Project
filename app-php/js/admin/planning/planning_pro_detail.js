var API_BASE = "http://172.16.90.10:8082";
const urlParams = new URLSearchParams(window.location.search);
const proId = Number(urlParams.get("id"));

let plannings = [];
let interventions = [];
let evenements = [];
let currentMonday = getMonday(new Date());
const JOURS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const HEURES = Array.from({ length: 17 }, (_, i) => i + 7);

(async () => {
  await Promise.all([
    loadPro(),
    loadPlannings(),
    loadInterventions(),
    loadEvenements(),
  ]);
  renderCalendar();
  initNavigation();
  initDeleteModal();
})();

async function loadPro() {
  try {
    const res = await fetch(`${API_BASE}/admin/profile_pro/getone?id=${proId}`);
    const pro = await res.json();
    document.getElementById("proName").textContent = `${pro.nom} ${pro.prenom}`;
    document.getElementById("btnAjouter").href =
      `admin_create_planning_pro.php?id_pro=${proId}`;
  } catch {}
}

async function loadPlannings() {
  try {
    const res = await fetch(`${API_BASE}/admin/planning_pro/get`);
    const all = await res.json();
    plannings = all.filter((p) => p.id_pro === proId);
  } catch {}
}

async function loadInterventions() {
  try {
    const res = await fetch(`${API_BASE}/admin/intervention/get`);
    const all = await res.json();
    interventions = all.filter((i) => i.id_pro === proId);
  } catch {}
}

async function loadEvenements() {
  try {
    const res = await fetch(
      `${API_BASE}/admin/inscription_evenement/get_by_user?id=${proId}`,
    );
    evenements = await res.json();
  } catch {}
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
  if (!isNaN(d)) {
    return d.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  if (str.includes("T")) return str.split("T")[1].slice(0, 5);
  return str.slice(0, 5);
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
  const ROW_HEIGHT = 48;
  const START_HOUR = 7;

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(currentMonday);
    d.setDate(d.getDate() + i);
    return d;
  });

  let html = `<div style="display: grid; grid-template-columns: 60px repeat(7, 1fr); border-bottom: 1px solid #e5e7eb;">`;
  html += `<div style="height: 48px;"></div>`;
  days.forEach((d, i) => {
    const isToday = d.toDateString() === new Date().toDateString();
    html += `<div style="height: 48px; display: flex; flex-direction: column; align-items: center; justify-content: center; border-left: 1px solid #e5e7eb; ${isToday ? "background: #EFF6FF;" : ""}">
      <div style="font-size: 11px; font-weight: 500; color: #6b7280;">${JOURS[i]}</div>
      <div style="font-size: 13px; font-weight: 500; color: ${isToday ? "#2563EB" : "#111827"};">${formatDate(d)}</div>
    </div>`;
  });
  html += `</div>`;

  html += `<div style="display: grid; grid-template-columns: 60px repeat(7, 1fr); position: relative;">`;
  HEURES.forEach((h) => {
    html += `<div style="height: ${ROW_HEIGHT}px; border-top: 1px solid #f3f4f6; display: flex; align-items: flex-start; padding-top: 2px; padding-right: 8px; justify-content: flex-end;">
      <span style="font-size: 11px; color: #9ca3af;">${String(h).padStart(2, "0")}:00</span>
    </div>`;
    days.forEach((d) => {
      const isToday = d.toDateString() === new Date().toDateString();
      html += `<div style="height: ${ROW_HEIGHT}px; border-top: 1px solid #f3f4f6; border-left: 1px solid #e5e7eb; position: relative; ${isToday ? "background: #F8FAFF;" : ""}"></div>`;
    });
  });

  plannings.forEach((p) => {
    if (!p.est_actif) return;
    const jourIndex = p.jour_semaine - 1;
    const debut = parseFloat(
      formatHeure(p.heure_debut)
        .replace(":", ".")
        .split(".")
        .map((v, i) => (i === 1 ? parseInt(v) / 60 : parseInt(v)))
        .reduce((a, b) => a + b, 0),
    );
    const [dh, dm] = formatHeure(p.heure_debut).split(":").map(Number);
    const [fh, fm] = formatHeure(p.heure_fin).split(":").map(Number);
    const debutH = dh + dm / 60;
    const finH = fh + fm / 60;
    if (debutH < START_HOUR) return;
    const top = (debutH - START_HOUR) * ROW_HEIGHT;
    const height = Math.max((finH - debutH) * ROW_HEIGHT, 24);
    html += `<div style="
      position: absolute;
      top: ${top}px; height: ${height}px;
      left: calc((100% - 60px) * ${jourIndex} / 7 + 60px + 2px);
      width: calc((100% - 60px) / 7 - 4px);
      background: #DBEAFE; border: 1px solid #93C5FD;
      border-radius: 6px; padding: 4px 6px; font-size: 11px; overflow: hidden; z-index: 10;">
      <div style="font-weight: 500; color: #1D4ED8;">${formatHeure(p.heure_debut)} - ${formatHeure(p.heure_fin)}</div>
      <div style="color: #2563EB; font-size: 10px; margin-top: 2px;">Disponible</div>
      <div style="display: flex; gap: 4px; margin-top: 4px;">
        <a href="admin_edit_planning_pro.php?id=${p.id_planning}" style="font-size: 10px; padding: 1px 5px; border-radius: 3px; background: white; color: #374151; border: 1px solid #d1d5db; text-decoration: none;">✎</a>
        <button type="button" data-id="${p.id_planning}" class="btn-delete" style="font-size: 10px; padding: 1px 5px; border-radius: 3px; background: #FEE2E2; color: #DC2626; border: 1px solid #FCA5A5; cursor: pointer;">×</button>
      </div>
    </div>`;
  });

  interventions.forEach((i) => {
    const debut = new Date(i.date_heure_debut);
    const fin = new Date(i.date_heure_fin);
    const jourIndex = days.findIndex(
      (d) => d.toDateString() === debut.toDateString(),
    );
    if (jourIndex === -1) return;
    const debutH = debut.getHours() + debut.getMinutes() / 60;
    const finH = fin.getHours() + fin.getMinutes() / 60;
    if (debutH < START_HOUR) return;
    const top = (debutH - START_HOUR) * ROW_HEIGHT;
    const height = Math.max((finH - debutH) * ROW_HEIGHT, 24);
    html += `<div style="
      position: absolute;
      top: ${top}px; height: ${height}px;
      left: calc((100% - 60px) * ${jourIndex} / 7 + 60px + 2px);
      width: calc((100% - 60px) / 7 - 4px);
      background: #D1FAE5; border: 1px solid #6EE7B7;
      border-radius: 6px; padding: 4px 6px; font-size: 11px; overflow: hidden; z-index: 10;">
      <div style="font-weight: 500; color: #065F46;">${formatHeure(i.date_heure_debut)} - ${formatHeure(i.date_heure_fin)}</div>
      <div style="color: #047857; font-size: 10px; margin-top: 2px;"> ${esc(i.nom_service || "Intervention")}</div>
    </div>`;
  });

  evenements.forEach((e) => {
    if (!e.date_heure) return;
    const debut = new Date(e.date_heure);
    const jourIndex = days.findIndex(
      (d) => d.toDateString() === debut.toDateString(),
    );
    if (jourIndex === -1) return;
    const debutH = debut.getHours() + debut.getMinutes() / 60;
    if (debutH < START_HOUR) return;
    const top = (debutH - START_HOUR) * ROW_HEIGHT;
    html += `<div style="
      position: absolute;
      top: ${top}px; height: 48px;
      left: calc((100% - 60px) * ${jourIndex} / 7 + 60px + 2px);
      width: calc((100% - 60px) / 7 - 4px);
      background: #EDE9FE; border: 1px solid #C4B5FD;
      border-radius: 6px; padding: 4px 6px; font-size: 11px; overflow: hidden; z-index: 10;">
      <div style="font-weight: 500; color: #5B21B6;">${formatHeure(e.date_heure)}</div>
      <div style="color: #7C3AED; font-size: 10px; margin-top: 2px;"> ${esc(e.titre_evenement)}</div>
    </div>`;
  });

  html += `</div>`;

  html += `<div style="display: flex; gap: 16px; padding: 12px 16px; border-top: 1px solid #e5e7eb; font-size: 11px;">
    <span style="display: flex; align-items: center; gap: 4px;"><span style="width: 12px; height: 12px; background: #DBEAFE; border: 1px solid #93C5FD; border-radius: 3px; display: inline-block;"></span> Disponibilité</span>
    <span style="display: flex; align-items: center; gap: 4px;"><span style="width: 12px; height: 12px; background: #D1FAE5; border: 1px solid #6EE7B7; border-radius: 3px; display: inline-block;"></span> Intervention</span>
    <span style="display: flex; align-items: center; gap: 4px;"><span style="width: 12px; height: 12px; background: #EDE9FE; border: 1px solid #C4B5FD; border-radius: 3px; display: inline-block;"></span> Événement</span>
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

let deleteId = null;

function initDeleteModal() {
  document.getElementById("calendarGrid").addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-delete");
    if (!btn) return;
    deleteId = btn.dataset.id;
    const modal = document.getElementById("deleteModal");
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    setTimeout(() => modal.classList.remove("opacity-0"), 10);
  });
  document
    .getElementById("cancelDeleteBtn")
    .addEventListener("click", closeModal);
  document
    .getElementById("confirmDeleteBtn")
    .addEventListener("click", async () => {
      try {
        const res = await fetch(
          `${API_BASE}/admin/planning_pro/delete?id=${deleteId}`,
          { method: "DELETE" },
        );
        if (!res.ok) throw new Error();
        plannings = plannings.filter((p) => p.id_planning !== Number(deleteId));
        renderCalendar();
        closeModal();
        showToast("Créneau supprimé.", "success");
      } catch {
        showToast("Erreur lors de la suppression.", "error");
      }
    });
}

function closeModal() {
  const modal = document.getElementById("deleteModal");
  modal.classList.add("opacity-0");
  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }, 300);
}

function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  const msgSpan = document.getElementById("toastMessage");
  const icon = document.getElementById("toastIcon");
  const styles = {
    success: { cls: "fas fa-check-circle", color: "text-emerald-400" },
    error: { cls: "fas fa-times-circle", color: "text-red-400" },
    info: { cls: "fas fa-info-circle", color: "text-blue-400" },
  };
  const s = styles[type] || styles.info;
  msgSpan.textContent = message;
  if (icon) icon.className = `${s.cls} ${s.color} text-xl`;
  container.classList.remove("-translate-y-20", "opacity-0");
  container.classList.add("translate-y-0", "opacity-100");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => {
    container.classList.remove("translate-y-0", "opacity-100");
    container.classList.add("-translate-y-20", "opacity-0");
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
