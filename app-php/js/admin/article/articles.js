const API_BASE = "http://144.76.74.130:8082";

(async () => {
  await loadArticles();
  initSearch();
})();

async function loadArticles() {
  const tableBody = document.getElementById("articleTableBody");
  if (!tableBody) return;

  tableBody.innerHTML = `
    <tr>
      <td colspan="6" class="py-20 text-center text-gray-400">
        <i class="fas fa-spinner fa-spin text-2xl mb-3 block text-blue-400"></i>
        <span class="text-sm italic">Chargement des articles...</span>
      </td>
    </tr>`;

  try {
    const res = await fetch(`${API_BASE}/admin/article/get`);
    if (!res.ok) throw new Error(`Erreur serveur : ${res.status}`);

    const articles = await res.json();

    if (!Array.isArray(articles) || articles.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="6" class="py-20 text-center text-gray-400">
            <i class="fas fa-box-open text-4xl mb-3 block text-gray-300"></i>
            <span class="text-sm italic">Aucun article trouvé.</span>
          </td>
        </tr>`;
      return;
    }

    tableBody.innerHTML = articles.map(buildRow).join("");
  } catch (err) {
    console.error("[articles.js]", err);
    tableBody.innerHTML = `
      <tr>
        <td colspan="6" class="py-20 text-center">
          <i class="fas fa-exclamation-circle text-4xl mb-3 block text-red-400"></i>
          <p class="text-red-500 font-semibold text-sm">${err.message}</p>
          <button onclick="loadArticles()" class="mt-4 text-xs text-blue-600 underline hover:text-blue-800">Réessayer</button>
        </td>
      </tr>`;
  }
}

function buildRow(a) {
  const prix = parseFloat(a.prix || 0).toFixed(2);
  const stock = a.stock ?? 0;

  const stockClass =
    stock === 0
      ? "bg-red-100 text-red-700 border-red-200"
      : stock < 5
        ? "bg-orange-100 text-orange-700 border-orange-200"
        : "bg-emerald-100 text-emerald-700 border-emerald-200";

  const stockLabel = stock === 0 ? "Rupture" : stock;

  return `
    <tr id="article-row-${a.id}" class="border-b border-gray-100 hover:bg-blue-50/40 transition-colors duration-150">
      <td class="py-4 px-5">
        <div class="flex items-center gap-3">
          ${
            a.image_url
              ? `<img src="${esc(a.image_url)}" alt="${esc(a.nom)}" class="w-10 h-10 rounded-lg object-cover border border-gray-200">`
              : `<div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center"><i class="fas fa-image text-gray-400"></i></div>`
          }
          <span class="font-semibold text-gray-800 text-sm">${esc(a.nom)}</span>
        </div>
      </td>
      <td class="py-4 px-5">
        <span class="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
          ${esc(a.nom_categorie || "—")}
        </span>
      </td>
      <td class="py-4 px-5 text-center">
        <span class="font-bold text-emerald-600 text-sm">${prix}&nbsp;€</span>
      </td>
      <td class="py-4 px-5 text-center">
        <span class="inline-flex items-center gap-1 py-1 px-3 rounded-full text-xs font-bold border ${stockClass}">
          ${stockLabel}
        </span>
      </td>
      <td class="py-4 px-5 text-sm text-gray-500 max-w-xs truncate">
        ${esc(a.bio || "—")}
      </td>
      <td class="py-4 px-5">
        <div class="flex items-center justify-center gap-3">
          <a href="admin_edit_article.php?id=${a.id}"
             class="group flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-600 transition-colors duration-200"
             title="Modifier">
            <i class="fas fa-edit text-blue-600 group-hover:text-white text-sm transition-colors"></i>
          </a>
          <button
            type="button"
            data-id="${a.id}"
            class="btn-delete group flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 hover:bg-red-600 transition-colors duration-200"
            title="Supprimer">
            <i class="fas fa-trash-alt text-red-500 group-hover:text-white text-sm transition-colors pointer-events-none"></i>
          </button>
        </div>
      </td>
    </tr>`;
}

function initSearch() {
  const searchInput = document.getElementById("searchInput");
  const tableBody = document.getElementById("articleTableBody");
  if (!searchInput || !tableBody) return;

  searchInput.addEventListener("input", () => {
    const term = searchInput.value.trim().toLowerCase();
    tableBody.querySelectorAll("tr[id^='article-row-']").forEach((row) => {
      row.style.display = row.innerText.toLowerCase().includes(term)
        ? ""
        : "none";
    });
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

window.loadArticles = loadArticles;
