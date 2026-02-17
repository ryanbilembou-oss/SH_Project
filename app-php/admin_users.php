<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy | Administration</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        /* Transition douce pour la rotation des flèches */
        .rotate-180 { transform: rotate(180deg); }
        #users-sub, #services-sub, #events-sub { transition: all 0.3s ease-in-out; }
    </style>
</head>
<body class="bg-gray-100 font-sans leading-normal tracking-normal">

    <div class="flex flex-col md:flex-row">
        <div class="bg-gray-800 shadow-xl h-16 fixed bottom-0 md:relative md:h-screen z-10 w-full md:w-64 border-r border-gray-700">
            <div class="md:mt-6 md:w-64 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between">
                
                <div class="hidden md:flex items-center px-6 py-4 border-b border-gray-700 mb-4">
                    <i class="fas fa-heartbeat text-blue-500 mr-3 text-2xl"></i>
                    <span class="text-white font-bold text-xl tracking-tighter">SILVER HAPPY</span>
                </div>

                <ul class="list-reset flex flex-row md:flex-col py-0 md:py-3 px-1 md:px-2 text-center md:text-left">
                    
                    <li class="mr-3 flex-1 md:w-full">
                        <button onclick="toggleSubMenu('users-sub')" class="w-full block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-blue-500 border-b-2 border-gray-800 hover:border-blue-500 flex justify-between items-center transition-all">
                            <div>
                                <i class="fas fa-users pr-0 md:pr-3 text-blue-500"></i>
                                <span class="pb-1 md:pb-0 text-xs md:text-base text-gray-300 block md:inline-block font-bold">Utilisateurs</span>
                            </div>
                              <i class="fas fa-angle-down text-xs mr-2 transition-transform duration-200 rotate-180" id="users-sub-arrow"></i>
                        </button>
                        <ul id="users-sub" class="flex bg-gray-900 flex-col mt-1 rounded-r-lg border-l-2 border-blue-600">
                            <li class="py-2 pl-8 hover:bg-gray-700 transition-colors">
                                <a href="admin_users.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                                    <i class="fas fa-list mr-2 text-blue-400"></i> Liste des comptes
                                </a>
                            </li>
                            <li class="py-2 pl-8 hover:bg-gray-700 transition-colors">
                                <a href="#" class="text-xs md:text-sm text-gray-300 flex items-center">
                                    <i class="fas fa-plus-circle mr-2 text-green-400"></i> Création Manuel
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li class="mr-3 flex-1 md:w-full mt-2">
                        <button onclick="toggleSubMenu('services-sub')" class="w-full block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-pink-500 border-b-2 border-gray-800 hover:border-pink-500 flex justify-between items-center transition-all">
                            <div>
                                <i class="fas fa-tasks pr-0 md:pr-3 text-pink-500"></i>
                                <span class="pb-1 md:pb-0 text-xs md:text-base text-gray-300 block md:inline-block font-bold">Prestations</span>
                            </div>
                            <i class="fas fa-angle-down text-xs mr-2 transition-transform duration-200" id="services-sub-arrow"></i>
                        </button>
                        <ul id="services-sub" class="hidden bg-gray-900 flex-col mt-1 rounded-r-lg border-l-2 border-pink-600">
                            <li class="py-2 pl-8 hover:bg-gray-700 transition-colors">
                                <a href="#" class="text-xs md:text-sm text-gray-300 flex items-center">
                                    <i class="fas fa-th-list mr-2 text-pink-400"></i> Liste services
                                </a>
                            </li>
                            <li class="py-2 pl-8 hover:bg-gray-700 transition-colors">
                                <a href="#" class="text-xs md:text-sm text-gray-300 flex items-center">
                                    <i class="fas fa-tags mr-2 text-yellow-400"></i> Catégories
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li class="mr-3 flex-1 md:w-full mt-2">
                        <button onclick="toggleSubMenu('events-sub')" class="w-full block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-orange-500 border-b-2 border-gray-800 hover:border-orange-500 flex justify-between items-center transition-all">
                            <div>
                                <i class="fas fa-calendar-alt pr-0 md:pr-3 text-orange-500"></i>
                                <span class="pb-1 md:pb-0 text-xs md:text-base text-gray-300 block md:inline-block font-bold">Événements</span>
                            </div>
                            <i class="fas fa-angle-down text-xs mr-2 transition-transform duration-200" id="events-sub-arrow"></i>
                        </button>
                        <ul id="events-sub" class="hidden bg-gray-900 flex-col mt-1 rounded-r-lg border-l-2 border-orange-600">
                            <li class="py-2 pl-8 hover:bg-gray-700 transition-colors">
                                <a href="#" class="text-xs md:text-sm text-gray-300 flex items-center">
                                    <i class="fas fa-eye mr-2 text-orange-400"></i> Voir calendrier
                                </a>
                            </li>
                        </ul>
                    </li>

                </ul>
            </div>
        </div>

        <div class="main-content flex-1 bg-gray-100 mt-12 md:mt-0 pb-24 md:pb-5">
            
            <div class="bg-gray-800 pt-3">
                <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-6 shadow text-2xl text-white flex justify-between items-center">
                    <h3 class="font-bold pl-2 uppercase tracking-wide">Gestion des Utilisateurs</h3>
                    <div class="text-sm font-normal italic">Session Admin : Connecté</div>
                </div>
            </div>

            <div class="flex flex-wrap p-6">
                <div class="w-full">
                    <div class="bg-white border-transparent rounded-xl shadow-2xl overflow-hidden border border-gray-200">
                        <div class="bg-gray-50 border-b border-gray-200 p-4 flex justify-between items-center">
                            <h5 class="font-bold uppercase text-gray-600 italic">Liste des Comptes</h5>
                            <div class="relative">
                                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <i class="fas fa-search text-gray-400"></i>
                                </span>
                                <input type="text" id="searchInput" placeholder="Filtrer..." class="pl-10 pr-4 py-1 border rounded-full text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                            </div>
                        </div>
                        
                        <div class="p-5 overflow-x-auto">
                            <table class="w-full text-left border-collapse">
                                <thead>
                                    <tr class="bg-gray-800 text-white uppercase text-xs">
                                        <th class="p-4 font-bold border-r border-gray-700">ID</th>
                                        <th class="p-4 font-bold">Email</th>
                                        <th class="p-4 font-bold text-center">Rôle</th>
                                        <th class="p-4 font-bold text-center">Date Inscription</th>
                                        <th class="p-4 font-bold text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="userTableBody" class="divide-y divide-gray-100">
                                    <tr>
                                        <td colspan="5" class="text-center py-20 text-gray-400 italic">
                                            <i class="fas fa-spinner fa-spin mr-2"></i> Appel de l'API Go...
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Fonction pour dérouler les menus de la sidebar
        function toggleSubMenu(id) {
            const subMenu = document.getElementById(id);
            const arrow = document.getElementById(id + '-arrow');
            
            subMenu.classList.toggle('hidden');
            subMenu.classList.toggle('flex');
            
            if (arrow) {
                arrow.classList.toggle('rotate-180');
            }
        }
    </script>
    <script src="js/admin.js"></script>
</body>
</html>