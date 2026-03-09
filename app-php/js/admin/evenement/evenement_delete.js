const EventDeleteManager = {
  currentId: null,
  isDeleting: false,
  modal: null,
  modalContent: null,
  confirmBtn: null,
  cancelBtn: null,
  tableBody: null,

  init() {
    this.modal = document.getElementById("deleteModal");
    this.modalContent = document.getElementById("deleteModalContent");
    this.confirmBtn = document.getElementById("confirmDeleteBtn");
    this.cancelBtn = document.getElementById("cancelDeleteBtn");
    this.tableBody = document.getElementById("eventTableBody");

    if (!this.modal || !this.confirmBtn || !this.cancelBtn) {
      console.warn(
        "[EventDeleteManager] Éléments DOM manquants — init annulée.",
      );
      return;
    }


    if (this.tableBody) {
      this.tableBody.addEventListener("click", (e) => {
        const btn = e.target.closest(".btn-delete-trigger");
        if (btn) this.open(btn.dataset.id);
      });
    }

    
    this.confirmBtn.addEventListener("click", () => this.executeDeletion());
    this.cancelBtn.addEventListener("click", () => this.close());

  
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) this.close();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.close();
    });
  },

  open(id) {
    if (!id) return;
    this.currentId = id;

    this.modal.classList.remove("hidden");
    this.modal.classList.add("flex");

    requestAnimationFrame(() => {
      this.modal.classList.remove("opacity-0");
      this.modal.classList.add("opacity-100");
      if (this.modalContent) {
        this.modalContent.classList.remove("scale-95");
        this.modalContent.classList.add("scale-100");
      }
    });
  },


  close() {
    if (this.isDeleting) return;

    this.modal.classList.remove("opacity-100");
    this.modal.classList.add("opacity-0");
    if (this.modalContent) {
      this.modalContent.classList.remove("scale-100");
      this.modalContent.classList.add("scale-95");
    }

    
    setTimeout(() => {
      this.modal.classList.add("hidden");
      this.modal.classList.remove("flex");
      this.currentId = null;
    }, 300);
  },


  async executeDeletion() {
    if (!this.currentId || this.isDeleting) return;

    this.setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8082/admin/evenement/delete?id=${this.currentId}`,
        { method: "DELETE" },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la suppression.");
      }

      this.removeRowFromUI(this.currentId);
      this.isDeleting = false;
      this.close();
      showToast("Événement supprimé avec succès", "success");
    } catch (err) {
      console.error("[EventDeleteManager] Erreur :", err);
      showToast(err.message || "Erreur serveur.", "error");
      this.setLoading(false);
    }
  },


  setLoading(state) {
    this.isDeleting = state;
    if (!this.confirmBtn) return;

    this.confirmBtn.disabled = state;
    this.confirmBtn.innerHTML = state
      ? `<i class="fas fa-spinner fa-spin"></i> Suppression...`
      : `Confirmer la suppression`;
  },

  // ─── Retrait fluide de la ligne dans le tableau ───────────────────────────
  removeRowFromUI(id) {
    const row = document.getElementById(`event-row-${id}`);
    if (!row) return;

    row.classList.add("fade-out");
    setTimeout(() => row.remove(), 400);
  },
};

function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  const msgSpan = document.getElementById("toastMessage");
  const icon = document.getElementById("toastIcon");

  if (!container || !msgSpan) return;

  const config = {
    success: { iconClass: "fas fa-check-circle", color: "text-emerald-400" },
    error: { iconClass: "fas fa-times-circle", color: "text-red-400" },
    info: { iconClass: "fas fa-info-circle", color: "text-blue-400" },
  };

  const { iconClass, color } = config[type] || config.info;

  msgSpan.textContent = message;
  if (icon) {
    icon.className = `${iconClass} ${color} text-xl`;
  }


  container.classList.remove("-translate-y-20", "opacity-0");
  container.classList.add("translate-y-0", "opacity-100");


  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => {
    container.classList.remove("translate-y-0", "opacity-100");
    container.classList.add("-translate-y-20", "opacity-0");
  }, 3000);
}

window.EventDeleteManager = EventDeleteManager;
window.showToast = showToast;

document.addEventListener("DOMContentLoaded", () => EventDeleteManager.init());
