<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy - Boutique</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:wght@400;700;900&display=swap" rel="stylesheet">
    <style>body { font-family: 'Fira Sans Condensed', sans-serif; background-color: #FFFFF6; font-size: 18px; }</style>
</head>
<body class="bg-[#FFFFF6] min-h-screen">
    <div id="toast" class="fixed top-6 left-1/2 transform -translate-x-1/2 -translate-y-20 opacity-0 z-50 transition-all duration-500 pointer-events-none">
        <div class="bg-[#1A2B49] text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3">
            <span id="toastIcon" class="text-lg">✅</span>
            <span id="toastMsg" class="font-bold uppercase text-sm tracking-widest">Message</span>
        </div>
    </div>
    <nav class="bg-white px-6 pt-4 shadow-sm border-b-2 border-[#FCE297] sticky top-0 z-50">
        <div class="container mx-auto flex flex-col gap-4">
            <div class="flex justify-between items-center w-full">
                <a href="/users/seniors/accueil_senior.php"><img src="/img/logo.png" alt="Logo Silver Happy" class="h-14"></a>
                <div class="flex items-center gap-4">
                    <a href="/users/seniors/profil.php" class="inline-block px-6 py-3 bg-[#7CABD3] rounded-full shadow text-white hover:text-[#7CABD3] hover:bg-white border-2 border-[#7CABD3] transition-all font-bold">Mon profil</a>
                    <a href="/users/logout.php" onclick="localStorage.clear()" class="inline-block px-6 py-3 text-[#7CABD3] bg-white hover:text-white hover:bg-[#7CABD3] border-2 border-[#7CABD3] rounded-full shadow transition-all font-bold">Déconnexion</a>
                </div>
            </div>
            <div class="flex pb-4 gap-8 mx-auto justify-center flex-wrap text-base">
                <a href="/users/seniors/accueil_senior.php" class="flex items-center gap-2 font-bold pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all"><iconify-icon icon="mdi:view-dashboard"></iconify-icon> Tableau de bord</a>
                <a href="/users/seniors/evenements.php" class="flex items-center gap-2 font-bold pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all"><iconify-icon icon="mdi:calendar"></iconify-icon> Événements</a>
                <a href="/users/seniors/services.php" class="flex items-center gap-2 font-bold pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all"><iconify-icon icon="mdi:briefcase"></iconify-icon> Services</a>
                <a href="/users/seniors/boutique.php" class="flex items-center gap-2 font-bold pb-2 border-b-2 border-[#FCE297] text-[#7CABD3]"><iconify-icon icon="mdi:shopping"></iconify-icon> Boutique</a>
                <a href="/users/seniors/planning.php" class="flex items-center gap-2 font-bold pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all"><iconify-icon icon="mdi:calendar-clock"></iconify-icon> Mon Planning</a>
                <a href="/users/seniors/devis.php" class="flex items-center gap-2 font-bold pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all"><iconify-icon icon="mdi:file-document"></iconify-icon> Devis & Factures</a>
                <a href="/users/seniors/conseils.php" class="flex items-center gap-2 font-bold pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all"><iconify-icon icon="mdi:lightbulb"></iconify-icon> Conseils</a>
            </div>
        </div>
    </nav>
    <main class="container mx-auto max-w-6xl px-4 py-10">
        <div class="mb-10">
            <h2 class="text-5xl font-black uppercase tracking-tighter text-[#1A2B49]">Notre <span class="text-[#7CABD3]">boutique</span></h2>
            <p class="text-gray-400 mt-1 text-lg">Découvrez nos articles et produits.</p>
        </div>
        <div class="flex flex-wrap gap-3 mb-10" id="filtresCat">
            <button onclick="filtrer(null)" class="px-5 py-2 rounded-full font-bold text-sm bg-[#1A2B49] text-white">Tous</button>
        </div>
        <div id="articlesList" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-gray-200 text-center col-span-3">
                <p class="text-gray-400 italic">Chargement...</p>
            </div>
        </div>
    </main>
    <footer class="bg-[#7CABD3] pt-16 pb-8 mt-16">
        <div class="max-w-7xl mx-auto px-4">
            <div class="pt-8 border-t border-white/30 flex justify-between items-center">
                <p class="text-base text-[#1A2B49] font-bold">© 2026 Silver Happy. Tous droits réservés.</p>
            </div>
        </div>
    </footer>
    <script src="/js/users/senior/boutique.js?v=<?php echo time(); ?>"></script>
</body>
</html>