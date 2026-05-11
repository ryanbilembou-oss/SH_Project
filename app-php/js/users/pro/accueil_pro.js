const API_BASE = "http://172.16.90.10:8082";
const userId = Number(localStorage.getItem("id_user"));
const email = localStorage.getItem("email") || "";
const role = localStorage.getItem("role");

if (!userId || role !== "pro") {
  window.location.href = "/users/login.php";
}

document.getElementById("prenomUser").textContent = email.split("@")[0] || "—";

(async () => {
  await Promise.all([
    loadProfil(),
    loadInterventions(),
    loadAvis(),
    loadStats(),
    loadFinances(),
  ]);
  lancerIntro();
})();

async function loadProfil() {
  try {
    const res = await fetch(
      `${API_BASE}/admin/profile_pro/getone?id=${userId}`,
    );
    if (!res.ok) throw new Error("Profil introuvable");
    const p = await res.json();

    if (p.statut_validation === "refuse") {
      window.location.href = "/users/pro/dossier_refuse.php";
      return;
    }
    if (p.statut_validation === "en_attente") {
      window.location.href = "/users/pro/upload_documents.php";
      return;
    }

    const prenom = p.prenom || email.split("@")[0];
    document.getElementById("prenomUser").textContent = prenom;
    localStorage.setItem("prenom", prenom);

    document.getElementById("noteMoyenne").textContent = p.note_moyenne
      ? Number(p.note_moyenne).toFixed(1)
      : "—";
  } catch {}
}

async function loadStats() {
  try {
    const [resInter, resOffres, resDevis] = await Promise.all([
      fetch(`${API_BASE}/admin/intervention/get`),
      fetch(`${API_BASE}/admin/offre_prestataire/get`),
      fetch(`${API_BASE}/admin/devis/get`),
    ]);

    const allInter = await resInter.json();
    const now = new Date();
    const mesInter = Array.isArray(allInter)
      ? allInter.filter(
          (i) =>
            i.id_pro === userId &&
            new Date(i.date_heure_debut) > now &&
            i.statut !== "annulee",
        )
      : [];
    document.getElementById("nbInterventions").textContent = mesInter.length;

    const allOffres = await resOffres.json();
    const mesOffres = Array.isArray(allOffres)
      ? allOffres.filter((o) => o.id_pro === userId)
      : [];
    document.getElementById("nbOffres").textContent = mesOffres.length;

    const allDevis = await resDevis.json();
    const mesDevis = Array.isArray(allDevis)
      ? allDevis.filter((d) => d.id_pro === userId && d.statut === "en_attente")
      : [];
    document.getElementById("nbDevis").textContent = mesDevis.length;
  } catch (e) {
    console.error("Erreur stats:", e);
  }
}

async function loadInterventions() {
  const container = document.getElementById("interventionsList");
  try {
    const res = await fetch(`${API_BASE}/admin/intervention/get`);
    const all = await res.json();
    const now = new Date();

    const prochaines = Array.isArray(all)
      ? all
          .filter(
            (i) =>
              i.id_pro === userId &&
              new Date(i.date_heure_debut) > now &&
              i.statut !== "annulee",
          )
          .sort(
            (a, b) =>
              new Date(a.date_heure_debut) - new Date(b.date_heure_debut),
          )
          .slice(0, 3)
      : [];

    if (!prochaines.length) {
      container.innerHTML = `
        <div class="bg-white p-6 rounded-[40px] border-2 border-dashed border-gray-200 text-center">
          <p class="text-gray-400 italic text-lg">Aucune intervention à venir.</p>
        </div>`;
      return;
    }

    const mois = [
      "Jan",
      "Fév",
      "Mar",
      "Avr",
      "Mai",
      "Jun",
      "Jul",
      "Aoû",
      "Sep",
      "Oct",
      "Nov",
      "Déc",
    ];

    container.innerHTML = prochaines
      .map((i) => {
        const date = new Date(i.date_heure_debut);
        const heureDeb = date.toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        });
        const heureFin = new Date(i.date_heure_fin).toLocaleTimeString(
          "fr-FR",
          { hour: "2-digit", minute: "2-digit" },
        );

        const statutMap = {
          planifiee: {
            label: "Planifiée",
            css: "text-[#7CABD3] border-[#7CABD3]",
          },
          en_cours: {
            label: "En cours",
            css: "text-[#FCE297] border-[#FCE297]",
          },
          terminee: {
            label: "Terminée",
            css: "text-green-400 border-green-400",
          },
          annulee: { label: "Annulée", css: "text-red-400 border-red-400" },
        };
        const st = statutMap[i.statut] || {
          label: i.statut,
          css: "text-gray-400 border-gray-400",
        };

        return `
      <div class="group bg-white p-6 rounded-[40px] border-2 border-transparent hover:border-[#7CABD3] hover:shadow-xl transition-all duration-500 flex items-center gap-4">
        <div class="bg-[#7CABD3] text-white rounded-[20px] p-4 text-center min-w-[70px]">
          <p class="text-sm font-fira uppercase">${mois[date.getMonth()]}</p>
          <p class="text-3xl font-fira">${date.getDate()}</p>
        </div>
        <div class="flex-1">
          <p class="font-fira text-[#1A2B49] text-lg">${esc(i.nom_service || i.bio_intervention || "Intervention")}</p>
          <p class="text-base text-gray-400">${heureDeb} → ${heureFin} — ${esc(i.lieu || "—")}</p>
          <p class="text-sm text-gray-400">${esc(i.prenom_senior || "")} ${esc(i.nom_senior || "")}</p>
        </div>
        <div class="text-right">
          <span class="${st.css} font-fira uppercase text-xs tracking-widest border-b-2 pb-1 block mb-1">${st.label}</span>
          <span class="font-fira text-[#1A2B49] text-sm">${Number(i.prix).toFixed(2)} €</span>
        </div>
      </div>`;
      })
      .join("");
  } catch {
    container.innerHTML = `<p class="text-red-400 text-center">Erreur chargement interventions.</p>`;
  }
}

