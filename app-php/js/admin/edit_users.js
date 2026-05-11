alert(
  "Script chargé pour l'ID : " +
    new URLSearchParams(window.location.search).get("id"),
);
document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("id");

  if (!userId) {
    window.location.href = "admin_users.php";
    return;
  }

  try {
    const response = await fetch(
      `http://172.16.90.10:8082/admin/users/get?id=${userId}`,
    );
    if (!response.ok)
      throw new Error("Erreur lors de la récupération de l'utilisateur");

    const user = await response.json();

    console.log("Données brutes reçues du Go:", user);

    const data = {
      id: user.id_user || user.Id_user,
      email: user.email || user.Email,
      role: user.role || user.Role,
    };

    const elId = document.getElementById("edit-id");
    const elDisplay = document.getElementById("display-id");
    const elEmail = document.getElementById("edit-email");
    const elRole = document.getElementById("edit-role");

    if (elId) elId.value = data.id;
    if (elDisplay) elDisplay.textContent = data.id;
    if (elEmail) elEmail.value = data.email || "";
    if (elRole) elRole.value = data.role || "senior";

    console.log("Champs remplis avec succès.");
  } catch (err) {
    console.error("Erreur chargement JS:", err);
    alert("Erreur de chargement : Vérifiez que l'API Go est lancée.");
  }

  const form = document.getElementById("updateUserForm");
  if (form) {
    form.onsubmit = async (e) => {
      e.preventDefault();

      const emailInput = document.getElementById("edit-email");
      const idInput = document.getElementById("edit-id");
      const roleSelect = document.getElementById("edit-role");
      const checkbox = document.getElementById("reset-password-checkbox");

      const updatedData = {
        id_user: parseInt(idInput.value),
        email: emailInput.value,
        role: roleSelect.value,
        reset_password: checkbox ? checkbox.checked : false,
      };

      try {
        const res = await fetch("http://172.16.90.10:8082/admin/users/update", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        });

        if (res.ok) {
          const resultData = await res.json();

          if (resultData.new_password) {
            alert(
              "MODIFICATION RÉUSSIE\n\nVoici le nouveau mot de passe généré :\n" +
                resultData.new_password +
                "\n\nNotez-le bien avant de fermer.",
            );
          }

          const toast = document.getElementById("updateToast");
          if (toast) {
            toast.classList.remove("-translate-y-full", "opacity-0");
            toast.classList.add("translate-y-0", "opacity-100");
          }

          setTimeout(() => {
            window.location.href = "admin_users.php";
          }, 2500);
        } else {
          const errorData = await res.json();
          alert("Erreur API: " + (errorData.erreur || "Erreur inconnue"));
        }
      } catch (err) {
        console.error("Erreur réseau PUT:", err);
        alert("Erreur réseau : impossible de joindre le serveur.");
      }
    };
  }
});
