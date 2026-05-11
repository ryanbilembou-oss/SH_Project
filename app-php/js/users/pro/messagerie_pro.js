const API_BASE = "http://144.76.74.130:8082";
const userId = Number(localStorage.getItem("id_user"));
const role = localStorage.getItem("role");

if (!userId || role !== "pro") window.location.href = "/users/login.php";

let destinataireActuel = null;
let allMessages = [];
let intervalActualise = null;

(async () => {
  await loadConversations();
})();

async function loadConversations() {
  const container = document.getElementById("listeConversations");
  try {
    const [resMsgs, resInter, resSeniors, resUsers] = await Promise.all([
      fetch(`${API_BASE}/admin/messagerie/get`),
      fetch(`${API_BASE}/admin/intervention/get`),
      fetch(`${API_BASE}/admin/profile_senior/get_with_users`),
      fetch(`${API_BASE}/admin/users`),
    ]);

    allMessages = await resMsgs.json();
    const inter = await resInter.json();
    const seniors = await resSeniors.json();
    const allUsers = await resUsers.json();

    if (!Array.isArray(allMessages)) allMessages = [];

    const supportUser = Array.isArray(allUsers)
      ? allUsers.find((u) => u.email === "support@silverhappy.fr")
      : null;
    const SUPPORT_ID = supportUser?.id_user;

    const mesMsgs = allMessages.filter(
      (m) => m.id_expediteur === userId || m.id_destinataire === userId,
    );

    const nbNonLusSup = SUPPORT_ID
      ? mesMsgs.filter(
          (m) =>
            m.id_expediteur === SUPPORT_ID &&
            m.id_destinataire === userId &&
            !m.lu,
        ).length
      : 0;

    const supportHtml = SUPPORT_ID
      ? `
    <div class="mb-4">
      <p class="font-fira uppercase text-xs tracking-widest text-gray-400 mb-2 px-1">Support</p>
      <div onclick="ouvrirConversation(${SUPPORT_ID}, 'Support Silver Happy')"
        class="cursor-pointer p-3 rounded-[20px] flex items-center gap-3 hover:bg-[#FCE297]/10 transition-all mb-1
               ${destinataireActuel === SUPPORT_ID ? "bg-[#FCE297]/20 border-2 border-[#FCE297]" : "border-2 border-transparent"}">
        <div class="w-10 h-10 bg-[#FCE297]/20 rounded-full flex items-center justify-center flex-shrink-0">
          <iconify-icon icon="mdi:shield-account" class="text-xl text-[#1A2B49]"></iconify-icon>
        </div>
        <div class="flex-1 min-w-0">
          <p class="font-fira text-[#1A2B49] text-sm font-bold">Support Silver Happy</p>
          <p class="text-xs text-[#7CABD3]">Disponible pour vos questions</p>
        </div>
        ${nbNonLusSup > 0 ? `<span class="w-5 h-5 bg-[#FCE297] text-[#1A2B49] text-xs rounded-full flex items-center justify-center font-fira font-bold flex-shrink-0">${nbNonLusSup}</span>` : ""}
      </div>
      <p class="font-fira uppercase text-xs tracking-widest text-gray-400 mb-2 px-1 mt-4">Clients</p>
    </div>`
      : "";

    const idsSeniorsInter = [
      ...new Set(
        Array.isArray(inter)
          ? inter.filter((i) => i.id_pro === userId).map((i) => i.id_senior)
          : [],
      ),
    ];
    const idsSeniorsMsg = [
      ...new Set(
        mesMsgs
          .map((m) =>
            m.id_expediteur === userId ? m.id_destinataire : m.id_expediteur,
          )
          .filter((id) => id !== SUPPORT_ID),
      ),
    ];
    const idsUnion = [...new Set([...idsSeniorsInter, ...idsSeniorsMsg])];

    const seniorsFiltres = Array.isArray(seniors)
      ? seniors.filter((s) => idsUnion.includes(s.id_user))
      : [];

    const seniorsHtml = seniorsFiltres.length
      ? seniorsFiltres
          .map((s) => {
            const nbNonLus = mesMsgs.filter(
              (m) =>
                m.id_expediteur === s.id_user &&
                m.id_destinataire === userId &&
                !m.lu,
            ).length;

            return `
      <div onclick="ouvrirConversation(${s.id_user}, '${esc(s.prenom || "")} ${esc(s.nom || "")}')"
        class="cursor-pointer p-3 rounded-[20px] flex items-center gap-3 hover:bg-[#FCE297]/10 transition-all mb-1
               ${destinataireActuel === s.id_user ? "bg-[#FCE297]/20 border-2 border-[#FCE297]" : "border-2 border-transparent"}">
        <div class="w-10 h-10 bg-[#FCE297]/20 rounded-full flex items-center justify-center flex-shrink-0">
          <iconify-icon icon="mdi:account" class="text-xl text-[#1A2B49]"></iconify-icon>
        </div>
        <div class="flex-1 min-w-0">
          <p class="font-fira text-[#1A2B49] text-sm">${esc(s.prenom || "")} ${esc(s.nom || "")}</p>
          <p class="text-xs text-gray-400">Senior</p>
        </div>
        ${nbNonLus > 0 ? `<span class="w-5 h-5 bg-[#7CABD3] text-white text-xs rounded-full flex items-center justify-center font-fira">${nbNonLus}</span>` : ""}
      </div>`;
          })
          .join("")
      : `<p class="text-gray-400 italic text-sm px-2">Aucun client pour le moment.</p>`;

    container.innerHTML = `${supportHtml}${seniorsHtml}`;
  } catch (e) {
    container.innerHTML = `<p class="text-red-400 italic text-sm px-2">Erreur de chargement.</p>`;
  }
}

