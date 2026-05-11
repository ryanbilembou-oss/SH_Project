var API_BASE = "http://172.16.90.10:8082";
let allSeniors = [];

(async () => {
  await loadSeniors();
  initSearch();
})();

async function loadSeniors() {
  try {
    const res = await fetch(`${API_BASE}/admin/profile_senior/get`);
    allSeniors = await res.json();
    renderList(allSeniors);
  } catch {
    document.getElementById("seniorList").innerHTML =
      `<p class="p-4 text-red-500 text-sm">Erreur de chargement.</p>`;
  }
}

function renderList(seniors) {
  const list = document.getElementById("seniorList");
  if (!seniors.length) {
    list.innerHTML = `<p class="p-6 text-center text-gray-400 text-sm italic">Aucun senior trouvé.</p>`;
    return;
  }
  list.innerHTML = seniors
    .map(
      (s) => `
    <a href="admin_planning_senior_detail.php?id=${s.id_user}" class="flex items-center gap-4 p-4 hover:bg-blue-50 transition-colors cursor-pointer">
      <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm flex-shrink-0">
        ${esc(s.prenom?.[0] || "")}${esc(s.nom?.[0] || "")}
      </div>
      <div>
        <div class="font-semibold text-gray-800 text-sm">${esc(s.nom)} ${esc(s.prenom)}</div>
        <div class="text-xs text-gray-400">${esc(s.telephone || "—")}</div>
      </div>
      <i class="fas fa-chevron-right text-gray-300 ml-auto text-xs"></i>
    </a>`,
    )
    .join("");
}

function initSearch() {
  document.getElementById("searchInput").addEventListener("input", function () {
    const term = this.value.trim().toLowerCase();
    if (!term) {
      renderList(allSeniors);
      return;
    }
    renderList(
      allSeniors.filter((s) =>
        `${s.nom} ${s.prenom}`.toLowerCase().includes(term),
      ),
    );
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
