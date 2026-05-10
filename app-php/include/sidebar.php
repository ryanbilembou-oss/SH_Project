<div class="bg-gray-800 shadow-xl h-16 fixed bottom-0 md:relative md:h-screen z-10 w-full md:w-64 border-r border-gray-700">
    <div class="md:mt-6 md:w-64 md:fixed md:left-0 md:top-0 md:h-screen md:overflow-y-auto content-center md:content-start text-left justify-between">
        
        <div class="hidden md:flex items-center px-6 py-4 border-b border-gray-700 mb-4">
            <span class="text-white font-bold text-xl tracking-tighter">SILVER HAPPY</span>
            <a href="/users/seniors/accueil_senior.php" class="inline-block px-2 py-1 bg-[#FF7000] rounded-full shadow text-white hover:text-[#FF7000] hover:bg-white border-2 border-[#000000] transition-all font-bold">Dashboard</a>
        </div>

        <ul class="list-reset flex flex-row md:flex-col py-0 md:py-3 px-1 md:px-2 text-center md:text-left mb-10">

            <li class="mr-3 flex-1 md:w-full">
                <a href="/admin/admin_dashboard.php" class="block py-1 md:py-3 pl-1 text-white hover:text-blue-500 border-b-2 border-gray-800 hover:border-blue-500 transition-all">
                    <i class="fas fa-chart-line pr-3 text-blue-500"></i>
                    <span class="text-xs md:text-base text-gray-300 font-bold">Dashboard</span>
                </a>
            </li>
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
                        <a href="/admin/admin_users.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                            <i class="fas fa-list mr-2 text-blue-400"></i> Liste des comptes
                        </a>
                    </li>
                    <li class="py-2 pl-8 hover:bg-gray-700 transition-colors">
                        <a href="/admin/admin_create_user.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                            <i class="fas fa-plus-circle mr-2 text-green-400"></i> Création Manuel
                        </a>
                    </li>
                    <li class="py-2 pl-8 hover:bg-gray-700 transition-colors">
                        <a href="/admin/profile/admin_profile_senior.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                            <i class="fas fa-user-clock mr-2 text-blue-400"></i> Profils Seniors
                        </a>
                    </li>
                    <li class="py-2 pl-8 hover:bg-gray-700 transition-colors">
                        <a href="/admin/profile/admin_profile_pro.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                            <i class="fas fa-briefcase mr-2 text-yellow-400"></i> Profils Prestataires
                        </a>
                    </li>
                    <li class="py-2 pl-8 hover:bg-gray-700 transition-colors">
                        <a href="/admin/profile/admin_profile_admin.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                            <i class="fas fa-user-shield mr-2 text-red-400"></i> Profils Admins
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
                        <span class="pb-1 md:pb-0 text-xs md:text-base text-gray-300 block md:inline-block font-bold">Services</span>
                    </div>
                    <i class="fas fa-angle-down text-xs mr-2 transition-transform duration-200" id="services-sub-arrow"></i>
                </button>
                <ul id="services-sub" class="hidden bg-gray-900 flex-col mt-1 rounded-r-lg border-l-2 border-pink-600">
                    <li class="py-2 pl-8 hover:bg-gray-700 transition-colors">
                        <a href="/admin/service/admin_service.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                            <i class="fas fa-list mr-2 text-pink-400"></i> Voir les services
                        </a>
                    </li>
                    <li class="py-2 pl-8 hover:bg-gray-700 transition-colors">
                        <a href="/admin/service/admin_create_service.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                            <i class="fas fa-plus-circle mr-2 text-green-400"></i> Créer un service
                        </a>
                    </li>
                    <li class="py-2 pl-8 hover:bg-gray-700 transition-colors">
                        <a href="/admin/service/categorie/admin_categorie_service.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                            <i class="fas fa-tags mr-2 text-purple-400"></i> Voir les catégories
                        </a>
                    </li>
                    <li class="py-2 pl-8 hover:bg-gray-700 transition-colors">
                        <a href="/admin/service/categorie/admin_create_categorie_service.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                            <i class="fas fa-plus-circle mr-2 text-green-400"></i> Créer une catégorie
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
                        <a href="/admin/evenement/admin_evenement.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                            <i class="fas fa-eye mr-2 text-orange-400"></i> Voir événements
                        </a>
                    </li>
                    <li class="py-2 pl-8 hover:bg-gray-700 transition-colors">
                        <a href="/admin/evenement/admin_create_evenement.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                            <i class="fas fa-plus-circle mr-2 text-green-400"></i> Créer un événement
                        </a>
                    </li>
                    <li class="py-2 pl-8 hover:bg-gray-700 transition-colors">
                        <a href="/admin/evenement/categorie_evenement/admin_categorie_evenement.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                            <i class="fas fa-tags mr-2 text-purple-400"></i> Voir les catégories
                        </a>
                    </li>
                    <li class="py-2 pl-8 hover:bg-gray-700 transition-colors">
                        <a href="/admin/evenement/categorie_evenement/admin_create_categorie_evenement.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                            <i class="fas fa-plus-circle mr-2 text-green-400"></i> Créer une catégorie
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
                        <a href="/admin/article/admin_article.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                            <i class="fas fa-list mr-2 text-emerald-400"></i> Voir les articles
                        </a>
                    </li>
                    <li class="py-2 pl-8 hover:bg-gray-700 transition-colors">
                        <a href="/admin/article/admin_create_article.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                            <i class="fas fa-plus-circle mr-2 text-green-400"></i> Créer un article
                        </a>
                    </li>
                    <li class="py-2 pl-8 hover:bg-gray-700 transition-colors">
                        <a href="/admin/article/categorie_article/admin_categorie_article.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                            <i class="fas fa-tags mr-2 text-purple-400"></i> Voir les catégories
                        </a>
                    </li>
                    <li class="py-2 pl-8 hover:bg-gray-700 transition-colors">
                        <a href="/admin/article/categorie_article/admin_create_categorie_article.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                            <i class="fas fa-plus-circle mr-2 text-green-400"></i> Créer une catégorie
                        </a>
                    </li>
                </ul>
            </li>

            
            <li class="mr-3 flex-1 md:w-full mt-2">
                <button onclick="toggleSubMenu('interventions-sub')" class="w-full block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-cyan-500 border-b-2 border-gray-800 hover:border-cyan-500 flex justify-between items-center transition-all">
                    <div>
                        <i class="fas fa-hand-holding-heart pr-0 md:pr-3 text-cyan-500"></i>
                        <span class="pb-1 md:pb-0 text-xs md:text-base text-gray-300 block md:inline-block font-bold">Interventions</span>
                    </div>
                    <i class="fas fa-angle-down text-xs mr-2 transition-transform duration-200" id="interventions-sub-arrow"></i>
                </button>
                <ul id="interventions-sub" class="hidden bg-gray-900 flex-col mt-1 rounded-r-lg border-l-2 border-cyan-600">
                    <li class="py-2 pl-8 hover:bg-gray-700 transition-colors">
                        <a href="/admin/intervention/admin_intervention.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                            <i class="fas fa-list mr-2 text-cyan-400"></i> Voir les interventions
                        </a>
                    </li>
                    <li class="py-2 pl-8 hover:bg-gray-700 transition-colors">
                        <a href="/admin/intervention/admin_create_intervention.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                            <i class="fas fa-plus-circle mr-2 text-green-400"></i> Créer une intervention
                        </a>
                    </li>
                    <li class="py-2 pl-8 hover:bg-gray-700 transition-colors">
                        <a href="/admin/litiges/admin_litiges.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                            <i class="fas fa-gavel mr-2 text-red-400"></i> Litiges
                        </a>
                    </li>
                    <li class="py-2 pl-8 hover:bg-gray-700 transition-colors">
                        <a href="/admin/note_avis/admin_note_avis.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                            <i class="fas fa-star mr-2 text-yellow-400"></i> Notes & Avis
                        </a>
                    </li>
                </ul>
            </li>

            
            <li class="mr-3 flex-1 md:w-full mt-2">
                <button onclick="toggleSubMenu('prestataires-sub')" class="w-full block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-violet-500 border-b-2 border-gray-800 hover:border-violet-500 flex justify-between items-center transition-all">
                    <div>
                        <i class="fas fa-user-tie pr-0 md:pr-3 text-violet-500"></i>
                        <span class="pb-1 md:pb-0 text-xs md:text-base text-gray-300 block md:inline-block font-bold">Prestataires</span>
                    </div>
                    <i class="fas fa-angle-down text-xs mr-2 transition-transform duration-200" id="prestataires-sub-arrow"></i>
                </button>
                <ul id="prestataires-sub" class="hidden bg-gray-900 flex-col mt-1 rounded-r-lg border-l-2 border-violet-600">
                    <li class="py-2 pl-8 hover:bg-gray-700 transition-colors">
                        <a href="/admin/offre_prestataire/admin_offre_prestataire.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                            <i class="fas fa-list mr-2 text-violet-400"></i> Offres prestataires
                        </a>
                    </li>
                    <li class="py-2 pl-8 hover:bg-gray-700 transition-colors">
                        <a href="/admin/offre_prestataire/admin_create_offre_prestataire.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                            <i class="fas fa-plus-circle mr-2 text-green-400"></i> Créer une offre
                        </a>
                    </li>
                    <li class="py-2 pl-8 hover:bg-gray-700 transition-colors">
                        <a href="/admin/documents_pro/admin_documents_pro.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                            <i class="fas fa-file-alt mr-2 text-violet-400"></i> Documents pros
                        </a>
                    </li>
                    <li class="py-2 pl-8 hover:bg-gray-700 transition-colors">
                        <a href="/admin/type_prestataire/admin_type_prestataire.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                            <i class="fas fa-tags mr-2 text-purple-400"></i> Types prestataires
                        </a>
                    </li>
                    <li class="py-2 pl-8 hover:bg-gray-700 transition-colors">
                        <a href="/admin/categorie_document/admin_categorie_document.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                            <i class="fas fa-folder mr-2 text-purple-400"></i> Catégories documents
                        </a>
                    </li>
                    <li class="py-2 pl-8 hover:bg-gray-700 transition-colors">
                        <a href="/admin/admin_type_prestataire_categorie.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                            <i class="fas fa-link mr-2 text-violet-400"></i> Types & Catégories services
                        </a>
                    </li>
                    <li class="py-2 pl-8 hover:bg-gray-700 transition-colors">
                        <a href="/admin/admin_referencement.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                            <i class="fas fa-star mr-2 text-yellow-400"></i> Référencements actifs
                        </a>
                    </li>
                </ul>
            </li>

            
            <li class="mr-3 flex-1 md:w-full mt-2">
                <button onclick="toggleSubMenu('planning-sub')" class="w-full block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-lime-500 border-b-2 border-gray-800 hover:border-lime-500 flex justify-between items-center transition-all">
                    <div>
                        <i class="fas fa-calendar-check pr-0 md:pr-3 text-lime-500"></i>
                        <span class="pb-1 md:pb-0 text-xs md:text-base text-gray-300 block md:inline-block font-bold">Planning</span>
                    </div>
                    <i class="fas fa-angle-down text-xs mr-2 transition-transform duration-200" id="planning-sub-arrow"></i>
                </button>
                <ul id="planning-sub" class="hidden bg-gray-900 flex-col mt-1 rounded-r-lg border-l-2 border-lime-600">
                    <li class="py-2 pl-8 hover:bg-gray-700 transition-colors">
                        <a href="/admin/planning/admin_planning_pro.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                            <i class="fas fa-clock mr-2 text-lime-400"></i> Planning prestataires
                        </a>
                    </li>
                    <li class="py-2 pl-8 hover:bg-gray-700 transition-colors">
                        <a href="/admin/planning/admin_planning_senior.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                            <i class="fas fa-clock mr-2 text-lime-400"></i> Planning seniors
                        </a>
                    </li>
                </ul>
            </li>

            
            <li class="mr-3 flex-1 md:w-full mt-2">
                <button onclick="toggleSubMenu('finance-sub')" class="w-full block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-yellow-500 border-b-2 border-gray-800 hover:border-yellow-500 flex justify-between items-center transition-all">
                    <div>
                        <i class="fas fa-file-invoice-dollar pr-0 md:pr-3 text-yellow-500"></i>
                        <span class="pb-1 md:pb-0 text-xs md:text-base text-gray-300 block md:inline-block font-bold">Financier</span>
                    </div>
                    
                    <i class="fas fa-angle-down text-xs mr-2 transition-transform duration-200" id="finance-sub-arrow"></i>
                </button>
                <ul id="finance-sub" class="hidden bg-gray-900 flex-col mt-1 rounded-r-lg border-l-2 border-yellow-600">
                    <li class="py-2 pl-8 hover:bg-gray-700 transition-colors">
                        <a href="/admin/admin_negociation.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                            <i class="fas fa-handshake mr-2 text-yellow-400"></i> Négociations commission
                        </a>
                    </li>
                    <li class="py-2 pl-8 hover:bg-gray-700 transition-colors">
                        <a href="/admin/devis/admin_devis.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                            <i class="fas fa-file-alt mr-2 text-yellow-400"></i> Devis
                        </a>
                    </li>
                    <li class="py-2 pl-8 hover:bg-gray-700 transition-colors">
                        <a href="/admin/facture/admin_facture.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                            <i class="fas fa-receipt mr-2 text-yellow-400"></i> Factures
                        </a>
                    </li>
                </ul>
            </li>

            
            <li class="mr-3 flex-1 md:w-full mt-2">
                <button onclick="toggleSubMenu('communication-sub')" class="w-full block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-indigo-500 border-b-2 border-gray-800 hover:border-indigo-500 flex justify-between items-center transition-all">
                    <div>
                        <i class="fas fa-envelope pr-0 md:pr-3 text-indigo-500"></i>
                        <span class="pb-1 md:pb-0 text-xs md:text-base text-gray-300 block md:inline-block font-bold">Communication</span>
                    </div>
                    <i class="fas fa-angle-down text-xs mr-2 transition-transform duration-200" id="communication-sub-arrow"></i>
                </button>
                <ul id="communication-sub" class="hidden bg-gray-900 flex-col mt-1 rounded-r-lg border-l-2 border-indigo-600">
                    <li class="py-2 pl-8 hover:bg-gray-700 transition-colors">
                        <a href="/admin/admin_messagerie.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                            <i class="fas fa-comments mr-2 text-indigo-400"></i> Messagerie
                        </a>

                    </li>
                    <li class="py-2 pl-8 hover:bg-gray-700 transition-colors">
                          <a href="/admin/admin_support.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                            <i class="fas fa-headset mr-2 text-indigo-400"></i> Support
                        </a>
                    </li>
                    <li class="py-2 pl-8 hover:bg-gray-700 transition-colors">
                        <a href="/admin/newsletter/admin_newsletter.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                            <i class="fas fa-newspaper mr-2 text-indigo-400"></i> Newsletter
                        </a>
                    </li>
                </ul>
            </li>

            
            <li class="mr-3 flex-1 md:w-full mt-2">
                <button onclick="toggleSubMenu('contenu-sub')" class="w-full block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-teal-500 border-b-2 border-gray-800 hover:border-teal-500 flex justify-between items-center transition-all">
                    <div>
                        <i class="fas fa-book-open pr-0 md:pr-3 text-teal-500"></i>
                        <span class="pb-1 md:pb-0 text-xs md:text-base text-gray-300 block md:inline-block font-bold">Contenu</span>
                    </div>
                    <i class="fas fa-angle-down text-xs mr-2 transition-transform duration-200" id="contenu-sub-arrow"></i>
                </button>
                <ul id="contenu-sub" class="hidden bg-gray-900 flex-col mt-1 rounded-r-lg border-l-2 border-teal-600">
                    <li class="py-2 pl-8 hover:bg-gray-700 transition-colors">
                        <a href="/admin/conseil/admin_conseil.php" class="text-xs md:text-sm text-gray-300 flex items-center">
                            <i class="fas fa-lightbulb mr-2 text-teal-400"></i> Conseils
                        </a>
                    </li>
                </ul>
            </li>

        </ul>
    </div>
</div>

<script src="/js/include/sidebar.js"></script>