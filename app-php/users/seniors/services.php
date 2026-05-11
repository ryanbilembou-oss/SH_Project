<?php
require_once('../../auth.php');

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy - Services</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:wght@400;700;900&display=swap" rel="stylesheet">
    <link rel="icon" href="/img/logo-clear.png">
    <style>
        body { font-family: 'Fira Sans Condensed', sans-serif; background-color: #FFFFF6; font-size: 18px; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .panel-pro { transition: all 0.3s ease; }
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
                Nos <span class="text-[#7CABD3]">services</span>
            </h2>
            <p class="text-gray-400 mt-1 text-lg">Trouvez le service adapté à vos besoins.</p>
        </div>

        
        <div class="flex flex-wrap gap-3 mb-6">
            <button onclick="changerVue('tous')" id="btn-vue-tous"
                class="btn-vue px-6 py-2 rounded-full font-fira text-sm uppercase transition-all bg-[#1A2B49] text-white">
                <iconify-icon icon="mdi:briefcase-search" class="mr-1"></iconify-icon> Tous les services
            </button>
            <button onclick="changerVue('en_cours')" id="btn-vue-en_cours"
                class="btn-vue px-6 py-2 rounded-full font-fira text-sm uppercase transition-all bg-white border-2 border-[#7CABD3] text-[#7CABD3] hover:bg-[#7CABD3] hover:text-white">
                <iconify-icon icon="mdi:clock-outline" class="mr-1"></iconify-icon> En cours
            </button>
            <button onclick="changerVue('terminees')" id="btn-vue-terminees"
                class="btn-vue px-6 py-2 rounded-full font-fira text-sm uppercase transition-all bg-white border-2 border-gray-300 text-gray-500 hover:bg-gray-200">
                <iconify-icon icon="mdi:check-circle-outline" class="mr-1"></iconify-icon> Terminées / Annulées
            </button>
        </div>

       
        <div id="barreRecherche" class="mb-8 space-y-4">
            <div class="relative">
                <iconify-icon icon="mdi:magnify" class="absolute left-5 top-1/2 -translate-y-1/2 text-2xl text-gray-300"></iconify-icon>
                <input type="text" id="inputRecherche" placeholder="Rechercher un service..."
                    oninput="appliquerFiltres()"
                    class="w-full pl-14 pr-6 py-4 bg-white border-2 border-transparent focus:border-[#7CABD3] rounded-[30px] outline-none font-fira text-[#1A2B49] text-lg shadow-sm transition-all">
            </div>
            <div class="flex flex-wrap gap-3" id="filtresCat">
                <button onclick="filtrerCategorie(null)" id="cat-tous"
                    class="btn-cat px-5 py-2 rounded-full font-fira text-sm bg-[#1A2B49] text-white transition-all">
                    Toutes catégories
                </button>
            </div>
        </div>

        
        <div id="servicesList" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-gray-200 text-center col-span-3">
                <p class="text-gray-400 italic">Chargement...</p>
            </div>
        </div>

    </main>
    <div id="overlayPrestataires" class="hidden fixed inset-0 bg-[#1A2B49]/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
    <div class="bg-[#FFFFF6] rounded-[40px] w-full max-w-6xl shadow-2xl flex flex-col" style="height: 85vh; margin-top: 0;">

        <div class="flex items-center justify-between p-5 border-b-2 border-gray-100 flex-shrink-0">
            <div>
                <h3 class="text-2xl font-fira uppercase text-[#1A2B49]" id="overlayServiceTitre"></h3>
                <p class="text-gray-400 text-sm" id="overlayNbPros"></p>
            </div>
            <button onclick="fermerOverlay()" class="w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-200 text-gray-400 hover:border-red-400 hover:text-red-400 transition-all flex-shrink-0">
                <iconify-icon icon="mdi:close"></iconify-icon>
            </button>
        </div>

        <div class="flex flex-wrap gap-3 px-5 py-3 border-b border-gray-100 flex-shrink-0">
            <select id="triPro" onchange="renderPrestataires()" class="px-4 py-2 border-2 border-gray-200 rounded-full font-fira text-sm focus:outline-none focus:border-[#7CABD3]">
                <option value="note">Meilleure note</option>
                <option value="prix_asc">Prix croissant</option>
                <option value="prix_desc">Prix decroissant</option>
            </select>
        </div>

        <div class="flex flex-1 overflow-hidden">
            <div class="w-full md:w-2/5 overflow-y-auto border-r border-gray-100 p-4" id="listePros"></div>
            <div class="hidden md:flex flex-col w-3/5 overflow-y-auto p-6" id="panelPro">
                <div class="flex-1 flex items-center justify-center text-center text-gray-300">
                    <div>
                        <iconify-icon icon="mdi:account-circle" class="text-8xl mb-4 block"></iconify-icon>
                        <p class="font-fira uppercase tracking-widest text-sm">Selectionnez un prestataire</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    <div id="modalDemande" class="fixed inset-0 bg-[#1A2B49]/70 backdrop-blur-sm hidden items-center justify-center z-[70] opacity-0 transition-opacity duration-300">
    <div class="bg-white rounded-[40px] p-10 max-w-lg w-full shadow-2xl mx-4">
        <div class="text-center mb-6">
            <iconify-icon icon="mdi:briefcase-check" class="text-5xl text-[#7CABD3] mb-3 block"></iconify-icon>
            <h3 class="text-2xl font-fira uppercase tracking-tighter text-[#1A2B49]" id="modalDemandeTitre"></h3>
            <p class="text-gray-400 mt-2 text-base" id="modalDemandePro"></p>
            <p class="text-2xl font-fira text-[#1A2B49] mt-3" id="modalDemandePrix"></p>
        </div>

        <div id="warningDemande" class="hidden mb-4 bg-yellow-50 border-2 border-[#FCE297] rounded-[20px] p-3">
            <p class="font-fira text-sm text-yellow-700">Vous avez deja une demande en cours avec ce prestataire.</p>
        </div>

<div id="etapeJour">
    <p class="font-fira uppercase text-xs tracking-widest text-gray-400 mb-3">Choisissez un jour disponible</p>
    <div id="moisNav" class="flex justify-between items-center mb-3">
        <button onclick="moisPrecedent()" class="w-8 h-8 rounded-full border-2 border-gray-200 text-gray-400 hover:border-[#7CABD3] hover:text-[#7CABD3] flex items-center justify-center">
            <iconify-icon icon="mdi:chevron-left"></iconify-icon>
        </button>
        <span id="moisLabel" class="font-fira text-[#1A2B49] text-sm uppercase"></span>
        <button onclick="moisSuivant()" class="w-8 h-8 rounded-full border-2 border-gray-200 text-gray-400 hover:border-[#7CABD3] hover:text-[#7CABD3] flex items-center justify-center">
            <iconify-icon icon="mdi:chevron-right"></iconify-icon>
        </button>
    </div>
    <div id="calendarMini" class="grid grid-cols-7 gap-1 mb-4"></div>
    <button onclick="fermerModalDemande()"
        class="w-full py-3 border-2 border-gray-200 text-gray-400 rounded-full font-fira uppercase text-sm hover:border-red-300 hover:text-red-400 transition-all mt-2">
        Annuler
    </button>
</div>

<div id="etapeCreneau" class="hidden">
    <button onclick="retourEtapeJour()" class="flex items-center gap-2 text-gray-400 font-fira text-sm mb-4 hover:text-[#7CABD3]">
        <iconify-icon icon="mdi:arrow-left"></iconify-icon> Changer de jour
    </button>
    <p class="font-fira uppercase text-xs tracking-widest text-gray-400 mb-3" id="jourSelectionneLabel"></p>
    <div id="creneauxList" class="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto mb-4"></div>
    <button onclick="fermerModalDemande()"
        class="w-full py-3 border-2 border-gray-200 text-gray-400 rounded-full font-fira uppercase text-sm hover:border-red-300 hover:text-red-400 transition-all mt-2">
        Annuler
    </button>
</div>


        
        <div id="etapeMessage" class="hidden">
            <button onclick="retourEtapeCreneau()" class="flex items-center gap-2 text-gray-400 font-fira text-sm mb-4 hover:text-[#7CABD3]">
                <iconify-icon icon="mdi:arrow-left"></iconify-icon> Changer de creneau
            </button>
            <p class="font-fira text-[#1A2B49] text-sm mb-3" id="recapCreneau"></p>
            <div>
                <label class="block text-sm font-fira uppercase tracking-widest text-gray-400 mb-2">Message (optionnel)</label>
                <textarea id="messageDemande" rows="3" placeholder="Precisez votre demande..."
                    class="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none font-fira text-[#1A2B49] resize-none"></textarea>
            </div>
            <div class="flex flex-col gap-3 mt-6">
                <button id="btnEnvoyerDemande" class="w-full py-4 bg-[#7CABD3] text-white rounded-2xl hover:bg-[#1A2B49] transition font-fira uppercase tracking-widest text-sm">
                    Envoyer la demande
                </button>
                <button onclick="fermerModalDemande()" class="w-full py-4 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition font-fira uppercase tracking-widest text-sm">
                    Annuler
                </button>
            </div>
        </div>
    </div>
</div>




    <?php include('../include/footer.php'); ?>
    <script>
(function() {
    const z = localStorage.getItem("senior_zoom");
    if (z) document.documentElement.style.zoom = z;
})();
</script>
    <script src="/js/users/senior/services.js?v=<?php echo time(); ?>"></script>
    <script src="/js/include/zoom_ihm.js?v=<?php echo time(); ?>"></script>
    <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script>

<script src="/js/include/onesignal.js" defer></script>

<script src="/js/include/notifications.js?v=<?php echo time(); ?>"></script>
</body>
</html>