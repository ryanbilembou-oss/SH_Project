<?php
require_once('../../auth.php');

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy | Voir Intervention</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body class="bg-gray-100 font-sans leading-normal tracking-normal">
    <div class="flex flex-col md:flex-row min-h-screen">
        <?php include('../../include/sidebar.php'); ?>
        <div class="flex-1 bg-gray-100 mt-12 md:mt-0 pb-24 md:pb-5">
            <div class="bg-gray-800 pt-3">
                <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-6 shadow text-2xl text-white flex justify-between items-center">
                    <h3 class="font-bold pl-2 uppercase tracking-wide">Détail Intervention</h3>
                    <a href="admin_intervention.php" class="text-sm font-normal italic text-gray-300 hover:text-white transition flex items-center gap-2">
                        <i class="fas fa-arrow-left"></i> Retour à la liste
                    </a>
                </div>
            </div>
            <div class="flex flex-wrap p-6">
                <div class="w-full max-w-4xl mx-auto" id="interventionContainer">
                    <div class="py-20 text-center text-gray-400">
                        <i class="fas fa-spinner fa-spin text-2xl mb-3 block text-blue-400"></i>
                        <span class="text-sm italic">Chargement...</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="../../js/admin/intervention/view_intervention.js?v=<?php echo time(); ?>"></script>
</body>
</html>