async function ouvrirConversation(idSenior, nom) {
  destinataireActuel = idSenior;

  document.getElementById("convNom").textContent = nom;
  document.getElementById("convRole").textContent = "Client Senior";
  document.getElementById("zoneEnvoi").classList.remove("hidden");

  await chargerMessages();
  await loadConversations();

  if (intervalActualise) clearInterval(intervalActualise);
  intervalActualise = setInterval(chargerMessages, 5000);
}

async function chargerMessages() {
  const container = document.getElementById("messagesContainer");
  try {
    const res = await fetch(`${API_BASE}/admin/messagerie/get`);
    allMessages = await res.json();
    if (!Array.isArray(allMessages)) allMessages = [];

    const conv = allMessages
      .filter(
        (m) =>
          (m.id_expediteur === userId &&
            m.id_destinataire === destinataireActuel) ||
          (m.id_expediteur === destinataireActuel &&
            m.id_destinataire === userId),
      )
      .sort((a, b) => new Date(a.date_envoi) - new Date(b.date_envoi));

    if (!conv.length) {
      container.innerHTML = `
        <div class="flex items-center justify-center h-full">
          <div class="text-center text-gray-300">
            <iconify-icon icon="mdi:chat-plus-outline" class="text-5xl mb-2 block"></iconify-icon>
            <p class="font-fira text-sm uppercase tracking-widest">Démarrez la conversation</p>
          </div>
        </div>`;
      return;
    }

    container.innerHTML = conv
      .map((m) => {
        const isMoi = m.id_expediteur === userId;
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
      <div class="flex ${isMoi ? "justify-end" : "justify-start"}">
        <div class="max-w-[75%]">
          <div class="px-5 py-3 rounded-[20px] ${
            isMoi
              ? "bg-[#1A2B49] text-white rounded-br-sm"
              : "bg-gray-100 text-[#1A2B49] rounded-bl-sm"
          }">
            <p class="text-base leading-relaxed">${esc(m.contenu)}</p>
          </div>
          <p class="text-xs text-gray-300 mt-1 ${isMoi ? "text-right" : "text-left"} font-fira">${date} ${heure}</p>
        </div>
      </div>`;
      })
      .join("");

    container.scrollTop = container.scrollHeight;
    marquerLus(
      conv.filter((m) => m.id_expediteur === destinataireActuel && !m.lu),
    );
  } catch (e) {
    console.error(e);
  }
}

async function envoyerMessage() {
  const input = document.getElementById("inputMessage");
  const contenu = input.value.trim();
  if (!contenu || !destinataireActuel) return;

  input.value = "";

  try {
    const res = await fetch(`${API_BASE}/admin/messagerie/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_expediteur: userId,
        id_destinataire: destinataireActuel,
        contenu,
        id_objet_lie: 0,
      }),
    });
    if (!res.ok) throw new Error();
    await chargerMessages();
  } catch {
    showToast("Erreur lors de l'envoi.", "error");
  }
}

async function marquerLus(msgs) {
  await Promise.all(
    msgs.map((m) =>
      fetch(`${API_BASE}/admin/messagerie/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: m.id, contenu: m.contenu, lu: true }),
      }),
    ),
  );
}

function showToast(message, type = "info") {
  const toast = document.getElementById("toast");
  document.getElementById("toastMsg").textContent = message;
  document.getElementById("toastIcon").textContent =
    type === "success" ? "✓" : type === "error" ? "✗" : "i";
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
