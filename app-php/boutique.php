<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy - La Boutique Confiance</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #FFFFF6; }
    </style>
</head>
<body class="min-h-screen p-8"> 
    
    <header class="max-w-6xl mx-auto mb-12 flex justify-between items-center bg-white p-6 rounded-3xl shadow-md border border-gray-100">
        <div>
            <h1 class="text-4xl font-black text-[#1A2B49] uppercase tracking-tighter text-5xl">Boutique</h1>
            <p class="text-xl text-gray-400 mt-2 font-medium italic">Des articles sélectionnés avec soin pour votre quotidien.</p>
        </div>

        <a href="panier.php" id="btnPanier" class="flex items-center gap-4 bg-[#1A2B49] text-white px-8 py-4 rounded-2xl hover:bg-[#7CABD3] transition-all shadow-lg hover:scale-105 active:scale-95">
            <span class="text-2xl font-bold">Mon Panier</span>
            <span id="compteurPanier" class="bg-[#16a34a] text-white text-xl font-black px-4 py-1 rounded-full min-w-[45px] text-center">
                0
            </span>
        </a>
    </header>

    <div class="max-w-6xl mx-auto mb-10">
        <input type="text" id="barreRecherche" placeholder="Rechercher un produit (ex: téléphone, loupe...)" 
               class="w-full px-8 py-6 text-2xl bg-white border-4 border-gray-100 focus:border-[#7CABD3] rounded-3xl outline-none transition-all shadow-sm placeholder:text-gray-400">
    </div>

    <main class="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        
        <div class="produit-item flex items-center justify-between p-8 border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <div class="flex items-center gap-6">
                <div>
                    <h2 class="text-2xl font-bold text-[#1A2B49]">Téléphone grosses touches</h2>
                    <p class="text-gray-500 text-lg">Volume amplifié et touches photos.</p>
                </div>
            </div>
            <div class="flex items-center gap-8">
                <span class="text-3xl font-black text-[#16a34a]">49.99 €</span>
                <button class="btn-ajouter bg-[#7CABD3] text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-[#1A2B49] transition-colors" 
                        data-id="1" data-nom="Téléphone grosses touches" data-prix="49.99">
                    Ajouter
                </button>
            </div>
        </div>

        <div class="produit-item flex items-center justify-between p-8 border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <div class="flex items-center gap-6">
                <div>
                    <h2 class="text-2xl font-bold text-[#1A2B49]">Pilulier électronique</h2>
                    <p class="text-gray-500 text-lg">Alerte vocale pour les médicaments.</p>
                </div>
            </div>
            <div class="flex items-center gap-8">
                <span class="text-3xl font-black text-[#16a34a]">24.50 €</span>
                <button class="btn-ajouter bg-[#7CABD3] text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-[#1A2B49] transition-colors" 
                        data-id="2" data-nom="Pilulier électronique" data-prix="24.50">
                    Ajouter
                </button>
            </div>
        </div>

        <div class="produit-item flex items-center justify-between p-8 hover:bg-gray-50 transition-colors">
            <div class="flex items-center gap-6">
                <div>
                    <h2 class="text-2xl font-bold text-[#1A2B49]">Canne ergonomique</h2>
                    <p class="text-gray-500 text-lg">Légère avec embout antidérapant.</p>
                </div>
            </div>
            <div class="flex items-center gap-8">
                <span class="text-3xl font-black text-[#16a34a]">19.90 €</span>
                <button class="btn-ajouter bg-[#7CABD3] text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-[#1A2B49] transition-colors" 
                        data-id="3" data-nom="Canne ergonomique" data-prix="19.90">
                    Ajouter
                </button>
            </div>
        </div>

    </main>

    <script src="js/boutique.js"></script>
    <script src="js/boutique/recherche.js"></script>
</body>
</html>