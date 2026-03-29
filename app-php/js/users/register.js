const roleSelect = document.getElementById("role");
const seniorFields = document.getElementById("seniorFields");
const proTextFields = document.getElementById("proTextFields");
const etape1 = document.getElementById("etape1");
const etape2 = document.getElementById("etape2");
const btnSuivant = document.getElementById("btnSuivant");
const btnSubmitSenior = document.getElementById("btnSubmitSenior");
const passwordInput = document.getElementById("password");
const dateInput = document.getElementById("date_naissance");
const ageError = document.getElementById("ageError");
const registerForm = document.getElementById("registerForm");

const today = new Date();
const eighteenYearsAgo = new Date(
  today.getFullYear() - 18,
  today.getMonth(),
  today.getDate()
);
dateInput.max = eighteenYearsAgo.toISOString().split("T")[0];

function globalValidation() {
  const mdp = passwordInput.value;
  const isLongEnough = mdp.length >= 8;
  const hasNumber = /\d/.test(mdp);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<> ]/.test(mdp);
  const mdpValid = isLongEnough && hasNumber && hasSpecial;

  let isMajeur = false;
  if (dateInput.value) {
    isMajeur = new Date(dateInput.value) <= eighteenYearsAgo;
  }

  if (dateInput.value && !isMajeur) ageError.classList.remove("hidden");
  else ageError.classList.add("hidden");

  updateCriteria(
    document.getElementById("crit-length"),
    isLongEnough,
    "8 caractères"
  );
  updateCriteria(
    document.getElementById("crit-number"),
    hasNumber,
    "Un chiffre"
  );
  updateCriteria(
    document.getElementById("crit-special"),
    hasSpecial,
    "Un caractère spécial"
  );

  const canProceed = mdpValid && isMajeur;
  [btnSuivant, btnSubmitSenior].forEach((btn) => {
    btn.disabled = !canProceed;
    btn.classList.toggle("opacity-50", !canProceed);
    btn.classList.toggle("cursor-not-allowed", !canProceed);
  });
}

function updateCriteria(el, valid, text) {
  if (!el) return;
  el.innerHTML = (valid ? "[OK] " : "[X] ") + text;
  el.className = `text-[9px] font-bold uppercase tracking-widest italic ${
    valid ? "text-green-500" : "text-red-500"
  }`;
}

passwordInput.addEventListener("input", globalValidation);
dateInput.addEventListener("change", globalValidation);

roleSelect.addEventListener("change", () => {
  const isPro = roleSelect.value === "pro";
  seniorFields.classList.toggle("hidden", isPro);
  proTextFields.classList.toggle("hidden", !isPro);
  btnSubmitSenior.classList.toggle("hidden", isPro);
  btnSuivant.classList.toggle("hidden", !isPro);
  etape2.classList.add("hidden");
  etape1.classList.remove("hidden");
});

btnSuivant.addEventListener("click", () => {
  etape1.classList.add("hidden");
  etape2.classList.remove("hidden");
});

document.getElementById("btnPrecedent").addEventListener("click", () => {
  etape2.classList.add("hidden");
  etape1.classList.remove("hidden");
});

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // CORRECTION ICI : On envoie "pro" pour plaire à la base de données
  const roleValue = roleSelect.value === "pro" ? "pro" : "senior";

  const data = {
    role: roleValue,
    email: document.getElementById("email").value,
    password: passwordInput.value,
    nom: document.getElementById("nom").value,
    prenom: document.getElementById("prenom").value,
    genre: document.getElementById("genre").value,
    telephone: document.getElementById("telephone").value,
    date_naissance: dateInput.value,
    adresse: document.getElementById("adresse")
      ? document.getElementById("adresse").value
      : "",
  };

  if (roleSelect.value === "pro") {
    data.siret = document.getElementById("siret").value;
    data.bio = document.getElementById("bio").value;
    data.rib = "RIB_NON_FOURNI";
  }

  try {
    const response = await fetch("http://localhost:8082/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("✅ Inscription réussie ! Bienvenue.");
      window.location.href = "/users/login.php";
    } else {
      const errorText = await response.text();
      alert("❌ Erreur : " + errorText);
    }
  } catch (err) {
    console.error("Erreur connexion :", err);
    alert("❌ Impossible de contacter l'API Go.");
  }
});
