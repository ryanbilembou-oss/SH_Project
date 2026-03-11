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
  today.getDate(),
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
    "8 caractères",
  );
  updateCriteria(
    document.getElementById("crit-number"),
    hasNumber,
    "Un chiffre",
  );
  updateCriteria(
    document.getElementById("crit-special"),
    hasSpecial,
    "Un caractère spécial",
  );

  const canProceed = mdpValid && isMajeur;
  [btnSuivant, btnSubmitSenior].forEach((btn) => {
    btn.disabled = !canProceed;
    btn.classList.toggle("opacity-50", !canProceed);
    btn.classList.toggle("cursor-not-allowed", !canProceed);
  });
}

function updateCriteria(el, valid, text) {
  el.innerHTML = (valid ? "[OK] " : "[X] ") + text;
  el.className = `text-[9px] font-bold uppercase tracking-widest italic ${valid ? "critere-valid" : "critere-invalid"}`;
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
  const formData = new FormData();
  formData.append("role", roleSelect.value);
  formData.append("email", document.getElementById("email").value);
  formData.append("password", passwordInput.value);
  formData.append("nom", document.getElementById("nom").value);
  formData.append("prenom", document.getElementById("prenom").value);
  formData.append("genre", document.getElementById("genre").value);
  formData.append("telephone", document.getElementById("telephone").value);
  formData.append("date_naissance", dateInput.value);

  if (roleSelect.value === "pro") {
    formData.append("siret", document.getElementById("siret").value);
    formData.append("bio", document.getElementById("bio").value);
    const rib = document.getElementById("document_rib").files[0];
    const idCard = document.getElementById("piece_identite").files[0];
    if (rib) formData.append("document_rib", rib);
    if (idCard) formData.append("piece_identite", idCard);
  } else {
    formData.append("adresse", document.getElementById("adresse").value);
  }

  try {
    const response = await fetch("http://localhost:8082/admin/register", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      alert("Succès : Bienvenue !");
      window.location.href = "login.php";
    } else {
      alert("Erreur lors de l'inscription.");
    }
  } catch (err) {
    alert("Serveur injoignable.");
  }
});
