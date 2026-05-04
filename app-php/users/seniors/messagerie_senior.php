<?php
require_once('../../auth.php');

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy - Messagerie</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:wght@400;700;900&display=swap" rel="stylesheet">
    <link rel="icon" href="/img/logo-clear.png">
    <script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>
    <style>
        body { font-family: 'Fira Sans Condensed', sans-serif; background-color: #FFFFF6; font-size: 18px; }
        #messagesContainer { height: 480px; overflow-y: auto; scroll-behavior: smooth; }
        #messagesContainer::-webkit-scrollbar { width: 4px; }
        #messagesContainer::-webkit-scrollbar-track { background: transparent; }
        #messagesContainer::-webkit-scrollbar-thumb { background: #7CABD3; border-radius: 2px; }
    </style>
</head>
<body class="bg-[#FFFFF6] min-h-screen">

    <div id="toast" class="fixed top-6 left-1/2 transform -translate-x-1/2 -translate-y-20 opacity-0 z-50 transition-all duration-500 pointer-events-none">
        <div class="bg-[#1A2B49] text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3">
            <span id="toastIcon" class="text-lg"></span>
            <span id="toastMsg" class="font-fira uppercase text-sm tracking-widest"></span>
        </div>
    </div>

    <?php include('../include/navbar.php'); ?>

    <main class="container mx-auto max-w-5xl px-4 py-10">

        <div class="mb-8">
            <h2 class="text-5xl font-fira uppercase tracking-tighter text-[#1A2B49]">
                Ma <span class="text-[#7CABD3]">messagerie</span>
            </h2>
            <p class="text-gray-400 mt-1 text-lg">Échangez avec vos prestataires Silver Happy.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

         
            <div class="bg-white rounded-[40px] border-2 border-transparent hover:border-[#7CABD3] transition-all p-4">
                <p class="font-fira uppercase text-xs tracking-widest text-gray-400 mb-4 px-2">Mes prestataires</p>
                <div id="listeConversations" class="space-y-2">
                    <p class="text-gray-400 italic text-sm px-2">Chargement...</p>
                </div>
            </div>

      
            <div class="md:col-span-2 bg-white rounded-[40px] border-2 border-transparent hover:border-[#7CABD3] transition-all flex flex-col" style="min-height:580px;">

                <div id="convHeader" class="p-6 border-b border-gray-100 flex items-center gap-4">
                    <div class="w-12 h-12 bg-[#7CABD3]/10 rounded-full flex items-center justify-center">
                        <iconify-icon icon="mdi:account" class="text-2xl text-[#7CABD3]"></iconify-icon>
                    </div>
                    <div>
                        <p class="font-fira text-[#1A2B49] text-lg" id="convNom">Sélectionnez un prestataire</p>
                        <p class="text-gray-400 text-sm" id="convRole">—</p>
                    </div>
                </div>

                <div id="messagesContainer" class="flex-1 p-6 space-y-3">
                    <div class="flex items-center justify-center h-full">
                        <div class="text-center text-gray-300">
                            <iconify-icon icon="mdi:chat-outline" class="text-6xl mb-3 block"></iconify-icon>
                            <p class="font-fira uppercase text-sm tracking-widest">Choisissez un prestataire</p>
                        </div>
                    </div>
                </div>

                <div id="zoneEnvoi" class="hidden p-4 border-t border-gray-100">
                    <div class="flex gap-3">
                        <input type="text" id="inputMessage" placeholder="Écrivez votre message..."
                            class="flex-1 px-5 py-3 bg-gray-50 border-2 border-transparent rounded-full font-fira text-[#1A2B49] focus:outline-none focus:border-[#7CABD3] transition-all"
                            onkeydown="if(event.key==='Enter') envoyerMessage()">
                        <button onclick="envoyerMessage()"
                            class="w-12 h-12 bg-[#7CABD3] text-white rounded-full flex items-center justify-center hover:bg-[#1A2B49] transition-all flex-shrink-0">
                            <iconify-icon icon="mdi:send" class="text-xl"></iconify-icon>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </main>

    <?php include('../include/footer.php'); ?>
    <script src="/js/users/senior/messagerie_senior.js?v=<?php echo time(); ?>"></script>
</body>
</html>