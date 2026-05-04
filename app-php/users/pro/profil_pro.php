<?php
require_once('../../auth.php');

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy - Mon Profil</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:wght@400;700;900&display=swap" rel="stylesheet">
    <link rel="icon" href="/img/logo-clear.png">
    <style>
        body { font-family: 'Fira Sans Condensed', sans-serif; background-color: #FFFFF6; font-size: 18px; }
    </style>
</head>
<div id="modalValidation" class="hidden fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
    <div class="bg-white rounded-[40px] shadow-2xl p-8 w-full max-w-md">
        <div class="text-center mb-6">
            <iconify-icon icon="mdi:alert-circle" class="text-5xl text-[#FCE297] block mb-3"></iconify-icon>
            <h4 class="text-3xl font-fira uppercase text-[#1A2B49]">Champs manquants</h4>
            <p class="text-gray-400 mt-2 text-base">Veuillez remplir les champs suivants :</p>
        </div>
        <ul id="listeManquants" class="space-y-2 mb-6"></ul>
        <button onclick="document.getElementById('modalValidation').classList.add('hidden')"
            class="w-full py-3 bg-[#1A2B49] text-white rounded-full font-fira uppercase hover:bg-[#7CABD3] transition-all">
            OK, je complète
        </button>
    </div>
</div>
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
            <h2 class="text-5xl font-fira uppercase tracking-tighter text-[#1A2B49]">
                Mon <span class="text-[#7CABD3]">profil</span>
            </h2>
            <p class="text-gray-400 mt-1 text-lg">Gérez vos informations personnelles et professionnelles.</p>
        </div>

        <div id="profilContainer" class="space-y-6">
            <div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-gray-200 text-center">
                <p class="text-gray-400 italic">Chargement...</p>
            </div>
        </div>

    </main>

    <?php include('../include/footer.php'); ?>
    <script src="/js/users/pro/profil_pro.js?v=<?php echo time(); ?>"></script>
</body>
</html>