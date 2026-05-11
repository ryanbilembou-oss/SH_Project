const API_BASE = "http://localhost:8082";
const userId = Number(localStorage.getItem("id_user"));
const role = localStorage.getItem("role");

if (!userId || role !== "senior") {
  window.location.href = "/users/login.php";
}

let abonnementActuel = null;
let isRenouvellement = false;

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("success") === "1") {
  setTimeout(
    () =>
      showToast("Paiement réussi ! Votre abonnement est activé.", "success"),
    500,
  );
  window.history.replaceState({}, "", window.location.pathname);
} else if (urlParams.get("cancelled") === "1") {
  setTimeout(() => showToast("Paiement annulé.", "error"), 500);
  window.history.replaceState({}, "", window.location.pathname);
}

(async () => {
  await loadAbonnement();
})();

async function loadAbonnement() {
  try {
    const res = await fetch(
      `${API_BASE}/admin/abonnement/get_by_user?id=${userId}`,
    );
    const data = await res.json();

    if (data && data.id_abonnement) {
      abonnementActuel = data;
      const dateFin = new Date(data.date_fin);
      const now = new Date();
      const estExpire = dateFin < now;
      const estResilie = data.statut === "resilie";

      if (estExpire) {
        isRenouvellement = true;
        afficherChoix();
      } else if (estResilie) {
        afficherAbonnement(data, true);
      } else {
        afficherAbonnement(data, false);
      }
    } else {
      afficherChoix();
    }
  } catch {
    afficherChoix();
  }
}

function afficherAbonnement(abo, estResilie) {
  document.getElementById("abonnementActif").classList.remove("hidden");
  document.getElementById("choixAbonnement").classList.add("hidden");

  const type = abo.type_abonnement === "mensuel" ? "Mensuel" : "Annuel";
  document.getElementById("aboType").textContent = `Abonnement ${type}`;
  document.getElementById("aboPrix").textContent =
    `${abo.prix_abonnement} € / ${abo.type_abonnement === "mensuel" ? "mois" : "an"}`;

  const dateDebut = new Date(abo.date_debut).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const dateFin = new Date(abo.date_fin).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  document.getElementById("aboDebut").textContent = dateDebut;
  document.getElementById("aboFin").textContent = dateFin;

  const badge = document.getElementById("aboBadge");
  if (estResilie) {
    badge.textContent = "Résilié";
    badge.className =
      "px-4 py-2 rounded-full font-black text-sm uppercase bg-orange-100 text-orange-600";
    document.getElementById("msgResiliation").classList.remove("hidden");
    document.getElementById("aboFinResiliation").textContent = dateFin;
    document.getElementById("btnResilier").classList.add("hidden");
  } else {
    badge.textContent = "Actif";
    badge.className =
      "px-4 py-2 rounded-full font-black text-sm uppercase bg-emerald-100 text-emerald-700";
    document.getElementById("msgResiliation").classList.add("hidden");
    document.getElementById("btnResilier").classList.remove("hidden");
  }
}

function afficherChoix() {
  document.getElementById("abonnementActif").classList.add("hidden");
  document.getElementById("choixAbonnement").classList.remove("hidden");

  if (isRenouvellement) {
    document.getElementById("badgeRenouvellement").classList.remove("hidden");
    document.getElementById("prixMensuel").textContent = "3";
    document.getElementById("prixAnnuel").textContent = "30";
    document.getElementById("ancienPrixMensuel").classList.remove("hidden");
    document.getElementById("ancienPrixAnnuel").classList.remove("hidden");
  } else {
    document.getElementById("badgeRenouvellement").classList.add("hidden");
    document.getElementById("prixMensuel").textContent = "4";
    document.getElementById("prixAnnuel").textContent = "40";
    document.getElementById("ancienPrixMensuel").classList.add("hidden");
    document.getElementById("ancienPrixAnnuel").classList.add("hidden");
  }
}

async function souscrire(type) {
  let prix;
  if (type === "mensuel") {
    prix = isRenouvellement ? 300 : 400;
  } else {
    prix = isRenouvellement ? 3000 : 4000;
  }

  try {
    const res = await fetch(`${API_BASE}/admin/stripe/checkout/abonnement`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_user: userId,
        type_abonnement: type,
        prix: prix,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      showToast(err.erreur || "Erreur", "error");
      return;
    }

    const data = await res.json();
    window.location.href = data.url;
  } catch {
    showToast("Erreur lors de la redirection vers le paiement.", "error");
  }
}

function resilier() {
  const modal = document.getElementById("modalResiliation");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  setTimeout(() => modal.classList.remove("opacity-0"), 10);
}

function fermerModalResiliation() {
  const modal = document.getElementById("modalResiliation");
  modal.classList.add("opacity-0");
  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }, 300);
}

async function confirmerResiliation() {
  fermerModalResiliation();
  try {
    const res = await fetch(`${API_BASE}/admin/abonnement/resilier`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_user: userId }),
    });

    if (!res.ok) throw new Error();

    showToast(
      "Abonnement résilié. Il reste actif jusqu'à la fin de la période.",
      "success",
    );
    setTimeout(() => loadAbonnement(), 1500);
  } catch {
    showToast("Erreur lors de la résiliation.", "error");
  }
}

function showToast(message, type = "info") {
  const toast = document.getElementById("toast");
  const msg = document.getElementById("toastMsg");
  const icon = document.getElementById("toastIcon");
  msg.textContent = message;
  icon.textContent = type === "success" ? "✓" : type === "error" ? "✗" : "i";
  toast.classList.remove("-translate-y-20", "opacity-0");
  toast.classList.add("translate-y-0", "opacity-100");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => {
    toast.classList.remove("translate-y-0", "opacity-100");
    toast.classList.add("-translate-y-20", "opacity-0");
  }, 3000);
}
