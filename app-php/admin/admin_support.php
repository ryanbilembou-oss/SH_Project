<?php require_once('../auth.php'); ?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy | Support</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body class="bg-gray-100 font-sans leading-normal tracking-normal">

    <div class="flex flex-col md:flex-row min-h-screen">
        <?php include('../include/sidebar.php'); ?>
        <main class="flex-1 bg-gray-50 mt-12 md:mt-0 pb-10 flex flex-col">
            <header class="bg-gray-800 pt-3">
                <div class="bg-gradient-to-r from-blue-900 to-gray-800 p-6 shadow-md text-white flex justify-between items-center rounded-tl-3xl">
                    <h1 class="text-2xl font-bold uppercase tracking-wide">Support Silver Happy</h1>
                    <p class="text-gray-400 text-sm">Conversations avec le support</p>
                </div>
            </header>

            <div class="flex flex-1 overflow-hidden" style="height: calc(100vh - 88px);">
                <div class="w-80 bg-white border-r border-gray-200 flex flex-col">
                    <div class="p-4 border-b border-gray-200">
                        <div class="relative">
                            <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                            <input type="text" id="searchSupport" placeholder="Rechercher..."
                                oninput="filtrerSupport(this.value)"
                                class="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50">
                        </div>
                    </div>
                    <div id="listeSupport" class="flex-1 overflow-y-auto p-2">
                        <p class="text-gray-400 italic text-sm text-center py-4">Chargement...</p>
                    </div>
                </div>

                <div class="flex-1 flex flex-col">
                    <div id="convHeader" class="p-4 border-b border-gray-200 bg-white hidden">
                        <p class="font-bold text-gray-800" id="convNom">—</p>
                        <p class="text-sm text-gray-400" id="convRole">—</p>
                    </div>

                    <div id="convVide" class="flex-1 flex items-center justify-center text-center text-gray-300">
                        <div>
                            <i class="fas fa-headset text-6xl mb-4 block"></i>
                            <p class="font-semibold text-gray-400 uppercase tracking-widest text-sm">Selectionnez une conversation</p>
                        </div>
                    </div>

                    <div id="messagesContainer" class="flex-1 overflow-y-auto p-6 space-y-3 hidden"></div>

                    <div id="zoneEnvoi" class="p-4 border-t border-gray-200 bg-white hidden">
                        <div class="flex gap-3">
                            <input type="text" id="inputMessage" placeholder="Votre reponse..."
                                onkeydown="if(event.key==='Enter') envoyerReponse()"
                                class="flex-1 border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                            <button onclick="envoyerReponse()"
                                class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <script src="../js/admin/admin_support.js?v=<?php echo time(); ?>"></script>
</body>
</html>