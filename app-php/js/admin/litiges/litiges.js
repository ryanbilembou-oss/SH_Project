var API_BASE = "http://144.76.74.130:8082";
let litigeOuvert = null;

(async () => {
  await loadLitiges();
  initSearch();
  initDeleteModal();
})();

async function loadLitiges() {
  const tbody = document.getElementById("litigesTableBody");
  tbody.innerHTML = `<tr><td colspan="8" class="py-20 text-center text-gray-400"><i class="fas fa-spinner fa-spin text-2xl mb-3 block text-blue-400"></i><span class="text-sm italic">Chargement...</span></td></tr>`;
  try {
    const res = await fetch(`${API_BASE}/admin/litiges/get`);
    if (!res.ok) throw new Error();
    const litiges = await res.json();
    if (!litiges.length) {
      tbody.innerHTML = `<tr><td colspan="8" class="py-20 text-center text-gray-400"><span class="text-sm italic">Aucun litige.</span></td></tr>`;
      return;
    }
    tbody.innerHTML = litiges
      .map((l) => {
        const date = l.date_ouverture
          ? new Date(l.date_ouverture).toLocaleDateString("fr-FR")
          : "—";
        const estatutLabel = l.statut_detail || l.statut;
        const statutClass =
          l.statut === "ferme"
            ? "bg-gray-100 text-gray-500"
            : l.statut_detail === "en_instruction"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700";

        const decisionBadge = l.decision
          ? l.decision === "senior"
            ? `<span class="ml-2 text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 font-bold">Faveur senior</span>`
            : `<span class="ml-2 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-bold">Faveur pro</span>`
          : "";

        return `
      <tr id="litige-row-${l.id_litige}" class="border-b border-gray-100 hover:bg-blue-50/40 transition-colors ${l.statut === "ferme" ? "opacity-60" : ""}">
        <td class="py-4 px-4 text-sm font-semibold text-gray-700">#${l.id_litige}</td>
        <td class="py-4 px-4 text-sm text-gray-600">
          <div class="font-semibold">${esc(l.prenom_senior)} ${esc(l.nom_senior)}</div>
          <div class="text-xs text-gray-400">vs ${esc(l.prenom_pro)} ${esc(l.nom_pro)}</div>
        </td>
        <td class="py-4 px-4 text-sm text-gray-600">${esc(l.nom_service || "—")}</td>
        <td class="py-4 px-4 text-sm text-gray-500 max-w-xs truncate">${esc(l.motif)}</td>
        <td class="py-4 px-4 text-center">
          <span class="text-xs font-bold px-2 py-1 rounded uppercase ${statutClass}">${esc(estatutLabel)}</span>
          ${decisionBadge}
        </td>
        <td class="py-4 px-4 text-center text-sm text-gray-500">${date}</td>
        <td class="py-4 px-4 text-center text-sm text-gray-500">
          ${l.date_fermeture ? new Date(l.date_fermeture).toLocaleDateString("fr-FR") : "—"}
        </td>
        <td class="py-4 px-4">
          <div class="flex items-center justify-center gap-2">
            <button onclick="ouvrirGestion(${l.id_litige}, ${l.statut === "ferme"})"
              class="group flex items-center justify-center w-8 h-8 rounded-lg ${l.statut === "ferme" ? "bg-gray-50 hover:bg-gray-400" : "bg-blue-50 hover:bg-blue-600"} transition-colors"
              title="${l.statut === "ferme" ? "Visualiser" : "Gerer"}">
              <i class="fas ${l.statut === "ferme" ? "fa-eye text-gray-400" : "fa-gavel text-blue-600"} group-hover:text-white text-sm"></i>
            </button>
            <button type="button" data-id="${l.id_litige}"
              class="btn-delete group flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 hover:bg-red-600 transition-colors">
              <i class="fas fa-trash-alt text-red-500 group-hover:text-white text-sm pointer-events-none"></i>
            </button>
          </div>
        </td>
      </tr>`;
      })
      .join("");
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="8" class="py-20 text-center"><p class="text-red-500 text-sm">${err.message}</p></td></tr>`;
  }
}

async function ouvrirGestion(idLitige, estFerme = false) {
  litigeOuvert = idLitige;
  document.getElementById("modalGestionTitre").textContent =
    "Litige #" + idLitige;

  const actionsDiv = document.getElementById("modalGestionActions");
  if (estFerme) {
    actionsDiv.innerHTML = `<p class="text-gray-400 italic text-sm text-center py-2">Ce litige est ferme — consultation uniquement.</p>`;
  } else {
    actionsDiv.innerHTML = `
      <p class="text-xs font-bold text-gray-500 uppercase mb-3">Decision finale</p>
      <div class="flex gap-3 flex-wrap">
        <button onclick="mettreEnInstruction()" class="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-bold hover:bg-yellow-200 transition">
          <i class="fas fa-clock mr-1"></i> En instruction
        </button>
        <button onclick="prendrDecision('senior')" class="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-bold hover:bg-orange-600 transition">
          <i class="fas fa-user mr-1"></i> Faveur senior
        </button>
        <button onclick="prendrDecision('pro')" class="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700 transition">
          <i class="fas fa-briefcase mr-1"></i> Faveur pro
        </button>
      </div>`;
  }

  document.getElementById("modalGestion").classList.remove("hidden");
  document.getElementById("modalGestion").classList.add("flex");
  await chargerMessages(idLitige);
}

function fermerGestion() {
  document.getElementById("modalGestion").classList.add("hidden");
  document.getElementById("modalGestion").classList.remove("flex");
  litigeOuvert = null;
}

async function chargerMessages(idLitige) {
  const container = document.getElementById("gestionMessages");
  try {
    const res = await fetch(
      `${API_BASE}/admin/litiges/messages/get?id_litige=${idLitige}`,
    );
    const messages = await res.json();

    if (!messages.length) {
      container.innerHTML = `<p class="text-gray-400 italic text-center py-4">Aucun message pour le moment.</p>`;
      return;
    }

    container.innerHTML = messages
      .map((m) => {
        const roleLabel =
          m.role === "admin"
            ? "Admin"
            : m.role === "pro"
              ? "Prestataire"
              : "Senior";
        const roleColor =
          m.role === "admin"
            ? "bg-blue-100 text-blue-700"
            : m.role === "pro"
              ? "bg-green-100 text-green-700"
              : "bg-orange-100 text-orange-700";
        const date = m.date_envoi
          ? new Date(m.date_envoi).toLocaleString("fr-FR")
          : "";
        return `
      <div class="flex items-start gap-3 mb-3">
        <span class="text-xs px-2 py-1 rounded-full ${roleColor} font-bold flex-shrink-0">${roleLabel}</span>
        <div class="flex-1">
          <p class="text-xs text-gray-400 mb-1">${esc(m.prenom_user)} ${esc(m.nom_user)} · ${date}</p>
          <div class="bg-gray-50 px-4 py-2 rounded-[15px] text-sm text-gray-700">${esc(m.message)}</div>
        </div>
      </div>`;
      })
      .join("");

    container.scrollTop = container.scrollHeight;
  } catch {
    container.innerHTML = `<p class="text-red-400 text-center">Erreur.</p>`;
  }
}

async function envoyerMessageAdmin() {
  const input = document.getElementById("gestionInput");
  const message = input.value.trim();
  if (!message || !litigeOuvert) return;
  const adminId = Number(localStorage.getItem("id_user"));
  try {
    await fetch(`${API_BASE}/admin/litiges/messages/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_litige: litigeOuvert,
        id_user: adminId,
        message,
      }),
    });
    input.value = "";
    await chargerMessages(litigeOuvert);
  } catch {
    alert("Erreur envoi message.");
  }
}

