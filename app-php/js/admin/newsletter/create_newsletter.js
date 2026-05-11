var API_BASE = "http://144.76.74.130:8082";

document.getElementById("submitBtn").addEventListener("click", handleSubmit);

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
  submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i>Création...`;

  try {
    const res = await fetch(`${API_BASE}/admin/newsletter/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, titre, preferences, contenu }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.erreur || "Erreur serveur.");
    showToast("Newsletter créée !", "success");
    setTimeout(() => {
      window.location.href = "admin_newsletter.php";
    }, 1500);
  } catch (err) {
    showToast(err.message || "Erreur lors de la création.", "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<i class="fas fa-plus mr-2"></i>Créer`;
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
