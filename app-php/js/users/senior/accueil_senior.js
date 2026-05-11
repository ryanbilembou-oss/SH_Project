const API_BASE = "http://localhost:8082";
const userId = Number(localStorage.getItem("id_user"));

const email = localStorage.getItem("email") || "";
const role = localStorage.getItem("role");
if (!userId || role != "senior") {
  window.location.href = "/users/login.php";
}

document.getElementById("prenomUser").textContent = email.split("@")[0] || "—";

(async () => {
  await Promise.all([
    loadProfil(),
    loadEvenements(),
    loadPlanning(),
    loadStats(),
  ]);

  lancerIntro();
})();

async function loadProfil() {
  try {
    const res = await fetch(
      `${API_BASE}/admin/profile_senior/getone?id=${userId}`,
    );
    if (!res.ok) return;
    const p = await res.json();
    const prenom = p.prenom || email.split("@")[0];
    document.getElementById("prenomUser").textContent = prenom;
    localStorage.setItem("prenom", prenom);

    const is_first_login = p.is_first_login || null;
    localStorage.setItem("is_first_login", is_first_login);
  } catch {}
}

async function loadStats() {
  try {
    const [resInscriptions, resDevis, resFactures, resServices] =
      await Promise.all([
        fetch(
          `${API_BASE}/admin/inscription_evenement/get_by_user?id=${userId}`,
        ),
        fetch(`${API_BASE}/admin/devis/get`),
        fetch(`${API_BASE}/admin/facture/get`),
        fetch(`${API_BASE}/admin/service/get`),
      ]);

    const inscriptions = await resInscriptions.json();
    document.getElementById("nbEvenements").textContent = Array.isArray(
      inscriptions,
    )
      ? inscriptions.length
      : 0;

    const allDevis = await resDevis.json();
    const mesDevis = Array.isArray(allDevis)
      ? allDevis.filter((d) => d.id_senior === userId)
      : [];
    document.getElementById("nbDevis").textContent = mesDevis.length;

    const allFactures = await resFactures.json();
    const mesFactures = Array.isArray(allFactures)
      ? allFactures.filter((f) => f.id_senior === userId)
      : [];
    document.getElementById("nbFactures").textContent = mesFactures.length;

    const services = await resServices.json();
    document.getElementById("nbServices").textContent = Array.isArray(services)
      ? services.length
      : 0;
  } catch (e) {
    console.error("Erreur stats:", e);
  }
}

