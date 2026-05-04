var API_BASE = "http://localhost:8082";
const userId = Number(localStorage.getItem("id_user"));
const role = localStorage.getItem("role");

if (!userId || role !== "pro") {
  window.location.href = "/users/login.php";
}

let offres = [];
let services = [];

(async () => {
  await Promise.all([loadServices(), loadOffres()]);
})();

async function loadServices() {
  const select = document.getElementById("inputService");
  try {
    const resProfil = await fetch(
      `${API_BASE}/admin/profile_pro/getone?id=${userId}`,
    );
    const profil = await resProfil.json();
    const idType = profil.id_type;

    if (!idType) {
      select.innerHTML = `<option value="">Aucun type configuré — contactez l'admin</option>`;
      return;
    }

    const resCats = await fetch(
      `${API_BASE}/admin/type_prestataire_categorie/get_by_type?id_type=${idType}`,
    );
    const catsAutorisees = await resCats.json();
    const idsCats = Array.isArray(catsAutorisees)
      ? catsAutorisees.map((c) => c.id_categorie)
      : [];

    const resServices = await fetch(`${API_BASE}/admin/service/get`);
    const tousServices = await resServices.json();
    services = Array.isArray(tousServices)
      ? tousServices.filter((s) => idsCats.includes(s.id_categorie))
      : [];

    select.innerHTML = services.length
      ? `<option value="">-- Choisir un service --</option>` +
        services
          .map((s) => `<option value="${s.id}">${esc(s.nom)}</option>`)
          .join("")
      : `<option value="">Aucun service disponible pour votre type</option>`;
  } catch {
    select.innerHTML = `<option value="">Erreur chargement</option>`;
  }
}

async function loadOffres() {
  const container = document.getElementById("offresList");
  try {
    const res = await fetch(`${API_BASE}/admin/offre_prestataire/get`);
    const all = await res.json();
    offres = Array.isArray(all) ? all.filter((o) => o.id_pro === userId) : [];
    renderOffres();
  } catch {
    container.innerHTML = `
      <div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-red-200 text-center col-span-2">
        <p class="text-gray-400 italic">Erreur de chargement.</p>
      </div>`;
  }
}

function renderOffres() {
  const container = document.getElementById("offresList");

  if (!offres.length) {
    container.innerHTML = `
      <div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-gray-200 text-center col-span-2">
        <iconify-icon icon="mdi:briefcase-remove" class="text-4xl text-gray-300 mb-3 block"></iconify-icon>
        <p class="text-gray-400 italic">Vous n'avez pas encore créé d'offre.</p>
      </div>`;
    return;
  }

  container.innerHTML = offres
    .map(
      (o) => `
    <div class="group bg-white p-6 rounded-[40px] border-2 border-transparent hover:border-[#7CABD3] hover:shadow-xl transition-all duration-300">
      <div class="flex items-start justify-between mb-4">
        <div class="flex-1">
          <span class="bg-[#7CABD3]/10 text-[#7CABD3] text-sm font-fira px-3 py-1 rounded-full">
            ${esc(o.nom_service || "Service")}
          </span>
          <h3 class="font-fira text-[#1A2B49] text-2xl mt-3">${esc(o.titre || "Sans titre")}</h3>
        </div>
        <div class="text-right ml-4">
          <p class="font-fira text-[#1A2B49] text-3xl font-bold">
            ${o.prix_personnalise ? Number(o.prix_personnalise).toFixed(2) + " €" : "—"}
          </p>
          <p class="text-gray-300 text-sm font-fira">par séance</p>
        </div>
      </div>
      ${o.bio ? `<p class="text-gray-400 text-base leading-snug mb-4 italic">"${esc(o.bio)}"</p>` : ""}
      <div class="flex gap-3 mt-4">
        <button onclick="ouvrirModalEdition(${o.id_offre})"
          class="flex-1 flex items-center justify-center gap-2 py-2 rounded-full border-2 border-[#7CABD3] text-[#7CABD3] font-fira uppercase text-sm hover:bg-[#7CABD3] hover:text-white transition-all">
          <iconify-icon icon="mdi:pencil"></iconify-icon> Modifier
        </button>
        <button onclick="supprimerOffre(${o.id_offre})"
          class="flex-1 flex items-center justify-center gap-2 py-2 rounded-full border-2 border-red-300 text-red-400 font-fira uppercase text-sm hover:bg-red-400 hover:text-white transition-all">
          <iconify-icon icon="mdi:delete"></iconify-icon> Supprimer
        </button>
      </div>
    </div>
  `,
    )
    .join("");
}