async function prendrDecision(decision) {
  if (!litigeOuvert) return;
  if (
    !confirm(
      `Confirmer la decision en faveur du ${decision === "senior" ? "senior" : "prestataire"} ?`,
    )
  )
    return;
  try {
    const res = await fetch(`${API_BASE}/admin/litiges/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_litige: litigeOuvert,
        statut: "ferme",
        decision,
      }),
    });
    if (!res.ok) throw new Error();
    fermerGestion();
    await loadLitiges();
  } catch {
    alert("Erreur lors de la decision.");
  }
}

async function mettreEnInstruction() {
  if (!litigeOuvert) return;
  try {
    await fetch(`${API_BASE}/admin/litiges/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_litige: litigeOuvert,
        statut: "en_instruction",
      }),
    });
    await chargerMessages(litigeOuvert);
  } catch {
    alert("Erreur.");
  }
}

function ouvrirModalCreerLitige() {
  document.getElementById("modalCreerLitige").classList.remove("hidden");
  document.getElementById("modalCreerLitige").classList.add("flex");
  chargerInterventions();
}

function fermerModalCreerLitige() {
  document.getElementById("modalCreerLitige").classList.add("hidden");
  document.getElementById("modalCreerLitige").classList.remove("flex");
}

async function chargerInterventions() {
  const select = document.getElementById("creerIdIntervention");
  try {
    const res = await fetch(`${API_BASE}/admin/intervention/get`);
    const interventions = await res.json();
    const terminees = interventions.filter((i) => i.statut === "terminee");
    select.innerHTML =
      `<option value="">-- Choisir une intervention --</option>` +
      terminees
        .map(
          (i) =>
            `<option value="${i.id}" data-senior="${i.id_senior}" data-pro="${i.id_pro}">#${i.id} — ${esc(i.nom_service || "Intervention")} (${esc(i.prenom_senior || "")} ${esc(i.nom_senior || "")})</option>`,
        )
        .join("");
  } catch {
    select.innerHTML = `<option value="">Erreur chargement</option>`;
  }
}

