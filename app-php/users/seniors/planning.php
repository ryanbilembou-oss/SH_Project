<?php
require_once('../../auth.php');
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy - Mon Planning</title>
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

    <main class="container mx-auto max-w-7xl px-4 py-10">
        <div class="mb-10">
            <h2 class="text-5xl font-fira uppercase tracking-tighter text-[#1A2B49]">
                Mon <span class="text-[#7CABD3]">planning</span>
            </h2>
            <p class="text-gray-400 mt-1 text-lg">Vos interventions et événements de la semaine.</p>
        </div>
        <div class="flex gap-4 mb-8 flex-wrap">
            <a href="/users/seniors/evenements.php" class="flex items-center gap-3 px-8 py-4 bg-[#7CABD3] text-white rounded-full font-fira uppercase text-sm hover:bg-[#1A2B49] transition-all shadow-lg">
                <iconify-icon icon="mdi:calendar-plus" class="text-2xl"></iconify-icon>
                Réserver un événement
            </a>
            <a href="/users/seniors/services.php" class="flex items-center gap-3 px-8 py-4 bg-[#FCE297] text-[#1A2B49] rounded-full font-fira uppercase text-sm hover:bg-[#1A2B49] hover:text-white transition-all shadow-lg">
                <iconify-icon icon="mdi:briefcase-plus" class="text-2xl"></iconify-icon>
                Demander un service
            </a>
        </div>

        <div class="bg-white rounded-[40px] shadow-lg border-2 border-gray-100 overflow-hidden">
            <div class="flex items-center justify-between p-6 border-b border-gray-100">
                <button id="prevWeek" class="w-12 h-12 flex items-center justify-center rounded-full border-2 border-[#7CABD3] hover:bg-[#7CABD3] hover:text-white text-[#7CABD3] transition-all font-fira text-lg">
                    ←
                </button>
                <div class="font-fira text-[#1A2B49] text-xl uppercase tracking-wider" id="weekLabel"></div>
                <button id="nextWeek" class="w-12 h-12 flex items-center justify-center rounded-full border-2 border-[#7CABD3] hover:bg-[#7CABD3] hover:text-white text-[#7CABD3] transition-all font-fira text-lg">
                    →
                </button>
            </div>
            <div class="overflow-x-auto">
                <div id="calendarGrid"></div>
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


    <script src="/js/users/senior/planning.js?v=<?php echo time(); ?>"></script>
        <script src="/js/include/zoom_ihm.js?v=<?php echo time(); ?>"></script>
    <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script>

<script src="/js/include/onesignal.js" defer></script>

<script src="/js/include/notifications.js?v=<?php echo time(); ?>"></script>

</body>
</html>