async function loadAvis() {
  const container = document.getElementById("avisList");
  try {
    const resInter = await fetch(`${API_BASE}/admin/intervention/get`);
    const allInter = await resInter.json();
    const idsInterPro = Array.isArray(allInter)
      ? allInter.filter((i) => i.id_pro === userId).map((i) => Number(i.id))
      : [];

    const resAvis = await fetch(`${API_BASE}/admin/note_avis/get`);
    const allAvis = await resAvis.json();

    const avisPro = Array.isArray(allAvis)
      ? allAvis
          .filter(
            (a) =>
              a.id_intervention != null &&
              idsInterPro.includes(Number(a.id_intervention)),
          )
          .sort(
            (a, b) =>
              new Date(b.date_publication) - new Date(a.date_publication),
          )
      : [];

    if (avisPro.length) {
      const moy =
        avisPro.reduce((s, a) => s + (a.note || 0), 0) / avisPro.length;
      document.getElementById("noteMoyenne").textContent = moy.toFixed(1);
    } else {
      document.getElementById("noteMoyenne").textContent = "—";
    }

    if (!avisPro.slice(0, 3).length) {
      container.innerHTML = `
        <div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-gray-200 text-center w-72">
          <iconify-icon icon="mdi:star-off" class="text-4xl text-gray-300 mb-3 block"></iconify-icon>
          <p class="text-gray-400 italic text-base">Aucun avis pour l'instant.</p>
        </div>`;
      return;
    }

    container.innerHTML = avisPro
      .slice(0, 3)
      .map((a) => {
        const date = a.date_publication
          ? new Date(a.date_publication).toLocaleDateString("fr-FR")
          : "—";
        const etoiles = "★".repeat(a.note || 0) + "☆".repeat(5 - (a.note || 0));
        return `
      <div class="group bg-white p-8 rounded-[40px] border-2 border-transparent hover:border-[#FCE297] hover:shadow-xl transition-all duration-500 w-80 flex flex-col gap-3">
        <span class="text-[#FCE297] text-3xl font-fira tracking-wider">${etoiles}</span>
        <p class="text-base text-gray-400 italic flex-1">"${esc(a.commentaire || "Aucun commentaire")}"</p>
        <p class="text-sm text-gray-300 font-fira uppercase tracking-widest">${date}</p>
      </div>`;
      })
      .join("");
  } catch {
    container.innerHTML = `<p class="text-red-400 text-center">Erreur chargement avis.</p>`;
  }
}

