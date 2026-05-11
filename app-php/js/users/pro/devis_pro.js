const API_BASE = "http://172.16.90.10:8082";
const userId = Number(localStorage.getItem("id_user"));
const role = localStorage.getItem("role");

if (!userId || role !== "pro") {
  window.location.href = "/users/login.php";
}

(async () => {
  await Promise.all([loadDevis(), loadFactures()]);
})();

async function accepterDevis() {
  fermerModalAccepter();
  try {
    const res = await fetch(`${API_BASE}/admin/devis/update_statut`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_devis: selectedDevisId, statut: "accepte" }),
    });
    if (!res.ok) throw new Error();

    const resCheckout = await fetch(
      `${API_BASE}/admin/stripe/checkout/intervention`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_senior: userId,
          id_devis: selectedDevisId,
          id_intervention: devisSelectionnee.id_intervention,
          redirect_url: "http://172.16.90.10:8080/users/seniors/devis.php",
        }),
      },
    );

    const data = await resCheckout.json();
    if (data.url) window.location.href = data.url;
    else showToast("Erreur redirection paiement.", "error");
  } catch {
    showToast("Erreur.", "error");
  }
}
async function loadDevis() {
  const container = document.getElementById("section-devis");
  try {
    const res = await fetch(`${API_BASE}/admin/devis/get`);
    const all = await res.json();
    const mesDevis = Array.isArray(all)
      ? all.filter((d) => d.id_pro === userId)
      : [];

    if (!mesDevis.length) {
      container.innerHTML = `
        <div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-gray-200 text-center">
          <iconify-icon icon="mdi:file-document-outline" class="text-5xl text-gray-300 mb-3 block"></iconify-icon>
          <p class="text-gray-400 italic text-lg">Aucun devis pour le moment.</p>
        </div>`;
      return;
    }

    const statutLabels = {
      en_attente: {
        text: "En attente",
        color: "bg-yellow-100 text-yellow-700",
        icon: "mdi:clock-outline",
      },
      accepte: {
        text: "Accepté",
        color: "bg-emerald-100 text-emerald-700",
        icon: "mdi:check-circle",
      },
      refuse: {
        text: "Refusé",
        color: "bg-red-100 text-red-700",
        icon: "mdi:close-circle",
      },
      paye: {
        text: "Payé",
        color: "bg-blue-100 text-blue-700",
        icon: "mdi:credit-card-check",
      },
    };

    container.innerHTML = mesDevis
      .map((d) => {
        const statut = statutLabels[d.statut] || {
          text: d.statut,
          color: "bg-gray-100 text-gray-500",
          icon: "mdi:help-circle",
        };
        const dateValidite = d.date_validite
          ? new Date(d.date_validite).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          : "—";

        return `
      <div class="bg-white p-8 rounded-[40px] border-2 ${d.statut === "refuse" ? "opacity-60 border-gray-200" : "border-transparent hover:border-[#7CABD3] hover:shadow-xl"} transition-all duration-500">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h4 class="font-fira text-[#1A2B49] text-xl">${esc(d.nom_service || "Service")}</h4>
            <p class="text-gray-400 text-base mt-1">
              <iconify-icon icon="mdi:account" class="mr-1"></iconify-icon>
              Senior #${d.id_senior}
            </p>
          </div>
          <span class="text-sm font-fira px-4 py-2 rounded-full uppercase ${statut.color}">
            <iconify-icon icon="${statut.icon}" class="mr-1"></iconify-icon>
            ${statut.text}
          </span>
        </div>
        <div class="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p class="text-sm text-gray-400 font-fira uppercase">Montant HT</p>
            <p class="font-fira text-[#1A2B49] text-lg">${Number(d.montant_ht).toFixed(2)} €</p>
          </div>
          <div>
            <p class="text-sm text-gray-400 font-fira uppercase">Montant TTC</p>
            <p class="font-fira text-[#1A2B49] text-lg">${Number(d.montant_ttc).toFixed(2)} €</p>
          </div>
          <div>
            <p class="text-sm text-gray-400 font-fira uppercase">Commission SH</p>
            <p class="font-fira text-[#1A2B49] text-lg">${d.taux_commission} %</p>
          </div>
          <div>
            <p class="text-sm text-gray-400 font-fira uppercase">Validité</p>
            <p class="font-fira text-[#1A2B49] text-lg">${dateValidite}</p>
          </div>
        </div>
        ${
          d.statut === "paye"
            ? `
        <div class="mt-4 p-4 bg-emerald-50 rounded-[20px] border border-emerald-200">
          <p class="font-fira text-emerald-700 text-sm">
            <iconify-icon icon="mdi:check-circle" class="mr-1"></iconify-icon>
            Paiement reçu — vous percevrez ${(Number(d.montant_ht) * (1 - d.taux_commission / 100)).toFixed(2)} € après commission SH
          </p>
        </div>`
            : ""
        }
      </div>`;
      })
      .join("");
  } catch {
    container.innerHTML = `<p class="text-red-400 text-center italic">Erreur de chargement.</p>`;
  }
}

async function loadFactures() {
  const container = document.getElementById("section-factures");
  try {
    const res = await fetch(`${API_BASE}/admin/facture/get`);
    const all = await res.json();
    const mesFactures = Array.isArray(all)
      ? all.filter((f) => f.id_emetteur === userId)
      : [];

    if (!mesFactures.length) {
      container.innerHTML = `
        <div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-gray-200 text-center">
          <iconify-icon icon="mdi:receipt" class="text-5xl text-gray-300 mb-3 block"></iconify-icon>
          <p class="text-gray-400 italic text-lg">Aucune facture pour le moment.</p>
        </div>`;
      return;
    }

    container.innerHTML = mesFactures
      .map((f) => renderFactureDetaille(f, "pro"))
      .join("");
  } catch {
    container.innerHTML = `<p class="text-red-400 text-center italic">Erreur de chargement.</p>`;
  }
}

function showTab(tab) {
  document
    .getElementById("section-devis")
    .classList.toggle("hidden", tab !== "devis");
  document
    .getElementById("section-factures")
    .classList.toggle("hidden", tab !== "factures");
  document.getElementById("tab-devis").className =
    `px-8 py-3 rounded-full font-fira uppercase text-sm transition-all ${tab === "devis" ? "bg-[#1A2B49] text-white" : "bg-white border-2 border-[#7CABD3] text-[#7CABD3]"}`;
  document.getElementById("tab-factures").className =
    `px-8 py-3 rounded-full font-fira uppercase text-sm transition-all ${tab === "factures" ? "bg-[#1A2B49] text-white" : "bg-white border-2 border-[#7CABD3] text-[#7CABD3]"}`;
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
