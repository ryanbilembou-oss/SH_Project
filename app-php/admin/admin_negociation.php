<?php
require_once('../auth.php');

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy - Négociations Commission</title>
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
                Négociations <span class="text-blue-500">commissions</span>
            </h1>
            <p class="text-gray-400 mt-1">Gérez les demandes de renégociation des prestataires.</p>
        </div>
 
        <div class="flex gap-3 mb-6 flex-wrap">
            <button onclick="filtrer('tous')" id="btn-tous"
                class="filtre-btn px-5 py-2 rounded-full font-fira text-sm uppercase bg-gray-800 text-white transition-all">
                Toutes
            </button>
            <button onclick="filtrer('en_attente')" id="btn-en_attente"
                class="filtre-btn px-5 py-2 rounded-full font-fira text-sm uppercase bg-white border-2 border-yellow-400 text-yellow-600 transition-all hover:bg-yellow-400 hover:text-white">
                En attente
            </button>
            <button onclick="filtrer('accepte')" id="btn-accepte"
                class="filtre-btn px-5 py-2 rounded-full font-fira text-sm uppercase bg-white border-2 border-green-400 text-green-600 transition-all hover:bg-green-400 hover:text-white">
                Acceptées
            </button>
            <button onclick="filtrer('refuse')" id="btn-refuse"
                class="filtre-btn px-5 py-2 rounded-full font-fira text-sm uppercase bg-white border-2 border-red-400 text-red-500 transition-all hover:bg-red-400 hover:text-white">
                Refusées
            </button>
        </div>

        <div id="listeNego" class="space-y-4">
            <p class="text-gray-400 italic">Chargement...</p>
        </div>

    </main>
 
    <div id="modalReponse" class="hidden fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
        <div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg">
            <h3 class="text-2xl font-fira uppercase text-gray-800 mb-6 flex items-center gap-2">
                <iconify-icon icon="mdi:handshake" class="text-blue-500"></iconify-icon>
                Répondre à la demande
            </h3>
            <div id="modalDetails" class="bg-gray-50 rounded-xl p-4 mb-5"></div>

            <div class="mb-4">
                <label class="font-fira uppercase text-xs tracking-widest text-gray-400 block mb-2">
                    Taux final accordé (%) <span class="text-gray-300">— laisser vide = taux proposé par le pro</span>
                </label>
                <input type="number" id="tauxFinal" min="1" max="30" step="0.5" placeholder="Ex: 12"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-fira focus:outline-none focus:border-blue-400">
            </div>

            <div class="mb-6">
                <label class="font-fira uppercase text-xs tracking-widest text-gray-400 block mb-2">Message au prestataire</label>
                <textarea id="reponseAdmin" rows="3" placeholder="Expliquez votre décision..."
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-fira focus:outline-none focus:border-blue-400 resize-none"></textarea>
            </div>

            <div class="flex gap-3">
                <button onclick="repondre('accepte')"
                    class="flex-1 py-3 bg-green-500 text-white rounded-xl font-fira uppercase hover:bg-green-600 transition-all">
                    <iconify-icon icon="mdi:check" class="mr-1"></iconify-icon> Accepter
                </button>
                <button onclick="repondre('refuse')"
                    class="flex-1 py-3 bg-red-500 text-white rounded-xl font-fira uppercase hover:bg-red-600 transition-all">
                    <iconify-icon icon="mdi:close" class="mr-1"></iconify-icon> Refuser
                </button>
                <button onclick="fermerModal()"
                    class="px-5 py-3 border-2 border-gray-200 text-gray-500 rounded-xl font-fira uppercase hover:bg-gray-100 transition-all">
                    Annuler
                </button>
            </div>
        </div>
    </div>

    <script src="/js/admin/admin_negociation.js?v=<?php echo time(); ?>"></script>
</body>
</html>