<?php require_once('../../auth.php'); ?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy - Prestataires</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:wght@400;700;900&display=swap" rel="stylesheet">
    <link rel="icon" href="/img/logo-clear.png">
    <script src="/js/include/zoom_ihm.js"></script>
    <style>
        body { font-family: 'Fira Sans Condensed', sans-serif; background-color: #FFFFF6; font-size: 18px; }
        .card-pro { transition: all 0.3s ease; }
        .panel-slide { transition: transform 0.4s ease; }
    </style>
</head>
<body class="bg-[#FFFFF6] min-h-screen">

    <div id="toast" class="fixed top-6 left-1/2 transform -translate-x-1/2 -translate-y-20 opacity-0 z-50 transition-all duration-500 pointer-events-none">
        <div class="bg-[#1A2B49] text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3">
            <span id="toastIcon" class="text-lg"></span>
            <span id="toastMsg" class="font-fira uppercase text-sm tracking-widest">Message</span>
        </div>
    </div>

    <?php include('../include/navbar.php'); ?>

    <main class="container mx-auto max-w-7xl px-4 py-10">
        <div class="mb-8">
            <h2 class="text-5xl font-fira uppercase tracking-tighter text-[#1A2B49]">
                Nos <span class="text-[#7CABD3]">Prestataires</span>
            </h2>
            <p class="text-gray-400 mt-1 text-lg">Trouvez le prestataire ideal pour vos besoins.</p>
        </div>

        <div class="flex gap-8">
            <!-- Filtres -->
            <div class="w-72 flex-shrink-0">
                <div class="bg-white rounded-[30px] border-2 border-gray-100 p-6 sticky top-24">
                    <h3 class="font-fira uppercase text-[#1A2B49] text-lg mb-6 tracking-tight">Filtres</h3>

                    <div class="mb-5">
                        <label class="font-fira uppercase text-xs tracking-widest text-gray-400 mb-2 block">Recherche</label>
                        <input type="text" id="filtreRecherche" placeholder="Nom, entreprise..."
                            oninput="appliquerFiltres()"
                            class="w-full border-2 border-gray-100 rounded-[15px] px-4 py-2 font-fira text-sm focus:outline-none focus:border-[#7CABD3]">
                    </div>

                    <div class="mb-5">
                        <label class="font-fira uppercase text-xs tracking-widest text-gray-400 mb-2 block">Categorie</label>
                        <select id="filtreCategorie" onchange="appliquerFiltres()"
                            class="w-full border-2 border-gray-100 rounded-[15px] px-4 py-2 font-fira text-sm focus:outline-none focus:border-[#7CABD3] bg-white">
                            <option value="">Toutes les categories</option>
                        </select>
                    </div>

                    <div class="mb-5">
                        <label class="font-fira uppercase text-xs tracking-widest text-gray-400 mb-2 block">Note minimum</label>
                        <div class="flex items-center gap-3">
                            <input type="range" id="filtreNote" min="0" max="5" step="0.5" value="0"
                                oninput="document.getElementById('noteVal').textContent = this.value; appliquerFiltres()"
                                class="flex-1 accent-[#7CABD3]">
                            <span id="noteVal" class="font-fira text-[#1A2B49] w-6">0</span>
                        </div>
                    </div>

                    <div class="mb-5">
                        <label class="font-fira uppercase text-xs tracking-widest text-gray-400 mb-2 block">Prix max (€)</label>
                        <div class="flex items-center gap-3">
                            <input type="range" id="filtrePrix" min="0" max="200" step="5" value="200"
                                oninput="document.getElementById('prixVal').textContent = this.value + '€'; appliquerFiltres()"
                                class="flex-1 accent-[#7CABD3]">
                            <span id="prixVal" class="font-fira text-[#1A2B49] w-10">200€</span>
                        </div>
                    </div>

                    <div class="mb-5">
                        <label class="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" id="filtreRef" onchange="appliquerFiltres()"
                                class="w-5 h-5 rounded accent-[#FCE297]">
                            <span class="font-fira text-sm text-[#1A2B49]">Référencés uniquement</span>
                        </label>
                    </div>

                    <div class="mb-5">
                        <label class="font-fira uppercase text-xs tracking-widest text-gray-400 mb-2 block">Trier par</label>
                        <select id="filtreTri" onchange="appliquerFiltres()"
                            class="w-full border-2 border-gray-100 rounded-[15px] px-4 py-2 font-fira text-sm focus:outline-none focus:border-[#7CABD3] bg-white">
                            <option value="ref_note">Referencement puis note</option>
                            <option value="note">Meilleure note</option>
                            <option value="prix_asc">Prix croissant</option>
                            <option value="prix_desc">Prix decroissant</option>
                        </select>
                    </div>

                    <button onclick="resetFiltres()"
                        class="w-full py-2 border-2 border-gray-200 text-gray-400 rounded-full font-fira uppercase text-sm hover:border-[#7CABD3] hover:text-[#7CABD3] transition-all">
                        Reinitialiser
                    </button>
                </div>
            </div>

            <!-- Liste pros -->
            <div class="flex-1">
                <div id="statsBar" class="flex items-center justify-between mb-4">
                    <p class="text-gray-400 font-fira text-sm" id="nbResultats">Chargement...</p>
                </div>
                <div id="prosList" class="grid grid-cols-1 md:grid-cols-2 gap-5"></div>
            </div>
        </div>
    </main>

    <!-- Panel profil pro -->
    <div id="panelOverlay" class="fixed inset-0 bg-black/40 z-40 hidden" onclick="fermerPanel()"></div>
    <div id="panelPro" class="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl z-50 transform translate-x-full panel-slide overflow-y-auto">
        <div class="sticky top-0 bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between z-10">
            <h3 class="font-fira text-2xl uppercase text-[#1A2B49]" id="panelNom">Profil</h3>
            <button onclick="fermerPanel()" class="w-10 h-10 rounded-full border-2 border-gray-200 text-gray-400 hover:border-red-400 hover:text-red-400 transition-all flex items-center justify-center">
                <iconify-icon icon="mdi:close"></iconify-icon>
            </button>
        </div>
        <div id="panelContent" class="p-8"></div>
    </div>

    <?php include('../include/footer.php'); ?>
    <script src="/js/users/senior/prestataires.js?v=<?php echo time(); ?>"></script>
    <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script>

<script src="/js/include/onesignal.js" defer></script>

<script src="/js/include/notifications.js?v=<?php echo time(); ?>"></script>
</body>
</html>