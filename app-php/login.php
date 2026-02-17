<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy - Connexion</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #FFFFF6; }
    </style>
</head>
<body class="min-h-screen flex items-center justify-center p-6">

    <a href="index.php" class="absolute top-8 left-8 text-[#1A2B49] font-black uppercase text-[10px] tracking-widest flex items-center group">
        <span class="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span> Retour
    </a>

    <div class="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-10 relative overflow-hidden">
        
        <div class="absolute -bottom-10 -left-10 w-32 h-32 bg-[#7CABD3]/20 rounded-full blur-3xl"></div>
        
        <div class="relative z-10">
            <div class="mb-10">
                <h2 class="text-3xl font-black uppercase tracking-tighter text-[#1A2B49] mb-2">Bon retour <span class="text-[#7CABD3]">parmi nous</span></h2>
                <p class="text-gray-400 text-sm font-medium italic">Heureux de vous revoir sur Silver Happy.</p>
            </div>

            <form id="loginForm" class="space-y-6">
                <div>
                    <label class="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-4">Identifiant (Email)</label>
                    <input type="email" id="email" name="email" placeholder="votre@email.com" required
                        class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none transition-all font-medium placeholder:text-gray-300">
                </div>

                <div>
                    <div class="flex justify-between items-center mb-2 ml-4 mr-4">
                        <label class="text-[10px] font-black uppercase tracking-widest text-gray-400">Mot de passe</label>
                        <a href="#" class="text-[9px] font-bold uppercase text-[#7CABD3] hover:underline">Oublié ?</a>
                    </div>
                    <input type="password" id="password" name="password" placeholder="••••••••" required
                        class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none transition-all font-medium placeholder:text-gray-300">
                </div>

                <button type="submit" 
                    class="w-full bg-[#1A2B49] text-white font-black uppercase text-xs tracking-[0.2em] py-5 rounded-2xl shadow-lg hover:bg-[#7CABD3] transition-all transform hover:-translate-y-1 mt-4">
                    Se connecter
                </button>
            </form>

            <div class="mt-10 pt-6 border-t border-gray-100 text-center">
                <p class="text-gray-500 text-xs font-medium">
                    Pas encore de compte ? 
                    <a href="register.php" class="text-[#1A2B49] font-black uppercase ml-1 hover:text-[#7CABD3] transition-colors">S'inscrire</a>
                </p>
            </div>
        </div>
    </div>
  

</body>
<script src="js/login.js"></script>
</html>