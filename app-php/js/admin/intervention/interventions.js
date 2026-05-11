var API_BASE = "http://144.76.74.130:8082";

(async () => {
  await loadInterventions();
  initSearch();
  initDeleteModal();
})();

async function loadInterventions() {
  const tbody = document.getElementById("interventionTableBody");
  tbody.innerHTML = `<tr><td colspan="8" class="py-20 text-center text-gray-400"><i class="fas fa-spinner fa-spin text-2xl mb-3 block text-blue-400"></i><span class="text-sm italic">Chargement...</span></td></tr>`;
  try {
    const res = await fetch(`${API_BASE}/admin/intervention/get`);
    if (!res.ok) throw new Error();
    const interventions = await res.json();
    if (!interventions.length) {
      tbody.innerHTML = `<tr><td colspan="8" class="py-20 text-center text-gray-400"><span class="text-sm italic">Aucune intervention trouvée.</span></td></tr>`;
      return;
    }
    tbody.innerHTML = interventions
      .map((i) => {
        const date = i.date_heure_debut
          ? new Date(i.date_heure_debut).toLocaleDateString("fr-FR")
          : "—";
        const statutClass =
          {
            planifiee: "bg-blue-100 text-blue-700",
            en_cours: "bg-yellow-100 text-yellow-700",
            terminee: "bg-emerald-100 text-emerald-700",
            annulee: "bg-red-100 text-red-700",
          }[i.statut] || "bg-gray-100 text-gray-700";

        const seniorCell = i.est_medical
          ? `<span class="bg-gray-200 text-gray-500 text-xs font-bold px-2 py-1 rounded flex items-center gap-1 w-fit">
            <i class="fas fa-lock text-xs"></i> Anonymisé
           </span>`
          : `<div class="font-semibold text-gray-800 text-sm">${esc(i.nom_senior)} ${esc(i.prenom_senior)}</div>
           <div class="text-xs text-gray-400">Senior #${i.id_senior}</div>`;

        return `
        <tr id="intervention-row-${i.id}" class="border-b border-gray-100 hover:bg-blue-50/40 transition-colors">
          <td class="py-4 px-4">
            <div class="font-semibold text-gray-800 text-sm">${esc(i.nom_pro)} ${esc(i.prenom_pro)}</div>
            <div class="text-xs text-gray-400">Pro #${i.id_pro}</div>
          </td>
          <td class="py-4 px-4">${seniorCell}</td>
          <td class="py-4 px-4">
            <span class="bg-cyan-100 text-cyan-700 text-xs font-bold px-2 py-1 rounded">${esc(i.nom_service)}</span>
            ${i.est_medical ? '<span class="ml-1 bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">Médical</span>' : ""}
          </td>
          <td class="py-4 px-4 text-sm text-gray-600 max-w-xs truncate">${esc(i.lieu)}</td>
          <td class="py-4 px-4 text-center text-sm text-gray-500">${date}</td>
          <td class="py-4 px-4 text-center">
            <span class="text-xs font-bold px-2 py-1 rounded uppercase ${statutClass}">${esc(i.statut)}</span>
          </td>
          <td class="py-4 px-4 text-center font-bold text-emerald-600 text-sm">${parseFloat(i.prix).toFixed(2)} €</td>
          <td class="py-4 px-4">
            <div class="flex items-center justify-center gap-2">
              <a href="admin_view_intervention.php?id=${i.id}" class="group flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 hover:bg-gray-600 transition-colors" title="Voir">
                <i class="fas fa-eye text-gray-500 group-hover:text-white text-sm"></i>
              </a>
              <a href="admin_edit_intervention.php?id=${i.id}" class="group flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-600 transition-colors" title="Modifier">
                <i class="fas fa-edit text-blue-600 group-hover:text-white text-sm"></i>
              </a>
              <button type="button" data-id="${i.id}" class="btn-delete group flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 hover:bg-red-600 transition-colors" title="Supprimer">
                <i class="fas fa-trash-alt text-red-500 group-hover:text-white text-sm pointer-events-none"></i>
              </button>
            </div>
          </td>
        </tr>`;
      })
      .join("");
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="8" class="py-20 text-center"><p class="text-red-500 text-sm">${err.message}</p></td></tr>`;
  }
}

function initSearch() {
  const input = document.getElementById("searchInput");
  const tbody = document.getElementById("interventionTableBody");
  if (!input || !tbody) return;
  input.addEventListener("input", () => {
    const term = input.value.trim().toLowerCase();
    tbody.querySelectorAll("tr[id^='intervention-row-']").forEach((row) => {
      row.style.display = row.innerText.toLowerCase().includes(term)
        ? ""
        : "none";
    });
  });
}

let deleteId = null;

function initDeleteModal() {
  document
    .getElementById("interventionTableBody")
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
          `${API_BASE}/admin/intervention/delete?id=${deleteId}`,
          { method: "DELETE" },
        );
        if (!res.ok) throw new Error();
        document
          .getElementById(`intervention-row-${deleteId}`)
          ?.classList.add("fade-out");
        setTimeout(
          () =>
            document.getElementById(`intervention-row-${deleteId}`)?.remove(),
          400,
        );
        closeModal();
        showToast("Intervention supprimée.", "success");
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
