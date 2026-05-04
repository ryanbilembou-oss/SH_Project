const API_BASE = "http://localhost:8082";

let allNego = [];
let filtreCourant = "tous";
let selectedId = null;

(async () => {
  await loadNego();
})();

async function loadNego() {
  const container = document.getElementById("listeNego");
  try {
    const res = await fetch(`${API_BASE}/admin/negociation_commission/get`);
    allNego = await res.json();
    if (!Array.isArray(allNego)) allNego = [];
    renderNego();
  } catch {
    container.innerHTML = `<p class="text-red-400 italic">Erreur de chargement.</p>`;
  }
}

function filtrer(statut) {
  filtreCourant = statut;
  document.querySelectorAll(".filtre-btn").forEach((b) => {
    b.className =
      "filtre-btn px-5 py-2 rounded-full font-fira text-sm uppercase bg-white border-2 border-gray-200 text-gray-500 transition-all";
  });
  const active = document.getElementById(`btn-${statut}`);
  if (active)
    active.className =
      "filtre-btn px-5 py-2 rounded-full font-fira text-sm uppercase bg-gray-800 text-white transition-all";
  renderNego();
}

function renderNego() {
  const container = document.getElementById("listeNego");
  let data =
    filtreCourant === "tous"
      ? allNego
      : allNego.filter((d) => d.statut === filtreCourant);

  if (!data.length) {
    container.innerHTML = `
      <div class="bg-white rounded-2xl p-8 text-center shadow-sm">
        <iconify-icon icon="mdi:handshake-outline" class="text-5xl text-gray-300 mb-3 block"></iconify-icon>
        <p class="text-gray-400 italic">Aucune négociation${filtreCourant !== "tous" ? " avec ce statut" : ""}.</p>
      </div>`;
    return;
  }

  const statutConfig = {
    en_attente: {
      css: "bg-yellow-100 text-yellow-700 border-yellow-200",
      label: "En attente",
      icon: "mdi:clock-outline",
    },
    accepte: {
      css: "bg-green-100 text-green-700 border-green-200",
      label: "Acceptée",
      icon: "mdi:check-circle",
    },
    refuse: {
      css: "bg-red-100 text-red-700 border-red-200",
      label: "Refusée",
      icon: "mdi:close-circle",
    },
  };

  container.innerHTML = data
    .map((d) => {
      const st = statutConfig[d.statut] || {
        css: "bg-gray-100 text-gray-500 border-gray-200",
        label: d.statut,
        icon: "mdi:help",
      };
      const date = new Date(d.date_demande).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      const diff = d.taux_propose - d.taux_actuel;
      const diffLabel =
        diff < 0
          ? `<span class="text-green-600 font-bold">${diff.toFixed(1)}%</span>`
          : `<span class="text-red-500 font-bold">+${diff.toFixed(1)}%</span>`;

      return `
    <div class="bg-white rounded-2xl shadow-sm p-6 border-l-4 ${d.statut === "en_attente" ? "border-yellow-400" : d.statut === "accepte" ? "border-green-400" : "border-red-400"}">
      <div class="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div class="flex items-center gap-3 mb-1">
            <iconify-icon icon="mdi:account-tie" class="text-2xl text-gray-500"></iconify-icon>
            <p class="font-fira text-gray-800 text-xl">${esc(d.prenom)} ${esc(d.nom)}</p>
            ${d.nom_entreprise ? `<span class="text-xs text-gray-400 font-fira">${esc(d.nom_entreprise)}</span>` : ""}
          </div>
          <p class="text-gray-400 text-sm">${date}</p>
        </div>
        <span class="text-sm font-fira px-4 py-2 rounded-full border ${st.css}">
          <iconify-icon icon="${st.icon}" class="mr-1"></iconify-icon>${st.label}
        </span>
      </div>

      <div class="grid grid-cols-3 gap-4 my-5">
        <div class="bg-gray-50 rounded-xl p-4 text-center">
          <p class="text-xs text-gray-400 font-fira uppercase mb-1">Taux actuel</p>
          <p class="font-fira text-gray-700 text-2xl">${d.taux_actuel}%</p>
        </div>
        <div class="bg-blue-50 rounded-xl p-4 text-center">
          <p class="text-xs text-gray-400 font-fira uppercase mb-1">Taux proposé</p>
          <p class="font-fira text-blue-700 text-2xl">${d.taux_propose}%</p>
        </div>
        <div class="bg-gray-50 rounded-xl p-4 text-center">
          <p class="text-xs text-gray-400 font-fira uppercase mb-1">Différence</p>
          <p class="text-2xl font-fira">${diffLabel}</p>
        </div>
      </div>

      ${
        d.message
          ? `
      <div class="bg-gray-50 rounded-xl p-3 mb-4">
        <p class="text-xs text-gray-400 font-fira uppercase mb-1">Message du pro</p>
        <p class="text-gray-600 text-sm italic">"${esc(d.message)}"</p>
      </div>`
          : ""
      }

      ${
        d.reponse_admin
          ? `
      <div class="bg-blue-50 rounded-xl p-3 mb-4">
        <p class="text-xs text-gray-400 font-fira uppercase mb-1">Votre réponse</p>
        <p class="text-gray-600 text-sm">${esc(d.reponse_admin)}</p>
      </div>`
          : ""
      }

      ${
        d.statut === "en_attente"
          ? `
      <button onclick="ouvrirModal(${d.id}, ${d.taux_propose}, ${d.taux_actuel}, '${esc(d.prenom)} ${esc(d.nom)}')"
        class="w-full py-3 bg-gray-800 text-white rounded-xl font-fira uppercase hover:bg-blue-600 transition-all text-sm">
        <iconify-icon icon="mdi:gavel" class="mr-2"></iconify-icon> Répondre
      </button>`
          : ""
      }
    </div>`;
    })
    .join("");
}

function ouvrirModal(id, tauxPropose, tauxActuel, nomPro) {
  selectedId = id;
  document.getElementById("tauxFinal").value = "";
  document.getElementById("reponseAdmin").value = "";
  document.getElementById("modalDetails").innerHTML = `
    <p class="font-fira text-gray-700 text-lg mb-1">${esc(nomPro)}</p>
    <p class="text-gray-500 text-sm">Demande : <strong>${tauxActuel}%</strong> → <strong class="text-blue-600">${tauxPropose}%</strong></p>`;
  document.getElementById("modalReponse").classList.remove("hidden");
}

function fermerModal() {
  document.getElementById("modalReponse").classList.add("hidden");
  selectedId = null;
}

async function repondre(statut) {
  const tauxFinal = parseFloat(document.getElementById("tauxFinal").value) || 0;
  const reponseAdmin = document.getElementById("reponseAdmin").value.trim();

  try {
    const res = await fetch(
      `${API_BASE}/admin/negociation_commission/repondre`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedId,
          statut,
          reponse_admin: reponseAdmin,
          taux_final: tauxFinal,
        }),
      },
    );

    if (!res.ok) throw new Error();

    fermerModal();
    showToast(
      statut === "accepte"
        ? "Demande acceptée — commission mise à jour !"
        : "Demande refusée.",
      statut === "accepte" ? "success" : "error",
    );
    await loadNego();
  } catch {
    showToast("Erreur lors de la réponse.", "error");
  }
}

function showToast(message, type = "info") {
  const toast = document.getElementById("toast");
  document.getElementById("toastMsg").textContent = message;
  document.getElementById("toastIcon").textContent =
    type === "success" ? "✓" : type === "error" ? "✗" : "i";
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