async function soumettreCreerLitige() {
  const select = document.getElementById("creerIdIntervention");
  const motif = document.getElementById("creerMotif").value.trim();
  const option = select.options[select.selectedIndex];
  const idIntervention = Number(select.value);
  const idSenior = Number(option?.dataset?.senior);
  const idPro = Number(option?.dataset?.pro);

  if (!idIntervention || !motif) {
    alert("Intervention et motif obligatoires.");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/admin/litiges/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_intervention: idIntervention,
        id_senior: idSenior,
        id_pro: idPro,
        motif,
        ouvert_par: "admin",
      }),
    });
    if (res.status === 409) {
      alert("Un litige est deja ouvert pour cette intervention.");
      return;
    }
    if (!res.ok) throw new Error();
    fermerModalCreerLitige();
    await loadLitiges();
  } catch {
    alert("Erreur lors de la creation.");
  }
}

function initSearch() {
  const input = document.getElementById("searchInput");
  const tbody = document.getElementById("litigesTableBody");
  if (!input || !tbody) return;
  input.addEventListener("input", () => {
    const term = input.value.trim().toLowerCase();
    tbody.querySelectorAll("tr[id^='litige-row-']").forEach((row) => {
      row.style.display = row.innerText.toLowerCase().includes(term)
        ? ""
        : "none";
    });
  });
}

let deleteId = null;

function initDeleteModal() {
  document.getElementById("litigesTableBody").addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-delete");
    if (!btn) return;
    deleteId = btn.dataset.id;
    const modal = document.getElementById("deleteModal");
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    setTimeout(() => modal.classList.remove("opacity-0"), 10);
  });
  document
    .getElementById("cancelDeleteBtn")
    .addEventListener("click", closeModal);
  document
    .getElementById("confirmDeleteBtn")
    .addEventListener("click", async () => {
      try {
        const res = await fetch(
          `${API_BASE}/admin/litiges/delete?id=${deleteId}`,
          { method: "DELETE" },
        );
        if (!res.ok) throw new Error();
        document
          .getElementById(`litige-row-${deleteId}`)
          ?.classList.add("fade-out");
        setTimeout(
          () => document.getElementById(`litige-row-${deleteId}`)?.remove(),
          400,
        );
        closeModal();
      } catch {
        alert("Erreur suppression.");
      }
    });
}

function closeModal() {
  const modal = document.getElementById("deleteModal");
  modal.classList.add("opacity-0");
  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }, 300);
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
