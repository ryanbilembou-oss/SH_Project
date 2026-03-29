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
    </style>
</head>
<body class="bg-[#FFFFF6] min-h-screen">

    <div id="toast" class="fixed top-6 left-1/2 transform -translate-x-1/2 -translate-y-20 opacity-0 z-50 transition-all duration-500 pointer-events-none">
        <div class="bg-[#1A2B49] text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3">
            <span id="toastIcon" class="text-lg">✅</span>
            <span id="toastMsg" class="font-bold uppercase text-sm tracking-widest">Message</span>
        </div>
    </div>

    <nav class="bg-white px-6 pt-4 shadow-sm border-b-2 border-[#FCE297] sticky top-0 z-50">
        <div class="container mx-auto flex flex-col gap-4">
            <div class="flex justify-between items-center w-full">
                <a href="/users/seniors/accueil_senior.php"><img src="/img/logo.png" alt="Logo Silver Happy" class="h-14"></a>
                <div class="flex items-center gap-4">
                    <a href="/users/seniors/profil.php" class="inline-block px-6 py-3 bg-[#7CABD3] rounded-full shadow text-white hover:text-[#7CABD3] hover:bg-white border-2 border-[#7CABD3] transition-all font-bold">Mon profil</a>
                    <a href="../logout.php" onclick="localStorage.clear()" class="inline-block px-6 py-3 text-[#7CABD3] bg-white hover:text-white hover:bg-[#7CABD3] border-2 border-[#7CABD3] rounded-full shadow transition-all font-bold">Déconnexion</a>
                </div>
            </div>
            <div class="flex pb-4 gap-8 mx-auto justify-center flex-wrap text-base">
                <a href="/users/seniors/accueil_senior.php" class="flex items-center gap-2 font-bold pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all">
                    <iconify-icon icon="mdi:view-dashboard"></iconify-icon> Tableau de bord
                </a>
                <a href="/users/seniors/evenements.php" class="flex items-center gap-2 font-bold pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all">
                    <iconify-icon icon="mdi:calendar"></iconify-icon> Événements
                </a>
                <a href="/users/seniors/services.php" class="flex items-center gap-2 font-bold pb-2 border-b-2 border-[#FCE297] text-[#7CABD3]">
                    <iconify-icon icon="mdi:briefcase"></iconify-icon> Services
                </a>
                <a href="/users/seniors/boutique.php" class="flex items-center gap-2 font-bold pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all">
                    <iconify-icon icon="mdi:shopping"></iconify-icon> Boutique
                </a>
                <a href="/users/seniors/planning.php" class="flex items-center gap-2 font-bold pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all">
                    <iconify-icon icon="mdi:calendar-clock"></iconify-icon> Mon Planning
                </a>
                <a href="/users/seniors/devis.php" class="flex items-center gap-2 font-bold pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all">
                    <iconify-icon icon="mdi:file-document"></iconify-icon> Devis & Factures
                </a>
                <a href="/users/seniors/conseils.php" class="flex items-center gap-2 font-bold pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all">
                    <iconify-icon icon="mdi:lightbulb"></iconify-icon> Conseils
                </a>
            </div>
        </div>
    </nav>

    <main class="container mx-auto max-w-6xl px-4 py-10">
        <div class="mb-10">
            <h2 class="text-5xl font-black uppercase tracking-tighter text-[#1A2B49]">
                Nos <span class="text-[#7CABD3]">services</span>
            </h2>
            <p class="text-gray-400 mt-1 text-lg">Trouvez le service adapté à vos besoins.</p>
        </div>

        <!-- Filtres catégories -->
        <div class="flex flex-wrap gap-3 mb-10" id="filtresCat">
            <button onclick="filtrerCategorie(null)" class="px-5 py-2 rounded-full font-bold text-sm bg-[#1A2B49] text-white transition-all">
                Tous
            </button>
        </div>

        <!-- Liste services -->
        <div id="servicesList" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-gray-200 text-center col-span-3">
                <iconify-icon icon="mdi:briefcase" class="text-5xl text-gray-300 mb-3 block"></iconify-icon>
                <p class="text-gray-400 italic">Chargement...</p>
            </div>
        </div>
    </main>

    <!-- Modal demande service -->
    <div id="modalService" class="fixed inset-0 bg-[#1A2B49]/70 backdrop-blur-sm hidden items-center justify-center z-50 opacity-0 transition-opacity duration-300">
        <div class="bg-white rounded-[40px] p-10 max-w-md w-full shadow-2xl mx-4">
            <div class="text-center mb-6">
                <iconify-icon icon="mdi:briefcase-check" class="text-5xl text-[#7CABD3] mb-3 block"></iconify-icon>
                <h3 class="text-2xl font-black uppercase tracking-tighter text-[#1A2B49]" id="modalServiceTitre"></h3>
                <p class="text-gray-400 mt-2 text-base" id="modalServiceDesc"></p>
                <p class="text-2xl font-black text-[#1A2B49] mt-3" id="modalServicePrix"></p>
            </div>
            <div class="space-y-4 mt-4">
                <div>
                    <label class="block text-sm font-black uppercase tracking-widest text-gray-400 mb-2">Date souhaitée</label>
                    <input type="date" id="dateService" class="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none font-bold text-[#1A2B49]">
                </div>
                <div>
                    <label class="block text-sm font-black uppercase tracking-widest text-gray-400 mb-2">Message (optionnel)</label>
                    <textarea id="messageService" rows="3" placeholder="Précisez votre demande..." class="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none font-bold text-[#1A2B49] resize-none"></textarea>
                </div>
            </div>
            <div class="flex flex-col gap-3 mt-6">
                <button id="btnDemanderService" class="w-full py-4 bg-[#7CABD3] text-white rounded-2xl hover:bg-[#1A2B49] transition font-black uppercase tracking-widest text-sm">
                    Envoyer la demande
                </button>
                <button id="btnCancelService" class="w-full py-4 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition font-black uppercase tracking-widest text-sm">
                    Annuler
                </button>
            </div>
        </div>
    </div>

    <footer class="bg-[#7CABD3] pt-16 pb-8 mt-16">
        <div class="max-w-7xl mx-auto px-4">
            <div class="pt-8 border-t border-white/30 flex flex-col md:flex-row justify-between items-center gap-4">
                <p class="text-base text-[#1A2B49] font-bold">© 2026 Silver Happy. Tous droits réservés.</p>
            </div>
        </div>
    </footer>

    <script src="/js/users/senior/services.js?v=<?php echo time(); ?>"></script>
</body>
</html>