let idEnAttente = null;

function deleteUser(id) {
  idEnAttente = id;
  const modal = document.getElementById("deleteModal");
  if (modal) {
    modal.classList.remove("hidden");
  }
}

function closeModal() {
  const modal = document.getElementById("deleteModal");
  if (modal) {
    modal.classList.add("hidden");
  }
  idEnAttente = null;
}

document.addEventListener("DOMContentLoaded", () => {
  const btnConfirm = document.getElementById("confirmDeleteBtn");

  if (btnConfirm) {
    btnConfirm.onclick = async () => {
      if (!idEnAttente) return;

      try {
        const response = await fetch(
          `http://172.16.90.10:8082/admin/users/delete?id=${idEnAttente}`,
          {
            method: "DELETE",
          },
        );

        if (response.ok) {
          closeModal();

          const toast = document.getElementById("deleteToast");
          if (toast) {
            toast.classList.remove("-translate-y-full", "opacity-0");
            toast.classList.add("translate-y-0", "opacity-100");
          }

          const row = document.getElementById(`user-row-${idEnAttente}`);
          if (row) {
            row.classList.add("opacity-50", "pointer-events-none");
          }

          setTimeout(() => {
            location.reload();
          }, 2500);
        } else {
          const errorMsg = await response.text();
          alert("Erreur serveur : " + errorMsg);
        }
      } catch (error) {
        console.error("Erreur réseau :", error);
        alert("Impossible de joindre le serveur Go.");
      }
    };
  }
});
