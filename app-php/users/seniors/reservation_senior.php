<?php
session_start();
$current_year = date('Y');
?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouvelle Réservation – Silver Happy</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
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

        .nav-link {
            position: relative;
            padding-bottom: 2px;
        }

        .nav-link::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background: #FCE297;
            transition: width .3s ease;
        }

        .nav-link:hover::after,
        .nav-link.active::after {
            width: 100%;
        }

        .calendar-grid {
            display: grid;
            grid-template-columns: repeat(7, minmax(0, 1fr));
            gap: 0.5rem;
        }

        .cal-day {
            aspect-ratio: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.875rem;
            border-radius: 12px;
            font-weight: 600;
            transition: all 0.2s;
        }

        .cal-day.active {
            background-color: #7CABD3;
            color: white;
            box-shadow: 0 4px 14px rgba(124, 171, 211, 0.4);
        }

        .cal-day.available {
            background-color: white;
            border: 1px solid #7CABD3;
            color: #1A2B49;
            cursor: pointer;
        }

        .cal-day.available:hover {
            background-color: #7CABD3;
            color: white;
        }

        .cal-day.disabled {
            background-color: #f9fafb;
            color: #d1d5db;
            pointer-events: none;
            border: 1px dashed #e5e7eb;
        }

        .cal-day.empty {
            background: transparent;
        }

        .time-slot {
            padding: 0.75rem;
            border-radius: 12px;
            border: 2px solid #f3f4f6;
            text-align: center;
            font-weight: 600;
            color: #4b5563;
            cursor: pointer;
            transition: all 0.2s;
        }

        .time-slot:hover {
            border-color: #7CABD3;
            color: #7CABD3;
            background: #f0f7ff;
        }

        .time-slot.selected {
            border-color: #7CABD3;
            background: #7CABD3;
            color: white;
        }

        .step-inactive {
            opacity: 0.5;
            pointer-events: none;
        }
    </style>
    <script src="accessibility.js?v=2"></script>
</head>

