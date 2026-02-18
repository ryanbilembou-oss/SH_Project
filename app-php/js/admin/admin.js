document.addEventListener("DOMContentLoaded", async () => {
  const tableBody = document.getElementById("userTableBody");

  try {
    const response = await fetch("http://localhost:8082/admin/users");
    if (!response.ok) throw new Error("Erreur lors de la récupération");

    const users = await response.json();
    console.log("Données reçues :", users); // Petit check pour voir les noms des champs

    tableBody.innerHTML = "";

    users.forEach((user) => {
      const dateSource = user.date_inscription || user.Date_inscription; // Gère les majuscules/minuscules
      const formattedDate = dateSource
        ? new Date(dateSource.replace(" ", "T")).toLocaleDateString("fr-FR")
        : "Date inconnue";

      let badgeClass = "";
      switch (user.role.toLowerCase()) {
        case "admin":
          badgeClass = "bg-red-100 text-red-700 border border-red-200";
          break;
        case "pro":
        case "presta":
          badgeClass = "bg-green-100 text-green-700 border border-green-200";
          break;
        case "senior":
          badgeClass = "bg-blue-100 text-blue-700 border border-blue-200";
          break;
        default:
          badgeClass = "bg-gray-100 text-gray-700 border border-gray-200";
      }

      const row = `
    <tr class="border-b border-gray-200 hover:bg-gray-50 transition-colors" id="user-row-${user.id_user}">
        <td class="py-3 px-6 text-left font-mono text-xs text-gray-400">#${user.id_user}</td>
        <td class="py-3 px-6 text-left font-semibold text-gray-700">${user.email}</td>
        <td class="py-3 px-6 text-center">
            <span class="${badgeClass} py-1 px-3 rounded-full text-xs font-bold uppercase tracking-wider">
                ${user.role}
            </span>
        </td>
        <td class="py-3 px-6 text-center text-sm text-gray-500">${formattedDate}</td>
        <td class="py-3 px-6 text-center">
            <div class="flex justify-center item-center space-x-2">
                <a href="admin_edit.php?id=${user.id_user}" 
                   class="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white rounded-full transition-all duration-200" 
                   title="Modifier">
                    <i class="fas fa-edit"></i>
                </a>

                <button onclick="deleteUser(${user.id_user})" 
                        class="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-white rounded-full transition-all duration-200" 
                        title="Supprimer">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        </td>
    </tr>`;
      tableBody.innerHTML += row;
    });
  } catch (error) {
    console.error("Erreur:", error);
    tableBody.innerHTML =
      "<tr><td colspan='5' class='text-center py-4 text-red-500'>Impossible de charger les utilisateurs.</td></tr>";
  }
});
