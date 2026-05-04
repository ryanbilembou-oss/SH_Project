<?php
require_once('../../auth.php');

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy | Créer un Utilisateur</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body class="bg-gray-100 font-sans leading-normal tracking-normal">
    
    <div id="successToast" class="fixed top-5 left-1/2 transform -translate-x-1/2 -translate-y-full opacity-0 z-50 transition-all duration-500 ease-in-out">
        <div class="bg-green-600 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center space-x-3">
            <i class="fas fa-check-circle text-xl"></i>
            <span class="font-bold uppercase tracking-wide text-sm">Évenement créé avec succès !</span>
        </div>
    </div>

    <div class="flex flex-col md:flex-row">
        
        <?php include('../../include/sidebar.php'); ?>

        <div class="main-content flex-1 bg-gray-100 mt-12 md:mt-0 pb-24 md:pb-5">
            
            <div class="bg-gray-800 pt-3">
                <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-6 shadow text-2xl text-white flex justify-between items-center">
                    <h3 class="font-bold pl-2 uppercase tracking-wide">Nouvel Évenement</h3>
                    <a href="admin_evenement.php" class="text-sm font-normal italic text-gray-300 hover:text-white transition flex items-center gap-2">
                        <i class="fas fa-arrow-left"></i> Retour à la liste des évenements
                    </a>
                </div>
            </div>

            <div class="flex flex-wrap p-6 justify-center">
                <div class="w-full max-w-4xl">
                    <div class="bg-white border-transparent rounded-xl shadow-2xl overflow-hidden border border-gray-200 p-8">
                      <form id="createFullEvenementForm" class="space-y-8">
                        <div>
                            <h4 class="text-lg font-bold text-gray-700 border-b pb-2 mb-6">
                                <i class="fas fa-calendar-plus text-[#7CABD3] mr-2"></i> Informations de l'événement
                            </h4>
                            
                            <div class="flex p-4 gap-20">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Titre de l'événement</label>
                                    <input type="text" id="titre" required placeholder="Ex: Atelier Mémoire & Jeux de société" class="w-full px-6 py-2 border rounded-lg focus:ring-2 focus:ring-[#7CABD3] outline-none transition-all">
                                    <p id="error-titre" class="text-red-500 text-xs mt-1 hidden font-bold italic"></p>

                                </div>
                                <div class="flex p-2 gap-10">
                                    <div>
                                        <label class="block text-sm font-f text-gray-700 mb-1">
                                            <i class="fas fa-tag mr-1 text-purple-400"></i> Catégorie
                                            <button onclick="@" id="add_categorie_evenement" class="fas fa-plus-circle mr-2 text-green-400">
                                                

                                            </button>

                                        </label>
                                        <select id="id_categorie"class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition bg-white">
                                            <option value="">Chargement...</option>
                                        </select>




                                    </div>

                                </div>

                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                                
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                    <input type="date" id="date" required class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7CABD3] outline-none transition-all cursor-pointer">
                                    <p id="error-date" class="text-red-500 text-xs mt-1 hidden font-bold italic"></p>
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Heure</label>
                                    <input type="time" id="heure" required class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7CABD3] outline-none transition-all cursor-pointer">
                                    <p id="error-heure" class="text-red-500 text-xs mt-1 hidden font-bold italic"></p>
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Lieu</label>
                                    <input type="text" id="lieu" required placeholder="Ex: Salle Polyvalente Paris 11" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7CABD3] outline-none bg-white transition-all">
                                    <p id="error-lieu" class="text-red-500 text-xs mt-1 hidden font-bold italic"></p>
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Nombre de places (max)</label>
                                    <input type="number" id="nb_places_max" min="1" required placeholder="Ex: 50" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7CABD3] outline-none bg-white transition-all">
                                    <p id="error-nb_places_max" class="text-red-500 text-xs mt-1 hidden font-bold italic"></p>
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Prix du ticket (€)</label>
                                    <input type="number" id="prix_ticket" step="0.01" min="0" required placeholder="Ex: 15.50" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7CABD3] outline-none bg-white transition-all">
                                    <p id="error-prix_ticket" class="text-red-500 text-xs mt-1 hidden font-bold italic"></p>
                                </div>
                                
                            </div>
                        </div>
                            <div class="flex justify-end pt-6 border-t">
                                <button type="submit" class="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg flex items-center">
                                    <i class="fas fa-save mr-2"></i> Créer l'evenement
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </div>    
    <script src ="../../js/admin/evenement/admin_create_evenement.js?v=2"></script>

</body>
</html>