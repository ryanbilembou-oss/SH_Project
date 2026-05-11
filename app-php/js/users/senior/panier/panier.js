const API_BASE = "http://localhost:8082";
const userId = Number(localStorage.getItem("id_user"));
const role = localStorage.getItem("role");

if (!userId || (role !== "senior" && role !== "pro")) {
  window.location.href = "/users/login.php";
}

let panierItems = [];
let stockMap = {};

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("success") === "1") {
  setTimeout(
    () => showToast("Paiement réussi ! Merci pour votre achat.", "success"),
    500,
  );
  window.history.replaceState({}, "", window.location.pathname);
} else if (urlParams.get("cancelled") === "1") {
  setTimeout(() => showToast("Paiement annulé.", "error"), 500);
  window.history.replaceState({}, "", window.location.pathname);
}

(async () => {
  await loadPanier();
})();

async function loadPanier() {
  try {
    const res = await fetch(`${API_BASE}/admin/panier/get?id_user=${userId}`);
    const data = await res.json();
    panierItems = Array.isArray(data) ? data : [];
    await loadStocks();
    renderPanier();
  } catch {
    document.getElementById("panierList").innerHTML =
      `<p class="text-red-400 text-center">Erreur de chargement.</p>`;
  }
}

async function loadStocks() {
  stockMap = {};
  try {
    const hasArticles = panierItems.some((i) => i.type_objet === "article");
    const hasEvents = panierItems.some((i) => i.type_objet === "evenement");

    const [articles, evenements] = await Promise.all([
      hasArticles
        ? fetch(`${API_BASE}/admin/article/get`).then((r) => r.json())
        : [],
      hasEvents
        ? fetch(`${API_BASE}/admin/evenement/get`).then((r) => r.json())
        : [],
    ]);

    if (Array.isArray(articles)) {
      articles.forEach((a) => {
        stockMap[`article_${a.id}`] = a.stock ?? 999;
      });
    }
    if (Array.isArray(evenements)) {
      evenements.forEach((e) => {
        const placesRestantes = (e.nb_places_max || 0) - (e.nb_inscrits || 0);
        stockMap[`evenement_${e.id_evenement}`] = Math.max(0, placesRestantes);
      });
    }
  } catch {}
}

function getStockMax(item) {
  const key = `${item.type_objet}_${item.id_objet}`;
  return stockMap[key] ?? 999;
}

