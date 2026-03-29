<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy - Mon Profil</title>
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
                    <a href="/users/logout.php" onclick="localStorage.clear()" class="inline-block px-6 py-3 text-[#7CABD3] bg-white hover:text-white hover:bg-[#7CABD3] border-2 border-[#7CABD3] rounded-full shadow transition-all font-bold">Déconnexion</a>
                </div>
            </div>
            <div class="flex pb-4 gap-8 mx-auto justify-center flex-wrap text-base">
                <a href="/users/seniors/accueil_senior.php" class="flex items-center gap-2 font-bold pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all"><iconify-icon icon="mdi:view-dashboard"></iconify-icon> Tableau de bord</a>
                <a href="/users/seniors/evenements.php" class="flex items-center gap-2 font-bold pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all"><iconify-icon icon="mdi:calendar"></iconify-icon> Événements</a>
                <a href="/users/seniors/services.php" class="flex items-center gap-2 font-bold pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all"><iconify-icon icon="mdi:briefcase"></iconify-icon> Services</a>
                <a href="/users/seniors/boutique.php" class="flex items-center gap-2 font-bold pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all"><iconify-icon icon="mdi:shopping"></iconify-icon> Boutique</a>
                <a href="/users/seniors/planning.php" class="flex items-center gap-2 font-bold pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all"><iconify-icon icon="mdi:calendar-clock"></iconify-icon> Mon Planning</a>
                <a href="/users/seniors/devis.php" class="flex items-center gap-2 font-bold pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all"><iconify-icon icon="mdi:file-document"></iconify-icon> Devis & Factures</a>
                <a href="/users/seniors/conseils.php" class="flex items-center gap-2 font-bold pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all"><iconify-icon icon="mdi:lightbulb"></iconify-icon> Conseils</a>
            </div>
        </div>
    </nav>
    <main class="container mx-auto max-w-3xl px-4 py-10">
        <div class="mb-10">
            <h2 class="text-5xl font-black uppercase tracking-tighter text-[#1A2B49]">Mon <span class="text-[#7CABD3]">profil</span></h2>
            <p class="text-gray-400 mt-1 text-lg">Gérez vos informations personnelles.</p>
        </div>
        <div class="bg-white rounded-[40px] shadow-lg border-2 border-gray-100 p-10 space-y-6">
            <!-- Avatar -->
            <div class="flex items-center gap-6 mb-8">
                <div class="w-20 h-20 rounded-full bg-[#7CABD3]/20 flex items-center justify-center text-[#7CABD3] font-black text-3xl" id="avatarInitials">—</div>
                <div>
                    <h3 class="font-black text-[#1A2B49] text-2xl" id="profilNomComplet">—</h3>
                    <p class="text-gray-400" id="profilEmail">—</p>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block text-sm font-black uppercase tracking-widest text-gray-400 mb-2">Nom</label>
                    <input type="text" id="nom" class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none font-bold text-[#1A2B49]">
                </div>
                <div>
                    <label class="block text-sm font-black uppercase tracking-widest text-gray-400 mb-2">Prénom</label>
                    <input type="text" id="prenom" class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none font-bold text-[#1A2B49]">
                </div>
                <div>
                    <label class="block text-sm font-black uppercase tracking-widest text-gray-400 mb-2">Téléphone</label>
                    <input type="tel" id="telephone" class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none font-bold text-[#1A2B49]">
                </div>
                <div>
                    <label class="block text-sm font-black uppercase tracking-widest text-gray-400 mb-2">Genre</label>
                    <select id="genre" class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none font-bold text-[#1A2B49]">
                        <option value="Masculin">Homme</option>
                        <option value="Féminin">Femme</option>
                        <option value="Autre">Autre</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-black uppercase tracking-widest text-gray-400 mb-2">Date de naissance</label>
                    <input type="date" id="date_naissance" class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none font-bold text-[#1A2B49]">
                </div>
                <div>
                    <label class="block text-sm font-black uppercase tracking-widest text-gray-400 mb-2">Adresse</label>
                    <input type="text" id="adresse" class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none font-bold text-[#1A2B49]">
                </div>
            </div>
            <div class="flex justify-end pt-6">
                <button id="btnSave" onclick="sauvegarder()" class="px-10 py-4 bg-[#1A2B49] text-white rounded-full font-black uppercase text-sm hover:bg-[#7CABD3] transition-all shadow-lg">
                    Enregistrer
                </button>
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
    <script src="/js/users/senior/profil.js?v=<?php echo time(); ?>"></script>
</body>
</html>