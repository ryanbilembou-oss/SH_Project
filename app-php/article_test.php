<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy - Boutique & Articles</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="style.css">
    <link rel="icon" href="img/logo-clear.png" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  </head>
  <body class="font-sans bg-[#FFFFF6]">
    
    <nav class="bg-white px-6 pt-4 shadow-sm border-b-2 border-[#FCE297] sticky top-0 z-50">
      <div class="container mx-auto flex flex-col gap-4">
        <div class="flex justify-between items-center w-full">
          <img src="img/logo.png" alt="Logo Silver Happy" class="h-14" />
          <div class="flex items-center space-x-6 group">
            <a href="users/login.php" class="bg-[#7CABD3] text-white border-2 border-[#7CABD3] px-6 py-2 rounded-full font-black uppercase text-xs shadow-sm transition-all duration-300 hover:bg-transparent hover:text-[#7CABD3]">
              Connexion
            </a>
            <span class="h-5 w-[2px] bg-gray-300"></span>
            <a href="panier.php" class="relative text-[#1A2B49] hover:text-[#7CABD3] transition-colors">
              <i class="fas fa-shopping-cart text-xl"></i>
              <span class="absolute -top-2 -right-2 bg-[#FCE297] text-[#1A2B49] text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full">2</span>
            </a>
          </div>
        </div>
        <div class="hidden md:flex justify-center space-x-12 font-bold uppercase text-xs tracking-widest pb-4">
          <a href="index.php" class="hover:text-[#7CABD3] pb-2 border-b-2 border-transparent transition-all duration-300">Accueil</a>
          <a href="#" class="text-[#7CABD3] pb-2 border-b-2 border-[#FCE297] transition-all duration-300">Boutique</a>
          <a href="#services" class="hover:text-[#7CABD3] pb-2 border-b-2 border-transparent hover:border-[#FCE297] transition-all duration-300">Nos Services</a>
        </div>
      </div>
    </nav>

    <header class="bg-[#1A2B49] text-white py-12 px-6">
      <div class="container mx-auto max-w-6xl text-center">
        <h1 class="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">
          Notre <span class="text-[#FCE297]">Boutique</span>
        </h1>
        <p class="text-lg md:text-xl font-medium text-gray-300 max-w-2xl mx-auto">
          Découvrez notre sélection de produits spécialement adaptés pour votre confort quotidien et votre santé.
        </p>
      </div>
    </header>

    <main class="container mx-auto max-w-7xl px-6 py-12 flex flex-col md:flex-row gap-10">
      
      <aside class="w-full md:w-1/4">
        <div class="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 sticky top-40">
          <div class="flex items-center gap-2 mb-6 border-b-2 border-[#FCE297] pb-2">
            <i class="fas fa-filter text-[#7CABD3]"></i>
            <h3 class="font-black uppercase text-[#1A2B49] text-lg">Filtrer</h3>
          </div>

          <div class="mb-8">
            <h4 class="font-bold text-[#1A2B49] mb-4">Catégories</h4>
            <div class="space-y-3">
              <label class="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" class="w-5 h-5 rounded border-gray-300 text-[#7CABD3] focus:ring-[#7CABD3]" checked>
                <span class="text-gray-700 font-medium group-hover:text-[#7CABD3] transition-colors">Tous les produits</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" class="w-5 h-5 rounded border-gray-300 text-[#7CABD3] focus:ring-[#7CABD3]">
                <span class="text-gray-700 font-medium group-hover:text-[#7CABD3] transition-colors">Santé & Bien-être</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" class="w-5 h-5 rounded border-gray-300 text-[#7CABD3] focus:ring-[#7CABD3]">
                <span class="text-gray-700 font-medium group-hover:text-[#7CABD3] transition-colors">Domotique & Maison</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" class="w-5 h-5 rounded border-gray-300 text-[#7CABD3] focus:ring-[#7CABD3]">
                <span class="text-gray-700 font-medium group-hover:text-[#7CABD3] transition-colors">Loisirs & Jeux</span>
              </label>
            </div>
          </div>

          <div>
            <h4 class="font-bold text-[#1A2B49] mb-4">Prix maximum</h4>
            <input type="range" min="0" max="500" value="500" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#7CABD3]">
            <div class="flex justify-between text-sm text-gray-500 font-bold mt-2">
              <span>0 €</span>
              <span>500 €</span>
            </div>
          </div>
          
          <button class="w-full mt-8 bg-[#1A2B49] text-white py-3 rounded-full font-bold uppercase text-xs tracking-wider hover:bg-[#7CABD3] transition-colors">
            Appliquer les filtres
          </button>
        </div>
      </aside>

      <section class="w-full md:w-3/4">
        
        <div class="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <p class="text-gray-600 font-bold"><span class="text-[#1A2B49]">12</span> articles trouvés</p>
          <div class="flex items-center gap-3">
            <span class="text-sm font-bold text-gray-500 uppercase">Trier par :</span>
            <select class="bg-[#FFFFF6] border-2 border-[#FCE297] text-[#1A2B49] font-bold py-2 px-4 rounded-full focus:outline-none focus:border-[#7CABD3] cursor-pointer appearance-none">
              <option>Nouveautés</option>
              <option>Prix croissant</option>
              <option>Prix décroissant</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <article class="bg-white rounded-[30px] shadow-lg border-2 border-transparent hover:border-[#7CABD3] transition-all duration-300 overflow-hidden flex flex-col group relative">
            <div class="absolute top-4 left-4 bg-[#FCE297] text-[#1A2B49] text-[10px] font-black uppercase px-3 py-1 rounded-full z-10 shadow-sm">Nouveau</div>
            
            <div class="h-48 bg-gray-100 overflow-hidden flex justify-center items-center">
               <i class="fas fa-heartbeat text-6xl text-gray-300 group-hover:scale-110 transition-transform duration-500"></i>
            </div>
            
            <div class="p-6 flex flex-col flex-grow">
              <p class="text-xs text-[#7CABD3] font-black uppercase tracking-widest mb-2">Santé & Bien-être</p>
              <h3 class="text-xl font-bold text-[#1A2B49] mb-2 leading-tight">Tensiomètre Bras Automatique</h3>
              <p class="text-gray-500 text-sm mb-4 line-clamp-2">Simple d'utilisation avec un affichage très large, parfait pour le suivi quotidien.</p>
              
              <div class="mt-auto flex items-end justify-between">
                <div>
                  <p class="text-[10px] text-gray-400 uppercase font-bold mb-1">Prix Adhérent</p>
                  <p class="text-2xl font-black text-[#1A2B49]">45,00 €</p>
                </div>
                <button id="btn-acheter-42" class="bg-[#1A2B49] text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#7CABD3] hover:scale-110 transition-all shadow-md group/btn" onclick="acheterArticle(42)">
                  <i class="fas fa-shopping-cart group-hover/btn:hidden"></i>
                  <i class="fas fa-arrow-right hidden group-hover/btn:block"></i>
                </button>
              </div>
            </div>
          </article>

          <article class="bg-white rounded-[30px] shadow-lg border-2 border-transparent hover:border-[#FCE297] transition-all duration-300 overflow-hidden flex flex-col group relative">
            <div class="h-48 bg-gray-100 overflow-hidden flex justify-center items-center">
               <i class="fas fa-mobile-alt text-6xl text-gray-300 group-hover:scale-110 transition-transform duration-500"></i>
            </div>
            
            <div class="p-6 flex flex-col flex-grow">
              <p class="text-xs text-[#7CABD3] font-black uppercase tracking-widest mb-2">Domotique & Maison</p>
              <h3 class="text-xl font-bold text-[#1A2B49] mb-2 leading-tight">Téléphone Grosses Touches</h3>
              <p class="text-gray-500 text-sm mb-4 line-clamp-2">Volume amplifié et touches raccourcis avec photos pour vos proches.</p>
              
              <div class="mt-auto flex items-end justify-between">
                <div>
                  <p class="text-[10px] text-gray-400 uppercase font-bold mb-1">Prix Adhérent</p>
                  <p class="text-2xl font-black text-[#1A2B49]">39,99 €</p>
                </div>
                <button class="bg-[#1A2B49] text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#FCE297] hover:text-[#1A2B49] hover:scale-110 transition-all shadow-md group/btn" onclick="acheterArticle(43)">
                  <i class="fas fa-shopping-cart group-hover/btn:hidden"></i>
                  <i class="fas fa-arrow-right hidden group-hover/btn:block"></i>
                </button>
              </div>
            </div>
          </article>

          <article class="bg-white rounded-[30px] shadow-lg border-2 border-transparent hover:border-[#7CABD3] transition-all duration-300 overflow-hidden flex flex-col group relative">
            <div class="h-48 bg-gray-100 overflow-hidden flex justify-center items-center">
               <i class="fas fa-puzzle-piece text-6xl text-gray-300 group-hover:scale-110 transition-transform duration-500"></i>
            </div>
            
            <div class="p-6 flex flex-col flex-grow">
              <p class="text-xs text-[#7CABD3] font-black uppercase tracking-widest mb-2">Loisirs & Jeux</p>
              <h3 class="text-xl font-bold text-[#1A2B49] mb-2 leading-tight">Jeu de Scrabble Géant</h3>
              <p class="text-gray-500 text-sm mb-4 line-clamp-2">Plateau rotatif et lettres agrandies pour un confort visuel optimal.</p>
              
              <div class="mt-auto flex items-end justify-between">
                <div>
                  <p class="text-[10px] text-gray-400 uppercase font-bold mb-1">Prix Adhérent</p>
                  <p class="text-2xl font-black text-[#1A2B49]">55,00 €</p>
                </div>
                <button class="bg-[#1A2B49] text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#7CABD3] hover:scale-110 transition-all shadow-md group/btn" onclick="acheterArticle(44)">
                  <i class="fas fa-shopping-cart group-hover/btn:hidden"></i>
                  <i class="fas fa-arrow-right hidden group-hover/btn:block"></i>
                </button>
              </div>
            </div>
          </article>

        </div>

        <div class="mt-12 flex justify-center gap-2">
          <button class="w-10 h-10 rounded-full bg-white text-[#1A2B49] font-bold shadow-sm hover:bg-[#FCE297] transition-colors border border-gray-200">1</button>
          <button class="w-10 h-10 rounded-full bg-[#1A2B49] text-white font-bold shadow-md">2</button>
          <button class="w-10 h-10 rounded-full bg-white text-[#1A2B49] font-bold shadow-sm hover:bg-[#FCE297] transition-colors border border-gray-200">3</button>
        </div>

      </section>
    </main>

    <footer class="bg-[#1a2b49] text-[#fffff6] py-12 px-6 mt-12">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        <div class="space-y-4">
          <h4 class="text-2xl font-black text-[#fce297] uppercase tracking-wider">Silver Happy</h4>
          <p class="text-sm leading-relaxed opacity-90">
            Bien vivre après 60 ans. Société créée à Paris en 2018.<br>
            <span class="font-bold">Siège :</span> 244, rue du Faubourg Saint Antoine, 75011.
          </p>
          <div class="text-xs opacity-75">
            Agences : Nice, Rouen, Moldavie, et plus.
          </div>
        </div>

        <div class="space-y-4">
          <h4 class="text-xl font-bold border-b-2 border-[#7cabd3] pb-2 text-[#7cabd3]">Nos Services</h4>
          <ul class="space-y-2 text-md">
            <li><a href="/services" class="hover:text-[#fce297] transition-custom">Aide à domicile & Repas</a></li>
            <li><a href="/evenements" class="hover:text-[#fce297] transition-custom">Événements & Loisirs</a></li>
            <li><a href="/boutique" class="hover:text-[#fce297] font-bold">Boutique & Articles</a></li>
            <li><a href="/conseils" class="hover:text-[#fce297] transition-custom">Espace Conseils</a></li>
          </ul>
        </div>

        <div class="space-y-4">
          <h4 class="text-xl font-bold border-b-2 border-[#7cabd3] pb-2 text-[#7cabd3]">Espace Pro</h4>
          <ul class="space-y-2 text-md">
            <li><a href="/pro/devenir-prestataire" class="hover:text-[#fce297] transition-custom">Devenir Prestataire</a></li>
            <li><a href="/pro/documents" class="hover:text-[#fce297] transition-custom">Dépôt d'habilitations</a></li>
            <li><a href="/pro/factures" class="hover:text-[#fce297] transition-custom">Mes Factures PDF</a></li>
            <li><a href="/pro/disponibilites" class="hover:text-[#fce297] transition-custom">Gestion Planning</a></li>
          </ul>
        </div>

        <div class="space-y-4">
          <h4 class="text-xl font-bold border-b-2 border-[#7cabd3] pb-2 text-[#7cabd3]">Informations</h4>
          <ul class="space-y-2 text-md">
            <li><a href="/faq" class="hover:text-[#fce297] transition-custom">FAQ & Aide</a></li>
            <li><a href="/mentions-legales" class="hover:text-[#fce297] transition-custom">Mentions Légales</a></li>
            <li><a href="/rgpd" class="hover:text-[#fce297] transition-custom">Protection des données</a></li>
            <li><a href="/contact" class="hover:text-[#fce297] transition-custom font-bold">Nous contacter (24h/24)</a></li>
          </ul>
        </div>
      </div>

      <div class="mt-12 pt-8 border-t border-[#7cabd3]/30 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-xs opacity-60">© 2026 Silver Happy. Projet réalisé par IngéNext.</p>
        
        <div class="flex items-center gap-3">
          <span class="text-xs uppercase font-bold tracking-tighter">Langue :</span>
          <select class="bg-[#1a2b49] border border-[#7cabd3] text-sm p-1 rounded focus:outline-none focus:border-[#fce297]">
            <option value="fr">Français</option>
            <option value="en">English</option>
            <option value="ro">Română</option>
          </select>
        </div>
      </div>
    </footer>

    <script>
      
    </script>
  </body>
</html>