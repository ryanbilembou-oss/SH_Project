var API_BASE = "http://localhost:8082";
let allDocs = [];

(async () => {
  await loadDocs();
  initSearch();
})();

async function loadDocs() {
  const tbody = document.getElementById("docsTableBody");
  tbody.innerHTML = `<tr><td colspan="5" class="py-20 text-center text-gray-400"><i class="fas fa-spinner fa-spin text-2xl mb-3 block text-blue-400"></i><span class="text-sm italic">Chargement...</span></td></tr>`;
  try {
    const res = await fetch(`${API_BASE}/admin/documents_pro/get`);
    if (!res.ok) throw new Error();
    allDocs = await res.json();
    renderTable(allDocs);
  } catch {
    tbody.innerHTML = `<tr><td colspan="5" class="py-20 text-center"><p class="text-red-500 text-sm">Erreur de chargement.</p></td></tr>`;
  }
}

function renderTable(docs) {
  const tbody = document.getElementById("docsTableBody");

  if (!docs.length) {
    tbody.innerHTML = `<tr><td colspan="5" class="py-20 text-center text-gray-400"><span class="text-sm italic">Aucun document trouvé.</span></td></tr>`;
    return;
  }

  const grouped = {};
  docs.forEach((d) => {
    if (!grouped[d.id_user]) {
      grouped[d.id_user] = {
        id_user: d.id_user,
        nom: `${d.nom_pro} ${d.prenom_pro}`,
        docs: [],
      };
    }
    grouped[d.id_user].docs.push(d);
  });

  tbody.innerHTML = Object.values(grouped)
    .map((pro) => {
      const total = pro.docs.length;
      const valides = pro.docs.filter((d) => d.statut === "valide").length;
      const aValider = pro.docs.filter((d) => d.statut === "en_attente").length;
      const refuses = pro.docs.filter((d) => d.statut === "refuse").length;

      const statutClass =
        valides === total
          ? "bg-emerald-100 text-emerald-700"
          : refuses > 0
            ? "bg-red-100 text-red-700"
            : "bg-yellow-100 text-yellow-700";

      const statutLabel =
        valides === total ? "Complet" : refuses > 0 ? "Refusé" : "En cours";

      return `
      <tr class="border-b border-gray-100 hover:bg-blue-50/40 transition-colors cursor-pointer" onclick="window.location.href='admin_view_documents_pro.php?id=${pro.id_user}'">
        <td class="py-4 px-5">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 font-bold text-sm">
              ${esc(pro.nom.split(" ")[1]?.[0] || "?")}${esc(pro.nom.split(" ")[0]?.[0] || "")}
            </div>
            <div>
              <div class="font-semibold text-gray-800 text-sm">${esc(pro.nom)}</div>
              <div class="text-xs text-gray-400">Pro #${pro.id_user}</div>
            </div>
          </div>
        </td>
        <td class="py-4 px-5 text-center">
          <span class="font-bold text-gray-700 text-sm">${total}</span>
        </td>
        <td class="py-4 px-5 text-center">
          <span class="font-bold ${aValider > 0 ? "text-yellow-600" : "text-gray-400"} text-sm">${aValider}</span>
        </td>
        <td class="py-4 px-5 text-center">
          <span class="text-xs font-bold px-2 py-1 rounded uppercase ${statutClass}">${statutLabel}</span>
        </td>
        <td class="py-4 px-5 text-center">
          <a href="admin_view_documents_pro.php?id=${pro.id_user}" class="group flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-600 transition-colors mx-auto">
            <i class="fas fa-eye text-blue-600 group-hover:text-white text-sm"></i>
          </a>
        </td>
      </tr>`;
    })
    .join("");
}

function initSearch() {
  document.getElementById("searchInput").addEventListener("input", function () {
    const term = this.value.trim().toLowerCase();
    if (!term) {
      renderTable(allDocs);
      return;
    }
    renderTable(
      allDocs.filter((d) =>
        `${d.nom_pro} ${d.prenom_pro}`.toLowerCase().includes(term),
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
