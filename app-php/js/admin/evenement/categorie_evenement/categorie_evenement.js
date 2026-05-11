const API_BASE = "http://172.16.90.10:8082";

async function loadCategories() {
  const res = await fetch(
    `${API_BASE}/admin/evenement/categorie_evenement/get`,
  );
  const categories = await res.json();
  const tbody = document.getElementById("categorieTableBody");

  tbody.innerHTML = categories
    .map(
      (cat) => `
        <tr id="row-${cat.id_categorie}" class="hover:bg-gray-50 transition-colors">
            <td class="p-4 text-sm text-gray-500">${cat.id_categorie}</td>
            <td class="p-4 text-sm font-medium text-gray-800">${cat.nom_categorie}</td>
            <td class="p-4 text-center">
                <a href="admin_edit_categorie_evenement.php?id=${cat.id_categorie}" class="inline-flex items-center gap-1 bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 rounded-lg text-xs font-semibold transition mr-1">
                    <i class="fas fa-edit"></i> Modifier
                </a>
                <button onclick="openDeleteModal(${cat.id_categorie})" class="inline-flex items-center gap-1 bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-lg text-xs font-semibold transition">
                    <i class="fas fa-trash"></i> Supprimer
                </button>
            </td>
        </tr>
    `,
    )
    .join("");

  document.getElementById("searchInput").addEventListener("input", function () {
    const val = this.value.toLowerCase();
    document.querySelectorAll("#categorieTableBody tr").forEach((row) => {
      row.style.display = row.innerText.toLowerCase().includes(val)
        ? ""
        : "none";
    });
  });
}

let deleteId = null;

function openDeleteModal(id) {
  deleteId = id;
  const modal = document.getElementById("deleteModal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  setTimeout(() => modal.classList.remove("opacity-0"), 10);
}

function closeDeleteModal() {
  const modal = document.getElementById("deleteModal");
  modal.classList.add("opacity-0");
  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }, 300);
}

document
  .getElementById("cancelDeleteBtn")
  .addEventListener("click", closeDeleteModal);

document
  .getElementById("confirmDeleteBtn")
  .addEventListener("click", async () => {
    try {
      const res = await fetch(
        `http://172.16.90.10:8082/admin/evenement/categorie_evenement/delete`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id_categorie: deleteId }),
        },
      );
      if (!res.ok) throw new Error();
      const row = document.getElementById(`row-${deleteId}`);
      row.classList.add("fade-out");
      setTimeout(() => row.remove(), 400);
      closeDeleteModal();
      showToast("Catégorie supprimée.", "success");
    } catch {
      showToast("Erreur lors de la suppression.", "error");
    }
  });

function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  const msgSpan = document.getElementById("toastMessage");
  const icon = document.getElementById("toastIcon");
  const styles = {
    success: { cls: "fas fa-check-circle", color: "text-emerald-400" },
    error: { cls: "fas fa-times-circle", color: "text-red-400" },
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

loadCategories();
