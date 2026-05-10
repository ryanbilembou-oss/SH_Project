const API_BASE = "http://localhost:8082";
const userId = Number(localStorage.getItem("id_user"));
const role = localStorage.getItem("role");

if (!userId || role !== "senior") window.location.href = "/users/login.php";

let litigeOuvert = null;
let tousLitiges = [];

(async () => {
  await loadLitiges();
})();

async function loadLitiges() {
  const container = document.getElementById("litigesList");
  try {
    const res = await fetch(
      `${API_BASE}/admin/litiges/get_by_user?id_user=${userId}&role=senior`,
    );
    tousLitiges = await res.json();

    if (!Array.isArray(tousLitiges) || !tousLitiges.length) {
      container.innerHTML = `
        <div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-gray-200 text-center">
          <iconify-icon icon="mdi:handshake" class="text-4xl text-gray-300 mb-3 block"></iconify-icon>
          <p class="text-gray-400 italic">Aucun litige pour le moment.</p>
        </div>`;
      return;
    }

    renderFiltres();
    renderLitiges(tousLitiges);
  } catch {
    container.innerHTML = `<p class="text-red-400 text-center italic">Erreur de chargement.</p>`;
  }
}

function renderFiltres() {
  const statuts = [
    ...new Set(tousLitiges.map((l) => l.statut_detail).filter(Boolean)),
  ];
  document.getElementById("filtresContainer").innerHTML = `
    <div class="flex flex-wrap gap-3 mb-6">
      <select onchange="filtrerLitiges(this.value)" class="px-5 py-2 rounded-full font-fira text-sm border-2 border-[#7CABD3] text-[#7CABD3] focus:outline-none bg-white">
        <option value="tous">Tous les statuts</option>
        <option value="ouvert">Ouvert</option>
        <option value="en_instruction">En instruction</option>
        <option value="ferme">Ferme</option>
      </select>
      <select onchange="trierLitiges(this.value)" class="px-5 py-2 rounded-full font-fira text-sm border-2 border-[#7CABD3] text-[#7CABD3] focus:outline-none bg-white">
        <option value="date_desc">Plus recent</option>
        <option value="date_asc">Plus ancien</option>
      </select>
    </div>`;
}

function filtrerLitiges(statut) {
  const filtres =
    statut === "tous"
      ? tousLitiges
      : tousLitiges.filter(
          (l) => l.statut_detail === statut || l.statut === statut,
        );
  renderLitiges(filtres);
}

function trierLitiges(tri) {
  const tries = [...tousLitiges].sort((a, b) => {
    const da = new Date(a.date_ouverture);
    const db = new Date(b.date_ouverture);
    return tri === "date_asc" ? da - db : db - da;
  });
  renderLitiges(tries);
}

function renderLitiges(litiges) {
  const container = document.getElementById("litigesList");

  if (!litiges.length) {
    container.innerHTML = `
      <div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-gray-200 text-center">
        <p class="text-gray-400 italic">Aucun litige pour ce filtre.</p>
      </div>`;
    return;
  }

  container.innerHTML = litiges.map((l) => renderAccordeon(l)).join("");
}

