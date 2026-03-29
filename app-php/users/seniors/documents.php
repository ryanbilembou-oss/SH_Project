<?php
session_start();
$current_year = date('Y');
$avatar = 'MF'; // Simulation
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

    <nav class="bg-white px-6 pt-4 shadow-sm border-b-2 border-[#FCE297] sticky top-0 z-50 rounded-full flex-shrink-0">
        <div class="container mx-auto flex flex-col gap-4">
            <div class="flex justify-between items-center w-full">
                <a href="index.php" class="h-20"><img src="img/logo.png" alt="Logo Silver Happy" class="h-14" /></a>
                <div class="flex items-center space-x-6 group">
                    <div
                        class="w-10 h-10 rounded-full bg-[#7CABD3] flex items-center justify-center text-white text-sm font-bold shadow cursor-pointer">
                        <?php echo $avatar; ?>
                    </div>
                    <p class="text-gray-300">|</p>
                    <a href="logout.php"
                        class="inline-block px-6 py-2 text-gray-500 bg-white hover:text-red-500 hover:bg-gray-50 rounded-full transition-all duration-300">Déconnexion</a>
                </div>
            </div>
            <div class="flex pb-4 gap-10 mx-auto overflow-x-auto whitespace-nowrap px-4 w-full justify-center">
                <a href="profil_senior.php"
                    class="flex items-center gap-1 font-fira pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all duration-200">Mon
                    profil</a>
                <a href="reservation_senior.php"
                    class="flex items-center gap-1 font-fira pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all duration-200">Réserver</a>
                <a href="mes_devis.php"
                    class="flex items-center gap-1 font-fira pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all duration-200">Mes
                    devis</a>
                <a href="chat.php"
                    class="flex items-center gap-1 font-fira pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all duration-200">Chat</a>
                <a href="catalogue.php"
                    class="flex items-center gap-1 font-fira pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all duration-200">Catalogue</a>
                <a href="conseils.php"
                    class="flex items-center gap-1 font-fira pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all duration-200">Conseils</a>
                <a href="documents.php"
                    class="flex items-center gap-1 font-fira pb-2 border-b-2 border-[#FCE297] text-[#7CABD3] transition-all duration-200 font-bold">Documents</a>
            </div>
        </div>
    </nav>

    <main class="flex-1 w-full max-w-4xl mx-auto px-6 py-12">
        <div class="mb-10 text-center reveal">
            <h1 class="text-3xl font-bold text-[#1A2B49] mb-4">Mes Documents</h1>
            <p class="text-gray-500 text-sm max-w-2xl mx-auto">Retrouvez ici toutes vos factures, devis signés, et
                attestations fiscales classés par année.</p>
        </div>

        <!-- Section 2026 -->
        <div class="mb-10 reveal">
            <h2 class="text-lg font-bold text-[#1A2B49] mb-4 border-b border-gray-100 pb-2">Année 2026</h2>
            <div class="space-y-3">
                <div
                    class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex items-center justify-between p-4 hover:bg-[#FFFFF6] transition-colors card-hover">
                    <div class="flex items-center gap-4">
                        <div
                            class="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center font-bold text-[#1A2B49] border border-gray-100 text-xs">
                            F</div>
                        <div>
                            <p class="text-sm font-bold text-[#1A2B49]">Facture Mensuelle - Mars 2026</p>
                            <p class="text-[10px] text-gray-400">Services : Aide au ménage, Courses</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-6">
                        <span class="text-sm font-black text-[#1A2B49]">145,00 €</span>
                        <a href="#"
                            class="text-[10px] font-bold text-[#7CABD3] hover:text-[#1A2B49] transition-colors border border-gray-100 px-4 py-2 rounded-lg">Télécharger
                            PDF</a>
                    </div>
                </div>

                <div
                    class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex items-center justify-between p-4 hover:bg-[#FFFFF6] transition-colors card-hover">
                    <div class="flex items-center gap-4">
                        <div
                            class="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center font-bold text-[#1A2B49] border border-gray-100 text-xs">
                            F</div>
                        <div>
                            <p class="text-sm font-bold text-[#1A2B49]">Facture Mensuelle - Février 2026</p>
                            <p class="text-[10px] text-gray-400">Services : Aide au ménage</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-6">
                        <span class="text-sm font-black text-[#1A2B49]">85,00 €</span>
                        <a href="#"
                            class="text-[10px] font-bold text-[#7CABD3] hover:text-[#1A2B49] transition-colors border border-gray-100 px-4 py-2 rounded-lg">Télécharger
                            PDF</a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Section 2025 -->
        <div class="mb-10 reveal">
            <h2 class="text-lg font-bold text-[#1A2B49] mb-4 border-b border-gray-100 pb-2">Année 2025</h2>
            <div class="space-y-3">
                <div
                    class="bg-white rounded-2xl border border-[#FCE297]/50 shadow-sm overflow-hidden flex items-center justify-between p-4 hover:bg-[#FFFFF6] transition-colors card-hover">
                    <div class="flex items-center gap-4">
                        <div
                            class="w-10 h-10 rounded-xl bg-[#fefce8] flex items-center justify-center font-bold text-[#9a7200] border border-[#FCE297]/50 text-xs">
                            A</div>
                        <div>
                            <p class="text-sm font-bold text-[#1A2B49]">Attestation Fiscale 2025</p>
                            <p class="text-[10px] text-gray-800 font-medium">À conserver pour votre déclaration de
                                revenus</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-6">
                        <a href="#"
                            class="text-[10px] font-bold text-white bg-[#1A2B49] hover:bg-[#7CABD3] transition-colors px-4 py-2 rounded-lg shadow-sm">Télécharger
                            PDF</a>
                    </div>
                </div>

                <div
                    class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex items-center justify-between p-4 hover:bg-[#FFFFF6] transition-colors card-hover">
                    <div class="flex items-center gap-4">
                        <div
                            class="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center font-bold text-[#1A2B49] border border-gray-100 text-xs">
                            D</div>
                        <div>
                            <p class="text-sm font-bold text-[#1A2B49]">Devis Accepté - D-25-1014</p>
                            <p class="text-[10px] text-gray-400">Sujet : Installation Internet</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-6">
                        <span class="text-sm font-black text-gray-400">Clôturé</span>
                        <a href="#"
                            class="text-[10px] font-bold text-[#7CABD3] hover:text-[#1A2B49] transition-colors border border-gray-100 px-4 py-2 rounded-lg">Archivé</a>
                    </div>
                </div>
            </div>
        </div>

    </main>

    <footer class="bg-[#1A2B49] text-white pt-14 pb-8 px-6 mt-12 flex-shrink-0">
        <div class="max-w-6xl mx-auto text-center">
            <p class="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em]">© <?php echo $current_year; ?>
                Silver Happy — Documents</p>
        </div>
    </footer>

    <script>
        const observer = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
        });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    </script>
</body>

</html>