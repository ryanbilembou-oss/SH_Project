<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy | Création Utilisateur</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body class="bg-gray-100 font-sans leading-normal tracking-normal">
    <div id="successToast" class="fixed top-5 left-1/2 transform -translate-x-1/2 -translate-y-full opacity-0 z-50 transition-all duration-500 ease-in-out">
        <div class="bg-green-600 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center space-x-3">
            <i class="fas fa-check-circle text-xl"></i>
            <span class="font-bold uppercase tracking-wide text-sm">Utilisateur créé avec succès !</span>
        </div>
    </div>
    <div class="flex flex-col md:flex-row">
        <?php include('include/sidebar.php');   ?>

        <div class="main-content flex-1 bg-gray-100 mt-12 md:mt-0 pb-24 md:pb-5">
            
            <div class="bg-gray-800 pt-3">
                <div class="rounded-tl-3xl bg-gradient-to-r from-green-900 to-gray-800 p-6 shadow text-2xl text-white flex justify-between items-center">
                    <h3 class="font-bold pl-2 uppercase tracking-wide">Création d'un compte manuel</h3>
                    <a href="admin_users.php" class="text-sm bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition">
                        <i class="fas fa-arrow-left mr-2"></i> Retour à la liste
                    </a>
                </div>
            </div>

            <div class="flex justify-center p-6">
                <div class="w-full max-w-2xl">
                    <div class="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
                        <div class="bg-gray-50 border-b border-gray-200 p-4">
                            <h5 class="font-bold uppercase text-gray-600">Informations du nouvel utilisateur</h5>
                        </div>
                        
                        <form id="createFullUserForm" class="p-8 space-y-6">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">Adresse Email</label>
                                    <input type="email" id="email" required placeholder="exemple@silver.fr"
                                           class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">Rôle Système</label>
                                    <select id="role" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none transition">
                                        <option value="senior">Senior</option>
                                        <option value="admin">Administrateur</option>
                                        <option value="pro">Préstataire</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Mot de passe provisoire</label>
                                <div class="relative">
                                    <input type="password" id="password" required
                                           class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none transition">
                                    <span class="text-xs text-gray-400 mt-1 italic">L'utilisateur pourra le modifier lors de sa première connexion.</span>
                                </div>
                            </div>

                            <div class="pt-6 border-t border-gray-100 flex justify-end">
                                <button type="submit" class="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transform hover:-translate-y-1 transition duration-200">
                                    <i class="fas fa-save mr-2"></i> Enregistrer l'utilisateur
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="js/admin/create_users.js"></script>
</body>
</html>