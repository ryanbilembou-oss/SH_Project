var API_BASE = "http://144.76.74.130:8082";

let tousLesTypes = [];
let toutesLesCategories = [];
let liaisonsActuelles = [];

document.addEventListener("DOMContentLoaded", async () => {
  await Promise.all([loadTypes(), loadCategories(), loadVueGlobale()]);
});

async function loadTypes() {
  try {
    const res = await fetch(`${API_BASE}/admin/type_prestataire/get`);
    tousLesTypes = await res.json();
    if (!Array.isArray(tousLesTypes)) tousLesTypes = [];
    document.getElementById("selectType").innerHTML =
      `<option value="">-- Choisir un type --</option>` +
      tousLesTypes
        .map((t) => `<option value="${t.id_type}">${esc(t.nom_type)}</option>`)
        .join("");
  } catch {
    showToast("Erreur chargement des types.", "error");
  }
}

async function loadCategories() {
  try {
    const res = await fetch(`${API_BASE}/admin/service/categorie_service/get`);
    toutesLesCategories = await res.json();
    if (!Array.isArray(toutesLesCategories)) toutesLesCategories = [];
  } catch {
    showToast("Erreur chargement des catégories.", "error");
  }
}

async function loadVueGlobale() {
  const container = document.getElementById("vueGlobale");
  try {
    const res = await fetch(`${API_BASE}/admin/type_prestataire_categorie/get`);
    const liaisons = await res.json();

    if (!Array.isArray(liaisons) || !liaisons.length) {
      container.innerHTML = `<p class="text-gray-400 italic text-sm">Aucune liaison définie.</p>`;
      return;
    }

    const grouped = {};
    liaisons.forEach((l) => {
      if (!grouped[l.nom_type]) grouped[l.nom_type] = [];
      grouped[l.nom_type].push(l.nom_categorie);
    });

    container.innerHTML = Object.entries(grouped)
      .map(
        ([type, cats]) => `
      <div class="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <div class="min-w-[180px]">
          <span class="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-sm font-bold px-3 py-1 rounded-full">
            <i class="fas fa-user-tie text-xs"></i> ${esc(type)}
          </span>
        </div>
        <div class="flex flex-wrap gap-2">
          ${cats
            .map(
              (c) => `
            <span class="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-1 rounded-full">
              ${esc(c)}
            </span>`,
            )
            .join("")}
        </div>
      </div>
    `,
      )
      .join("");
  } catch {
    container.innerHTML = `<p class="text-red-400 italic text-sm">Erreur de chargement.</p>`;
  }
}

async function chargerLiaisons() {
  const idType = document.getElementById("selectType").value;
  if (!idType) {
    showToast("Choisissez un type.", "error");
    return;
  }

  const type = tousLesTypes.find((t) => t.id_type === Number(idType));
  document.getElementById("nomTypeSelectionne").textContent =
    type?.nom_type ?? "";

  try {
    const res = await fetch(
      `${API_BASE}/admin/type_prestataire_categorie/get_by_type?id_type=${idType}`,
    );
    const data = await res.json();
    liaisonsActuelles = Array.isArray(data)
      ? data.map((c) => c.id_categorie)
      : [];
  } catch {
    liaisonsActuelles = [];
  }

  renderCheckboxes();
  document.getElementById("panelCategories").classList.remove("hidden");
  document
    .getElementById("panelCategories")
    .scrollIntoView({ behavior: "smooth" });
}

function renderCheckboxes() {
  const container = document.getElementById("listeCategories");

  if (!toutesLesCategories.length) {
    container.innerHTML = `<p class="text-gray-400 italic text-sm col-span-3">Aucune catégorie disponible.</p>`;
    return;
  }

  container.innerHTML = toutesLesCategories
    .map((cat) => {
      const checked = liaisonsActuelles.includes(cat.id_categorie);
      return `
      <label class="flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all
        ${checked ? "border-emerald-400 bg-emerald-50" : "border-gray-200 bg-white hover:border-blue-300"}">
        <input type="checkbox" value="${cat.id_categorie}"
          ${checked ? "checked" : ""}
          onchange="toggleCheckboxStyle(this)"
          class="w-4 h-4 accent-emerald-500">
        <span class="text-sm font-medium text-gray-700">${esc(cat.nom_categorie)}</span>
      </label>`;
    })
    .join("");
}

function toggleCheckboxStyle(input) {
  const label = input.closest("label");
  if (input.checked) {
    label.classList.remove(
      "border-gray-200",
      "bg-white",
      "hover:border-blue-300",
    );
    label.classList.add("border-emerald-400", "bg-emerald-50");
  } else {
    label.classList.remove("border-emerald-400", "bg-emerald-50");
    label.classList.add("border-gray-200", "bg-white", "hover:border-blue-300");
  }
}

function toutCocher(etat) {
  document
    .querySelectorAll("#listeCategories input[type='checkbox']")
    .forEach((cb) => {
      cb.checked = etat;
      toggleCheckboxStyle(cb);
    });
}

async function sauvegarderLiaisons() {
  const idType = Number(document.getElementById("selectType").value);
  if (!idType) return;

  const cochees = [
    ...document.querySelectorAll(
      "#listeCategories input[type='checkbox']:checked",
    ),
  ].map((cb) => Number(cb.value));

  try {
    await fetch(
      `${API_BASE}/admin/type_prestataire_categorie/delete_by_type?id_type=${idType}`,
      {
        method: "DELETE",
      },
    );

    await Promise.all(
      cochees.map((idCat) =>
        fetch(`${API_BASE}/admin/type_prestataire_categorie/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id_type: idType, id_categorie: idCat }),
        }),
      ),
    );

    showToast("Liaisons sauvegardées !", "success");
    liaisonsActuelles = cochees;

    await loadVueGlobale();
  } catch {
    showToast("Erreur lors de la sauvegarde.", "error");
  }
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