async function loadPlanning() {
  const container = document.getElementById("planningList");
  try {
    const res = await fetch(`${API_BASE}/admin/planning_senior/get`);
    const all = await res.json();
    const monPlanning = Array.isArray(all)
      ? all.filter((p) => p.id_senior === userId)
      : [];

    if (!monPlanning.length) {
      container.innerHTML = `
        <div class="bg-white p-6 rounded-[40px] border-2 border-dashed border-gray-200 text-center">
          <p class="text-gray-400 italic text-lg">Aucune activité planifiée pour le moment.</p>
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
    container.innerHTML = monPlanning
      .slice(0, 3)
      .map((p) => {
        const date = new Date(p.date_debut || p.created_at);
        const isEvenement = p.type === "evenement";
        const bg = isEvenement
          ? "bg-[#7CABD3] text-white"
          : "bg-[#FCE297] text-[#1A2B49]";
        const border = isEvenement
          ? "hover:border-[#7CABD3]"
          : "hover:border-[#FCE297]";
        const textColor = isEvenement ? "text-[#7CABD3]" : "text-[#FCE297]";
        const borderLabel = isEvenement
          ? "border-[#7CABD3]"
          : "border-[#FCE297]";
        return `
        <div class="group bg-white p-6 rounded-[40px] border-2 border-transparent ${border} hover:shadow-xl transition-all duration-500 flex items-center gap-4">
          <div class="${bg} rounded-[20px] p-4 text-center min-w-[70px]">
            <p class="text-sm font-fira uppercase">${mois[date.getMonth()]}</p>
            <p class="text-3xl font-fira">${date.getDate()}</p>
          </div>
          <div class="flex-1">
            <p class="font-fira text-[#1A2B49] text-lg">${esc(p.titre || p.description || "—")}</p>
            <p class="text-base text-gray-400">${p.heure_debut || ""} — ${esc(p.lieu || "À domicile")}</p>
          </div>
          <span class="${textColor} font-fira uppercase text-xs tracking-widest border-b-2 ${borderLabel} pb-1">${p.type || "Activité"}</span>
        </div>`;
      })
      .join("");
  } catch (e) {
    container.innerHTML = `<p class="text-red-400 text-center">Erreur chargement planning.</p>`;
  }
}

async function loadEvenements() {
  const container = document.getElementById("evenementsList");
  try {
    const res = await fetch(`${API_BASE}/admin/evenement/get`);
    const events = await res.json();

    if (!Array.isArray(events) || !events.length) {
      container.innerHTML = `<p class="text-gray-400 italic text-center py-10">Aucun événement disponible.</p>`;
      return;
    }

    container.innerHTML = events
      .slice(0, 3)
      .map((e) => {
        const date = e.date_heure
          ? new Date(e.date_heure).toLocaleDateString("fr-FR")
          : "—";
        return `
        <div class="group bg-white p-8 rounded-[40px] border-2 border-transparent hover:border-[#7CABD3] hover:shadow-xl transition-all duration-500 w-80">
          <span class="bg-[#7CABD3]/10 text-[#7CABD3] text-sm font-fira px-3 py-1 rounded-full">${esc(e.nom_categorie || "Événement")}</span>
          <h4 class="font-fira text-[#1A2B49] mt-4 mb-2 text-xl">${esc(e.titre)}</h4>
          <p class="text-base text-gray-400 mb-1"> ${esc(e.lieu || "—")}</p>
          <p class="text-base text-gray-400 mb-4"> ${date}</p>
          <div class="flex justify-between items-center mt-4">
            <span class="font-fira text-[#1A2B49] text-lg">${e.prix_ticket == 0 ? "Gratuit" : e.prix_ticket + " €"}</span>
            <a href="/users/seniors/evenements.php?id=${e.id_evenement}" class="bg-[#1A2B49] text-white text-sm font-fira uppercase px-5 py-2 rounded-full hover:bg-[#7CABD3] transition-all">
              Réserver
            </a>
          </div>
        </div>`;
      })
      .join("");
  } catch (e) {
    container.innerHTML = `<p class="text-red-400 text-center">Erreur chargement événements.</p>`;
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
function lancerIntro() {
  const intro = introJs();
  intro.setOptions({
    nextLabel: "Suivant →",
    prevLabel: "← Retour",
    doneLabel: "Commencer !",
    exitOnOverlayClick: false,
    exitOnEsc: false,
    showBullets: true,
    showStepNumbers: false,
    steps: [
      {
        title: "Bienvenue " + (localStorage.getItem("prenom") || "") + " !",
        intro:
          "Silver Happy est votre plateforme de services à domicile. En quelques secondes, découvrez tout ce que vous pouvez faire ici.",
      },
      {
        element: document.getElementById("tab-bord"),
        title: "Tableau de bord",
        intro:
          "Votre point de départ. Retrouvez vos interventions à venir, vos avis reçus et vos statistiques en un coup d'œil.",
      },
      {
        element: document.getElementById("services"),
        title: "Services à domicile",
        intro:
          "Recherchez un prestataire selon vos besoins : ménage, santé, sport, aide administrative... Faites une demande en quelques clics.",
      },
      {
        element: document.getElementById("event"),
        title: "Événements",
        intro:
          "Découvrez et inscrivez-vous aux événements organisés près de chez vous.",
      },
      {
        element: document.getElementById("boutique"),
        title: "Boutique",
        intro:
          "Achetez des articles sélectionnés pour votre bien-être et votre quotidien.",
      },
      {
        element: document.getElementById("panier"),
        title: "Panier",
        intro:
          "Retrouvez vos articles et événements sélectionnés avant de passer au paiement.",
      },
      {
        element: document.getElementById("devisfacture"),
        title: "Devis et Factures",
        intro:
          "Acceptez ou refusez les devis de vos prestataires et retrouvez toutes vos factures.",
      },
      {
        element: document.getElementById("interventions"),
        title: "Mes Interventions",
        intro:
          "Suivez l'état de vos interventions en temps réel et laissez un avis une fois terminées.",
      },
      {
        element: document.getElementById("conseils"),
        title: "Conseils",
        intro:
          "Notre équipe vous partage des conseils personnalisés pour votre bien-être au quotidien.",
      },
      {
        element: document.getElementById("messagerie"),
        title: "Messagerie",
        intro:
          "Échangez directement avec vos prestataires pour organiser vos interventions.",
      },
      {
        element: document.getElementById("profil"),
        title: "Mon Profil",
        intro:
          "Complétez votre profil pour une meilleure expérience. Plus votre profil est complet, mieux nos prestataires pourront vous accompagner.",
      },
      {
        element: document.getElementById("deconnexion"),
        title: "Deconnexion securisee",
        intro:
          "Pensez à vous déconnecter après chaque session pour protéger vos données personnelles. Bonne navigation sur Silver Happy !",
      },
    ],
  });

  intro.onstart(function () {
    setTimeout(() => {
      document
        .querySelectorAll(".introjs-skipbutton")
        .forEach((el) => (el.style.display = "none"));
    }, 50);
  });

  intro.onchange(function () {
    setTimeout(() => {
      document
        .querySelectorAll(".introjs-skipbutton")
        .forEach((el) => (el.style.display = "none"));
    }, 50);
  });

  intro.start();
}
