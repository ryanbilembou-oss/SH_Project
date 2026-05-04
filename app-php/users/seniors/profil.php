<?php
require_once('../../auth.php');
?>
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
            <span id="toastIcon" class="text-lg"></span>
            <span id="toastMsg" class="font-fira uppercase text-sm tracking-widest">Message</span>
        </div>
    </div>
    <?php include('../include/navbar.php'); ?>
    <main class="container mx-auto max-w-3xl px-4 py-10">
        <div class="mb-10">
            <h2 class="text-5xl font-fira uppercase tracking-tighter text-[#1A2B49]">Mon <span class="text-[#7CABD3]">profil</span></h2>
            <p class="text-gray-400 mt-1 text-lg">Gérez vos informations personnelles.</p>
        </div>
        <div class="bg-white rounded-[40px] shadow-lg border-2 border-gray-100 p-10 space-y-6">
            
            <div class="flex items-center gap-6 mb-8">
                <div class="w-20 h-20 rounded-full bg-[#7CABD3]/20 flex items-center justify-center text-[#7CABD3] font-fira text-3xl" id="avatarInitials">—</div>
                <div>
                    <h3 class="font-fira text-[#1A2B49] text-2xl" id="profilNomComplet">—</h3>
                    <p class="text-gray-400" id="profilEmail">—</p>
                    <a href="abonnement.php"  class="inline-block px-6 py-3 text-[#7CABD3] bg-white hover:text-white hover:bg-[#7CABD3] border-2 border-[#7CABD3] rounded-full shadow transition-all font-fira">Mon abonnement </a>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block text-sm font-fira uppercase tracking-widest text-gray-400 mb-2">Nom</label>
                    <input type="text" id="nom" class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none font-fira text-[#1A2B49]">
                </div>
                <div>
                    <label class="block text-sm font-fira uppercase tracking-widest text-gray-400 mb-2">Prénom</label>
                    <input type="text" id="prenom" class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none font-fira text-[#1A2B49]">
                </div>
                <div>
                    <label class="block text-sm font-fira uppercase tracking-widest text-gray-400 mb-2">Téléphone</label>
                    <input type="tel" id="telephone" class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none font-fira text-[#1A2B49]">
                </div>
                <div>
                    <label class="block text-sm font-fira uppercase tracking-widest text-gray-400 mb-2">Genre</label>
                    <select id="genre" class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none font-fira text-[#1A2B49]">
                        <option value="Masculin">Homme</option>
                        <option value="Féminin">Femme</option>
                        <option value="Autre">Autre</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-fira uppercase tracking-widest text-gray-400 mb-2">Date de naissance</label>
                    <input type="date" id="date_naissance" class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none font-fira text-[#1A2B49]">
                </div>
                <div>
                    <label class="block text-sm font-fira uppercase tracking-widest text-gray-400 mb-2">Adresse</label>
                    <input type="text" id="adresse" class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none font-fira text-[#1A2B49]">
                </div>
            </div>
            <div class="flex justify-end pt-6">
                <button id="btnSave" onclick="sauvegarder()" class="px-10 py-4 bg-[#1A2B49] text-white rounded-full font-fira uppercase text-sm hover:bg-[#7CABD3] transition-all shadow-lg">
                    Enregistrer
                </button>
            </div>
        </div>
    </main>
    <?php include('../include/footer.php'); ?>

    <script src="/js/users/senior/profil.js?v=<?php echo time(); ?>"></script>
</body>
</html>