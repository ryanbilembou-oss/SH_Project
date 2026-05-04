<?php
require_once('../../auth.php');
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
    <?php include('../include/navbar.php'); ?>

    <main class="flex-1 w-full max-w-6xl mx-auto px-6 py-12">
        <div class="mb-10 text-center reveal">
            <h1 class="text-3xl font-fira text-[#1A2B49] mb-4">Catalogue des prestations</h1>
            <p class="text-gray-500 text-sm max-w-2xl mx-auto">Découvrez l'ensemble de nos services d'accompagnement
                pensés pour votre confort au quotidien.</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            <div class="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card-hover transition-all reveal">
                <div
                    class="w-10 h-10 bg-[#FCE297] rounded-full flex items-center justify-center font-fira text-[#1A2B49] mb-4">
                    1</div>
                <h3 class="text-lg font-fira text-[#1A2B49] mb-2">Aide au ménage</h3>
                <p class="text-gray-500 text-xs leading-relaxed mb-6">Entretien du domicile, repassage, nettoyage des
                    vitres et petits rangements pour un intérieur impeccable.</p>
                <div class="flex items-center justify-between border-t border-gray-50 pt-4">
                    <span class="text-[10px] font-fira uppercase tracking-wider text-[#7CABD3]">Service certifié</span>
                    <a href="reservation_senior.php"
                        class="text-[10px] font-fira text-white bg-[#1A2B49] px-4 py-2 rounded-xl hover:bg-[#7CABD3] transition-colors">Planifier</a>
                </div>
            </div>

            <div class="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card-hover transition-all reveal">
                <div
                    class="w-10 h-10 bg-[#FCE297] rounded-full flex items-center justify-center font-fira text-[#1A2B49] mb-4">
                    2</div>
                <h3 class="text-lg font-fira text-[#1A2B49] mb-2">Courses & Livraison</h3>
                <p class="text-gray-500 text-xs leading-relaxed mb-6">Nous faisons vos courses au marché ou au
                    supermarché et vous les livrons directement chez vous.</p>
                <div class="flex items-center justify-between border-t border-gray-50 pt-4">
                    <span class="text-[10px] font-fira uppercase tracking-wider text-[#7CABD3]">Sur mesure</span>
                    <a href="reservation_senior.php"
                        class="text-[10px] font-fira text-white bg-[#1A2B49] px-4 py-2 rounded-xl hover:bg-[#7CABD3] transition-colors">Planifier</a>
                </div>
            </div>

            <div class="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card-hover transition-all reveal">
                <div
                    class="w-10 h-10 bg-[#FCE297] rounded-full flex items-center justify-center font-fira text-[#1A2B49] mb-4">
                    3</div>
                <h3 class="text-lg font-fira text-[#1A2B49] mb-2">Aide informatique</h3>
                <p class="text-gray-500 text-xs leading-relaxed mb-6">Configuration de votre ordinateur, tablette ou
                    smartphone. Aide pour naviguer sur internet en sécurité.</p>
                <div class="flex items-center justify-between border-t border-gray-50 pt-4">
                    <span class="text-[10px] font-fira uppercase tracking-wider text-[#7CABD3]">Assistance douce</span>
                    <a href="reservation_senior.php"
                        class="text-[10px] font-fira text-white bg-[#1A2B49] px-4 py-2 rounded-xl hover:bg-[#7CABD3] transition-colors">Planifier</a>
                </div>
            </div>

            <div class="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card-hover transition-all reveal">
                <div
                    class="w-10 h-10 bg-[#FCE297] rounded-full flex items-center justify-center font-fira text-[#1A2B49] mb-4">
                    4</div>
                <h3 class="text-lg font-fira text-[#1A2B49] mb-2">Jardinage</h3>
                <p class="text-gray-500 text-xs leading-relaxed mb-6">Tonte de pelouse, taille de haies, ramassage des
                    feuilles, arrosage et entretien floral de votre extérieur.</p>
                <div class="flex items-center justify-between border-t border-gray-50 pt-4">
                    <span class="text-[10px] text-gray-400">Dès les beaux jours</span>
                    <a href="reservation_senior.php"
                        class="text-[10px] font-fira text-white bg-[#1A2B49] px-4 py-2 rounded-xl hover:bg-[#7CABD3] transition-colors">Planifier</a>
                </div>
            </div>

            <div class="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card-hover transition-all reveal">
                <div
                    class="w-10 h-10 bg-[#FCE297] rounded-full flex items-center justify-center font-fira text-[#1A2B49] mb-4">
                    5</div>
                <h3 class="text-lg font-fira text-[#1A2B49] mb-2">Mécanique & Dépannage</h3>
                <p class="text-gray-500 text-xs leading-relaxed mb-6">Petits travaux à domicile : changer une ampoule,
                    bricolage, montage de meubles ou réparations mineures.</p>
                <div class="flex items-center justify-between border-t border-gray-50 pt-4">
                    <span class="text-[10px] text-gray-400">Sur devis rapide</span>
                    <a href="reservation_senior.php"
                        class="text-[10px] font-fira text-white bg-[#1A2B49] px-4 py-2 rounded-xl hover:bg-[#7CABD3] transition-colors">Planifier</a>
                </div>
            </div>

            <div class="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card-hover transition-all reveal">
                <div
                    class="w-10 h-10 bg-[#FCE297] rounded-full flex items-center justify-center font-fira text-[#1A2B49] mb-4">
                    6</div>
                <h3 class="text-lg font-fira text-[#1A2B49] mb-2">Accompagnement loisirs</h3>
                <p class="text-gray-500 text-xs leading-relaxed mb-6">Sorties sportives douces, promenades,
                    participation à des activités culturelles en tout confort.</p>
                <div class="flex items-center justify-between border-t border-gray-50 pt-4">
                    <span class="text-[10px] text-gray-400">Sorties en extérieur</span>
                    <a href="reservation_senior.php"
                        class="text-[10px] font-fira text-white bg-[#1A2B49] px-4 py-2 rounded-xl hover:bg-[#7CABD3] transition-colors">Planifier</a>
                </div>
            </div>

        </div>
    </main>

    <?php include('../include/footer.php'); ?>


    <script>
        const observer = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
        });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    </script>
</body>

</html>