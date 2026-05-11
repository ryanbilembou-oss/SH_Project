const API_BASE_DELETE = "http://172.16.90.10:8082";

const DeleteArticleManager = {
  pendingId: null,
  modal: null,
  confirmBtn: null,
  cancelBtn: null,
  tableBody: null,

  init() {
    this.modal = document.getElementById("deleteModal");
    this.confirmBtn = document.getElementById("confirmDeleteBtn");
    this.cancelBtn = document.getElementById("cancelDeleteBtn");
    this.tableBody = document.getElementById("articleTableBody");

    if (!this.modal || !this.confirmBtn || !this.cancelBtn || !this.tableBody) {
      console.warn("[DeleteArticleManager] Éléments DOM manquants.");
      return;
    }

    this.tableBody.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-delete");
      if (!btn) return;
      this.pendingId = btn.dataset.id;
      this.openModal();
    });

    this.confirmBtn.addEventListener("click", () => this.executeDeletion());
    this.cancelBtn.addEventListener("click", () => this.closeModal());
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) this.closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.closeModal();
    });
  },

  openModal() {
    this.modal.classList.remove("hidden");
    this.modal.classList.add("flex");
    requestAnimationFrame(() => {
      this.modal.classList.remove("opacity-0");
      this.modal.classList.add("opacity-100");
      document
        .getElementById("deleteModalContent")
        ?.classList.replace("scale-95", "scale-100");
    });
  },
  closeModal() {
    this.modal.classList.replace("opacity-100", "opacity-0");
    document
      .getElementById("deleteModalContent")
      ?.classList.replace("scale-100", "scale-95");
    setTimeout(() => {
      this.modal.classList.add("hidden");
      this.modal.classList.remove("flex");
    }, 300);
  },
  async executeDeletion() {
    if (!this.pendingId) return;

    this.confirmBtn.disabled = true;
    this.confirmBtn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i>Suppression...`;

    try {
      const res = await fetch(
        `${API_BASE_DELETE}/admin/article/delete?id=${this.pendingId}`,
        {
          method: "DELETE",
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur serveur.");

      const row = document.getElementById(`article-row-${this.pendingId}`);
      if (row) {
        row.style.transition = "all 0.4s ease";
        row.style.opacity = "0";
        row.style.transform = "translateX(30px)";
        setTimeout(() => row.remove(), 400);
      }

      this.closeModal();
      showToastArticle("Article supprimé avec succès !", "success");
    } catch (err) {
      console.error("[DeleteArticleManager]", err);
      showToastArticle(
        err.message || "Erreur lors de la suppression.",
        "error",
      );
    } finally {
      this.confirmBtn.disabled = false;
      this.confirmBtn.innerHTML = `Confirmer la suppression`;
      this.pendingId = null;
    }
  },
};

function showToastArticle(message, type = "info") {
  const container = document.getElementById("toastContainer");
  const msgSpan = document.getElementById("toastMessage");
  const icon = document.getElementById("toastIcon");
  if (!container || !msgSpan) return;

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

  clearTimeout(showToastArticle._t);
  showToastArticle._t = setTimeout(() => {
    container.classList.remove("translate-y-0", "opacity-100");
    container.classList.add("-translate-y-20", "opacity-0");
  }, 3000);
}

document.addEventListener("DOMContentLoaded", () =>
  DeleteArticleManager.init(),
);
