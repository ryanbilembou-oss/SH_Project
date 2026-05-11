<?php require_once('../auth.php'); ?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy | Supervision Messagerie</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body class="bg-gray-100 font-sans">
    <div class="flex flex-col md:flex-row min-h-screen">
        <?php include('../include/sidebar.php'); ?>
        <main class="flex-1 bg-gray-50 mt-12 md:mt-0 pb-10">
            <header class="bg-gray-800 pt-3">
                <div class="bg-gradient-to-r from-blue-900 to-gray-800 p-6 shadow-md text-white rounded-tl-3xl">
                    <h1 class="text-2xl font-bold uppercase tracking-wide">Supervision Messagerie</h1>
                    <p class="text-gray-400 text-sm mt-1">Metadonnees uniquement — conformite RGPD</p>
                </div>
            </header>
            <section class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" id="statsGrid">
                    <div class="bg-white rounded-xl shadow p-6 text-center">
                        <i class="fas fa-comments text-3xl text-blue-400 mb-2"></i>
                        <p class="text-3xl font-bold text-gray-800" id="statTotalMessages">—</p>
                        <p class="text-gray-500 text-sm uppercase tracking-wide mt-1">Messages total</p>
                    </div>
                    <div class="bg-white rounded-xl shadow p-6 text-center">
                        <i class="fas fa-users text-3xl text-green-400 mb-2"></i>
                        <p class="text-3xl font-bold text-gray-800" id="statConversations">—</p>
                        <p class="text-gray-500 text-sm uppercase tracking-wide mt-1">Conversations actives</p>
                    </div>
                    <div class="bg-white rounded-xl shadow p-6 text-center">
                        <i class="fas fa-flag text-3xl text-red-400 mb-2"></i>
                        <p class="text-3xl font-bold text-gray-800" id="statSignalements">0</p>
                        <p class="text-gray-500 text-sm uppercase tracking-wide mt-1">Signalements</p>
                    </div>
                </div>

                <div class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                    <div class="bg-gray-50 border-b border-gray-200 p-4 flex justify-between items-center">
                        <h2 class="font-bold text-gray-600 uppercase text-sm tracking-wider">
                            <i class="fas fa-chart-bar mr-2 text-blue-400"></i>Activite des conversations
                        </h2>
                        <div class="flex gap-3">
                            <select id="filtreRole" onchange="filtrerConversations()" class="border rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                                <option value="tous">Tous les roles</option>
                                <option value="senior">Senior</option>
                                <option value="pro">Prestataire</option>
                            </select>
                            <input type="text" id="searchInput" placeholder="Rechercher..." class="border rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none w-48">
                        </div>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="bg-gray-800 text-gray-100 uppercase text-xs tracking-wide">
                                    <th class="p-4">Utilisateur A</th>
                                    <th class="p-4">Role</th>
                                    <th class="p-4">Utilisateur B</th>
                                    <th class="p-4">Role</th>
                                    <th class="p-4 text-center">Nb messages</th>
                                    <th class="p-4 text-center">Non lus</th>
                                    <th class="p-4 text-center">Dernier message</th>
                                    <th class="p-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody id="convTableBody" class="divide-y divide-gray-100">
                                <tr><td colspan="8" class="py-20 text-center text-gray-400 italic">Chargement...</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </main>
    </div>

    <div id="modalSignalement" class="fixed inset-0 bg-gray-900/70 hidden items-center justify-center z-50">
        <div class="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl mx-4">
            <h3 class="text-xl font-bold text-gray-900 mb-4">Signaler cette conversation</h3>
            <p class="text-gray-500 text-sm mb-4">Indiquez la raison du signalement. Cela alertera l'equipe de moderation.</p>
            <textarea id="signalementRaison" rows="3" placeholder="Raison du signalement..."
                class="w-full border rounded-lg px-3 py-2 text-sm resize-none focus:ring-2 focus:ring-red-500 outline-none mb-4"></textarea>
            <div class="flex justify-end gap-3">
                <button onclick="fermerModalSignalement()" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm">Annuler</button>
                <button onclick="confirmerSignalement()" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-bold">Signaler</button>
            </div>
        </div>
    </div>
    <div id="modalConv" class="fixed inset-0 bg-gray-900/70 hidden items-center justify-center z-50">
    <div class="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col mx-4" style="max-height: 85vh;">
        <div class="flex justify-between items-center p-6 border-b border-gray-200">
            <h3 class="text-xl font-bold text-gray-900" id="modalConvTitre">Conversation Support</h3>
            <button onclick="fermerConversationSupport()" class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                <i class="fas fa-times text-gray-500"></i>
            </button>
        </div>
        <div id="modalConvMessages" class="flex-1 overflow-y-auto p-6"></div>
        <div class="p-4 border-t border-gray-200 flex gap-3">
            <input type="text" id="modalConvInput" placeholder="Votre reponse..."
                onkeydown="if(event.key==='Enter') envoyerReponseSupport()"
                class="flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
            <button onclick="envoyerReponseSupport()" class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                <i class="fas fa-paper-plane"></i>
            </button>
        </div>
    </div>
</div>

    <script src="../js/admin/admin_messagerie.js?v=<?php echo time(); ?>"></script>
</body>
</html>