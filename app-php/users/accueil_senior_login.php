<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy - Accueil</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="style.css">
    <link rel="icon" href="img/logo-clear.png" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
  </head>
  <body class="font-sans bg-[#FFFFF6]">
    
    <nav class="bg-white px-6 pt-4 shadow-sm border-b-2 border-[#FCE297] sticky top-0 z-50">
      <div class="container mx-auto flex flex-col gap-4">
        <div class="flex justify-between items-center w-full">
          <img src="img/logo.png" alt="Logo Silver Happy" class="h-14" />
          <div class="flex items-center space-x-6 group">
            <a href="deconnexion.php" class="bg-[#7CABD3] text-white border-2 border-[#7CABD3] px-6 py-2 rounded-full font-black uppercase text-xs shadow-sm transition-all duration-300 group-hover:bg-transparent group-hover:text-[#7CABD3] hover:!bg-[#7CABD3] hover:!text-white">
              Deconnexion  <i class="bi bi-box-arrow-right"></i>
            </a>
          </div>
        </div>
        <div class="hidden md:flex justify-center space-x-12 font-fira uppercase text-xs tracking-widest pb-4">
          <a href="catalogue.php" class="hover:text-[#7CABD3] pb-2 border-b-2 border-transparent hover:border-[#FCE297] transition-all duration-300">Catalogue <i class="bi bi-grid-3x3-gap"></i></a>
          <a href="planning_senior.php" class="hover:text-[#7CABD3] pb-2 border-b-2 border-transparent hover:border-[#FCE297] transition-all duration-300">Planning <i class="bi bi-calendar4"></i></a>
          <a href="gestion_devis_senior.php" class="hover:text-[#7CABD3] pb-2 border-b-2 border-transparent hover:border-[#FCE297] transition-all duration-300">Gestion devis <i class="bi bi-file-earmark-text"></i></a>
          <a href="conseils_senior.php" class="hover:text-[#7CABD3] pb-2 border-b-2 border-transparent hover:border-[#FCE297] transition-all duration-300">Conseils <i class="bi bi-chat-quote"></i></a>
          <a href="gestion_paiments_senior.php" class="hover:text-[#7CABD3] pb-2 border-b-2 border-transparent hover:border-[#FCE297] transition-all duration-300">Mes Paiments <i class="bi bi-wallet2"></i></a>
        </div>
      </div>
    </nav>
    <section class="pt-24 pb-32 px-6 bg-[#FFFFF6]">
      <div class="container mx-auto max-w-5xl"> 
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="text-left">
            <h2 class="text-4xl md:text-5xl font-black uppercase mb-6 leading-tight tracking-tighter text-[#1A2B49]">
              "Libérez vos journées, <br>
              <span class="text-[#7CABD3]">sublimez vos années."</span>
            </h2>
            <div class="w-16 h-1.5 bg-[#FCE297] mb-8"></div>
            <p class="text-lg leading-relaxed text-gray-600 font-medium max-w-md mb-10">
              Silver Happy réinvente le service à domicile en alliant confiance humaine et simplicité numérique.
            </p>
            <div class="flex gap-4">
                <a href="#services" class="bg-[#7CABD3] text-white px-8 py-3 rounded-full font-black uppercase text-xs shadow-lg hover:scale-105 transition-all">
                  Découvrir nos services
                </a>
            </div>
          </div>

          <div class="relative flex justify-center group">
            <div class="absolute inset-0 bg-[#FCE297]/40 blur-[100px] rounded-full scale-125 group-hover:bg-[#7CABD3]/30 transition-all duration-1000"></div>
            <img 
              src="img/sublime-retraite.jpg" 
              class="relative h-80 w-80 md:h-[450px] md:w-[400px] object-cover shadow-2xl transition-all duration-700 hover:rotate-2"
              style="border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;"
            />
          </div>
        </div>
      </div>
    </section>

    <section id="services" class="pt-24 pb-32 px-6 bg-white">
      <div class="container mx-auto max-w-6xl">
        
        <div class="text-center -mt-10 md:-mt-14 mb-20 relative z-20">
          <h3 class="text-3xl md:text-5xl font-black uppercase tracking-tighter text-[#1A2B49]">
            Nos services <span class="text-[#7CABD3]">sur-mesure</span>
          </h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div class="group bg-[#FFFFF6] p-8 rounded-[40px] border-2 border-transparent hover:border-[#7CABD3] hover:shadow-xl transition-all duration-500 cursor-pointer">
            <div class="text-5xl mb-6 group-hover:scale-110 transition-transform">🏠</div>
            <h4 class="text-xl font-black uppercase mb-3 text-[#1A2B49]">Ménage</h4>
            <p class="text-gray-600 text-sm leading-relaxed mb-6">Ménage, repassage et grand nettoyage.</p>
            <span class="text-[#7CABD3] font-black uppercase text-[10px] tracking-widest border-b-2 border-[#7CABD3] pb-1">En savoir plus</span>
          </div>

          <div class="group bg-[#FFFFF6] p-8 rounded-[40px] border-2 border-transparent hover:border-[#FCE297] hover:shadow-xl transition-all duration-500 cursor-pointer">
            <div class="text-5xl mb-6 group-hover:scale-110 transition-transform">🌳</div>
            <h4 class="text-xl font-black uppercase mb-3 text-[#1A2B49]">Jardinage</h4>
            <p class="text-gray-600 text-sm leading-relaxed mb-6">Tonte de pelouse et petits travaux.</p>
            <span class="text-[#FCE297] font-black uppercase text-[10px] tracking-widest border-b-2 border-[#FCE297] pb-1">En savoir plus</span>
          </div>

          <div class="group bg-[#FFFFF6] p-8 rounded-[40px] border-2 border-transparent hover:border-[#7CABD3] hover:shadow-xl transition-all duration-500 cursor-pointer">
            <div class="text-5xl mb-6 group-hover:scale-110 transition-transform">💻</div>
            <h4 class="text-xl font-black uppercase mb-3 text-[#1A2B49]">Informatique</h4>
            <p class="text-gray-600 text-sm leading-relaxed mb-6">Aide aux démarches et cours particuliers.</p>
            <span class="text-[#7CABD3] font-black uppercase text-[10px] tracking-widest border-b-2 border-[#7CABD3] pb-1">En savoir plus</span>
          </div>

          <div class="group bg-[#FFFFF6] p-8 rounded-[40px] border-2 border-transparent hover:border-[#FCE297] hover:shadow-xl transition-all duration-500 cursor-pointer">
            <div class="text-5xl mb-6 group-hover:scale-110 transition-transform">🤝</div>
            <h4 class="text-xl font-black uppercase mb-3 text-[#1A2B49]">Compagnie</h4>
            <p class="text-gray-600 text-sm leading-relaxed mb-6">Promenades et présence bienveillante.</p>
            <span class="text-[#FCE297] font-black uppercase text-[10px] tracking-widest border-b-2 border-[#FCE297] pb-1">En savoir plus</span>
          </div>

        </div>
      </div>
    </section>

    <footer class="bg-[#1a2b49] text-[#fffff6] py-12 px-6">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        <div class="space-y-4">
          <h4 class="text-2xl font-black text-[#fce297] uppercase tracking-wider">Silver Happy</h4>
          <p class="text-sm leading-relaxed opacity-90">
            Bien vivre après 60 ans. Société créée à Paris en 2018.<br>
            <span class="font-fira">Siège :</span> 244, rue du Faubourg Saint Antoine, 75011.
          </p>
          <div class="text-xs opacity-75">
            Agences : Nice, Rouen, Moldavie, et plus.
          </div>
        </div>

        <div class="space-y-4">
          <h4 class="text-xl font-fira border-b-2 border-[#7cabd3] pb-2 text-[#7cabd3]">Nos Services</h4>
          <ul class="space-y-2 text-md">
            <li><a href="/services" class="hover:text-[#fce297] transition-custom">Aide à domicile & Repas</a></li>
            <li><a href="/evenements" class="hover:text-[#fce297] transition-custom">Événements & Loisirs</a></li>
            <li><a href="/boutique" class="hover:text-[#fce297] transition-custom">Boutique & Articles</a></li>
            <li><a href="/conseils" class="hover:text-[#fce297] transition-custom">Espace Conseils</a></li>
          </ul>
        </div>

        <div class="space-y-4">
          <h4 class="text-xl font-fira border-b-2 border-[#7cabd3] pb-2 text-[#7cabd3]">Espace Pro</h4>
          <ul class="space-y-2 text-md">
            <li><a href="/pro/devenir-prestataire" class="hover:text-[#fce297] transition-custom">Devenir Prestataire</a></li>
            <li><a href="/pro/documents" class="hover:text-[#fce297] transition-custom">Dépôt d'habilitations</a></li>
            <li><a href="/pro/factures" class="hover:text-[#fce297] transition-custom">Mes Factures PDF</a></li>
            <li><a href="/pro/disponibilites" class="hover:text-[#fce297] transition-custom">Gestion Planning</a></li>
          </ul>
        </div>

        <div class="space-y-4">
          <h4 class="text-xl font-fira border-b-2 border-[#7cabd3] pb-2 text-[#7cabd3]">Informations</h4>
          <ul class="space-y-2 text-md">
            <li><a href="/faq" class="hover:text-[#fce297] transition-custom">FAQ & Aide</a></li>
            <li><a href="/mentions-legales" class="hover:text-[#fce297] transition-custom">Mentions Légales</a></li>
            <li><a href="/rgpd" class="hover:text-[#fce297] transition-custom">Protection des données</a></li>
            <li><a href="/contact" class="hover:text-[#fce297] transition-custom font-fira">Nous contacter (24h/24)</a></li>
          </ul>
        </div>
      </div>

      <div class="mt-12 pt-8 border-t border-[#7cabd3]/30 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-xs opacity-60">© 2026 Silver Happy. Projet réalisé par IngéNext.</p>
        
        <div class="flex items-center gap-3">
          <span class="text-xs uppercase font-fira tracking-tighter">Langue :</span>
          <select class="bg-[#1a2b49] border border-[#7cabd3] text-sm p-1 rounded focus:outline-none focus:border-[#fce297]">
            <option value="fr">Français</option>
            <option value="en">English</option>
            <option value="ro">Română</option>
          </select>
        </div>
      </div>
    </footer>
  </body>
</html>