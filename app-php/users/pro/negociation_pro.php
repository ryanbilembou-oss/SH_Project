<?php
require_once('../../auth.php');

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy - Négociation Commission</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:wght@400;700;900&display=swap" rel="stylesheet">
    <link rel="icon" href="/img/logo-clear.png">
    <style>body { font-family: 'Fira Sans Condensed', sans-serif; background-color: #FFFFF6; font-size: 18px; }</style>
</head>
<body class="bg-[#FFFFF6] min-h-screen">

    <div id="toast" class="fixed top-6 left-1/2 transform -translate-x-1/2 -translate-y-20 opacity-0 z-50 transition-all duration-500 pointer-events-none">
        <div class="bg-[#1A2B49] text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3">
            <span id="toastIcon"></span>
            <span id="toastMsg" class="font-fira uppercase text-sm tracking-widest"></span>
        </div>
    </div>

    <?php include('../include/navbar.php'); ?>

    <main class="container mx-auto max-w-3xl px-4 py-10">

        <div class="mb-10">
            <h2 class="text-5xl font-fira uppercase tracking-tighter text-[#1A2B49]">
                Négociation <span class="text-[#7CABD3]">commission</span>
            </h2>
            <p class="text-gray-400 mt-1 text-lg">Proposez un nouveau taux de commission à Silver Happy.</p>
        </div>

        <div class="bg-white p-8 rounded-[40px] border-2 border-transparent hover:border-[#7CABD3] transition-all mb-6">
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-fira uppercase text-xs tracking-widest text-gray-400 mb-1">Votre commission actuelle</p>
                    <p class="font-fira text-[#1A2B49] text-5xl" id="commissionActuelle">—</p>
                    <p class="text-gray-400 text-sm mt-1">Prélevée par Silver Happy sur chaque intervention</p>
                </div>
                <iconify-icon icon="mdi:percent" class="text-6xl text-[#7CABD3]"></iconify-icon>
            </div>
        </div>

        <div class="bg-white p-8 rounded-[40px] border-2 border-transparent hover:border-[#7CABD3] transition-all mb-6" id="formDemande">
            <h3 class="font-fira uppercase text-[#1A2B49] text-xl mb-6 flex items-center gap-2">
                <iconify-icon icon="mdi:handshake" class="text-[#7CABD3]"></iconify-icon>
                Soumettre une demande
            </h3>

            <div class="space-y-5">
                <div>
                    <label class="font-fira uppercase text-xs tracking-widest text-gray-400 block mb-2">
                        Taux proposé (%)
                    </label>
                    <div class="flex items-center gap-4">
                        <input type="range" id="tauxRange" min="1" max="30" value="10" step="0.5"
                            class="flex-1 h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#7CABD3]"
                            oninput="document.getElementById('tauxValeur').textContent = this.value + '%'">
                        <span class="font-fira text-[#1A2B49] text-3xl w-20 text-right" id="tauxValeur">10%</span>
                    </div>
                    <div class="flex justify-between text-xs text-gray-300 font-fira mt-1">
                        <span>1%</span><span>30%</span>
                    </div>
                </div>

                <div>
                    <label class="font-fira uppercase text-xs tracking-widest text-gray-400 block mb-2">
                        Message à l'admin <span class="text-gray-300">(optionnel)</span>
                    </label>
                    <textarea id="messageNego" rows="3" placeholder="Expliquez votre demande..."
                        class="w-full px-5 py-3 bg-gray-50 border-2 border-transparent rounded-[20px] font-fira text-[#1A2B49] focus:outline-none focus:border-[#7CABD3] resize-none transition-all"></textarea>
                </div>

                <button onclick="soumettreDemande()"
                    class="w-full py-4 bg-[#7CABD3] text-white rounded-full font-fira uppercase hover:bg-[#1A2B49] transition-all">
                    <iconify-icon icon="mdi:send" class="mr-2"></iconify-icon>
                    Envoyer la demande
                </button>
            </div>
        </div>

        <div class="bg-white p-8 rounded-[40px] border-2 border-transparent hover:border-[#7CABD3] transition-all">
            <h3 class="font-fira uppercase text-[#1A2B49] text-xl mb-6 flex items-center gap-2">
                <iconify-icon icon="mdi:history" class="text-gray-400"></iconify-icon>
                Historique de mes demandes
            </h3>
            <div id="historiqueNego" class="space-y-4">
                <p class="text-gray-400 italic text-sm">Chargement...</p>
            </div>
        </div>

    </main>

    <?php include('../include/footer.php'); ?>
    <script src="/js/users/pro/negociation_pro.js?v=<?php echo time(); ?>"></script>
</body>
</html>