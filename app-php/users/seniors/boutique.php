<?php
require_once('../../auth.php');
?>
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
            <span id="toastIcon" class="text-lg"></span>
            <span id="toastMsg" class="font-fira uppercase text-sm tracking-widest">Message</span>
        </div>
    </div>
    <?php include('../include/navbar.php'); ?>
    <main class="container mx-auto max-w-6xl px-4 py-10">
        <div class="mb-10">
            <h2 class="text-5xl font-fira uppercase tracking-tighter text-[#1A2B49]">Notre <span class="text-[#7CABD3]">boutique</span></h2>
            <p class="text-gray-400 mt-1 text-lg">Découvrez nos articles et produits.</p>
        </div>

        <div class="flex flex-wrap gap-3 mb-10 items-center" id="filtresCat">
            <button onclick="filtrer(null)" class="px-5 py-2 rounded-full font-fira text-sm bg-[#1A2B49] text-white">Tous</button>

            <!-- Bouton panier à droite -->
            <a href="/users/seniors/panier/panier.php" class="ml-auto flex items-center gap-2 px-6 py-2 rounded-full font-fira text-sm uppercase bg-[#FCE297] text-[#1A2B49] border-2 border-[#FCE297] hover:bg-[#1A2B49] hover:text-white transition-all duration-300">
                <iconify-icon icon="mdi:cart-plus" class="text-xl"></iconify-icon>
                Mon panier
            </a>
        </div>

        <div id="articlesList" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-gray-200 text-center col-span-3">
                <p class="text-gray-400 italic">Chargement...</p>
            </div>

        </div>
        
    </main>
    <?php include('../include/footer.php'); ?>

    <script src="/js/users/senior/boutique.js?v=<?php echo time(); ?>"></script>
    <script src="/js/users/senior/panier/panier_utils.js"></script>
</body>
</html>