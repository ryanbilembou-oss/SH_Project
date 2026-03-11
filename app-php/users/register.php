<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy - Inscription</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #FFFFF6; }
        .critere-valid { color: #16a34a; }
        .critere-invalid { color: #dc2626; }
        input:invalid { border-color: transparent; }
    </style>
</head>
<body class="min-h-screen flex items-center justify-center p-6 relative">

    <a href="index.php" class="absolute top-8 left-8 text-[#1A2B49] font-black uppercase text-[10px] tracking-widest flex items-center group">
        <span class="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span> Retour
    </a>

    <div class="max-w-lg w-full bg-white rounded-[40px] shadow-2xl p-10 relative overflow-hidden my-10">
        
        <div class="absolute -bottom-10 -left-10 w-32 h-32 bg-[#7CABD3]/20 rounded-full blur-3xl"></div>
        
        <div class="relative z-10">
            <div class="mb-8">
                <h2 class="text-3xl font-black uppercase tracking-tighter text-[#1A2B49] mb-2">Créer un <span class="text-[#7CABD3]">compte</span></h2>
                <p class="text-gray-400 text-sm font-medium italic">Rejoignez l'aventure Silver Happy.</p>
            </div>

            <form id="registerForm" class="space-y-5">
                
                <div id="etape1" class="space-y-5 transition-all duration-300">
                    <div>
                        <label class="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-4">Je suis un...</label>
                        <select id="role" name="role" required class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none transition-all font-medium">
                            <option value="senior" selected>Senior</option>
                            <option value="pro">Prestataire (Professionnel)</option>
                        </select>
                    </div>

                    <div class="flex gap-4">
                        <div class="w-1/2">
                            <label class="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-4">Nom</label>
                            <input type="text" id="nom" placeholder="Nom" required class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none transition-all font-medium placeholder:text-gray-300">
                        </div>
                        <div class="w-1/2">
                            <label class="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-4">Prénom</label>
                            <input type="text" id="prenom" placeholder="Prénom" required class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none transition-all font-medium placeholder:text-gray-300">
                        </div>
                    </div>

                    <div class="flex gap-4">
                        <div class="w-1/2">
                            <label class="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-4">Genre</label>
                            <select id="genre" class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none transition-all font-medium">
                                <option value="homme">Homme</option>
                                <option value="femme">Femme</option>
                                <option value="autre">Autre</option>
                            </select>
                        </div>
                        <div class="w-1/2">
                            <label class="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-4">Téléphone</label>
                            <input type="tel" id="telephone" placeholder="06..." required class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none transition-all font-medium placeholder:text-gray-300">
                        </div>
                    </div>

                    <div>
                        <label class="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-4">Identifiant (Email)</label>
                        <input type="email" id="email" placeholder="votre@email.com" required class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none transition-all font-medium placeholder:text-gray-300">
                    </div>
                    
                    <div>
                        <label class="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-4">Mot de passe</label>
                        <input type="password" id="password" placeholder="••••••••" required class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none transition-all font-medium placeholder:text-gray-300">
                        <div id="passwordCriteria" class="mt-3 ml-4 space-y-1">
                            <p id="crit-length" class="text-[9px] critere-invalid font-bold uppercase tracking-widest italic"> 8 caractères</p>
                            <p id="crit-number" class="text-[9px] critere-invalid font-bold uppercase tracking-widest italic"> Un chiffre</p>
                            <p id="crit-special" class="text-[9px] critere-invalid font-bold uppercase tracking-widest italic"> Un caractère spécial</p>
                        </div>
                    </div>

                    <div>
                        <label class="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-4">Date de naissance</label>
                        <input type="date" id="date_naissance" required class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none transition-all font-medium">
                        <p id="ageError" class="hidden text-[9px] text-red-600 font-bold uppercase mt-2 ml-4 tracking-widest italic">Vous n'êtes pas majeur pour acceder à notre plateforme.</p>
                    </div>

                    <div id="seniorFields">
                        <label class="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-4">Adresse complète</label>
                        <input type="text" id="adresse" placeholder="Votre adresse..." class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#16a34a] rounded-2xl outline-none transition-all font-medium placeholder:text-gray-300">
                    </div>

                    <div id="proTextFields" class="hidden space-y-5">
                        <div>
                            <label class="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-4">N° SIRET</label>
                            <input type="text" id="siret" placeholder="14 chiffres" class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none transition-all font-medium placeholder:text-gray-300">
                        </div>
                        <div>
                            <label class="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-4">Biographie</label>
                            <textarea id="bio" placeholder="Votre parcours..." class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#7CABD3] rounded-2xl outline-none transition-all font-medium h-24 resize-none placeholder:text-gray-300"></textarea>
                        </div>
                    </div>

                    <button type="submit" id="btnSubmitSenior" class="w-full bg-[#1A2B49] text-white font-black uppercase text-xs tracking-[0.2em] py-5 rounded-2xl shadow-lg hover:bg-[#16a34a] transition-all transform hover:-translate-y-1 opacity-50 cursor-not-allowed" disabled>S'inscrire</button>
                    <button type="button" id="btnSuivant" class="hidden w-full bg-[#1A2B49] text-white font-black uppercase text-xs tracking-[0.2em] py-5 rounded-2xl shadow-lg hover:bg-[#7CABD3] transition-all transform hover:-translate-y-1 opacity-50 cursor-not-allowed" disabled>Suivant</button>
                </div>

                <div id="etape2" class="hidden space-y-6 transition-all duration-300">
                    <div class="text-center mb-6">
                        <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Dernière étape : Vos documents</p>
                    </div>

                    <div class="space-y-6">
                        <div>
                            <label class="block text-[10px] font-black uppercase tracking-widest text-[#1A2B49] mb-3 ml-4 text-center">Pièce d'identité</label>
                            <input type="file" id="piece_identite" accept=".pdf, .jpg, .png, .jpeg" class="w-full px-6 py-4 bg-gray-50 border-2 border-dashed border-[#7CABD3] rounded-2xl outline-none text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:bg-[#1A2B49] file:text-white cursor-pointer">
                        </div>

                        <div>
                            <label class="block text-[10px] font-black uppercase tracking-widest text-[#1A2B49] mb-3 ml-4 text-center">Votre RIB</label>
                            <input type="file" id="document_rib" accept=".pdf, .jpg, .png, .jpeg" class="w-full px-6 py-4 bg-gray-50 border-2 border-dashed border-[#7CABD3] rounded-2xl outline-none text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:bg-[#1A2B49] file:text-white cursor-pointer">
                        </div>
                    </div>

                    <div class="flex gap-4">
                        <button type="button" id="btnPrecedent" class="w-1/3 bg-gray-100 text-[#1A2B49] font-black uppercase text-[10px] tracking-widest py-5 rounded-2xl hover:bg-gray-200 transition-all">Retour</button>
                        <button type="submit" id="btnSubmitPro" class="w-2/3 bg-[#16a34a] text-white font-black uppercase text-xs tracking-[0.2em] py-5 rounded-2xl shadow-lg hover:bg-green-700 transition-all transform hover:-translate-y-1">S'inscrire</button>
                    </div>
                </div>

            </form>
            
            <div class="mt-10 pt-6 border-t border-gray-100 text-center">
                <p class="text-gray-500 text-xs font-medium">
                    Déjà inscrit ? 
                    <a href="login.php" class="text-[#1A2B49] font-black uppercase ml-1 hover:text-[#7CABD3] transition-colors">Se connecter</a>
                </p>
            </div>
        </div>
    </div>
    <script src="js/users/register.js"></script>
</body>
</html>