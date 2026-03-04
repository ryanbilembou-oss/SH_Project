<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy - Accueil</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="style.css">
    <link rel="icon" href="img/logo-clear.png" />
  </head>
  <body class="font-sans bg-[#FFFFF6]">
    
    <nav class="bg-white px-6 pt-4 shadow-sm border-b-2 border-[#FCE297] sticky top-0 z-50">
      <div class="container mx-auto flex flex-col gap-4">
        <div class="flex justify-between items-center w-full">
          <img src="img/logo.png" alt="Logo Silver Happy" class="h-14" />
          <div class="flex items-center space-x-6 group">
            <a href="login.php" class="bg-[#7CABD3] text-white border-2 border-[#7CABD3] px-6 py-2 rounded-full font-black uppercase text-xs shadow-sm transition-all duration-300 hover:bg-white hover:text-[#7CABD3]">
              Connexion
            </a>
            <span class="h-5 w-[2px] bg-gray-300"></span>
            <a href="register.php" class="text-[#7CABD3] border-2 border-[#7CABD3] px-6 py-2 rounded-full font-bold uppercase text-xs transition-all duration-300 hover:bg-[#7CABD3] hover:text-white hover:shadow-md">
              Inscription
            </a>
          </div>
        </div>
        <div class="hidden md:flex justify-center space-x-12 font-bold uppercase text-xs tracking-widest pb-4">
          <a href="#" class="hover:text-[#7CABD3] pb-2 border-b-2 border-transparent hover:border-[#FCE297] transition-all duration-300">Qui sommes-nous ?</a>
          <a href="#services" class="hover:text-[#7CABD3] pb-2 border-b-2 border-transparent hover:border-[#FCE297] transition-all duration-300">Nos Services</a>
          <a href="#" class="hover:text-[#7CABD3] pb-2 border-b-2 border-transparent hover:border-[#FCE297] transition-all duration-300">Espace Partenaire</a>
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
                <a href="register.php" class="border-2 border-[#1A2B49] text-[#1A2B49] px-8 py-3 rounded-full font-black uppercase text-xs hover:bg-[#1A2B49] hover:text-white transition-all">
                  S'inscrire
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

    <footer class="bg-[#1A2B49] text-white pt-20 pb-10 px-6 mt-20">
      <div class="container mx-auto">
        <div class="grid md:grid-cols-4 gap-12 mb-16 border-b border-white/10 pb-16">
          <div class="col-span-1">
            <img src="img/logo.png" alt="Logo Silver Happy" class="h-10 brightness-0 invert mb-6 opacity-90" />
            <p class="text-gray-400 text-sm leading-relaxed font-medium">Favoriser l'autonomie des aîné.e.s par le service de proximité.</p>
          </div>
          <div>
            <h4 class="font-black uppercase text-xs tracking-[0.2em] mb-8 text-[#7CABD3]">Plateforme</h4>
            <ul class="space-y-4 text-xs font-bold uppercase tracking-widest">
              <li><a href="#services" class="hover:text-[#FCE297] transition-colors">Nos Services</a></li>
              <li><a href="register.php" class="hover:text-[#FCE297] transition-colors">Devenir Partenaire</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-black uppercase text-xs tracking-[0.2em] mb-8 text-[#7CABD3]">Support</h4>
            <ul class="space-y-4 text-xs font-bold uppercase tracking-widest">
              <li><a href="#" class="hover:text-[#FCE297] transition-colors">Contact</a></li>
              <li><a href="#" class="hover:text-[#FCE297] transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-black uppercase text-xs tracking-[0.2em] mb-8 text-[#7CABD3]">Légal</h4>
            <ul class="space-y-4 text-xs font-bold uppercase tracking-widest">
              <li><a href="#" class="hover:text-[#FCE297] transition-colors">CGU</a></li>
              <li><a href="#" class="hover:text-[#FCE297] transition-colors">Mentions</a></li>
            </ul>
          </div>
        </div>
        <p class="text-[10px] text-center text-gray-500 font-black uppercase tracking-[0.3em]">© 2026 Silver Happy — Projet FS/VO</p>
      </div>
    </footer>
  </body>
</html>