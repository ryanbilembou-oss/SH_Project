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

    <main class="container mx-auto max-w-4xl px-4 py-10">

        <div class="mb-10">
            <a href="profil.php" class="text-[#7CABD3] font-fira hover:underline text-base">← Retour au profil</a>
            <h2 class="text-5xl font-black uppercase tracking-tighter text-[#1A2B49] mt-4">
                Mon <span class="text-[#7CABD3]">abonnement</span>
            </h2>
            <p class="text-gray-400 mt-1 text-lg">Gérez votre formule Silver Happy.</p>
        </div>

        <div id="abonnementActif" class="hidden mb-12">
            <div class="bg-white rounded-[40px] shadow-lg border-2 border-[#7CABD3] p-10">
                <div class="flex items-center justify-between mb-6">
                    <div class="flex items-center gap-4">
                        <div class="w-16 h-16 bg-[#7CABD3]/20 rounded-2xl flex items-center justify-center">
                            <iconify-icon icon="mdi:crown" class="text-3xl text-[#7CABD3]"></iconify-icon>
                        </div>
                        <div>
                            <h3 class="font-black text-[#1A2B49] text-2xl uppercase" id="aboType">—</h3>
                            <p class="text-gray-400" id="aboPrix">—</p>
                        </div>
                    </div>
                    <span id="aboBadge" class="px-4 py-2 rounded-full font-black text-sm uppercase"></span>
                </div>

                <div class="grid grid-cols-2 gap-6 mb-8">
                    <div class="bg-gray-50 rounded-2xl p-5">
                        <p class="text-sm font-black uppercase tracking-widest text-gray-400 mb-1">Date de début</p>
                        <p class="font-black text-[#1A2B49] text-lg" id="aboDebut">—</p>
                    </div>
                    <div class="bg-gray-50 rounded-2xl p-5">
                        <p class="text-sm font-black uppercase tracking-widest text-gray-400 mb-1">Date de fin</p>
                        <p class="font-black text-[#1A2B49] text-lg" id="aboFin">—</p>
                    </div>
                </div>

                <div id="msgResiliation" class="hidden bg-orange-50 border-2 border-orange-200 rounded-2xl p-5 mb-6">
                    <p class="text-orange-600 font-fira">
                        <iconify-icon icon="mdi:alert-circle" class="mr-1"></iconify-icon>
                        Votre abonnement est résilié. Il reste actif jusqu'au <span id="aboFinResiliation" class="font-black">—</span>.
                    </p>
                </div>

                <div id="btnResilier" class="flex justify-end">
                    <button onclick="resilier()" class="px-8 py-3 bg-red-50 text-red-500 border-2 border-red-200 rounded-full font-black text-sm uppercase hover:bg-red-500 hover:text-white hover:border-red-500 transition-all">
                        Résilier mon abonnement
                    </button>
                </div>
            </div>
        </div>

        <div id="choixAbonnement" class="hidden">
            <h3 class="text-3xl font-black uppercase tracking-tighter text-[#1A2B49] mb-8 text-center">
                Choisissez votre <span class="text-[#7CABD3]">formule</span>
            </h3>

            <div id="badgeRenouvellement" class="hidden text-center mb-6">
                <span class="bg-[#FCE297] text-[#1A2B49] px-6 py-2 rounded-full font-black text-sm uppercase">
                    <iconify-icon icon="mdi:star" class="mr-1"></iconify-icon>
                    Tarif fidélité — Vous bénéficiez du prix renouvellement !
                </span>
            </div>

            <div class="grid md:grid-cols-2 gap-8">
     
                <div class="group bg-white rounded-[40px] shadow-lg border-2 border-transparent hover:border-[#7CABD3] hover:shadow-xl transition-all duration-500 p-10 text-center">
                    <div class="w-16 h-16 bg-[#7CABD3]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <iconify-icon icon="mdi:calendar-month" class="text-3xl text-[#7CABD3]"></iconify-icon>
                    </div>
                    <h4 class="font-black text-[#1A2B49] text-2xl uppercase mb-2">Mensuel</h4>
                    <p class="text-gray-400 mb-6">Flexibilité totale, sans engagement.</p>
                    <div class="mb-6">
                        <span id="prixMensuel" class="text-5xl font-black text-[#1A2B49]">4</span>
                        <span class="text-xl text-gray-400 font-fira">€ / mois</span>
                    </div>
                    <div id="ancienPrixMensuel" class="hidden mb-4">
                        <span class="text-gray-400 line-through text-lg">4 € / mois</span>
                    </div>
                    <ul class="text-left space-y-3 mb-8 text-base text-gray-500">
                        <li class="flex items-center gap-2"><iconify-icon icon="mdi:check-circle" class="text-[#7CABD3]"></iconify-icon> Accès à tous les événements</li>
                        <li class="flex items-center gap-2"><iconify-icon icon="mdi:check-circle" class="text-[#7CABD3]"></iconify-icon> Réservation de services</li>
                        <li class="flex items-center gap-2"><iconify-icon icon="mdi:check-circle" class="text-[#7CABD3]"></iconify-icon> Espace conseils santé</li>
                        <li class="flex items-center gap-2"><iconify-icon icon="mdi:check-circle" class="text-[#7CABD3]"></iconify-icon> Support prioritaire</li>
                    </ul>
                    <button onclick="souscrire('mensuel')" class="w-full py-4 bg-[#1A2B49] text-white rounded-2xl font-black uppercase text-sm hover:bg-[#7CABD3] transition-all shadow-lg">
                        Choisir mensuel
                    </button>
                </div>

                <div class="group bg-white rounded-[40px] shadow-lg border-2 border-[#FCE297] hover:shadow-xl transition-all duration-500 p-10 text-center relative">
                    <div class="absolute -top-4 left-1/2 -translate-x-1/2">
                        <span class="bg-[#FCE297] text-[#1A2B49] px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest">Meilleure offre</span>
                    </div>
                    <div class="w-16 h-16 bg-[#FCE297]/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <iconify-icon icon="mdi:calendar-star" class="text-3xl text-[#FCE297]"></iconify-icon>
                    </div>
                    <h4 class="font-black text-[#1A2B49] text-2xl uppercase mb-2">Annuel</h4>
                    <p class="text-gray-400 mb-6">Économisez 2 mois par rapport au mensuel.</p>
                    <div class="mb-6">
                        <span id="prixAnnuel" class="text-5xl font-black text-[#1A2B49]">40</span>
                        <span class="text-xl text-gray-400 font-fira">€ / an</span>
                    </div>
                    <div id="ancienPrixAnnuel" class="hidden mb-4">
                        <span class="text-gray-400 line-through text-lg">40 € / an</span>
                    </div>
                    <ul class="text-left space-y-3 mb-8 text-base text-gray-500">
                        <li class="flex items-center gap-2"><iconify-icon icon="mdi:check-circle" class="text-[#FCE297]"></iconify-icon> Tout le mensuel inclus</li>
                        <li class="flex items-center gap-2"><iconify-icon icon="mdi:check-circle" class="text-[#FCE297]"></iconify-icon> 2 mois offerts</li>
                        <li class="flex items-center gap-2"><iconify-icon icon="mdi:check-circle" class="text-[#FCE297]"></iconify-icon> Accès boutique privilégié</li>
                        <li class="flex items-center gap-2"><iconify-icon icon="mdi:check-circle" class="text-[#FCE297]"></iconify-icon> Tarifs préférentiels services</li>
                    </ul>
                    <button onclick="souscrire('annuel')" class="w-full py-4 bg-[#FCE297] text-[#1A2B49] rounded-2xl font-black uppercase text-sm hover:bg-[#1A2B49] hover:text-white transition-all shadow-lg">
                        Choisir annuel
                    </button>
                </div>
            </div>
        </div>

        <div id="modalResiliation" class="fixed inset-0 bg-[#1A2B49]/70 backdrop-blur-sm hidden items-center justify-center z-50 opacity-0 transition-opacity duration-300">
            <div class="bg-white rounded-[40px] p-10 max-w-md w-full shadow-2xl mx-4">
                <div class="text-center mb-6">
                    <iconify-icon icon="mdi:alert-circle" class="text-5xl text-orange-400 mb-3 block"></iconify-icon>
                    <h3 class="text-2xl font-black uppercase tracking-tighter text-[#1A2B49]">Résilier votre abonnement ?</h3>
                    <p class="text-gray-400 mt-2 text-base">Votre abonnement restera actif jusqu'à la fin de la période en cours. Vous ne serez pas débité le mois prochain.</p>
                </div>
                <div class="flex flex-col gap-3 mt-8">
                    <button onclick="confirmerResiliation()" class="w-full py-4 bg-red-500 text-white rounded-2xl hover:bg-red-700 transition font-black uppercase tracking-widest text-sm">
                        Confirmer la résiliation
                    </button>
                    <button onclick="fermerModalResiliation()" class="w-full py-4 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition font-black uppercase tracking-widest text-sm">
                        Annuler
                    </button>
                </div>
            </div>
        </div>

    </main>

    <?php include('../include/footer.php'); ?>
    <script>
(function() {
    const z = localStorage.getItem("senior_zoom");
    if (z) document.documentElement.style.zoom = z;
})();
</script>
    <script src="/js/users/senior/abonnement.js?v=<?php echo time(); ?>"></script>
        <script src="/js/include/zoom_ihm.js?v=<?php echo time(); ?>"></script>
        <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script>

<script src="/js/include/onesignal.js" defer></script>

<script src="/js/include/notifications.js?v=<?php echo time(); ?>"></script>

</body>
</html>