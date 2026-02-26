document.getElementById("createFullUserForm").onsubmit = async (e) => {
  e.preventDefault();

  // 1. Récupération des flags de contrôle
  const role = document.getElementById("role").value;
  const isComplete = document.getElementById("complete_profile").checked;

  // 2. Initialisation de l'objet avec les données de base (Table Users)
  const userData = {
    email: document.getElementById("email").value,
    password_hash: document.getElementById("password").value, // Sera haché par Go
    role: role,
    is_profile_completed: isComplete ? 1 : 0,
  };

  // 3. Extraction dynamique des données de profil (si coché)
  if (isComplete) {
    // DANS create_users.js
    if (role === "pro") {
      userData.nom_societe = document.getElementById("nom_societe").value;
      userData.genre = document.getElementById("genre_pro").value; // On mappe genre_pro vers userData.genre
      userData.siret = document.getElementById("siret").value;
      userData.rib = document.getElementById("rib").value;
      userData.bio = document.getElementById("bio").value;
      userData.telephone_pro = document.getElementById("telephone_pro").value;
    } else {
      // Mapping commun (Senior & Admin)
      userData.nom = document.getElementById("nom").value;
      userData.prenom = document.getElementById("prenom").value;
      userData.genre = document.getElementById("genre").value;

      if (role === "senior") {
        // Champs exclusifs Senior
        userData.date_naissance =
          document.getElementById("date_naissance").value;
        userData.telephone = document.getElementById("telephone").value;
      }
      // Note: Pour Admin, on n'ajoute rien de plus car ta table est plus légère
    }
  }

  // 4. Envoi des données au backend Go
  try {
    const response = await fetch("http://localhost:8082/admin/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      // Animation du Toast de succès
      const toast = document.getElementById("successToast");
      toast.classList.replace("-translate-y-full", "translate-y-0");
      toast.classList.replace("opacity-0", "opacity-100");

      // Redirection après succès
      setTimeout(() => {
        window.location.href = "admin_users.php";
      }, 2000);
    } else {
      // Gestion d'erreur HTTP (ex: 409 Conflict si l'email existe déjà)
      const errorMsg = await response.text();
      alert("❌ Erreur serveur : " + errorMsg);
    }
  } catch (error) {
    console.error("Erreur Fetch:", error);
    alert("❌ Erreur : Le serveur Go est injoignable (Vérifiez Docker).");
  }
};
