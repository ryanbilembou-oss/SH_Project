var API_BASE = "http://172.16.90.10:8082";

(async () => {
  await loadDevis();
  initSearch();
  initDeleteModal();
})();

async function loadDevis() {
  const tbody = document.getElementById("devisTableBody");
  tbody.innerHTML = `<tr><td colspan="7" class="py-20 text-center text-gray-400"><i class="fas fa-spinner fa-spin text-2xl mb-3 block text-blue-400"></i><span class="text-sm italic">Chargement...</span></td></tr>`;
  try {
    const res = await fetch(`${API_BASE}/admin/devis/get`);
    if (!res.ok) throw new Error();
    const devisList = await res.json();
    if (!devisList.length) {
      tbody.innerHTML = `<tr><td colspan="7" class="py-20 text-center text-gray-400"><span class="text-sm italic">Aucun devis trouvé.</span></td></tr>`;
      return;
    }
    tbody.innerHTML = devisList
      .map((d) => {
        const date = d.date_validite
          ? new Date(d.date_validite).toLocaleDateString("fr-FR")
          : "—";
        const statutClass =
          {
            en_attente: "bg-yellow-100 text-yellow-700",
            accepte: "bg-emerald-100 text-emerald-700",
            refuse: "bg-red-100 text-red-700",
            expire: "bg-gray-100 text-gray-700",
          }[d.statut] || "bg-gray-100 text-gray-700";

        return `
        <tr id="devis-row-${d.id_devis}" class="border-b border-gray-100 hover:bg-blue-50/40 transition-colors">
          <td class="py-4 px-4">
            <div class="font-semibold text-gray-800 text-sm">${esc(d.nom_pro)} ${esc(d.prenom_pro)}</div>
            <div class="text-xs text-gray-400">Pro #${d.id_pro}</div>
          </td>
          <td class="py-4 px-4">
            <div class="font-semibold text-gray-800 text-sm">${esc(d.nom_senior)} ${esc(d.prenom_senior)}</div>
            <div class="text-xs text-gray-400">Senior #${d.id_senior}</div>
          </td>
          <td class="py-4 px-4">
            <span class="bg-pink-100 text-pink-700 text-xs font-bold px-2 py-1 rounded">${esc(d.nom_service)}</span>
          </td>
          <td class="py-4 px-4 text-center font-bold text-emerald-600 text-sm">${parseFloat(d.montant_ttc).toFixed(2)} €</td>
          <td class="py-4 px-4 text-center text-sm text-gray-500">${date}</td>
          <td class="py-4 px-4 text-center">
            <span class="text-xs font-bold px-2 py-1 rounded uppercase ${statutClass}">${esc(d.statut)}</span>
          </td>
          <td class="py-4 px-4">
            <div class="flex items-center justify-center gap-2">
              <a href="admin_view_devis.php?id=${d.id_devis}" class="group flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 hover:bg-gray-600 transition-colors" title="Voir">
                <i class="fas fa-eye text-gray-500 group-hover:text-white text-sm"></i>
              </a>
              <a href="admin_edit_devis.php?id=${d.id_devis}" class="group flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-600 transition-colors" title="Modifier">
                <i class="fas fa-edit text-blue-600 group-hover:text-white text-sm"></i>
              </a>
              <button type="button" data-id="${d.id_devis}" class="btn-delete group flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 hover:bg-red-600 transition-colors" title="Supprimer">
                <i class="fas fa-trash-alt text-red-500 group-hover:text-white text-sm pointer-events-none"></i>
              </button>
            </div>
          </td>
        </tr>`;
      })
      .join("");
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="7" class="py-20 text-center"><p class="text-red-500 text-sm">${err.message}</p></td></tr>`;
  }
}

function initSearch() {
  const input = document.getElementById("searchInput");
  const tbody = document.getElementById("devisTableBody");
  if (!input || !tbody) return;
  input.addEventListener("input", () => {
    const term = input.value.trim().toLowerCase();
    tbody.querySelectorAll("tr[id^='devis-row-']").forEach((row) => {
      row.style.display = row.innerText.toLowerCase().includes(term)
        ? ""
        : "none";
    });
  });
}

let deleteId = null;

function initDeleteModal() {
  document.getElementById("devisTableBody").addEventListener("click", (e) => {
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
          `${API_BASE}/admin/devis/delete?id=${deleteId}`,
          { method: "DELETE" },
        );
        if (!res.ok) throw new Error();
        document
          .getElementById(`devis-row-${deleteId}`)
          ?.classList.add("fade-out");
        setTimeout(
          () => document.getElementById(`devis-row-${deleteId}`)?.remove(),
          400,
        );
        closeModal();
        showToast("Devis supprimé.", "success");
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
