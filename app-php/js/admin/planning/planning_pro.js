var API_BASE = "http://172.16.90.10:8082";
let allPros = [];

(async () => {
  await loadPros();
  initSearch();
})();

async function loadPros() {
  try {
    const res = await fetch(`${API_BASE}/admin/profile_pro/get`);
    allPros = await res.json();
    renderList(allPros);
  } catch {
    document.getElementById("proList").innerHTML =
      `<p class="p-4 text-red-500 text-sm">Erreur de chargement.</p>`;
  }
}

function renderList(pros) {
  const list = document.getElementById("proList");
  if (!pros.length) {
    list.innerHTML = `<p class="p-6 text-center text-gray-400 text-sm italic">Aucun prestataire trouvé.</p>`;
    return;
  }
  list.innerHTML = pros
    .map(
      (p) => `
    <a href="admin_planning_pro_detail.php?id=${p.id_user}" class="flex items-center gap-4 p-4 hover:bg-blue-50 transition-colors cursor-pointer">
      <div class="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 font-bold text-sm flex-shrink-0">
        ${esc(p.prenom?.[0] || "")}${esc(p.nom?.[0] || "")}
      </div>
      <div>
        <div class="font-semibold text-gray-800 text-sm">${esc(p.nom)} ${esc(p.prenom)}</div>
        <div class="text-xs text-gray-400">${esc(p.telephone_pro || "—")}</div>
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
      renderList(allPros);
      return;
    }
    renderList(
      allPros.filter((p) =>
        `${p.nom} ${p.prenom}`.toLowerCase().includes(term),
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
