const API_BASE = "http://144.76.74.130:8082";
const adminId = Number(localStorage.getItem("id_user"));

let toutesConversations = [];
let signalementConv = null;
let supportId = null;
let convOuverte = null;
let intervalActualise = null;

(async () => {
  await loadSupervision();
  initSearch();
})();

async function loadSupervision() {
  try {
    const [resMsgs, resUsers] = await Promise.all([
      fetch(`${API_BASE}/admin/messagerie/get`),
      fetch(`${API_BASE}/admin/users`),
    ]);

    const messages = await resMsgs.json();
    const users = await resUsers.json();

    if (!Array.isArray(messages) || !Array.isArray(users)) return;

    const userMap = {};
    users.forEach((u) => (userMap[u.id_user] = u));

    const supportUser = users.find((u) => u.email === "support@silverhappy.fr");
    supportId = supportUser?.id_user;

    document.getElementById("statTotalMessages").textContent = messages.length;

    const convMap = {};
    messages.forEach((m) => {
      const key = [
        Math.min(m.id_expediteur, m.id_destinataire),
        Math.max(m.id_expediteur, m.id_destinataire),
      ].join("-");
      if (!convMap[key]) {
        convMap[key] = {
          userA: m.id_expediteur,
          userB: m.id_destinataire,
          count: 0,
          nonLus: 0,
          dernierMessage: null,
          estSupport:
            m.id_expediteur === supportId || m.id_destinataire === supportId,
        };
      }
      convMap[key].count++;
      if (!m.lu) convMap[key].nonLus++;
      const d = new Date(m.date_envoi);
      if (
        !convMap[key].dernierMessage ||
        d > new Date(convMap[key].dernierMessage)
      ) {
        convMap[key].dernierMessage = m.date_envoi;
      }
    });

    toutesConversations = Object.values(convMap)
      .map((c) => ({
        ...c,
        userAData: userMap[c.userA],
        userBData: userMap[c.userB],
      }))
      .sort((a, b) => {
        if (a.estSupport && !b.estSupport) return -1;
        if (!a.estSupport && b.estSupport) return 1;
        return new Date(b.dernierMessage) - new Date(a.dernierMessage);
      });

    document.getElementById("statConversations").textContent =
      toutesConversations.length;
    const nbSupport = toutesConversations.filter((c) => c.estSupport).length;
    document.getElementById("statSignalements").textContent = nbSupport;

    renderConversations(toutesConversations);
  } catch (e) {
    console.error(e);
    document.getElementById("convTableBody").innerHTML =
      `<tr><td colspan="9" class="py-10 text-center text-red-500 text-sm">Erreur de chargement.</td></tr>`;
  }
}

function renderConversations(convs) {
  const tbody = document.getElementById("convTableBody");

  if (!convs.length) {
    tbody.innerHTML = `<tr><td colspan="9" class="py-20 text-center text-gray-400 italic text-sm">Aucune conversation.</td></tr>`;
    return;
  }

  tbody.innerHTML = convs
    .map((c) => {
      const nomA = c.userAData ? c.userAData.email : `#${c.userA}`;
      const nomB = c.userBData ? c.userBData.email : `#${c.userB}`;
      const roleA = c.userAData?.role || "—";
      const roleB = c.userBData?.role || "—";
      const date = c.dernierMessage
        ? new Date(c.dernierMessage).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "—";

      const roleBadge = (role) => {
        const map = {
          senior: "bg-blue-100 text-blue-700",
          pro: "bg-green-100 text-green-700",
          admin: "bg-red-100 text-red-700",
        };
        return `<span class="text-xs px-2 py-0.5 rounded-full font-bold ${map[role] || "bg-gray-100 text-gray-500"}">${role}</span>`;
      };

      const estSupport = c.estSupport;
      const autreUser = c.userA === supportId ? c.userB : c.userA;
      const autreUserData = c.userA === supportId ? c.userBData : c.userAData;

      return `
    <tr class="border-b border-gray-100 hover:bg-blue-50/30 transition-colors ${estSupport ? "bg-yellow-50/30" : ""}">
      <td class="py-3 px-4 text-sm text-gray-700 font-medium">
        ${estSupport ? '<span class="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-bold mr-1">Support</span>' : ""}
        ${esc(nomA)}
      </td>
      <td class="py-3 px-4">${roleBadge(roleA)}</td>
      <td class="py-3 px-4 text-sm text-gray-700 font-medium">${esc(nomB)}</td>
      <td class="py-3 px-4">${roleBadge(roleB)}</td>
      <td class="py-3 px-4 text-center text-sm font-semibold text-gray-700">${c.count}</td>
      <td class="py-3 px-4 text-center">
        ${
          c.nonLus > 0
            ? `<span class="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full font-bold">${c.nonLus}</span>`
            : `<span class="text-gray-300 text-xs">0</span>`
        }
      </td>
      <td class="py-3 px-4 text-center text-sm text-gray-500">${date}</td>
      <td class="py-3 px-4 text-center">
        <div class="flex items-center justify-center gap-2">
          ${
            estSupport
              ? `
          <button onclick="ouvrirConversationSupport(${autreUser})"
            class="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 hover:bg-blue-600 transition-colors group"
            title="Repondre">
            <i class="fas fa-reply text-blue-500 group-hover:text-white text-sm"></i>
          </button>`
              : ""
          }
          <button onclick="ouvrirModalSignalement(${c.userA}, ${c.userB})"
            class="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 hover:bg-red-600 transition-colors group"
            title="Signaler">
            <i class="fas fa-flag text-red-400 group-hover:text-white text-sm"></i>
          </button>
        </div>
      </td>
    </tr>`;
    })
    .join("");
}

