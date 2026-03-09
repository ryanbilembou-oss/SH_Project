<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Silver Happy | Modifier Utilisateur</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        .rotate-180 { transform: rotate(180deg); }
        #users-sub, #services-sub, #events-sub { transition: all 0.3s ease-in-out; }
    </style>
</head>
<body class="bg-gray-100 font-sans leading-normal tracking-normal">
    
    <div id="updateToast" class="fixed top-5 left-1/2 transform -translate-x-1/2 -translate-y-full opacity-0 z-50 transition-all duration-500 ease-in-out">
        <div class="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center space-x-3">
            <i class="fas fa-user-check text-xl"></i>
            <span class="font-bold uppercase tracking-wide text-sm">Modification enregistrée avec succès !</span>
        </div>
    </div>

    <div class="flex flex-col md:flex-row">
        <?php include('../include/sidebar.php'); ?>

        <div class="main-content flex-1 bg-gray-100 pb-24">
            
            <div class="bg-gray-800 pt-3">
                <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-6 shadow text-2xl text-white flex justify-between items-center">
                    <h3 class="font-bold uppercase tracking-wider">Modifier l'utilisateur #<span id="display-id">...</span></h3>
                    <a href="admin_users.php" class="text-sm bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition items-center flex">
                        <i class="fas fa-arrow-left mr-2"></i> Retour à la liste
                    </a>
                </div>
            </div>

            <div class="flex justify-center p-6">
                <div class="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
                    <div class="bg-gray-50 border-b border-gray-200 p-4">
                        <h5 class="font-bold uppercase text-gray-600 text-sm">Édition des informations</h5>
                    </div>
                    
                    <form id="updateUserForm" class="p-8 space-y-6">
                        <input type="hidden" id="edit-id">

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Adresse Email</label>
                                <input type="email" id="edit-email" required 
                                       class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Rôle Système (Lecture seule)</label>
                                <select id="edit-role" disabled class="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed outline-none transition">
                                    <option value="senior">Senior</option>
                                    <option value="admin">Administrateur</option>
                                    <option value="pro">Prestataire</option>
                                </select>
                            </div>
                        </div>

                        <div class="pt-6 border-t border-gray-100 flex items-center">
                            <input type="checkbox" id="reset-password-checkbox" class="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500 cursor-pointer">
                            <label for="reset-password-checkbox" class="ml-3 block text-sm font-semibold text-orange-600 cursor-pointer select-none">
                                <i class="fas fa-random mr-1"></i> Générer un nouveau mot de passe aléatoire
                            </label>
                        </div>

                        <div class="flex justify-end pt-4">
                            <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transform hover:-translate-y-1 transition duration-200 flex items-center">
                                <i class="fas fa-save mr-2"></i> Enregistrer les modifications
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script src="../js/admin/edit_users.js"></script>
</body>
</html>