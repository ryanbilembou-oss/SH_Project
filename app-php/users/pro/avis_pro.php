<?php
require_once('../../auth.php');

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy - Mes Avis</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:wght@400;700;900&display=swap" rel="stylesheet">
    <link rel="icon" href="/img/logo-clear.png">
    <style>
        body { font-family: 'Fira Sans Condensed', sans-serif; background-color: #FFFFF6; font-size: 18px; }
    </style>
</head>
<body class="bg-[#FFFFF6] min-h-screen">

    <?php include('../include/navbar.php'); ?>

    <main class="container mx-auto max-w-6xl px-4 py-10">

        <div class="mb-10 flex items-center justify-between flex-wrap gap-4">
            <div>
                <h2 class="text-5xl font-fira uppercase tracking-tighter text-[#1A2B49]">
                    Mes <span class="text-[#7CABD3]">avis</span>
                </h2>
                <p class="text-gray-400 mt-1 text-lg">Ce que les seniors pensent de vos prestations.</p>
            </div>
            <div class="text-center">
                <p class="text-6xl font-fira text-[#1A2B49]" id="noteMoyenne">—</p>
                <p class="text-[#FCE297] text-2xl" id="etoilesMoyenne">☆☆☆☆☆</p>
                <p class="text-gray-400 text-sm font-fira uppercase tracking-widest" id="nbAvis">0 avis</p>
            </div>
        </div>

        <div id="avisList" class="grid md:grid-cols-2 gap-6">
            <div class="bg-white p-8 rounded-[40px] border-2 border-dashed border-gray-200 text-center col-span-2">
                <p class="text-gray-400 italic">Chargement...</p>
            </div>
        </div>

    </main>

    <?php include('../include/footer.php'); ?>
    <script src="/js/users/pro/avis_pro.js?v=<?php echo time(); ?>"></script>
</body>
</html>