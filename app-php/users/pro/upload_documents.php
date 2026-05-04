<?php


require_once('../../auth.php');

echo $_SESSION['id_user'] ;
echo $_SESSION['role'] ;
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy - Validation de dossier</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:wght@400;700;900&display=swap" rel="stylesheet">

    <style>
        body { font-family: 'Fira Sans Condensed', sans-serif; background-color: #FFFFF6; font-size: 18px; }
    </style>
</head>
<body class="bg-[#FFFFF6] min-h-screen">

    <?php include('../include/navbar.php'); ?>

    <main class="container mx-auto max-w-3xl px-4 py-12">


        <div class="text-center mb-10">
            <iconify-icon icon="mdi:folder-account" class="text-6xl text-[#7CABD3] mb-4 block"></iconify-icon>
            <h2 class="text-5xl font-fira uppercase tracking-tighter text-[#1A2B49]">
                Validation de <span class="text-[#7CABD3]">dossier</span>
            </h2>
            <p class="text-gray-400 mt-2 text-lg" id="sousTitre">
                Chargement de vos documents requis...
            </p>
        </div>

    
        <div id="bandeauStatut" class="hidden mb-8 p-5 rounded-[30px] border-2 border-dashed text-center font-fira text-lg"></div>

  
        <div id="listeDocs" class="space-y-5"></div>

    </main>

    <?php include('../include/footer.php'); ?>

    <script src="/js/users/pro/upload_documents.js?v=<?php echo time(); ?>"></script>
</body>
</html>