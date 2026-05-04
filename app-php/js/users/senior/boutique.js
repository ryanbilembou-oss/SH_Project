const API_BASE = "http://localhost:8082";
const userId = Number(localStorage.getItem("id_user"));
const role = localStorage.getItem("role");

if (!userId || role !== "senior") window.location.href = "/users/login.php";

let tousArticles = [];

let quantites = {};

(async () => {
  await loadArticles();
})();

async function loadArticles() {
  try {
    const res = await fetch(`${API_BASE}/admin/article/get`);
    tousArticles = await res.json();
    if (!Array.isArray(tousArticles)) tousArticles = [];

    tousArticles.forEach((a) => (quantites[a.id] = 1));
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
      "btn-cat px-5 py-2 rounded-full font-fira text-sm bg-white border-2 border-[#7CABD3] text-[#7CABD3] hover:bg-[#7CABD3] hover:text-white transition-all";
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

function changerQuantite(id, delta, stockMax) {
  const current = quantites[id] || 1;
  const newQty = current + delta;
  if (newQty < 1 || newQty > stockMax) return;
  quantites[id] = newQty;
  // Mettre à jour l'affichage sans re-render toute la page
  const qtyEl = document.getElementById(`qty-${id}`);
  const btnMoins = document.getElementById(`btn-moins-${id}`);
  const btnPlus = document.getElementById(`btn-plus-${id}`);
  if (qtyEl) qtyEl.textContent = newQty;
  if (btnMoins) {
    btnMoins.classList.toggle("opacity-30", newQty <= 1);
    btnMoins.classList.toggle("pointer-events-none", newQty <= 1);
  }
  if (btnPlus) {
    btnPlus.classList.toggle("opacity-30", newQty >= stockMax);
    btnPlus.classList.toggle("pointer-events-none", newQty >= stockMax);
  }
}

async function ajouterArticleAuPanier(id) {
  const qty = quantites[id] || 1;
  await ajouterAuPanier("article", id, qty);
}

function renderArticles(articles) {
  const container = document.getElementById("articlesList");
  if (!articles.length) {
    container.innerHTML = `<p class="text-gray-400 italic text-center col-span-3 py-10">Aucun article disponible.</p>`;
    return;
  }
  container.innerHTML = articles
    .map((a) => {
      const stock = a.stock ?? 999;
      const enRupture = stock <= 0;
      const qty = quantites[a.id] || 1;

      let controles = "";
      if (enRupture) {
        controles = `
          <span class="px-6 py-3 bg-red-100 text-red-600 rounded-full font-fira text-sm uppercase">
            Rupture de stock
          </span>`;
      } else {
        controles = `
          <div class="flex items-center gap-2">
            <button id="btn-moins-${a.id}" onclick="changerQuantite(${a.id}, -1, ${stock})"
              class="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 font-fira text-lg transition-all ${qty <= 1 ? "opacity-30 pointer-events-none" : ""}">−</button>
            <span id="qty-${a.id}" class="font-fira text-[#1A2B49] text-lg w-8 text-center">${qty}</span>
            <button id="btn-plus-${a.id}" onclick="changerQuantite(${a.id}, 1, ${stock})"
              class="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 font-fira text-lg transition-all ${qty >= stock ? "opacity-30 pointer-events-none" : ""}">+</button>
          </div>
          <button onclick="ajouterArticleAuPanier(${a.id})"
            class="px-4 py-2 bg-[#7CABD3]/10 text-[#7CABD3] rounded-full font-fira text-sm hover:bg-[#7CABD3] hover:text-white transition-all">
            <iconify-icon icon="mdi:cart-plus"></iconify-icon>
          </button>`;
      }

      return `
      <div class="group bg-white p-8 rounded-[40px] border-2 border-transparent hover:border-[#7CABD3] hover:shadow-xl transition-all duration-500">
        ${a.image_url ? `<img src="${esc(a.image_url)}" class="w-full h-48 object-cover rounded-2xl mb-4">` : `<div class="w-full h-48 bg-[#7CABD3]/10 rounded-2xl mb-4 flex items-center justify-center"><iconify-icon icon="mdi:shopping" class="text-5xl text-[#7CABD3]/40"></iconify-icon></div>`}
        ${a.nom_categorie ? `<span class="bg-[#FCE297]/50 text-[#1A2B49] text-sm font-fira px-3 py-1 rounded-full">${esc(a.nom_categorie)}</span>` : ""}
        <h4 class="font-fira text-[#1A2B49] text-xl mt-4 mb-2">${esc(a.titre || a.nom)}</h4>
        <p class="text-base text-gray-400 leading-relaxed mb-4">${esc(a.description || a.contenu || "")}</p>
        <p class="text-sm ${stock <= 5 && stock > 0 ? "text-orange-500" : "text-gray-400"} mb-4 font-fira">
          ${enRupture ? "" : stock <= 5 ? "Plus que " + stock + " en stock" : stock + " en stock"}
        </p>
        <div class="flex justify-between items-center mt-auto">
          <span class="font-fira text-[#1A2B49] text-xl">${a.prix ? a.prix + " €" : "Gratuit"}</span>
          ${controles}
        </div>
      </div>`;
    })
    .join("");
}

function showToast(message, type = "info") {
  const toast = document.getElementById("toast");
  const msg = document.getElementById("toastMsg");
  const icon = document.getElementById("toastIcon");
  msg.textContent = message;
  icon.textContent = type === "success" ? "V" : type === "error" ? "X" : "i";
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
