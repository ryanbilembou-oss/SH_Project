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
    <nav class="bg-white p-4">
      <div class="flex space-x-8">
        
        <div class="relative group">
          <button class="flex items-center gap-1 font-fira font-bold text-[#1a2b49] group-hover:text-[#7CABD3] transition-colors">
            Catégories
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>

          </button>

          <div class="absolute left-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl 
                      invisible opacity-0 translate-y-2
                      group-hover:visible group-hover:opacity-100 group-hover:translate-y-0
                      transition-all duration-200 z-50">
            
            <div class="py-2">
              <a href="#" class="block px-4 py-2 text-sm font-fira hover:bg-[#7CABD3]/10 hover:text-[#7CABD3]">Tourisme</a>
              <a href="#" class="block px-4 py-2 text-sm font-fira hover:bg-[#7CABD3]/10 hover:text-[#7CABD3]">Loisirs</a>
              <a href="#" class="block px-4 py-2 text-sm font-fira hover:bg-[#7CABD3]/10 hover:text-[#7CABD3]">Travail</a>
            </div>
          </div>
        </div>

      </div>
    </nav>