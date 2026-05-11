const API_BASE = "http://172.16.90.10:8082";
const userId = Number(localStorage.getItem("id_user"));
const role = localStorage.getItem("role");

if (!userId || role !== "senior") {
  window.location.href = "/users/login.php";
}

let tousEvenements = [];
let inscriptions = [];
let selectedEventId = null;
let selectedAnnulationId = null;
let vueActuelle = "tous";
let categorieActuelle = null;
let quantitesEvent = {};

(async () => {
  await Promise.all([loadEvenements(), loadInscriptions()]);
  renderCategories();
  appliquerFiltres();
  initModal();
})();

async function loadEvenements() {
  try {
    const res = await fetch(`${API_BASE}/admin/evenement/get`);
    tousEvenements = await res.json();
    tousEvenements.forEach((e) => (quantitesEvent[e.id_evenement] = 1));
  } catch {
    document.getElementById("evenementsList").innerHTML =
      `<p class="text-red-400 text-center col-span-3">Erreur de chargement.</p>`;
  }
}

async function loadInscriptions() {
  try {
    const res = await fetch(
      `${API_BASE}/admin/inscription_evenement/get_by_user?id=${userId}`,
    );
    const all = await res.json();
    inscriptions = Array.isArray(all)
      ? all.filter((i) => i.statut !== "annule")
      : [];
  } catch {
    inscriptions = [];
  }
}

function changerVue(vue) {
  vueActuelle = vue;
  document.querySelectorAll(".btn-vue").forEach((btn) => {
    btn.className =
      "btn-vue px-6 py-2 rounded-full font-fira text-sm uppercase transition-all bg-white border-2 border-gray-300 text-gray-500 hover:bg-gray-200";
  });
  const btnActif = document.getElementById(`btn-vue-${vue}`);
  if (vue === "tous") {
    btnActif.className =
      "btn-vue px-6 py-2 rounded-full font-fira text-sm uppercase transition-all bg-[#1A2B49] text-white";
  } else if (vue === "mes") {
    btnActif.className =
      "btn-vue px-6 py-2 rounded-full font-fira text-sm uppercase transition-all bg-[#7CABD3] text-white";
  } else {
    btnActif.className =
      "btn-vue px-6 py-2 rounded-full font-fira text-sm uppercase transition-all bg-gray-500 text-white";
  }
  appliquerFiltres();
}

function filtrerCategorie(cat) {
  categorieActuelle = cat;
  appliquerFiltres();
}

function appliquerFiltres() {
  let filtered = [...tousEvenements];
  const now = new Date();
  if (vueActuelle === "mes") {
    const idsInscrits = inscriptions.map((i) => i.id_evenement);
    filtered = filtered.filter(
      (e) =>
        idsInscrits.includes(e.id_evenement) &&
        (!e.date_heure || new Date(e.date_heure) >= now),
    );
  } else if (vueActuelle === "passes") {
    const idsInscrits = inscriptions.map((i) => i.id_evenement);
    filtered = filtered.filter(
      (e) =>
        idsInscrits.includes(e.id_evenement) &&
        e.date_heure &&
        new Date(e.date_heure) < now,
    );
  } else {
    filtered = filtered.filter((e) => {
      const isPasse = e.date_heure && new Date(e.date_heure) < now;
      return !isPasse;
    });
  }
  if (categorieActuelle) {
    filtered = filtered.filter((e) => e.nom_categorie === categorieActuelle);
  }
  renderEvenements(filtered);
}

function changerQteEvent(id, delta, maxPlaces) {
  if (!quantitesEvent[id]) quantitesEvent[id] = 1;
  const newQty = quantitesEvent[id] + delta;
  if (newQty < 1 || newQty > maxPlaces) return;
  quantitesEvent[id] = newQty;

  const qtyEl = document.getElementById(`qty-evt-${id}`);
  const btnMoins = document.getElementById(`btn-moins-evt-${id}`);
  const btnPlus = document.getElementById(`btn-plus-evt-${id}`);

  if (qtyEl) qtyEl.textContent = newQty;
  if (btnMoins) {
    btnMoins.classList.toggle("opacity-30", newQty <= 1);
    btnMoins.classList.toggle("pointer-events-none", newQty <= 1);
  }
  if (btnPlus) {
    btnPlus.classList.toggle("opacity-30", newQty >= maxPlaces);
    btnPlus.classList.toggle("pointer-events-none", newQty >= maxPlaces);
  }
}

