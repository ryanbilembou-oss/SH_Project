const API_BASE = "http://172.16.90.10:8082";

const roleSelect = document.getElementById("role");
const seniorFields = document.getElementById("seniorFields");
const proFields = document.getElementById("proFields");
const passwordInput = document.getElementById("password");
const dateInput = document.getElementById("date_naissance");

const today = new Date();
const eighteenYearsAgo = new Date(
  today.getFullYear() - 18,
  today.getMonth(),
  today.getDate(),
);
dateInput.max = eighteenYearsAgo.toISOString().split("T")[0];

async function loadTypes() {
  try {
    const res = await fetch(`${API_BASE}/admin/type_prestataire/get`);
    const types = await res.json();
    document.getElementById("id_type").innerHTML =
      `<option value="">-- Choisir votre type --</option>` +
      types
        .map((t) => `<option value="${t.id_type}">${t.nom_type}</option>`)
        .join("");
  } catch {
    document.getElementById("id_type").innerHTML =
      `<option value="">Erreur chargement</option>`;
  }
}
loadTypes();

roleSelect.addEventListener("change", () => {
  const isPro = roleSelect.value === "pro";
  seniorFields.classList.toggle("hidden", isPro);
  proFields.classList.toggle("hidden", !isPro);
});

document.getElementById("togglePassword").addEventListener("click", () => {
  const input = document.getElementById("password");
  input.type = input.type === "password" ? "text" : "password";
});

passwordInput.addEventListener("input", validatePassword);
dateInput.addEventListener("change", validateAge);

function validatePassword() {
  const mdp = passwordInput.value;
  const isLongEnough = mdp.length >= 8;
  const hasNumber = /\d/.test(mdp);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(mdp);
  updateCritere("crit-length", isLongEnough, "8 caractères");
  updateCritere("crit-number", hasNumber, "Un chiffre");
  updateCritere("crit-special", hasSpecial, "Un caractère spécial");
  return isLongEnough && hasNumber && hasSpecial;
}

function validateAge() {
  if (!dateInput.value) return false;
  const isMajeur = new Date(dateInput.value) <= eighteenYearsAgo;
  document.getElementById("ageError").classList.toggle("hidden", isMajeur);
  return isMajeur;
}

function updateCritere(id, valid, text) {
  const el = document.getElementById(id);
  el.innerHTML = (valid ? "V " : "X ") + text;
  el.className = `text-[9px] font-fira uppercase tracking-widest italic ${valid ? "critere-valid" : "critere-invalid"}`;
}

document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    document.getElementById("error-email").classList.add("hidden");
    document.getElementById("error-captcha").classList.add("hidden");

    if (!validatePassword()) {
      showToast("Mot de passe invalide.", "error");
      return;
    }
    if (!validateAge()) {
      showToast("Vous devez être majeur.", "error");
      return;
    }

    const captchaResponse = grecaptcha.getResponse();
    if (!captchaResponse) {
      document.getElementById("error-captcha").classList.remove("hidden");
      return;
    }

    const captchaRes = await fetch("../../users/verify_captcha.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ captcha: captchaResponse }),
    });
    const captchaData = await captchaRes.json();
    if (!captchaData.success) {
      document.getElementById("error-captcha").textContent =
        "Captcha invalide.";
      document.getElementById("error-captcha").classList.remove("hidden");
      grecaptcha.reset();
      return;
    }

    const role = roleSelect.value;
    const submitBtn = document.getElementById("submitBtn");
    submitBtn.disabled = true;
    submitBtn.textContent = "Inscription...";

    const payload = {
      email: document.getElementById("email").value.trim(),
      password: document.getElementById("password").value,
      role: role,
      nom: document.getElementById("nom").value.trim(),
      prenom: document.getElementById("prenom").value.trim(),
      genre: document.getElementById("genre").value,
      telephone: document.getElementById("telephone").value.trim(),
      date_naissance: dateInput.value,
    };

    if (role === "senior") {
      payload.adresse = document.getElementById("adresse").value.trim();
    } else if (role === "pro") {
      payload.id_type = Number(document.getElementById("id_type").value);
      payload.nom_entreprise = document
        .getElementById("nom_entreprise")
        .value.trim();
      payload.siret = document.getElementById("siret").value.trim();
      payload.telephone_pro = document
        .getElementById("telephone_pro")
        .value.trim();
      payload.adresse_pro = document.getElementById("adresse_pro").value.trim();
      payload.statut_juridique =
        document.getElementById("statut_juridique").value;
      payload.bio = document.getElementById("bio").value.trim();

      if (!payload.id_type) {
        showToast("Veuillez choisir votre type de prestataire.", "error");
        submitBtn.disabled = false;
        submitBtn.textContent = "S'inscrire";
        return;
      }
    }

    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error && data.error.includes("email")) {
          const el = document.getElementById("error-email");
          el.textContent = data.error;
          el.classList.remove("hidden");
        } else {
          showToast(data.error || "Erreur inscription.", "error");
        }
        grecaptcha.reset();
        return;
      }

      showToast(
        "Compte créé ! Connectez-vous pour compléter votre dossier.",
        "success",
      );
      setTimeout(() => {
        window.location.href = "login.php";
      }, 2000);
    } catch {
      showToast("Serveur injoignable.", "error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "S'inscrire";
    }
  });

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
