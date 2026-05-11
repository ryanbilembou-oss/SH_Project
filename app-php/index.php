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

            <a href="users/login.php" class=" inline-block px-6 py-2 bg-[#7CABD3] rounded-full shadow text-white  hover:text-[#7CABD3] hover:bg-white transition-all duration-300" role="button" >Connexion</a>
            <p>|</p>
            <a href="users/register.php" class="inline-block px-6 py-2 btn text-[#7CABD3] bg-white hover:text-white hover:bg-[#7CABD3] rounded-full shadow transition-all duration-300 " role="button">Inscription</a>
          </div>
        </div>
        <div class="flex pb-4 gap-20 mx-auto">
          


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
