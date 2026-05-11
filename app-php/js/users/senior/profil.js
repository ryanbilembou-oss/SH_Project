const API_BASE = "http://172.16.90.10:8082";
const userId = Number(localStorage.getItem("id_user"));
const role = localStorage.getItem("role");
const email = localStorage.getItem("email") || "";

if (!userId || role !== "senior") window.location.href = "/users/login.php";

document.getElementById("profilEmail").textContent = email;

(async () => {
  await loadProfil();
})();

async function loadProfil() {
  try {
    const res = await fetch(
      `${API_BASE}/admin/profile_senior/getone?id=${userId}`,
    );
    if (!res.ok) throw new Error();
    const p = await res.json();
    document.getElementById("nom").value = p.nom || "";
    document.getElementById("prenom").value = p.prenom || "";
    document.getElementById("telephone").value = p.telephone || "";
    document.getElementById("genre").value = p.genre || "Masculin";
    document.getElementById("adresse").value = p.adresse || "";
    if (p.date_naissance)
      document.getElementById("date_naissance").value =
        p.date_naissance.split("T")[0];
    document.getElementById("profilNomComplet").textContent =
      `${p.prenom || ""} ${p.nom || ""}`;
    document.getElementById("avatarInitials").textContent =
      `${(p.prenom || "?")[0]}${(p.nom || "?")[0]}`;
  } catch {
    showToast("Impossible de charger le profil.", "error");
  }
}

async function sauvegarder() {
  const btn = document.getElementById("btnSave");
  btn.disabled = true;
  btn.textContent = "Enregistrement...";
  try {
    const res = await fetch(`${API_BASE}/admin/profile_senior/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_user: userId,
        nom: document.getElementById("nom").value.trim(),
        prenom: document.getElementById("prenom").value.trim(),
        telephone: document.getElementById("telephone").value.trim(),
        genre: document.getElementById("genre").value,
        date_naissance: document.getElementById("date_naissance").value,
        adresse: document.getElementById("adresse").value.trim(),
      }),
    });
    if (!res.ok) throw new Error();
    showToast("Profil mis à jour !", "success");
    await loadProfil();
  } catch {
    showToast("Erreur lors de la sauvegarde.", "error");
  } finally {
    btn.disabled = false;
    btn.textContent = "Enregistrer";
  }
}

function showToast(message, type = "info") {
  const toast = document.getElementById("toast");
  const msg = document.getElementById("toastMsg");
  const icon = document.getElementById("toastIcon");
  msg.textContent = message;
  icon.textContent = type === "success" ? "V" : type === "error" ? "X" : "i";
  toast.classList.remove("-translate-y-20", "opacity-0");
  toast.classList.add("translate-y-0", "opacity-100");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => {
    toast.classList.remove("translate-y-0", "opacity-100");
    toast.classList.add("-translate-y-20", "opacity-0");
  }, 3000);
}
