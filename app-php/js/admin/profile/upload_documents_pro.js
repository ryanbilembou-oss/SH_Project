var API_BASE = "http://localhost:8082";
const urlParams = new URLSearchParams(window.location.search);
const userId = Number(urlParams.get("id"));

let categories = [];
let uploadedDocs = {};

(async () => {
  await Promise.all([loadProInfo(), loadCategories(), loadExistingDocs()]);
  renderDocuments();
})();

async function loadProInfo() {
  try {
    const res = await fetch(
      `${API_BASE}/admin/profile_pro/getone?id=${userId}`,
    );
    const pro = await res.json();
    document.getElementById("proInfo").innerHTML = `
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 font-bold text-lg">
          ${esc(pro.prenom?.[0] || "?")}${esc(pro.nom?.[0] || "")}
        </div>
        <div>
          <div class="font-bold text-gray-800">${esc(pro.nom)} ${esc(pro.prenom)}</div>
          <div class="text-sm text-gray-500">${esc(pro.nom_entreprise || "—")} · ID #${userId}</div>
        </div>
        <div class="ml-auto">
          <span class="text-xs font-bold px-3 py-1 rounded-full ${pro.statut_validation === "valide" ? "bg-emerald-100 text-emerald-700" : pro.statut_validation === "refuse" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}">
            ${esc(pro.statut_validation || "en_attente")}
          </span>
        </div>
      </div>`;
  } catch {}
}

async function loadCategories() {
  try {
    const proRes = await fetch(
      `${API_BASE}/admin/profile_pro/getone?id=${userId}`,
    );
    const pro = await proRes.json();
    if (!pro.id_type) return;

    const catRes = await fetch(`${API_BASE}/admin/categorie_document/get`);
    const allCats = await catRes.json();
    categories = allCats.filter((c) => c.id_type === pro.id_type);
  } catch {}
}

async function loadExistingDocs() {
  try {
    const res = await fetch(`${API_BASE}/admin/documents_pro/get`);
    const all = await res.json();
    const myDocs = all.filter((d) => d.id_user === userId);
    myDocs.forEach((d) => {
      if (d.id_categorie) uploadedDocs[d.id_categorie] = d;
    });
  } catch {}
}

function renderDocuments() {
  const list = document.getElementById("documentsList");

  if (!categories.length) {
    list.innerHTML = `<p class="text-center text-gray-400 text-sm italic py-6">Aucun document requis pour ce type de prestataire.</p>`;
    return;
  }

  let uploadedCount = 0;

  list.innerHTML = categories
    .map((cat) => {
      const existing = uploadedDocs[cat.id_categorie];
      if (existing) uploadedCount++;

      const statutClass = existing
        ? existing.statut === "valide"
          ? "bg-emerald-100 text-emerald-700 border-emerald-200"
          : existing.statut === "refuse"
            ? "bg-red-100 text-red-700 border-red-200"
            : "bg-yellow-100 text-yellow-700 border-yellow-200"
        : "bg-gray-100 text-gray-500 border-gray-200";

      const statutLabel = existing
        ? existing.statut === "valide"
          ? "Validé"
          : existing.statut === "refuse"
            ? " Refusé"
            : "En attente"
        : "📎 Non uploadé";

      return `
      <div class="border rounded-xl p-4 ${existing ? "border-gray-200 bg-gray-50" : "border-dashed border-gray-300 bg-white"}">
        <div class="flex items-center justify-between mb-3">
          <div>
            <div class="font-semibold text-gray-800 text-sm">${esc(cat.nom_categorie)}</div>
            <div class="text-xs text-gray-400 mt-0.5">${esc(cat.nom_type)}</div>
          </div>
          <span class="text-xs font-bold px-2 py-1 rounded border ${statutClass}">${statutLabel}</span>
        </div>

        ${
          existing
            ? `
          <div class="flex items-center gap-3">
            <a href="${esc(existing.url_document)}" target="_blank" class="text-xs text-blue-600 hover:underline flex items-center gap-1">
              <i class="fas fa-file-alt"></i> Voir le document
            </a>
            <span class="text-gray-300">|</span>
            <button type="button" data-categorie="${cat.id_categorie}" class="btn-reupload text-xs text-gray-500 hover:text-blue-600 transition">
              Remplacer
            </button>
          </div>
        `
            : ""
        }

        <div class="mt-3 ${existing && !document.querySelector(`[data-reupload="${cat.id_categorie}"]`) ? "hidden" : ""}" id="upload-zone-${cat.id_categorie}">
          <div class="flex items-center gap-3">
            <input type="file" id="file-${cat.id_categorie}" accept=".pdf,.jpg,.jpeg,.png" class="text-sm text-gray-500 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100">
            <button type="button" data-categorie="${cat.id_categorie}" data-nom="${esc(cat.nom_categorie)}" class="btn-upload px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1">
              <i class="fas fa-upload"></i> Uploader
            </button>
          </div>
        </div>
      </div>`;
    })
    .join("");

  updateProgress(uploadedCount, categories.length);
  initUploadButtons();
  initReuploadButtons();
}

