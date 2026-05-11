var API_BASE = "http://localhost:8082";

(async () => {
  await loadCategories();
  initSearch();
  initDeleteModal();
})();

async function loadCategories() {
  const tbody = document.getElementById("categorieTableBody");
  tbody.innerHTML = `<tr><td colspan="3" class="py-20 text-center text-gray-400"><i class="fas fa-spinner fa-spin text-2xl mb-3 block text-blue-400"></i><span class="text-sm italic">Chargement...</span></td></tr>`;

  try {
    const res = await fetch(`${API_BASE}/admin/service/categorie_service/get`);
    if (!res.ok) throw new Error(`Erreur serveur : ${res.status}`);
    const categories = await res.json();

    if (!Array.isArray(categories) || categories.length === 0) {
      tbody.innerHTML = `<tr><td colspan="3" class="py-20 text-center text-gray-400"><span class="text-sm italic">Aucune catégorie trouvée.</span></td></tr>`;
      return;
    }

    tbody.innerHTML = categories
      .map(
        (c) => `
      <tr id="row-${c.id_categorie}" class="border-b border-gray-100 hover:bg-blue-50/40 transition-colors duration-150">
        <td class="p-4 text-sm text-gray-500">${c.id_categorie}</td>
        <td class="p-4 text-sm font-medium text-gray-800">${esc(c.nom_categorie)}</td>
        <td class="p-4 text-center">
          <div class="flex items-center justify-center gap-3">
            <a href="admin_edit_categorie_service.php?id=${c.id_categorie}" class="group flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-600 transition-colors" title="Modifier">
              <i class="fas fa-edit text-blue-600 group-hover:text-white text-sm"></i>
            </a>
            <button type="button" data-id="${c.id_categorie}" class="btn-delete group flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 hover:bg-red-600 transition-colors" title="Supprimer">
              <i class="fas fa-trash-alt text-red-500 group-hover:text-white text-sm pointer-events-none"></i>
            </button>
          </div>
        </td>
      </tr>`,
      )
      .join("");
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="3" class="py-20 text-center"><p class="text-red-500 font-semibold text-sm">${err.message}</p></td></tr>`;
  }
}

function initSearch() {
  const input = document.getElementById("searchInput");
  const tbody = document.getElementById("categorieTableBody");
  if (!input || !tbody) return;
  input.addEventListener("input", () => {
    const term = input.value.trim().toLowerCase();
    tbody.querySelectorAll("tr[id^='row-']").forEach((row) => {
      row.style.display = row.innerText.toLowerCase().includes(term)
        ? ""
        : "none";
    });
  });
}

let deleteId = null;

function initDeleteModal() {
  document
    .getElementById("categorieTableBody")
    .addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-delete");
      if (!btn) return;
      deleteId = btn.dataset.id;
      const modal = document.getElementById("deleteModal");
      modal.classList.remove("hidden");
      modal.classList.add("flex");
      setTimeout(() => modal.classList.remove("opacity-0"), 10);
    });

  document
    .getElementById("cancelDeleteBtn")
    .addEventListener("click", closeModal);

  document
    .getElementById("confirmDeleteBtn")
    .addEventListener("click", async () => {
      try {
        const res = await fetch(
          `${API_BASE}/admin/service/categorie_service/delete?id=${deleteId}`,
          { method: "DELETE" },
        );
        if (!res.ok) throw new Error();
        document.getElementById(`row-${deleteId}`)?.classList.add("fade-out");
        setTimeout(
          () => document.getElementById(`row-${deleteId}`)?.remove(),
          400,
        );
        closeModal();
        showToast("Catégorie supprimée.", "success");
      } catch {
        showToast("Erreur lors de la suppression.", "error");
      }
    });
}

function closeModal() {
  const modal = document.getElementById("deleteModal");
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
