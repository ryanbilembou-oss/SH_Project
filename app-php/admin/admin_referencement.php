<?php
require_once('../auth.php');

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy - Référencements</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:wght@400;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>body { font-family: 'Fira Sans Condensed', sans-serif; background-color: #f4f6f9; }</style>
</head>
<body class="bg-gray-100 min-h-screen flex">

    <div id="toast" class="fixed top-6 left-1/2 transform -translate-x-1/2 -translate-y-20 opacity-0 z-50 transition-all duration-500 pointer-events-none">
        <div class="bg-gray-800 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3">
            <span id="toastIcon"></span>
            <span id="toastMsg" class="font-fira uppercase text-sm tracking-widest"></span>
        </div>
    </div>

    <?php include('../include/sidebar.php'); ?>

    <main class="flex-1 ml-0 md:ml-64 p-6">

        <div class="mb-8">
            <h1 class="text-4xl font-fira uppercase tracking-tighter text-gray-800">
                Référencements <span class="text-yellow-500">⭐ Sponsorisés</span>
            </h1>
            <p class="text-gray-400 mt-1">Prestataires ayant souscrit au référencement payant.</p>
        </div>
 
        <div class="grid grid-cols-3 gap-4 mb-8">
            <div class="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-yellow-400">
                <p class="text-gray-400 text-xs uppercase tracking-widest mb-1">Actifs</p>
                <p class="text-3xl font-fira text-gray-800" id="kpiActifs">—</p>
            </div>
            <div class="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-blue-400">
                <p class="text-gray-400 text-xs uppercase tracking-widest mb-1">Total historique</p>
                <p class="text-3xl font-fira text-gray-800" id="kpiTotal">—</p>
            </div>
            <div class="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-green-400">
                <p class="text-gray-400 text-xs uppercase tracking-widest mb-1">CA Référencement</p>
                <p class="text-3xl font-fira text-gray-800" id="kpiCA">—</p>
            </div>
        </div>
 
        <div class="flex gap-3 mb-6">
            <button onclick="filtrer('actifs')" id="btn-actifs"
                class="filtre-btn px-5 py-2 rounded-full font-fira text-sm uppercase bg-yellow-400 text-white transition-all">
                 Actifs
            </button>
            <button onclick="filtrer('tous')" id="btn-tous"
                class="filtre-btn px-5 py-2 rounded-full font-fira text-sm uppercase bg-white border-2 border-gray-200 text-gray-500 transition-all">
                Tous
            </button>
            <button onclick="filtrer('expires')" id="btn-expires"
                class="filtre-btn px-5 py-2 rounded-full font-fira text-sm uppercase bg-white border-2 border-gray-200 text-gray-500 transition-all">
                Expirés
            </button>
        </div> 
        <div id="listeRef" class="space-y-4">
            <p class="text-gray-400 italic">Chargement...</p>
        </div>

    </main>

    <script src="../js/admin/admin_referencement.js"></script>
</body>
</html>