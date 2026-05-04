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
    <style>body { font-family: 'Fira Sans Condensed', sans-serif; background-color: #FFFFF6; font-size: 18px; }</style>
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
            <h2 class="text-5xl font-fira uppercase tracking-tighter text-[#1A2B49]">Devis & <span class="text-[#7CABD3]">Factures</span></h2>
            <p class="text-gray-400 mt-1 text-lg">Suivez vos demandes et vos paiements.</p>
        </div>

        <div class="flex gap-4 mb-8">
            <button onclick="showTab('devis')" id="tab-devis" class="px-8 py-3 rounded-full font-fira uppercase text-sm bg-[#1A2B49] text-white transition-all">Devis</button>
            <button onclick="showTab('factures')" id="tab-factures" class="px-8 py-3 rounded-full font-fira uppercase text-sm bg-white border-2 border-[#7CABD3] text-[#7CABD3] hover:bg-[#7CABD3] hover:text-white transition-all">Factures</button>
        </div>

        <div id="section-devis" class="space-y-4">
            <div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-gray-200 text-center">
                <p class="text-gray-400 italic">Chargement...</p>
            </div>
        </div>

        <div id="section-factures" class="space-y-4 hidden">
            <div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-gray-200 text-center">
                <p class="text-gray-400 italic">Chargement...</p>
            </div>
        </div>
    </main>

    <div id="modalAccepter" class="fixed inset-0 bg-[#1A2B49]/70 backdrop-blur-sm hidden items-center justify-center z-50 opacity-0 transition-opacity duration-300">
        <div class="bg-white rounded-[40px] p-10 max-w-md w-full shadow-2xl mx-4">
            <div class="text-center mb-6">
                <iconify-icon icon="mdi:file-check" class="text-5xl text-[#7CABD3] mb-3 block"></iconify-icon>
                <h3 class="text-2xl font-fira uppercase tracking-tighter text-[#1A2B49]">Accepter le devis</h3>
                <p class="text-gray-400 mt-2 text-base" id="modalAccepterDetails"></p>
                <p class="text-3xl font-fira text-[#1A2B49] mt-4" id="modalAccepterPrix"></p>
                <p class="text-sm text-gray-400 mt-1" id="modalAccepterHT"></p>
            </div>
            <div class="flex flex-col gap-3 mt-8">
                <button id="btnConfirmerAccepter" class="w-full py-4 bg-[#7CABD3] text-white rounded-2xl hover:bg-[#1A2B49] transition font-fira uppercase tracking-widest text-sm">
                    Accepter et payer
                </button>
                <button onclick="fermerModalAccepter()" class="w-full py-4 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition font-fira uppercase tracking-widest text-sm">
                    Annuler
                </button>
            </div>
        </div>
    </div>

    <div id="modalRefuser" class="fixed inset-0 bg-[#1A2B49]/70 backdrop-blur-sm hidden items-center justify-center z-50 opacity-0 transition-opacity duration-300">
        <div class="bg-white rounded-[40px] p-10 max-w-md w-full shadow-2xl mx-4">
            <div class="text-center mb-6">
                <iconify-icon icon="mdi:file-remove" class="text-5xl text-red-400 mb-3 block"></iconify-icon>
                <h3 class="text-2xl font-fira uppercase tracking-tighter text-[#1A2B49]">Refuser le devis</h3>
                <p class="text-gray-400 mt-2 text-base">Cette action est irréversible.</p>
            </div>
            <div class="flex flex-col gap-3 mt-8">
                <button id="btnConfirmerRefuser" class="w-full py-4 bg-red-500 text-white rounded-2xl hover:bg-red-700 transition font-fira uppercase tracking-widest text-sm">
                    Confirmer le refus
                </button>
                <button onclick="fermerModalRefuser()" class="w-full py-4 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition font-fira uppercase tracking-widest text-sm">
                    Retour
                </button>
            </div>
        </div>
    </div>

    <?php include('../include/footer.php'); ?>
    
     <script src="/js/include/facture_render.js?v=<?php echo time(); ?>"></script>
     <script src="/js/users/senior/devis.js?v=<?php echo time(); ?>"></script>
</body>
</html>