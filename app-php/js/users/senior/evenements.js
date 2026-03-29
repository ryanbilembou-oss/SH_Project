const API_BASE = "http://localhost:8082";
const userId = Number(localStorage.getItem("id_user"));
const role = localStorage.getItem("role");

if (!userId || role !== "senior") {
  window.location.href = "/users/login.php";
}

let tousEvenements = [];
let inscriptions = [];
let selectedEventId = null;
let selectedAnnulationId = null;

(async () => {
  await Promise.all([loadEvenements(), loadInscriptions()]);
  initModal();
})();

async function loadEvenements() {
  try {
    const res = await fetch(`${API_BASE}/admin/evenement/get`);
    tousEvenements = await res.json();
    renderCategories();
    renderEvenements(tousEvenements);
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
      "btn-cat px-5 py-2 rounded-full font-bold text-sm bg-white border-2 border-[#7CABD3] text-[#7CABD3] hover:bg-[#7CABD3] hover:text-white transition-all";
    btn.onclick = () => filtrerCategorie(cat);
    container.appendChild(btn);
  });
}

function filtrerCategorie(cat) {
  const filtered = cat
    ? tousEvenements.filter((e) => e.nom_categorie === cat)
    : tousEvenements;
  renderEvenements(filtered);
}

function renderEvenements(events) {
  const container = document.getElementById("evenementsList");
  if (!events.length) {
    container.innerHTML = `<p class="text-gray-400 italic text-center col-span-3 py-10">Aucun événement disponible.</p>`;
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

      let bouton = "";
      if (isInscrit) {
        bouton = `
        <div class="flex items-center gap-2">
          <span class="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full font-black text-sm uppercase">Inscrit</span>
          <button onclick="annulerInscription(${e.id_evenement})"
            class="px-4 py-2 bg-red-100 text-red-600 rounded-full font-black text-sm uppercase hover:bg-red-600 hover:text-white transition-all">
            Annuler
          </button>
        </div>`;
      } else if (isPasse) {
        bouton = `<span class="px-6 py-3 bg-gray-100 text-gray-500 rounded-full font-black text-sm uppercase">Terminé</span>`;
      } else if (isComplet) {
        bouton = `<span class="px-6 py-3 bg-red-100 text-red-600 rounded-full font-black text-sm uppercase">Complet</span>`;
      } else {
        bouton = `<button onclick="ouvrirModal(${e.id_evenement})"
        class="px-6 py-3 bg-[#1A2B49] text-white rounded-full font-black text-sm uppercase hover:bg-[#7CABD3] transition-all">
        Réserver
      </button>`;
      }

      return `
      <div class="group bg-white p-8 rounded-[40px] border-2 ${isPasse && !isInscrit ? "opacity-60 border-gray-200" : "border-transparent hover:border-[#7CABD3] hover:shadow-xl"} transition-all duration-500">
        <div class="flex justify-between items-start mb-4">
          <span class="bg-[#7CABD3]/10 text-[#7CABD3] text-sm font-black px-3 py-1 rounded-full">${esc(e.nom_categorie || "Événement")}</span>
          <span class="font-black text-[#1A2B49] text-lg">${e.prix_ticket == 0 ? "Gratuit" : e.prix_ticket + " €"}</span>
        </div>
        <h4 class="font-black text-[#1A2B49] text-2xl mb-3">${esc(e.titre)}</h4>
        <p class="text-base text-gray-500 mb-2">📅 ${date} à ${heure}</p>
        <p class="text-base text-gray-500 mb-2">📍 ${esc(e.lieu || "—")}</p>
        <p class="text-base text-gray-400 mb-6 leading-relaxed">${esc(e.description || "")}</p>
        <div class="flex items-center justify-between mt-auto">
          <span class="text-sm font-bold ${placesColor}">
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
