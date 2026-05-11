<?php
require_once('../../auth.php');

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy - Mon Abonnement</title>
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

    <main class="container mx-auto max-w-3xl px-4 py-10">

        <div class="mb-10">
            <h2 class="text-5xl font-fira uppercase tracking-tighter text-[#1A2B49]">
                Mon <span class="text-[#7CABD3]">abonnement</span>
            </h2>
            <p class="text-gray-400 mt-1 text-lg">Gérez votre abonnement Silver Happy Pro.</p>
        </div>

        <div id="abonnementActif" class="hidden space-y-6">
            <div class="bg-white p-8 rounded-[40px] border-2 border-transparent hover:border-[#7CABD3] transition-all">
                <div class="flex items-center justify-between flex-wrap gap-4 mb-6">
                    <div>
                        <h3 class="font-fira text-[#1A2B49] text-3xl" id="aboType">—</h3>
                        <p class="text-[#7CABD3] text-2xl font-fira mt-1" id="aboPrix">—</p>
                    </div>
                    <span id="aboBadge" class="px-4 py-2 rounded-full font-fira text-sm uppercase"></span>
                </div>

                <div class="grid grid-cols-2 gap-4 mb-6">
                    <div class="bg-gray-50 rounded-[20px] px-5 py-4">
                        <p class="font-fira uppercase text-xs tracking-widest text-gray-400 mb-1">Début</p>
                        <p class="font-fira text-[#1A2B49] text-lg" id="aboDebut">—</p>
                    </div>
                    <div class="bg-gray-50 rounded-[20px] px-5 py-4">
                        <p class="font-fira uppercase text-xs tracking-widest text-gray-400 mb-1">Fin</p>
                        <p class="font-fira text-[#1A2B49] text-lg" id="aboFin">—</p>
                    </div>
                </div>

                <div id="msgResiliation" class="hidden bg-orange-50 border-2 border-orange-200 rounded-[20px] p-4 mb-6">
                    <p class="font-fira text-orange-600 text-base">
                        <iconify-icon icon="mdi:information" class="mr-1"></iconify-icon>
                        Votre abonnement a été résilié. Il reste actif jusqu'au <span id="aboFinResiliation" class="font-bold"></span>.
                    </p>
                </div>

                <div class="bg-[#7CABD3]/5 rounded-[20px] p-5 mb-6 space-y-2">
                    <p class="font-fira uppercase text-xs tracking-widest text-gray-400 mb-3">Inclus dans votre abonnement</p>
                    <p class="text-gray-500 text-base flex items-center gap-2"><iconify-icon icon="mdi:check-circle" class="text-green-500"></iconify-icon> Accès à la plateforme Silver Happy</p>
                    <p class="text-gray-500 text-base flex items-center gap-2"><iconify-icon icon="mdi:check-circle" class="text-green-500"></iconify-icon> Gestion de vos offres et interventions</p>
                    <p class="text-gray-500 text-base flex items-center gap-2"><iconify-icon icon="mdi:check-circle" class="text-green-500"></iconify-icon> Visibilité auprès des seniors de la plateforme</p>
                    <p class="text-gray-500 text-base flex items-center gap-2"><iconify-icon icon="mdi:check-circle" class="text-green-500"></iconify-icon> Tableau de bord et statistiques</p>
                </div>

                <button id="btnResilier" onclick="resilier()"
                    class="w-full py-3 border-2 border-red-300 text-red-400 rounded-full font-fira uppercase hover:bg-red-400 hover:text-white transition-all text-sm">
                    <iconify-icon icon="mdi:cancel" class="mr-1"></iconify-icon> Résilier mon abonnement
                </button>
            </div>
        </div>

        <div id="choixAbonnement" class="hidden space-y-6">

            <div id="badgeRenouvellement" class="hidden bg-[#FCE297]/30 border-2 border-[#FCE297] rounded-[20px] px-5 py-4">
                <p class="font-fira text-[#1A2B49] text-base">
                    <iconify-icon icon="mdi:tag" class="mr-1 text-[#FCE297]"></iconify-icon>
                    Tarif de renouvellement appliqué — merci de votre fidélité !
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div class="bg-white p-8 rounded-[40px] border-2 border-transparent hover:border-[#7CABD3] hover:shadow-xl transition-all duration-300">
                    <p class="font-fira uppercase text-xs tracking-widest text-gray-400 mb-2">Mensuel</p>
                    <div class="flex items-baseline gap-1 mb-1">
                        <p class="font-fira text-[#1A2B49] text-6xl" id="prixMensuel">4</p>
                        <p class="font-fira text-gray-400 text-xl">€ / mois</p>
                    </div>
                    <p id="ancienPrixMensuel" class="hidden text-gray-300 line-through text-base font-fira mb-4">4 € / mois</p>
                    <div class="space-y-2 mb-8 mt-4">
                        <p class="text-gray-500 text-base flex items-center gap-2"><iconify-icon icon="mdi:check-circle" class="text-green-500"></iconify-icon> Sans engagement</p>
                        <p class="text-gray-500 text-base flex items-center gap-2"><iconify-icon icon="mdi:check-circle" class="text-green-500"></iconify-icon> Accès complet à la plateforme</p>
                        <p class="text-gray-500 text-base flex items-center gap-2"><iconify-icon icon="mdi:check-circle" class="text-green-500"></iconify-icon> Résiliable à tout moment</p>
                    </div>
                    <button onclick="souscrire('mensuel')"
                        class="w-full py-4 border-2 border-[#7CABD3] text-[#7CABD3] rounded-full font-fira uppercase hover:bg-[#7CABD3] hover:text-white transition-all">
                        Choisir mensuel
                    </button>
                </div>

                <div class="bg-[#1A2B49] p-8 rounded-[40px] border-2 border-[#1A2B49] hover:shadow-xl transition-all duration-300 relative">
                    <span class="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FCE297] text-[#1A2B49] text-xs font-fira uppercase px-4 py-1 rounded-full">
                        Meilleure offre
                    </span>
                    <p class="font-fira uppercase text-xs tracking-widest text-white/60 mb-2">Annuel</p>
                    <div class="flex items-baseline gap-1 mb-1">
                        <p class="font-fira text-white text-6xl" id="prixAnnuel">40</p>
                        <p class="font-fira text-white/60 text-xl">€ / an</p>
                    </div>
                    <p id="ancienPrixAnnuel" class="hidden text-white/30 line-through text-base font-fira mb-4">40 € / an</p>
                    <p class="text-[#FCE297] text-sm font-fira mt-1 mb-4">Économisez 2 mois !</p>
                    <div class="space-y-2 mb-8">
                        <p class="text-white/80 text-base flex items-center gap-2"><iconify-icon icon="mdi:check-circle" class="text-[#FCE297]"></iconify-icon> Engagement 12 mois</p>
                        <p class="text-white/80 text-base flex items-center gap-2"><iconify-icon icon="mdi:check-circle" class="text-[#FCE297]"></iconify-icon> Accès complet à la plateforme</p>
                        <p class="text-white/80 text-base flex items-center gap-2"><iconify-icon icon="mdi:check-circle" class="text-[#FCE297]"></iconify-icon> Tarif préférentiel</p>
                    </div>
                    <button onclick="souscrire('annuel')"
                        class="w-full py-4 bg-[#FCE297] text-[#1A2B49] rounded-full font-fira uppercase hover:bg-white transition-all">
                        Choisir annuel
                    </button>
                </div>
            </div>
        </div>

    </main>
    <div id="modalResiliation" class="fixed inset-0 bg-[#1A2B49]/70 backdrop-blur-sm hidden items-center justify-center z-50 opacity-0 transition-opacity duration-300">
        <div class="bg-white rounded-[40px] p-10 max-w-md w-full shadow-2xl mx-4">
            <div class="text-center mb-6">
                <iconify-icon icon="mdi:alert-circle" class="text-5xl text-red-400 mb-3 block"></iconify-icon>
                <h3 class="text-2xl font-fira uppercase tracking-tighter text-[#1A2B49]">Confirmer la résiliation</h3>
                <p class="text-gray-400 mt-3 text-base leading-relaxed">
                    Votre abonnement restera actif jusqu'à la fin de la période en cours. Vous ne serez plus débité.
                </p>
            </div>
            <div class="flex flex-col gap-3">
                <button onclick="confirmerResiliation()"
                    class="w-full py-4 bg-red-400 text-white rounded-2xl hover:bg-red-600 transition font-fira uppercase tracking-widest text-sm">
                    Oui, résilier
                </button>
                <button onclick="fermerModalResiliation()"
                    class="w-full py-4 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition font-fira uppercase tracking-widest text-sm">
                    Annuler
                </button>
            </div>
        </div>
    </div>

    <?php include('../include/footer.php'); ?>
    <script src="/js/users/pro/abonnement_pro.js?v=<?php echo time(); ?>"></script>
    <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script>

<script src="/js/include/onesignal.js" defer></script>

<script src="/js/include/notifications.js?v=<?php echo time(); ?>"></script>
</body>
</html>