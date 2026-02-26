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
    <style>
        .animate-fade-in { animation: fadeIn 0.3s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
    </style>
</head>
<body class="bg-gray-100 font-sans leading-normal tracking-normal">
    <div id="successToast" class="fixed top-5 left-1/2 transform -translate-x-1/2 -translate-y-full opacity-0 z-50 transition-all duration-500 ease-in-out">
        <div class="bg-green-600 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center space-x-3">
            <i class="fas fa-check-circle text-xl"></i>
            <span class="font-bold uppercase tracking-wide text-sm">Utilisateur créé avec succès !</span>
        </div>
    </div>

    <div class="flex flex-col md:flex-row min-h-screen">
        <?php include('include/sidebar.php'); ?>

        <div class="main-content flex-1 bg-gray-100 pb-24 md:pb-5">
            <div class="bg-gray-800 pt-3">
                <div class="rounded-tl-3xl bg-gradient-to-r from-green-900 to-gray-800 p-6 shadow text-2xl text-white flex justify-between items-center">
                    <h3 class="font-bold pl-2 uppercase tracking-wide"><i class="fas fa-user-plus mr-3"></i>Création de compte manuel</h3>
                    <a href="admin_users.php" class="text-sm bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition duration-200">
                        <i class="fas fa-arrow-left mr-2"></i> Retour à la liste
                    </a>
                </div>
            </div>

            <div class="flex justify-center p-6">
                <div class="w-full max-w-3xl">
                    <div class="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
                        <div class="bg-gray-50 border-b border-gray-200 p-4">
                            <h5 class="font-bold uppercase text-gray-600 text-sm">Informations de connexion</h5>
                        </div>
                        
                        <form id="createFullUserForm" class="p-8 space-y-6">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2 uppercase">Adresse Email</label>
                                    <input type="email" id="email" required placeholder="nom@silver-happy.fr"
                                           class="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500 outline-none transition">
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2 uppercase">Rôle Système</label>
                                    <select id="role" class="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500 outline-none transition cursor-pointer">
                                        <option value="senior">Senior</option>
                                        <option value="pro">Prestataire</option>
                                        <option value="admin">Administrateur</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label class="block text-sm font-bold text-gray-700 mb-2 uppercase">Mot de passe provisoire</label>
                                <input type="password" id="password" required
                                       class="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500 outline-none transition">
                            </div>

                            <div class="bg-green-50 p-4 rounded-lg border border-green-200 shadow-sm">
                                <label class="flex items-center space-x-3 cursor-pointer">
                                    <input type="checkbox" id="complete_profile" class="w-5 h-5 accent-green-600 cursor-pointer">
                                    <span class="text-sm font-bold text-green-800 uppercase">Remplir le profil immédiatement</span>
                                </label>
                            </div>

                            <div id="profileFields" class="hidden space-y-6 pt-6 border-t border-gray-100 animate-fade-in">
                                
                                <div id="commonFields" class="hidden space-y-6">
                                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label class="block text-sm font-bold text-gray-700 mb-2">Genre</label>
                                            <select id="genre" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500">
                                                <option value="homme">Homme</option>
                                                <option value="femme">Femme</option>
                                                <option value="autre">Autre</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label class="block text-sm font-bold text-gray-700 mb-2">Nom</label>
                                            <input type="text" id="nom" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500">
                                        </div>
                                        <div>
                                            <label class="block text-sm font-bold text-gray-700 mb-2">Prénom</label>
                                            <input type="text" id="prenom" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500">
                                        </div>
                                    </div>

                                    <div id="seniorOnlyFields" class="hidden grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label class="block text-sm font-bold text-gray-700 mb-2">Date de Naissance</label>
                                            <input type="date" id="date_naissance" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500">
                                        </div>
                                        <div>
                                            <label class="block text-sm font-bold text-gray-700 mb-2">Téléphone</label>
                                            <input type="tel" id="telephone" placeholder="06..." class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500">
                                        </div>
                                    </div>
                                </div>

                                <div id="proSpecificFields" class="hidden space-y-6">
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label class="block text-sm font-bold text-gray-700 mb-2">Nom de la Société</label>
                                            <input type="text" id="nom_societe" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500">
                                        </div>
                                        <div>
                                            <label class="block text-sm font-bold text-gray-700 mb-2">Genre (Contact)</label>
                                            <select id="genre_pro" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500">
                                                <option value="homme">Homme</option>
                                                <option value="femme">Femme</option>
                                                <option value="autre">Autre</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label class="block text-sm font-bold text-gray-700 mb-2">Téléphone Pro</label>
                                            <input type="tel" id="telephone_pro" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500">
                                        </div>
                                        <div>
                                            <label class="block text-sm font-bold text-gray-700 mb-2">N° SIRET</label>
                                            <input type="text" id="siret" maxlength="14" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500">
                                        </div>
                                    </div>
                                    <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
                                        <div>
                                            <label class="block text-sm font-bold text-gray-700 mb-2">RIB (IBAN)</label>
                                            <input type="text" id="rib" placeholder="FR76..." class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500">
                                        </div>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-bold text-gray-700 mb-2">Biographie / Description</label>
                                        <textarea id="bio" rows="4" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500" placeholder="Décrivez l'activité professionnelle..."></textarea>
                                    </div>
                                </div>
                            </div>

                            <div class="pt-6 border-t border-gray-100 flex justify-end">
                                <button type="submit" class="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-12 rounded-xl shadow-lg transform hover:-translate-y-1 transition duration-200 active:scale-95">
                                    <i class="fas fa-save mr-2"></i> Enregistrer l'utilisateur
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        const checkbox = document.getElementById('complete_profile');
        const profileContainer = document.getElementById('profileFields');
        const roleSelect = document.getElementById('role');
        
        const commonFields = document.getElementById('commonFields');
        const seniorOnly = document.getElementById('seniorOnlyFields');
        const proFields = document.getElementById('proSpecificFields');

        function updateUI() {
            profileContainer.classList.toggle('hidden', !checkbox.checked);

            if (checkbox.checked) {
                const role = roleSelect.value;
                
                // Reset
                commonFields.classList.add('hidden');
                seniorOnly.classList.add('hidden');
                proFields.classList.add('hidden');

                if (role === 'senior') {
                    commonFields.classList.remove('hidden');
                    seniorOnly.classList.remove('hidden');
                } else if (role === 'admin') {
                    commonFields.classList.remove('hidden');
                } else if (role === 'pro') {
                    proFields.classList.remove('hidden');
                }
            }
        }

        checkbox.addEventListener('change', updateUI);
        roleSelect.addEventListener('change', updateUI);
        
        // Init
        updateUI();
    </script>
    <script src="js/admin/create_users.js"></script>
</body>
</html>