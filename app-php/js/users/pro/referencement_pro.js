const API_BASE = "http://144.76.74.130:8082";
const userId = Number(localStorage.getItem("id_user"));
const role = localStorage.getItem("role");

if (!userId || role !== "pro") window.location.href = "/users/login.php";

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("success") === "1") {
  setTimeout(
    () =>
      showToast(
        "Référencement activé ! Vous apparaissez maintenant en premier. ",
        "success",
      ),
    500,
  );
  window.history.replaceState({}, "", window.location.pathname);
} else if (urlParams.get("cancelled") === "1") {
  setTimeout(() => showToast("Paiement annulé.", "error"), 500);
  window.history.replaceState({}, "", window.location.pathname);
}

(async () => {
  await load();
})();

async function load() {
  try {
    const res = await fetch(
      `${API_BASE}/admin/referencement/get_by_pro?id=${userId}`,
    );
    const data = await res.json();
    renderStatut(data);
    renderHistorique(data);
  } catch {}
}

function renderStatut(data) {
  const container = document.getElementById("statutRef");
  const actif = Array.isArray(data) ? data.find((r) => r.actif) : null;

  if (actif) {
    const dateFin = new Date(actif.date_fin).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    container.innerHTML = `
      <div class="bg-green-50 border-2 border-green-300 rounded-[30px] p-6 flex items-center gap-5">
        <iconify-icon icon="mdi:star-circle" class="text-5xl text-[#FCE297] flex-shrink-0"></iconify-icon>
        <div>
          <p class="font-fira text-green-700 text-2xl"> Référencement actif</p>
          <p class="text-green-600 text-base">Formule ${actif.type} — expire le <strong>${dateFin}</strong></p>
          <p class="text-green-500 text-sm mt-1">Vous apparaissez en premier dans les résultats.</p>
        </div>
      </div>`;
  } else {
    container.innerHTML = `
      <div class="bg-gray-50 border-2 border-dashed border-gray-200 rounded-[30px] p-6 flex items-center gap-5">
        <iconify-icon icon="mdi:star-off" class="text-5xl text-gray-300 flex-shrink-0"></iconify-icon>
        <div>
          <p class="font-fira text-gray-500 text-2xl">Pas de référencement actif</p>
          <p class="text-gray-400 text-base">Choisissez une formule ci-dessous pour booster votre visibilité.</p>
        </div>
      </div>`;
  }
}

function renderHistorique(data) {
  const container = document.getElementById("historiqueRef");
  if (!Array.isArray(data) || !data.length) {
    container.innerHTML = `<p class="text-gray-400 italic text-sm">Aucun référencement pour le moment.</p>`;
    return;
  }

  container.innerHTML = data
    .map((r) => {
      const debut = new Date(r.date_debut).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      const fin = new Date(r.date_fin).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      return `
    <div class="flex items-center justify-between p-4 rounded-[15px] ${r.actif ? "bg-green-50 border border-green-200" : "bg-gray-50"}">
      <div>
        <p class="font-fira text-[#1A2B49]">${r.type === "semaine" ? "1 Semaine" : "1 Mois"} — ${Number(r.prix).toFixed(2)} €</p>
        <p class="text-xs text-gray-400">${debut} → ${fin}</p>
      </div>
      <span class="text-xs font-fira px-3 py-1 rounded-full ${r.actif ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}">
        ${r.actif ? " Actif" : "Expiré"}
      </span>
    </div>`;
    })
    .join("");
}

async function souscrire(type) {
  try {
    const res = await fetch(`${API_BASE}/admin/referencement/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_pro: userId, type }),
    });

    if (!res.ok) {
      const e = await res.json();
      showToast(e.error || "Erreur.", "error");
      return;
    }
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  } catch {
    showToast("Erreur réseau.", "error");
  }
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
