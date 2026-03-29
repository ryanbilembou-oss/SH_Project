document.addEventListener("DOMContentLoaded", () => {
  const barreRecherche = document.getElementById("barreRecherche");
  const articles = document.querySelectorAll(".produit-item");

  barreRecherche.addEventListener("input", (e) => {
    const recherche = e.target.value.toLowerCase();

    articles.forEach((article) => {
      const nomProduit = article.querySelector("h2").innerText.toLowerCase();

      if (nomProduit.startsWith(recherche)) {
        article.style.display = "flex";
      } else {
        article.style.display = "none";
      }
    });
  });
});
