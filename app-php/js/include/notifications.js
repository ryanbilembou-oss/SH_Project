const API_BASE_NOTIF = "http://172.16.90.10:8082";

async function chargerNotifications() {
  const userId = Number(localStorage.getItem("id_user"));
  if (!userId) return;

  try {
    const res = await fetch(
      `${API_BASE_NOTIF}/admin/notification/get?id_user=${userId}`,
    );
    const notifs = await res.json();
    if (!Array.isArray(notifs)) return;

    const nonLues = notifs.filter((n) => !n.est_lu).length;
    const badge = document.getElementById("badge-notif");
    if (badge) {
      if (nonLues > 0) {
        badge.textContent = nonLues > 9 ? "9+" : nonLues;
        badge.classList.remove("hidden");
      } else {
        badge.classList.add("hidden");
      }
    }

    const liste = document.getElementById("liste-notifs");
    if (!liste) return;

    if (!notifs.length) {
      liste.innerHTML = `<p class="text-gray-400 italic text-sm text-center py-6">Aucune notification.</p>`;
      return;
    }

    liste.innerHTML = notifs
      .map((n) => {
        const date = n.date_creation
          ? new Date(n.date_creation).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "short",
            })
          : "";
        const iconMap = {
          success: "mdi:check-circle",
          error: "mdi:close-circle",
          info: "mdi:information",
          paiement: "mdi:credit-card-check",
          litige: "mdi:alert-circle",
          admin: "mdi:shield-account",
        };
        const colorMap = {
          success: "text-green-500",
          error: "text-red-500",
          info: "text-[#7CABD3]",
          paiement: "text-blue-500",
          litige: "text-orange-500",
          admin: "text-purple-500",
        };
        const icon = iconMap[n.type] || iconMap.info;
        const color = colorMap[n.type] || colorMap.info;

        return `
      <div class="flex items-start gap-3 px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-all ${!n.est_lu ? "bg-blue-50/30" : ""} cursor-pointer"
        onclick="${n.lien_redirection ? `window.location.href='${n.lien_redirection}'` : ""}">
        <iconify-icon icon="${icon}" class="text-xl ${color} flex-shrink-0 mt-0.5"></iconify-icon>
        <div class="flex-1 min-w-0">
          <p class="font-fira text-[#1A2B49] text-sm font-bold">${esc_notif(n.titre)}</p>
          <p class="text-gray-400 text-xs mt-0.5 leading-relaxed">${esc_notif(n.message)}</p>
          <p class="text-gray-300 text-xs mt-1">${date}</p>
        </div>
        ${!n.est_lu ? `<div class="w-2 h-2 bg-[#7CABD3] rounded-full flex-shrink-0 mt-1"></div>` : ""}
      </div>`;
      })
      .join("");
  } catch {}
}

function toggleNotifs() {
  const dropdown = document.getElementById("dropdown-notif");
  if (!dropdown) return;
  dropdown.classList.toggle("hidden");
  if (!dropdown.classList.contains("hidden")) {
    chargerNotifications();
  }
}

async function marquerTousLus() {
  const userId = Number(localStorage.getItem("id_user"));
  if (!userId) return;
  try {
    await fetch(`${API_BASE_NOTIF}/admin/notification/marquer_lu`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_user: userId }),
    });
    await chargerNotifications();
  } catch {}
}

document.addEventListener("click", (e) => {
  const container = document.getElementById("cloche-container");
  if (container && !container.contains(e.target)) {
    document.getElementById("dropdown-notif")?.classList.add("hidden");
  }
});

function esc_notif(str) {
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

chargerNotifications();
setInterval(chargerNotifications, 30000);
