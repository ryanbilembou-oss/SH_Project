const API_BASE = "http://144.76.74.130:8082";
const userId = Number(localStorage.getItem("id_user"));
const role = localStorage.getItem("role");

if (!userId || role !== "pro") {
  window.location.href = "/users/login.php";
}

let categoriesCache = [];

(async () => {
  try {
    const resProfil = await fetch(
      `${API_BASE}/admin/profile_pro/getone?id=${userId}`,
    );
    if (!resProfil.ok) throw new Error("Profil introuvable");
    const profil = await resProfil.json();

    if (profil.statut_validation === "valide") {
      window.location.href = "/users/pro/accueil_pro.php";
      return;
    }
    if (profil.statut_validation === "refuse") {
      window.location.href = "/users/pro/dossier_refuse.php";
      return;
    }

    const idType = profil.id_type;
    document.getElementById("sousTitre").textContent =
      "Déposez les documents requis pour valider votre profil prestataire.";

    const [resCats, resDocs] = await Promise.all([
      fetch(`${API_BASE}/admin/categorie_document/get`),
      fetch(`${API_BASE}/admin/documents_pro/get`),
    ]);

    const allCats = await resCats.json();
    const allDocs = await resDocs.json();

    categoriesCache = Array.isArray(allCats)
      ? allCats.filter((c) => Number(c.id_type) === Number(idType))
      : [];

    const mesDocuments = Array.isArray(allDocs)
      ? allDocs.filter((d) => d.id_user === userId)
      : [];

    afficherDocuments(categoriesCache, mesDocuments);
  } catch (e) {
    console.error("Erreur init:", e);
    document.getElementById("listeDocs").innerHTML = `
      <div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-red-200 text-center">
        <iconify-icon icon="mdi:alert-circle" class="text-4xl text-red-300 mb-3 block"></iconify-icon>
        <p class="text-gray-400 italic">Erreur lors du chargement. Veuillez réessayer.</p>
      </div>`;
  }
})();

function afficherDocuments(categories, mesDocuments) {
  const container = document.getElementById("listeDocs");

  if (!categories.length) {
    container.innerHTML = `
      <div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-gray-200 text-center">
        <iconify-icon icon="mdi:check-circle" class="text-4xl text-green-400 mb-3 block"></iconify-icon>
        <p class="text-gray-400 italic">Aucun document requis pour votre type de profil.</p>
      </div>`;
    afficherBandeau(mesDocuments, categories);
    return;
  }

  container.innerHTML = categories
    .map((cat) => {
      const docExistant = mesDocuments.find(
        (d) => d.id_categorie === cat.id_categorie,
      );
      return carteDocument(cat, docExistant);
    })
    .join("");

  attacherEvents(categories);
  afficherBandeau(mesDocuments, categories);
}

function attacherEvents(categories) {
  categories.forEach((cat) => {
    const input = document.getElementById(`input-${cat.id_categorie}`);
    if (input) input.addEventListener("change", () => handleUpload(cat, input));
  });
}

