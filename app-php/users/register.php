<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy - Inscription</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:wght@400;700;900&display=swap" rel="stylesheet">
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
    <style>
        body { font-family: 'Fira Sans Condensed', sans-serif; background-color: #FFFFF6; }
        .critere-valid { color: #16a34a; }
        .critere-invalid { color: #dc2626; }
    </style>
</head>
<body class="min-h-screen flex items-center justify-center p-6 relative">

    <a href="../index.php" class="absolute top-8 left-8 text-[#1A2B49] font-black uppercase text-[10px] tracking-widest flex items-center group">
        <span class="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span> Retour
    </a>

    <div id="toast" class="fixed top-6 left-1/2 transform -translate-x-1/2 -translate-y-20 opacity-0 z-50 transition-all duration-500 pointer-events-none">
        <div class="bg-[#1A2B49] text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3">
            <span id="toastIcon" class="text-lg">V</span>
            <span id="toastMsg" class="font-bold uppercase text-xs tracking-widest">Message</span>
        </div>
    </div>

    <div class="max-w-lg w-full bg-white rounded-[40px] shadow-2xl p-10 relative overflow-hidden my-10">
        <div class="absolute -bottom-10 -left-10 w-32 h-32 bg-[#7CABD3]/20 rounded-full blur-3xl"></div>
        <div class="absolute -top-10 -right-10 w-24 h-24 bg-[#FCE297]/30 rounded-full blur-3xl"></div>

        <div class="relative z-10">
            <div class="flex justify-center mb-8">
                <img src="../img/logo.png" alt="Silver Happy" class="h-14">
            </div>

            <div class="mb-8">
                <h2 class="text-3xl font-black uppercase tracking-tighter text-[#1A2B49] mb-2">
                    Creer un <span class="text-[#7CABD3]">compte</span>
                </h2>
                <p class="text-gray-400 text-sm font-medium italic">Rejoignez l'aventure Silver Happy.</p>
            </div>

            <form id="registerForm" class="space-y-5">

                <div>
                    <label class="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-4">Je suis un...</label>
                    <select id="role" class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none transition-all font-medium text-[#1A2B49]">
                        <option value="senior">Senior</option>
                        <option value="pro">Prestataire (Professionnel)</option>
                    </select>
                </div>

                <div class="flex gap-4">
                    <div class="w-1/2">
                        <label class="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-4">Nom</label>
                        <input type="text" id="nom" placeholder="Nom" required class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none transition-all font-medium placeholder:text-gray-300 text-[#1A2B49]">
                    </div>
                    <div class="w-1/2">
                        <label class="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-4">Prenom</label>
                        <input type="text" id="prenom" placeholder="Prenom" required class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none transition-all font-medium placeholder:text-gray-300 text-[#1A2B49]">
                    </div>
                </div>

                <div class="flex gap-4">
                    <div class="w-1/2">
                        <label class="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-4">Genre</label>
                        <select id="genre" class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none transition-all font-medium text-[#1A2B49]">
                            <option value="Masculin">Homme</option>
                            <option value="Feminin">Femme</option>
                            <option value="Autre">Autre</option>
                        </select>
                    </div>
                    <div class="w-1/2">
                        <label class="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-4">Telephone</label>
                        <input type="tel" id="telephone" placeholder="06..." maxlength="10" class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none transition-all font-medium placeholder:text-gray-300 text-[#1A2B49]">
                    </div>
                </div>

                <div>
                    <label class="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-4">Email</label>
                    <input type="email" id="email" placeholder="votre@email.com" required autocomplete="email" class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none transition-all font-medium placeholder:text-gray-300 text-[#1A2B49]">
                    <p id="error-email" class="hidden text-[9px] text-red-500 font-bold uppercase mt-1 ml-4 tracking-widest"></p>
                </div>

                <div>
                    <label class="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-4">Mot de passe</label>
                    <div class="relative">
                        <input type="password" id="password" placeholder="••••••••" required autocomplete="new-password" class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none transition-all font-medium placeholder:text-gray-300 text-[#1A2B49]">
                        <button type="button" id="togglePassword" class="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#7CABD3] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        </button>
                    </div>
                    <div class="mt-3 ml-4 space-y-1">
                        <p id="crit-length" class="text-[9px] critere-invalid font-bold uppercase tracking-widest italic">8 caracteres</p>
                        <p id="crit-number" class="text-[9px] critere-invalid font-bold uppercase tracking-widest italic">Un chiffre</p>
                        <p id="crit-special" class="text-[9px] critere-invalid font-bold uppercase tracking-widest italic">Un caractere special</p>
                    </div>
                </div>

                <div>
                    <label class="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-4">Date de naissance</label>
                    <input type="date" id="date_naissance" required class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none transition-all font-medium text-[#1A2B49]">
                    <p id="ageError" class="hidden text-[9px] text-red-500 font-bold uppercase mt-1 ml-4 tracking-widest italic">Vous devez avoir au moins 50 ans.</p>
                </div>

                <div id="seniorFields" class="space-y-5">
                    <div>
                        <label class="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-4">Rue</label>
                        <input type="text" id="rue" placeholder="12 rue de la Paix..." class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none transition-all font-medium placeholder:text-gray-300 text-[#1A2B49]">
                    </div>
                    <div>
                        <label class="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-4">Ville</label>
                        <input type="text" id="ville" placeholder="Paris..." class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none transition-all font-medium placeholder:text-gray-300 text-[#1A2B49]">
                    </div>
                </div>

                <div id="proFields" class="hidden space-y-5">
                    <div>
                        <label class="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-4">Type de prestataire</label>
                        <select id="id_type" class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none transition-all font-medium text-[#1A2B49]">
                            <option value="">Chargement...</option>
                        </select>
                        <p class="text-[9px] text-gray-400 mt-1 ml-4 italic">Determine les documents obligatoires a fournir</p>
                    </div>
                    <div>
                        <label class="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-4">Nom de l'entreprise</label>
                        <input type="text" id="nom_entreprise" placeholder="Silver Pro SARL" class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none transition-all font-medium placeholder:text-gray-300 text-[#1A2B49]">
                    </div>
                    <div>
                        <label class="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-4">N SIRET</label>
                        <input type="text" id="siret" placeholder="14 chiffres" maxlength="14" class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none transition-all font-medium placeholder:text-gray-300 text-[#1A2B49]">
                    </div>
                    <div>
                        <label class="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-4">Telephone professionnel</label>
                        <input type="tel" id="telephone_pro" placeholder="01..." maxlength="10" class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none transition-all font-medium placeholder:text-gray-300 text-[#1A2B49]">
                    </div>
                    <div>
                        <label class="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-4">Adresse professionnelle</label>
                        <input type="text" id="adresse_pro" placeholder="Adresse pro..." class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none transition-all font-medium placeholder:text-gray-300 text-[#1A2B49]">
                    </div>
                    <div>
                        <label class="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-4">Statut juridique</label>
                        <select id="statut_juridique" class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none transition-all font-medium text-[#1A2B49]">
                            <option value="auto-entrepreneur">Auto-entrepreneur</option>
                            <option value="SARL">SARL</option>
                            <option value="SAS">SAS</option>
                            <option value="EURL">EURL</option>
                            <option value="Autre">Autre</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-4">Bio / Presentation</label>
                        <textarea id="bio" placeholder="Votre parcours..." rows="3" class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none transition-all font-medium placeholder:text-gray-300 text-[#1A2B49] resize-none"></textarea>
                    </div>
                </div>

                <div class="flex justify-center">
                    <div class="g-recaptcha" data-sitekey="6LcmXpwsAAAAANacd5JK7B-M9MxUCSmnQBF_6LB8"></div>
                </div>
                <p id="error-captcha" class="hidden text-[9px] text-red-500 font-bold uppercase text-center tracking-widest">Veuillez valider le captcha.</p>

                <button type="submit" id="submitBtn" class="w-full bg-[#1A2B49] text-white font-black uppercase text-xs tracking-[0.2em] py-5 rounded-2xl shadow-lg hover:bg-[#7CABD3] transition-all transform hover:-translate-y-1">
                    S'inscrire
                </button>

            </form>

            <div class="mt-8 pt-6 border-t border-gray-100 text-center">
                <p class="text-gray-500 text-xs font-medium">
                    Deja inscrit ?
                    <a href="login.php" class="text-[#1A2B49] font-black uppercase ml-1 hover:text-[#7CABD3] transition-colors">Se connecter</a>
                </p>
            </div>
        </div>
    </div>

    <script src="../js/users/register.js?v=<?php echo time(); ?>" defer></script>
</body>
</html>