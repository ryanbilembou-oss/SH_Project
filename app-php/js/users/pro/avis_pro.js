const API_BASE = "http://172.16.90.10:8082";
const userId = Number(localStorage.getItem("id_user"));
const role = localStorage.getItem("role");

if (!userId || role !== "pro") {
  window.location.href = "/users/login.php";
}

(async () => {
  await loadAvis();
})();

async function loadAvis() {
  const container = document.getElementById("avisList");
  try {
    const resInter = await fetch(`${API_BASE}/admin/intervention/get`);
    const allInter = await resInter.json();
    const idsInter = Array.isArray(allInter)
      ? allInter.filter((i) => i.id_pro === userId).map((i) => i.id)
      : [];

    const resAvis = await fetch(`${API_BASE}/admin/note_avis/get`);
    const allAvis = await resAvis.json();
    const avisPro = Array.isArray(allAvis)
      ? allAvis
          .filter((a) => idsInter.includes(a.id_intervention))
          .sort(
            (a, b) =>
              new Date(b.date_publication) - new Date(a.date_publication),
          )
      : [];

    if (avisPro.length) {
      const moy =
        avisPro.reduce((s, a) => s + (a.note || 0), 0) / avisPro.length;
      const n = Math.round(moy);
      document.getElementById("noteMoyenne").textContent = moy.toFixed(1);
      document.getElementById("etoilesMoyenne").textContent =
        "★".repeat(n) + "☆".repeat(5 - n);
      document.getElementById("nbAvis").textContent = `${avisPro.length} avis`;
    } else {
      document.getElementById("noteMoyenne").textContent = "—";
      document.getElementById("nbAvis").textContent = "0 avis";
    }

    if (!avisPro.length) {
      container.innerHTML = `
        <div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-gray-200 text-center col-span-2">
          <iconify-icon icon="mdi:star-off" class="text-5xl text-gray-300 mb-3 block"></iconify-icon>
          <p class="text-gray-400 italic text-lg">Aucun avis reçu pour le moment.</p>
        </div>`;
      return;
    }

    container.innerHTML = avisPro
      .map((a) => {
        const date = a.date_publication
          ? new Date(a.date_publication).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          : "—";
        const note = a.note || 0;
        const etoiles = "★".repeat(note) + "☆".repeat(5 - note);

        const couleur =
          note >= 4
            ? "border-[#FCE297] bg-white"
            : note === 3
              ? "border-gray-200 bg-white"
              : "border-red-200 bg-red-50";

        return `
      <div class="p-8 rounded-[40px] border-2 ${couleur} hover:shadow-xl transition-all duration-300">
        <div class="flex items-center justify-between mb-4">
          <span class="text-[#FCE297] text-3xl font-fira tracking-wider">${etoiles}</span>
          <span class="text-gray-300 text-sm font-fira uppercase tracking-widest">${date}</span>
        </div>
        ${
          a.commentaire
            ? `<p class="text-gray-500 italic text-base leading-relaxed">"${esc(a.commentaire)}"</p>`
            : `<p class="text-gray-300 italic text-base">Aucun commentaire.</p>`
        }
        <p class="text-gray-300 text-sm font-fira uppercase tracking-widest mt-4">
          Intervention #${a.id_intervention}
        </p>
      </div>`;
      })
      .join("");
  } catch (e) {
    container.innerHTML = `
      <div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-red-200 text-center col-span-2">
        <p class="text-gray-400 italic">Erreur de chargement.</p>
      </div>`;
    console.error(e);
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
