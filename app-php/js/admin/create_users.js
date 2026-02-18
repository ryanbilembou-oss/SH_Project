document.getElementById("createFullUserForm").onsubmit = async (e) => {
  e.preventDefault();

  const userData = {
    email: document.getElementById("email").value,
    password_hash: document.getElementById("password").value,
    role: document.getElementById("role").value,
  };

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

      setTimeout(() => {
        toast.classList.add("-translate-y-full", "opacity-0");

        setTimeout(() => {
          window.location.href = "admin_users.php";
        }, 500);
      }, 3000);
    } else {
      alert("❌ Erreur lors de la création.");
    }
  } catch (error) {
    console.error("Erreur:", error);
    alert("❌ Erreur : Serveur Go injoignable.");
  }
};
