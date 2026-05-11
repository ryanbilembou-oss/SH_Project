<?php
require_once('../../auth.php');

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy | Upload Documents Prestataire</title>
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
                    <h3 class="font-bold pl-2 uppercase tracking-wide">Documents Prestataire</h3>
                    <a href="../admin_users.php" class="text-sm font-normal italic text-gray-300 hover:text-white transition flex items-center gap-2">
                        <i class="fas fa-arrow-left"></i> Retour
                    </a>
                </div>
            </div>
            <div class="flex flex-wrap p-6">
                <div class="w-full max-w-3xl mx-auto space-y-6">

                    
                    <div class="bg-white rounded-xl shadow border border-gray-200 p-5" id="proInfo">
                        <div class="animate-pulse flex gap-3">
                            <div class="w-10 h-10 rounded-full bg-gray-200"></div>
                            <div class="flex-1 space-y-2 py-1">
                                <div class="h-3 bg-gray-200 rounded w-1/3"></div>
                                <div class="h-3 bg-gray-200 rounded w-1/4"></div>
                            </div>
                        </div>
                    </div>

                    
                    <div class="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
                        <div class="bg-gray-50 border-b border-gray-200 p-4">
                            <h5 class="font-bold uppercase text-gray-600 text-sm tracking-wider">
                                <i class="fas fa-folder-open mr-2 text-blue-500"></i>Documents obligatoires
                            </h5>
                        </div>
                        <div id="documentsList" class="p-4 space-y-4">
                            <div class="text-center py-10 text-gray-400">
                                <i class="fas fa-spinner fa-spin text-2xl mb-2 block"></i>
                                <span class="text-sm italic">Chargement...</span>
                            </div>
                        </div>
                    </div>

                    
                    <div class="flex justify-between items-center">
                        <span id="progressLabel" class="text-sm text-gray-500 italic"></span>
                        <button id="btnValiderDossier" class="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-sm transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                            <i class="fas fa-check-circle"></i> Valider le dossier
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="../../js/admin/profile/upload_documents_pro.js?v=<?php echo time(); ?>"></script>
</body>
</html>