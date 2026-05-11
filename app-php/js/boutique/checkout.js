async function acheterArticle(event, articleId) {
  const btn = event.currentTarget;
  const iconNormal = btn.innerHTML;

  btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
  btn.disabled = true;

  try {
    const response = await fetch("http://144.76.74.130:8082/payments/article", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ article_id: articleId }),
    });

    if (!response.ok) {
      throw new Error(`Statut HTTP: ${response.status}`);
    }

    const data = await response.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      throw new Error("Format de réponse Stripe invalide.");
    }
  } catch (error) {
    console.error("Échec de la transaction :", error);
    alert("Impossible d'initialiser le paiement sécurisé. Veuillez réessayer.");

    btn.innerHTML = iconNormal;
    btn.disabled = false;
  }
}
