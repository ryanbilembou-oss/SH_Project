var API_BASE = "http://172.16.90.10:8082";
const urlParams = new URLSearchParams(window.location.search);
const userId = Number(urlParams.get("id"));

let docs = [];
let pendingDocId = null;
let pendingAction = null;

(async () => {
  await Promise.all([loadProInfo(), loadDocs()]);
  initModals();
})();

async function loadProInfo() {
  try {
    const res = await fetch(
      `${API_BASE}/admin/profile_pro/getone?id=${userId}`,
    );
    const pro = await res.json();
    document.getElementById("pageTitle").textContent =
      `Dossier — ${pro.nom} ${pro.prenom}`;
    const statutClass =
      pro.statut_validation === "valide"
        ? "bg-emerald-100 text-emerald-700"
        : pro.statut_validation === "refuse"
          ? "bg-red-100 text-red-700"
          : "bg-yellow-100 text-yellow-700";
    document.getElementById("proInfo").innerHTML = `
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 font-bold text-lg flex-shrink-0">
          ${esc(pro.prenom?.[0] || "?")}${esc(pro.nom?.[0] || "")}
        </div>
        <div class="flex-1">
          <div class="font-bold text-gray-800 text-base">${esc(pro.nom)} ${esc(pro.prenom)}</div>
          <div class="text-sm text-gray-500 mt-0.5">${esc(pro.nom_entreprise || "—")} · Pro #${userId}</div>
          ${pro.siret ? `<div class="text-xs text-gray-400 mt-0.5">SIRET : ${esc(pro.siret)}</div>` : ""}
        </div>
        <span class="text-xs font-bold px-3 py-1 rounded-full uppercase ${statutClass}">
          ${esc(pro.statut_validation || "en_attente")}
        </span>
      </div>`;
  } catch {}
}

async function loadDocs() {
  try {
    const res = await fetch(`${API_BASE}/admin/documents_pro/get`);
    const all = await res.json();
    docs = all.filter((d) => d.id_user === userId);
    renderDocs();
  } catch {
    document.getElementById("documentsList").innerHTML =
      `<p class="text-red-500 text-center text-sm p-6">Erreur de chargement.</p>`;
  }
}

function renderDocs() {
  const list = document.getElementById("documentsList");
  const progressLabel = document.getElementById("progressLabel");
  const btnValider = document.getElementById("btnValiderDossier");

  if (!docs.length) {
    list.innerHTML = `<p class="text-center text-gray-400 text-sm italic py-10">Aucun document soumis.</p>`;
    progressLabel.textContent = "0 document déposé";
    btnValider.disabled = true;
    return;
  }

  const valides = docs.filter((d) => d.statut === "valide").length;
  const total = docs.length;
  progressLabel.textContent = `${valides} / ${total} documents validés`;
  btnValider.disabled = valides < total;

  list.innerHTML = docs
    .map((d) => {
      const date = d.date_upload
        ? new Date(d.date_upload).toLocaleDateString("fr-FR")
        : "—";
      const statutClass =
        d.statut === "valide"
          ? "bg-emerald-100 text-emerald-700 border-emerald-200"
          : d.statut === "refuse"
            ? "bg-red-100 text-red-700 border-red-200"
            : "bg-yellow-100 text-yellow-700 border-yellow-200";
      const statutLabel =
        d.statut === "valide"
          ? "Validé"
          : d.statut === "refuse"
            ? "Refusé"
            : "En attente";

      const btnValiderDisabled = d.statut === "valide";
      const btnRefuserDisabled = d.statut === "refuse";

      return `
      <div class="p-5 flex items-center gap-4 border-b border-gray-50" id="doc-row-${d.id_doc}">
        <div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
          <i class="fas fa-file-alt text-gray-400"></i>
        </div>
        <div class="flex-1">
          <div class="font-semibold text-gray-800 text-sm">${esc(d.type_doc)}</div>
          <div class="text-xs text-gray-400 mt-0.5 flex items-center gap-2">
            ${d.nom_categorie ? `<span class="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded text-xs">${esc(d.nom_categorie)}</span>` : ""}
            <span>Déposé le ${date}</span>
          </div>
        </div>
        <div class="flex items-center gap-2">
          ${
            d.url_document
              ? `
            <a href="${esc(d.url_document)}" target="_blank" class="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold transition flex items-center gap-1">
              <i class="fas fa-eye"></i> Voir
            </a>`
              : ""
          }
          <span class="badge-statut-${d.id_doc} text-xs font-bold px-2 py-1 rounded border ${statutClass}">${statutLabel}</span>
          <button type="button"
            data-id="${d.id_doc}" data-action="valide"
            class="btn-action px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1 ${btnValiderDisabled ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"}"
            ${btnValiderDisabled ? "disabled" : ""}>
            <i class="fas fa-check pointer-events-none"></i> Valider
          </button>
          <button type="button"
            data-id="${d.id_doc}" data-action="refuse"
            class="btn-action px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1 ${btnRefuserDisabled ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700 text-white cursor-pointer"}"
            ${btnRefuserDisabled ? "disabled" : ""}>
            <i class="fas fa-times pointer-events-none"></i> Refuser
          </button>
        </div>
      </div>`;
    })
    .join("");

  initActionButtons();
}