function carteDocument(cat, docExistant) {
  const statut = docExistant?.statut ?? null;
  const id = cat.id_categorie;

  const config = {
    valide: {
      border: "border-green-300",
      bg: "bg-green-50",
      icon: "mdi:check-circle",
      iconColor: "text-green-400",
      label: "Validé",
      labelCss: "text-green-500",
    },
    en_attente: {
      border: "border-[#FCE297]",
      bg: "bg-yellow-50",
      icon: "mdi:clock-outline",
      iconColor: "text-[#FCE297]",
      label: "En attente",
      labelCss: "text-yellow-500",
    },
    refuse: {
      border: "border-red-300",
      bg: "bg-red-50",
      icon: "mdi:close-circle",
      iconColor: "text-red-400",
      label: "Refusé",
      labelCss: "text-red-500",
    },
    null: {
      border: "border-gray-200",
      bg: "bg-white",
      icon: "mdi:file-upload-outline",
      iconColor: "text-[#7CABD3]",
      label: "",
      labelCss: "",
    },
  };
  const c = config[statut] ?? config[null];

  const lienDoc = docExistant?.url_document
    ? `
    <div class="mb-4">
      <p class="font-fira text-[#1A2B49] text-2xl uppercase tracking-tight mb-2">
         ${esc(nomFichier(docExistant.url_document))}
      </p>
      <div class="flex items-center gap-4">
        <a href="http://172.16.90.10:8080${esc(docExistant.url_document)}" target="_blank"
           class="text-sm text-[#7CABD3] underline font-fira hover:text-[#1A2B49] transition-all">
          Voir le document
        </a>
        ${
          statut !== "valide"
            ? `
        <button onclick="supprimerDoc(${docExistant.id_doc}, ${id})"
                class="text-sm text-red-400 font-fira hover:text-red-600 transition-all underline">
          Supprimer
        </button>`
            : ""
        }
      </div>
    </div>`
    : "";

  const showUpload = statut !== "valide";
  const uploadZone = showUpload
    ? `
    <label for="input-${id}" class="cursor-pointer flex flex-col items-center gap-2 p-6 border-2 border-dashed border-gray-200 rounded-[20px] hover:border-[#7CABD3] transition-all group">
      <iconify-icon icon="mdi:cloud-upload" class="text-4xl text-gray-300 group-hover:text-[#7CABD3] transition-all"></iconify-icon>
      <span class="font-fira text-gray-400 text-base group-hover:text-[#7CABD3] transition-all">
        ${docExistant ? "Remplacer le document" : "Cliquez pour sélectionner un fichier"}
      </span>
      <span class="text-sm text-gray-300">PDF, JPG, PNG — max 10 Mo</span>
      <input type="file" id="input-${id}" class="hidden" accept=".pdf,.jpg,.jpeg,.png">
    </label>
    <div id="progress-${id}" class="hidden mt-3">
      <div class="w-full bg-gray-100 rounded-full h-2">
        <div class="bg-[#7CABD3] h-2 rounded-full animate-pulse w-full"></div>
      </div>
      <p class="text-sm text-gray-400 text-center mt-2 font-fira">Envoi en cours...</p>
    </div>
    <div id="feedback-${id}" class="hidden mt-3 text-center font-fira text-base"></div>`
    : "";

  return `
    <div class="${c.bg} p-6 rounded-[40px] border-2 ${c.border} transition-all" id="carte-${id}">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
          <iconify-icon icon="${c.icon}" class="text-3xl ${c.iconColor}"></iconify-icon>
          <span class="font-fira uppercase text-[#1A2B49] text-xl">${esc(cat.nom_categorie)}</span>
        </div>
        ${statut ? `<span class="font-fira text-sm uppercase tracking-widest ${c.labelCss}">${c.label}</span>` : ""}
      </div>
      ${lienDoc}
      ${uploadZone}
    </div>`;
}

async function supprimerDoc(idDoc, idCategorie) {
  if (!confirm("Supprimer ce document ?")) return;
  try {
    const res = await fetch(
      `${API_BASE}/admin/documents_pro/delete?id=${idDoc}`,
      {
        method: "DELETE",
      },
    );
    if (!res.ok) {
      alert("Erreur lors de la suppression.");
      return;
    }

    const resDocs = await fetch(`${API_BASE}/admin/documents_pro/get`);
    const allDocs = await resDocs.json();
    const mesDocuments = Array.isArray(allDocs)
      ? allDocs.filter((d) => d.id_user === userId)
      : [];

    const cat = categoriesCache.find((c) => c.id_categorie === idCategorie);
    const carte = document.getElementById(`carte-${idCategorie}`);
    if (carte && cat) {
      carte.outerHTML = carteDocument(cat, null);

      const input = document.getElementById(`input-${idCategorie}`);
      if (input)
        input.addEventListener("change", () => handleUpload(cat, input));
    }
    afficherBandeau(mesDocuments, categoriesCache);
  } catch (e) {
    alert("Erreur réseau.");
    console.error(e);
  }
}

