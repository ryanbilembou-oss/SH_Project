<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy - Connexion</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:wght@400;700;900&display=swap" rel="stylesheet">
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
    <style>
        body { font-family: 'Fira Sans Condensed', sans-serif; background-color: #FFFFF6; }
    </style>
</head>
<body class="min-h-screen flex items-center justify-center p-6 relative">

    <a href="../index.php" class="absolute top-8 left-8 text-[#1A2B49] font-black uppercase text-[10px] tracking-widest flex items-center group">
        <span class="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span> Retour
    </a>

    <div id="toast" class="fixed top-6 left-1/2 transform -translate-x-1/2 -translate-y-20 opacity-0 z-50 transition-all duration-500 pointer-events-none">
        <div class="bg-[#1A2B49] text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3">
            <span id="toastIcon" class="text-lg">✅</span>
            <span id="toastMsg" class="font-bold uppercase text-xs tracking-widest">Message</span>
        </div>
    </div>

    <div class="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-10 relative overflow-hidden">
        <div class="absolute -bottom-10 -left-10 w-32 h-32 bg-[#7CABD3]/20 rounded-full blur-3xl"></div>
        <div class="absolute -top-10 -right-10 w-24 h-24 bg-[#FCE297]/30 rounded-full blur-3xl"></div>

        <div class="relative z-10">
            <div class="flex justify-center mb-8">
                <img src="../img/logo.png" alt="Silver Happy" class="h-14">
            </div>

            <div class="mb-8">
                <h2 class="text-3xl font-black uppercase tracking-tighter text-[#1A2B49] mb-2">
                    Bon retour <span class="text-[#7CABD3]">parmi nous</span>
                </h2>
                <p class="text-gray-400 text-sm font-medium italic">Heureux de vous revoir sur Silver Happy.</p>
            </div>

            <form id="loginForm" class="space-y-5">
                <div>
                    <label class="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-4">Email</label>
                    <input type="email" id="email" placeholder="votre@email.com" required
                        autocomplete="email"
                        class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none transition-all font-medium placeholder:text-gray-300 text-[#1A2B49]">
                    <p id="error-email" class="hidden text-[9px] text-red-500 font-bold uppercase mt-1 ml-4 tracking-widest"></p>
                </div>

                <div>
                    <div class="flex justify-between items-center mb-2 ml-4 mr-4">
                        <label class="text-[10px] font-black uppercase tracking-widest text-gray-400">Mot de passe</label>
                        <a href="#" class="text-[9px] font-bold uppercase text-[#7CABD3] hover:underline">Oublié ?</a>
                    </div>
                    <div class="relative">
                        <input type="password" id="password" placeholder="••••••••" required
                            autocomplete="current-password"
                            class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none transition-all font-medium placeholder:text-gray-300 text-[#1A2B49]">
                        <button type="button" id="togglePassword" class="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#7CABD3] transition-colors">
                            <svg id="eyeIcon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        </button>
                    </div>
                    <p id="error-password" class="hidden text-[9px] text-red-500 font-bold uppercase mt-1 ml-4 tracking-widest"></p>
                </div>

                <div class="flex justify-center">
                    <div class="g-recaptcha" data-sitekey="6LcmXpwsAAAAANacd5JK7B-M9MxUCSmnQBF_6LB8"></div>
                </div>
                <p id="error-captcha" class="hidden text-[9px] text-red-500 font-bold uppercase text-center tracking-widest">Veuillez valider le captcha.</p>

                <button type="submit" id="submitBtn"
                    class="w-full bg-[#1A2B49] text-white font-black uppercase text-xs tracking-[0.2em] py-5 rounded-2xl shadow-lg hover:bg-[#7CABD3] transition-all transform hover:-translate-y-1">
                    Se connecter
                </button>
            </form>

            <div class="mt-8 pt-6 border-t border-gray-100 text-center">
                <p class="text-gray-500 text-xs font-medium">
                    Pas encore de compte ?
                    <a href="register.php" class="text-[#1A2B49] font-black uppercase ml-1 hover:text-[#7CABD3] transition-colors">S'inscrire</a>
                </p>
            </div>
        </div>
    </div>

    <script src="/js/users/login.js?v=<?php echo time(); ?>" defer></script>
</body>
</html>