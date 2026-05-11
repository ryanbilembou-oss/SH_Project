const API_URL = "http://144.76.74.130:8082/admin/evenement/get";

const tableBody = document.getElementById("eventTableBody");
const searchInput = document.getElementById("searchInput");

document.addEventListener("DOMContentLoaded", async () => {
  await loadEvents();
  initSearch();
});

async function loadEvents() {
  setLoadingState();

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(
        `Erreur serveur : ${response.status} ${response.statusText}`,
      );
    }

    const events = await response.json();

    if (!Array.isArray(events) || events.length === 0) {
      setEmptyState();
      return;
    }

    renderTable(events);
  } catch (err) {
    console.error("[evenement.js] Erreur API :", err);
    setErrorState(err.message);
  }
}

function renderTable(events) {
  tableBody.innerHTML = events.map((event) => buildRow(event)).join("");
}

function buildRow(event) {
  const dateFormatted = formatDate(event.date_heure || event.Date_heure);
  const prix = parseFloat(event.prix_ticket || 0).toFixed(2);
  const inscrits = event.nb_inscrits ?? 0;
  const placesMax = event.nb_places_max ?? "∞";
  const complet = inscrits >= placesMax;

  const badgeClass = complet
    ? "bg-red-100 text-red-700 border-red-200"
    : "bg-blue-100 text-blue-700 border-blue-200";

  return `
    <tr
      id="event-row-${event.id_evenement}"
      class="border-b border-gray-100 hover:bg-blue-50/40 transition-colors duration-150"
    >

      <td class="py-4 px-5">
        <span class="font-semibold text-gray-800 text-sm">${event.titre}</span>
      </td>


      <td class="py-4 px-5">
        <span class="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
          ${event.nom_categorie || "—"}
        </span>
      </td>

     
      <td class="py-4 px-5 text-sm text-gray-600 whitespace-nowrap">
        <i class="far fa-calendar-alt mr-1.5 text-blue-400"></i>
        ${dateFormatted}
      </td>


      <td class="py-4 px-5 text-sm text-gray-500">
        <i class="fas fa-map-marker-alt mr-1.5 text-red-400"></i>
        ${event.lieu || "—"}
      </td>

      
      <td class="py-4 px-5 text-center">
        <span class="inline-flex items-center gap-1 py-1 px-3 rounded-full text-xs font-bold border ${badgeClass}">
          ${inscrits} / ${placesMax}
          ${complet ? '<i class="fas fa-lock text-xs"></i>' : ""}
        </span>
      </td>


      <td class="py-4 px-5 text-center">
        <span class="font-bold text-emerald-600 text-sm">${prix}&nbsp;€</span>
      </td>

      <td class="py-4 px-5">
        <div class="flex items-center justify-center gap-3">
      
          <a
            href="admin_edit_evenement.php?id=${event.id_evenement}"
            class="group flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-600 transition-colors duration-200"
            title="Modifier"
          >
            <i class="fas fa-edit text-blue-600 group-hover:text-white text-sm transition-colors"></i>
          </a>

    
          <button
            type="button"
            data-id="${event.id_evenement}"
            class="btn-delete-trigger group flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 hover:bg-red-600 transition-colors duration-200"
            title="Supprimer"
            aria-label="Supprimer l'événement ${event.titre}"
          >
            <i class="fas fa-trash-alt text-red-500 group-hover:text-white text-sm transition-colors"></i>
          </button>
        </div>
      </td>
    </tr>`;
}

function initSearch() {
  if (!searchInput) return;

  searchInput.addEventListener("input", () => {
    const term = searchInput.value.trim().toLowerCase();
    const rows = tableBody.querySelectorAll("tr[id^='event-row-']");

    rows.forEach((row) => {
      const text = row.innerText.toLowerCase();
      row.style.display = text.includes(term) ? "" : "none";
    });
  });
}

function setLoadingState() {
  tableBody.innerHTML = `
    <tr>
      <td colspan="7" class="py-20 text-center text-gray-400">
        <i class="fas fa-spinner fa-spin text-2xl mb-3 block text-blue-400"></i>
        <span class="text-sm italic">Chargement des événements...</span>
      </td>
    </tr>`;
}

function setEmptyState() {
  tableBody.innerHTML = `
    <tr>
      <td colspan="7" class="py-20 text-center text-gray-400">
        <i class="fas fa-calendar-times text-4xl mb-3 block text-gray-300"></i>
        <span class="text-sm italic">Aucun événement à afficher.</span>
      </td>
    </tr>`;
}

function setErrorState(message = "Erreur de connexion.") {
  tableBody.innerHTML = `
    <tr>
      <td colspan="7" class="py-20 text-center">
        <i class="fas fa-exclamation-circle text-4xl mb-3 block text-red-400"></i>
        <p class="text-red-500 font-semibold text-sm">${message}</p>
        <button
          onclick="loadEvents()"
          class="mt-4 text-xs text-blue-600 underline hover:text-blue-800 transition"
        >
          Réessayer
        </button>
      </td>
    </tr>`;
}

function formatDate(raw) {
  if (!raw) return "—";
  try {
    const iso = raw.replace(" ", "T");
    const date = new Date(iso);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return raw;
  }
}

window.loadEvents = loadEvents;
