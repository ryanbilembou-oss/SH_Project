<?php require_once('../../auth.php'); ?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy - Mes Litiges</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:wght@400;700;900&display=swap" rel="stylesheet">
    <link rel="icon" href="/img/logo-clear.png">
    <script src="/js/include/zoom_ihm.js"></script>
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
            <h2 class="text-5xl font-fira uppercase tracking-tighter text-[#1A2B49]">Mes <span class="text-[#7CABD3]">Litiges</span></h2>
            <p class="text-gray-400 mt-1 text-lg">Suivez vos litiges en cours.</p>
        </div>
        <div id="filtresContainer"></div>
        <div id="litigesList" class="space-y-4"></div>
    </main>
    <div id="modalConversation" class="hidden fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
    <div class="bg-white rounded-[40px] shadow-2xl w-full max-w-lg flex flex-col" style="max-height: 80vh;">
        <div class="flex justify-between items-center p-6 border-b border-gray-100">
            <h4 class="font-fira text-[#1A2B49] text-2xl uppercase" id="modalConvTitre">Conversation</h4>
            <button onclick="fermerConversation()" class="w-10 h-10 rounded-full border-2 border-gray-200 text-gray-400 hover:border-red-400 hover:text-red-400 transition-all">
                <iconify-icon icon="mdi:close"></iconify-icon>
            </button>
        </div>
        <div id="modalConvMessages" class="flex-1 overflow-y-auto p-6 space-y-2"></div>
        <div class="p-4 border-t border-gray-100 flex gap-3">
            <input type="text" id="modalConvInput" placeholder="Votre message..."
                onkeydown="if(event.key==='Enter') envoyerMessage()"
                class="flex-1 border-2 border-gray-200 rounded-full px-4 py-2 font-fira focus:outline-none focus:border-[#7CABD3]">
            <button onclick="envoyerMessage()"
                class="px-6 py-2 bg-[#1A2B49] text-white rounded-full font-fira uppercase hover:bg-[#7CABD3] transition-all">
                Envoyer
            </button>
        </div>
    </div>
</div>
    <?php include('../include/footer.php'); ?>
    <script src="/js/users/senior/litiges_senior.js?v=<?php echo time(); ?>"></script>
    <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script>

<script src="/js/include/onesignal.js" defer></script>

<script src="/js/include/notifications.js?v=<?php echo time(); ?>"></script>
</body>
</html>