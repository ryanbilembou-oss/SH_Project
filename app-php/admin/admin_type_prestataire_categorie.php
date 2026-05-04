<?php
require_once('../auth.php');

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy | Types & Catégories de services</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body class="bg-gray-100 font-sans leading-normal tracking-normal">

    <div id="toastContainer" class="fixed top-5 left-1/2 transform -translate-x-1/2 -translate-y-20 opacity-0 z-[100] transition-all duration-300 pointer-events-none">
        <div class="bg-gray-900 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center space-x-3 border border-gray-700">
            <i id="toastIcon" class="fas fa-check-circle text-emerald-400 text-xl"></i>
            <span id="toastMessage" class="font-semibold tracking-wide text-sm">Notification</span>
        </div>
    </div>

    <div class="flex flex-col md:flex-row">
        <?php include('../include/sidebar.php'); ?>

        <div class="main-content flex-1 bg-gray-100 mt-12 md:mt-0 pb-24 md:pb-5">

            <div class="bg-gray-800 pt-3">
                <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-6 shadow text-2xl text-white flex justify-between items-center">
                    <h3 class="font-bold pl-2 uppercase tracking-wide">
                        <i class="fas fa-link mr-2"></i> Types & Catégories de services
                    </h3>
                    <p class="text-sm font-normal italic text-gray-300">
                        Définissez quelles catégories chaque type de prestataire peut exercer
                    </p>
                </div>
            </div>

            <div class="p-6 space-y-6">

             
                <div class="bg-white rounded-xl shadow border border-gray-200 p-6">
                    <h4 class="text-lg font-bold text-gray-700 border-b pb-3 mb-4">
                        <i class="fas fa-user-tag text-blue-500 mr-2"></i> Choisir un type de prestataire
                    </h4>
                    <div class="flex gap-4 items-end flex-wrap">
                        <div class="flex-1 min-w-[250px]">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Type de prestataire</label>
                            <select id="selectType" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                                <option value="">-- Choisir un type --</option>
                            </select>
                        </div>
                        <button onclick="chargerLiaisons()"
                            class="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition shadow flex items-center gap-2">
                            <i class="fas fa-search"></i> Charger
                        </button>
                    </div>
                </div>

  
                <div id="panelCategories" class="hidden">
                    <div class="bg-white rounded-xl shadow border border-gray-200 p-6">
                        <div class="flex items-center justify-between border-b pb-3 mb-6">
                            <h4 class="text-lg font-bold text-gray-700">
                                <i class="fas fa-th-list text-blue-500 mr-2"></i>
                                Catégories pour : <span id="nomTypeSelectionne" class="text-blue-600"></span>
                            </h4>
                            <div class="flex gap-3">
                                <button onclick="toutCocher(true)"
                                    class="text-sm text-blue-600 hover:underline flex items-center gap-1">
                                    <i class="fas fa-check-square"></i> Tout cocher
                                </button>
                                <button onclick="toutCocher(false)"
                                    class="text-sm text-gray-400 hover:underline flex items-center gap-1">
                                    <i class="fas fa-square"></i> Tout décocher
                                </button>
                                <button onclick="sauvegarderLiaisons()"
                                    class="bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-emerald-700 transition shadow flex items-center gap-2">
                                    <i class="fas fa-save"></i> Sauvegarder
                                </button>
                            </div>
                        </div>
                        <p class="text-sm text-gray-400 mb-5 italic">
                            Cochez les catégories de services que ce type de prestataire est autorisé à proposer.
                        </p>
                        <div id="listeCategories" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-xl shadow border border-gray-200 p-6">
                    <h4 class="text-lg font-bold text-gray-700 border-b pb-3 mb-4">
                        <i class="fas fa-table text-blue-500 mr-2"></i> Vue globale des liaisons
                    </h4>
                    <div id="vueGlobale">
                        <p class="text-gray-400 italic text-sm">Chargement...</p>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <script src="../js/admin/type_prestataire_categorie.js?v=<?php echo time(); ?>"></script>
</body>
</html>