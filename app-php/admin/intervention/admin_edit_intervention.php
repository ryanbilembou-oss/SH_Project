<?php
require_once('../../auth.php');

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy | Modifier Intervention</title>
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
        <?php include('../../include/sidebar.php'); ?>
        <div class="flex-1 bg-gray-100 mt-12 md:mt-0 pb-24 md:pb-5">
            <div class="bg-gray-800 pt-3">
                <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-6 shadow text-2xl text-white flex justify-between items-center">
                    <h3 class="font-bold pl-2 uppercase tracking-wide">Modifier une Intervention</h3>
                    <a href="admin_intervention.php" class="text-sm font-normal italic text-gray-300 hover:text-white transition flex items-center gap-2">
                        <i class="fas fa-arrow-left"></i> Retour à la liste
                    </a>
                </div>
            </div>
            <div class="flex flex-wrap p-6">
                <div class="w-full max-w-4xl mx-auto">
                    <div class="bg-white rounded-xl shadow-2xl border border-gray-200">
                        <div class="bg-gray-50 border-b border-gray-200 p-4">
                            <h5 class="font-bold uppercase text-gray-600 italic">
                                <i class="fas fa-hand-holding-heart mr-2 text-cyan-500"></i>Modifier l'intervention
                            </h5>
                        </div>
                        <div class="p-6">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-1"><i class="fas fa-briefcase mr-1 text-yellow-400"></i> Prestataire</label>
                                    <select id="id_pro" class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition bg-white">
                                        <option value="">Chargement...</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-1"><i class="fas fa-user-clock mr-1 text-blue-400"></i> Senior</label>
                                    <select id="id_senior" class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition bg-white">
                                        <option value="">Chargement...</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-1"><i class="fas fa-tasks mr-1 text-pink-400"></i> Service</label>
                                    <select id="id_service" class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition bg-white">
                                        <option value="">Chargement...</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-1"><i class="fas fa-flag mr-1 text-yellow-400"></i> Statut</label>
                                    <select id="statut" class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition bg-white">
                                        <option value="planifiee">Planifiée</option>
                                        <option value="en_cours">En cours</option>
                                        <option value="terminee">Terminée</option>
                                        <option value="annulee">Annulée</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-1"><i class="fas fa-calendar-alt mr-1 text-cyan-400"></i> Date début</label>
                                    <input type="datetime-local" id="date_heure_debut" class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition">
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-1"><i class="fas fa-calendar-check mr-1 text-cyan-400"></i> Date fin</label>
                                    <input type="datetime-local" id="date_heure_fin" class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition">
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-1"><i class="fas fa-euro-sign mr-1 text-emerald-400"></i> Prix (€)</label>
                                    <input type="number" id="prix" min="0" step="0.01" class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition">
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-1"><i class="fas fa-percent mr-1 text-gray-400"></i> Commission (€)</label>
                                    <input type="number" id="commission_montant" min="0" step="0.01" class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition">
                                </div>
                                <div class="md:col-span-2">
                                    <label class="block text-sm font-bold text-gray-700 mb-1"><i class="fas fa-map-marker-alt mr-1 text-red-400"></i> Lieu</label>
                                    <input type="text" id="lieu" class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition">
                                </div>
                                <div class="md:col-span-2">
                                    <label class="block text-sm font-bold text-gray-700 mb-1"><i class="fas fa-align-left mr-1 text-gray-400"></i> Description</label>
                                    <textarea id="bio_intervention" rows="3" class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"></textarea>
                                </div>
                                <div class="flex items-center gap-3">
                                    <input type="checkbox" id="est_medical" class="w-4 h-4 text-blue-600 rounded">
                                    <label class="text-sm font-bold text-gray-700"><i class="fas fa-heartbeat mr-1 text-red-400"></i> Intervention médicale</label>
                                </div>
                            </div>
                            <div class="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
                                <a href="admin_intervention.php" class="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-semibold text-sm">Annuler</a>
                                <button type="button" id="submitBtn" class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-semibold text-sm shadow flex items-center gap-2">
                                    <i class="fas fa-save"></i> Enregistrer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="../../js/admin/intervention/edit_intervention.js?v=<?php echo time(); ?>"></script>
</body>
</html>