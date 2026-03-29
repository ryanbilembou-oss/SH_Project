<?php
// Auth via localStorage côté JS
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy - Mon Espace</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:wght@400;700;900&display=swap" rel="stylesheet">
    <link rel="icon" href="/img/logo-clear.png">
    <style>
        body { font-family: 'Fira Sans Condensed', sans-serif; background-color: #FFFFF6; font-size: 18px; }
    </style>
</head>
<body class="bg-[#FFFFF6] min-h-screen">



    <!-- Tutorial overlay -->
    <div id="tutorialOverlay" class="fixed inset-0 bg-[#1A2B49]/90 z-[200] flex items-center justify-center hidden">
        <div class="bg-[#FFFFF6] rounded-[40px] max-w-lg w-full mx-4 p-10">
            <div class="text-center mb-8">
                <img src="/img/logo.png" class="h-12 mx-auto mb-4">
                <h2 class="text-3xl font-black uppercase tracking-tighter text-[#1A2B49]">
                    Bienvenue sur <span class="text-[#7CABD3]">Silver Happy</span> !
                </h2>
                <p class="text-gray-400 text-sm font-medium italic mt-2">Laissez-nous vous guider à travers votre espace.</p>
            </div>
            <div class="space-y-3 mb-8">
                <div class="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm">
                    <span class="bg-[#7CABD3] text-white rounded-full w-8 h-8 flex items-center justify-center font-black text-sm flex-shrink-0">1</span>
                    <p class="text-base text-gray-600">Consultez vos <strong>événements</strong> et réservez vos activités</p>
                </div>
                <div class="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm">
                    <span class="bg-[#FCE297] text-[#1A2B49] rounded-full w-8 h-8 flex items-center justify-center font-black text-sm flex-shrink-0">2</span>
                    <p class="text-base text-gray-600">Gérez vos <strong>prestations</strong> et suivez vos devis</p>
                </div>
                <div class="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm">
                    <span class="bg-[#7CABD3] text-white rounded-full w-8 h-8 flex items-center justify-center font-black text-sm flex-shrink-0">3</span>
                    <p class="text-base text-gray-600">Accédez à la <strong>boutique</strong> et aux conseils santé</p>
                </div>
                <div class="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm">
                    <span class="bg-[#FCE297] text-[#1A2B49] rounded-full w-8 h-8 flex items-center justify-center font-black text-sm flex-shrink-0">4</span>
                    <p class="text-base text-gray-600">Prenez des <strong>rendez-vous médicaux</strong> avec nos médecins partenaires</p>
                </div>
            </div>
            <button onclick="closeTutorial()" class="w-full bg-[#1A2B49] text-white font-black uppercase text-sm tracking-[0.2em] py-5 rounded-2xl shadow-lg hover:bg-[#7CABD3] transition-all">
                C'est parti ! Je découvre mon espace →
            </button>
        </div>
    </div>

    <!-- Nav -->
    <nav class="bg-white px-6 pt-4 shadow-sm border-b-2 border-[#FCE297] sticky top-0 z-50">
        <div class="container mx-auto flex flex-col gap-4">
            <div class="flex justify-between items-center w-full">
                <a href="/users/seniors/accueil_senior.php"><img src="/img/logo.png" alt="Logo Silver Happy" class="h-14"></a>
                <div class="flex items-center gap-4">
                    <span id="welcomeMsg" class="text-[#1A2B49] font-black text-base hidden md:block"></span>
                    <a href="/users/seniors/profil.php" class="inline-block px-6 py-3 bg-[#7CABD3] rounded-full shadow text-white hover:text-[#7CABD3] hover:bg-white border-2 border-[#7CABD3] transition-all duration-300 font-bold text-base">Mon profil</a>
                    <a href="/users/logout.php" onclick="localStorage.clear()" class="inline-block px-6 py-3 text-[#7CABD3] bg-white hover:text-white hover:bg-[#7CABD3] border-2 border-[#7CABD3] rounded-full shadow transition-all duration-300 font-bold text-base">Déconnexion</a>
                </div>
            </div>
            <div class="flex pb-4 gap-8 mx-auto justify-center flex-wrap text-base">
                <a href="/users/seniors/accueil_senior.php" class="flex items-center gap-2 font-bold pb-2 border-b-2 border-[#FCE297] text-[#7CABD3]">
                    <iconify-icon icon="mdi:view-dashboard"></iconify-icon> Tableau de bord
                </a>
                <a href="/users/seniors/evenements.php" class="flex items-center gap-2 font-bold pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all">
                    <iconify-icon icon="mdi:calendar"></iconify-icon> Événements
                </a>
                <a href="/users/seniors/services.php" class="flex items-center gap-2 font-bold pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all">
                    <iconify-icon icon="mdi:briefcase"></iconify-icon> Services
                </a>
                <a href="/users/seniors/boutique.php" class="flex items-center gap-2 font-bold pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all">
                    <iconify-icon icon="mdi:shopping"></iconify-icon> Boutique
                </a>
                <a href="/users/seniors/planning.php" class="flex items-center gap-2 font-bold pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all">
                    <iconify-icon icon="mdi:calendar-clock"></iconify-icon> Mon Planning
                </a>
                <a href="/users/seniors/devis.php" class="flex items-center gap-2 font-bold pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all">
                    <iconify-icon icon="mdi:file-document"></iconify-icon> Devis & Factures
                </a>
                <a href="/users/seniors/conseils.php" class="flex items-center gap-2 font-bold pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all">
                    <iconify-icon icon="mdi:lightbulb"></iconify-icon> Conseils
                </a>
            </div>
        </div>
    </nav>

    <main class="container mx-auto max-w-6xl px-4 py-10">

        <!-- Bonjour -->
        <div class="mb-10">
            <h2 class="text-5xl font-black uppercase tracking-tighter text-[#1A2B49]">
                Bonjour, <span class="text-[#7CABD3]" id="prenomUser">—</span> !
            </h2>
            <p class="text-gray-400 mt-1 text-lg">Voici votre tableau de bord Silver Happy.</p>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <div class="group bg-white p-8 rounded-[40px] border-2 border-transparent hover:border-[#7CABD3] hover:shadow-xl transition-all duration-500 text-center cursor-pointer">
                <iconify-icon icon="mdi:calendar-check" class="text-5xl text-[#7CABD3] mb-3 block group-hover:scale-110 transition-transform"></iconify-icon>
                <p class="text-4xl font-black text-[#1A2B49]" id="nbEvenements">—</p>
                <p class="text-sm text-gray-400 uppercase font-black tracking-widest mt-1">Événements</p>
            </div>
            <div class="group bg-white p-8 rounded-[40px] border-2 border-transparent hover:border-[#FCE297] hover:shadow-xl transition-all duration-500 text-center cursor-pointer">
                <iconify-icon icon="mdi:briefcase-check" class="text-5xl text-[#FCE297] mb-3 block group-hover:scale-110 transition-transform"></iconify-icon>
                <p class="text-4xl font-black text-[#1A2B49]" id="nbServices">—</p>
                <p class="text-sm text-gray-400 uppercase font-black tracking-widest mt-1">Services</p>
            </div>
            <div class="group bg-white p-8 rounded-[40px] border-2 border-transparent hover:border-[#7CABD3] hover:shadow-xl transition-all duration-500 text-center cursor-pointer">
                <iconify-icon icon="mdi:file-document-outline" class="text-5xl text-[#7CABD3] mb-3 block group-hover:scale-110 transition-transform"></iconify-icon>
                <p class="text-4xl font-black text-[#1A2B49]" id="nbDevis">—</p>
                <p class="text-sm text-gray-400 uppercase font-black tracking-widest mt-1">Devis</p>
            </div>
            <div class="group bg-white p-8 rounded-[40px] border-2 border-transparent hover:border-[#FCE297] hover:shadow-xl transition-all duration-500 text-center cursor-pointer">
                <iconify-icon icon="mdi:receipt" class="text-5xl text-[#FCE297] mb-3 block group-hover:scale-110 transition-transform"></iconify-icon>
                <p class="text-4xl font-black text-[#1A2B49]" id="nbFactures">—</p>
                <p class="text-sm text-gray-400 uppercase font-black tracking-widest mt-1">Factures</p>
            </div>
        </div>

        <!-- Planning + Actions rapides -->
        <div class="grid md:grid-cols-3 gap-8 mb-16">
            <div class="md:col-span-2">
                <h3 class="text-4xl font-black uppercase tracking-tighter text-[#1A2B49] mb-8">
                    Mon <span class="text-[#7CABD3]">planning</span>
                </h3>
                <div class="space-y-4" id="planningList">
                    <div class="bg-white p-6 rounded-[40px] border-2 border-dashed border-gray-200 text-center">
                        <p class="text-gray-400 italic text-lg">Chargement...</p>
                    </div>
                </div>
                <div class="flex justify-center mt-6">
                    <a href="/users/seniors/planning.php" class="bg-[#7CABD3] text-white px-8 py-3 rounded-full shadow hover:text-[#7CABD3] hover:bg-white border-2 border-[#7CABD3] transition-all duration-300 font-bold text-base">
                        Voir mon planning complet
                    </a>
                </div>
            </div>

            <!-- Actions rapides -->
            <div>
                <h3 class="text-4xl font-black uppercase tracking-tighter text-[#1A2B49] mb-8">
                    Actions <span class="text-[#7CABD3]">rapides</span>
                </h3>
                <div class="space-y-4">
                    <a href="/users/seniors/evenements.php" class="group bg-white p-5 rounded-[30px] border-2 border-transparent hover:border-[#7CABD3] hover:shadow-lg transition-all duration-300 flex items-center gap-4">
                        <iconify-icon icon="mdi:calendar-plus" class="text-4xl text-[#7CABD3] group-hover:scale-110 transition-transform"></iconify-icon>
                        <span class="font-black uppercase text-[#1A2B49] text-base">Réserver un événement</span>
                    </a>
                    <a href="/users/seniors/services.php" class="group bg-white p-5 rounded-[30px] border-2 border-transparent hover:border-[#FCE297] hover:shadow-lg transition-all duration-300 flex items-center gap-4">
                        <iconify-icon icon="mdi:briefcase-plus" class="text-4xl text-[#FCE297] group-hover:scale-110 transition-transform"></iconify-icon>
                        <span class="font-black uppercase text-[#1A2B49] text-base">Demander un service</span>
                    </a>
                    <a href="/users/seniors/devis.php" class="group bg-white p-5 rounded-[30px] border-2 border-transparent hover:border-[#7CABD3] hover:shadow-lg transition-all duration-300 flex items-center gap-4">
                        <iconify-icon icon="mdi:file-document" class="text-4xl text-[#7CABD3] group-hover:scale-110 transition-transform"></iconify-icon>
                        <span class="font-black uppercase text-[#1A2B49] text-base">Mes devis & factures</span>
                    </a>
                    <a href="/users/seniors/conseils.php" class="group bg-white p-5 rounded-[30px] border-2 border-transparent hover:border-[#FCE297] hover:shadow-lg transition-all duration-300 flex items-center gap-4">
                        <iconify-icon icon="mdi:lightbulb" class="text-4xl text-[#FCE297] group-hover:scale-110 transition-transform"></iconify-icon>
                        <span class="font-black uppercase text-[#1A2B49] text-base">Espace conseils</span>
                    </a>
                    <a href="/users/seniors/boutique.php" class="group bg-white p-5 rounded-[30px] border-2 border-transparent hover:border-[#7CABD3] hover:shadow-lg transition-all duration-300 flex items-center gap-4">
                        <iconify-icon icon="mdi:shopping" class="text-4xl text-[#7CABD3] group-hover:scale-110 transition-transform"></iconify-icon>
                        <span class="font-black uppercase text-[#1A2B49] text-base">Accéder à la boutique</span>
                    </a>
                </div>
            </div>
        </div>

        <!-- Événements à venir -->
        <section class="pb-16">
            <h3 class="text-4xl font-black uppercase tracking-tighter text-[#1A2B49] mb-10 text-center">
                Événements <span class="text-[#7CABD3]">à venir</span>
            </h3>
            <div id="evenementsList" class="flex flex-wrap justify-center gap-8">
                <div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-gray-200 text-center w-72">
                    <iconify-icon icon="mdi:calendar" class="text-4xl text-gray-300 mb-3 block"></iconify-icon>
                    <p class="text-gray-400 italic text-base">Chargement...</p>
                </div>
            </div>
            <div class="flex justify-center mt-10">
                <a href="/users/seniors/evenements.php" class="bg-[#7CABD3] text-white px-8 py-3 rounded-full shadow hover:text-[#7CABD3] hover:bg-white border-2 border-[#7CABD3] transition-all duration-300 font-bold text-base">
                    Voir tous les événements
                </a>
            </div>
        </section>

    </main>

    <!-- Footer -->
    <footer class="bg-[#7CABD3] pt-16 pb-8">
        <div class="max-w-7xl mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                <div>
                    <img class="h-20 mb-5" src="/img/logo.png" alt="logo-SH">
                    <p class="text-[#1A2B49] text-base leading-relaxed font-bold">
                        Silver Happy réinvente le service à domicile en alliant confiance humaine et simplicité numérique.
                    </p>
                </div>
                <div>
                    <h3 class="font-black uppercase tracking-widest text-sm text-white mb-6">Mon Espace</h3>
                    <ul class="space-y-3">
                        <li><a href="/users/seniors/planning.php" class="text-[#1A2B49] hover:text-white transition-colors font-bold text-base">Mon Planning</a></li>
                        <li><a href="/users/seniors/devis.php" class="text-[#1A2B49] hover:text-white transition-colors font-bold text-base">Mes Devis</a></li>
                        <li><a href="/users/seniors/conseils.php" class="text-[#1A2B49] hover:text-white transition-colors font-bold text-base">Conseils</a></li>
                        <li><a href="/users/seniors/boutique.php" class="text-[#1A2B49] hover:text-white transition-colors font-bold text-base">Boutique</a></li>
                    </ul>
                </div>
                <div>
                    <h3 class="font-black uppercase tracking-widest text-sm text-white mb-6">Restez connecté</h3>
                    <div class="flex gap-2">
                        <input type="email" placeholder="Votre email..." class="bg-white border border-gray-200 rounded-lg px-4 py-3 w-full focus:outline-none text-base font-bold">
                        <button class="bg-[#1A2B49] text-white p-3 rounded-lg hover:bg-white hover:text-[#1A2B49] transition-colors">
                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/></svg>
                        </button>
                    </div>
                </div>
            </div>
            <div class="pt-8 border-t border-white/30 flex flex-col md:flex-row justify-between items-center gap-4">
                <p class="text-base text-[#1A2B49] font-bold">© 2026 Silver Happy. Tous droits réservés.</p>
                <div class="flex gap-6">
                    <a href="#" class="text-base text-[#1A2B49] hover:text-white transition-colors font-bold">Mentions Légales</a>
                    <a href="#" class="text-base text-[#1A2B49] hover:text-white transition-colors font-bold">Confidentialité</a>
                </div>
            </div>
        </div>
    </footer>


    <script src="/js/users/senior/accueil_senior.js"></script>
</body>
</html>