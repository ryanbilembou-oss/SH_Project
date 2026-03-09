<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy | Créer un Article</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        .rotate-180 { transform: rotate(180deg); }
        #users-sub, #services-sub, #events-sub { transition: all 0.3s ease-in-out; }
    </style>
</head>
<body class="bg-gray-100 font-sans leading-normal tracking-normal">

    <!-- Toast -->
    <div id="toastContainer" class="fixed top-5 left-1/2 transform -translate-x-1/2 -translate-y-20 opacity-0 z-[100] transition-all duration-300 pointer-events-none">
        <div class="bg-gray-900 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center space-x-3 border border-gray-700">
            <i id="toastIcon" class="fas fa-check-circle text-emerald-400 text-xl"></i>
            <span id="toastMessage" class="font-semibold tracking-wide text-sm">Notification</span>
        </div>
    </div>

    <div class="flex flex-col md:flex-row min-h-screen">
        <?php include('../../include/sidebar.php'); ?>

        <div class="main-content flex-1 bg-gray-100 mt-12 md:mt-0 pb-24 md:pb-5">

            <!-- Header -->
            <div class="bg-gray-800 pt-3">
                <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-6 shadow text-2xl text-white flex justify-between items-center">
                    <h3 class="font-bold pl-2 uppercase tracking-wide">Créer un Article</h3>
                    <a href="admin_articles.php" class="text-sm font-normal italic text-gray-300 hover:text-white transition flex items-center gap-2">
                        <i class="fas fa-arrow-left"></i> Retour au catalogue
                    </a>
                </div>
            </div>

            <div class="flex flex-wrap p-6">
                <div class="w-full max-w-3xl mx-auto">
                    <div class="bg-white border-transparent rounded-xl shadow-2xl overflow-hidden border border-gray-200">

                        <div class="bg-gray-50 border-b border-gray-200 p-4">
                            <h5 class="font-bold uppercase text-gray-600 italic">
                                <i class="fas fa-box-open mr-2 text-blue-500"></i>Informations de l'article
                            </h5>
                        </div>

                        <div class="p-6">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <!-- Nom -->
                                <div class="md:col-span-2">
                                    <label class="block text-sm font-bold text-gray-700 mb-1">
                                        <i class="fas fa-tag mr-1 text-blue-400"></i> Nom de l'article
                                    </label>
                                    <input type="text" id="nom" placeholder="Nom de l'article"
                                        class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition">
                                </div>

                                <!-- Catégorie 
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-1">
                                        <i class="fas fa-folder mr-1 text-purple-400"></i> Catégorie
                                    </label>
                                    <select id="id_categorie"
                                        class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition bg-white">
                                        <option value="">Chargement...</option>
                                    </select>
                                </div>-->

                                <!-- Prix -->
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-1">
                                        <i class="fas fa-euro-sign mr-1 text-emerald-500"></i> Prix (€)
                                    </label>
                                    <input type="number" id="prix" min="0" step="0.01" placeholder="0.00"
                                        class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition">
                                </div>

                                <!-- Stock -->
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-1">
                                        <i class="fas fa-cubes mr-1 text-orange-400"></i> Stock
                                    </label>
                                    <input type="number" id="stock" min="0" placeholder="0"
                                        class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition">
                                </div>

                                <!-- Image URL -->
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-1">
                                        <i class="fas fa-image mr-1 text-pink-400"></i> URL de l'image (optionnel)
                                    </label>
                                    <input type="text" id="image_url" placeholder="https://..."
                                        class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition">
                                </div>

                                <!-- Bio / Description -->
                                <div class="md:col-span-2">
                                    <label class="block text-sm font-bold text-gray-700 mb-1">
                                        <i class="fas fa-align-left mr-1 text-gray-400"></i> Description (optionnel)
                                    </label>
                                    <textarea id="bio" rows="4" placeholder="Description de l'article..."
                                        class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"></textarea>
                                </div>

                            </div>

                            <!-- Boutons -->
                            <div class="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
                                <a href="admin_articles.php" class="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-semibold text-sm">
                                    Annuler
                                </a>
                                <button type="button" id="submitBtn"
                                    class="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition font-semibold text-sm shadow flex items-center gap-2">
                                    <i class="fas fa-plus"></i> Créer l'article
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="../../js/admin/article/create_article.js"></script>
</body>
</html>