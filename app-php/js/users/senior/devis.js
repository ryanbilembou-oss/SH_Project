const API_BASE = "http://144.76.74.130:8082";
const userId = Number(localStorage.getItem("id_user"));
const role = localStorage.getItem("role");

if (!userId || role !== "senior") window.location.href = "/users/login.php";

let selectedDevisId = null;
let selectedDevis = null;
let mesDevis = [];

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("success") === "1") {
  setTimeout(
    () =>
      showToast(
        "Paiement reussi ! Votre intervention est confirmee.",
        "success",
      ),
    500,
  );
  window.history.replaceState({}, "", window.location.pathname);
} else if (urlParams.get("cancelled") === "1") {
  setTimeout(() => showToast("Paiement annule.", "error"), 500);
  window.history.replaceState({}, "", window.location.pathname);
}

(async () => {
  await Promise.all([loadDevis(), loadFactures()]);
})();

async function loadDevis() {
  const container = document.getElementById("section-devis");
  try {
    const res = await fetch(
      `${API_BASE}/admin/devis/get_by_senior?id=${userId}`,
    );
    mesDevis = await res.json();
    if (!Array.isArray(mesDevis)) mesDevis = [];

    await annulerDevisExpires();

    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
    const filteredDevis = mesDevis.filter(
      (d) => new Date(d.date_validite) >= twoMonthsAgo,
    );

    if (!filteredDevis.length) {
      container.innerHTML = `
        <div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-gray-200 text-center">
          <iconify-icon icon="mdi:file-document-outline" class="text-5xl text-gray-300 mb-3 block"></iconify-icon>
          <p class="text-gray-400 italic text-lg">Aucun devis recent (moins de 2 mois).</p>
          <p class="text-sm text-gray-400 mt-2">Retrouvez vos anciens devis dans vos archives.</p>
        </div>`;
      return;
    }

    renderDevis(filteredDevis);
  } catch {
    container.innerHTML = `<p class="text-red-400 italic text-center">Erreur de chargement.</p>`;
  }
}

async function annulerDevisExpires() {
  const now = new Date();
  const expiresNonPayes = mesDevis.filter(
    (d) =>
      d.statut === "accepte" &&
      d.date_validite &&
      new Date(d.date_validite) < now,
  );

  if (!expiresNonPayes.length) return;

  await Promise.all(
    expiresNonPayes.map(async (d) => {
      await fetch(`${API_BASE}/admin/devis/update_statut`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_devis: d.id_devis, statut: "annule" }),
      });

      if (d.id_intervention) {
        try {
          const resInter = await fetch(
            `${API_BASE}/admin/intervention/get?id=${d.id_intervention}`,
          );
          const inter = await resInter.json();
          if (
            inter &&
            inter.statut !== "terminee" &&
            inter.statut !== "annulee"
          ) {
            await fetch(`${API_BASE}/admin/intervention/update`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id: inter.id,
                id_pro: inter.id_pro,
                id_senior: inter.id_senior,
                id_service: inter.id_service,
                bio_intervention: inter.bio_intervention,
                date_heure_debut: inter.date_heure_debut,
                date_heure_fin: inter.date_heure_fin,
                lieu: inter.lieu,
                statut: "annulee",
                commission_montant: inter.commission_montant,
                prix: inter.prix,
                est_medical: inter.est_medical,
              }),
            });
          }
        } catch {}
      }
    }),
  );

  const res2 = await fetch(
    `${API_BASE}/admin/devis/get_by_senior?id=${userId}`,
  );
  mesDevis = await res2.json();
  if (!Array.isArray(mesDevis)) mesDevis = [];
}

async function loadFactures() {
  const container = document.getElementById("section-factures");
  try {
    const res = await fetch(`${API_BASE}/admin/facture/get`);
    const all = await res.json();

    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

    const mesFactures = Array.isArray(all)
      ? all.filter(
          (f) =>
            f.id_recepteur === userId &&
            new Date(f.date_creation) >= twoMonthsAgo,
        )
      : [];

    if (!mesFactures.length) {
      container.innerHTML = `
        <div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-gray-200 text-center">
          <iconify-icon icon="mdi:receipt" class="text-5xl text-gray-300 mb-3 block"></iconify-icon>
          <p class="text-gray-400 italic text-lg">Aucune facture recente (moins de 2 mois).</p>
          <p class="text-sm text-gray-400 mt-2">Retrouvez vos anciennes factures dans vos archives.</p>
        </div>`;
      return;
    }

    container.innerHTML = mesFactures
      .map((f) => renderFactureDetaille(f, "senior"))
      .join("");
  } catch {
    console.error("Erreur factures");
  }
}

