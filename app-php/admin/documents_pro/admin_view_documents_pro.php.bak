<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy | Validation Documents</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body class="bg-gray-100 font-sans leading-normal tracking-normal">

    <div id="toastContainer" class="fixed top-5 left-1/2 transform -translate-x-1/2 -translate-y-20 opacity-0 z-[100] transition-all duration-300 pointer-events-none">
        <div class="bg-gray-900 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center space-x-3 border border-gray-700">
            <i id="toastIcon" class="fas fa-info-circle text-blue-400 text-xl"></i>
            <span id="toastMessage" class="font-semibold tracking-wide text-sm">Notification</span>
        </div>
    </div>

    <!-- Modal validation document -->
    <div id="modalValidDoc" class="fixed inset-0 bg-gray-900/70 backdrop-blur-sm hidden items-center justify-center z-50 opacity-0 transition-opacity duration-300">
        <div class="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl">
            <div class="text-center">
                <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 mb-4">
                    <i class="fas fa-check text-emerald-600 text-2xl"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900" id="modalValidDocTitle">Valider ce document ?</h3>
                <p class="text-gray-500 mt-2 text-sm" id="modalValidDocText">Cette action confirmera la validité du document.</p>
            </div>
            <div class="flex flex-col gap-3 mt-8">
                <button id="confirmValidDoc" class="w-full py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-semibold">Confirmer</button>
                <button id="cancelValidDoc" class="w-full py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-semibold">Annuler</button>
            </div>
        </div>
    </div>

    <!-- Modal refus document -->
    <div id="modalRefusDoc" class="fixed inset-0 bg-gray-900/70 backdrop-blur-sm hidden items-center justify-center z-50 opacity-0 transition-opacity duration-300">
        <div class="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl">
            <div class="text-center">
                <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                    <i class="fas fa-times text-red-600 text-2xl"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900">Refuser ce document ?</h3>
                <p class="text-gray-500 mt-2 text-sm">Le prestataire devra soumettre un nouveau document.</p>
            </div>
            <div class="flex flex-col gap-3 mt-8">
                <button id="confirmRefusDoc" class="w-full py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold">Confirmer</button>
                <button id="cancelRefusDoc" class="w-full py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-semibold">Annuler</button>
            </div>
        </div>
    </div>

    <!-- Modal validation dossier complet -->
    <div id="modalValidDossier" class="fixed inset-0 bg-gray-900/70 backdrop-blur-sm hidden items-center justify-center z-50 opacity-0 transition-opacity duration-300">
        <div class="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div class="text-center">
                <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 mb-4">
                    <i class="fas fa-folder-open text-emerald-600 text-2xl"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900">Valider le dossier complet ?</h3>
                <p class="text-gray-500 mt-2 text-sm">Le prestataire sera officiellement validé et pourra accéder à la plateforme. Cette action est importante.</p>
            </div>
            <div class="flex flex-col gap-3 mt-8">
                <button id="confirmValidDossier" class="w-full py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-semibold">Oui, valider le dossier</button>
                <button id="cancelValidDossier" class="w-full py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-semibold">Annuler</button>
            </div>
        </div>
    </div>

    <div class="flex flex-col md:flex-row min-h-screen">
        <?php include('../../include/sidebar.php'); ?>
        <div class="flex-1 bg-gray-100 mt-12 md:mt-0 pb-24 md:pb-5">
            <div class="bg-gray-800 pt-3">
                <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-6 shadow text-2xl text-white flex justify-between items-center">
                    <h3 class="font-bold pl-2 uppercase tracking-wide" id="pageTitle">Validation Documents</h3>
                    <a href="admin_documents_pro.php" class="text-sm font-normal italic text-gray-300 hover:text-white transition flex items-center gap-2">
                        <i class="fas fa-arrow-left"></i> Retour
                    </a>
                </div>
            </div>
            <div class="p-6 space-y-6 max-w-4xl mx-auto">

                <!-- Info pro -->
                <div id="proInfo" class="bg-white rounded-xl shadow border border-gray-200 p-5">
                    <div class="animate-pulse flex gap-3">
                        <div class="w-12 h-12 rounded-full bg-gray-200"></div>
                        <div class="flex-1 space-y-2 py-1">
                            <div class="h-3 bg-gray-200 rounded w-1/3"></div>
                            <div class="h-3 bg-gray-200 rounded w-1/4"></div>
                        </div>
                    </div>
                </div>

                <!-- Documents -->
                <div class="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
                    <div class="bg-gray-50 border-b border-gray-200 p-4">
                        <h5 class="font-bold uppercase text-gray-600 text-sm tracking-wider">
                            <i class="fas fa-folder mr-2 text-blue-500"></i>Documents soumis
                        </h5>
                    </div>
                    <div id="documentsList" class="divide-y divide-gray-100">
                        <div class="py-20 text-center text-gray-400">
                            <i class="fas fa-spinner fa-spin text-2xl mb-3 block text-blue-400"></i>
                            <span class="text-sm italic">Chargement...</span>
                        </div>
                    </div>
                </div>

                <!-- Bouton valider dossier -->
                <div class="flex justify-between items-center">
                    <span id="progressLabel" class="text-sm text-gray-500"></span>
                    <button id="btnValiderDossier" class="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-sm transition flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed" disabled>
                        <i class="fas fa-check-circle"></i> Valider le dossier complet
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script src="../../js/admin/documents_pro/view_documents_pro.js?v=<?php echo time(); ?>"></script>
</body>
</html>