function updateProgress(uploaded, total) {
  const label = document.getElementById("progressLabel");
  const btn = document.getElementById("btnValiderDossier");
  label.textContent = `${uploaded} / ${total} documents uploadés`;
  btn.disabled = uploaded < total;
}

function initUploadButtons() {
  document.querySelectorAll(".btn-upload").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const categorieId = Number(btn.dataset.categorie);
      const nomDoc = btn.dataset.nom;
      const fileInput = document.getElementById(`file-${categorieId}`);

      if (!fileInput.files.length) {
        showToast("Veuillez choisir un fichier.", "error");
        return;
      }

      btn.disabled = true;
      btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Upload...`;

      const formData = new FormData();
      formData.append("fichier", fileInput.files[0]);
      formData.append("id_user", userId);
      formData.append("id_categorie", categorieId);
      formData.append("type_doc", nomDoc);

      try {
        const res = await fetch(`${API_BASE}/admin/documents_pro/upload`, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.erreur || "Erreur serveur.");

        uploadedDocs[categorieId] = {
          url_document: data.url,
          statut: "en_attente",
          id_categorie: categorieId,
        };
        showToast("Document uploadé !", "success");
        await loadExistingDocs();
        renderDocuments();
      } catch (err) {
        showToast(err.message || "Erreur upload.", "error");
      } finally {
        btn.disabled = false;
        btn.innerHTML = `<i class="fas fa-upload"></i> Uploader`;
      }
    });
  });
}

function initReuploadButtons() {
  document.querySelectorAll(".btn-reupload").forEach((btn) => {
    btn.addEventListener("click", () => {
      const categorieId = btn.dataset.categorie;
      const zone = document.getElementById(`upload-zone-${categorieId}`);
      if (zone) zone.classList.remove("hidden");
    });
  });
}

document
  .getElementById("btnValiderDossier")
  .addEventListener("click", async () => {
    const btn = document.getElementById("btnValiderDossier");
    btn.disabled = true;
    btn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i>Validation...`;

    try {
      const res = await fetch(`${API_BASE}/admin/profile_pro/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_user: userId,
          statut_validation: "en_attente",
        }),
      });
      if (!res.ok) throw new Error();
      showToast("Dossier soumis ! En attente de validation.", "success");
      setTimeout(() => {
        window.location.href = "../profile/admin_profile_pro.php";
      }, 2000);
    } catch {
      showToast("Erreur lors de la soumission.", "error");
    } finally {
      btn.disabled = false;
      btn.innerHTML = `<i class="fas fa-check-circle mr-2"></i>Valider le dossier`;
    }
  });

function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  const msgSpan = document.getElementById("toastMessage");
  const icon = document.getElementById("toastIcon");
  const styles = {
    success: { cls: "fas fa-check-circle", color: "text-emerald-400" },
    error: { cls: "fas fa-times-circle", color: "text-red-400" },
    info: { cls: "fas fa-info-circle", color: "text-blue-400" },
  };
  const s = styles[type] || styles.info;
  msgSpan.textContent = message;
  if (icon) icon.className = `${s.cls} ${s.color} text-xl`;
  container.classList.remove("-translate-y-20", "opacity-0");
  container.classList.add("translate-y-0", "opacity-100");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => {
    container.classList.remove("translate-y-0", "opacity-100");
    container.classList.add("-translate-y-20", "opacity-0");
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
