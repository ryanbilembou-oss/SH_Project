<?php
require_once('../../../auth.php');
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy - Événements</title>
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
    <?php include('../../include/navbar.php'); ?>

    <main class="container mx-auto max-w-6xl px-4 py-10">

        <div class="mb-10">
            <h2 class="text-5xl font-fira uppercase tracking-tighter text-[#1A2B49]">
                Nos <span class="text-[#7CABD3]">événements</span>
            </h2>
            <p class="text-gray-400 mt-1 text-lg">Découvrez et réservez vos activités.</p>
            
        </div>

        <div class="flex flex-wrap gap-3 mb-6" id="filtresVue">
            <button onclick="changerVue('tous')" id="btn-vue-tous"
                class="btn-vue px-6 py-2 rounded-full font-fira text-sm uppercase transition-all bg-[#1A2B49] text-white">
                <iconify-icon icon="mdi:calendar-star" class="mr-1"></iconify-icon>
                Tous les événements
            </button>
            <button onclick="changerVue('mes')" id="btn-vue-mes"
                class="btn-vue px-6 py-2 rounded-full font-fira text-sm uppercase transition-all bg-white border-2 border-[#7CABD3] text-[#7CABD3] hover:bg-[#7CABD3] hover:text-white">
                <iconify-icon icon="mdi:account-check" class="mr-1"></iconify-icon>
                Mes événements
            </button>
            <button onclick="changerVue('passes')" id="btn-vue-passes"
                class="btn-vue px-6 py-2 rounded-full font-fira text-sm uppercase transition-all bg-white border-2 border-gray-300 text-gray-500 hover:bg-gray-200">
                <iconify-icon icon="mdi:history" class="mr-1"></iconify-icon>
                Mes événements passés
            </button>
            <a href="/users/seniors/panier/panier.php" class="ml-auto flex items-center gap-2 px-6 py-2 rounded-full font-fira text-sm uppercase bg-[#FCE297] text-[#1A2B49] border-2 border-[#FCE297] hover:bg-[#1A2B49] hover:text-white transition-all duration-300">
                <iconify-icon icon="mdi:cart-plus" class="text-xl"></iconify-icon>
                Mon panier
            </a>

        </div>

        <div class="flex flex-wrap gap-3 mb-10" id="filtresCat">
            <button onclick="filtrerCategorie(null)" id="btn-cat-all" class="px-5 py-2 rounded-full font-fira text-sm bg-[#1A2B49] text-white transition-all">
                Tous
            </button>
        </div>

        <div id="evenementsList" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-gray-200 text-center col-span-3">
                <iconify-icon icon="mdi:calendar" class="text-5xl text-gray-300 mb-3 block"></iconify-icon>
                <p class="text-gray-400 italic">Chargement...</p>
            </div>
        </div>

    </main>

    <div id="modalInscription" class="fixed inset-0 bg-[#1A2B49]/70 backdrop-blur-sm hidden items-center justify-center z-50 opacity-0 transition-opacity duration-300">
        <div class="bg-white rounded-[40px] p-10 max-w-md w-full shadow-2xl mx-4">
            <div class="text-center mb-6">
                <iconify-icon icon="mdi:calendar-check" class="text-5xl text-[#7CABD3] mb-3 block"></iconify-icon>
                <h3 class="text-2xl font-fira uppercase tracking-tighter text-[#1A2B49]" id="modalTitre"></h3>
                <p class="text-gray-400 mt-2 text-base" id="modalDetails"></p>
                <p class="text-2xl font-fira text-[#1A2B49] mt-3" id="modalPrix"></p>
            </div>
            <div class="flex flex-col gap-3 mt-8">
                <button id="btnGratuit" class="w-full py-4 bg-[#7CABD3] text-white rounded-2xl hover:bg-[#1A2B49] transition font-fira uppercase tracking-widest text-sm">
                    Confirmer la réservation
                </button>
                <button id="cancelInscription" class="w-full py-4 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition font-fira uppercase tracking-widest text-sm">
                    Annuler
                </button>
            </div>
        </div>
    </div>

    <div id="modalAnnulation" class="fixed inset-0 bg-[#1A2B49]/70 backdrop-blur-sm hidden items-center justify-center z-50 opacity-0 transition-opacity duration-300">
        <div class="bg-white rounded-[40px] p-10 max-w-md w-full shadow-2xl mx-4">
            <div class="text-center mb-6">
                <iconify-icon icon="mdi:calendar-remove" class="text-5xl text-red-400 mb-3 block"></iconify-icon>
                <h3 class="text-2xl font-fira uppercase tracking-tighter text-[#1A2B49]">Annuler la réservation ?</h3>
                <p class="text-gray-400 mt-2 text-base">Cette action est irréversible.</p>
            </div>
            <div class="flex flex-col gap-3 mt-8">
                <button id="btnConfirmerAnnulation" class="w-full py-4 bg-red-500 text-white rounded-2xl hover:bg-red-700 transition font-fira uppercase tracking-widest text-sm">
                    Confirmer l'annulation
                </button>
                <button id="btnCancelAnnulation" class="w-full py-4 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition font-fira uppercase tracking-widest text-sm">
                    Retour
                </button>
            </div>
        </div>
    </div>

    <?php include('../../include/footer.php'); ?>


    <script src="/js/users/senior/evenements.js?v=<?php echo time(); ?>"></script>
    <script src="/js/users/senior/panier/panier_utils.js"></script>
</body>
</html>