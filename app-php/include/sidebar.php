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
                        <a href="admin_create_user.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                            <i class="fas fa-plus-circle mr-2 text-green-400"></i> Création Manuel
                        </a>
                    </li>
                    <?php 
                    $page = basename($_SERVER['PHP_SELF']);
                    if($page == 'admin/admin_edit_user.php'): 
                    ?>
                    <li class="py-2 pl-8 bg-gray-800 transition-colors border-l-2 border-yellow-500">
                        <span class="text-xs md:text-sm text-yellow-400 flex items-center">
                            <i class="fas fa-user-edit mr-2"></i> Mode Édition
                        </span>
                    </li>
                    <?php endif; ?>
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
                        <a href="admin_evenement.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                            <i class="fas fa-eye mr-2 text-orange-400"></i> Voir événements
                        </a>
                    </li>
                    <li class="py-2 pl-8 hover:bg-gray-700 transition-colors">
                        <a href="admin_create_evenement.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                            <i class="fas fa-plus-circle mr-2 text-green-400"></i> Créer un événement
                        </a>
                    </li>
                </ul>
            </li>

        
            <li class="mr-3 flex-1 md:w-full mt-2">
                <button onclick="toggleSubMenu('articles-sub')" class="w-full block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-emerald-500 border-b-2 border-gray-800 hover:border-emerald-500 flex justify-between items-center transition-all">
                    <div>
                        <i class="fas fa-box-open pr-0 md:pr-3 text-emerald-500"></i>
                        <span class="pb-1 md:pb-0 text-xs md:text-base text-gray-300 block md:inline-block font-bold">Articles</span>
                    </div>
                    <i class="fas fa-angle-down text-xs mr-2 transition-transform duration-200" id="articles-sub-arrow"></i>
                </button>
                <ul id="articles-sub" class="hidden bg-gray-900 flex-col mt-1 rounded-r-lg border-l-2 border-emerald-600">
                    <li class="py-2 pl-8 hover:bg-gray-700 transition-colors">
                        <a href="admin_article.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                            <i class="fas fa-list mr-2 text-emerald-400"></i> Voir les articles
                        </a>
                    </li>
                    <li class="py-2 pl-8 hover:bg-gray-700 transition-colors">
                        <a href="admin_create_article.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                            <i class="fas fa-plus-circle mr-2 text-green-400"></i> Créer un article
                        </a>
                    </li>
                </ul>
            </li>

        </ul>
    </div>
</div>

<script src="/js/include/sidebar.js"></script>