function renderDevis(liste) {
  const container = document.getElementById("section-devis");
  const devisToShow = liste || mesDevis;

  const statutLabels = {
    en_attente: {
      text: "En attente",
      color: "bg-yellow-100 text-yellow-700",
      icon: "mdi:clock-outline",
    },
    accepte: {
      text: "Accepte",
      color: "bg-emerald-100 text-emerald-700",
      icon: "mdi:check-circle",
    },
    refuse: {
      text: "Refuse",
      color: "bg-red-100 text-red-700",
      icon: "mdi:close-circle",
    },
    annule: {
      text: "Annule",
      color: "bg-gray-100 text-gray-500",
      icon: "mdi:cancel",
    },
    paye: {
      text: "Paye",
      color: "bg-blue-100 text-blue-700",
      icon: "mdi:credit-card-check",
    },
  };

  container.innerHTML = devisToShow
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
      const dateExpire =
        d.date_validite && new Date(d.date_validite) < new Date();
      const isTermine = ["refuse", "annule"].includes(d.statut);

      let actions = "";
      if (d.statut === "en_attente") {
        actions = `
      <div class="flex gap-3 mt-6">
        <button onclick="ouvrirModalAccepter(${d.id_devis})"
          class="flex-1 py-3 bg-[#7CABD3] text-white rounded-full font-fira text-sm uppercase hover:bg-[#1A2B49] transition-all">
          <iconify-icon icon="mdi:check" class="mr-1"></iconify-icon> Accepter & Payer
        </button>
        <button onclick="ouvrirModalRefuser(${d.id_devis})"
          class="flex-1 py-3 bg-red-100 text-red-600 rounded-full font-fira text-sm uppercase hover:bg-red-600 hover:text-white transition-all">
          <iconify-icon icon="mdi:close" class="mr-1"></iconify-icon> Refuser
        </button>
      </div>`;
      } else if (d.statut === "accepte" && d.id_intervention) {
        actions = `
      <div class="mt-6">
        <div class="bg-yellow-50 border-2 border-[#FCE297] rounded-[20px] p-3 mb-4">
          <p class="font-fira text-sm text-yellow-700">
            <iconify-icon icon="mdi:alert" class="mr-1"></iconify-icon>
            En attente de paiement — l'intervention n'aura pas lieu sans paiement.
          </p>
        </div>
        <button onclick="payerDevis(${d.id_devis})"
          class="w-full py-3 bg-[#FCE297] text-[#1A2B49] rounded-full font-fira text-sm uppercase hover:bg-[#1A2B49] hover:text-white transition-all">
          <iconify-icon icon="mdi:credit-card" class="mr-1"></iconify-icon> Payer maintenant
        </button>
      </div>`;
      } else if (d.statut === "paye") {
        actions = `
      <div class="mt-6 space-y-3">
        <div class="bg-blue-50 border-2 border-blue-200 rounded-[20px] p-3">
          <p class="font-fira text-sm text-blue-700">
            <iconify-icon icon="mdi:check-circle" class="mr-1"></iconify-icon>
            Paiement confirme — votre intervention est planifiee.
          </p>
        </div>
        ${
          d.id_intervention
            ? `
        <button onclick="annulerEtRembourser(${d.id_intervention})"
          class="w-full py-3 bg-red-50 text-red-500 rounded-full font-fira text-sm uppercase hover:bg-red-500 hover:text-white transition-all">
          <iconify-icon icon="mdi:close-circle" class="mr-1"></iconify-icon> Annuler et se faire rembourser
        </button>`
            : ""
        }
      </div>`;
      } else if (d.statut === "annule") {
        actions = `
      <div class="mt-6 bg-gray-50 border-2 border-gray-200 rounded-[20px] p-3">
        <p class="font-fira text-sm text-gray-500">
          <iconify-icon icon="mdi:cancel" class="mr-1"></iconify-icon>
          Devis annule — delai de paiement depasse.
        </p>
      </div>`;
      }

      return `
    <div class="bg-white p-8 rounded-[40px] border-2 ${isTermine ? "opacity-60 border-gray-200" : "border-transparent hover:border-[#7CABD3] hover:shadow-xl"} transition-all duration-500">
      <div class="flex justify-between items-start mb-4">
        <div>
          <h4 class="font-fira text-[#1A2B49] text-xl">${esc(d.nom_service || "Service")}</h4>
          <p class="text-gray-400 text-base mt-1">
            <iconify-icon icon="mdi:account" class="mr-1"></iconify-icon>
            ${esc(d.prenom_pro || "")} ${esc(d.nom_pro || "—")}
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
          <p class="font-fira text-[#1A2B49] text-lg">${Number(d.montant_ht).toFixed(2)} EUR</p>
        </div>
        <div>
          <p class="text-sm text-gray-400 font-fira uppercase">Montant TTC</p>
          <p class="font-fira text-[#1A2B49] text-lg font-bold">${Number(d.montant_ttc).toFixed(2)} EUR</p>
        </div>
        <div>
          <p class="text-sm text-gray-400 font-fira uppercase">Commission</p>
          <p class="font-fira text-[#1A2B49] text-lg">${d.taux_commission} %</p>
        </div>
        <div>
          <p class="text-sm text-gray-400 font-fira uppercase">Date limite</p>
          <p class="font-fira ${dateExpire && !["paye", "annule", "refuse"].includes(d.statut) ? "text-red-400" : "text-[#1A2B49]"} text-lg">${dateValidite}</p>
        </div>
      </div>
      ${actions}
    </div>`;
    })
    .join("");
}

