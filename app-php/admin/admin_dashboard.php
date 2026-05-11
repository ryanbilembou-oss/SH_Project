<?php
require_once('../auth.php');

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy - Dashboard Admin</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:wght@400;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="icon" href="/img/logo-clear.png">
    <style>
        body { font-family: 'Fira Sans Condensed', sans-serif; background-color: #f4f6f9; }
        .kpi-card { transition: all .2s; }
        .kpi-card:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,0,0,.12); }
    </style>
</head>
<body class="bg-gray-100 min-h-screen flex">

    <?php include('../include/sidebar.php'); ?>

    <main class="flex-1 ml-0 md:ml-64 p-6 overflow-y-auto">
 
        <div class="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
                <h1 class="text-4xl font-fira uppercase tracking-tighter text-gray-800">
                    Dashboard <span class="text-blue-500">Silver Happy</span>
                </h1>
                <p class="text-gray-400 text-sm mt-1" id="dateAujourdhui"></p>
            </div>
            <div class="flex items-center gap-3">
                <label class="text-gray-500 text-sm font-fira uppercase">Période :</label>
                <select id="filtrePeriode" onchange="appliquerFiltre()"
                    class="px-4 py-2 rounded-xl border-2 border-gray-200 bg-white font-fira text-gray-700 focus:outline-none focus:border-blue-400">
                    <option value="tout">Tout</option>
                    <option value="today">Aujourd'hui</option>
                    <option value="week">Cette semaine</option>
                    <option value="month" selected>Ce mois</option>
                    <option value="semester">Ce semestre</option>
                    <option value="year">Cette année</option>
                </select>
            </div>
        </div>
 
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div class="kpi-card bg-white rounded-2xl p-5 shadow-sm border-l-4 border-blue-500">
                <p class="text-gray-400 text-xs uppercase tracking-widest mb-1">Utilisateurs</p>
                <p class="text-3xl font-fira text-gray-800" id="kpiUsers">—</p>
                <p class="text-xs text-gray-400 mt-1" id="kpiUsersSub">—</p>
            </div>
            <div class="kpi-card bg-white rounded-2xl p-5 shadow-sm border-l-4 border-green-500">
                <p class="text-gray-400 text-xs uppercase tracking-widest mb-1">Interventions</p>
                <p class="text-3xl font-fira text-gray-800" id="kpiInterventions">—</p>
                <p class="text-xs text-gray-400 mt-1" id="kpiInterSub">—</p>
            </div>
            <div class="kpi-card bg-white rounded-2xl p-5 shadow-sm border-l-4 border-yellow-500">
                <p class="text-gray-400 text-xs uppercase tracking-widest mb-1">Abonnements actifs</p>
                <p class="text-3xl font-fira text-gray-800" id="kpiAbonnements">—</p>
                <p class="text-xs text-gray-400 mt-1" id="kpiAboSub">—</p>
            </div>
            <div class="kpi-card bg-white rounded-2xl p-5 shadow-sm border-l-4 border-purple-500">
                <p class="text-gray-400 text-xs uppercase tracking-widest mb-1">CA Total</p>
                <p class="text-3xl font-fira text-gray-800" id="kpiCA">—</p>
                <p class="text-xs text-gray-400 mt-1" id="kpiCASub">—</p>
            </div>
        </div>
 
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div class="kpi-card bg-gray-800 text-white rounded-2xl p-6 text-center shadow-lg">
                <iconify-icon icon="mdi:chart-line" class="text-4xl text-blue-400 mb-2 block"></iconify-icon>
                <p class="text-3xl font-fira" id="caTotal">—</p>
                <p class="text-xs uppercase tracking-widest opacity-60 mt-1">CA Total TTC</p>
            </div>
            <div class="kpi-card bg-white rounded-2xl p-6 text-center shadow-sm border-t-4 border-cyan-400">
                <iconify-icon icon="mdi:hand-coin" class="text-3xl text-cyan-400 mb-2 block"></iconify-icon>
                <p class="text-2xl font-fira text-gray-800" id="caCommissions">—</p>
                <p class="text-xs text-gray-400 uppercase tracking-widest mt-1">Commissions SH (interventions)</p>
            </div>
            <div class="kpi-card bg-white rounded-2xl p-6 text-center shadow-sm border-t-4 border-green-400">
                <iconify-icon icon="mdi:bank" class="text-3xl text-green-400 mb-2 block"></iconify-icon>
                <p class="text-2xl font-fira text-green-600" id="beneficeNet">—</p>
                <p class="text-xs text-gray-400 uppercase tracking-widest mt-1">Bénéfice net SH</p>
                <p class="text-xs text-gray-300 mt-0.5">(commissions + abonnements)</p>
            </div>
        </div>
 
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="bg-white rounded-2xl shadow-sm p-6">
                <h3 class="font-fira uppercase text-gray-700 text-lg mb-5 flex items-center gap-2">
                    <iconify-icon icon="mdi:chart-pie" class="text-blue-500"></iconify-icon>
                    Revenus par source
                </h3>
                <div class="space-y-3" id="revenusParSource">
                    <p class="text-gray-400 italic text-sm">Chargement...</p>
                </div>
            </div>

            <div class="bg-white rounded-2xl shadow-sm p-6">
                <h3 class="font-fira uppercase text-gray-700 text-lg mb-5 flex items-center gap-2">
                    <iconify-icon icon="mdi:account-star" class="text-purple-500"></iconify-icon>
                    Top prestataires
                </h3>
                <div class="space-y-3" id="topPrestataires">
                    <p class="text-gray-400 italic text-sm">Chargement...</p>
                </div>
            </div>
        </div>
        <div class="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h3 class="font-fira uppercase text-gray-700 text-lg mb-5 flex items-center gap-2">
                <iconify-icon icon="mdi:credit-card" class="text-yellow-500"></iconify-icon>
                Abonnements
            </h3>
            <div class="grid grid-cols-2 md:grid-cols-5 gap-4" id="abonnementsDetail">
                <p class="text-gray-400 italic text-sm col-span-5">Chargement...</p>
            </div>
        </div>
  
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
 
            <div class="bg-white rounded-2xl shadow-sm p-6">
                <div class="flex items-center justify-between mb-5 flex-wrap gap-3">
                    <h3 class="font-fira uppercase text-gray-700 text-lg flex items-center gap-2">
                        <iconify-icon icon="mdi:calendar-check" class="text-green-500"></iconify-icon>
                        Interventions
                    </h3>
                    <select id="filtreInterStatut" onchange="renderInterventionsRecentes()"
                        class="text-xs px-3 py-1.5 rounded-xl border border-gray-200 font-fira text-gray-600 focus:outline-none">
                        <option value="tous">Tous statuts</option>
                        <option value="planifiee">Planifiées</option>
                        <option value="en_cours">En cours</option>
                        <option value="terminee">Terminées</option>
                        <option value="annulee">Annulées</option>
                    </select>
                </div>
                <div class="space-y-2" id="interventionsRecentes">
                    <p class="text-gray-400 italic text-sm">Chargement...</p>
                </div>
                <a href="/admin/intervention/admin_intervention.php"
                   class="mt-4 block text-center text-sm text-blue-500 hover:underline font-fira uppercase">Voir toutes →</a>
            </div>
 
            <div class="bg-white rounded-2xl shadow-sm p-6">
                <div class="flex items-center justify-between mb-5 flex-wrap gap-3">
                    <h3 class="font-fira uppercase text-gray-700 text-lg flex items-center gap-2">
                        <iconify-icon icon="mdi:account-plus" class="text-blue-500"></iconify-icon>
                        Derniers inscrits
                    </h3>
                    <select id="filtreUserRole" onchange="renderDerniersInscrits()"
                        class="text-xs px-3 py-1.5 rounded-xl border border-gray-200 font-fira text-gray-600 focus:outline-none">
                        <option value="tous">Tous rôles</option>
                        <option value="senior">Seniors</option>
                        <option value="pro">Pros</option>
                    </select>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm">
                        <thead>
                            <tr class="border-b border-gray-100">
                                <th class="text-left py-2 px-2 text-gray-400 font-fira uppercase text-xs">Email</th>
                                <th class="text-left py-2 px-2 text-gray-400 font-fira uppercase text-xs">Rôle</th>
                                <th class="text-left py-2 px-2 text-gray-400 font-fira uppercase text-xs">Abo</th>
                            </tr>
                        </thead>
                        <tbody id="derniersInscrits" class="divide-y divide-gray-50">
                            <tr><td colspan="3" class="text-center py-4 text-gray-400 italic">Chargement...</td></tr>
                        </tbody>
                    </table>
                </div>
                <a href="/admin/admin_users.php"
                   class="mt-4 block text-center text-sm text-blue-500 hover:underline font-fira uppercase">Voir tous →</a>
            </div>
        </div>
 
        <div class="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div class="flex items-center justify-between mb-5 flex-wrap gap-3">
                <h3 class="font-fira uppercase text-gray-700 text-lg flex items-center gap-2">
                    <iconify-icon icon="mdi:receipt" class="text-indigo-500"></iconify-icon>
                    Factures par type
                </h3>
                <select id="filtreFactureType" onchange="renderFacturesParType()"
                    class="text-xs px-3 py-1.5 rounded-xl border border-gray-200 font-fira text-gray-600 focus:outline-none">
                    <option value="tous">Tous types</option>
                    <option value="intervention">Interventions</option>
                    <option value="abonnement">Abonnements</option>
                    <option value="article">Articles</option>
                    <option value="evenement">Événements</option>
                    <option value="panier">Paniers</option>
                </select>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-sm">
                    <thead>
                        <tr class="border-b border-gray-100">
                            <th class="text-left py-3 px-4 text-gray-400 font-fira uppercase text-xs">Type</th>
                            <th class="text-right py-3 px-4 text-gray-400 font-fira uppercase text-xs">Nb</th>
                            <th class="text-right py-3 px-4 text-gray-400 font-fira uppercase text-xs">Total TTC</th>
                            <th class="text-right py-3 px-4 text-gray-400 font-fira uppercase text-xs">Commission SH</th>
                            <th class="text-right py-3 px-4 text-gray-400 font-fira uppercase text-xs">Gain net pro</th>
                        </tr>
                    </thead>
                    <tbody id="facturesParType" class="divide-y divide-gray-50"></tbody>
                    <tfoot id="facturesTotal"></tfoot>
                </table>
            </div>
        </div>

    </main>

    <script src="/js/admin/admin_dashboard.js?v=<?php echo time(); ?>"></script>
</body>
</html>