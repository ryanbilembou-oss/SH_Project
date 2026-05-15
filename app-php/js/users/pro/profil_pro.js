const API_BASE = "http://144.76.74.130:8082";
const userId = Number(localStorage.getItem("id_user"));
const role = localStorage.getItem("role");

if (!userId || role !== "pro") window.location.href = "/users/login.php";

let profil = null;
let modeEdition = false;
let documents = [];
let categoriesCache = [];

(async () => {
  await loadProfil();
  await loadDocuments();
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

async function loadDocuments() {
  try {
    const [resCats, resDocs] = await Promise.all([
      fetch(`${API_BASE}/admin/categorie_document/get`),
      fetch(`${API_BASE}/admin/documents_pro/get`),
    ]);
    const allCats = await resCats.json();
    const allDocs = await resDocs.json();
    documents = Array.isArray(allDocs)
      ? allDocs.filter((d) => d.id_user === userId)
      : [];
    if (!profil || !profil.id_type) return;
    categoriesCache = Array.isArray(allCats)
      ? allCats.filter((c) => Number(c.id_type) === Number(profil.id_type))
      : [];
    renderDocuments();
  } catch {}
}

function renderProfil() {
  const container = document.getElementById("profilContainer");
  const p = profil;

  const statutConfig = {
    valide: {
      css: "bg-green-100 text-green-700",
      label: "Valide",
      icon: "mdi:check-circle",
    },
    en_attente: {
      css: "bg-yellow-100 text-yellow-700",
      label: "En attente",
      icon: "mdi:clock-outline",
    },
    refuse: {
      css: "bg-red-100 text-red-700",
      label: "Refuse",
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
      : "Pas encore note";

  container.innerHTML = `
    <div class="bg-white p-8 rounded-[40px] border-2 border-transparent hover:border-[#7CABD3] transition-all shadow-sm">
      <div class="flex items-center gap-6 flex-wrap">
        <div class="w-24 h-24 bg-[#7CABD3]/10 rounded-full flex items-center justify-center flex-shrink-0">
          ${p.logo_url ? `<img src="${esc(p.logo_url)}" class="w-24 h-24 rounded-full object-cover" alt="Logo">` : `<iconify-icon icon="mdi:account" class="text-5xl text-[#7CABD3]"></iconify-icon>`}
        </div>
        <div class="flex-1">
          <h3 class="font-fira text-[#1A2B49] text-4xl">${esc(p.prenom || "")} ${esc(p.nom || "")}</h3>
          <p class="text-gray-400 text-lg">${esc(p.nom_entreprise || "Independant")}</p>
          <p class="text-yellow-400 text-xl mt-1">${note}</p>
        </div>
        <div class="flex flex-col items-end gap-3">
          <span class="font-fira text-sm px-4 py-2 rounded-full ${st.css}">
            <iconify-icon icon="${st.icon}" class="mr-1"></iconify-icon>${st.label}
          </span>
          <button onclick="basculerEdition()" class="flex items-center gap-2 px-6 py-3 bg-[#1A2B49] text-white rounded-full font-fira uppercase text-sm hover:bg-[#7CABD3] transition-all shadow-md">
            <iconify-icon icon="mdi:pencil"></iconify-icon> Modifier le profil
          </button>
        </div>
      </div>
    </div>

    ${renderAccordionSection(
      "informations-personnelles",
      "Informations personnelles",
      "mdi:account-details",
      `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        ${champInfo("Prenom", p.prenom, "prenom")}
        ${champInfo("Nom", p.nom, "nom")}
        ${champInfo("Date de naissance", p.date_naissance?.split("T")[0], "date_naissance", "date")}
        ${champInfo("Genre", p.genre, "genre", "select", ["Masculin", "Feminin", "Autre"])}
        ${champInfo("Telephone", p.telephone_pro, "telephone_pro", "tel")}
      </div>
    `,
    )}

    ${renderAccordionSection(
      "informations-professionnelles",
      "Informations professionnelles",
      "mdi:briefcase",
      `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        ${champInfo("Nom d'entreprise", p.nom_entreprise, "nom_entreprise")}
        ${champInfo("Adresse pro", p.adresse_pro, "adresse_pro")}
        ${champInfo("Statut juridique", p.statut_juridique, "statut_juridique")}
        ${champInfo("SIRET", p.siret, "siret")}
        ${champInfo("RIB / IBAN", p.rib, "rib")}
      </div>
      <div class="mt-6">
        ${champTextarea("Presentation / Bio", p.bio, "bio")}
      </div>
    `,
    )}

    ${renderAccordionSection(
      "abonnement-commission",
      "Abonnement & Commission",
      "mdi:credit-card",
      `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div class="p-5 rounded-[20px] bg-gray-50 border border-gray-100">
          <p class="font-fira uppercase text-xs tracking-widest text-gray-400 mb-1">Abonnement</p>
          <p class="font-fira text-[#1A2B49] text-xl">
            ${
              p.is_subscription_valid
                ? `<span class="text-green-500"><iconify-icon icon="mdi:check-circle"></iconify-icon> Actif</span>`
                : `<span class="text-red-400"><iconify-icon icon="mdi:close-circle"></iconify-icon> Inactif</span>`
            }
          </p>
          <a href="/users/pro/abonnement_pro.php" class="text-[#7CABD3] text-xs underline mt-2 inline-block">Gerer mon abonnement</a>
        </div>
        <div class="p-5 rounded-[20px] bg-gray-50 border border-gray-100">
          <p class="font-fira uppercase text-xs tracking-widest text-gray-400 mb-1">Commission Silver Happy</p>
          <p class="font-fira text-[#1A2B49] text-2xl font-bold">${p.commission != null ? Number(p.commission).toFixed(1) + " %" : "15 %"}</p>
          <p class="text-xs text-gray-400 mt-1">Prelevee sur chaque intervention</p>
        </div>
      </div>
    `,
    )}

    ${renderAccordionSection(
      "mes-documents",
      "Mes documents justificatifs",
      "mdi:file-document-multiple",
      `
      <div id="documentsList" class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <p class="text-gray-400 italic text-sm">Chargement des documents...</p>
      </div>
      <div class="mt-6">
        <a href="/users/pro/upload_documents.php" class="inline-flex items-center gap-2 px-6 py-3 bg-[#7CABD3] text-white rounded-full font-fira uppercase text-sm hover:bg-[#1A2B49] transition-all">
          <iconify-icon icon="mdi:upload"></iconify-icon> Deposer des documents
        </a>
      </div>
    `,
    )}

    ${renderAccordionSection(
      "historique-archives",
      "Archives devis & factures",
      "mdi:history",
      `
      <div class="pt-4">
        <p class="text-gray-400 text-sm mb-6">Accedez a l'integralite de vos devis et factures archives.</p>
        <a href="/users/pro/archives_pro.php" class="inline-flex items-center gap-2 px-8 py-4 bg-[#1A2B49] text-white rounded-full font-fira uppercase text-sm hover:bg-[#7CABD3] transition-all shadow-lg">
          <iconify-icon icon="mdi:file-find" class="text-lg"></iconify-icon>
          Acceder aux archives
        </a>
      </div>
    `,
    )}

    <div id="btnSauvegarder" class="hidden mt-8">
      <div class="flex gap-4">
        <button onclick="sauvegarderProfil()" class="flex-1 py-4 bg-[#7CABD3] text-white rounded-full font-fira uppercase hover:bg-[#1A2B49] transition-all shadow-lg">
          <iconify-icon icon="mdi:content-save" class="mr-2"></iconify-icon> Sauvegarder les modifications
        </button>
        <button onclick="annulerEdition()" class="flex-1 py-4 border-2 border-gray-200 text-gray-400 rounded-full font-fira uppercase hover:border-red-300 hover:text-red-400 transition-all">
          Annuler
        </button>
      </div>
    </div>`;

  loadDocuments();
}

function renderAccordionSection(id, title, icon, content) {
  return `
    <div class="bg-white rounded-[40px] border-2 border-transparent hover:border-[#7CABD3] transition-all shadow-sm overflow-hidden">
      <button onclick="toggleAccordion('${id}')" class="w-full px-8 py-6 flex justify-between items-center bg-white hover:bg-gray-50 transition-all outline-none">
        <h4 class="font-fira uppercase text-[#1A2B49] text-xl flex items-center gap-3">
          <iconify-icon icon="${icon}" class="text-[#7CABD3] text-2xl"></iconify-icon>
          ${title}
        </h4>
        <iconify-icon id="icon-${id}" icon="mdi:chevron-down" class="text-2xl text-[#7CABD3] transition-transform duration-300"></iconify-icon>
      </button>
      <div id="content-${id}" class="hidden px-8 pb-8 border-t border-gray-50">
        ${content}
      </div>
    </div>`;
}

function toggleAccordion(id) {
  const content = document.getElementById(`content-${id}`);
  const icon = document.getElementById(`icon-${id}`);
  const isOpen = !content.classList.contains("hidden");
  if (isOpen) {
    content.classList.add("hidden");
    icon.style.transform = "rotate(0deg)";
  } else {
    content.classList.remove("hidden");
    icon.style.transform = "rotate(180deg)";
  }
}

function renderDocuments() {
  const container = document.getElementById("documentsList");
  if (!container) return;

  if (!categoriesCache.length) {
    container.innerHTML = `<p class="text-gray-400 italic text-sm">Aucun document requis pour votre profil.</p>`;
    return;
  }

  container.innerHTML = categoriesCache
    .map((cat) => {
      const doc = documents.find((d) => d.id_categorie === cat.id_categorie);
      const statut = doc?.statut ?? null;

      const config = {
        valide: {
          border: "border-green-300",
          bg: "bg-green-50",
          icon: "mdi:check-circle",
          iconColor: "text-green-400",
          label: "Valide",
        },
        en_attente: {
          border: "border-[#FCE297]",
          bg: "bg-yellow-50",
          icon: "mdi:clock-outline",
          iconColor: "text-yellow-400",
          label: "En attente",
        },
        refuse: {
          border: "border-red-300",
          bg: "bg-red-50",
          icon: "mdi:close-circle",
          iconColor: "text-red-400",
          label: "Refuse",
        },
      };
      const c = config[statut] || {
        border: "border-gray-100",
        bg: "bg-gray-50",
        icon: "mdi:file-alert-outline",
        iconColor: "text-gray-300",
        label: "Non depose",
      };

      return `
    <div class="${c.bg} p-6 rounded-[30px] border-2 ${c.border} transition-all">
      <div class="flex justify-between items-start mb-3">
        <div class="flex items-center gap-2">
          <iconify-icon icon="${c.icon}" class="text-2xl ${c.iconColor}"></iconify-icon>
          <span class="font-fira uppercase text-[#1A2B49] text-sm font-bold">${esc(cat.nom_categorie)}</span>
        </div>
        <span class="text-xs font-fira uppercase tracking-widest ${c.iconColor}">${c.label}</span>
      </div>
      ${
        doc
          ? `
        <div class="mt-4">
          <a href="http://144.76.74.130:8888${esc(doc.url_document)}" target="_blank"
            class="w-full p-4 bg-white rounded-2xl border border-gray-100 flex items-center justify-center gap-2 text-sm text-[#1A2B49] hover:bg-[#7CABD3] hover:text-white transition-all font-fira uppercase tracking-widest">
            <iconify-icon icon="mdi:eye" class="text-xl"></iconify-icon> Visualiser
          </a>
        </div>`
          : `
        <div class="mt-4 p-4 bg-white/30 rounded-2xl border border-dashed border-gray-200 text-center">
          <span class="text-xs text-gray-400 italic">Aucun fichier disponible</span>
        </div>`
      }
    </div>`;
    })
    .join("");
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
        ${options.map((o) => `<option value="${o}" ${val === o ? "selected" : ""}>${o}</option>`).join("")}
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
  showToast("Mode edition active.", "info");
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

  const tel = getValue("telephone_pro");
  if (tel && !/^\d+$/.test(tel)) {
    showToast("Le telephone ne doit contenir que des chiffres.", "error");
    return;
  }
  if (tel && tel.length !== 10) {
    showToast("Le telephone doit contenir 10 chiffres.", "error");
    return;
  }

  const champsRequis = [
    { id: "nom", label: "Nom" },
    { id: "prenom", label: "Prenom" },
    { id: "telephone_pro", label: "Telephone" },
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
    telephone_pro: tel,
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
      showToast("Profil mis a jour !", "success");
      modeEdition = false;
      await loadProfil();
    } else {
      showToast("Erreur lors de la sauvegarde.", "error");
    }
  } catch {
    showToast("Erreur reseau.", "error");
  }
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

function showToast(message, type = "info") {
  const toast = document.getElementById("toast");
  document.getElementById("toastMsg").textContent = message;
  document.getElementById("toastIcon").textContent =
    type === "success" ? "V" : type === "error" ? "X" : "i";
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
