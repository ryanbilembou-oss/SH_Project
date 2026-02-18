document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("id");

  if (!userId) {
    window.location.href = "admin_users.php";
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:8082/admin/users/get?id=${userId}`,
    );
    if (!response.ok) throw new Error("Utilisateur non trouvé");

    const user = await response.json();
    document.getElementById("edit-id").value = user.id_user;
    document.getElementById("display-id").textContent = user.id_user;
    document.getElementById("edit-email").value = user.email;
    document.getElementById("edit-role").value = user.role;
  } catch (err) {
    console.error("Erreur:", err);
    alert("Impossible de charger l'utilisateur.");
  }

  document.getElementById("updateUserForm").onsubmit = async (e) => {
    e.preventDefault();

    const passwordValue = document.getElementById("edit-password").value;

    const updatedData = {
      id_user: parseInt(document.getElementById("edit-id").value),
      email: document.getElementById("edit-email").value,
      role: document.getElementById("edit-role").value,
    };

    if (passwordValue.trim() !== "") {
      updatedData.password_hash = passwordValue;
    }

    try {
      const res = await fetch("http://localhost:8082/admin/users/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        const toast = document.getElementById("updateToast");
        toast.classList.remove("-translate-y-full", "opacity-0");
        toast.classList.add("translate-y-0", "opacity-100");

        setTimeout(() => {
          window.location.href = "admin_users.php";
        }, 2000);
      } else {
        alert("Erreur lors de la mise à jour");
      }
    } catch (err) {
      alert("Erreur réseau");
    }
  };
});
