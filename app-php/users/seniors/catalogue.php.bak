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
    <title>Catalogue des Prestations – Silver Happy</title>
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
            transform: translateY(-4px);
            box-shadow: 0 12px 40px rgba(124, 171, 211, .15);
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
                    class="flex items-center gap-1 font-fira pb-2 border-b-2 border-[#FCE297] text-[#7CABD3] font-bold transition-all duration-200">Catalogue</a>
                <a href="conseils.php"
                    class="flex items-center gap-1 font-fira pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all duration-200">Conseils</a>
                <a href="documents.php"
                    class="flex items-center gap-1 font-fira pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all duration-200">Documents</a>
            </div>
        </div>
    </nav>

    <main class="flex-1 w-full max-w-6xl mx-auto px-6 py-12">
        <div class="mb-10 text-center reveal">
            <h1 class="text-3xl font-bold text-[#1A2B49] mb-4">Catalogue des prestations</h1>
            <p class="text-gray-500 text-sm max-w-2xl mx-auto">Découvrez l'ensemble de nos services d'accompagnement
                pensés pour votre confort au quotidien.</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            <div class="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card-hover transition-all reveal">
                <div
                    class="w-10 h-10 bg-[#FCE297] rounded-full flex items-center justify-center font-bold text-[#1A2B49] mb-4">
                    1</div>
                <h3 class="text-lg font-bold text-[#1A2B49] mb-2">Aide au ménage</h3>
                <p class="text-gray-500 text-xs leading-relaxed mb-6">Entretien du domicile, repassage, nettoyage des
                    vitres et petits rangements pour un intérieur impeccable.</p>
                <div class="flex items-center justify-between border-t border-gray-50 pt-4">
                    <span class="text-[10px] font-bold uppercase tracking-wider text-[#7CABD3]">Service certifié</span>
                    <a href="reservation_senior.php"
                        class="text-[10px] font-bold text-white bg-[#1A2B49] px-4 py-2 rounded-xl hover:bg-[#7CABD3] transition-colors">Planifier</a>
                </div>
            </div>

            <div class="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card-hover transition-all reveal">
                <div
                    class="w-10 h-10 bg-[#FCE297] rounded-full flex items-center justify-center font-bold text-[#1A2B49] mb-4">
                    2</div>
                <h3 class="text-lg font-bold text-[#1A2B49] mb-2">Courses & Livraison</h3>
                <p class="text-gray-500 text-xs leading-relaxed mb-6">Nous faisons vos courses au marché ou au
                    supermarché et vous les livrons directement chez vous.</p>
                <div class="flex items-center justify-between border-t border-gray-50 pt-4">
                    <span class="text-[10px] font-bold uppercase tracking-wider text-[#7CABD3]">Sur mesure</span>
                    <a href="reservation_senior.php"
                        class="text-[10px] font-bold text-white bg-[#1A2B49] px-4 py-2 rounded-xl hover:bg-[#7CABD3] transition-colors">Planifier</a>
                </div>
            </div>

            <div class="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card-hover transition-all reveal">
                <div
                    class="w-10 h-10 bg-[#FCE297] rounded-full flex items-center justify-center font-bold text-[#1A2B49] mb-4">
                    3</div>
                <h3 class="text-lg font-bold text-[#1A2B49] mb-2">Aide informatique</h3>
                <p class="text-gray-500 text-xs leading-relaxed mb-6">Configuration de votre ordinateur, tablette ou
                    smartphone. Aide pour naviguer sur internet en sécurité.</p>
                <div class="flex items-center justify-between border-t border-gray-50 pt-4">
                    <span class="text-[10px] font-bold uppercase tracking-wider text-[#7CABD3]">Assistance douce</span>
                    <a href="reservation_senior.php"
                        class="text-[10px] font-bold text-white bg-[#1A2B49] px-4 py-2 rounded-xl hover:bg-[#7CABD3] transition-colors">Planifier</a>
                </div>
            </div>

            <div class="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card-hover transition-all reveal">
                <div
                    class="w-10 h-10 bg-[#FCE297] rounded-full flex items-center justify-center font-bold text-[#1A2B49] mb-4">
                    4</div>
                <h3 class="text-lg font-bold text-[#1A2B49] mb-2">Jardinage</h3>
                <p class="text-gray-500 text-xs leading-relaxed mb-6">Tonte de pelouse, taille de haies, ramassage des
                    feuilles, arrosage et entretien floral de votre extérieur.</p>
                <div class="flex items-center justify-between border-t border-gray-50 pt-4">
                    <span class="text-[10px] text-gray-400">Dès les beaux jours</span>
                    <a href="reservation_senior.php"
                        class="text-[10px] font-bold text-white bg-[#1A2B49] px-4 py-2 rounded-xl hover:bg-[#7CABD3] transition-colors">Planifier</a>
                </div>
            </div>

            <div class="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card-hover transition-all reveal">
                <div
                    class="w-10 h-10 bg-[#FCE297] rounded-full flex items-center justify-center font-bold text-[#1A2B49] mb-4">
                    5</div>
                <h3 class="text-lg font-bold text-[#1A2B49] mb-2">Mécanique & Dépannage</h3>
                <p class="text-gray-500 text-xs leading-relaxed mb-6">Petits travaux à domicile : changer une ampoule,
                    bricolage, montage de meubles ou réparations mineures.</p>
                <div class="flex items-center justify-between border-t border-gray-50 pt-4">
                    <span class="text-[10px] text-gray-400">Sur devis rapide</span>
                    <a href="reservation_senior.php"
                        class="text-[10px] font-bold text-white bg-[#1A2B49] px-4 py-2 rounded-xl hover:bg-[#7CABD3] transition-colors">Planifier</a>
                </div>
            </div>

            <div class="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card-hover transition-all reveal">
                <div
                    class="w-10 h-10 bg-[#FCE297] rounded-full flex items-center justify-center font-bold text-[#1A2B49] mb-4">
                    6</div>
                <h3 class="text-lg font-bold text-[#1A2B49] mb-2">Accompagnement loisirs</h3>
                <p class="text-gray-500 text-xs leading-relaxed mb-6">Sorties sportives douces, promenades,
                    participation à des activités culturelles en tout confort.</p>
                <div class="flex items-center justify-between border-t border-gray-50 pt-4">
                    <span class="text-[10px] text-gray-400">Sorties en extérieur</span>
                    <a href="reservation_senior.php"
                        class="text-[10px] font-bold text-white bg-[#1A2B49] px-4 py-2 rounded-xl hover:bg-[#7CABD3] transition-colors">Planifier</a>
                </div>
            </div>

        </div>
    </main>

    <footer class="bg-[#1A2B49] text-white pt-14 pb-8 px-6 mt-12 flex-shrink-0">
        <div class="max-w-6xl mx-auto text-center">
            <p class="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em]">© <?php echo $current_year; ?>
                Silver Happy — Catalogue</p>
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