<body class="bg-[#FFFFF6] min-h-screen flex flex-col">

    <nav class="bg-white px-6 pt-4 shadow-sm border-b-2 border-[#FCE297] sticky top-0 z-50 rounded-full flex-shrink-0">
        <div class="container mx-auto flex flex-col gap-4">
            <div class="flex justify-between items-center w-full">
                <a href="index.php" class="h-20"><img src="img/logo.png" alt="Logo Silver Happy" class="h-14" /></a>
                <div class="flex items-center space-x-6 group">
                    <div
                        class="w-10 h-10 rounded-full bg-[#7CABD3] flex items-center justify-center text-white text-sm font-bold shadow cursor-pointer">
                        MF
                    </div>
                    <p class="text-gray-300">|</p>
                    <a href="logout.php"
                        class="inline-block px-6 py-2 btn text-gray-500 bg-white hover:text-red-500 hover:bg-gray-50 rounded-full transition-all duration-300"
                        role="button">Déconnexion</a>
                </div>
            </div>
            <div class="flex pb-4 gap-10 mx-auto overflow-x-auto whitespace-nowrap px-4 w-full justify-center">
                <a href="profil_senior.php"
                    class="flex items-center gap-1 font-fira pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all duration-200">Mon
                    profil</a>
                <a href="reservation_senior.php"
                    class="flex items-center gap-1 font-fira pb-2 border-b-2 border-[#FCE297] text-[#7CABD3] transition-all duration-200">Réserver</a>
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
                    class="flex items-center gap-1 font-fira pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all duration-200">Documents</a>
            </div>
        </div>
    </nav>

    <!-- Page Content -->
    <main class="flex-1 w-full max-w-6xl mx-auto px-6 py-12">
        <a href="profil_senior.php"
            class="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#7CABD3] transition-colors mb-6">
            Retour au profil
        </a>

        <div class="reveal">
            <h1 class="text-4xl font-bold text-[#1A2B49] mb-2">Planifier une prestation</h1>
            <p class="text-gray-500 text-sm mb-10 text-lg">Choisissez le service, la date et l'heure pour votre
                prochaine intervention.</p>
        </div>

        <div class="grid lg:grid-cols-3 gap-10 reveal">
            <!-- Colonne 1 : Choix du service -->
            <div class="lg:col-span-1 space-y-6">
                <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-6">
                    <div class="flex items-center gap-3 mb-6">
                        <div
                            class="w-8 h-8 rounded-full bg-[#FCE297] flex items-center justify-center text-[#1A2B49] font-black">
                            1</div>
                        <h2 class="text-xl font-bold text-[#1A2B49]">Choix du service</h2>
                    </div>

                    <div class="space-y-4">
                        <div>
                            <label
                                class="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Catégorie</label>
                            <select id="select-category"
                                class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1A2B49] font-bold focus:outline-none focus:border-[#7CABD3] transition-colors bg-gray-50 hover:bg-white cursor-pointer"
                                onchange="enableStep2()">
                                <option value="" disabled selected>Sélectionner une catégorie...</option>
                                <option value="domicile">Services à domicile</option>
                                <option value="accompagnement">Accompagnement extérieur</option>
                                <option value="activites">Activités & Événements</option>
                            </select>
                        </div>
                        <div id="wrapper-prestation" class="opacity-30 pointer-events-none transition-opacity">
                            <label
                                class="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Prestation
                                exacte</label>
                            <select id="select-prestation"
                                class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1A2B49] font-bold focus:outline-none focus:border-[#7CABD3] transition-colors bg-gray-50 hover:bg-white cursor-pointer"
                                onchange="enableStep3()">
                                <option value="" disabled selected>Choisir la prestation...</option>
                                <option value="menage">Aide au ménage</option>
                                <option value="courses">Courses et livraison</option>
                                <option value="informatique">Aide informatique</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Colonne 2 : Calendrier (étape 2) -->
            <div class="lg:col-span-1 space-y-6">
                <div id="step-2-container"
                    class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-6 step-inactive transition-all duration-300">
                    <div class="flex items-center gap-3 mb-6">
                        <div class="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-black transition-colors"
                            id="step-2-badge">2</div>
                        <h2 class="text-xl font-bold text-gray-400 transition-colors" id="step-2-title">Date souhaitée
                        </h2>
                    </div>

                    <div class="mb-4">
                        <div class="flex justify-between items-center mb-6">
                            <button
                                class="text-[#7CABD3] hover:bg-[#7CABD3]/10 rounded-full w-8 h-8 flex items-center justify-center text-2xl font-bold">&lsaquo;</button>
                            <span class="font-bold text-[#1A2B49] text-sm uppercase tracking-wider">Mars 2026</span>
                            <button
                                class="text-[#7CABD3] hover:bg-[#7CABD3]/10 rounded-full w-8 h-8 flex items-center justify-center text-2xl font-bold">&rsaquo;</button>
                        </div>

                        <div class="calendar-grid mb-2">
                            <span class="text-xs text-center text-gray-400 font-black uppercase">L</span>
                            <span class="text-xs text-center text-gray-400 font-black uppercase">M</span>
                            <span class="text-xs text-center text-gray-400 font-black uppercase">M</span>
                            <span class="text-xs text-center text-gray-400 font-black uppercase">J</span>
                            <span class="text-xs text-center text-gray-400 font-black uppercase">V</span>
                            <span class="text-xs text-center text-gray-400 font-black uppercase">S</span>
                            <span class="text-xs text-center text-gray-400 font-black uppercase">D</span>
                        </div>

                        <!-- Grille statique du frontend -->
                        <div class="calendar-grid">
                            <div class="cal-day disabled">23</div>
                            <div class="cal-day disabled">24</div>
                            <div class="cal-day disabled">25</div>
                            <div class="cal-day disabled">26</div>
                            <div class="cal-day disabled">27</div>
                            <div class="cal-day disabled">28</div>
                            <div class="cal-day disabled">29</div>

                            <div class="cal-day disabled">30</div>
                            <div class="cal-day disabled">31</div>
                            <div class="cal-day available" onclick="selectDate(this)">1</div>
                            <div class="cal-day available" onclick="selectDate(this)">2</div>
                            <div class="cal-day disabled">3</div>
                            <div class="cal-day available" onclick="selectDate(this)">4</div>
                            <div class="cal-day available" onclick="selectDate(this)">5</div>

                            <div class="cal-day available" onclick="selectDate(this)">6</div>
                            <div class="cal-day available" onclick="selectDate(this)">7</div>
                            <div class="cal-day disabled">8</div>
                            <div class="cal-day available" onclick="selectDate(this)">9</div>
                            <div class="cal-day available" onclick="selectDate(this)">10</div>
                            <div class="cal-day disabled">11</div>
                            <div class="cal-day disabled">12</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Colonne 3 : Heure et Confirmation (étape 3) -->
            <div class="lg:col-span-1 space-y-6">
                <div id="step-3-container"
                    class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-6 step-inactive transition-all duration-300">
                    <div class="flex items-center gap-3 mb-6">
                        <div class="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-black transition-colors"
                            id="step-3-badge">3</div>
                        <h2 class="text-xl font-bold text-gray-400 transition-colors" id="step-3-title">Heure et Valider
                        </h2>
                    </div>

                    <div id="time-selector" class="hidden">
                        <p class="text-[10px] font-bold uppercase tracking-widest text-[#7CABD3] mb-3">Créneaux du jour
                        </p>
                        <div class="grid grid-cols-2 gap-3 mb-8">
                            <div class="time-slot" onclick="selectTime(this)">09:00</div>
                            <div class="time-slot" onclick="selectTime(this)">10:30</div>
                            <div class="time-slot" onclick="selectTime(this)">14:00</div>
                            <div class="time-slot" onclick="selectTime(this)">16:00</div>
                        </div>

                        <div class="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
                            <p class="text-xs text-gray-500 mb-2">Récapitulatif :</p>
                            <p class="text-sm font-bold text-[#1A2B49] mb-1" id="recap-service">Service sélectionné</p>
                            <p class="text-sm text-[#7CABD3] font-semibold" id="recap-datetime">En attente de sélection
                            </p>
                        </div>

                        <button id="btn-confirmer" onclick="confirmerFrontend()" disabled
                            class="w-full bg-[#1A2B49] opacity-50 text-white py-4 rounded-xl font-black uppercase text-xs tracking-widest transition-all">
                            Confirmer
                        </button>
                    </div>
                    <div id="time-empty-msg" class="text-center py-8">
                        <p class="text-gray-400 text-sm font-medium">Sélectionnez d'abord une date dans le calendrier.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    </main>

    <!-- Script simple de flow UI -->
    <script>
        function enableStep2() {
            document.getElementById('wrapper-prestation').classList.remove('opacity-30', 'pointer-events-none');
            document.getElementById('recap-service').textContent = 'Service sélectionné';
        }

        function enableStep3() {
            const step2 = document.getElementById('step-2-container');
            step2.classList.remove('step-inactive');
            document.getElementById('step-2-badge').classList.replace('bg-gray-100', 'bg-[#FCE297]');
            document.getElementById('step-2-badge').classList.replace('text-gray-400', 'text-[#1A2B49]');
            document.getElementById('step-2-title').classList.replace('text-gray-400', 'text-[#1A2B49]');

            const dropdown = document.getElementById('select-prestation');
            document.getElementById('recap-service').textContent = dropdown.options[dropdown.selectedIndex].text;
        }

        let currentlySelectedDate = null;
        function selectDate(element) {
            document.querySelectorAll('.cal-day.active').forEach(el => el.classList.remove('active'));
            element.classList.add('active');
            currentlySelectedDate = element.textContent + " Mars 2026";

            const step3 = document.getElementById('step-3-container');
            step3.classList.remove('step-inactive');
            document.getElementById('step-3-badge').classList.replace('bg-gray-100', 'bg-[#FCE297]');
            document.getElementById('step-3-badge').classList.replace('text-gray-400', 'text-[#1A2B49]');
            document.getElementById('step-3-title').classList.replace('text-gray-400', 'text-[#1A2B49]');

            document.getElementById('time-empty-msg').style.display = 'none';
            document.getElementById('time-selector').style.display = 'block';

            updateRecapTime("--:--");
        }

        function selectTime(element) {
            document.querySelectorAll('.time-slot.selected').forEach(el => el.classList.remove('selected'));
            element.classList.add('selected');

            updateRecapTime(element.textContent);

            const btn = document.getElementById('btn-confirmer');
            btn.disabled = false;
            btn.classList.remove('opacity-50', 'bg-[#1A2B49]');
            btn.classList.add('bg-[#7CABD3]', 'hover:bg-[#5A8FB8]', 'hover:scale-105', 'shadow-lg');
        }

        function updateRecapTime(time) {
            if (currentlySelectedDate) {
                document.getElementById('recap-datetime').textContent = `Date choisie : ${currentlySelectedDate} à ${time}`;
            }
        }

        function confirmerFrontend() {
            alert('Simulation Frontend : Réservation envoyée à la future API backend.');
            window.location.href = 'profil_senior.php';
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) e.target.classList.add('visible');
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    </script>

    <footer class="bg-[#1A2B49] text-white pt-14 pb-8 px-6 mt-12 flex-shrink-0">
        <div class="max-w-6xl mx-auto">
            <p class="text-[10px] text-center text-gray-500 font-black uppercase tracking-[0.3em]">©
                <?php echo $current_year; ?> Silver Happy — Votre espace bien-être</p>
        </div>
    </footer>
</body>

</html>