function initActionButtons() {
  document.querySelectorAll(".btn-action").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.disabled) return;
      pendingDocId = Number(btn.dataset.id);
      pendingAction = btn.dataset.action;
      if (pendingAction === "valide") openModal("modalValidDoc");
      else openModal("modalRefusDoc");
    });
  });
}

async function executeValidation(idDoc, statut) {
  try {
    const res = await fetch(`${API_BASE}/admin/documents_pro/validate`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_doc: idDoc, statut }),
    });
    if (!res.ok) throw new Error();

    const doc = docs.find((d) => d.id_doc === idDoc);
    if (doc) doc.statut = statut;

    const badge = document.querySelector(`.badge-statut-${idDoc}`);
    if (badge) {
      badge.className = `badge-statut-${idDoc} text-xs font-bold px-2 py-1 rounded border ${
        statut === "valide"
          ? "bg-emerald-100 text-emerald-700 border-emerald-200"
          : "bg-red-100 text-red-700 border-red-200"
      }`;
      badge.textContent = statut === "valide" ? "Validé" : "Refusé";
    }

    const row = document.getElementById(`doc-row-${idDoc}`);
    if (row) {
      row.querySelectorAll(".btn-action").forEach((btn) => {
        const isCurrentStatut = btn.dataset.action === statut;
        btn.disabled = isCurrentStatut;
        if (isCurrentStatut) {
          btn.className = btn.className
            .replace(
              /bg-emerald-600|hover:bg-emerald-700|bg-red-600|hover:bg-red-700|text-white|cursor-pointer/g,
              "",
            )
            .trim();
          btn.classList.add(
            "bg-gray-200",
            "text-gray-400",
            "cursor-not-allowed",
          );
        } else {
          btn.disabled = false;
          btn.classList.remove(
            "bg-gray-200",
            "text-gray-400",
            "cursor-not-allowed",
          );
          if (btn.dataset.action === "valide") {
            btn.classList.add(
              "bg-emerald-600",
              "hover:bg-emerald-700",
              "text-white",
              "cursor-pointer",
            );
          } else {
            btn.classList.add(
              "bg-red-600",
              "hover:bg-red-700",
              "text-white",
              "cursor-pointer",
            );
          }
        }
      });
    }

    const valides = docs.filter((d) => d.statut === "valide").length;
    const total = docs.length;
    document.getElementById("progressLabel").textContent =
      `${valides} / ${total} documents validés`;
    document.getElementById("btnValiderDossier").disabled = valides < total;

    showToast(
      statut === "valide" ? "Document validé." : "Document refusé.",
      statut === "valide" ? "success" : "error",
    );
    await loadProInfo();
  } catch {
    showToast("Erreur lors de la validation.", "error");
  }
}

async function validerDossierComplet() {
  try {
    const res = await fetch(`${API_BASE}/admin/profile_pro/update_statut`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_user: userId, statut_validation: "valide" }),
    });
    if (!res.ok) throw new Error();
    showToast(
      "Dossier validé ! Le prestataire est maintenant actif.",
      "success",
    );
    await loadProInfo();
  } catch {
    showToast("Erreur lors de la validation du dossier.", "error");
  }
}
function initModals() {
  document
    .getElementById("confirmValidDoc")
    .addEventListener("click", async () => {
      closeModal("modalValidDoc");
      await executeValidation(pendingDocId, "valide");
    });
  document
    .getElementById("cancelValidDoc")
    .addEventListener("click", () => closeModal("modalValidDoc"));

  document
    .getElementById("confirmRefusDoc")
    .addEventListener("click", async () => {
      closeModal("modalRefusDoc");
      await executeValidation(pendingDocId, "refuse");
    });
  document
    .getElementById("cancelRefusDoc")
    .addEventListener("click", () => closeModal("modalRefusDoc"));

  document
    .getElementById("btnValiderDossier")
    .addEventListener("click", () => openModal("modalValidDossier"));
  document
    .getElementById("confirmValidDossier")
    .addEventListener("click", async () => {
      closeModal("modalValidDossier");
      await validerDossierComplet();
    });
  document
    .getElementById("cancelValidDossier")
    .addEventListener("click", () => closeModal("modalValidDossier"));
}

function openModal(id) {
  const modal = document.getElementById(id);
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  setTimeout(() => modal.classList.remove("opacity-0"), 10);
}

function closeModal(id) {
  const modal = document.getElementById(id);
  modal.classList.add("opacity-0");
  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }, 300);
}

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
