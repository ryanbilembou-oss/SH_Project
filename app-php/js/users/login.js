const API_BASE = "http://localhost:8082";

document.getElementById("togglePassword").addEventListener("click", () => {
  const input = document.getElementById("password");
  const icon = document.getElementById("eyeIcon");
  if (input.type === "password") {
    input.type = "text";
    icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />`;
  } else {
    input.type = "password";
    icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />`;
  }
});

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  ["email", "password", "captcha"].forEach((id) => {
    const el = document.getElementById(`error-${id}`);
    if (el) el.classList.add("hidden");
  });

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const captchaResponse = grecaptcha.getResponse();
  if (!captchaResponse) {
    document.getElementById("error-captcha").classList.remove("hidden");
    return;
  }

  try {
    const captchaRes = await fetch("../../users/verify_captcha.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ captcha: captchaResponse }),
    });
    const captchaData = await captchaRes.json();
    if (!captchaData.success) {
      showError("captcha", "Captcha invalide.");
      grecaptcha.reset();
      return;
    }
  } catch {
    showToast("Erreur vérification captcha.", "error");
    return;
  }

  const submitBtn = document.getElementById("submitBtn");
  submitBtn.disabled = true;
  submitBtn.textContent = "Connexion...";

  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log("DATA REÇUE:", data);
    console.log("RES OK:", res.ok);

    if (!res.ok) {
      if (data.error === "Utilisateur non trouvé") {
        showError("email", "Email introuvable");
      } else if (data.error === "Mot de passe incorrect") {
        showError("password", "Mot de passe incorrect");
      } else {
        showToast(data.error || "Erreur de connexion", "error");
      }
      grecaptcha.reset();
      return;
    }

    localStorage.setItem("id_user", data.id_user);
    localStorage.setItem("email", data.email);
    localStorage.setItem("role", data.role);
    localStorage.setItem("is_first_login", data.is_first_login);
    localStorage.setItem("statut_validation", data.statut_validation || "");

    try {
      await fetch("/users/session.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {}

    showToast("Connexion réussie !", "success");

    setTimeout(() => {
      if (data.role === "senior") {
        window.location.href = "seniors/accueil_senior.php";
      } else if (data.role === "pro") {
        if (data.statut_validation === "valide") {
          window.location.href = "pro/accueil_pro.php";
        } else if (data.statut_validation === "refuse") {
          window.location.href = "pro/dossier_refuse.php";
        } else {
          window.location.href = "pro/upload_documents.php";
        }
      } else if (data.role === "admin") {
        window.location.href = "../admin/index.php";
      }
    }, 1200);
  } catch {
    showToast("Serveur injoignable.", "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Se connecter";
  }
});

function showError(field, message) {
  const el = document.getElementById(`error-${field}`);
  if (el) {
    el.textContent = message;
    el.classList.remove("hidden");
  }
}

function showToast(message, type = "info") {
  const toast = document.getElementById("toast");
  const msg = document.getElementById("toastMsg");
  const icon = document.getElementById("toastIcon");
  msg.textContent = message;
  icon.textContent = type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️";
  toast.classList.remove("-translate-y-20", "opacity-0");
  toast.classList.add("translate-y-0", "opacity-100");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => {
    toast.classList.remove("translate-y-0", "opacity-100");
    toast.classList.add("-translate-y-20", "opacity-0");
  }, 3000);
}
