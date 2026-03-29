document.addEventListener("DOMContentLoaded", () => {
  const compteur = document.getElementById("compteurPanier");

  const rafraichirCompteur = () => {
    const panier = JSON.parse(localStorage.getItem("panier_silver")) || [];
    const total = panier.reduce((acc, item) => acc + item.quantite, 0);
    if (compteur) {
      compteur.innerText = total;
    }
  };

  rafraichirCompteur();

  const boutons = document.querySelectorAll(".btn-ajouter");

  boutons.forEach((bouton) => {
    bouton.addEventListener("click", () => {
      const id = bouton.getAttribute("data-id");
      const nom = bouton.getAttribute("data-nom");
      const prix = parseFloat(bouton.getAttribute("data-prix"));

      let panier = JSON.parse(localStorage.getItem("panier_silver")) || [];

      const produitExistant = panier.find((item) => item.id === id);

      if (produitExistant) {
        produitExistant.quantite += 1;
      } else {
        panier.push({ id, nom, prix, quantite: 1 });
      }

      localStorage.setItem("panier_silver", JSON.stringify(panier));

      rafraichirCompteur();

      console.log(`Ajouté : ${nom}`);
    });
  });
});
