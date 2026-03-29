<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy | Profils Prestataires</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>.fade-out { opacity: 0; transform: translateX(20px); transition: all 0.4s ease-out; }</style>
</head>
<body class="bg-gray-100 font-sans leading-normal tracking-normal">

    <div id="toastContainer" class="fixed top-5 left-1/2 transform -translate-x-1/2 -translate-y-20 opacity-0 z-[100] transition-all duration-300 pointer-events-none">
        <div class="bg-gray-900 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center space-x-3 border border-gray-700">
            <i id="toastIcon" class="fas fa-info-circle text-blue-400 text-xl"></i>
            <span id="toastMessage" class="font-semibold tracking-wide text-sm">Notification</span>
        </div>
    </div>

    <div class="flex flex-col md:flex-row min-h-screen">
        <?php include('../../include/sidebar.php'); ?>
        <main class="flex-1 bg-gray-50 mt-12 md:mt-0 pb-10">
            <header class="bg-gray-800 pt-3">
                <div class="bg-gradient-to-r from-blue-900 to-gray-800 p-6 shadow-md text-white flex justify-between items-center rounded-tl-3xl">
                    <h1 class="text-2xl font-bold uppercase tracking-wide">Profils Prestataires</h1>
                </div>
            </header>
            <section class="p-6">
                <div class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                    <div class="bg-gray-50 border-b border-gray-200 p-4 flex justify-between items-center">
                        <h2 class="font-bold text-gray-600 uppercase text-sm tracking-wider">Liste</h2>
                        <div class="relative">
                            <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                            <input type="search" id="searchInput" placeholder="Filtrer..." class="pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64 bg-white">
                        </div>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="bg-gray-800 text-gray-100 uppercase text-xs tracking-wide">
                                    <th class="p-4 font-semibold">Nom & Prénom</th>
                                    <th class="p-4 font-semibold">Entreprise</th>
                                    <th class="p-4 font-semibold">Téléphone</th>
                                    <th class="p-4 font-semibold text-center">Note</th>
                                    <th class="p-4 font-semibold text-center">Validation</th>
                                    <th class="p-4 font-semibold text-center">Abonnement</th>
                                    <th class="p-4 font-semibold text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody id="profileProTableBody" class="divide-y divide-gray-100"></tbody>
                        </table>
                    </div>
                </div>
            </section>
        </main>
    </div>

    <div id="deleteModal" class="fixed inset-0 bg-gray-900/70 backdrop-blur-sm hidden items-center justify-center z-50 opacity-0 transition-opacity duration-300">
        <div class="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl">
            <div class="text-center">
                <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                    <i class="fas fa-exclamation-triangle text-red-600 text-2xl"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900">Supprimer le profil ?</h3>
                <p class="text-gray-500 mt-2 text-sm">Cette action est irréversible.</p>
            </div>
            <div class="flex flex-col gap-3 mt-8">
                <button id="confirmDeleteBtn" class="w-full py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold">Confirmer</button>
                <button id="cancelDeleteBtn" class="w-full py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-semibold">Annuler</button>
            </div>
        </div>
    </div>

    <script src="../../js/admin/profile/profile_pro.js?v=<?php echo time(); ?>"></script>
</body>
</html>