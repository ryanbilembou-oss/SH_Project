document.addEventListener("DOMContentLoaded", async () => {
  const tableBody = document.getElementById("userTableBody");

  try {
    const response = await fetch("http://144.76.74.130:8082/admin/users");
    if (!response.ok) throw new Error("Erreur lors de la récupération");

    const users = await response.json();
    tableBody.innerHTML = "";

    users.forEach((user) => {
      const dateSource = user.date_inscription || user.Date_inscription;
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

      const estBanni = user.est_banni || false;
      const banJusquAu = user.ban_jusqu_au
        ? new Date(user.ban_jusqu_au).toLocaleDateString("fr-FR")
        : null;

      const banBadge = estBanni
        ? `<span class="ml-2 bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full font-bold">${banJusquAu ? "Suspendu jusqu'au " + banJusquAu : "Banni définitivement"}</span>`
        : "";

      const banButtons =
        user.role !== "admin"
          ? estBanni
            ? `<button onclick="unbanUser(${user.id_user})"
                class="w-8 h-8 flex items-center justify-center text-green-600 hover:bg-green-600 hover:text-white rounded-full transition-all duration-200"
                title="Débannir">
                <i class="fas fa-unlock"></i>
            </button>`
            : `<button onclick="ouvrirModalBan(${user.id_user})"
                class="w-8 h-8 flex items-center justify-center text-orange-500 hover:bg-orange-500 hover:text-white rounded-full transition-all duration-200"
                title="Bannir">
                <i class="fas fa-ban"></i>
            </button>`
          : "";

      const row = `
      <tr class="border-b border-gray-200 hover:bg-gray-50 transition-colors ${estBanni ? "bg-red-50" : ""}" id="user-row-${user.id_user}">
          <td class="py-3 px-6 text-left font-mono text-xs text-gray-400">#${user.id_user}</td>
          <td class="py-3 px-6 text-left font-semibold text-gray-700">
              ${user.email}
              ${banBadge}
          </td>
          <td class="py-3 px-6 text-center">
              <span class="${badgeClass} py-1 px-3 rounded-full text-xs font-bold uppercase tracking-wider">
                  ${user.role}
              </span>
          </td>
          <td class="py-3 px-6 text-center text-sm text-gray-500">${formattedDate}</td>
          <td class="py-3 px-6 text-center">
              <div class="flex justify-center items-center space-x-2">
                  <a href="admin_edit.php?id=${user.id_user}"
                     class="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white rounded-full transition-all duration-200"
                     title="Modifier">
                      <i class="fas fa-edit"></i>
                  </a>
                  ${banButtons}
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

    document
      .getElementById("searchInput")
      .addEventListener("input", function () {
        const term = this.value.toLowerCase();
        tableBody.querySelectorAll("tr[id^='user-row-']").forEach((row) => {
          row.style.display = row.innerText.toLowerCase().includes(term)
            ? ""
            : "none";
        });
      });
  } catch (error) {
    console.error("Erreur:", error);
    tableBody.innerHTML =
      "<tr><td colspan='5' class='text-center py-4 text-red-500'>Impossible de charger les utilisateurs.</td></tr>";
  }
});

let banUserId = null;

function ouvrirModalBan(idUser) {
  banUserId = idUser;
  document.getElementById("banModal").classList.remove("hidden");
}

function fermerModalBan() {
  document.getElementById("banModal").classList.add("hidden");
  banUserId = null;
}

async function confirmerBan() {
  const type = document.getElementById("banType").value;
  const jours = parseInt(document.getElementById("banJours").value) || 7;
  const raison = document.getElementById("banRaison").value.trim();

  try {
    const res = await fetch("http://144.76.74.130:8082/admin/users/ban", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_user: banUserId, type, jours, raison }),
    });
    if (!res.ok) throw new Error();
    fermerModalBan();
    location.reload();
  } catch {
    alert("Erreur lors du bannissement.");
  }
}

async function unbanUser(idUser) {
  if (!confirm("Débannir cet utilisateur ?")) return;
  try {
    const res = await fetch("http://144.76.74.130:8082/admin/users/unban", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_user: idUser }),
    });
    if (!res.ok) throw new Error();
    location.reload();
  } catch {
    alert("Erreur lors du débannissement.");
  }
}
