<?php require_once('../../auth.php'); ?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy - Historique Complet</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:wght@400;700;900&display=swap" rel="stylesheet">
    <link rel="icon" href="/img/logo-clear.png">
    <style>
        body { font-family: 'Fira Sans Condensed', sans-serif; background-color: #FFFFF6; font-size: 18px; }
        .rotate-180 { transform: rotate(180deg); }
        .arrow { transition: transform 0.3s ease; }
    </style>
</head>
<body class="bg-[#FFFFF6] min-h-screen">
    <?php include('../include/navbar.php'); ?>
    <main class="container mx-auto max-w-6xl px-4 py-10">
        <div class="mb-10 flex items-center justify-between flex-wrap gap-4">
            <div>
                <h2 class="text-5xl font-fira uppercase tracking-tighter text-[#1A2B49]">
                    Historique <span class="text-[#7CABD3]">Complet</span>
                </h2>
                <p class="text-gray-400 mt-1 text-lg">Retrouvez l'integralite de vos devis et factures.</p>
            </div>
            <a href="/users/pro/profil_pro.php" class="px-6 py-3 bg-white border-2 border-[#1A2B49] text-[#1A2B49] rounded-full font-fira uppercase text-sm hover:bg-[#1A2B49] hover:text-white transition-all flex items-center gap-2 shadow-sm">
                <iconify-icon icon="mdi:arrow-left"></iconify-icon>
                Retour
            </a>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div class="flex gap-4">
                <button id="tab-devis" onclick="showTab('devis')"
                    class="px-8 py-3 rounded-full font-fira uppercase text-sm bg-[#1A2B49] text-white transition-all shadow-sm">
                    Tous les Devis
                </button>
                <button id="tab-factures" onclick="showTab('factures')"
                    class="px-8 py-3 rounded-full font-fira uppercase text-sm bg-white border-2 border-[#7CABD3] text-[#7CABD3] transition-all shadow-sm">
                    Toutes les Factures
                </button>
            </div>
            <div class="flex gap-2 bg-white/50 p-1 rounded-full border border-gray-100 shadow-inner">
                <button onclick="setFilter('mensuel')" id="btn-mensuel"
                    class="filter-btn px-6 py-2 rounded-full font-fira uppercase text-[10px] tracking-widest bg-[#1A2B49] text-white transition-all">
                    Mensuel
                </button>
                <button onclick="setFilter('trimestriel')" id="btn-trimestriel"
                    class="filter-btn px-6 py-2 rounded-full font-fira uppercase text-[10px] tracking-widest text-[#1A2B49] hover:bg-gray-100 transition-all">
                    Trimestriel
                </button>
                <button onclick="setFilter('annuel')" id="btn-annuel"
                    class="filter-btn px-6 py-2 rounded-full font-fira uppercase text-[10px] tracking-widest text-[#1A2B49] hover:bg-gray-100 transition-all">
                    Annuel
                </button>
            </div>
        </div>

        <div id="section-devis" class="space-y-6"></div>
        <div id="section-factures" class="space-y-6 hidden"></div>
    </main>

    <?php include('../include/footer.php'); ?>
    <script src="/js/include/facture_render.js?v=<?php echo time(); ?>"></script>
    <script src="/js/users/pro/archives_pro.js?v=<?php echo time(); ?>"></script>
    <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script>
    <script src="/js/include/onesignal.js" defer></script>
    <script src="/js/include/notifications.js?v=<?php echo time(); ?>"></script>
</body>
</html>