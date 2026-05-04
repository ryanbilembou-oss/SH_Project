const API_BASE = "http://localhost:8082";
const userId = Number(localStorage.getItem("id_user"));
const role = localStorage.getItem("role");

if (!userId || role !== "pro") {
  window.location.href = "/users/login.php";
}

let profil = null;
let modeEdition = false;

(async () => {
  await loadProfil();
})();

async function loadProfil() {
  const container = document.getElementById("profilContainer");
  try {
    const res = await fetch(
      `${API_BASE}/admin/profile_pro/getone?id=${userId}`,
    );
    if (!res.ok) throw new Error();
    profil = await res.json();
    renderProfil();
  } catch {
    container.innerHTML = `
      <div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-red-200 text-center">
        <p class="text-gray-400 italic">Erreur de chargement du profil.</p>
      </div>`;
  }
}

function renderProfil() {
  const container = document.getElementById("profilContainer");
  const p = profil;

  const statutConfig = {
    valide: {
      css: "bg-green-100 text-green-700",
      label: "Validé",
      icon: "mdi:check-circle",
    },
    en_attente: {
      css: "bg-yellow-100 text-yellow-700",
      label: "En attente",
      icon: "mdi:clock-outline",
    },
    refuse: {
      css: "bg-red-100 text-red-700",
      label: "Refusé",
      icon: "mdi:close-circle",
    },
  };
  const st = statutConfig[p.statut_validation] || {
    css: "bg-gray-100 text-gray-500",
    label: p.statut_validation || "—",
    icon: "mdi:help",
  };

  const note =
    p.note_moyenne > 0
      ? `${"★".repeat(Math.round(p.note_moyenne))}${"☆".repeat(5 - Math.round(p.note_moyenne))} (${Number(p.note_moyenne).toFixed(1)})`
      : "Pas encore noté";

  container.innerHTML = `

    <!-- En-tête profil -->
    <div class="bg-white p-8 rounded-[40px] border-2 border-transparent hover:border-[#7CABD3] transition-all">
      <div class="flex items-center gap-6 flex-wrap">
        <div class="w-24 h-24 bg-[#7CABD3]/10 rounded-full flex items-center justify-center flex-shrink-0">
          ${
            p.logo_url
              ? `<img src="${esc(p.logo_url)}" class="w-24 h-24 rounded-full object-cover" alt="Logo">`
              : `<iconify-icon icon="mdi:account" class="text-5xl text-[#7CABD3]"></iconify-icon>`
          }
        </div>
        <div class="flex-1">
          <h3 class="font-fira text-[#1A2B49] text-4xl">${esc(p.prenom || "")} ${esc(p.nom || "")}</h3>
          <p class="text-gray-400 text-lg">${esc(p.nom_entreprise || "Indépendant")}</p>
          <p class="text-yellow-400 text-xl mt-1">${note}</p>
        </div>
        <div class="flex flex-col items-end gap-3">
          <span class="font-fira text-sm px-4 py-2 rounded-full ${st.css}">
            <iconify-icon icon="${st.icon}" class="mr-1"></iconify-icon>${st.label}
          </span>
          <button onclick="basculerEdition()"
            class="flex items-center gap-2 px-6 py-3 bg-[#1A2B49] text-white rounded-full font-fira uppercase text-sm hover:bg-[#7CABD3] transition-all">
            <iconify-icon icon="mdi:pencil"></iconify-icon> Modifier
          </button>
        </div>
      </div>
    </div>

    <!-- Infos personnelles -->
    <div class="bg-white p-8 rounded-[40px] border-2 border-transparent hover:border-[#7CABD3] transition-all">
      <h4 class="font-fira uppercase text-[#1A2B49] text-xl mb-6 flex items-center gap-2">
        <iconify-icon icon="mdi:account-details" class="text-[#7CABD3]"></iconify-icon>
        Informations personnelles
      </h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${champInfo("Prénom", p.prenom, "prenom")}
        ${champInfo("Nom", p.nom, "nom")}
        ${champInfo("Date de naissance", p.date_naissance?.split("T")[0], "date_naissance", "date")}
        ${champInfo("Genre", p.genre, "genre", "select", ["homme", "femme", "autre"])}
        ${champInfo("Téléphone", p.telephone_pro, "telephone_pro")}
      </div>
    </div>

    <!-- Infos professionnelles -->
    <div class="bg-white p-8 rounded-[40px] border-2 border-transparent hover:border-[#7CABD3] transition-all">
      <h4 class="font-fira uppercase text-[#1A2B49] text-xl mb-6 flex items-center gap-2">
        <iconify-icon icon="mdi:briefcase" class="text-[#7CABD3]"></iconify-icon>
        Informations professionnelles
      </h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${champInfo("Nom d'entreprise", p.nom_entreprise, "nom_entreprise")}
        ${champInfo("Adresse pro", p.adresse_pro, "adresse_pro")}
        ${champInfo("Statut juridique", p.statut_juridique, "statut_juridique")}
        ${champInfo("SIRET", p.siret, "siret")}
        ${champInfo("RIB / IBAN", p.rib, "rib")}
      </div>
      <div class="mt-6">
        ${champTextarea("Présentation / Bio", p.bio, "bio")}
      </div>
    </div>

    <!-- Abonnement + Commission -->
    <div class="bg-white p-8 rounded-[40px] border-2 border-transparent hover:border-[#7CABD3] transition-all">
      <h4 class="font-fira uppercase text-[#1A2B49] text-xl mb-6 flex items-center gap-2">
        <iconify-icon icon="mdi:credit-card" class="text-[#7CABD3]"></iconify-icon>
        Abonnement & Commission
      </h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-5 rounded-[20px] bg-gray-50">
          <p class="font-fira uppercase text-xs tracking-widest text-gray-400 mb-1">Abonnement</p>
          <p class="font-fira text-[#1A2B49] text-xl">
            ${
              p.is_subscription_valid
                ? `<span class="text-green-500"><iconify-icon icon="mdi:check-circle"></iconify-icon> Actif</span>`
                : `<span class="text-red-400"><iconify-icon icon="mdi:close-circle"></iconify-icon> Inactif</span>`
            }
          </p>
        </div>
        <div class="p-5 rounded-[20px] bg-gray-50">
          <p class="font-fira uppercase text-xs tracking-widest text-gray-400 mb-1">Commission Silver Happy</p>
          <p class="font-fira text-[#1A2B49] text-xl">${p.commission != null ? Number(p.commission).toFixed(1) + " %" : "15 %"}</p>
        </div>
      </div>
    </div>

    <!-- Bouton sauvegarder (caché si pas en mode édition) -->
    <div id="btnSauvegarder" class="hidden">
      <div class="flex gap-4">
        <button onclick="sauvegarderProfil()"
          class="flex-1 py-4 bg-[#7CABD3] text-white rounded-full font-fira uppercase hover:bg-[#1A2B49] transition-all">
          <iconify-icon icon="mdi:content-save" class="mr-2"></iconify-icon> Sauvegarder
        </button>
        <button onclick="annulerEdition()"
          class="flex-1 py-4 border-2 border-gray-200 text-gray-400 rounded-full font-fira uppercase hover:border-red-300 hover:text-red-400 transition-all">
          Annuler
        </button>
      </div>
    </div>
  `;
}

