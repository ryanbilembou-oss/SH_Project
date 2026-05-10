async function loadVirements() {
  const container = document.getElementById("virementsList");
  try {
    const res = await fetch(
      `${API_BASE}/admin/virement/get_by_pro?id_pro=${userId}`,
    );
    const virements = await res.json();

    if (!Array.isArray(virements) || !virements.length) {
      container.innerHTML = `
        <div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-gray-200 text-center">
          <iconify-icon icon="mdi:bank-off" class="text-4xl text-gray-300 mb-3 block"></iconify-icon>
          <p class="text-gray-400 italic">Aucun virement pour le moment.</p>
        </div>`;
      return;
    }

    const total = virements.reduce((acc, v) => acc + Number(v.montant), 0);

    container.innerHTML = `
      <div class="bg-[#1A2B49] text-white px-8 py-5 rounded-[30px] mb-6 flex justify-between items-center">
        <p class="font-fira uppercase text-sm tracking-widest opacity-70">Total recu</p>
        <p class="font-fira text-3xl">${total.toFixed(2)} EUR</p>
      </div>
      ${virements
        .map((v) => {
          const date = v.date_virement
            ? new Date(v.date_virement).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            : new Date(v.date_creation).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });

          return `
        <div class="bg-white p-6 rounded-[30px] border-2 border-transparent hover:border-[#7CABD3] transition-all flex items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center flex-shrink-0">
              <iconify-icon icon="mdi:bank-transfer" class="text-2xl text-emerald-500"></iconify-icon>
            </div>
            <div>
              <p class="font-fira text-[#1A2B49] text-lg">${esc(v.nom_service || "Prestation")}</p>
              <p class="text-gray-400 text-sm">
                ${v.prenom_senior ? esc(v.prenom_senior) + " " + esc(v.nom_senior) : ""}
                ${date ? " — " + date : ""}
              </p>
            </div>
          </div>
          <div class="text-right flex-shrink-0">
            <p class="font-fira text-emerald-600 text-2xl">+${Number(v.montant).toFixed(2)} EUR</p>
            <span class="text-xs font-fira px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 uppercase">Effectue</span>
          </div>
        </div>`;
        })
        .join("")}`;
  } catch {
    container.innerHTML = `<p class="text-red-400 text-center italic">Erreur de chargement.</p>`;
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
