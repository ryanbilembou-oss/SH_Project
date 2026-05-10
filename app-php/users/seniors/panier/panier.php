<?php
require_once('../../../auth.php');
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy - Mon Panier</title>
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

    <main class="container mx-auto max-w-4xl px-4 py-10">

        <div class="flex items-center justify-between mb-10">
            <div>
                <h2 class="text-5xl font-fira uppercase tracking-tighter text-[#1A2B49]">
                    Mon <span class="text-[#7CABD3]">panier</span>
                </h2>
                <p class="text-gray-400 mt-1 text-lg" id="panierCount">Chargement...</p>
            </div>
            <button onclick="viderPanier()" id="btnVider"
                class="hidden px-6 py-3 bg-red-100 text-red-600 rounded-full font-fira text-sm uppercase hover:bg-red-600 hover:text-white transition-all">
                <iconify-icon icon="mdi:delete-sweep" class="mr-1"></iconify-icon>
                Vider le panier
            </button>
        </div>

        <div id="panierList" class="space-y-4">
            <div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-gray-200 text-center">
                <iconify-icon icon="mdi:cart" class="text-5xl text-gray-300 mb-3 block"></iconify-icon>
                <p class="text-gray-400 italic">Chargement...</p>
            </div>
        </div>
        <div id="panierRecap" class="hidden mt-10 bg-white rounded-[40px] shadow-lg border-2 border-[#7CABD3] p-8">
            <div class="flex items-center justify-between mb-6">
                <h3 class="font-black text-[#1A2B49] text-2xl uppercase">Total</h3>
                <p class="font-black text-[#1A2B49] text-3xl" id="totalPrix">0.00 €</p>
            </div>
            <div class="flex gap-4">
                <button id="btnPayer" onclick="payerPanier()"
                    class="flex-1 py-4 bg-[#7CABD3] text-white rounded-2xl font-black uppercase text-sm hover:bg-[#1A2B49] transition-all shadow-lg flex items-center justify-center gap-2">
                    <iconify-icon icon="mdi:credit-card-outline" class="text-xl"></iconify-icon>
                    Payer avec Stripe
                </button>
                <button id="btnVider" onclick="viderPanier()"
                    class="px-8 py-4 bg-red-50 text-red-500 border-2 border-red-200 rounded-2xl font-black uppercase text-sm hover:bg-red-500 hover:text-white hover:border-red-500 transition-all">
                    Vider le panier
                </button>
            </div>
        </div>



    </main>

    <?php include('../../include/footer.php'); ?>
    <script>
(function() {
    const z = localStorage.getItem("senior_zoom");
    if (z) document.documentElement.style.zoom = z;
})();
</script>

    <script src="/js/users/senior/panier/panier.js?v=<?php echo time(); ?>"></script>
        <script src="/js/include/zoom_ihm.js?v=<?php echo time(); ?>"></script>
        <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script>

<script src="/js/include/onesignal.js" defer></script>

<script src="/js/include/notifications.js?v=<?php echo time(); ?>"></script>

</body>
</html>