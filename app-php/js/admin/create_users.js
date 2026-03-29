var API_BASE = "http://localhost:8082";

document.addEventListener("DOMContentLoaded", async () => {
  await loadTypes();
  initRoleToggle();
  initForm();
});

async function loadTypes() {
  try {
    const res = await fetch(`${API_BASE}/admin/type_prestataire/get`);
    const types = await res.json();
    document.getElementById("id_type").innerHTML =
      `<option value="">-- Choisir un type --</option>` +
      types
        .map((t) => `<option value="${t.id_type}">${esc(t.nom_type)}</option>`)
        .join("");
  } catch {
    document.getElementById("id_type").innerHTML =
      `<option value="">Erreur chargement</option>`;
  }
}

function initRoleToggle() {
  const roleSelect = document.getElementById("role");
  const profileToggle = document.getElementById("complete_profile");
  const profileSection = document.getElementById("profileSection");

  roleSelect.addEventListener("change", (e) => {
    profileToggle.disabled = e.target.value === "";
    if (profileToggle.checked) updateVisibility(e.target.value);
  });

  profileToggle.addEventListener("change", (e) => {
    if (e.target.checked) {
      profileSection.classList.remove("hidden");
      updateVisibility(roleSelect.value);
    } else {
      profileSection.classList.add("hidden");
    }
  });
}

function updateVisibility(role) {
  document.getElementById("fieldDateNaissance").classList.add("hidden");
  document.getElementById("fieldsSenior").classList.add("hidden");
  document.getElementById("fieldsPro").classList.add("hidden");

  if (role === "senior") {
    document.getElementById("fieldDateNaissance").classList.remove("hidden");
    document.getElementById("fieldsSenior").classList.remove("hidden");
  } else if (role === "pro") {
    document.getElementById("fieldDateNaissance").classList.remove("hidden");
    document.getElementById("fieldsPro").classList.remove("hidden");
  }
}

function initForm() {
  const form = document.getElementById("createFullUserForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearErrors();

    const role = document.getElementById("role").value;
    const isComplete = document.getElementById("complete_profile").checked;

    if (!role) {
      showToast("Veuillez choisir un rôle.", "error");
      return;
    }

    const userData = {
      email: document.getElementById("email").value,
      password_hash: document.getElementById("password").value,
      role: role,
      is_profile_completed: isComplete ? 1 : 0,
    };

    if (isComplete) {
      userData.nom = document.getElementById("nom").value;
      userData.prenom = document.getElementById("prenom").value;
      userData.genre = document.getElementById("genre").value;
      userData.date_naissance = document.getElementById("date_naissance").value;

      if (role === "senior") {
        userData.telephone = document.getElementById("telephone").value;
      } else if (role === "pro") {
        userData.id_type = Number(document.getElementById("id_type").value);
        userData.nom_societe = document.getElementById("nom_societe").value;
        userData.adresse_pro = document.getElementById("adresse_pro").value;
        userData.siret = document.getElementById("siret").value;
        userData.rib = document.getElementById("rib").value;
        userData.bio = document.getElementById("bio").value;
        userData.telephone_pro = document.getElementById("telephone_pro").value;

        if (!userData.id_type) {
          showToast("Veuillez choisir un type de prestataire.", "error");
          return;
        }
      }
    }

    const submitBtn = form.querySelector("button[type='submit']");
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i>Création...`;

    try {
      const res = await fetch(`${API_BASE}/admin/users/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (res.ok) {
        showToast("Utilisateur créé !", "success");
        // Si c'est un pro avec profil → rediriger vers upload documents
        if (role === "pro" && isComplete && data.id_user) {
          setTimeout(() => {
            window.location.href = `../profile/admin_upload_documents_pro.php?id=${data.id_user}`;
          }, 1500);
        } else {
          setTimeout(() => {
            window.location.href = "admin_users.php";
          }, 1500);
        }
      } else {
        if (data.field) {
          showFieldError(data.field, data.message);
        } else {
          showToast(data.message || "Erreur serveur.", "error");
        }
      }
    } catch {
      showToast("Le serveur est injoignable.", "error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<i class="fas fa-save mr-2"></i>Créer l'utilisateur`;
    }
  });
}

function showFieldError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const errorP = document.getElementById(`error-${fieldId}`);
  if (input) input.classList.add("border-red-500", "bg-red-50");
  if (errorP) {
    errorP.textContent = message;
    errorP.classList.remove("hidden");
  }
}

function clearErrors() {
  document
    .querySelectorAll("input, select, textarea")
    .forEach((el) => el.classList.remove("border-red-500", "bg-red-50"));
  document.querySelectorAll("[id^='error-']").forEach((el) => {
    el.classList.add("hidden");
    el.textContent = "";
  });
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
