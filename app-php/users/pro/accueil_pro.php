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
    <title>Silver Happy - Espace Prestataire</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:wght@400;700;900&display=swap" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/intro.js/8.3.2/introjs.min.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/intro.js/8.3.2/intro.min.js"></script>
    <link href="/users/style/style_introJs.css" rel="stylesheet">

    <style>
        body { font-family: 'Fira Sans Condensed', sans-serif; background-color: #FFFFF6; font-size: 18px; }
    </style>
</head>
<body class="bg-[#FFFFF6] min-h-screen">

    <?php include('../include/navbar.php'); ?>

    <main class="container mx-auto max-w-6xl px-4 py-10">

        <div class="mb-10">
            <h2 class="text-5xl font-fira uppercase tracking-tighter text-[#1A2B49]">
                Bonjour, <span class="text-[#7CABD3]" id="prenomUser">—</span> !
            </h2>
            <p class="text-gray-400 mt-1 text-lg">Voici votre tableau de bord prestataire Silver Happy.</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <div class="group bg-white p-8 rounded-[40px] border-2 border-transparent hover:border-[#7CABD3] hover:shadow-xl transition-all duration-500 text-center cursor-pointer">
                <iconify-icon icon="mdi:calendar-check" class="text-5xl text-[#7CABD3] mb-3 block group-hover:scale-110 transition-transform"></iconify-icon>
                <p class="text-4xl font-fira text-[#1A2B49]" id="nbInterventions">—</p>
                <p class="text-sm text-gray-400 uppercase font-fira tracking-widest mt-1">Interventions</p>
            </div>
            <div class="group bg-white p-8 rounded-[40px] border-2 border-transparent hover:border-[#FCE297] hover:shadow-xl transition-all duration-500 text-center cursor-pointer">
                <iconify-icon icon="mdi:briefcase-check" class="text-5xl text-[#FCE297] mb-3 block group-hover:scale-110 transition-transform"></iconify-icon>
                <p class="text-4xl font-fira text-[#1A2B49]" id="nbOffres">—</p>
                <p class="text-sm text-gray-400 uppercase font-fira tracking-widest mt-1">Offres</p>
            </div>
            <div class="group bg-white p-8 rounded-[40px] border-2 border-transparent hover:border-[#7CABD3] hover:shadow-xl transition-all duration-500 text-center cursor-pointer">
                <iconify-icon icon="mdi:file-document-outline" class="text-5xl text-[#7CABD3] mb-3 block group-hover:scale-110 transition-transform"></iconify-icon>
                <p class="text-4xl font-fira text-[#1A2B49]" id="nbDevis">—</p>
                <p class="text-sm text-gray-400 uppercase font-fira tracking-widest mt-1">Devis</p>
            </div>
            <div class="group bg-white p-8 rounded-[40px] border-2 border-transparent hover:border-[#FCE297] hover:shadow-xl transition-all duration-500 text-center cursor-pointer">
                <iconify-icon icon="mdi:star" class="text-5xl text-[#FCE297] mb-3 block group-hover:scale-110 transition-transform"></iconify-icon>
                <p class="text-4xl font-fira text-[#1A2B49]" id="noteMoyenne">—</p>
                <p class="text-sm text-gray-400 uppercase font-fira tracking-widest mt-1">Note moy.</p>
            </div>
        </div>

        <div class="grid md:grid-cols-3 gap-8 mb-16">

            <div class="md:col-span-2">
                <h3 class="text-4xl font-fira uppercase tracking-tighter text-[#1A2B49] mb-8">
                    Mes <span class="text-[#7CABD3]">interventions</span>
                </h3>
                <div class="space-y-4" id="interventionsList">
                    <div class="bg-white p-6 rounded-[40px] border-2 border-dashed border-gray-200 text-center">
                        <p class="text-gray-400 italic text-lg">Chargement...</p>
                    </div>
                </div>
                <div class="flex justify-center mt-6">
                    <a href="/users/pro/interventions_pro.php"
                       class="bg-[#7CABD3] text-white px-8 py-3 rounded-full shadow hover:text-[#7CABD3] hover:bg-white border-2 border-[#7CABD3] transition-all duration-300 font-fira text-base">
                        Voir toutes mes interventions
                    </a>
                </div>
            </div>

            <div>
                <h3 class="text-4xl font-fira uppercase tracking-tighter text-[#1A2B49] mb-8">
                    Actions <span class="text-[#7CABD3]">rapides</span>
                </h3>
                <div class="space-y-4">
                    <a href="/users/pro/planning_pro.php"
                       class="group bg-white p-5 rounded-[30px] border-2 border-transparent hover:border-[#7CABD3] hover:shadow-lg transition-all duration-300 flex items-center gap-4">
                        <iconify-icon icon="mdi:clock-outline" class="text-4xl text-[#7CABD3] group-hover:scale-110 transition-transform"></iconify-icon>
                        <span class="font-fira uppercase text-[#1A2B49] text-base">Gérer mes disponibilités</span>
                    </a>
                    <a href="/users/pro/offres_pro.php"
                       class="group bg-white p-5 rounded-[30px] border-2 border-transparent hover:border-[#FCE297] hover:shadow-lg transition-all duration-300 flex items-center gap-4">
                        <iconify-icon icon="mdi:briefcase-plus" class="text-4xl text-[#FCE297] group-hover:scale-110 transition-transform"></iconify-icon>
                        <span class="font-fira uppercase text-[#1A2B49] text-base">Mes offres de service</span>
                    </a>
                    <a href="/users/pro/devis_pro.php"
                       class="group bg-white p-5 rounded-[30px] border-2 border-transparent hover:border-[#7CABD3] hover:shadow-lg transition-all duration-300 flex items-center gap-4">
                        <iconify-icon icon="mdi:file-document" class="text-4xl text-[#7CABD3] group-hover:scale-110 transition-transform"></iconify-icon>
                        <span class="font-fira uppercase text-[#1A2B49] text-base">Mes devis & factures</span>
                    </a>
                    <a href="/users/pro/avis_pro.php"
                       class="group bg-white p-5 rounded-[30px] border-2 border-transparent hover:border-[#FCE297] hover:shadow-lg transition-all duration-300 flex items-center gap-4">
                        <iconify-icon icon="mdi:star-outline" class="text-4xl text-[#FCE297] group-hover:scale-110 transition-transform"></iconify-icon>
                        <span class="font-fira uppercase text-[#1A2B49] text-base">Mes avis reçus</span>
                    </a>
                    <a href="/users/pro/profil_pro.php"
                       class="group bg-white p-5 rounded-[30px] border-2 border-transparent hover:border-[#7CABD3] hover:shadow-lg transition-all duration-300 flex items-center gap-4">
                        <iconify-icon icon="mdi:account-edit" class="text-4xl text-[#7CABD3] group-hover:scale-110 transition-transform"></iconify-icon>
                        <span class="font-fira uppercase text-[#1A2B49] text-base">Mon profil</span>
                    </a>
                </div>
            </div>
        </div>

    
        <section class="pb-16">
            <h3 class="text-4xl font-fira uppercase tracking-tighter text-[#1A2B49] mb-10 text-center">
                Derniers <span class="text-[#7CABD3]">avis</span>
            </h3>
            <div id="avisList" class="flex flex-wrap justify-center gap-8">
                <div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-gray-200 text-center w-72">
                    <iconify-icon icon="mdi:star" class="text-4xl text-gray-300 mb-3 block"></iconify-icon>
                    <p class="text-gray-400 italic text-base">Chargement...</p>
                </div>
            </div>
            <div class="flex justify-center mt-10">
                <a href="/users/pro/avis_pro.php"
                   class="bg-[#7CABD3] text-white px-8 py-3 rounded-full shadow hover:text-[#7CABD3] hover:bg-white border-2 border-[#7CABD3] transition-all duration-300 font-fira text-base">
                    Voir tous mes avis
                </a>
            </div>
        </section>

    </main>

    <?php include('../include/footer.php'); ?>

    <script src="/js/users/pro/accueil_pro.js?v=<?php echo time(); ?>"></script>
    <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script>

<script src="/js/include/onesignal.js" defer></script>

<script src="/js/include/notifications.js?v=<?php echo time(); ?>"></script>
</body>
</html>