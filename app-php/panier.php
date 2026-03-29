<?php 
session_start(); 

if (!isset($_SESSION['utilisateur_connecte'])) {
    header("Location: users/login.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mon Panier - Silver Happy</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #FFFFF6; }
    </style>
</head>
<body class="min-h-screen p-4 md:p-10">

    <div class="max-w-3xl mx-auto bg-white p-6 md:p-10 rounded-[2rem] shadow-2xl border border-gray-100">
        
        <div class="flex justify-between items-center mb-8">
            <h1 class="text-4xl font-black text-[#1A2B49] tracking-tight">Votre panier</h1>
            <button id="btn-vider" class="text-sm text-red-400 hover:text-red-600 font-medium transition-colors">
                 Vider le panier
            </button>
        </div>

        <div id="liste-panier" class="space-y-6 min-h-[200px]">
            <div class="flex flex-col items-center justify-center py-10">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7CABD3] mb-4"></div>
                <p class="text-gray-400 italic">Préparation de votre commande...</p>
            </div>
        </div>

        <div class="mt-10 pt-6 border-t-4 border-gray-50">
            <div class="flex justify-between items-center">
                <span class="text-xl text-gray-400 font-medium">Total à régler</span>
                <span id="total-prix" class="text-4xl font-black text-[#16a34a]">0.00 €</span>
            </div>
        </div>

        <div class="mt-12 flex flex-col md:flex-row gap-6 items-center">
            <a href="boutique.php" class="text-[#7CABD3] font-bold hover:text-[#1A2B49] transition-colors flex items-center gap-2">
                ← Continuer mes achats
            </a>
            
            <button id="btn-payer" class="w-full md:w-auto md:ml-auto bg-[#4E9F64] text-white px-12 py-4 rounded-2xl font-black text-xl shadow-lg hover:bg-[#3d7d4f] hover:scale-105 active:scale-95 transition-all">
                Payer la commande
            </button>
        </div>
    </div>

    <p class="text-center text-gray-300 mt-8 text-sm">Paiement 100% sécurisé pour nos aînés</p>
    <script src="js/panier.js"></script>
</body>
</html>