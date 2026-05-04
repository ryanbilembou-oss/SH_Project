<?php
require_once('../../auth.php');

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy - Mes Interventions</title>
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

        <div class="mb-10">
            <h2 class="text-5xl font-fira uppercase tracking-tighter text-[#1A2B49]">
                Mes <span class="text-[#7CABD3]">interventions</span>
            </h2>
            <p class="text-gray-400 mt-1 text-lg">Historique de vos prestations avec nos prestataires.</p>
        </div>
        <div class="flex flex-wrap gap-3 mb-4">
            <button onclick="filtrerStatut('tous')" id="filtre-tous"
                class="filtre-btn px-6 py-2 rounded-full font-fira uppercase text-sm border-2 border-[#1A2B49] bg-[#1A2B49] text-white transition-all">
                Toutes
            </button>
            <button onclick="filtrerStatut('planifiee')" id="filtre-planifiee"
                class="filtre-btn px-6 py-2 rounded-full font-fira uppercase text-sm border-2 border-[#7CABD3] text-[#7CABD3] hover:bg-[#7CABD3] hover:text-white transition-all">
                Planifiées
            </button>
            <button onclick="filtrerStatut('en_cours')" id="filtre-en_cours"
                class="filtre-btn px-6 py-2 rounded-full font-fira uppercase text-sm border-2 border-[#FCE297] text-[#1A2B49] hover:bg-[#FCE297] transition-all">
                En cours
            </button>
            <button onclick="filtrerStatut('terminee')" id="filtre-terminee"
                class="filtre-btn px-6 py-2 rounded-full font-fira uppercase text-sm border-2 border-green-400 text-green-500 hover:bg-green-400 hover:text-white transition-all">
                Terminées
            </button>
            <button onclick="filtrerStatut('annulee')" id="filtre-annulee"
                class="filtre-btn px-6 py-2 rounded-full font-fira uppercase text-sm border-2 border-red-300 text-red-400 hover:bg-red-400 hover:text-white transition-all">
                Annulées
            </button>
        </div>

        <div class="flex flex-wrap gap-3 mb-8" id="filtresCatInter">
            <button onclick="filtrerCategorie(null)" id="cat-inter-tous"
                class="btn-cat-inter px-5 py-2 rounded-full font-fira text-sm bg-[#1A2B49] text-white transition-all">
                Toutes catégories
            </button>
        </div>

        <div id="interventionsList" class="space-y-4">
            <div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-gray-200 text-center">
                <p class="text-gray-400 italic">Chargement...</p>
            </div>
        </div>

    </main>

    <div id="modalAvis" class="hidden fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
        <div class="bg-white rounded-[40px] shadow-2xl p-8 w-full max-w-md">
            <h4 class="text-3xl font-fira uppercase text-[#1A2B49] mb-2">Laisser un avis</h4>
            <p class="text-gray-400 mb-6 text-base" id="modalAvisSous"></p>
            <div class="flex justify-center gap-3 mb-6" id="etoilesInput">
                <button onclick="setNote(1)" id="star-1" class="text-5xl text-gray-200 hover:text-[#FCE297] transition-all">★</button>
                <button onclick="setNote(2)" id="star-2" class="text-5xl text-gray-200 hover:text-[#FCE297] transition-all">★</button>
                <button onclick="setNote(3)" id="star-3" class="text-5xl text-gray-200 hover:text-[#FCE297] transition-all">★</button>
                <button onclick="setNote(4)" id="star-4" class="text-5xl text-gray-200 hover:text-[#FCE297] transition-all">★</button>
                <button onclick="setNote(5)" id="star-5" class="text-5xl text-gray-200 hover:text-[#FCE297] transition-all">★</button>
            </div>
            <div class="mb-6">
                <label class="font-fira uppercase text-sm text-gray-400 mb-1 block">Commentaire (optionnel)</label>
                <textarea id="inputCommentaire" rows="3" placeholder="Partagez votre expérience..."
                    class="w-full border-2 border-gray-200 rounded-[20px] px-4 py-3 font-fira focus:outline-none focus:border-[#7CABD3] resize-none"></textarea>
            </div>
            <input type="hidden" id="inputIdIntervention">
            <div class="flex gap-4">
                <button onclick="envoyerAvis()"
                    class="flex-1 bg-[#FCE297] text-[#1A2B49] py-3 rounded-full font-fira uppercase hover:bg-[#1A2B49] hover:text-white transition-all">
                    Envoyer
                </button>
                <button onclick="fermerModalAvis()"
                    class="flex-1 border-2 border-gray-200 text-gray-400 py-3 rounded-full font-fira uppercase hover:border-[#7CABD3] hover:text-[#7CABD3] transition-all">
                    Annuler
                </button>
            </div>
        </div>
    </div>

    <?php include('../include/footer.php'); ?>
    <script src="/js/users/senior/interventions_senior.js?v=<?php echo time(); ?>"></script>
</body>
</html>