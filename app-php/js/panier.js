window.addEventListener("load", () => {
  console.log("Panier.js chargé et prêt !");

  const liste = document.getElementById("liste-panier");
  const totalAffichage = document.getElementById("total-prix");

  const data = localStorage.getItem("panier_silver");
  console.log("Données trouvées :", data);

  const panier = data ? JSON.parse(data) : [];

  if (panier.length === 0) {
    liste.innerHTML = `
          <div class="text-center py-10">
              <p class="text-gray-400 italic text-xl">Votre panier est vide.</p>
              <a href="boutique.php" class="text-[#7CABD3] mt-4 inline-block underline">Retourner faire des achats</a>
          </div>`;
    totalAffichage.innerText = "0.00 €";
    return;
  }

  let html = "";
  let totalCents = 0;

  panier.forEach((item) => {
    const sousTotal = item.prix * item.quantite;
    totalCents += sousTotal;

    html += `
          <div class="flex justify-between items-center bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-4 shadow-sm">
              <div>
                  <h3 class="text-xl font-bold text-[#1A2B49]">${item.nom}</h3>
                  <p class="text-sm text-gray-500 font-medium">Prix : ${
                    item.prix
                  } € | Quantité : ${item.quantite}</p>
              </div>
              <span class="text-2xl font-black text-[#16a34a]">${sousTotal.toFixed(
                2
              )} €</span>
          </div>
      `;
  });

  liste.innerHTML = html;
  totalAffichage.innerText = totalCents.toFixed(2) + " €";

  const btnVider = document.getElementById("btn-vider");
  if (btnVider) {
    btnVider.addEventListener("click", () => {
      if (confirm("Voulez-vous vraiment vider tout votre panier ?")) {
        localStorage.removeItem("panier_silver");
        location.reload();
      }
    });
  }

  const btnPayer = document.getElementById("btn-payer");
  if (btnPayer) {
    btnPayer.addEventListener("click", () => {
      btnPayer.innerText = "Vérification en cours...";
      btnPayer.classList.add("opacity-50", "cursor-not-allowed");

      setTimeout(() => {
        alert("Paiement réussi ! Merci de votre confiance.");
        localStorage.removeItem("panier_silver");
        window.location.href = "boutique.php";
      }, 1500);
    });
  }
});
