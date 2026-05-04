<?php
require_once('../../auth.php');

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy - Mes Demandes</title>
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

        <div class="flex items-center justify-between flex-wrap gap-4 mb-10">
            <div>
                <h2 class="text-5xl font-fira uppercase tracking-tighter text-[#1A2B49]">
                    Demandes <span class="text-[#7CABD3]">reçues</span>
                </h2>
                <p class="text-gray-400 mt-1 text-lg">Les seniors souhaitent bénéficier de vos services.</p>
            </div>
            <a href="/users/pro/interventions_pro.php"
               class="flex items-center gap-2 px-8 py-4 bg-white border-2 border-[#7CABD3] text-[#7CABD3] rounded-full font-fira uppercase text-sm hover:bg-[#7CABD3] hover:text-white transition-all shadow">
                <iconify-icon icon="mdi:calendar-check"></iconify-icon> Voir mes interventions
            </a>
        </div>
        <div class="flex flex-wrap gap-3 mb-8">
            <button onclick="filtrer('en_attente')" id="filtre-en_attente"
                class="filtre-btn px-6 py-2 rounded-full font-fira uppercase text-sm border-2 border-[#FCE297] bg-[#FCE297] text-[#1A2B49] transition-all">
                En attente
            </button>
            <button onclick="filtrer('accepte')" id="filtre-accepte"
                class="filtre-btn px-6 py-2 rounded-full font-fira uppercase text-sm border-2 border-[#7CABD3] text-[#7CABD3] hover:bg-[#7CABD3] hover:text-white transition-all">
                Acceptées
            </button>
            <button onclick="filtrer('refuse')" id="filtre-refuse"
                class="filtre-btn px-6 py-2 rounded-full font-fira uppercase text-sm border-2 border-red-300 text-red-400 hover:bg-red-400 hover:text-white transition-all">
                Refusées
            </button>
            <button onclick="filtrer('annulee')" id="filtre-annulee"
                class="filtre-btn px-6 py-2 rounded-full font-fira uppercase text-sm border-2 border-gray-300 text-gray-400 hover:bg-gray-400 hover:text-white transition-all">
                Annulées
            </button>
        </div>

        <div id="demandesList" class="space-y-4">
            <div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-gray-200 text-center">
                <p class="text-gray-400 italic">Chargement...</p>
            </div>
        </div>

    </main>

    <div id="modalAccepter" class="hidden fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
        <div class="bg-white rounded-[40px] shadow-2xl p-8 w-full max-w-lg">
            <h4 class="text-3xl font-fira uppercase text-[#1A2B49] mb-2">Confirmer l'intervention</h4>
            <p class="text-gray-400 mb-4 text-base" id="modalAccepterSous"></p>

            <div id="infoPlanning" class="hidden mb-4 bg-[#7CABD3]/10 border-2 border-[#7CABD3]/30 rounded-[20px] p-3">
                <p class="font-fira text-sm text-[#7CABD3]">
                    <iconify-icon icon="mdi:clock-check" class="mr-1"></iconify-icon>
                    <span id="infoPlanning"></span>
                </p>
            </div>

            <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="font-fira uppercase text-sm text-gray-400 mb-1 block">Heure de début</label>
                        <p id="infoPlanning" class="hidden text-xs font-fira text-[#7CABD3] bg-[#7CABD3]/10 px-3 py-2 rounded-[15px] mb-2"></p>
                    <input type="time" id="inputHeureDebut"
                            class="w-full border-2 border-gray-200 rounded-[20px] px-4 py-3 font-fira focus:outline-none focus:border-[#7CABD3]">
                    </div>
                    <div>
                        <label class="font-fira uppercase text-sm text-gray-400 mb-1 block">Heure de fin</label>
                        <input type="time" id="inputHeureFin"
                            class="w-full border-2 border-gray-200 rounded-[20px] px-4 py-3 font-fira focus:outline-none focus:border-[#7CABD3]">
                    </div>
                </div>
                <div>
                    <label class="font-fira uppercase text-sm text-gray-400 mb-1 block">Lieu</label>
                    <input type="text" id="inputLieu" placeholder="Adresse de l'intervention"
                        class="w-full border-2 border-gray-200 rounded-[20px] px-4 py-3 font-fira focus:outline-none focus:border-[#7CABD3]">
                </div>
                <div>
                    <label class="font-fira uppercase text-sm text-gray-400 mb-1 block">Note (optionnel)</label>
                    <textarea id="inputBioIntervention" rows="2" placeholder="Informations supplémentaires..."
                        class="w-full border-2 border-gray-200 rounded-[20px] px-4 py-3 font-fira focus:outline-none focus:border-[#7CABD3] resize-none"></textarea>
                </div>
            </div>
            <input type="hidden" id="inputIdDemande">
            <div class="flex gap-4 mt-8">
                <button onclick="confirmerAcceptation()"
                    class="flex-1 bg-[#7CABD3] text-white py-3 rounded-full font-fira uppercase hover:bg-[#1A2B49] transition-all">
                    Confirmer
                </button>
                <button onclick="fermerModal()"
                    class="flex-1 border-2 border-gray-200 text-gray-400 py-3 rounded-full font-fira uppercase hover:border-[#7CABD3] hover:text-[#7CABD3] transition-all">
                    Annuler
                </button>
            </div>
        </div>
    </div>

    <?php include('../include/footer.php'); ?>
    <script src="/js/users/pro/demandes_pro.js?v=<?php echo time(); ?>"></script>
</body>
</html>