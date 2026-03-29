const API_BASE = "http://localhost:8082";
const userId = Number(localStorage.getItem("id_user"));
const role = localStorage.getItem("role");

if (!userId || role !== "senior") {
  window.location.href = "/users/login.php";
}

let tousServices = [];
let selectedServiceId = null;

(async () => {
  await loadServices();
  initModal();
})();

async function loadServices() {
  try {
    const res = await fetch(`${API_BASE}/admin/service/get`);
    tousServices = await res.json();
    renderCategories();
    renderServices(tousServices);
  } catch {
    document.getElementById("servicesList").innerHTML =
      `<p class="text-red-400 text-center col-span-3">Erreur de chargement.</p>`;
  }
}

function renderCategories() {
  const cats = [
    ...new Set(tousServices.map((s) => s.nom_categorie).filter(Boolean)),
  ];
  const container = document.getElementById("filtresCat");
  container.querySelectorAll(".btn-cat").forEach((b) => b.remove());
  cats.forEach((cat) => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.className =
      "btn-cat px-5 py-2 rounded-full font-bold text-sm bg-white border-2 border-[#7CABD3] text-[#7CABD3] hover:bg-[#7CABD3] hover:text-white transition-all";
    btn.onclick = () => filtrerCategorie(cat);
    container.appendChild(btn);
  });
}

function filtrerCategorie(cat) {
  const filtered = cat
    ? tousServices.filter((s) => s.nom_categorie === cat)
    : tousServices;
  renderServices(filtered);
}

function renderServices(services) {
  const container = document.getElementById("servicesList");
  if (!services.length) {
    container.innerHTML = `<p class="text-gray-400 italic text-center col-span-3 py-10">Aucun service disponible.</p>`;
    return;
  }

  container.innerHTML = services
    .map(
      (s) => `
    <div class="group bg-white p-8 rounded-[40px] border-2 border-transparent hover:border-[#7CABD3] hover:shadow-xl transition-all duration-500">
      <div class="flex justify-between items-start mb-4">
        <span class="bg-[#7CABD3]/10 text-[#7CABD3] text-sm font-black px-3 py-1 rounded-full">${esc(s.nom_categorie || "Service")}</span>
        <span class="font-black text-[#1A2B49] text-lg">${s.prix ? s.prix + " €/h" : "Sur devis"}</span>
      </div>
      <h4 class="font-black text-[#1A2B49] text-2xl mb-3">${esc(s.nom)}</h4>
      <p class="text-base text-gray-400 mb-6 leading-relaxed">${esc(s.description || "")}</p>
      <button onclick="ouvrirModalService(${s.id})"
        class="w-full py-3 bg-[#1A2B49] text-white rounded-full font-black text-sm uppercase hover:bg-[#7CABD3] transition-all">
        Demander ce service
      </button>
    </div>`,
    )
    .join("");
}

function ouvrirModalService(id) {
  selectedServiceId = id;
  const s = tousServices.find((sv) => sv.id === id);
  if (!s) return;
  document.getElementById("modalServiceTitre").textContent = s.nom;
  document.getElementById("modalServiceDesc").textContent = s.description || "";
  document.getElementById("modalServicePrix").textContent = s.prix
    ? `${s.prix} €/h`
    : "Sur devis";
  document.getElementById("dateService").value = "";
  document.getElementById("messageService").value = "";
  const modal = document.getElementById("modalService");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  setTimeout(() => modal.classList.remove("opacity-0"), 10);
}

function fermerModalService() {
  const modal = document.getElementById("modalService");
  modal.classList.add("opacity-0");
  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }, 300);
}

async function demanderService() {
  const date = document.getElementById("dateService").value;
  if (!date) {
    showToast("Veuillez choisir une date.", "error");
    return;
  }

  const btn = document.getElementById("btnDemanderService");
  btn.disabled = true;
  btn.textContent = "Envoi...";

  try {
    const res = await fetch(`${API_BASE}/admin/devis/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_senior: userId,
        id_service: selectedServiceId,
        date_demande: date,
        message: document.getElementById("messageService").value,
        statut: "en_attente",
      }),
    });
    if (!res.ok) throw new Error();
    showToast("Demande envoyée ! Un prestataire vous contactera.", "success");
    fermerModalService();
  } catch {
    showToast("Erreur lors de l'envoi.", "error");
  } finally {
    btn.disabled = false;
    btn.textContent = "Envoyer la demande";
  }
}

function initModal() {
  document
    .getElementById("btnCancelService")
    .addEventListener("click", fermerModalService);
  document
    .getElementById("btnDemanderService")
    .addEventListener("click", demanderService);
}

function showToast(message, type = "info") {
  const toast = document.getElementById("toast");
  const msg = document.getElementById("toastMsg");
  const icon = document.getElementById("toastIcon");
  msg.textContent = message;
  icon.textContent = type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️";
  toast.classList.remove("-translate-y-20", "opacity-0");
  toast.classList.add("translate-y-0", "opacity-100");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => {
    toast.classList.remove("translate-y-0", "opacity-100");
    toast.classList.add("-translate-y-20", "opacity-0");
  }, 3000);
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
