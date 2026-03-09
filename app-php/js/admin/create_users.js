document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("createFullUserForm");

  const showFieldError = (fieldId, message) => {
    const input = document.getElementById(fieldId);
    const errorP = document.getElementById(`error-${fieldId}`);
    if (input && errorP) {
      input.classList.add("border-red-500", "bg-red-50");
      errorP.textContent = message;
      errorP.classList.remove("hidden");
      input.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const clearErrors = () => {
    document
      .querySelectorAll("input, select, textarea")
      .forEach((el) => el.classList.remove("border-red-500", "bg-red-50"));
    document.querySelectorAll("[id^='error-']").forEach((el) => {
      el.classList.add("hidden");
      el.textContent = "";
    });
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearErrors();

    const role = document.getElementById("role").value;
    const isComplete = document.getElementById("complete_profile").checked;

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
        userData.nom_societe = document.getElementById("nom_societe").value;
        userData.adresse_pro = document.getElementById("adresse_pro").value;
        userData.siret = document.getElementById("siret").value;
        userData.rib = document.getElementById("rib").value;
        userData.bio = document.getElementById("bio").value;
        userData.telephone_pro = document.getElementById("telephone_pro").value;
      }
    }

    try {
      const response = await fetch("http://localhost:8082/admin/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const toast = document.getElementById("successToast");
        toast.classList.remove("-translate-y-full", "opacity-0");
        toast.classList.add("translate-y-0", "opacity-100");
        setTimeout(() => (window.location.href = "admin_users.php"), 2000);
      } else {
        const errorData = await response.json();
        if (errorData.field) {
          showFieldError(errorData.field, errorData.message);
        } else {
          alert("Erreur : " + errorData.message);
        }
      }
    } catch (error) {
      alert("Le serveur est injoignable.");
    }
  });
});
