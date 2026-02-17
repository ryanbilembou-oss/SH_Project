document.addEventListener("DOMContentLoaded", async () => {
  const tableBody = document.getElementById("userTableBody");

  try {
    const response = await fetch("http://localhost:8082/admin/users");
    if (!response.ok) throw new Error("Erreur lors de la récupération");

    const users = await response.json();

    tableBody.innerHTML = ""; // On vide le tableau

    users.forEach((user) => {
      const row = `
                <tr class="border-b border-gray-200 hover:bg-gray-100">
                    <td class="py-3 px-6 text-left">#${user.id_user}</td>
                    <td class="py-3 px-6 text-left">${user.email}</td>
                    <td class="py-3 px-6 text-center">
                        <span class="bg-blue-200 text-blue-600 py-1 px-3 rounded-full text-xs">${user.role}</span>
                    </td>
                    <td class="py-3 px-6 text-center">${new Date(user.date_inscription).toLocaleDateString()}</td>
                    <td class="py-3 px-6 text-center">
                        <button onclick="deleteUser(${user.id_user})" class="text-red-500 hover:text-red-700">Supprimer</button>
                    </td>
                </tr>
            `;
      tableBody.innerHTML += row;
    });
  } catch (error) {
    console.error("Erreur:", error);
    tableBody.innerHTML =
      "<tr><td colspan='5' class='text-center py-4 text-red-500'>Impossible de charger les utilisateurs.</td></tr>";
  }
});
