var API_BASE = "http://144.76.74.130:8082";
const urlParams = new URLSearchParams(window.location.search);
const newsletterId = urlParams.get("id");

(async () => {
  await loadNewsletter();
  document.getElementById("submitBtn").addEventListener("click", handleSubmit);
})();

async function loadNewsletter() {
  if (!newsletterId) {
    showToast("ID manquant.", "error");
    return;
  }
  try {
    const res = await fetch(
      `${API_BASE}/admin/newsletter/getone?id=${newsletterId}`,
    );
    if (!res.ok) throw new Error();
    const n = await res.json();
    document.getElementById("email").value = n.email || "";
    document.getElementById("titre").value = n.titre || "";
    document.getElementById("preferences").value = n.preferences || "";
    document.getElementById("contenu").value = n.contenu || "";
  } catch {
    showToast("Impossible de charger la newsletter.", "error");
  }
}

async function handleSubmit() {
  const email = document.getElementById("email").value.trim();
  const titre = document.getElementById("titre").value.trim() || null;
  const preferences =
    document.getElementById("preferences").value.trim() || null;
  const contenu = document.getElementById("contenu").value.trim() || null;
  const submitBtn = document.getElementById("submitBtn");

  if (!email) {
    showToast("L'email est obligatoire.", "error");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i>Enregistrement...`;

  try {
    const res = await fetch(`${API_BASE}/admin/newsletter/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_newsletter: Number(newsletterId),
        email,
        titre,
        preferences,
        contenu,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.erreur || "Erreur serveur.");
    showToast("Newsletter mise à jour !", "success");
    setTimeout(() => {
      window.location.href = "admin_newsletter.php";
    }, 1500);
  } catch (err) {
    showToast(err.message || "Erreur lors de la mise à jour.", "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<i class="fas fa-save mr-2"></i>Enregistrer`;
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
