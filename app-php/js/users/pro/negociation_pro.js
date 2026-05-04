const API_BASE = "http://localhost:8082";
const userId = Number(localStorage.getItem("id_user"));
const role = localStorage.getItem("role");

if (!userId || role !== "pro") window.location.href = "/users/login.php";

(async () => {
  await Promise.all([loadProfil(), loadHistorique()]);
})();

async function loadProfil() {
  try {
    const res = await fetch(
      `${API_BASE}/admin/profile_pro/getone?id=${userId}`,
    );
    const p = await res.json();
    const commission =
      p.commission != null ? Number(p.commission).toFixed(1) : "15.0";
    document.getElementById("commissionActuelle").textContent =
      commission + " %";
    const suggest = Math.max(1, Number(commission) - 2);
    document.getElementById("tauxRange").value = suggest;
    document.getElementById("tauxValeur").textContent = suggest + "%";
  } catch {}
}

async function loadHistorique() {
  const container = document.getElementById("historiqueNego");
  try {
    const res = await fetch(
      `${API_BASE}/admin/negociation_commission/get_by_pro?id=${userId}`,
    );
    const data = await res.json();

    if (!Array.isArray(data) || !data.length) {
      container.innerHTML = `<p class="text-gray-400 italic text-sm">Aucune demande pour le moment.</p>`;
      return;
    }

    const statutConfig = {
      en_attente: {
        css: "bg-yellow-100 text-yellow-700",
        label: "En attente",
        icon: "mdi:clock-outline",
      },
      accepte: {
        css: "bg-green-100 text-green-700",
        label: "Acceptée",
        icon: "mdi:check-circle",
      },
      refuse: {
        css: "bg-red-100 text-red-700",
        label: "Refusée",
        icon: "mdi:close-circle",
      },
    };

    const enAttente = data.some((d) => d.statut === "en_attente");
    if (enAttente) {
      document.getElementById("formDemande").innerHTML = `
        <div class="bg-yellow-50 border-2 border-[#FCE297] rounded-[20px] p-5 flex items-center gap-4">
          <iconify-icon icon="mdi:clock-outline" class="text-3xl text-yellow-500 flex-shrink-0"></iconify-icon>
          <div>
            <p class="font-fira text-[#1A2B49] text-lg">Demande en cours d'examen</p>
            <p class="text-gray-400 text-sm">L'admin Silver Happy va répondre à votre demande prochainement.</p>
          </div>
        </div>`;
    }

    container.innerHTML = data
      .map((d) => {
        const st = statutConfig[d.statut] || {
          css: "bg-gray-100 text-gray-500",
          label: d.statut,
          icon: "mdi:help",
        };
        const date = new Date(d.date_demande).toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
        return `
      <div class="border-2 border-gray-100 rounded-[20px] p-5">
        <div class="flex items-start justify-between mb-3">
          <div>
            <p class="font-fira text-[#1A2B49] text-lg">
              ${d.taux_actuel}% → <span class="text-[#7CABD3]">${d.taux_propose}%</span>
            </p>
            <p class="text-gray-400 text-sm">${date}</p>
          </div>
          <span class="text-xs font-fira px-3 py-1.5 rounded-full ${st.css}">
            <iconify-icon icon="${st.icon}" class="mr-1"></iconify-icon>${st.label}
          </span>
        </div>
        ${d.message ? `<p class="text-gray-500 text-sm italic mb-2">"${esc(d.message)}"</p>` : ""}
        ${
          d.reponse_admin
            ? `
        <div class="bg-gray-50 rounded-[15px] p-3 mt-2">
          <p class="font-fira uppercase text-xs tracking-widest text-gray-400 mb-1">Réponse Silver Happy</p>
          <p class="text-gray-600 text-sm">${esc(d.reponse_admin)}</p>
        </div>`
            : ""
        }
      </div>`;
      })
      .join("");
  } catch (e) {
    container.innerHTML = `<p class="text-red-400 italic text-sm">Erreur de chargement.</p>`;
  }
}

async function soumettreDemande() {
  const taux = parseFloat(document.getElementById("tauxRange").value);
  const message = document.getElementById("messageNego").value.trim();

  try {
    const res = await fetch(`${API_BASE}/admin/negociation_commission/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_pro: userId, taux_propose: taux, message }),
    });

    if (res.status === 409) {
      showToast("Une demande est déjà en attente.", "error");
      return;
    }
    if (!res.ok) {
      const e = await res.json();
      showToast(e.error || "Erreur.", "error");
      return;
    }

    showToast("Demande envoyée !", "success");
    await Promise.all([loadProfil(), loadHistorique()]);
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

function esc(str) {
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
