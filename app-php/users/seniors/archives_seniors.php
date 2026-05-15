<?php require_once('../../auth.php'); ?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy - Archives Senior</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:wght@400;700;900&display=swap" rel="stylesheet">
    <link rel="icon" href="/img/logo-clear.png">
    <style>
        body { font-family: 'Fira Sans Condensed', sans-serif; background-color: #FFFFF6; font-size: 18px; }
        .accordion-content { transition: max-height 0.3s ease-out; overflow: hidden; max-height: 0; }
        .accordion-content.open { max-height: 2000px; }
        .rotate-icon { transition: transform 0.3s; }
        .rotate-icon.open { transform: rotate(180deg); }
    </style>
</head>
<body class="bg-[#FFFFF6] min-h-screen">
    <?php include('../include/navbar.php'); ?>
    <main class="container mx-auto max-w-6xl px-4 py-10">
        <div class="mb-10 flex items-center justify-between flex-wrap gap-4">
            <div>
                <h2 class="text-5xl font-fira uppercase tracking-tighter text-[#1A2B49]">
                    Mes <span class="text-[#7CABD3]">Archives</span>
                </h2>
                <p class="text-gray-400 mt-1 text-lg">Historique complet de vos devis et factures.</p>
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
            <a href="/users/seniors/devis.php" class="px-6 py-3 bg-white border-2 border-[#1A2B49] text-[#1A2B49] rounded-full font-fira uppercase text-sm hover:bg-[#1A2B49] hover:text-white transition-all flex items-center gap-2 shadow-sm">
                <iconify-icon icon="mdi:arrow-left"></iconify-icon>
                Retour
            </a>
        </div>
        <div id="archives-container" class="space-y-6">
            <div class="text-center py-20">
                <iconify-icon icon="mdi:loading" class="text-5xl text-[#7CABD3] animate-spin mb-4"></iconify-icon>
                <p class="text-gray-400 italic">Chargement de vos archives...</p>
            </div>
        </div>
    </main>
    <?php include('../include/footer.php'); ?>
    <script src="/js/include/facture_render.js?v=<?php echo time(); ?>"></script>
    <script src="/js/users/senior/archives_seniors.js?v=<?php echo time(); ?>"></script>
</body>
</html>