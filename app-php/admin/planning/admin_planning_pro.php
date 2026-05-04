<?php
require_once('../../auth.php');

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy | Planning Prestataires</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body class="bg-gray-100 font-sans leading-normal tracking-normal">
    <div class="flex flex-col md:flex-row min-h-screen">
        <?php include('../../include/sidebar.php'); ?>
        <main class="flex-1 bg-gray-50 mt-12 md:mt-0 pb-10">
            <header class="bg-gray-800 pt-3">
                <div class="bg-gradient-to-r from-blue-900 to-gray-800 p-6 shadow-md text-white flex justify-between items-center rounded-tl-3xl">
                    <h1 class="text-2xl font-bold uppercase tracking-wide">Planning Prestataires</h1>
                </div>
            </header>
            <section class="p-6">
                <div class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                    <div class="p-4 border-b border-gray-200">
                        <div class="relative">
                            <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                            <input type="search" id="searchInput" placeholder="Rechercher un prestataire..." class="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                        </div>
                    </div>
                    <div id="proList" class="divide-y divide-gray-100"></div>
                </div>
            </section>
        </main>
    </div>
    <script src="../../js/admin/planning/planning_pro.js?v=<?php echo time(); ?>"></script>
</body>
</html>