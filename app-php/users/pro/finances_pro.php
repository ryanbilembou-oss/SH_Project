<?php require_once('../../auth.php'); ?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy - Mes Finances</title>
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
            <h2 class="text-5xl font-fira uppercase tracking-tighter text-[#1A2B49]">Mes <span class="text-[#7CABD3]">Finances</span></h2>
            <p class="text-gray-400 mt-1 text-lg">Suivez vos revenus, commissions et virements.</p>
        </div>
        <div id="filtresContainer" class="mb-6"></div>
        <div id="kpiGrid" class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"></div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div>
                <h3 class="text-2xl font-fira uppercase tracking-tighter text-[#1A2B49] mb-4">Revenus par service</h3>
                <div id="revenusParService" class="space-y-3"></div>
            </div>
            <div>
                <h3 class="text-2xl font-fira uppercase tracking-tighter text-[#1A2B49] mb-4">Historique mensuel</h3>
                <div id="historiqueMensuel" class="space-y-3"></div>
            </div>
        </div>

        <div>
            <h3 class="text-2xl font-fira uppercase tracking-tighter text-[#1A2B49] mb-4">Derniers virements</h3>
            <div id="virementsList" class="space-y-4"></div>
        </div>
    </main>

    <?php include('../include/footer.php'); ?>
    <script src="/js/users/pro/finances_pro.js?v=<?php echo time(); ?>"></script>
    <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script>

<script src="/js/include/onesignal.js" defer></script>

<script src="/js/include/notifications.js?v=<?php echo time(); ?>"></script>
</body>
</html>