function renderAccordeon(l) {
  const statutConfig = {
    ouvert: { css: "bg-red-100 text-red-600", label: "Ouvert" },
    en_instruction: {
      css: "bg-yellow-100 text-yellow-700",
      label: "En instruction",
    },
    ferme: { css: "bg-gray-100 text-gray-500", label: "Ferme" },
  };
  const st =
    statutConfig[l.statut_detail] ||
    statutConfig[l.statut] ||
    statutConfig.ouvert;

  const date = l.date_ouverture
    ? new Date(l.date_ouverture).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "—";

  const decisionBadge = l.decision
    ? l.decision === "senior"
      ? `<span class="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-fira uppercase">Decision en votre faveur</span>`
      : `<span class="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full font-fira uppercase">Decision en faveur du prestataire</span>`
    : "";

  return `
  <div class="bg-white rounded-[30px] border-2 border-transparent hover:border-[#7CABD3] transition-all overflow-hidden mb-4">
    <button onclick="toggleAccordeon(${l.id_litige})"
      class="w-full flex items-center justify-between p-6 text-left">
      <div class="flex items-center gap-4 flex-wrap">
        <span class="font-fira uppercase text-xs tracking-widest text-gray-400">Litige #${l.id_litige}</span>
        <span class="font-fira text-[#1A2B49] text-lg">${esc(l.nom_service || "Intervention")}</span>
        <span class="text-xs text-gray-400">${date}</span>
        <span class="text-xs font-fira px-3 py-1 rounded-full uppercase ${st.css}">${st.label}</span>
        ${decisionBadge}
      </div>
      <iconify-icon icon="mdi:chevron-down" id="chevron-${l.id_litige}" class="text-2xl text-gray-400 transition-transform flex-shrink-0"></iconify-icon>
    </button>
    <div id="accordeon-${l.id_litige}" class="hidden px-6 pb-6">
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div class="bg-gray-50 px-4 py-3 rounded-[15px]">
          <p class="font-fira uppercase text-xs text-gray-400">Prestataire</p>
          <p class="font-fira text-[#1A2B49]">${esc(l.prenom_pro)} ${esc(l.nom_pro)}</p>
        </div>
        <div class="bg-gray-50 px-4 py-3 rounded-[15px]">
          <p class="font-fira uppercase text-xs text-gray-400">Prix</p>
          <p class="font-fira text-[#1A2B49]">${Number(l.prix_intervention || 0).toFixed(2)} EUR</p>
        </div>
        <div class="bg-gray-50 px-4 py-3 rounded-[15px]">
          <p class="font-fira uppercase text-xs text-gray-400">Lieu</p>
          <p class="font-fira text-[#1A2B49]">${esc(l.lieu || "—")}</p>
        </div>
        <div class="bg-gray-50 px-4 py-3 rounded-[15px]">
          <p class="font-fira uppercase text-xs text-gray-400">Date intervention</p>
          <p class="font-fira text-[#1A2B49]">${l.date_intervention ? new Date(l.date_intervention).toLocaleDateString("fr-FR") : "—"}</p>
        </div>
      </div>
      <div class="bg-orange-50 border border-orange-200 rounded-[20px] p-4 mb-4">
        <p class="font-fira uppercase text-xs text-orange-400 mb-1">Motif</p>
        <p class="text-gray-600">${esc(l.motif)}</p>
      </div>
      ${
        l.statut !== "ferme"
          ? `
      <button onclick="ouvrirConversation(${l.id_litige})"
        class="w-full py-3 bg-[#1A2B49] text-white rounded-full font-fira uppercase hover:bg-[#7CABD3] transition-all">
        <iconify-icon icon="mdi:message-text" class="mr-2"></iconify-icon> Voir la conversation
      </button>`
          : `
      <div class="bg-gray-50 rounded-[20px] p-4 text-center">
        <p class="text-gray-400 font-fira text-sm">Litige ferme${l.date_fermeture ? " le " + new Date(l.date_fermeture).toLocaleDateString("fr-FR") : ""}</p>
      </div>`
      }
    </div>
  </div>`;
}

function toggleAccordeon(idLitige) {
  const content = document.getElementById(`accordeon-${idLitige}`);
  const chevron = document.getElementById(`chevron-${idLitige}`);
  const isOpen = !content.classList.contains("hidden");
  content.classList.toggle("hidden", isOpen);
  chevron.style.transform = isOpen ? "" : "rotate(180deg)";
}

async function ouvrirConversation(idLitige) {
  litigeOuvert = idLitige;
  document.getElementById("modalConvTitre").textContent = "Litige #" + idLitige;
  document.getElementById("modalConvMessages").innerHTML =
    `<p class="text-gray-400 italic text-center py-4">Chargement...</p>`;
  document.getElementById("modalConversation").classList.remove("hidden");
  await chargerMessages(idLitige);
}

function fermerConversation() {
  document.getElementById("modalConversation").classList.add("hidden");
  litigeOuvert = null;
}

async function chargerMessages(idLitige) {
  const container = document.getElementById("modalConvMessages");
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
        const isMe = m.id_user === userId;
        const roleLabel =
          m.role === "admin"
            ? "Admin Silver Happy"
            : m.role === "pro"
              ? "Prestataire"
              : "Vous";
        return `
      <div class="flex ${isMe ? "justify-end" : "justify-start"} mb-3">
        <div class="max-w-xs">
          <p class="text-xs text-gray-400 mb-1 ${isMe ? "text-right" : ""}">${esc(m.prenom_user)} ${esc(m.nom_user)} (${roleLabel})</p>
          <div class="px-4 py-3 rounded-[20px] ${isMe ? "bg-[#1A2B49] text-white" : "bg-gray-100 text-gray-700"}">
            <p class="text-sm">${esc(m.message)}</p>
          </div>
        </div>
      </div>`;
      })
      .join("");
    container.scrollTop = container.scrollHeight;
  } catch {
    container.innerHTML = `<p class="text-red-400 text-center">Erreur de chargement.</p>`;
  }
}

async function envoyerMessage() {
  const input = document.getElementById("modalConvInput");
  const message = input.value.trim();
  if (!message || !litigeOuvert) return;
  try {
    await fetch(`${API_BASE}/admin/litiges/messages/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_litige: litigeOuvert,
        id_user: userId,
        message,
      }),
    });
    input.value = "";
    await chargerMessages(litigeOuvert);
  } catch {
    showToast("Erreur envoi message.", "error");
  }
}

function showToast(message, type = "info") {
  const toast = document.getElementById("toast");
  document.getElementById("toastMsg").textContent = message;
  document.getElementById("toastIcon").textContent =
    type === "success" ? "V" : type === "error" ? "X" : "i";
  toast.classList.remove("-translate-y-20", "opacity-0");
  toast.classList.add("translate-y-0", "opacity-100");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => {
    toast.classList.remove("translate-y-0", "opacity-100");
    toast.classList.add("-translate-y-20", "opacity-0");
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
