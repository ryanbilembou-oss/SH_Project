<?php
require_once('../../auth.php');

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy - Mes Offres</title>
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

    <main class="container mx-auto max-w-6xl px-4 py-10">

        <div class="mb-10 flex items-center justify-between flex-wrap gap-4">
            <div>
                <h2 class="text-5xl font-fira uppercase tracking-tighter text-[#1A2B49]">
                    Mes <span class="text-[#7CABD3]">offres</span>
                </h2>
                <p class="text-gray-400 mt-1 text-lg">Gérez les services que vous proposez.</p>
            </div>
            <button onclick="ouvrirModalAjout()"
                class="flex items-center gap-2 px-8 py-4 bg-[#7CABD3] text-white rounded-full font-fira uppercase text-sm hover:bg-[#1A2B49] transition-all shadow-lg">
                <iconify-icon icon="mdi:plus" class="text-xl"></iconify-icon>
                Ajouter une offre
            </button>
        </div>

        <div id="offresList" class="grid md:grid-cols-2 gap-6">
            <div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-gray-200 text-center col-span-2">
                <p class="text-gray-400 italic">Chargement...</p>
            </div>
        </div>

    </main>

    <div id="modalOffre" class="hidden fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
        <div class="bg-white rounded-[40px] shadow-2xl p-8 w-full max-w-lg">
            <h4 class="text-3xl font-fira uppercase text-[#1A2B49] mb-6" id="modalTitre">Ajouter une offre</h4>

            <div class="space-y-4">
                <div>
                    <label class="font-fira uppercase text-sm text-gray-400 mb-1 block">Service proposé</label>
                    <select id="inputService" class="w-full border-2 border-gray-200 rounded-[20px] px-4 py-3 font-fira focus:outline-none focus:border-[#7CABD3]">
                        <option value="">Chargement...</option>
                    </select>
                </div>
                <div>
                    <label class="font-fira uppercase text-sm text-gray-400 mb-1 block">Titre de l'offre</label>
                    <input type="text" id="inputTitre" placeholder="Ex: Coaching sportif individuel"
                        class="w-full border-2 border-gray-200 rounded-[20px] px-4 py-3 font-fira focus:outline-none focus:border-[#7CABD3]">
                </div>
                <div>
                    <label class="font-fira uppercase text-sm text-gray-400 mb-1 block">Prix (€)</label>
                    <input type="number" id="inputPrix" min="0" step="0.01" placeholder="0.00"
                        class="w-full border-2 border-gray-200 rounded-[20px] px-4 py-3 font-fira focus:outline-none focus:border-[#7CABD3]">
                </div>
                <div>
                    <label class="font-fira uppercase text-sm text-gray-400 mb-1 block">Description</label>
                    <textarea id="inputBio" rows="3" placeholder="Décrivez votre offre..."
                        class="w-full border-2 border-gray-200 rounded-[20px] px-4 py-3 font-fira focus:outline-none focus:border-[#7CABD3] resize-none"></textarea>
                </div>
            </div>

            <input type="hidden" id="inputIdOffre" value="">

            <div class="flex gap-4 mt-8">
                <button onclick="sauvegarderOffre()"
                    class="flex-1 bg-[#7CABD3] text-white py-3 rounded-full font-fira uppercase hover:bg-[#1A2B49] transition-all">
                    Sauvegarder
                </button>
                <button onclick="fermerModal()"
                    class="flex-1 border-2 border-gray-200 text-gray-400 py-3 rounded-full font-fira uppercase hover:border-[#7CABD3] hover:text-[#7CABD3] transition-all">
                    Annuler
                </button>
            </div>
        </div>
    </div>

    <?php include('../include/footer.php'); ?>
    <script src="/js/users/pro/offres_pro.js?v=<?php echo time(); ?>"></script>
    <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script>

<script src="/js/include/onesignal.js" defer></script>

<script src="/js/include/notifications.js?v=<?php echo time(); ?>"></script>
</body>
</html>