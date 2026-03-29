const API_BASE = "http://localhost:8082";
const userId = Number(localStorage.getItem("id_user"));
const role = localStorage.getItem("role");

if (!userId || role !== "senior") window.location.href = "/users/login.php";

let tousArticles = [];

(async () => {
  await loadArticles();
})();

async function loadArticles() {
  try {
    const res = await fetch(`${API_BASE}/admin/article/get`);
    tousArticles = await res.json();
    if (!Array.isArray(tousArticles)) tousArticles = [];
    renderCategories();
    renderArticles(tousArticles);
  } catch {
    document.getElementById("articlesList").innerHTML =
      `<p class="text-red-400 text-center col-span-3">Erreur de chargement.</p>`;
  }
}

function renderCategories() {
  const cats = [
    ...new Set(tousArticles.map((a) => a.nom_categorie).filter(Boolean)),
  ];
  const container = document.getElementById("filtresCat");
  container.querySelectorAll(".btn-cat").forEach((b) => b.remove());
  cats.forEach((cat) => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.className =
      "btn-cat px-5 py-2 rounded-full font-bold text-sm bg-white border-2 border-[#7CABD3] text-[#7CABD3] hover:bg-[#7CABD3] hover:text-white transition-all";
    btn.onclick = () => filtrer(cat);
    container.appendChild(btn);
  });
}

function filtrer(cat) {
  const filtered = cat
    ? tousArticles.filter((a) => a.nom_categorie === cat)
    : tousArticles;
  renderArticles(filtered);
}

function renderArticles(articles) {
  const container = document.getElementById("articlesList");
  if (!articles.length) {
    container.innerHTML = `<p class="text-gray-400 italic text-center col-span-3 py-10">Aucun article disponible.</p>`;
    return;
  }
  container.innerHTML = articles
    .map(
      (a) => `
    <div class="group bg-white p-8 rounded-[40px] border-2 border-transparent hover:border-[#7CABD3] hover:shadow-xl transition-all duration-500">
      ${a.image_url ? `<img src="${esc(a.image_url)}" class="w-full h-48 object-cover rounded-2xl mb-4">` : `<div class="w-full h-48 bg-[#7CABD3]/10 rounded-2xl mb-4 flex items-center justify-center"><iconify-icon icon="mdi:shopping" class="text-5xl text-[#7CABD3]/40"></iconify-icon></div>`}
      ${a.nom_categorie ? `<span class="bg-[#FCE297]/50 text-[#1A2B49] text-sm font-black px-3 py-1 rounded-full">${esc(a.nom_categorie)}</span>` : ""}
      <h4 class="font-black text-[#1A2B49] text-xl mt-4 mb-2">${esc(a.titre || a.nom)}</h4>
      <p class="text-base text-gray-400 leading-relaxed mb-4">${esc(a.description || a.contenu || "")}</p>
      <div class="flex justify-between items-center mt-auto">
        <span class="font-black text-[#1A2B49] text-xl">${a.prix ? a.prix + " €" : "Gratuit"}</span>
        <button onclick="showToast('Fonctionnalité bientôt disponible.', 'info')" class="px-6 py-3 bg-[#1A2B49] text-white rounded-full font-black text-sm uppercase hover:bg-[#7CABD3] transition-all">
          Commander
        </button>
      </div>
    </div>`,
    )
    .join("");
}

function showToast(message, type = "info") {
  const toast = document.getElementById("toast");
  const msg = document.getElementById("toastMsg");
  const icon = document.getElementById("toastIcon");
  msg.textContent = message;
  icon.textContent = type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️";
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
