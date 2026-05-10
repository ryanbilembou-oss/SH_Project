<?php
require_once('../../auth.php');
session_start();
$current_year = date('Y');
$avatar = 'MF'; 
?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mes Documents – Silver Happy</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet">
    <link rel="icon" href="img/logo-clear.png">
    <style>
        body {
            font-family: 'Fira Sans Condensed', sans-serif;
        }

        .reveal {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity .5s ease, transform .5s ease;
        }

        .reveal.visible {
            opacity: 1;
            transform: none;
        }

        .card-hover:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 30px rgba(124, 171, 211, .15);
        }
    </style>
</head>

<body class="bg-[#FFFFF6] min-h-screen flex flex-col">
    <?php include('../include/navbar.php'); ?>

    <main class="flex-1 w-full max-w-4xl mx-auto px-6 py-12">
        <div class="mb-10 text-center reveal">
            <h1 class="text-3xl font-fira text-[#1A2B49] mb-4">Mes Documents</h1>
            <p class="text-gray-500 text-sm max-w-2xl mx-auto">Retrouvez ici toutes vos factures, devis signés, et
                attestations fiscales classés par année.</p>
        </div>

        
        <div class="mb-10 reveal">
            <h2 class="text-lg font-fira text-[#1A2B49] mb-4 border-b border-gray-100 pb-2">Année 2026</h2>
            <div class="space-y-3">
                <div
                    class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex items-center justify-between p-4 hover:bg-[#FFFFF6] transition-colors card-hover">
                    <div class="flex items-center gap-4">
                        <div
                            class="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center font-fira text-[#1A2B49] border border-gray-100 text-xs">
                            F</div>
                        <div>
                            <p class="text-sm font-fira text-[#1A2B49]">Facture Mensuelle - Mars 2026</p>
                            <p class="text-[10px] text-gray-400">Services : Aide au ménage, Courses</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-6">
                        <span class="text-sm font-black text-[#1A2B49]">145,00 €</span>
                        <a href="#"
                            class="text-[10px] font-fira text-[#7CABD3] hover:text-[#1A2B49] transition-colors border border-gray-100 px-4 py-2 rounded-lg">Télécharger
                            PDF</a>
                    </div>
                </div>

                <div
                    class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex items-center justify-between p-4 hover:bg-[#FFFFF6] transition-colors card-hover">
                    <div class="flex items-center gap-4">
                        <div
                            class="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center font-fira text-[#1A2B49] border border-gray-100 text-xs">
                            F</div>
                        <div>
                            <p class="text-sm font-fira text-[#1A2B49]">Facture Mensuelle - Février 2026</p>
                            <p class="text-[10px] text-gray-400">Services : Aide au ménage</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-6">
                        <span class="text-sm font-black text-[#1A2B49]">85,00 €</span>
                        <a href="#"
                            class="text-[10px] font-fira text-[#7CABD3] hover:text-[#1A2B49] transition-colors border border-gray-100 px-4 py-2 rounded-lg">Télécharger
                            PDF</a>
                    </div>
                </div>
            </div>
        </div>

        
        <div class="mb-10 reveal">
            <h2 class="text-lg font-fira text-[#1A2B49] mb-4 border-b border-gray-100 pb-2">Année 2025</h2>
            <div class="space-y-3">
                <div
                    class="bg-white rounded-2xl border border-[#FCE297]/50 shadow-sm overflow-hidden flex items-center justify-between p-4 hover:bg-[#FFFFF6] transition-colors card-hover">
                    <div class="flex items-center gap-4">
                        <div
                            class="w-10 h-10 rounded-xl bg-[#fefce8] flex items-center justify-center font-fira text-[#9a7200] border border-[#FCE297]/50 text-xs">
                            A</div>
                        <div>
                            <p class="text-sm font-fira text-[#1A2B49]">Attestation Fiscale 2025</p>
                            <p class="text-[10px] text-gray-800 font-medium">À conserver pour votre déclaration de
                                revenus</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-6">
                        <a href="#"
                            class="text-[10px] font-fira text-white bg-[#1A2B49] hover:bg-[#7CABD3] transition-colors px-4 py-2 rounded-lg shadow-sm">Télécharger
                            PDF</a>
                    </div>
                </div>

                <div
                    class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex items-center justify-between p-4 hover:bg-[#FFFFF6] transition-colors card-hover">
                    <div class="flex items-center gap-4">
                        <div
                            class="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center font-fira text-[#1A2B49] border border-gray-100 text-xs">
                            D</div>
                        <div>
                            <p class="text-sm font-fira text-[#1A2B49]">Devis Accepté - D-25-1014</p>
                            <p class="text-[10px] text-gray-400">Sujet : Installation Internet</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-6">
                        <span class="text-sm font-black text-gray-400">Clôturé</span>
                        <a href="#"
                            class="text-[10px] font-fira text-[#7CABD3] hover:text-[#1A2B49] transition-colors border border-gray-100 px-4 py-2 rounded-lg">Archivé</a>
                    </div>
                </div>
            </div>
        </div>

    </main>

    <?php include('../include/footer.php'); ?>
    <script>
(function() {
    const z = localStorage.getItem("senior_zoom");
    if (z) document.documentElement.style.zoom = z;
})();
</script>


    <script>
        const observer = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
        });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    </script>
        <script src="/js/include/zoom_ihm.js?v=<?php echo time(); ?>"></script>

    <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script>

<script src="/js/include/onesignal.js" defer></script>

<script src="/js/include/notifications.js?v=<?php echo time(); ?>"></script>

</body>

</html>