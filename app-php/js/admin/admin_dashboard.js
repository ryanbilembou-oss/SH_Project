const API_BASE = "http://144.76.74.130:8082";

document.getElementById("dateAujourdhui").textContent =
  new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

let allUsers = [];
let allSeniorProfiles = [];
let allProProfiles = [];
let allInterventions = [];
let allFactures = [];
let allRefs = [];

(async () => {
  await loadAll();
  appliquerFiltre();
})();

async function loadAll() {
  const [users, seniorProfiles, proProfiles, interventions, factures, refs] =
    await Promise.all([
      fetchJSON("/admin/users"),
      fetchJSON("/admin/profile_senior/get_with_users"),
      fetchJSON("/admin/profile_pro/get_with_users"),
      fetchJSON("/admin/intervention/get"),
      fetchJSON("/admin/facture/get"),
      fetchJSON("/admin/referencement/get_tous"),
    ]);

  allUsers = Array.isArray(users) ? users : [];
  allSeniorProfiles = Array.isArray(seniorProfiles) ? seniorProfiles : [];
  allProProfiles = Array.isArray(proProfiles) ? proProfiles : [];
  allInterventions = Array.isArray(interventions) ? interventions : [];
  allFactures = Array.isArray(factures) ? factures : [];
  allRefs = Array.isArray(refs) ? refs : [];
}

function getPeriodeDates() {
  const now = new Date();
  const val = document.getElementById("filtrePeriode").value;
  if (val === "tout") return null;
  const debut = new Date();
  switch (val) {
    case "today":
      debut.setHours(0, 0, 0, 0);
      break;
    case "week":
      debut.setDate(now.getDate() - 7);
      break;
    case "month":
      debut.setMonth(now.getMonth() - 1);
      break;
    case "semester":
      debut.setMonth(now.getMonth() - 6);
      break;
    case "year":
      debut.setFullYear(now.getFullYear() - 1);
      break;
  }
  return { debut, fin: now };
}

function filtrerParPeriode(items, dateField) {
  const p = getPeriodeDates();
  if (!p) return items;
  return items.filter((i) => {
    const d = new Date(i[dateField]);
    return d >= p.debut && d <= p.fin;
  });
}

function appliquerFiltre() {
  const interFiltrees = filtrerParPeriode(allInterventions, "date_heure_debut");
  renderKPIGlobaux(interFiltrees);
  renderCA();
  renderRevenusParSource();
  renderTopPrestataires();
  renderAbonnementsDetail();
  renderInterventionsRecentes();
  renderDerniersInscrits();
  renderFacturesParType();
}

function renderKPIGlobaux(interventions) {
  const seniors = allUsers.filter((u) => u.role === "senior").length;
  const pros = allUsers.filter((u) => u.role === "pro").length;
  document.getElementById("kpiUsers").textContent = seniors + pros;
  document.getElementById("kpiUsersSub").textContent =
    `${seniors} seniors · ${pros} pros`;

  const total = interventions.length;
  const terminees = interventions.filter((i) => i.statut === "terminee").length;
  const aVenir = interventions.filter((i) => i.statut === "planifiee").length;
  document.getElementById("kpiInterventions").textContent = total;
  document.getElementById("kpiInterSub").textContent =
    `${terminees} terminées · ${aVenir} planifiées`;

  const aboSeniors = allSeniorProfiles.filter(
    (p) => p.is_subscription_valid,
  ).length;
  const aboPros = allProProfiles.filter((p) => p.is_subscription_valid).length;
  document.getElementById("kpiAbonnements").textContent = aboSeniors + aboPros;
  document.getElementById("kpiAboSub").textContent =
    `${aboSeniors} seniors · ${aboPros} pros`;

  const caTotal = allFactures.reduce(
    (s, f) => s + Number(f.montant_ttc || 0),
    0,
  );
  const nbF = allFactures.length;
  document.getElementById("kpiCA").textContent = caTotal.toFixed(2) + " €";
  document.getElementById("kpiCASub").textContent =
    `${nbF} facture${nbF > 1 ? "s" : ""} en BDD`;
}