async function loadFinances() {
  try {
    const res = await fetch(`${API_BASE}/admin/facture/get`);
    const all = await res.json();
    const mesFactures = Array.isArray(all)
      ? all.filter(
          (f) => f.id_emetteur === userId && f.type_achat === "intervention",
        )
      : [];

    const totalEncaisse = mesFactures.reduce(
      (s, f) => s + Number(f.montant_ttc || 0),
      0,
    );
    const totalCommission = mesFactures.reduce(
      (s, f) => s + Number(f.commission_sh || 0),
      0,
    );
    const gainNet = totalEncaisse - totalCommission;
    const nbFactures = mesFactures.length;

    const kpiGrid = document.querySelector(
      ".grid.grid-cols-2.md\\:grid-cols-4",
    );
    if (!kpiGrid) return;

    const bloc = document.createElement("div");
    bloc.className = "grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 mt-4";
    bloc.innerHTML = `
      <div class="bg-[#1A2B49] text-white p-8 rounded-[40px] text-center">
        <iconify-icon icon="mdi:cash-multiple" class="text-5xl text-[#7CABD3] mb-3 block"></iconify-icon>
        <p class="text-4xl font-fira">${totalEncaisse.toFixed(2)} €</p>
        <p class="text-sm uppercase font-fira tracking-widest mt-1 opacity-70">Total encaissé</p>
      </div>
      <div class="bg-white p-8 rounded-[40px] border-2 border-red-100 text-center">
        <iconify-icon icon="mdi:percent" class="text-5xl text-red-300 mb-3 block"></iconify-icon>
        <p class="text-4xl font-fira text-[#1A2B49]">${totalCommission.toFixed(2)} €</p>
        <p class="text-sm uppercase font-fira tracking-widest mt-1 text-gray-400">Commission Silver Happy</p>
      </div>
      <div class="bg-white p-8 rounded-[40px] border-2 border-green-200 text-center">
        <iconify-icon icon="mdi:bank-transfer" class="text-5xl text-green-400 mb-3 block"></iconify-icon>
        <p class="text-4xl font-fira text-green-600">${gainNet.toFixed(2)} €</p>
        <p class="text-sm uppercase font-fira tracking-widest mt-1 text-gray-400">
          Gain net · ${nbFactures} facture${nbFactures > 1 ? "s" : ""}
        </p>
      </div>
    `;

    kpiGrid.insertAdjacentElement("afterend", bloc);
  } catch {}
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
function lancerIntro() {
  introJs()
    .setOptions({
      nextLabel: "Suivant →",
      prevLabel: "← Retour",
      doneLabel: "C'est parti !",
      steps: [
        {
          title: " Bienvenue " + (localStorage.getItem("prenom") || "") + " !",
          intro:
            "Bienvenue dans votre espace prestataire Silver Happy. Découvrez en quelques étapes comment gérer votre activité.",
        },
        {
          element: document.getElementById("tab-bord"),
          title: " Tableau de bord",
          intro:
            "Votre centre de pilotage. Suivez vos interventions à venir, vos finances et vos derniers avis clients.",
        },
        {
          element: document.getElementById("demandes"),
          title: "Demandes clients",
          intro:
            "Les seniors font leurs demandes ici. Acceptez ou refusez en proposant un créneau — cela génère automatiquement un devis.",
        },
        {
          element: document.getElementById("interventions"),
          title: " Mes Interventions",
          intro:
            "Retrouvez toutes vos interventions planifiées, en cours ou terminées. Les statuts se mettent à jour automatiquement.",
        },
        {
          element: document.getElementById("offres"),
          title: " Mes Offres",
          intro:
            "Créez et gérez vos offres de service avec vos tarifs personnalisés. Plus vous avez d'offres, plus vous avez de visibilité.",
        },
        {
          element: document.getElementById("planning"),
          title: "Mon Planning",
          intro:
            "Renseignez vos disponibilités hebdomadaires. Les seniors les verront avant de faire une demande.",
        },
        {
          element: document.getElementById("devisfacture"),
          title: " Devis & Factures",
          intro:
            "Retrouvez tous vos devis en attente de paiement et vos factures émises avec le détail de vos gains nets.",
        },
        {
          element: document.getElementById("avis"),
          title: " Mes Avis",
          intro:
            "La note de vos clients influence votre visibilité sur la plateforme. Offrez un service de qualité pour grimper dans les résultats !",
        },
        {
          element: document.getElementById("messagerie"),
          title: " Messagerie",
          intro:
            "Échangez directement avec vos clients seniors pour préparer et organiser vos interventions.",
        },
        {
          element: document.getElementById("profil"),
          title: " Mon Profil",
          intro:
            "Complétez votre profil avec votre SIRET, bio et photo. Un profil complet inspire confiance et attire plus de clients.",
        },
        {
          element: document.getElementById("deconnexion"),
          title: " Déconnexion",
          intro:
            "Bonne journée ! N'oubliez pas de consulter régulièrement vos demandes pour ne rater aucune opportunité. ",
        },
      ],
    })
    .start();
}
