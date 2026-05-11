var API_BASE = "http://172.16.90.10:8082";

(async () => {
  await loadProfiles();
  initSearch();
  initDeleteModal();
})();

async function loadProfiles() {
  const tbody = document.getElementById("profileAdminTableBody");
  tbody.innerHTML = `<tr><td colspan="4" class="py-20 text-center text-gray-400"><i class="fas fa-spinner fa-spin text-2xl mb-3 block text-blue-400"></i><span class="text-sm italic">Chargement...</span></td></tr>`;
  try {
    const res = await fetch(`${API_BASE}/admin/profile_admin/get_with_users`);
    if (!res.ok) throw new Error();
    const profiles = await res.json();
    if (!profiles.length) {
      tbody.innerHTML = `<tr><td colspan="4" class="py-20 text-center text-gray-400"><span class="text-sm italic">Aucun admin trouvé.</span></td></tr>`;
      return;
    }
    tbody.innerHTML = profiles
      .map((p) => {
        const nom = p.nom
          ? `${esc(p.nom)} ${esc(p.prenom)}`
          : `<span class="text-gray-400 italic">Pas de profil</span>`;
        const actions = p.has_profile
          ? `<a href="admin_view_profile_admin.php?id=${p.id_user}" class="group flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 hover:bg-gray-600 transition-colors" title="Voir">
              <i class="fas fa-eye text-gray-500 group-hover:text-white text-sm"></i>
           </a>
           <a href="admin_edit_profile_admin.php?id=${p.id_user}" class="group flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-600 transition-colors" title="Modifier">
              <i class="fas fa-edit text-blue-600 group-hover:text-white text-sm"></i>
           </a>
           <button type="button" data-id="${p.id_user}" class="btn-delete group flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 hover:bg-red-600 transition-colors" title="Supprimer">
              <i class="fas fa-trash-alt text-red-500 group-hover:text-white text-sm pointer-events-none"></i>
           </button>`
          : `<a href="admin_create_profile_admin.php?id=${p.id_user}" class="group flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-600 transition-colors text-xs font-bold text-emerald-600 hover:text-white">
              <i class="fas fa-plus text-xs"></i> Créer profil
           </a>`;
        return `
        <tr id="admin-row-${p.id_user}" class="border-b border-gray-100 hover:bg-blue-50/40 transition-colors">
          <td class="py-4 px-5">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full ${p.has_profile ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-400"} flex items-center justify-center font-bold text-sm">
                ${p.has_profile ? esc(p.prenom[0]) + esc(p.nom[0]) : "?"}
              </div>
              <div>
                <div class="font-semibold text-gray-800 text-sm">${nom}</div>
                <div class="text-xs text-gray-400">${esc(p.email)}</div>
              </div>
            </div>
          </td>
          <td class="py-4 px-5 text-sm text-gray-600">${esc(p.genre || "—")}</td>
          <td class="py-4 px-5 text-sm text-gray-600">${esc(p.telephone || "—")}</td>
          <td class="py-4 px-5">
            <div class="flex items-center justify-center gap-2">${actions}</div>
          </td>
        </tr>`;
      })
      .join("");
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="4" class="py-20 text-center"><p class="text-red-500 text-sm">${err.message}</p></td></tr>`;
  }
}

function initSearch() {
  const input = document.getElementById("searchInput");
  const tbody = document.getElementById("profileAdminTableBody");
  if (!input || !tbody) return;
  input.addEventListener("input", () => {
    const term = input.value.trim().toLowerCase();
    tbody.querySelectorAll("tr[id^='admin-row-']").forEach((row) => {
      row.style.display = row.innerText.toLowerCase().includes(term)
        ? ""
        : "none";
    });
  });
}

let deleteId = null;

function initDeleteModal() {
  document
    .getElementById("profileAdminTableBody")
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
          `${API_BASE}/admin/profile_admin/delete?id=${deleteId}`,
          { method: "DELETE" },
        );
        if (!res.ok) throw new Error();
        document
          .getElementById(`admin-row-${deleteId}`)
          ?.classList.add("fade-out");
        setTimeout(
          () => document.getElementById(`admin-row-${deleteId}`)?.remove(),
          400,
        );
        closeModal();
        showToast("Profil supprimé.", "success");
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