function renderCA() {
  const caTotal = allFactures.reduce(
    (s, f) => s + Number(f.montant_ttc || 0),
    0,
  );
  const caCommissions = allFactures.reduce(
    (s, f) => s + Number(f.commission_sh || 0),
    0,
  );

  const nbAboSeniors = allSeniorProfiles.filter(
    (p) => p.is_subscription_valid,
  ).length;
  const nbAboPros = allProProfiles.filter(
    (p) => p.is_subscription_valid,
  ).length;
  const estimAbo = (nbAboSeniors + nbAboPros) * 4;

  const caRef = allRefs.reduce((s, r) => s + Number(r.prix || 0), 0);

  const beneficeNet = caCommissions + estimAbo + caRef;

  document.getElementById("caTotal").textContent = caTotal.toFixed(2) + " €";
  document.getElementById("caCommissions").textContent =
    caCommissions.toFixed(2) + " €";
  document.getElementById("beneficeNet").textContent =
    beneficeNet.toFixed(2) + " €";

  const elRef = document.getElementById("caRef");
  if (elRef) elRef.textContent = caRef.toFixed(2) + " €";
}

function renderRevenusParSource() {
  const container = document.getElementById("revenusParSource");

  const types = {
    intervention: {
      label: "Interventions",
      icon: "mdi:hand-holding-heart",
      color: "bg-cyan-500",
      ttc: 0,
      nb: 0,
    },
    abonnement: {
      label: "Abonnements",
      icon: "mdi:credit-card",
      color: "bg-purple-500",
      ttc: 0,
      nb: 0,
    },
    panier: {
      label: "Panier (articles + événements)",
      icon: "mdi:cart",
      color: "bg-blue-500",
      ttc: 0,
      nb: 0,
    },
    referencement: {
      label: "Référencement sponsorisé",
      icon: "mdi:star-circle",
      color: "bg-yellow-400",
      ttc: 0,
      nb: 0,
    },
  };

  allFactures.forEach((f) => {
    const t = f.type_achat || "";
    const key = t === "article" || t === "evenement" ? "panier" : t;
    if (types[key]) {
      types[key].ttc += Number(f.montant_ttc || 0);
      types[key].nb++;
    }
  });

  allRefs.forEach((r) => {
    types.referencement.ttc += Number(r.prix || 0);
    types.referencement.nb++;
  });

  const caTotal = Object.values(types).reduce((s, t) => s + t.ttc, 0) || 1;

  if (Object.values(types).every((t) => t.nb === 0)) {
    container.innerHTML = `<p class="text-gray-400 italic text-sm">Aucune donnée pour cette période.</p>`;
    return;
  }

  container.innerHTML = Object.entries(types)
    .map(([, t]) => {
      const pct = Math.round((t.ttc / caTotal) * 100);
      return `
    <div>
      <div class="flex items-center justify-between mb-1">
        <div class="flex items-center gap-2">
          <iconify-icon icon="${t.icon}" class="text-gray-500 text-lg"></iconify-icon>
          <span class="text-gray-600 text-sm font-fira">${t.label}</span>
          <span class="text-xs text-gray-300">(${t.nb})</span>
        </div>
        <span class="font-fira text-gray-700 text-sm">${t.ttc.toFixed(2)} €</span>
      </div>
      <div class="w-full bg-gray-100 rounded-full h-2">
        <div class="${t.color} h-2 rounded-full" style="width:${pct}%"></div>
      </div>
    </div>`;
    })
    .join("");
}