async function ajouterEventAuPanier(id) {
  const qty = quantitesEvent[id] || 1;
  await ajouterAuPanier("evenement", id, qty);
}

function renderCategories() {
  const cats = [
    ...new Set(tousEvenements.map((e) => e.nom_categorie).filter(Boolean)),
  ];
  const container = document.getElementById("filtresCat");
  container.querySelectorAll(".btn-cat").forEach((b) => b.remove());
  cats.forEach((cat) => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.className =
      "btn-cat px-5 py-2 rounded-full font-fira text-sm bg-white border-2 border-[#7CABD3] text-[#7CABD3] hover:bg-[#7CABD3] hover:text-white transition-all";
    btn.onclick = () => filtrerCategorie(cat);
    container.appendChild(btn);
  });
}

function renderEvenements(events) {
  const container = document.getElementById("evenementsList");

  if (!events.length) {
    let msgVide = "Aucun événement disponible.";
    if (vueActuelle === "mes")
      msgVide = "Vous n'êtes inscrit à aucun événement à venir.";
    if (vueActuelle === "passes") msgVide = "Aucun événement passé.";

    container.innerHTML = `
      <div class="text-center col-span-3 py-16">
        <iconify-icon icon="${vueActuelle === "passes" ? "mdi:history" : "mdi:calendar-blank"}" class="text-5xl text-gray-300 mb-3 block"></iconify-icon>
        <p class="text-gray-400 italic">${msgVide}</p>
      </div>`;
    return;
  }

  container.innerHTML = events
    .map((e) => {
      const date = e.date_heure
        ? new Date(e.date_heure).toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })
        : "—";
      const heure = e.date_heure
        ? new Date(e.date_heure).toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "";
      const isInscrit = inscriptions.some(
        (i) => i.id_evenement === e.id_evenement,
      );
      const placesRestantes = (e.nb_places_max || 0) - (e.nb_inscrits || 0);
      const isComplet = placesRestantes <= 0;
      const isPasse = e.date_heure && new Date(e.date_heure) < new Date();
      const placesColor = isComplet
        ? "text-red-500"
        : placesRestantes <= 5
          ? "text-orange-500"
          : "text-gray-400";
      const placesLabel = isComplet
        ? "Complet"
        : `${placesRestantes} place(s) restante(s)`;

      const qty = quantitesEvent[e.id_evenement] || 1;

      let bouton = "";
      if (isInscrit && !isPasse) {
        bouton = `
        <div class="flex items-center gap-2">
          <span class="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full font-fira text-sm uppercase">Inscrit</span>
          <button onclick="annulerInscription(${e.id_evenement})"
            class="px-4 py-2 bg-red-100 text-red-600 rounded-full font-fira text-sm uppercase hover:bg-red-600 hover:text-white transition-all">
            Annuler
          </button>
        </div>`;
      } else if (isPasse) {
        bouton = `<span class="px-6 py-3 bg-gray-100 text-gray-500 rounded-full font-fira text-sm uppercase">Terminé</span>`;
      } else if (isComplet) {
        bouton = `<span class="px-6 py-3 bg-red-100 text-red-600 rounded-full font-fira text-sm uppercase">Complet</span>`;
      } else {
        bouton = `
        <div class="flex items-center gap-2">
          <button id="btn-moins-evt-${e.id_evenement}" onclick="changerQteEvent(${e.id_evenement}, -1, ${placesRestantes})"
            class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 font-fira text-base transition-all opacity-30 pointer-events-none">−</button>
          <span id="qty-evt-${e.id_evenement}" class="font-fira text-[#1A2B49] text-base w-6 text-center">${qty}</span>
          <button id="btn-plus-evt-${e.id_evenement}" onclick="changerQteEvent(${e.id_evenement}, 1, ${placesRestantes})"
            class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 font-fira text-base transition-all ${placesRestantes <= 1 ? "opacity-30 pointer-events-none" : ""}">+</button>
          <button onclick="ajouterEventAuPanier(${e.id_evenement})"
            class="px-3 py-1.5 bg-[#7CABD3]/10 text-[#7CABD3] rounded-full font-fira text-sm hover:bg-[#7CABD3] hover:text-white transition-all">
            <iconify-icon icon="mdi:cart-plus"></iconify-icon>
          </button>
          <button onclick="ouvrirModal(${e.id_evenement})"
            class="px-4 py-1.5 bg-[#1A2B49] text-white rounded-full font-fira text-xs uppercase hover:bg-[#7CABD3] transition-all">
            Réserver
          </button>
        </div>`;
      }

      return `
      <div class="group bg-white p-8 rounded-[40px] border-2 ${isPasse ? "opacity-60 border-gray-200" : "border-transparent hover:border-[#7CABD3] hover:shadow-xl"} transition-all duration-500">
        <div class="flex justify-between items-start mb-4">
          <span class="bg-[#7CABD3]/10 text-[#7CABD3] text-sm font-fira px-3 py-1 rounded-full">${esc(e.nom_categorie || "Événement")}</span>
          <span class="font-fira text-[#1A2B49] text-lg">${e.prix_ticket == 0 ? "Gratuit" : e.prix_ticket + " €"}</span>
        </div>
        <h4 class="font-fira text-[#1A2B49] text-2xl mb-3">${esc(e.titre)}</h4>
        <p class="text-base text-gray-500 mb-2"> ${date} à ${heure}</p>
        <p class="text-base text-gray-500 mb-2"> ${esc(e.lieu || "—")}</p>
        <p class="text-base text-gray-400 mb-6 leading-relaxed">${esc(e.description || "")}</p>
        <div class="flex items-center justify-between mt-auto">
          <span class="text-sm font-fira ${placesColor}">
            <iconify-icon icon="mdi:account-group"></iconify-icon>
            ${placesLabel}
          </span>
          ${bouton}
        </div>
      </div>`;
    })
    .join("");
}

