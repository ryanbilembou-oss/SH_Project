<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy - Accueil</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>
    <link rel="stylesheet" href="style.css">
    <link rel="icon" href="img/logo-clear.png" />
  </head>
  <body class="font-['Fira_Sans_Condensed'] bg-[#FFFFF6]">
    
    <nav class="bg-white px-6 pt-4 shadow-sm border-b-2 border-[#FCE297] sticky top-0 z-50 rounded-full">
      <div class="container mx-auto flex flex-col gap-4">
        <div class="flex justify-between items-center w-full">
          <a href="index.php" class="h-20"><img src="img/logo.png" alt="Logo Silver Happy" class="h-14" /></a>
          <div class="flex items-center space-x-6 group">
<!--<a href="users/login.php" class="bg-[#7CABD3] text-white border-2 border-[#7CABD3] px-6 py-2 rounded-full font-black uppercase text-xs shadow-sm transition-all duration-300 group-hover:bg-transparent group-hover:text-[#7CABD3] hover:!bg-[#7CABD3] hover:!text-white">
              Connexion
            </a>-->
            <a href="users/login.php" class=" inline-block px-6 py-2 bg-[#7CABD3] rounded-full shadow text-white  hover:text-[#7CABD3] hover:bg-white transition-all duration-300" role="button" >Connexion</a>
            <p>|</p>
            <a href="users/register.php" class="inline-block px-6 py-2 btn text-[#7CABD3] bg-white hover:text-white hover:bg-[#7CABD3] rounded-full shadow transition-all duration-300 " role="button">Inscription</a>
          </div>
        </div>
        <div class="flex pb-4 gap-20 mx-auto">
          <!--        
        <div class="relative group">
          <button class="flex items-center gap-1 font-fira font-bold text-[#1a2b49] group-hover:text-[#7CABD3] transition-colors">
            Catégories
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>

          </button>-->


          <a href="#" class="flex items-center gap-1 font-fira pb-2 border-b-2 hover:border-[#FCE297]  hover:text-[#7CABD3] transition-all duration-200">Qui sommes-nous ?
          </a>
          <div class= "relative group">
            <a href="services.php" class="flex items-center gap-1 font-fira pb-2 border-b-2 hover:border-[#FCE297]  hover:text-[#7CABD3] transition-all duration-200" >Nos Services        
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg> </a>
              <div class="absolute left-0  w-48 bg-white border border-gray-100 rounded-2xl shadow-xl 
                        invisible opacity-0 translate-y-2
                        group-hover:visible group-hover:opacity-100 group-hover:translate-y-0
                        transition-all duration-200 z-50">
              
                <div class="py-2">
                  <a href="#" class="flex items-center px-4 py-2 text-sm font-fira hover:bg-[#7CABD3]/10 hover:text-[#7CABD3]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    
                    Tourisme
                  </a>
                  <a href="#" class="flex items-center px-4 py-2 text-sm font-fira hover:bg-[#7CABD3]/10 hover:text-[#7CABD3]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
                    </svg>
                    Loisirs
                  </a>
                  <a href="#" class="flex items-center px-4 py-2 text-sm font-fira hover:bg-[#7CABD3]/10 hover:text-[#7CABD3]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>  
                  Santé
                  </a>
                  <a href="#" class="flex items-center px-4 py-2 text-sm font-fira hover:bg-[#7CABD3]/10 hover:text-[#7CABD3]"> 

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                    </svg>
                    Cours
                  </a>
                  <a href="#" class="flex items-center px-4 py-2 text-sm font-fira hover:bg-[#7CABD3]/10 hover:text-[#7CABD3]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                  Shopping
                  </a>
                  <a href="#" class=" flex items-center px-4 py-2 text-sm font-fira hover:bg-[#7CABD3]/10 hover:text-[#7CABD3]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                    </svg>
                        emploi seniors
                  </a>
                </div>
              </div>

          </div>
          <a href="#" class="flex items-centeritems-center gap-1 font-fira pb-2 border-b-2 hover:border-[#FCE297]  hover:text-[#7CABD3] transition-all duration-200 ">Espace Partenaire
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>

          </a>
        </div>
      </div>
    </nav>
    <section class="pt-10 bg-[#FFFFF6]">
      <div class="container mx-auto max-w-5xl mb-20"> 
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="text-left">
            <h2 class="text-4xl uppercase mb-2 text-[#7CABD3] mb-4">
              "Libérez vos journées, <br>
              <span class="text-[#ffce3a]">sublimez vos années."</span>
            </h2>
            <p class="text-lg  text-gray-600  mb-10">
              Silver Happy réinvente le service à domicile en alliant confiance humaine et simplicité numérique.
            </p>
            <div class="flex gap-4">
                <a href="#services" class="bg-[#7CABD3] text-white px-8 py-3 rounded-full  shadow  hover:text-[#7CABD3] hover:bg-white transition-all duration-300 ">
                  Découvrir nos services
                </a>
            </div>
          </div>

          <div class="relative flex justify-center group ">
            <div class="absolute inset-0 bg-[#FCE297]/35 blur-[100px] scale-125 "></div>
            <img src="img/sublime-retraite.jpg" class="rounded-full"style="">
            <!--<img 
              src="img/sublime-retraite.jpg" 
              class="relative h-80 w-80 md:h-[450px] md:w-[400px] object-cover shadow-2xl transition-all duration-700 hover:rotate-2"
              style="border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;"
            />-->
          </div>
        </div>
      </div>
    </section>

    <section id="services" class="pt-24 pb-32 px-6 bg-white">
      <div class="container mx-auto max-w-6xl">
        
        <div class="text-center -mt-10 md:-mt-14 mb-20 relative z-20">
          <h3 class="text-5xl  uppercase tracking-tighter text-[#1A2B49] mt-10">
            Nos services <span class="text-[#7CABD3]">sur-mesure</span>
          </h3>
        </div>

        <div class=" flex flex-wrap justify-center gap-8 max-w-7xl mx-auto px-4">
          
          <div class="group bg-[#FFFFF6] p-8 rounded-[40px] border-2 border-transparent hover:border-[#7CABD3] hover:shadow-xl transition-all duration-500 cursor-pointer">
            <div class="text-5xl mb-6 group-hover:scale-110 transition-transform"></div>
            <h4 class="text-xl font-black uppercase mb-3 text-[#1A2B49] items-center">

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
              </svg>

                Services à domicile
            </h4>

            
            <p class="text-gray-600 text-sm leading-relaxed mb-6">Aide à la personne, <br>Aide administrative, <br>Cuisine, <br>Garde d'animaux</p>
            <span class="text-[#7CABD3] font-black uppercase text-[10px] tracking-widest border-b-2 border-[#7CABD3] pb-1">En savoir plus</span>
          </div>

          <div class="group bg-[#FFFFF6] p-8 rounded-[40px] border-2 border-transparent hover:border-[#FCE297] hover:shadow-xl transition-all duration-500 cursor-pointer">
            <div class="text-5xl mb-6 group-hover:scale-110 transition-transform"></div>
            <h4 class="text-xl font-black uppercase mb-3 text-[#1A2B49]">              
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>Maison & Habitat</h4>
            <p class="text-gray-600 text-sm leading-relaxed mb-6">Jardinage,<br>Décoration, <br> Depannage Informatique <br> Finances & Assurances</p>
              <span class="text-[#FCE297] font-black uppercase text-[10px] tracking-widest border-b-2 border-[#FCE297] pb-1">En savoir plus</span>

          </div>

          <div class="group bg-[#FFFFF6] p-8 rounded-[40px] border-2 border-transparent hover:border-[#7CABD3] hover:shadow-xl transition-all duration-500 cursor-pointer">
            <div class="text-5xl mb-6 group-hover:scale-110 transition-transform"></div>
            <h4 class="text-xl font-black uppercase mb-3 text-[#1A2B49]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              Tourisme, Voyages</h4>
            <p class="text-gray-600 text-sm leading-relaxed mb-6">Restaurant, Bars, Pub, <br>Gîtes & Chambres <br>Sejour,<br> Voyages </p>
            <span class="text-[#7CABD3] font-black uppercase text-[10px] tracking-widest border-b-2 border-[#7CABD3] pb-1">En savoir plus</span>
          </div>

        </div>
      </div>
    </section>
    <footer class="bg-[#7CABD3] border-t border-gray-200 pt-16 pb-8 ">
      <div class="max-w-7xl mx-auto px-4">
      
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div class="relative">
            <img class="h-20 mb-5"src="img/logo.png" alt="logo-SH">
            <p class="text-gray-600 font-fira text-sm leading-relaxed">
              Expertise en tourisme et loisirs. Nous créons des expériences uniques pour vos besoins professionnels.
            </p>
            <div class="absolute -bottom-10 left-0 hidden lg:block opacity-40">
              <svg class="w-12 h-12 text-[#FFFFF6]" viewBox="0 0 100 100">
                </svg>
            </div>
          </div>

          <div>
            <h3 class="font-fira font-bold uppercase tracking-widest text-xs text-white-400 mb-6">Réseaux</h3>
            <ul class="space-y-4">
              <li>
                <iconify-icon 
                  icon="mdi:instagram"
                  class="text-2xl text-black-400 hover:text-[#FFFFF6] transition-all cursor-pointer">
                </iconify-icon>
                <iconify-icon icon="ri:twitter-x-fill" class="text-2xl text-[#1a2b49] hover:text-[#FFFFF6] transition-all cursor-pointer"></iconify-icon>
                <iconify-icon icon="ri:facebook-box-fill" class="text-2xl text-[#1a2b49] hover:text-[#FFFFF6] transition-all cursor-pointer"></iconify-icon>
                <iconify-icon icon="ri:youtube-fill" class="text-2xl text-[#1a2b49] hover:text-[#FFFFF6] transition-all cursor-pointer"></iconify-icon>
              </li>
              <li><a href="#" class="font-fira text-[#1a2b49] hover:text-[#FFFFF6] transition-colors"></a></li>
            </ul>
            <h3 class="font-fira font-bold uppercase tracking-widest text-xs text-black-400 mb-6">Paiments Sécurisé</h3>
            <ul class="space-y-4">
              <iconify-icon icon="fa6-brands:stripe-s" class="text-[#1a2b49] hover:text-[#FFF] text-2xl transition-all duration-200 "></iconify-icon>

            </ul>
            
          </div>

          <div>
            <h3 class="font-fira font-bold uppercase tracking-widest text-xs text-black-400 mb-6">Professionnel</h3>
            <ul class="space-y-4">
              <li><a href="#" class="font-fira text-[#1a2b49] hover:text-[#FFFFF6] transition-colors">Travail</a></li>
              <li><a href="#" class="font-fira text-[#1a2b49] hover:text-[#FFFFF6] transition-colors">Services</a></li>
              <li><a href="#" class="font-fira text-[#1a2b49] hover:text-[#FFFFF6] transition-colors">Shopping</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-fira font-bold uppercase tracking-widest text-xs text-black-400 mb-6">Faites Nous Confiance</h3>
            <ul class="space-y-4">
              <li><a href="#" class="font-fira text-[#1a2b49] hover:text-[#FFFFF6] transition-colors">Travail</a></li>
              <li><a href="#" class="font-fira text-[#1a2b49] hover:text-[#FFFFF6] transition-colors">Services</a></li>
              <li><a href="#" class="font-fira text-[#1a2b49] hover:text-[#FFFFF6] transition-colors">Shopping</a></li>
            </ul>
          </div>

          <div>
            <h3 class="font-fira font-bold uppercase tracking-widest text-xs text-black-400 mb-6">Restez connecté</h3>
            <div class="flex gap-2">
              <input type="email" placeholder="Email" class="bg-white border border-gray-200 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-[#FFFFF6] font-fira text-sm">
              <button class="bg-[#5a8bb5] text-white p-2 rounded-lg hover:bg-[#FFFFF6] transition-colors">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
              </button>
            </div>
          </div>

        </div>

        <div class="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="font-fira text-xs text-gray-400">
            © 2026 Agence de Tourisme. Tous droits réservés.
          </p>
          <div class="flex gap-6">
            <a href="#" class="font-fira text-xs text-gray-400 hover:underline">Mentions Légales</a>

            <a href="#" class="font-fira text-xs text-gray-400 hover:underline">Confidentialité</a>
          </div>
        </div>

      </div>
    </footer>

<!--    <footer class="bg-[#1a2b49] text-[#fffff6] py-12 px-6">
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
            <li><a href="/boutique" class="hover:text-[#fce297] transition-custom">Boutique & Articles</a></li>
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
  </body>
</html>

            tourisme
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
</svg>
sante
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>
loisirs
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
</svg>

cours
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
</svg>

shopping
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
</svg>

emploi seniors
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
</svg>


-->