function renderTopPrestataires() {
  const container = document.getElementById("topPrestataires");
  const terminees = allInterventions.filter((i) => i.statut === "terminee");

  if (!terminees.length) {
    container.innerHTML = `<p class="text-gray-400 italic text-sm">Aucune intervention terminée.</p>`;
    return;
  }

  const proMap = {};
  terminees.forEach((i) => {
    const key = i.id_pro;
    if (!proMap[key]) {
      proMap[key] = {
        nom: `${i.prenom_pro || ""} ${i.nom_pro || ""}`.trim() || `Pro #${key}`,
        nb: 0,
        ca: 0,
        commission: 0,
        tauxCommission: 15,
        note: 0,
        sponsorise: false,
      };
    }
    proMap[key].nb++;
    proMap[key].ca += Number(i.prix || 0);
  });

  allProProfiles.forEach((p) => {
    if (proMap[p.id_user]) {
      proMap[p.id_user].tauxCommission = Number(p.commission || 15).toFixed(1);
      proMap[p.id_user].note = Number(p.note_moyenne || 0);
    }
  });

  allFactures
    .filter((f) => f.type_achat === "intervention")
    .forEach((f) => {
      if (proMap[f.id_emetteur]) {
        proMap[f.id_emetteur].commission += Number(f.commission_sh || 0);
      }
    });

  allRefs
    .filter((r) => r.actif)
    .forEach((r) => {
      if (proMap[r.id_pro]) proMap[r.id_pro].sponsorise = true;
    });

  const top = Object.values(proMap)
    .sort((a, b) => b.ca - a.ca)
    .slice(0, 5);

  container.innerHTML = top
    .map((p, idx) => {
      const etoiles =
        p.note > 0
          ? "★".repeat(Math.round(p.note)) + "☆".repeat(5 - Math.round(p.note))
          : "—";
      return `
    <div class="flex items-center gap-3 p-3 rounded-xl ${p.sponsorise ? "bg-yellow-50 border border-yellow-200" : "bg-gray-50"} hover:bg-gray-100 transition-all">
      <span class="w-7 h-7 rounded-full bg-purple-500 text-white text-xs font-fira flex items-center justify-center flex-shrink-0">${idx + 1}</span>
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2">
          <p class="font-fira text-gray-700 truncate">${esc(p.nom)}</p>
          ${p.sponsorise ? `<span class="text-xs bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full"><iconify-icon icon="mdi:star-circle"></iconify-icon></span>` : ""}
        </div>
        <p class="text-xs text-gray-400">${p.nb} intervention${p.nb > 1 ? "s" : ""} · <span class="text-yellow-400">${etoiles}</span></p>
        <p class="text-xs text-gray-300">Commission : ${p.tauxCommission}% · Encaissé SH : ${p.commission.toFixed(2)} €</p>
      </div>
      <span class="font-fira text-gray-800 text-sm flex-shrink-0">${p.ca.toFixed(2)} €</span>
    </div>`;
    })
    .join("");
}

function renderAbonnementsDetail() {
  const container = document.getElementById("abonnementsDetail");

  const aboSeniors = allSeniorProfiles.filter(
    (p) => p.is_subscription_valid,
  ).length;
  const aboPros = allProProfiles.filter((p) => p.is_subscription_valid).length;
  const totalActifs = aboSeniors + aboPros;
  const inactifsS = allSeniorProfiles.filter(
    (p) => !p.is_subscription_valid,
  ).length;
  const inactifsP = allProProfiles.filter(
    (p) => !p.is_subscription_valid,
  ).length;
  const totalInact = inactifsS + inactifsP;
  const totalProfils = totalActifs + totalInact;
  const tauxAct =
    totalProfils > 0 ? ((totalActifs / totalProfils) * 100).toFixed(0) : 0;
  const mrrEstime = (aboSeniors + aboPros) * 4;
  const arrEstime = mrrEstime * 12;

  container.innerHTML = `
    <div class="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
      <p class="text-2xl font-fira text-green-700">${totalActifs}</p>
      <p class="text-xs text-green-600 uppercase tracking-widest mt-1">Abonnés actifs</p>
      <p class="text-xs text-green-400 mt-0.5">${aboSeniors} seniors · ${aboPros} pros</p>
    </div>
    <div class="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
      <p class="text-2xl font-fira text-red-500">${totalInact}</p>
      <p class="text-xs text-red-500 uppercase tracking-widest mt-1">Sans abonnement</p>
      <p class="text-xs text-red-300 mt-0.5">${inactifsS} seniors · ${inactifsP} pros</p>
    </div>
    <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
      <p class="text-2xl font-fira text-blue-700">${mrrEstime.toFixed(0)} €</p>
      <p class="text-xs text-blue-600 uppercase tracking-widest mt-1">MRR estimé</p>
      <p class="text-xs text-blue-400 mt-0.5">Revenu mensuel min.</p>
    </div>
    <div class="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
      <p class="text-2xl font-fira text-yellow-700">${arrEstime.toFixed(0)} €</p>
      <p class="text-xs text-yellow-600 uppercase tracking-widest mt-1">ARR estimé</p>
      <p class="text-xs text-yellow-400 mt-0.5">Revenu annuel min.</p>
    </div>
    <div class="bg-gray-800 text-white rounded-xl p-4 text-center">
      <p class="text-2xl font-fira">${tauxAct}%</p>
      <p class="text-xs opacity-60 uppercase tracking-widest mt-1">Taux activation</p>
      <p class="text-xs opacity-40 mt-0.5">${totalActifs} / ${totalProfils}</p>
    </div>`;
}