function ouvrirModal(id) {
  selectedEventId = id;
  const e = tousEvenements.find((ev) => ev.id_evenement === id);
  if (!e) return;
  const date = e.date_heure
    ? new Date(e.date_heure).toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    : "—";
  document.getElementById("modalTitre").textContent = e.titre;
  document.getElementById("modalDetails").textContent =
    `${date} — ${e.lieu || "—"}`;
  document.getElementById("modalPrix").textContent =
    e.prix_ticket == 0 ? "Gratuit" : `${e.prix_ticket} €`;
  const modal = document.getElementById("modalInscription");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  setTimeout(() => modal.classList.remove("opacity-0"), 10);
}

function fermerModal() {
  const modal = document.getElementById("modalInscription");
  modal.classList.add("opacity-0");
  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }, 300);
}

function annulerInscription(idEvenement) {
  selectedAnnulationId = idEvenement;
  const modal = document.getElementById("modalAnnulation");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  setTimeout(() => modal.classList.remove("opacity-0"), 10);
}

function fermerModalAnnulation() {
  const modal = document.getElementById("modalAnnulation");
  modal.classList.add("opacity-0");
  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }, 300);
}

async function inscrire() {
  try {
    const res = await fetch(`${API_BASE}/admin/inscription_evenement/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_user: userId, id_evenement: selectedEventId }),
    });
    const data = await res.json();
    if (res.status === 409 && data.erreur === "complet") {
      showToast("Désolé, cet événement est complet !", "error");
      fermerModal();
      return;
    }
    if (!res.ok) throw new Error();
    showToast("Réservation confirmée !", "success");
    fermerModal();
    await Promise.all([loadEvenements(), loadInscriptions()]);
    appliquerFiltres();
  } catch {
    showToast("Erreur lors de la réservation.", "error");
  }
}

async function confirmerAnnulation() {
  fermerModalAnnulation();
  try {
    const res = await fetch(
      `${API_BASE}/admin/inscription_evenement/delete?id_user=${userId}&id_evenement=${selectedAnnulationId}`,
      { method: "DELETE" },
    );
    if (!res.ok) throw new Error();
    showToast("Réservation annulée.", "success");
    await Promise.all([loadEvenements(), loadInscriptions()]);
    appliquerFiltres();
  } catch {
    showToast("Erreur lors de l'annulation.", "error");
  }
}

function initModal() {
  document
    .getElementById("cancelInscription")
    .addEventListener("click", fermerModal);
  document.getElementById("btnGratuit").addEventListener("click", inscrire);
  document
    .getElementById("btnConfirmerAnnulation")
    .addEventListener("click", confirmerAnnulation);
  document
    .getElementById("btnCancelAnnulation")
    .addEventListener("click", fermerModalAnnulation);
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
