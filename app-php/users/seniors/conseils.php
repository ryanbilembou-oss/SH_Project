<?php
require_once('../../auth.php');
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy - Conseils</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:wght@400;700;900&display=swap" rel="stylesheet">
    <style>body { font-family: 'Fira Sans Condensed', sans-serif; background-color: #FFFFF6; font-size: 18px; }</style>
</head>
<body class="bg-[#FFFFF6] min-h-screen">
    <?php include('../include/navbar.php'); ?>
    <main class="container mx-auto max-w-6xl px-4 py-10">
        <div class="mb-10">
            <h2 class="text-5xl font-fira uppercase tracking-tighter text-[#1A2B49]">Espace <span class="text-[#7CABD3]">conseils</span></h2>
            <p class="text-gray-400 mt-1 text-lg">Nos conseils santé, bien-être et quotidien.</p>
        </div>
        
        <div class="flex flex-wrap gap-3 mb-10" id="filtresCat">
            <button onclick="filtrer(null)" class="px-5 py-2 rounded-full font-fira text-sm bg-[#1A2B49] text-white">Tous</button>
        </div>
        
        <div id="conseilsList" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-gray-200 text-center col-span-3">
                <p class="text-gray-400 italic">Chargement...</p>
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

    <script src="/js/users/senior/conseils.js?v=<?php echo time(); ?>"></script>
        <script src="/js/include/zoom_ihm.js?v=<?php echo time(); ?>"></script>
    <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script>

<script src="/js/include/onesignal.js" defer></script>

<script src="/js/include/notifications.js?v=<?php echo time(); ?>"></script>

</body>
</html>