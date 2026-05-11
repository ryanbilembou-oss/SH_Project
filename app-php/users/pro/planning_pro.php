<?php
require_once('../../auth.php');
echo $_SESSION['id_user'] ;
echo $_SESSION['role'] ;
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
            <p class="text-gray-400 mt-1 text-lg">Vos interventions et vos disponibilités.</p>
        </div>
        <div class="flex gap-4 mb-8 flex-wrap">
            <a href="/users/pro/offres_pro.php" class="flex items-center gap-3 px-8 py-4 bg-[#7CABD3] text-white rounded-full font-fira uppercase text-sm hover:bg-[#1A2B49] transition-all shadow-lg">
                <iconify-icon icon="mdi:calendar-plus" class="text-2xl"></iconify-icon>
                créer une offre 
            </a>
            <a href="/users/pro/interventions_pro.php" class="flex items-center gap-3 px-8 py-4 bg-[#FCE297] text-[#1A2B49] rounded-full font-fira uppercase text-sm hover:bg-[#1A2B49] hover:text-white transition-all shadow-lg">
                <iconify-icon icon="mdi:briefcase-plus" class="text-2xl"></iconify-icon>
                Voir mes interventions
            </a>
        </div>


        <div class="bg-white rounded-[40px] shadow-lg border-2 border-gray-100 overflow-hidden mb-10">
            <div class="flex items-center justify-between p-6 border-b border-gray-100">
                <button id="prevWeek" class="w-12 h-12 flex items-center justify-center rounded-full border-2 border-[#7CABD3] hover:bg-[#7CABD3] hover:text-white text-[#7CABD3] transition-all font-fira text-lg">←</button>
                <div class="font-fira text-[#1A2B49] text-xl uppercase tracking-wider" id="weekLabel"></div>
                <button id="nextWeek" class="w-12 h-12 flex items-center justify-center rounded-full border-2 border-[#7CABD3] hover:bg-[#7CABD3] hover:text-white text-[#7CABD3] transition-all font-fira text-lg">→</button>
            </div>
            <div class="overflow-x-auto">
                <div id="calendarGrid"></div>
            </div>
        </div>

        <div class="mb-6 flex items-center justify-between flex-wrap gap-4">
            <h3 class="text-4xl font-fira uppercase tracking-tighter text-[#1A2B49]">
                Mes <span class="text-[#7CABD3]">disponibilités</span>
            </h3>
            <button onclick="ouvrirModalAjout()"
                class="flex items-center gap-2 px-8 py-4 bg-[#7CABD3] text-white rounded-full font-fira uppercase text-sm hover:bg-[#1A2B49] transition-all shadow-lg">
                <iconify-icon icon="mdi:plus" class="text-xl"></iconify-icon>
                Ajouter un créneau
            </button>
        </div>

        <div id="disponibilitesList" class="grid md:grid-cols-2 gap-4 mb-16">
            <div class="bg-white p-6 rounded-[40px] border-2 border-dashed border-gray-200 text-center col-span-2">
                <p class="text-gray-400 italic">Chargement...</p>
            </div>
        </div>

    </main>

    <div id="modalCreneau" class="hidden fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
        <div class="bg-white rounded-[40px] shadow-2xl p-8 w-full max-w-md">
            <h4 class="text-3xl font-fira uppercase text-[#1A2B49] mb-6" id="modalTitre">Ajouter un créneau</h4>

            <div class="space-y-4">
                <div>
                    <label class="font-fira uppercase text-sm text-gray-400 mb-1 block">Jour</label>
                    <select id="inputJour" class="w-full border-2 border-gray-200 rounded-[20px] px-4 py-3 font-fira focus:outline-none focus:border-[#7CABD3]">
                        <option value="1">Lundi</option>
                        <option value="2">Mardi</option>
                        <option value="3">Mercredi</option>
                        <option value="4">Jeudi</option>
                        <option value="5">Vendredi</option>
                        <option value="6">Samedi</option>
                        <option value="7">Dimanche</option>
                    </select>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="font-fira uppercase text-sm text-gray-400 mb-1 block">Début</label>
                        <input type="time" id="inputDebut" class="w-full border-2 border-gray-200 rounded-[20px] px-4 py-3 font-fira focus:outline-none focus:border-[#7CABD3]">
                    </div>
                    <div>
                        <label class="font-fira uppercase text-sm text-gray-400 mb-1 block">Fin</label>
                        <input type="time" id="inputFin" class="w-full border-2 border-gray-200 rounded-[20px] px-4 py-3 font-fira focus:outline-none focus:border-[#7CABD3]">
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
    <div>
        <label class="block text-sm font-fira uppercase tracking-widest text-gray-400 mb-2">Duree intervention</label>
        <select id="inputDuree" class="w-full border-2 border-gray-100 rounded-[15px] px-4 py-3 font-fira focus:outline-none focus:border-[#7CABD3] bg-white">
            <option value="30">30 minutes</option>
            <option value="45">45 minutes</option>
            <option value="60" selected>1 heure</option>
            <option value="90">1h30</option>
            <option value="120">2 heures</option>
        </select>
    </div>
    <div>
        <label class="block text-sm font-fira uppercase tracking-widest text-gray-400 mb-2">Pause entre</label>
        <select id="inputPause" class="w-full border-2 border-gray-100 rounded-[15px] px-4 py-3 font-fira focus:outline-none focus:border-[#7CABD3] bg-white">
            <option value="0">Pas de pause</option>
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
        </select>
    </div>
</div>
                <div class="flex items-center gap-3">
                    <input type="checkbox" id="inputActif" checked class="w-5 h-5 accent-[#7CABD3]">
                    <label for="inputActif" class="font-fira text-[#1A2B49]">Créneau actif</label>
                </div>
            </div>

            <input type="hidden" id="inputIdPlanning" value="">

            <div class="flex gap-4 mt-8">
                <button onclick="sauvegarderCreneau()"
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

    <script src="/js/users/pro/planning_pro.js?v=<?php echo time(); ?>"></script>
    <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script>

<script src="/js/include/onesignal.js" defer></script>

<script src="/js/include/notifications.js?v=<?php echo time(); ?>"></script>
</body>
</html>