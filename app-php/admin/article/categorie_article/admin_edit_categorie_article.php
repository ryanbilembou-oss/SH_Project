<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy | Modifier une catégorie article</title>
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

    <div class="flex flex-col md:flex-row min-h-screen">
        <?php include('../../../include/sidebar.php'); ?>

        <div class="flex-1 bg-gray-100 mt-12 md:mt-0 pb-24 md:pb-5">
            <div class="bg-gray-800 pt-3">
                <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-6 shadow text-2xl text-white flex justify-between items-center">
                    <h3 class="font-bold pl-2 uppercase tracking-wide">Modifier la Catégorie</h3>
                    <a href="admin_categorie_article.php" class="text-sm font-normal italic text-gray-300 hover:text-white transition flex items-center gap-2">
                        <i class="fas fa-arrow-left"></i> Retour
                    </a>
                </div>
            </div>

            <div class="flex flex-wrap p-6 justify-center">
                <div class="w-full max-w-lg">
                    <div class="bg-white rounded-xl shadow-2xl p-8">
                        <div id="formLoader" class="text-center text-gray-400 py-10">
                            <i class="fas fa-spinner fa-spin text-3xl mb-3 block text-blue-400"></i>
                            <span class="text-sm italic">Chargement...</span>
                        </div>
                        <form id="editCategorieForm" class="space-y-6 hidden">
                            <input type="hidden" id="id_categorie">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">
                                    <i class="fas fa-tag mr-1 text-purple-400"></i> Nom de la catégorie
                                </label>
                                <input type="text" id="nom_categorie" required
                                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                            </div>
                            <div class="flex justify-end pt-4 border-t">
                                <button type="button" id="submitBtn" class="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg flex items-center">
                                    <i class="fas fa-save mr-2"></i> Enregistrer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="../../../js/admin/article/categorie_article/edit_categorie_article.js"></script>
</body>
</html>