async function handleUpload(cat, input) {
  const file = input.files[0];
  if (!file) return;

  const id = cat.id_categorie;
  const progressEl = document.getElementById(`progress-${id}`);
  const feedbackEl = document.getElementById(`feedback-${id}`);
  const label = input.closest("label");

  progressEl.classList.remove("hidden");
  if (label) label.classList.add("opacity-50", "pointer-events-none");
  feedbackEl.classList.add("hidden");

  const formData = new FormData();
  formData.append("id_user", String(userId));
  formData.append("id_categorie", String(id));
  formData.append("type_doc", cat.nom_categorie);
  formData.append("fichier", file);

  try {
    const res = await fetch(`${API_BASE}/admin/documents_pro/upload`, {
      method: "POST",
      body: formData,
    });

    progressEl.classList.add("hidden");

    if (res.status === 201) {
      feedbackEl.innerHTML = `<span class="text-green-500">✓ Document envoyé avec succès !</span>`;
      feedbackEl.classList.remove("hidden");

      setTimeout(async () => {
        const resDocs = await fetch(`${API_BASE}/admin/documents_pro/get`);
        const allDocs = await resDocs.json();
        const mesDocuments = Array.isArray(allDocs)
          ? allDocs.filter((d) => d.id_user === userId)
          : [];
        const docMisAJour = mesDocuments.find((d) => d.id_categorie === id);
        const carte = document.getElementById(`carte-${id}`);
        if (carte) {
          carte.outerHTML = carteDocument(cat, docMisAJour);
          const input = document.getElementById(`input-${id}`);
          if (input)
            input.addEventListener("change", () => handleUpload(cat, input));
        }
        afficherBandeau(mesDocuments, categoriesCache);
      }, 1000);
    } else {
      const data = await res.json().catch(() => ({}));
      feedbackEl.innerHTML = `<span class="text-red-400">✗ ${esc(data.erreur || "Erreur lors de l'envoi")}</span>`;
      feedbackEl.classList.remove("hidden");
      if (label) label.classList.remove("opacity-50", "pointer-events-none");
    }
  } catch (e) {
    progressEl.classList.add("hidden");
    feedbackEl.innerHTML = `<span class="text-red-400">✗ Erreur réseau. Veuillez réessayer.</span>`;
    feedbackEl.classList.remove("hidden");
    if (label) label.classList.remove("opacity-50", "pointer-events-none");
    console.error("upload:", e);
  }
}

function afficherBandeau(mesDocuments, categories) {
  const bandeau = document.getElementById("bandeauStatut");
  const total = categories?.length ?? 0;
  const enAttente = mesDocuments.filter(
    (d) => d.statut === "en_attente",
  ).length;
  const valides = mesDocuments.filter((d) => d.statut === "valide").length;

  if (!total) return;
  bandeau.classList.remove("hidden");

  if (valides + enAttente === total && enAttente > 0) {
    bandeau.className =
      "mb-8 p-5 rounded-[30px] border-2 border-[#FCE297] bg-yellow-50 text-center font-fira text-lg text-yellow-600";
    bandeau.innerHTML = `
      <iconify-icon icon="mdi:clock-outline" class="text-3xl mb-2 block"></iconify-icon>
      Votre dossier est en cours de vérification par notre équipe.<br>
      <span class="text-base text-gray-400">Vous serez notifié dès qu'une décision sera prise.</span>`;
  } else {
    const restant =
      total - mesDocuments.filter((d) => d.statut !== null).length;
    bandeau.className =
      "mb-8 p-5 rounded-[30px] border-2 border-gray-200 bg-white text-center font-fira text-lg text-gray-500";
    bandeau.innerHTML = `
      <iconify-icon icon="mdi:information-outline" class="text-3xl mb-2 block text-[#7CABD3]"></iconify-icon>
      ${restant} document${restant > 1 ? "s" : ""} restant${restant > 1 ? "s" : ""} à déposer.`;
  }
}

function nomFichier(url) {
  if (!url) return "";
  const raw = url.split("/").pop();
  return raw.replace(/^\d+_/, "").replace(/_/g, " ");
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
