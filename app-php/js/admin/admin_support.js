const API_BASE = "http://localhost:8082";
const adminId = Number(localStorage.getItem("id_user"));

let supportId = null;
let convOuverte = null;
let tousContacts = [];
let intervalActualise = null;
let allMessages = [];

(async () => {
  await init();
})();

async function init() {
  try {
    const [resMsgs, resUsers] = await Promise.all([
      fetch(`${API_BASE}/admin/messagerie/get`),
      fetch(`${API_BASE}/admin/users`),
    ]);

    allMessages = await resMsgs.json();
    const users = await resUsers.json();

    if (!Array.isArray(allMessages) || !Array.isArray(users)) return;

    const supportUser = users.find((u) => u.email === "support@silverhappy.fr");
    supportId = supportUser?.id_user;
    if (!supportId) return;

    const userMap = {};
    users.forEach((u) => (userMap[u.id_user] = u));

    const msgSupport = allMessages.filter(
      (m) => m.id_expediteur === supportId || m.id_destinataire === supportId,
    );

    const idsContacts = [
      ...new Set(
        msgSupport.map((m) =>
          m.id_expediteur === supportId ? m.id_destinataire : m.id_expediteur,
        ),
      ),
    ].filter((id) => id !== supportId);

    tousContacts = idsContacts
      .map((id) => {
        const u = userMap[id];
        const msgs = msgSupport.filter(
          (m) => m.id_expediteur === id || m.id_destinataire === id,
        );
        const nonLus = msgs.filter(
          (m) => m.id_expediteur === id && !m.lu,
        ).length;
        const dernier = msgs.reduce((last, m) => {
          const d = new Date(m.date_envoi);
          return !last || d > last ? d : last;
        }, null);

        return { id, user: u, nonLus, dernierMessage: dernier };
      })
      .sort((a, b) => (b.dernierMessage || 0) - (a.dernierMessage || 0));

    renderListe(tousContacts);
  } catch (e) {
    console.error(e);
  }
}

function renderListe(contacts) {
  const container = document.getElementById("listeSupport");

  if (!contacts.length) {
    container.innerHTML = `<p class="text-gray-400 italic text-sm text-center py-4">Aucune conversation support.</p>`;
    return;
  }

  container.innerHTML = contacts
    .map((c) => {
      const nom = c.user ? `${c.user.email}` : `#${c.id}`;
      const role = c.user?.role || "—";
      const roleBadge =
        {
          senior: "bg-blue-100 text-blue-700",
          pro: "bg-green-100 text-green-700",
          admin: "bg-red-100 text-red-700",
        }[role] || "bg-gray-100 text-gray-500";

      const date = c.dernierMessage
        ? c.dernierMessage.toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "short",
          })
        : "";

      return `
    <div onclick="ouvrirConversation(${c.id})"
      class="cursor-pointer p-3 rounded-xl flex items-center gap-3 hover:bg-blue-50 transition-all mb-1
             ${convOuverte === c.id ? "bg-blue-50 border border-blue-200" : ""}">
      <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
        <i class="fas fa-user text-blue-500"></i>
      </div>
      <div class="flex-1 min-w-0">
        <p class="font-semibold text-gray-800 text-sm truncate">${esc(nom)}</p>
        <span class="text-xs px-2 py-0.5 rounded-full font-bold ${roleBadge}">${role}</span>
      </div>
      <div class="flex flex-col items-end gap-1 flex-shrink-0">
        <p class="text-xs text-gray-400">${date}</p>
        ${c.nonLus > 0 ? `<span class="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">${c.nonLus}</span>` : ""}
      </div>
    </div>`;
    })
    .join("");
}

function filtrerSupport(term) {
  if (!term.trim()) {
    renderListe(tousContacts);
    return;
  }
  const filtres = tousContacts.filter((c) =>
    (c.user?.email || "").toLowerCase().includes(term.toLowerCase()),
  );
  renderListe(filtres);
}

async function ouvrirConversation(idUser) {
  convOuverte = idUser;
  const contact = tousContacts.find((c) => c.id === idUser);
  const nom = contact?.user?.email || `#${idUser}`;
  const role = contact?.user?.role || "—";

  document.getElementById("convNom").textContent = nom;
  document.getElementById("convRole").textContent = role;
  document.getElementById("convHeader").classList.remove("hidden");
  document.getElementById("convVide").classList.add("hidden");
  document.getElementById("messagesContainer").classList.remove("hidden");
  document.getElementById("zoneEnvoi").classList.remove("hidden");

  renderListe(tousContacts);
  await chargerMessages(idUser);

  if (intervalActualise) clearInterval(intervalActualise);
  intervalActualise = setInterval(() => chargerMessages(idUser), 5000);
}

async function chargerMessages(idUser) {
  const container = document.getElementById("messagesContainer");
  try {
    const [resMsgs, resUsers] = await Promise.all([
      fetch(`${API_BASE}/admin/messagerie/get`),
      fetch(`${API_BASE}/admin/users`),
    ]);
    allMessages = await resMsgs.json();
    const users = await resUsers.json();
    const userMap = {};
    users.forEach((u) => (userMap[u.id_user] = u));

    const conv = allMessages
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

    container.innerHTML = conv
      .map((m) => {
        const isAdmin = userMap[m.id_expediteur]?.role === "admin";
        const expediteur = userMap[m.id_expediteur];
        const nomExp = isAdmin
          ? `Support SH (${expediteur?.email || "Admin"})`
          : esc(expediteur?.email || "Utilisateur");
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
      <div class="flex ${isAdmin ? "justify-end" : "justify-start"}">
        <div class="max-w-[70%]">
          <p class="text-xs text-gray-400 mb-1 ${isAdmin ? "text-right" : ""}">${nomExp}</p>
          <div class="px-4 py-3 rounded-2xl ${isAdmin ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-700"}">
            <p class="text-sm">${esc(m.contenu)}</p>
          </div>
          <p class="text-xs text-gray-300 mt-1 ${isAdmin ? "text-right" : ""}">${date} ${heure}</p>
        </div>
      </div>`;
      })
      .join("");

    container.scrollTop = container.scrollHeight;

    const aMarquer = conv.filter((m) => m.id_expediteur === idUser && !m.lu);
    await Promise.all(
      aMarquer.map((m) =>
        fetch(`${API_BASE}/admin/messagerie/update`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: m.id, contenu: m.contenu, lu: true }),
        }),
      ),
    );
  } catch (e) {
    console.error(e);
  }
}

async function envoyerReponse() {
  const input = document.getElementById("inputMessage");
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
    await chargerMessages(convOuverte);
    await init();
  } catch {
    alert("Erreur envoi.");
  }
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