function champInfo(label, value, field, type = "text", options = []) {
  const val = value ?? "";
  if (type === "select") {
    return `
    <div>
      <p class="font-fira uppercase text-xs tracking-widest text-gray-400 mb-1">${label}</p>
      <select id="field-${field}" disabled
        class="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-[20px] font-fira text-[#1A2B49] focus:outline-none focus:border-[#7CABD3] disabled:opacity-60">
        <option value="">— Choisir —</option>
        ${options.map((o) => `<option value="${o}" ${val === o ? "selected" : ""}>${o.charAt(0).toUpperCase() + o.slice(1)}</option>`).join("")}
      </select>
    </div>`;
  }
  return `
  <div>
    <p class="font-fira uppercase text-xs tracking-widest text-gray-400 mb-1">${label}</p>
    <input type="${type}" id="field-${field}" value="${esc(String(val))}" disabled
      class="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-[20px] font-fira text-[#1A2B49] focus:outline-none focus:border-[#7CABD3] disabled:opacity-60">
  </div>`;
}

function champTextarea(label, value, field) {
  const val = value ?? "";
  return `
  <div>
    <p class="font-fira uppercase text-xs tracking-widest text-gray-400 mb-1">${label}</p>
    <textarea id="field-${field}" rows="4" disabled
      class="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-[20px] font-fira text-[#1A2B49] focus:outline-none focus:border-[#7CABD3] resize-none disabled:opacity-60">${esc(String(val))}</textarea>
  </div>`;
}

function basculerEdition() {
  modeEdition = true;

  document.querySelectorAll("[id^='field-']").forEach((el) => {
    el.disabled = false;
    el.classList.add("border-[#7CABD3]", "bg-white");
    el.classList.remove("bg-gray-50");
  });
  document.getElementById("btnSauvegarder").classList.remove("hidden");
  showToast("Mode édition activé.", "info");
}

function annulerEdition() {
  modeEdition = false;
  renderProfil();
}

async function sauvegarderProfil() {
  const getValue = (id) => {
    const el = document.getElementById(`field-${id}`);
    return el ? el.value.trim() || null : null;
  };

  const champsRequis = [
    { id: "nom", label: "Nom" },
    { id: "prenom", label: "Prénom" },
    { id: "telephone_pro", label: "Téléphone" },
    { id: "adresse_pro", label: "Adresse professionnelle" },
    { id: "siret", label: "SIRET" },
    { id: "rib", label: "RIB / IBAN" },
  ];

  const manquants = champsRequis.filter((c) => !getValue(c.id));

  if (manquants.length) {
    ouvrirModalValidation(manquants.map((c) => c.label));
    return;
  }
  const body = {
    id_user: userId,
    nom: getValue("nom"),
    prenom: getValue("prenom"),
    nom_entreprise: getValue("nom_entreprise"),
    adresse_pro: getValue("adresse_pro"),
    statut_juridique: getValue("statut_juridique"),
    date_naissance: getValue("date_naissance"),
    genre: getValue("genre"),
    telephone_pro: getValue("telephone_pro"),
    siret: getValue("siret"),
    bio: getValue("bio"),
    rib: getValue("rib"),
  };

  try {
    const res = await fetch(`${API_BASE}/admin/profile_pro/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      showToast("Profil mis à jour !", "success");
      modeEdition = false;
      await loadProfil();
    } else {
      showToast("Erreur lors de la sauvegarde.", "error");
    }
  } catch {
    showToast("Erreur réseau.", "error");
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
function ouvrirModalValidation(champs) {
  const liste = document.getElementById("listeManquants");
  liste.innerHTML = champs
    .map(
      (c) => `
    <li class="flex items-center gap-3 bg-red-50 border border-red-200 px-4 py-3 rounded-[15px]">
      <iconify-icon icon="mdi:close-circle" class="text-red-400 text-xl flex-shrink-0"></iconify-icon>
      <span class="font-fira text-[#1A2B49]">${c}</span>
    </li>`,
    )
    .join("");
  document.getElementById("modalValidation").classList.remove("hidden");
}
