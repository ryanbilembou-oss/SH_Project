const API_BASE = "http://localhost:8082";
const userId = Number(localStorage.getItem("id_user"));
const role = localStorage.getItem("role");

if (!userId || role !== "senior") window.location.href = "/users/login.php";

let tousConseils = [];

(async () => {
  await loadConseils();
})();

async function loadConseils() {
  try {
    const res = await fetch(`${API_BASE}/admin/conseil/get`);
    tousConseils = await res.json();
    if (!Array.isArray(tousConseils)) tousConseils = [];
    renderCategories();
    renderConseils(tousConseils);
  } catch {
    document.getElementById("conseilsList").innerHTML =
      `<p class="text-red-400 text-center col-span-3">Erreur de chargement.</p>`;
  }
}

function renderCategories() {
  const cats = [
    ...new Set(tousConseils.map((c) => c.categorie).filter(Boolean)),
  ];
  const container = document.getElementById("filtresCat");
  container.querySelectorAll(".btn-cat").forEach((b) => b.remove());
  cats.forEach((cat) => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.className =
      "btn-cat px-5 py-2 rounded-full font-bold text-sm bg-white border-2 border-[#7CABD3] text-[#7CABD3] hover:bg-[#7CABD3] hover:text-white transition-all";
    btn.onclick = () => filtrer(cat);
    container.appendChild(btn);
  });
}

function filtrer(cat) {
  const filtered = cat
    ? tousConseils.filter((c) => c.categorie === cat)
    : tousConseils;
  renderConseils(filtered);
}

function renderConseils(conseils) {
  const container = document.getElementById("conseilsList");
  if (!conseils.length) {
    container.innerHTML = `<p class="text-gray-400 italic text-center col-span-3 py-10">Aucun conseil disponible.</p>`;
    return;
  }
  container.innerHTML = conseils
    .map(
      (c) => `
    <div class="group bg-white p-8 rounded-[40px] border-2 border-transparent hover:border-[#7CABD3] hover:shadow-xl transition-all duration-500">
      ${c.categorie ? `<span class="bg-[#7CABD3]/10 text-[#7CABD3] text-sm font-black px-3 py-1 rounded-full">${esc(c.categorie)}</span>` : ""}
      <h4 class="font-black text-[#1A2B49] text-xl mt-4 mb-3">${esc(c.titre)}</h4>
      <p class="text-base text-gray-400 leading-relaxed">${esc(c.contenu || "")}</p>
      ${c.auteur ? `<p class="text-sm text-gray-300 mt-4 font-bold">Par ${esc(c.auteur)}</p>` : ""}
    </div>`,
    )
    .join("");
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