function renderPanier() {
  const container = document.getElementById("panierList");
  const countEl = document.getElementById("panierCount");
  const btnVider = document.getElementById("btnVider");
  const recap = document.getElementById("panierRecap");

  if (!panierItems.length) {
    container.innerHTML = `
      <div class="bg-white p-12 rounded-[40px] border-2 border-dashed border-gray-200 text-center">
        <iconify-icon icon="mdi:cart-off" class="text-6xl text-gray-300 mb-4 block"></iconify-icon>
        <p class="text-gray-400 italic text-lg">Votre panier est vide.</p>
        <div class="flex justify-center gap-4 mt-6">
          <a href="/users/seniors/evenement/evenements.php" class="px-6 py-3 bg-[#7CABD3] text-white rounded-full font-black text-sm uppercase hover:bg-[#1A2B49] transition-all">
            Voir les événements
          </a>
          <a href="/users/seniors/boutique.php" class="px-6 py-3 bg-[#1A2B49] text-white rounded-full font-black text-sm uppercase hover:bg-[#7CABD3] transition-all">
            Voir les articles
          </a>
        </div>
      </div>`;
    countEl.textContent = "Votre panier est vide.";
    btnVider.classList.add("hidden");
    recap.classList.add("hidden");
    return;
  }

  const nbArticles = panierItems
    .filter((i) => i.type_objet === "article")
    .reduce((acc, i) => acc + i.quantite, 0);
  const nbEvents = panierItems
    .filter((i) => i.type_objet === "evenement")
    .reduce((acc, i) => acc + i.quantite, 0);
  const parts = [];
  if (nbArticles > 0) parts.push(`${nbArticles} article(s)`);
  if (nbEvents > 0) parts.push(`${nbEvents} place(s) événement`);
  countEl.textContent = parts.join(" et ") + " dans votre panier.";
  btnVider.classList.remove("hidden");
  recap.classList.remove("hidden");

  let total = 0;

  container.innerHTML = panierItems
    .map((item) => {
      const sousTotal = item.prix * item.quantite;
      total += sousTotal;
      const isEvent = item.type_objet === "evenement";
      const icon = isEvent ? "mdi:calendar" : "mdi:shopping";
      const typeLabel = isEvent ? "Événement" : "Article";
      const stockMax = getStockMax(item);
      const stockBas = stockMax <= 5 && stockMax > 0;
      const enRupture = stockMax <= 0;
      const atMax = item.quantite >= stockMax;

      const stockWarning = enRupture
        ? `<p class="text-red-500 text-xs font-bold mt-1">Rupture de stock</p>`
        : stockBas
          ? `<p class="text-orange-500 text-xs font-bold mt-1">${isEvent ? "Plus que " + stockMax + " place(s)" : "Plus que " + stockMax + " en stock"}</p>`
          : "";

      const qtyControls = `
        <div class="flex items-center gap-2">
          <button onclick="updateQty(${item.id_panier}, ${item.quantite - 1})"
            class="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 font-black text-lg transition-all ${item.quantite <= 1 ? "opacity-30 pointer-events-none" : ""}">−</button>
          <span class="font-black text-[#1A2B49] text-lg w-8 text-center">${item.quantite}</span>
          <button onclick="updateQty(${item.id_panier}, ${item.quantite + 1})"
            class="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 font-black text-lg transition-all ${atMax ? "opacity-30 pointer-events-none" : ""}">+</button>
        </div>`;

      return `
      <div class="bg-white p-6 rounded-[30px] border-2 ${enRupture ? "border-red-200" : "border-transparent hover:border-[#7CABD3]"} transition-all duration-300 flex items-center gap-6">
        <div class="w-14 h-14 bg-[#7CABD3]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
          <iconify-icon icon="${icon}" class="text-2xl text-[#7CABD3]"></iconify-icon>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-xs font-black uppercase text-[#7CABD3] bg-[#7CABD3]/10 px-2 py-0.5 rounded-full">${typeLabel}</span>
          </div>
          <h4 class="font-black text-[#1A2B49] text-lg truncate">${esc(item.nom)}</h4>
          <p class="text-gray-400 text-sm">${item.prix} € × ${item.quantite} ${isEvent ? "place(s)" : ""}</p>
          ${stockWarning}
        </div>
        <div class="flex items-center gap-6 flex-shrink-0">
          ${qtyControls}
          <p class="font-black text-[#1A2B49] text-xl w-24 text-right">${sousTotal.toFixed(2)} €</p>
          <button onclick="supprimerItem(${item.id_panier})"
            class="w-10 h-10 rounded-full bg-red-50 hover:bg-red-500 text-red-400 hover:text-white transition-all flex items-center justify-center">
            <iconify-icon icon="mdi:close" class="text-lg"></iconify-icon>
          </button>
        </div>
      </div>`;
    })
    .join("");

  document.getElementById("totalPrix").textContent = total.toFixed(2) + " €";
}
async function updateQty(idPanier, newQty) {
  if (newQty <= 0) return;

  const item = panierItems.find((i) => i.id_panier === idPanier);
  if (item) {
    const max = getStockMax(item);
    if (newQty > max) {
      const label =
        item.type_objet === "evenement" ? "places disponibles" : "en stock";
      showToast(`Maximum ${max} ${label}.`, "error");
      return;
    }
  }

  try {
    const res = await fetch(`${API_BASE}/admin/panier/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_panier: idPanier, quantite: newQty }),
    });
    if (res.status === 409) {
      const data = await res.json();
      const max = data.stock || 0;
      const label =
        item?.type_objet === "evenement" ? "places disponibles" : "en stock";
      showToast(`Maximum ${max} ${label}.`, "error");
      await loadPanier();
      return;
    }
    if (!res.ok) throw new Error();
    await loadPanier();
  } catch {
    showToast("Erreur lors de la mise à jour.", "error");
  }
}

async function supprimerItem(idPanier) {
  try {
    const res = await fetch(`${API_BASE}/admin/panier/delete?id=${idPanier}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error();
    showToast("Article retiré du panier.", "success");
    await loadPanier();
  } catch {
    showToast("Erreur lors de la suppression.", "error");
  }
}

async function viderPanier() {
  if (!confirm("Vider tout le panier ?")) return;
  try {
    const res = await fetch(
      `${API_BASE}/admin/panier/vider?id_user=${userId}`,
      { method: "DELETE" },
    );
    if (!res.ok) throw new Error();
    showToast("Panier vidé.", "success");
    await loadPanier();
  } catch {
    showToast("Erreur lors du vidage.", "error");
  }
}

async function payerPanier() {
  if (!panierItems.length) return;

  const btnPayer = document.getElementById("btnPayer");
  btnPayer.disabled = true;
  btnPayer.innerHTML =
    '<iconify-icon icon="mdi:loading" class="text-xl animate-spin"></iconify-icon> Redirection...';

  const items = panierItems.map((item) => ({
    id_panier: item.id_panier,
    type_objet: item.type_objet,
    id_objet: item.id_objet,
    nom: item.nom,
    prix: item.prix,
    quantite: item.quantite,
  }));

  try {
    const res = await fetch(`${API_BASE}/admin/stripe/checkout/panier`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_user: userId,
        items: items,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      showToast(err.erreur || "Erreur de paiement", "error");
      resetBtnPayer();
      return;
    }

    const data = await res.json();
    window.location.href = data.url;
  } catch {
    showToast("Erreur lors du paiement.", "error");
    resetBtnPayer();
  }
}

function resetBtnPayer() {
  const btnPayer = document.getElementById("btnPayer");
  btnPayer.disabled = false;
  btnPayer.innerHTML =
    '<iconify-icon icon="mdi:credit-card-outline" class="text-xl"></iconify-icon> Payer avec Stripe';
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
