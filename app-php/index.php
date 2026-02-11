<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy - Accueil</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link
      href="https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:wght@400;700;900&display=swap"
      rel="stylesheet"
    />
    <link rel="icon" href="img/logo-clear.png"  />
    <style>
      body { font-family: 'Fira Sans Condensed', sans-serif; }
    </style>
  </head>
  <body class="bg-[#FCF9F1] font-sans text-[#1A2B49]">
    
    <nav class="bg-white px-6 pt-4 shadow-sm">
      <div class="container mx-auto flex flex-col gap-4">
        <div class="flex justify-between items-center w-full">
          <div class="flex items-center">
            <img src="img/logo.png" alt="Logo Silver Happy" class="h-12" />
          </div>

          <div class="flex items-center space-x-6">
            <a href="#" class="bg-[#F06543] text-white px-6 py-2 rounded-full font-black uppercase text-xs shadow-sm hover:bg-[#d85436] transition-all no-underline">
              Connexion
            </a>
            <span class="h-5 w-[2px] bg-gray-300"></span>
            <a href="#" class="text-gray-500 font-bold uppercase text-xs hover:text-[#1A2B49] transition-colors no-underline">
              Inscription
            </a>
          </div>
        </div>

        <div class="hidden md:flex justify-center space-x-12 font-bold uppercase text-xs tracking-widest">
          <a href="#" class="hover:text-[#F06543] pb-2 border-b-4 border-transparent hover:border-[#F06543] transition-all">Qui sommes-nous ?</a>
          <a href="#" class="hover:text-[#F06543] pb-2 border-b-4 border-transparent hover:border-[#F06543] transition-all">Nos Services</a>
          <a href="#" class="hover:text-[#F06543] pb-2 border-b-4 border-transparent hover:border-[#F06543] transition-all">Espace Partenaire</a>
        </div>
      </div>
    </nav>

    <section class="py-20 px-6">
      <div class="container mx-auto text-center max-w-4xl">
        <h2 class="text-5xl font-black uppercase mb-8 tracking-tighter">
          Le bonheur de bien vieillir !
        </h2>

        <p class="text-xl leading-relaxed mb-6 text-gray-700">
          Silver Happy, c'est une communauté de services et de prestataires
          engagés pour
          <span class="font-bold text-[#1A2B49]">favoriser l'autonomie des aîné.e.s</span>
          et simplifier leur quotidien.
        </p>

        <p class="text-lg leading-relaxed text-gray-600 mb-12">
          Que vous soyez un senior en quête de confort ou un prestataire
          souhaitant proposer ses services, notre plateforme sécurisée
          facilite chaque étape de votre rencontre.
        </p>

        <div class="flex justify-center mb-16">
          <img
            src="https://www.parisencompagnie.org/wp-content/themes/paris-en-compagnie/assets/img/home/pictos-engagements.png"
            alt="Illustration"
            class="h-48 opacity-80 grayscale-[0.2]"
          />
        </div>

        <h3 class="text-4xl font-black uppercase mb-10 tracking-tighter">
          Comment ça marche ?
        </h3>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white p-8 rounded-xl shadow-sm border-b-4 border-[#F06543]">
            <div class="text-3xl font-black text-blue-200 mb-4">01.</div>
            <p class="font-bold">Je choisis une prestation dans le catalogue.</p>
          </div>
          <div class="bg-white p-8 rounded-xl shadow-sm border-b-4 border-[#F06543]">
            <div class="text-3xl font-black text-blue-200 mb-4">02.</div>
            <p class="font-bold">Je valide mon devis et je signe mon contrat.</p>
          </div>
          <div class="bg-white p-8 rounded-xl shadow-sm border-b-4 border-[#F06543]">
            <div class="text-3xl font-black text-blue-200 mb-4">03.</div>
            <p class="font-bold">Je profite de mon service en toute sécurité.</p>
          </div>
        </div>
      </div>
    </section>

    <footer class="bg-[#1A2B49] text-white pt-16 pb-8 px-6 mt-20">
      <div class="container mx-auto">
        <div class="grid md:grid-cols-4 gap-12 mb-12">
          
          <div class="col-span-1 md:col-span-1">
            <img src="img/logo.png" alt="Logo Silver Happy" class="h-10 brightness-0 invert mb-6" />
            <p class="text-gray-400 text-sm leading-relaxed">
              Silver Happy accompagne les aînés dans leur quête d'autonomie avec des services de confiance et de proximité.
            </p>
          </div>

          <div>
            <h4 class="font-black uppercase text-sm tracking-widest mb-6 text-[#F06543]">Plateforme</h4>
            <ul class="space-y-4 text-sm font-bold">
              <li><a href="#" class="hover:text-[#F06543] transition-colors">Nos Services</a></li>
              <li><a href="#" class="hover:text-[#F06543] transition-colors">Espace Partenaire</a></li>
              <li><a href="#" class="hover:text-[#F06543] transition-colors">Boutique</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-black uppercase text-sm tracking-widest mb-6 text-[#F06543]">Aide</h4>
            <ul class="space-y-4 text-sm font-bold">
              <li><a href="#" class="hover:text-[#F06543] transition-colors">Contactez-nous</a></li>
              <li><a href="#" class="hover:text-[#F06543] transition-colors">FAQ Seniors</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-black uppercase text-sm tracking-widest mb-6 text-[#F06543]">Légal</h4>
            <ul class="space-y-4 text-sm font-bold">
              <li><a href="#" class="hover:text-[#F06543] transition-colors">Mentions Légales</a></li>
              <li><a href="#" class="hover:text-[#F06543] transition-colors">CGU</a></li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-xs text-gray-500 font-bold uppercase tracking-widest">
            © 2026 Silver Happy — Fait avec bienveillance
          </p>
        </div>
      </div>
    </footer>
  </body>
</html>