function renderInterventionsRecentes() {
  const container = document.getElementById("interventionsRecentes");
  const filtreStatut = document.getElementById("filtreInterStatut").value;
  const periode = getPeriodeDates();

  let inter = [...allInterventions];
  if (periode)
    inter = inter.filter((i) => {
      const d = new Date(i.date_heure_debut);
      return d >= periode.debut && d <= periode.fin;
    });
  if (filtreStatut !== "tous")
    inter = inter.filter((i) => i.statut === filtreStatut);
  inter = inter
    .sort((a, b) => new Date(b.date_heure_debut) - new Date(a.date_heure_debut))
    .slice(0, 8);

  if (!inter.length) {
    container.innerHTML = `<p class="text-gray-400 italic text-sm">Aucune intervention.</p>`;
    return;
  }

  const sc = {
    planifiee: "text-blue-500 bg-blue-50",
    en_cours: "text-yellow-600 bg-yellow-50",
    terminee: "text-green-600 bg-green-50",
    annulee: "text-red-500 bg-red-50",
  };

  container.innerHTML = inter
    .map((i) => {
      const date = new Date(i.date_heure_debut).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
      });
      return `
    <div class="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
      <div class="text-xs text-gray-400 flex-shrink-0 w-10">${date}</div>
      <div class="flex-1 min-w-0">
        <p class="font-fira text-gray-700 text-sm truncate">${esc(i.nom_service || "—")}</p>
        <p class="text-xs text-gray-400">${esc(i.prenom_pro || "")} ${esc(i.nom_pro || "")} → ${esc(i.prenom_senior || "")} ${esc(i.nom_senior || "")}</p>
      </div>
      <span class="text-xs font-fira px-2 py-0.5 rounded-full ${sc[i.statut] || "text-gray-500 bg-gray-50"} flex-shrink-0">${i.statut}</span>
      <span class="text-sm font-fira text-gray-600 flex-shrink-0">${Number(i.prix || 0).toFixed(0)} €</span>
    </div>`;
    })
    .join("");
}

function renderDerniersInscrits() {
  const tbody = document.getElementById("derniersInscrits");
  const filtreRole = document.getElementById("filtreUserRole").value;

  let users = allUsers.filter((u) => u.role !== "admin");
  if (filtreRole !== "tous") users = users.filter((u) => u.role === filtreRole);
  users = users.slice(0, 10);

  if (!users.length) {
    tbody.innerHTML = `<tr><td colspan="3" class="text-center py-4 text-gray-400 italic">Aucun.</td></tr>`;
    return;
  }

  const seniorMap = {};
  allSeniorProfiles.forEach((p) => {
    seniorMap[p.id_user] = p.is_subscription_valid;
  });
  const proMap = {};
  allProProfiles.forEach((p) => {
    proMap[p.id_user] = p.is_subscription_valid;
  });

  const roleCss = {
    senior: "bg-blue-100 text-blue-700",
    pro: "bg-purple-100 text-purple-700",
  };

  tbody.innerHTML = users
    .map((u) => {
      const isValid =
        u.role === "senior" ? seniorMap[u.id_user] : proMap[u.id_user];
      return `
    <tr class="hover:bg-gray-50">
      <td class="py-2 px-2 text-gray-700 text-xs truncate max-w-[150px]">${esc(u.email)}</td>
      <td class="py-2 px-2"><span class="text-xs px-2 py-0.5 rounded-full font-fira ${roleCss[u.role] || "bg-gray-100 text-gray-500"}">${u.role}</span></td>
      <td class="py-2 px-2"><span class="text-xs px-2 py-0.5 rounded-full font-fira ${isValid ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"}">${isValid ? "✓ Actif" : "Inactif"}</span></td>
    </tr>`;
    })
    .join("");
}

