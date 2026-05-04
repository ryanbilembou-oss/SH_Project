<?php
require_once('../auth.php');

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy | Administration</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        .rotate-180 { transform: rotate(180deg); }
        #users-sub, #services-sub, #events-sub { transition: all 0.3s ease-in-out; }
    </style>
</head>
<body class="bg-gray-100 font-sans leading-normal tracking-normal">
    
    <div id="deleteToast" class="fixed top-5 left-1/2 transform -translate-x-1/2 -translate-y-full opacity-0 z-50 transition-all duration-500 ease-in-out">
        <div class="bg-red-600 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center space-x-3">
            <i class="fas fa-trash-alt text-xl"></i>
            <span class="font-bold uppercase tracking-wide text-sm">Utilisateur supprimé avec succès !</span>
        </div>
    </div>

    <div class="flex flex-col md:flex-row">
        
        <?php include('../include/sidebar.php'); ?>

        <div class="main-content flex-1 bg-gray-100 mt-12 md:mt-0 pb-24 md:pb-5">
            
            <div class="bg-gray-800 pt-3">
                <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-6 shadow text-2xl text-white flex justify-between items-center">
                    <h3 class="font-bold pl-2 uppercase tracking-wide">Gestion des Utilisateurs</h3>
                    <a href="admin_create_user.php" class="bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors shadow-lg flex items-center gap-2">
                        <i class="fas fa-plus"></i> <span>Nouvel Utilisateur</span>
                    </a>
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

    <div id="deleteModal" class="fixed inset-0 bg-gray-900 bg-opacity-50 hidden flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl transform transition-all">
            <div class="text-center">
                <i class="fas fa-exclamation-circle text-red-500 text-5xl mb-4"></i>
                <h3 class="text-xl font-bold text-gray-800">Supprimer ?</h3>
                <p class="text-gray-500 mt-2">Es-tu sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.</p>
            </div>
            <div class="flex justify-center gap-4 mt-6">
                <button onclick="closeModal()" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">Annuler</button>
                <button id="confirmDeleteBtn" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Supprimer</button>
            </div>
        </div>
    </div>
    
    <script src="../js/admin/admin.js"></script>
    <script src="../js/admin/delete_users.js"></script>
</body>
</html>