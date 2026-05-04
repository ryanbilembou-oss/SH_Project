<?php
require_once('../../../auth.php');

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy | Créer une catégorie</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body class="bg-gray-100 font-sans leading-normal tracking-normal">

    <div id="successToast" class="fixed top-5 left-1/2 transform -translate-x-1/2 -translate-y-full opacity-0 z-50 transition-all duration-500 ease-in-out">
        <div class="bg-green-600 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center space-x-3">
            <i class="fas fa-check-circle text-xl"></i>
            <span class="font-bold uppercase tracking-wide text-sm">Catégorie créée avec succès !</span>
        </div>
    </div>

    <div class="flex flex-col md:flex-row min-h-screen">
        <?php include('../../../include/sidebar.php'); ?>

        <div class="flex-1 bg-gray-100 mt-12 md:mt-0 pb-24 md:pb-5">
            <div class="bg-gray-800 pt-3">
                <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-6 shadow text-2xl text-white flex justify-between items-center">
                    <h3 class="font-bold pl-2 uppercase tracking-wide">Nouvelle Catégorie Événement</h3>
                    <a href="admin_categorie_evenement.php" class="text-sm font-normal italic text-gray-300 hover:text-white transition flex items-center gap-2">
                        <i class="fas fa-arrow-left"></i> Retour
                    </a>
                </div>
            </div>

            <div class="flex flex-wrap p-6 justify-center">
                <div class="w-full max-w-lg">
                    <div class="bg-white border-transparent rounded-xl shadow-2xl p-8">
                        <form id="createCategorieForm" class="space-y-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">
                                    <i class="fas fa-tag mr-1 text-purple-400"></i> Nom de la catégorie
                                </label>
                                <input type="text" id="nom_categorie" required placeholder="Ex: Atelier, Sortie..."
                                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                            </div>
                            <div class="flex justify-end pt-4 border-t">
                                <button type="submit" class="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg flex items-center">
                                    <i class="fas fa-save mr-2"></i> Créer la catégorie
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="../../../js/admin/evenement/categorie_evenement/create_categorie_evenement.js"></script>
</body>
</html>