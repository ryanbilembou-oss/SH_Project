<?php
require_once('../../auth.php');
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy - Mes Interventions</title>
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
            <span id="toastIcon" class="text-lg"></span>
            <span id="toastMsg" class="font-fira uppercase text-sm tracking-widest">Message</span>
        </div>
    </div>

    <?php include('../include/navbar.php'); ?>

    <main class="container mx-auto max-w-6xl px-4 py-10">

        <div class="flex items-center justify-between flex-wrap gap-4 mb-10">
            <div>
                <h2 class="text-5xl font-fira uppercase tracking-tighter text-[#1A2B49]">
                    Mes <span class="text-[#7CABD3]">interventions</span>
                </h2>
                <p class="text-gray-400 mt-1 text-lg">Historique et suivi de toutes vos interventions.</p>
            </div>
            <a href="/users/pro/demandes_pro.php"
               class="relative flex items-center gap-2 px-8 py-4 bg-white border-2 border-[#FCE297] text-[#1A2B49] rounded-full font-fira uppercase text-sm hover:bg-[#FCE297] transition-all shadow">
                <iconify-icon icon="mdi:account-clock"></iconify-icon> Voir mes demandes
                <span id="badgeDemandes" class="hidden absolute -top-2 -right-2 bg-red-400 text-white text-xs font-fira px-2 py-0.5 rounded-full"></span>
            </a>
        </div>

        <div class="flex flex-wrap gap-3 mb-8">
            <button onclick="filtrer('tous')" id="filtre-tous"
                class="filtre-btn px-6 py-2 rounded-full font-fira uppercase text-sm border-2 border-[#1A2B49] bg-[#1A2B49] text-white transition-all">
                Toutes
            </button>
            <button onclick="filtrer('planifiee')" id="filtre-planifiee"
                class="filtre-btn px-6 py-2 rounded-full font-fira uppercase text-sm border-2 border-[#7CABD3] text-[#7CABD3] hover:bg-[#7CABD3] hover:text-white transition-all">
                Planifiées
            </button>
            <button onclick="filtrer('en_cours')" id="filtre-en_cours"
                class="filtre-btn px-6 py-2 rounded-full font-fira uppercase text-sm border-2 border-[#FCE297] text-[#1A2B49] hover:bg-[#FCE297] transition-all">
                En cours
            </button>
            <button onclick="filtrer('terminee')" id="filtre-terminee"
                class="filtre-btn px-6 py-2 rounded-full font-fira uppercase text-sm border-2 border-green-400 text-green-500 hover:bg-green-400 hover:text-white transition-all">
                Terminées
            </button>
            <button onclick="filtrer('annulee')" id="filtre-annulee"
                class="filtre-btn px-6 py-2 rounded-full font-fira uppercase text-sm border-2 border-red-300 text-red-400 hover:bg-red-400 hover:text-white transition-all">
                Annulées
            </button>
        </div>

        <div id="interventionsList" class="space-y-4">
            <div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-gray-200 text-center">
                <p class="text-gray-400 italic">Chargement...</p>
            </div>
        </div>

    </main>

    <?php include('../include/footer.php'); ?>
    <script src="/js/users/pro/interventions_pro.js?v=<?php echo time(); ?>"></script>
</body>
</html>