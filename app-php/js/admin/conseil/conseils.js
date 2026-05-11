var API_BASE = "http://144.76.74.130:8082";

(async () => {
  await loadConseils();
  initSearch();
  initDeleteModal();
})();

async function loadConseils() {
  const tbody = document.getElementById("conseilTableBody");
  tbody.innerHTML = `<tr><td colspan="4" class="py-20 text-center text-gray-400"><i class="fas fa-spinner fa-spin text-2xl mb-3 block text-blue-400"></i><span class="text-sm italic">Chargement...</span></td></tr>`;
  try {
    const res = await fetch(`${API_BASE}/admin/conseil/get`);
    if (!res.ok) throw new Error();
    const conseils = await res.json();
    if (!conseils.length) {
      tbody.innerHTML = `<tr><td colspan="4" class="py-20 text-center text-gray-400"><span class="text-sm italic">Aucun conseil trouvé.</span></td></tr>`;
      return;
    }
    tbody.innerHTML = conseils
      .map(
        (c) => `
      <tr id="conseil-row-${c.id_conseil}" class="border-b border-gray-100 hover:bg-blue-50/40 transition-colors">
        <td class="py-4 px-5 font-semibold text-gray-800 text-sm">${esc(c.titre)}</td>
        <td class="py-4 px-5">
          <span class="bg-teal-100 text-teal-700 text-xs font-bold px-2 py-1 rounded uppercase">${esc(c.categorie || "—")}</span>
        </td>
        <td class="py-4 px-5 text-sm text-gray-500 max-w-xs truncate">${esc(c.contenu)}</td>
        <td class="py-4 px-5">
          <div class="flex items-center justify-center gap-3">
            <a href="admin_edit_conseil.php?id=${c.id_conseil}" class="group flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-600 transition-colors">
              <i class="fas fa-edit text-blue-600 group-hover:text-white text-sm"></i>
            </a>
            <button type="button" data-id="${c.id_conseil}" class="btn-delete group flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 hover:bg-red-600 transition-colors">
              <i class="fas fa-trash-alt text-red-500 group-hover:text-white text-sm pointer-events-none"></i>
            </button>
          </div>
        </td>
      </tr>`,
      )
      .join("");
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="4" class="py-20 text-center"><p class="text-red-500 text-sm">${err.message}</p></td></tr>`;
  }
}

function initSearch() {
  const input = document.getElementById("searchInput");
  const tbody = document.getElementById("conseilTableBody");
  if (!input || !tbody) return;
  input.addEventListener("input", () => {
    const term = input.value.trim().toLowerCase();
    tbody.querySelectorAll("tr[id^='conseil-row-']").forEach((row) => {
      row.style.display = row.innerText.toLowerCase().includes(term)
        ? ""
        : "none";
    });
  });
}

let deleteId = null;

function initDeleteModal() {
  document.getElementById("conseilTableBody").addEventListener("click", (e) => {
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
          `${API_BASE}/admin/conseil/delete?id=${deleteId}`,
          { method: "DELETE" },
        );
        if (!res.ok) throw new Error();
        document
          .getElementById(`conseil-row-${deleteId}`)
          ?.classList.add("fade-out");
        setTimeout(
          () => document.getElementById(`conseil-row-${deleteId}`)?.remove(),
          400,
        );
        closeModal();
        showToast("Conseil supprimé.", "success");
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
