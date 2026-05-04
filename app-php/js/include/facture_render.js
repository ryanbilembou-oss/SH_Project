function renderFactureDetaille(f, modeAffichage = "senior") {
  const dateDebut = f.date_heure_debut
    ? new Date(f.date_heure_debut).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;
  const heureDebut = f.date_heure_debut
    ? formatHeureFact(f.date_heure_debut)
    : null;
  const heureFin = f.date_heure_fin ? formatHeureFact(f.date_heure_fin) : null;
  const dureeMin =
    f.date_heure_debut && f.date_heure_fin
      ? Math.round(
          (new Date(f.date_heure_fin) - new Date(f.date_heure_debut)) / 60000,
        )
      : null;

  const gainNet = Number(
    f.gain_net || f.montant_ht - f.commission_sh || 0,
  ).toFixed(2);
  const hasInter = f.id_intervention && f.nom_service;
  const isPlatform = !f.nom_entreprise && !f.siret_emetteur;

  let details = {};
  try {
    if (f.details_json) details = JSON.parse(f.details_json);
  } catch {}

  const titreMap = {
    abonnement: "Abonnement Silver Happy",
    evenement: "Inscription événement",
    article: "Achat article",
    panier: "Achat panier",
    intervention: "Prestation de service",
  };
  const titre = titreMap[f.type_achat] || "Facture Silver Happy";

  let detailBloc = "";

  if (hasInter) {
    detailBloc = `
    <div class="border-2 border-gray-100 rounded-[20px] p-5 mb-6">
      <p class="font-fira uppercase text-xs tracking-widest text-gray-400 mb-4">Détail de la prestation</p>
      <div class="space-y-3">
        <div class="flex justify-between items-center">
          <span class="text-gray-500 flex items-center gap-2"><iconify-icon icon="mdi:briefcase" class="text-[#7CABD3]"></iconify-icon> Service</span>
          <span class="font-fira text-[#1A2B49]">${esc(f.nom_service)}</span>
        </div>
        ${f.nom_categorie ? `<div class="flex justify-between items-center"><span class="text-gray-500 flex items-center gap-2"><iconify-icon icon="mdi:tag" class="text-[#7CABD3]"></iconify-icon> Catégorie</span><span class="font-fira text-[#1A2B49]">${esc(f.nom_categorie)}</span></div>` : ""}
        ${dateDebut ? `<div class="flex justify-between items-center"><span class="text-gray-500 flex items-center gap-2"><iconify-icon icon="mdi:calendar" class="text-[#7CABD3]"></iconify-icon> Date</span><span class="font-fira text-[#1A2B49]">${dateDebut}</span></div>` : ""}
        ${heureDebut ? `<div class="flex justify-between items-center"><span class="text-gray-500 flex items-center gap-2"><iconify-icon icon="mdi:clock-outline" class="text-[#7CABD3]"></iconify-icon> Horaires</span><span class="font-fira text-[#1A2B49]">${heureDebut} → ${heureFin} ${dureeMin ? `(${dureeMin} min)` : ""}</span></div>` : ""}
        ${f.lieu ? `<div class="flex justify-between items-center"><span class="text-gray-500 flex items-center gap-2"><iconify-icon icon="mdi:map-marker" class="text-[#7CABD3]"></iconify-icon> Lieu</span><span class="font-fira text-[#1A2B49]">${esc(f.lieu)}</span></div>` : ""}
        ${f.bio_intervention ? `<div class="pt-2 border-t border-gray-100"><p class="text-gray-400 text-sm italic">"${esc(f.bio_intervention)}"</p></div>` : ""}
      </div>
    </div>`;
  } else if (f.type_achat === "article" && details.nom) {
    detailBloc = `
    <div class="border-2 border-gray-100 rounded-[20px] p-5 mb-6">
      <p class="font-fira uppercase text-xs tracking-widest text-gray-400 mb-4">Détail de la commande</p>
      <div class="space-y-3">
        <div class="flex justify-between items-center">
          <span class="text-gray-500 flex items-center gap-2"><iconify-icon icon="mdi:shopping" class="text-[#7CABD3]"></iconify-icon> Article</span>
          <span class="font-fira text-[#1A2B49]">${esc(details.nom)}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-gray-500 flex items-center gap-2"><iconify-icon icon="mdi:counter" class="text-[#7CABD3]"></iconify-icon> Quantité</span>
          <span class="font-fira text-[#1A2B49]">${details.quantite} unité(s)</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-gray-500 flex items-center gap-2"><iconify-icon icon="mdi:currency-eur" class="text-[#7CABD3]"></iconify-icon> Prix unitaire</span>
          <span class="font-fira text-[#1A2B49]">${Number(details.prix_unitaire).toFixed(2)} €</span>
        </div>
      </div>
    </div>`;
  } else if (f.type_achat === "evenement" && details.nom) {
    detailBloc = `
    <div class="border-2 border-gray-100 rounded-[20px] p-5 mb-6">
      <p class="font-fira uppercase text-xs tracking-widest text-gray-400 mb-4">Détail de l'inscription</p>
      <div class="space-y-3">
        <div class="flex justify-between items-center">
          <span class="text-gray-500 flex items-center gap-2"><iconify-icon icon="mdi:calendar-star" class="text-[#7CABD3]"></iconify-icon> Événement</span>
          <span class="font-fira text-[#1A2B49]">${esc(details.nom)}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-gray-500 flex items-center gap-2"><iconify-icon icon="mdi:account-multiple" class="text-[#7CABD3]"></iconify-icon> Places</span>
          <span class="font-fira text-[#1A2B49]">${details.quantite} place(s)</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-gray-500 flex items-center gap-2"><iconify-icon icon="mdi:currency-eur" class="text-[#7CABD3]"></iconify-icon> Prix / place</span>
          <span class="font-fira text-[#1A2B49]">${Number(details.prix_unitaire).toFixed(2)} €</span>
        </div>
      </div>
    </div>`;
  } else if (f.type_achat === "panier" && details.items) {
    const lignes = details.items
      .map(
        (item) => `
      <div class="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
        <div class="flex items-center gap-2">
          <iconify-icon icon="${item.type_objet === "evenement" ? "mdi:calendar" : "mdi:shopping"}" class="text-[#7CABD3]"></iconify-icon>
          <span class="text-gray-500">${esc(item.nom)}</span>
          <span class="text-xs text-gray-300 font-fira">${item.type_objet === "evenement" ? "Événement" : "Article"}</span>
        </div>
        <span class="font-fira text-[#1A2B49]">${item.quantite} × ${Number(item.prix).toFixed(2)} €</span>
      </div>`,
      )
      .join("");

    detailBloc = `
    <div class="border-2 border-gray-100 rounded-[20px] p-5 mb-6">
      <p class="font-fira uppercase text-xs tracking-widest text-gray-400 mb-4">Détail du panier</p>
      ${lignes}
    </div>`;
  } else if (f.type_achat === "abonnement" && details.label) {
    detailBloc = `
    <div class="border-2 border-gray-100 rounded-[20px] p-5 mb-6">
      <p class="font-fira uppercase text-xs tracking-widest text-gray-400 mb-4">Détail de l'abonnement</p>
      <div class="flex justify-between items-center">
        <span class="text-gray-500 flex items-center gap-2"><iconify-icon icon="mdi:credit-card" class="text-[#7CABD3]"></iconify-icon> Formule</span>
        <span class="font-fira text-[#1A2B49]">${esc(details.label)}</span>
      </div>
    </div>`;
  }

  return `
  <div class="bg-white p-8 rounded-[40px] border-2 border-transparent hover:border-[#7CABD3] hover:shadow-xl transition-all duration-500">

  
    <div class="flex justify-between items-start mb-6 flex-wrap gap-4">
      <div>
        <p class="font-fira uppercase text-xs tracking-widest text-gray-400 mb-1">${titre}</p>
        <h4 class="font-fira text-[#1A2B49] text-2xl">Facture #${f.id_facture}</h4>
        ${dateDebut && hasInter ? `<p class="text-gray-400 text-sm mt-1">${dateDebut}</p>` : ""}
      </div>
      <span class="font-fira text-sm px-4 py-2 rounded-full uppercase bg-emerald-100 text-emerald-700">
        <iconify-icon icon="mdi:check-circle" class="mr-1"></iconify-icon> Payée
      </span>
    </div>

     
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div class="bg-[#1A2B49] text-white px-5 py-4 rounded-[20px]">
        <p class="font-fira uppercase text-xs tracking-widest opacity-60 mb-2">Émetteur</p>
        ${
          isPlatform
            ? `
          <p class="font-fira text-lg">Silver Happy</p>
          <p class="text-white/60 text-xs mt-1">Plateforme de services seniors</p>
        `
            : `
          <p class="font-fira text-lg">${esc(f.prenom_emetteur)} ${esc(f.nom_emetteur)}</p>
          ${f.nom_entreprise ? `<p class="text-white/70 text-sm">${esc(f.nom_entreprise)}</p>` : ""}
          ${f.siret_emetteur ? `<p class="text-white/60 text-xs mt-1">SIRET : ${esc(f.siret_emetteur)}</p>` : ""}
          ${f.telephone_emetteur ? `<p class="text-white/60 text-xs">${esc(f.telephone_emetteur)}</p>` : ""}
          ${f.adresse_emetteur ? `<p class="text-white/60 text-xs">${esc(f.adresse_emetteur)}</p>` : ""}
        `
        }
      </div>
      <div class="bg-gray-50 px-5 py-4 rounded-[20px]">
        <p class="font-fira uppercase text-xs tracking-widest text-gray-400 mb-2">Client</p>
        <p class="font-fira text-[#1A2B49] text-lg">${esc(f.prenom_recepteur)} ${esc(f.nom_recepteur)}</p>
      </div>
    </div>

 
    ${detailBloc}

    
    <div class="border-2 border-gray-100 rounded-[20px] p-5 mb-6 space-y-3">
      <p class="font-fira uppercase text-xs tracking-widest text-gray-400 mb-4">Récapitulatif financier</p>
      <div class="flex justify-between items-center">
        <span class="text-gray-500">Montant HT</span>
        <span class="font-fira text-[#1A2B49]">${Number(f.montant_ht).toFixed(2)} €</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-gray-500">TVA (20%)</span>
        <span class="font-fira text-[#1A2B49]">${(Number(f.montant_ttc) - Number(f.montant_ht)).toFixed(2)} €</span>
      </div>
      <div class="flex justify-between items-center border-t border-gray-100 pt-3">
        <span class="font-fira text-[#1A2B49] font-bold">Total TTC</span>
        <span class="font-fira text-[#1A2B49] text-xl font-bold">${Number(f.montant_ttc).toFixed(2)} €</span>
      </div>
      ${
        Number(f.commission_sh) > 0
          ? `
      <div class="flex justify-between items-center">
        <span class="text-gray-500">Commission Silver Happy</span>
        <span class="font-fira text-red-400">- ${Number(f.commission_sh).toFixed(2)} €</span>
      </div>`
          : ""
      }
      ${
        modeAffichage === "pro" && Number(f.commission_sh) > 0
          ? `
      <div class="flex justify-between items-center bg-emerald-50 rounded-[15px] px-3 py-2">
        <span class="font-fira text-emerald-700 font-bold uppercase text-sm">Votre gain net</span>
        <span class="font-fira text-emerald-700 text-xl font-bold">${gainNet} €</span>
      </div>`
          : ""
      }
    </div>

    <!-- PDF -->
    ${
      f.pdf_url
        ? `
    <a href="${esc(f.pdf_url)}" target="_blank"
       class="flex items-center justify-center gap-2 w-full py-4 bg-[#1A2B49] text-white rounded-full font-fira uppercase hover:bg-[#7CABD3] transition-all">
      <iconify-icon icon="mdi:file-pdf-box"></iconify-icon> Télécharger la facture PDF
    </a>`
        : `
    <div class="flex items-center justify-center gap-2 w-full py-3 bg-gray-50 text-gray-400 rounded-full font-fira uppercase text-sm">
      <iconify-icon icon="mdi:clock-outline"></iconify-icon> PDF en cours de génération
    </div>`
    }

  </div>`;
}

function formatHeureFact(str) {
  if (!str) return "—";
  const d = new Date(str);
  if (!isNaN(d.getTime()))
    return d.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Paris",
    });
  if (str.includes(" ")) return str.split(" ")[1].slice(0, 5);
  if (str.includes("T")) return str.split("T")[1].slice(0, 5);
  return str.slice(0, 5);
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
