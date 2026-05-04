async function ajouterAuPanier(typeObjet, idObjet, quantite = 1) {
  const userId = Number(localStorage.getItem("id_user"));
  if (!userId) return;

  try {
    const res = await fetch(`${API_BASE}/admin/panier/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_user: userId,
        type_objet: typeObjet,
        id_objet: idObjet,
        quantite: quantite,
      }),
    });
    if (!res.ok) throw new Error();
    showToast("Ajouté au panier !", "success");

    await updateBadgePanier();
  } catch {
    showToast("Erreur lors de l'ajout au panier.", "error");
  }
}

async function updateBadgePanier() {
  try {
    const userId = Number(localStorage.getItem("id_user"));
    const res = await fetch(`${API_BASE}/admin/panier/get?id_user=${userId}`);
    const data = await res.json();
    const items = Array.isArray(data) ? data : [];
    const total = items.reduce((acc, i) => acc + i.quantite, 0);

    document.querySelectorAll(".badge-panier").forEach((el) => {
      el.textContent = total;
      el.classList.toggle("hidden", total === 0);
    });
  } catch {}
}

document.addEventListener("DOMContentLoaded", updateBadgePanier);
