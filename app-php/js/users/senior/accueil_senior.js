const API_BASE = "http://144.76.74.130:8082";
const userId = Number(localStorage.getItem("id_user"));
const email = localStorage.getItem("email") || "";
const role = localStorage.getItem("role");

if (!userId || role !== "senior") {
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

    const isFirstLogin = p.is_first_login;
    localStorage.setItem("is_first_login", isFirstLogin);

    if (isFirstLogin) {
      await fetch(`${API_BASE}/admin/profile_senior/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_user: userId, is_first_login: false }),
      });
      lancerIntro();
    }
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
      ? allFactures.filter((f) => f.id_recepteur === userId)
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
    const [resInter, resEvenements] = await Promise.all([
      fetch(`${API_BASE}/admin/intervention/get`),
      fetch(`${API_BASE}/admin/inscription_evenement/get_by_user?id=${userId}`),
    ]);

    const allInter = await resInter.json();
    const allEven = await resEvenements.json();
    const now = new Date();

    const interventions = Array.isArray(allInter)
      ? allInter
          .filter(
            (i) =>
              i.id_senior === userId &&
              new Date(i.date_heure_debut) >= now &&
              i.statut !== "annulee",
          )
          .map((i) => ({
            date: new Date(i.date_heure_debut),
            titre: i.nom_service || "Intervention",
            lieu: i.lieu || "A domicile",
            type: "intervention",
          }))
      : [];

    const evenements = Array.isArray(allEven)
      ? allEven
          .filter(
            (e) =>
              e.statut !== "annule" &&
              e.date_heure &&
              new Date(e.date_heure) >= now,
          )
          .map((e) => ({
            date: new Date(e.date_heure),
            titre: e.titre_evenement || "Evenement",
            lieu: e.lieu || "",
            type: "evenement",
          }))
      : [];

    const tous = [...interventions, ...evenements]
      .sort((a, b) => a.date - b.date)
      .slice(0, 3);

    if (!tous.length) {
      container.innerHTML = `
        <div class="bg-white p-6 rounded-[40px] border-2 border-dashed border-gray-200 text-center">
          <p class="text-gray-400 italic text-lg">Aucune activite planifiee pour le moment.</p>
        </div>`;
      return;
    }

    const mois = [
      "Jan",
      "Fev",
      "Mar",
      "Avr",
      "Mai",
      "Jun",
      "Jul",
      "Aou",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    container.innerHTML = tous
      .map((item) => {
        const isEvenement = item.type === "evenement";
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
        const heure = item.date.toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        });

        return `
      <div class="group bg-white p-6 rounded-[40px] border-2 border-transparent ${border} hover:shadow-xl transition-all duration-500 flex items-center gap-4">
        <div class="${bg} rounded-[20px] p-4 text-center min-w-[70px]">
          <p class="text-sm font-fira uppercase">${mois[item.date.getMonth()]}</p>
          <p class="text-3xl font-fira">${item.date.getDate()}</p>
        </div>
        <div class="flex-1">
          <p class="font-fira text-[#1A2B49] text-lg">${esc(item.titre)}</p>
          <p class="text-base text-gray-400">${heure} — ${esc(item.lieu)}</p>
        </div>
        <span class="${textColor} font-fira uppercase text-xs tracking-widest border-b-2 ${borderLabel} pb-1">${item.type}</span>
      </div>`;
      })
      .join("");
  } catch {
    container.innerHTML = `<p class="text-red-400 text-center">Erreur chargement planning.</p>`;
  }
}

async function loadEvenements() {
  const container = document.getElementById("evenementsList");
  try {
    const res = await fetch(`${API_BASE}/admin/evenement/get`);
    const events = await res.json();
    const now = new Date();

    const prochains = Array.isArray(events)
      ? events
          .filter((e) => e.date_heure && new Date(e.date_heure) >= now)
          .sort((a, b) => new Date(a.date_heure) - new Date(b.date_heure))
          .slice(0, 3)
      : [];

    if (!prochains.length) {
      container.innerHTML = `<p class="text-gray-400 italic text-center py-10">Aucun evenement a venir.</p>`;
      return;
    }

    container.innerHTML = prochains
      .map((e) => {
        const date = new Date(e.date_heure).toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
        const heure = new Date(e.date_heure).toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        });
        const placesRestantes = Math.max(
          0,
          (e.nb_places_max || 0) - (e.nb_inscrits || 0),
        );

        return `
      <div class="group bg-white p-8 rounded-[40px] border-2 border-transparent hover:border-[#7CABD3] hover:shadow-xl transition-all duration-500 w-80">
        <span class="bg-[#7CABD3]/10 text-[#7CABD3] text-sm font-fira px-3 py-1 rounded-full">${esc(e.nom_categorie || "Evenement")}</span>
        <h4 class="font-fira text-[#1A2B49] mt-4 mb-2 text-xl">${esc(e.titre)}</h4>
        <p class="text-base text-gray-400 mb-1">${esc(e.lieu || "—")}</p>
        <p class="text-base text-gray-400 mb-1">${date} a ${heure}</p>
        <p class="text-sm text-gray-300 mb-4">${placesRestantes} place${placesRestantes > 1 ? "s" : ""} restante${placesRestantes > 1 ? "s" : ""}</p>
        <div class="flex justify-between items-center mt-4">
          <span class="font-fira text-[#1A2B49] text-lg">${e.prix_ticket == 0 ? "Gratuit" : e.prix_ticket + " EUR"}</span>
          <a href="/users/seniors/evenements.php" class="bg-[#1A2B49] text-white text-sm font-fira uppercase px-5 py-2 rounded-full hover:bg-[#7CABD3] transition-all">
            Voir
          </a>
        </div>
      </div>`;
      })
      .join("");
  } catch {
    container.innerHTML = `<p class="text-red-400 text-center">Erreur chargement evenements.</p>`;
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
          "Silver Happy est votre plateforme de services a domicile. En quelques secondes, decouvrez tout ce que vous pouvez faire ici.",
      },
      {
        element: document.getElementById("tab-bord"),
        title: "Tableau de bord",
        intro:
          "Votre point de depart. Retrouvez vos interventions a venir, vos avis recus et vos statistiques en un coup d'oeil.",
      },
      {
        element: document.getElementById("services"),
        title: "Services a domicile",
        intro:
          "Recherchez un prestataire selon vos besoins : menage, sante, sport, aide administrative... Faites une demande en quelques clics.",
      },
      {
        element: document.getElementById("event"),
        title: "Evenements",
        intro:
          "Decouvrez et inscrivez-vous aux evenements organises pres de chez vous.",
      },
      {
        element: document.getElementById("boutique"),
        title: "Boutique",
        intro:
          "Achetez des articles selectionnes pour votre bien-etre et votre quotidien.",
      },
      {
        element: document.getElementById("panier"),
        title: "Panier",
        intro:
          "Retrouvez vos articles et evenements selectionnes avant de passer au paiement.",
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
          "Suivez l'etat de vos interventions en temps reel et laissez un avis une fois terminees.",
      },
      {
        element: document.getElementById("conseils"),
        title: "Conseils",
        intro:
          "Notre equipe vous partage des conseils personalises pour votre bien-etre au quotidien.",
      },
      {
        element: document.getElementById("messagerie"),
        title: "Messagerie",
        intro:
          "Echangez directement avec vos prestataires pour organiser vos interventions.",
      },
      {
        element: document.getElementById("profil"),
        title: "Mon Profil",
        intro:
          "Completez votre profil pour une meilleure experience. Plus votre profil est complet, mieux nos prestataires pourront vous accompagner.",
      },
      {
        element: document.getElementById("deconnexion"),
        title: "Deconnexion securisee",
        intro:
          "Pensez a vous deconnecter apres chaque session pour proteger vos donnees personnelles. Bonne navigation sur Silver Happy !",
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