async function ouvrirConversationSupport(idUser) {
  convOuverte = idUser;
  document.getElementById("modalConvTitre").textContent =
    "Conversation Support";
  document.getElementById("modalConvMessages").innerHTML =
    `<p class="text-gray-400 italic text-center py-4">Chargement...</p>`;
  document.getElementById("modalConv").classList.remove("hidden");
  document.getElementById("modalConv").classList.add("flex");
  await chargerMessagesSupport(idUser);

  if (intervalActualise) clearInterval(intervalActualise);
  intervalActualise = setInterval(() => chargerMessagesSupport(idUser), 5000);
}

function fermerConversationSupport() {
  document.getElementById("modalConv").classList.add("hidden");
  document.getElementById("modalConv").classList.remove("flex");
  convOuverte = null;
  if (intervalActualise) clearInterval(intervalActualise);
}

async function chargerMessagesSupport(idUser) {
  const container = document.getElementById("modalConvMessages");
  try {
    const res = await fetch(`${API_BASE}/admin/messagerie/get`);
    const messages = await res.json();

    const conv = messages
      .filter(
        (m) =>
          (m.id_expediteur === idUser && m.id_destinataire === supportId) ||
          (m.id_expediteur === supportId && m.id_destinataire === idUser) ||
          (m.id_expediteur === idUser && m.id_destinataire === adminId) ||
          (m.id_expediteur === adminId && m.id_destinataire === idUser),
      )
      .sort((a, b) => new Date(a.date_envoi) - new Date(b.date_envoi));

    if (!conv.length) {
      container.innerHTML = `<p class="text-gray-400 italic text-center py-4">Aucun message.</p>`;
      return;
    }

    const resUsers = await fetch(`${API_BASE}/admin/users`);
    const users = await resUsers.json();
    const userMap = {};
    users.forEach((u) => (userMap[u.id_user] = u));

    container.innerHTML = conv
      .map((m) => {
        const isAdmin =
          m.id_expediteur === adminId ||
          userMap[m.id_expediteur]?.role === "admin";
        const expediteur = userMap[m.id_expediteur];
        const nomExp = isAdmin
          ? `Support SH (${expediteur?.email || "Admin"})`
          : `${expediteur?.email || "Utilisateur"}`;
        const heure = m.date_envoi
          ? new Date(m.date_envoi).toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "";
        const date = m.date_envoi
          ? new Date(m.date_envoi).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "short",
            })
          : "";

        return `
      <div class="flex ${isAdmin ? "justify-end" : "justify-start"} mb-3">
        <div class="max-w-[75%]">
          <p class="text-xs text-gray-400 mb-1 ${isAdmin ? "text-right" : ""}">${esc(nomExp)}</p>
          <div class="px-4 py-3 rounded-[15px] ${isAdmin ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}">
            <p class="text-sm">${esc(m.contenu)}</p>
          </div>
          <p class="text-xs text-gray-300 mt-1 ${isAdmin ? "text-right" : ""}">${date} ${heure}</p>
        </div>
      </div>`;
      })
      .join("");

    container.scrollTop = container.scrollHeight;
  } catch (e) {
    container.innerHTML = `<p class="text-red-400 text-center">Erreur.</p>`;
  }
}

async function envoyerReponseSupport() {
  const input = document.getElementById("modalConvInput");
  const contenu = input.value.trim();
  if (!contenu || !convOuverte) return;

  input.value = "";
  try {
    await fetch(`${API_BASE}/admin/messagerie/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_expediteur: adminId,
        id_destinataire: convOuverte,
        contenu,
        id_objet_lie: 0,
      }),
    });
    await chargerMessagesSupport(convOuverte);
    await loadSupervision();
  } catch {
    alert("Erreur envoi.");
  }
}

function filtrerConversations() {
  const role = document.getElementById("filtreRole").value;
  const term = document.getElementById("searchInput").value.toLowerCase();

  let filtrees = toutesConversations;

  if (role !== "tous") {
    filtrees = filtrees.filter(
      (c) => c.userAData?.role === role || c.userBData?.role === role,
    );
  }

  if (term) {
    filtrees = filtrees.filter(
      (c) =>
        (c.userAData?.email || "").toLowerCase().includes(term) ||
        (c.userBData?.email || "").toLowerCase().includes(term),
    );
  }

  renderConversations(filtrees);
}

function initSearch() {
  document
    .getElementById("searchInput")
    .addEventListener("input", filtrerConversations);
  document
    .getElementById("filtreRole")
    .addEventListener("change", filtrerConversations);
}

function ouvrirModalSignalement(userA, userB) {
  signalementConv = { userA, userB };
  document.getElementById("signalementRaison").value = "";
  document.getElementById("modalSignalement").classList.remove("hidden");
  document.getElementById("modalSignalement").classList.add("flex");
}

function fermerModalSignalement() {
  document.getElementById("modalSignalement").classList.add("hidden");
  document.getElementById("modalSignalement").classList.remove("flex");
  signalementConv = null;
}

function confirmerSignalement() {
  const raison = document.getElementById("signalementRaison").value.trim();
  if (!raison) {
    alert("Indiquez une raison.");
    return;
  }
  fermerModalSignalement();
  alert(
    "Signalement enregistre. L'equipe de moderation va examiner cette conversation.",
  );
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