function ouvrirModalAccepter(idDevis) {
  selectedDevisId = idDevis;
  selectedDevis = mesDevis.find((d) => d.id_devis === idDevis);
  fetch(`${API_BASE}/admin/devis/getone?id=${idDevis}`)
    .then((r) => r.json())
    .then((d) => {
      document.getElementById("modalAccepterDetails").textContent =
        `${d.nom_service || "Service"} — ${d.prenom_pro || ""} ${d.nom_pro || ""}`;
      document.getElementById("modalAccepterPrix").textContent =
        d.montant_ttc + " EUR TTC";
      document.getElementById("modalAccepterHT").textContent =
        d.montant_ht + " EUR HT • Commission " + d.taux_commission + " %";
      const modal = document.getElementById("modalAccepter");
      modal.classList.remove("hidden");
      modal.classList.add("flex");
      setTimeout(() => modal.classList.remove("opacity-0"), 10);
    });
}

function fermerModalAccepter() {
  const modal = document.getElementById("modalAccepter");
  modal.classList.add("opacity-0");
  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }, 300);
}

function ouvrirModalRefuser(idDevis) {
  selectedDevisId = idDevis;
  const modal = document.getElementById("modalRefuser");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  setTimeout(() => modal.classList.remove("opacity-0"), 10);
}

function fermerModalRefuser() {
  const modal = document.getElementById("modalRefuser");
  modal.classList.add("opacity-0");
  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }, 300);
}

async function accepterDevis() {
  fermerModalAccepter();
  try {
    const res = await fetch(`${API_BASE}/admin/devis/update_statut`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_devis: selectedDevisId, statut: "accepte" }),
    });
    if (!res.ok) throw new Error();
    showToast("Devis accepte ! Redirection vers le paiement...", "success");
    await payerDevis(selectedDevisId);
  } catch {
    showToast("Erreur lors de l'acceptation.", "error");
  }
}

async function payerDevis(idDevis) {
  const devis = mesDevis.find((d) => d.id_devis === idDevis);
  if (!devis || !devis.id_intervention) {
    showToast("Intervention introuvable.", "error");
    return;
  }
  try {
    const res = await fetch(`${API_BASE}/admin/stripe/checkout/intervention`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_senior: userId,
        id_devis: idDevis,
        id_intervention: devis.id_intervention,
        redirect_url: "http://144.76.74.130:8888/users/seniors/devis.php",
      }),
    });
    if (!res.ok) {
      const err = await res.json();
      showToast(err.erreur || "Erreur paiement.", "error");
      return;
    }
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else showToast("Erreur redirection Stripe.", "error");
  } catch {
    showToast("Erreur reseau.", "error");
  }
}

async function refuserDevis() {
  fermerModalRefuser();
  try {
    const res = await fetch(`${API_BASE}/admin/devis/update_statut`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_devis: selectedDevisId, statut: "refuse" }),
    });
    if (!res.ok) throw new Error();
    showToast("Devis refuse.", "success");
    await loadDevis();
  } catch {
    showToast("Erreur lors du refus.", "error");
  }
}

async function annulerEtRembourser(idIntervention) {
  if (
    !confirm("Annuler cette intervention ? Vous serez rembourse integralement.")
  )
    return;
  try {
    const res = await fetch(`${API_BASE}/admin/stripe/refund/intervention`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_intervention: idIntervention,
        id_senior: userId,
      }),
    });
    if (res.ok) {
      showToast("Intervention annulee. Remboursement en cours.", "success");
      await loadDevis();
      await loadFactures();
    } else {
      const data = await res.json();
      showToast(data.erreur || "Erreur lors de l'annulation.", "error");
    }
  } catch {
    showToast("Erreur reseau.", "error");
  }
}

document
  .getElementById("btnConfirmerAccepter")
  .addEventListener("click", accepterDevis);
document
  .getElementById("btnConfirmerRefuser")
  .addEventListener("click", refuserDevis);

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
const a = 0;
