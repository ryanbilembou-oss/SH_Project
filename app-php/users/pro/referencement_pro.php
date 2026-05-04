<?php
require_once('../../auth.php');

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy - Référencement</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:wght@400;700;900&display=swap" rel="stylesheet">
    <link rel="icon" href="/img/logo-clear.png">
    <style>body { font-family: 'Fira Sans Condensed', sans-serif; background-color: #FFFFF6; font-size: 18px; }</style>
</head>
<body class="bg-[#FFFFF6] min-h-screen">

    <div id="toast" class="fixed top-6 left-1/2 transform -translate-x-1/2 -translate-y-20 opacity-0 z-50 transition-all duration-500 pointer-events-none">
        <div class="bg-[#1A2B49] text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3">
            <span id="toastIcon"></span>
            <span id="toastMsg" class="font-fira uppercase text-sm tracking-widest"></span>
        </div>
    </div>

    <?php include('../include/navbar.php'); ?>

    <main class="container mx-auto max-w-3xl px-4 py-10">

        <div class="mb-10">
            <h2 class="text-5xl font-fira uppercase tracking-tighter text-[#1A2B49]">
                Mon <span class="text-[#FCE297]">référencement</span>
            </h2>
            <p class="text-gray-400 mt-1 text-lg">Apparaissez en premier dans les résultats de recherche.</p>
        </div>

        <div id="statutRef" class="mb-8">
            <p class="text-gray-400 italic">Chargement...</p>
        </div>

        <div class="bg-[#1A2B49] text-white p-8 rounded-[40px] mb-8">
            <h3 class="font-fira uppercase text-xl mb-5 flex items-center gap-2">
                <iconify-icon icon="mdi:star-circle" class="text-[#FCE297]"></iconify-icon>
                Avantages du référencement sponsorisé
            </h3>
            <div class="space-y-3">
                <p class="flex items-center gap-3 text-white/80">
                    <iconify-icon icon="mdi:check-circle" class="text-[#FCE297] text-xl flex-shrink-0"></iconify-icon>
                    Apparaissez en <strong>premier</strong> dans les résultats de recherche
                </p>
                <p class="flex items-center gap-3 text-white/80">
                    <iconify-icon icon="mdi:check-circle" class="text-[#FCE297] text-xl flex-shrink-0"></iconify-icon>
                    Badge <strong> Sponsorisé</strong> visible par les seniors
                </p>
                <p class="flex items-center gap-3 text-white/80">
                    <iconify-icon icon="mdi:check-circle" class="text-[#FCE297] text-xl flex-shrink-0"></iconify-icon>
                    <strong>+60% de visibilité</strong> estimée sur vos offres
                </p>
                <p class="flex items-center gap-3 text-white/80">
                    <iconify-icon icon="mdi:check-circle" class="text-[#FCE297] text-xl flex-shrink-0"></iconify-icon>
                    Activation <strong>immédiate</strong> après paiement
                </p>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

            <div class="bg-white p-8 rounded-[40px] border-2 border-transparent hover:border-[#FCE297] hover:shadow-xl transition-all">
                <p class="font-fira uppercase text-xs tracking-widest text-gray-400 mb-2">Formule</p>
                <p class="font-fira text-[#1A2B49] text-3xl mb-1">1 Semaine</p>
                <p class="font-fira text-[#FCE297] text-5xl mb-6">5 €</p>
                <div class="space-y-2 mb-8">
                    <p class="text-gray-500 flex items-center gap-2">
                        <iconify-icon icon="mdi:check" class="text-green-500"></iconify-icon> 7 jours de visibilité
                    </p>
                    <p class="text-gray-500 flex items-center gap-2">
                        <iconify-icon icon="mdi:check" class="text-green-500"></iconify-icon> Badge Sponsorisé
                    </p>
                    <p class="text-gray-500 flex items-center gap-2">
                        <iconify-icon icon="mdi:check" class="text-green-500"></iconify-icon> Sans engagement
                    </p>
                </div>
                <button onclick="souscrire('semaine')"
                    class="w-full py-4 border-2 border-[#FCE297] text-[#1A2B49] rounded-full font-fira uppercase hover:bg-[#FCE297] transition-all">
                    Choisir — 5 €
                </button>
            </div>

            <div class="bg-[#FCE297] p-8 rounded-[40px] border-2 border-[#FCE297] hover:shadow-xl transition-all relative">
                <span class="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1A2B49] text-white text-xs font-fira uppercase px-4 py-1 rounded-full">
                    Meilleur rapport
                </span>
                <p class="font-fira uppercase text-xs tracking-widest text-[#1A2B49]/60 mb-2">Formule</p>
                <p class="font-fira text-[#1A2B49] text-3xl mb-1">1 Mois</p>
                <p class="font-fira text-[#1A2B49] text-5xl mb-1">15 €</p>
                <p class="text-[#1A2B49]/60 text-sm font-fira mb-6">Économisez 1 semaine (5€)</p>
                <div class="space-y-2 mb-8">
                    <p class="text-[#1A2B49]/80 flex items-center gap-2">
                        <iconify-icon icon="mdi:check" class="text-[#1A2B49]"></iconify-icon> 30 jours de visibilité
                    </p>
                    <p class="text-[#1A2B49]/80 flex items-center gap-2">
                        <iconify-icon icon="mdi:check" class="text-[#1A2B49]"></iconify-icon> Badge Sponsorisé premium
                    </p>
                    <p class="text-[#1A2B49]/80 flex items-center gap-2">
                        <iconify-icon icon="mdi:check" class="text-[#1A2B49]"></iconify-icon> Priorité maximale
                    </p>
                </div>
                <button onclick="souscrire('mois')"
                    class="w-full py-4 bg-[#1A2B49] text-white rounded-full font-fira uppercase hover:bg-white hover:text-[#1A2B49] transition-all">
                    Choisir — 15 €
                </button>
            </div>
        </div>

        <div class="bg-white p-8 rounded-[40px] border-2 border-transparent hover:border-[#7CABD3] transition-all">
            <h3 class="font-fira uppercase text-[#1A2B49] text-xl mb-5 flex items-center gap-2">
                <iconify-icon icon="mdi:history" class="text-gray-400"></iconify-icon>
                Historique
            </h3>
            <div id="historiqueRef" class="space-y-3">
                <p class="text-gray-400 italic text-sm">Chargement...</p>
            </div>
        </div>

    </main>

    <?php include('../include/footer.php'); ?>
    <script src="/js/users/pro/referencement_pro.js?v=<?php echo time(); ?>"></script>
</body>
</html>