function renderFacturesParType() {
  const tbody = document.getElementById("facturesParType");
  const tfoot = document.getElementById("facturesTotal");
  const filtreType = document.getElementById("filtreFactureType").value;

  let factures = allFactures.map((f) => ({
    ...f,
    type_achat:
      f.type_achat === "article" || f.type_achat === "evenement"
        ? "panier"
        : f.type_achat || "autre",
  }));
  if (filtreType !== "tous")
    factures = factures.filter((f) => f.type_achat === filtreType);

  const types = {};
  factures.forEach((f) => {
    const t = f.type_achat;
    if (!types[t]) types[t] = { nb: 0, ttc: 0, commission: 0 };
    types[t].nb++;
    types[t].ttc += Number(f.montant_ttc || 0);
    types[t].commission += Number(f.commission_sh || 0);
  });

  if (filtreType === "tous" || filtreType === "referencement") {
    if (!types.referencement)
      types.referencement = { nb: 0, ttc: 0, commission: 0 };
    allRefs.forEach((r) => {
      types.referencement.nb++;
      types.referencement.ttc += Number(r.prix || 0);
    });
  }

  const labels = {
    intervention: "Prestation de service",
    abonnement: "Abonnement",
    panier: "Panier (articles + événements)",
    referencement: "Référencement sponsorisé",
    autre: "Autre",
  };

  const totalNb = Object.values(types).reduce((s, t) => s + t.nb, 0);
  const totalTTC = Object.values(types).reduce((s, t) => s + t.ttc, 0);
  const totalCom = Object.values(types).reduce((s, t) => s + t.commission, 0);
  const gainPro = totalTTC - totalCom;

  if (!Object.keys(types).length) {
    tbody.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-gray-400 italic">Aucune facture.</td></tr>`;
    tfoot.innerHTML = "";
    return;
  }

  tbody.innerHTML = Object.entries(types)
    .map(
      ([key, t]) => `
    <tr class="hover:bg-gray-50">
      <td class="py-3 px-4 font-fira text-gray-700">${labels[key] || key}</td>
      <td class="py-3 px-4 text-right text-gray-500">${t.nb}</td>
      <td class="py-3 px-4 text-right font-fira text-gray-700">${t.ttc.toFixed(2)} €</td>
      <td class="py-3 px-4 text-right font-fira text-green-600">${t.commission.toFixed(2)} €</td>
      <td class="py-3 px-4 text-right font-fira text-blue-600">${(t.ttc - t.commission).toFixed(2)} €</td>
    </tr>`,
    )
    .join("");

  tfoot.innerHTML = `
    <tr class="border-t-2 border-gray-200 bg-gray-50 font-bold">
      <td class="py-3 px-4 font-fira text-gray-800">TOTAL</td>
      <td class="py-3 px-4 text-right font-fira text-gray-800">${totalNb}</td>
      <td class="py-3 px-4 text-right font-fira text-gray-800">${totalTTC.toFixed(2)} €</td>
      <td class="py-3 px-4 text-right font-fira text-green-700">${totalCom.toFixed(2)} €</td>
      <td class="py-3 px-4 text-right font-fira text-blue-700">${gainPro.toFixed(2)} €</td>
    </tr>`;
}

async function fetchJSON(path) {
  try {
    const res = await fetch(`${API_BASE}${path}`);
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
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
