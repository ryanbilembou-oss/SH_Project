const API_BASE = "http://144.76.74.130:8082";

const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get("id");

const formLoader = document.getElementById("formLoader");
const editForm = document.getElementById("editForm");
const submitBtn = document.getElementById("submitBtn");

(async () => {
  if (!eventId) {
    showError("Aucun ID d'événement fourni dans l'URL.");
    return;
  }

  await loadCategories();
  await loadEvent(eventId);

  submitBtn.addEventListener("click", handleSubmit);
})();

async function loadEvent(id) {
  try {
    const res = await fetch(
      `http://144.76.74.130:8082/admin/evenement/getone?id=${id}`,
    );
    if (!res.ok) throw new Error(`Événement introuvable (${res.status})`);

    const e = await res.json();

    document.getElementById("id_evenement").value = e.id_evenement;
    document.getElementById("nb_inscrits").value = e.nb_inscrits;
    document.getElementById("titre").value = e.titre || "";
    document.getElementById("date_heure").value = e.date_heure || "";
    document.getElementById("lieu").value = e.lieu || "";
    document.getElementById("prix_ticket").value = e.prix_ticket ?? 0;
    document.getElementById("nb_places_max").value = e.nb_places_max ?? 0;
    document.getElementById("description").value = e.description || "";

    const select = document.getElementById("id_categorie");
    if (select) select.value = e.id_categorie;

    formLoader.classList.add("hidden");
    editForm.classList.remove("hidden");
  } catch (err) {
    console.error("[loadEvent]", err);
    showError(err.message);
  }
}

async function loadCategories() {
  try {
    const res = await fetch(
      `http://144.76.74.130:8082/admin/evenement/categorie_evenement/get`,
    );
    if (!res.ok) throw new Error("Impossible de charger les catégories.");

    const categories = await res.json();
    const select = document.getElementById("id_categorie");

    select.innerHTML = categories
      .map(
        (c) =>
          `<option value="${c.id_categorie}">${esc(c.nom_categorie)}</option>`,
      )
      .join("");
  } catch (err) {
    console.warn("[loadCategories]", err);
  }
}
async function loadInscrits(idEvenement) {
  try {
    const res = await fetch(
      `${API_BASE}/admin/inscription_evenement/get_by_event?id=${idEvenement}`,
    );

    const data = await res.json();
    const inscrits = Array.isArray(data) ? data : [];

    const modal = document.createElement("div");
    modal.id = "modalInscrits";
    modal.innerHTML = `
      <div>
        <div>
          <div>
            ${inscrits
              .map((i) => {
                return `
                <tr>
                  <td>${i.nom}</td>
                </tr>
              `;
              })
              .join("")}
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  } catch (error) {
    console.error("Erreur inscrits :", error);
  }
}
async function handleSubmit() {
  const titre = document.getElementById("titre").value.trim();
  const lieu = document.getElementById("lieu").value.trim();
  const date_heure = document.getElementById("date_heure").value;
  const prix_ticket = parseFloat(document.getElementById("prix_ticket").value);
  const nb_places_max = parseInt(
    document.getElementById("nb_places_max").value,
  );
  const id_categorie = parseInt(document.getElementById("id_categorie").value);
  const description =
    document.getElementById("description").value.trim() || null;
  const id_evenement = parseInt(document.getElementById("id_evenement").value);

  if (!titre) {
    showToast("Le titre est obligatoire.", "error");
    return;
  }
  if (!lieu) {
    showToast("Le lieu est obligatoire.", "error");
    return;
  }
  if (!date_heure) {
    showToast("La date et l'heure sont obligatoires.", "error");
    return;
  }
  if (isNaN(nb_places_max) || nb_places_max < 1) {
    showToast("Le nombre de places doit être supérieur à 0.", "error");
    return;
  }
  if (isNaN(prix_ticket) || prix_ticket < 0) {
    showToast("Le prix ne peut pas être négatif.", "error");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i>Enregistrement...`;

  try {
    const res = await fetch(
      `http://144.76.74.130:8082/admin/evenement/update`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_evenement,
          id_categorie,
          titre,
          description,
          date_heure,
          lieu,
          prix_ticket,
          nb_places_max,
        }),
      },
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Erreur serveur.");

    showToast("Événement mis à jour avec succès !", "success");

    setTimeout(() => {
      window.location.href = "admin_evenement.php";
    }, 1500);
  } catch (err) {
    console.error("[handleSubmit]", err);
    showToast(err.message || "Erreur lors de la mise à jour.", "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<i class="fas fa-save mr-2"></i>Enregistrer les modifications`;
  }
}

function showError(message) {
  formLoader.innerHTML = `
    <div class="p-20 text-center">
      <i class="fas fa-exclamation-circle text-4xl mb-3 block text-red-400"></i>
      <p class="text-red-500 font-semibold text-sm">${message}</p>
      <a href="admin_evenement.php" class="mt-4 inline-block text-xs text-blue-600 underline hover:text-blue-800">
        Retour au planning
      </a>
    </div>`;
}

function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  const msgSpan = document.getElementById("toastMessage");
  const icon = document.getElementById("toastIcon");
  if (!container || !msgSpan) return;

  const styles = {
    success: { cls: "fas fa-check-circle", color: "text-emerald-400" },
    error: { cls: "fas fa-times-circle", color: "text-red-400" },
    info: { cls: "fas fa-info-circle", color: "text-blue-400" },
  };
  const s = styles[type] || styles.info;

  msgSpan.textContent = message;
  if (icon) icon.className = `${s.cls} ${s.color} text-xl`;

  container.classList.remove("-translate-y-20", "opacity-0");
  container.classList.add("translate-y-0", "opacity-100");

  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => {
    container.classList.remove("translate-y-0", "opacity-100");
    container.classList.add("-translate-y-20", "opacity-0");
  }, 3000);
}

function esc(str) {
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
