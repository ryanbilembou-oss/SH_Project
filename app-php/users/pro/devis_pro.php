<?php
require_once('../../auth.php');

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy - Devis & Factures</title>
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

        <div class="mb-10">
            <h2 class="text-5xl font-fira uppercase tracking-tighter text-[#1A2B49]">
                Devis & <span class="text-[#7CABD3]">Factures</span>
            </h2>
            <p class="text-gray-400 mt-1 text-lg">Suivi financier de vos prestations.</p>
        </div>

        <div class="flex gap-4 mb-8">
            <button id="tab-devis" onclick="showTab('devis')"
                class="px-8 py-3 rounded-full font-fira uppercase text-sm bg-[#1A2B49] text-white transition-all">
                Devis
            </button>
            <button id="tab-factures" onclick="showTab('factures')"
                class="px-8 py-3 rounded-full font-fira uppercase text-sm bg-white border-2 border-[#7CABD3] text-[#7CABD3] transition-all">
                Factures
            </button>
        </div>

        <div id="section-devis" class="space-y-6"></div>
        <div id="section-factures" class="space-y-6 hidden"></div>

    </main>

    <?php include('../include/footer.php'); ?>
    <script src="/js/users/pro/devis_pro.js?v=<?php echo time(); ?>"></script>
    <script src="/js/include/facture_render.js?v=<?php echo time(); ?>"></script>
</body>
</html>