function ouvrirModalAjout() {
  document.getElementById("modalTitre").textContent = "Ajouter une offre";
  document.getElementById("inputIdOffre").value = "";
  document.getElementById("inputService").value = "";
  document.getElementById("inputTitre").value = "";
  document.getElementById("inputPrix").value = "";
  document.getElementById("inputBio").value = "";
  document.getElementById("modalOffre").classList.remove("hidden");
}

function ouvrirModalEdition(idOffre) {
  const o = offres.find((o) => o.id_offre === idOffre);
  if (!o) return;
  document.getElementById("modalTitre").textContent = "Modifier l'offre";
  document.getElementById("inputIdOffre").value = o.id_offre;
  document.getElementById("inputService").value = o.id_service ?? "";
  document.getElementById("inputTitre").value = o.titre ?? "";
  document.getElementById("inputPrix").value = o.prix_personnalise ?? "";
  document.getElementById("inputBio").value = o.bio ?? "";
  document.getElementById("modalOffre").classList.remove("hidden");
}

function fermerModal() {
  document.getElementById("modalOffre").classList.add("hidden");
}

async function sauvegarderOffre() {
  const idOffre = Number(document.getElementById("inputIdOffre").value);
  const idService = Number(document.getElementById("inputService").value);
  const titre = document.getElementById("inputTitre").value.trim();
  const prix = parseFloat(document.getElementById("inputPrix").value);
  const bio = document.getElementById("inputBio").value.trim();

  if (!idService) {
    showToast("Choisissez un service.", "error");
    return;
  }
  if (!titre) {
    showToast("Ajoutez un titre.", "error");
    return;
  }
  if (!prix || prix <= 0) {
    showToast("Prix invalide.", "error");
    return;
  }

  try {
    let res;
    if (idOffre > 0) {
      res = await fetch(`${API_BASE}/admin/offre_prestataire/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_offre: idOffre,
          id_pro: userId,
          id_service: idService,
          prix_personnalise: prix,
          titre,
          bio,
        }),
      });
    } else {
      res = await fetch(`${API_BASE}/admin/offre_prestataire/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_pro: userId,
          id_service: idService,
          prix_personnalise: prix,
          titre,
          bio,
        }),
      });
    }

    if (res.ok || res.status === 201) {
      fermerModal();
      showToast(
        idOffre > 0 ? "Offre mise à jour !" : "Offre créée !",
        "success",
      );
      await loadOffres();
    } else {
      const data = await res.json().catch(() => ({}));
      showToast(data.erreur || "Erreur lors de la sauvegarde.", "error");
    }
  } catch {
    showToast("Erreur réseau.", "error");
  }
}

async function supprimerOffre(idOffre) {
  if (!confirm("Supprimer cette offre ?")) return;
  try {
    const res = await fetch(
      `${API_BASE}/admin/offre_prestataire/delete?id=${idOffre}`,
      {
        method: "DELETE",
      },
    );
    if (res.ok) {
      showToast("Offre supprimée.", "success");
      await loadOffres();
    } else {
      showToast("Erreur lors de la suppression.", "error");
    }
  } catch {
    showToast("Erreur réseau.", "error");
  }
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
