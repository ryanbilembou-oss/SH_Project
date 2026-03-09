<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy | Créer un Utilisateur</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body class="bg-gray-100 font-sans leading-normal tracking-normal">
    
    <div id="successToast" class="fixed top-5 left-1/2 transform -translate-x-1/2 -translate-y-full opacity-0 z-50 transition-all duration-500 ease-in-out">
        <div class="bg-green-600 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center space-x-3">
            <i class="fas fa-check-circle text-xl"></i>
            <span class="font-bold uppercase tracking-wide text-sm">Utilisateur créé avec succès !</span>
        </div>
    </div>

    <div class="flex flex-col md:flex-row">
        
        <?php include('../include/sidebar.php'); ?>

        <div class="main-content flex-1 bg-gray-100 mt-12 md:mt-0 pb-24 md:pb-5">
            
            <div class="bg-gray-800 pt-3">
                <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-6 shadow text-2xl text-white flex justify-between items-center">
                    <h3 class="font-bold pl-2 uppercase tracking-wide">Nouvel Utilisateur</h3>
                </div>
            </div>

            <div class="flex flex-wrap p-6 justify-center">
                <div class="w-full max-w-4xl">
                    <div class="bg-white border-transparent rounded-xl shadow-2xl overflow-hidden border border-gray-200 p-8">
                        
                        <form id="createFullUserForm" class="space-y-8">
                            
                            <div>
                                <h4 class="text-lg font-bold text-gray-700 border-b pb-2 mb-4"><i class="fas fa-lock text-blue-500 mr-2"></i> 1. Identifiants de connexion</h4>
                                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                        <input type="email" id="email" required class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                                        <p id="error-email" class="text-red-500 text-xs mt-1 hidden font-bold italic"></p>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Mot de passe *</label>
                                        <input type="password" id="password" required class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                                        <p id="error-password" class="text-red-500 text-xs mt-1 hidden font-bold italic"></p>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Rôle *</label>
                                        <select id="role" required class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white transition-all">
                                            <option value="" disabled selected>Choisir un rôle</option>
                                            <option value="senior">Senior (Client)</option>
                                            <option value="pro">Prestataire (Pro)</option>
                                            <option value="admin">Administrateur</option>
                                        </select>
                                        <p id="error-role" class="text-red-500 text-xs mt-1 hidden font-bold italic"></p>
                                    </div>
                                </div>


                            </div>

                            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center justify-between">
                                <div>
                                    <h4 class="font-bold text-gray-700">Générer le profil métier ?</h4>
                                    <p class="text-sm text-gray-500">Si décoché, seul le compte de connexion sera créé.</p>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" id="complete_profile" class="sr-only peer" disabled>
                                    <div class="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

<div id="profileSection" class="hidden space-y-6">
    <h4 class="text-lg font-bold text-gray-700 border-b pb-2"><i class="fas fa-id-card text-blue-500 mr-2"></i> 2. Informations du Profil</h4>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input type="text" id="nom" class="w-full px-4 py-2 border rounded-lg">
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
            <input type="text" id="prenom" class="w-full px-4 py-2 border rounded-lg">
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Genre</label>
            <select id="genre" class="w-full px-4 py-2 border rounded-lg bg-white">
                <option value="M">Homme</option>
                <option value="F">Femme</option>
                <option value="Autre">Autre</option>
            </select>
        </div>
    </div>

    <div id="fieldDateNaissance" class="hidden grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
            <input type="date" id="date_naissance" class="w-full px-4 py-2 border rounded-lg">
        </div>
    </div>

    <div id="fieldsSenior" class="hidden grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Téléphone Personnel</label>
            <input type="tel" id="telephone" class="w-full px-4 py-2 border rounded-lg">
        </div>
    </div>

    <div id="fieldsPro" class="hidden grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nom de l'entreprise</label>
            <input type="text" id="nom_societe" class="w-full px-4 py-2 border rounded-lg">
        </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">SIRET (14 chiffres)</label>
                                    <input type="text" id="siret" maxlength="14" class="w-full px-4 py-2 border rounded-lg transition-all">
                                    <p id="error-siret" class="text-red-500 text-xs mt-1 hidden font-bold italic"></p>
                                </div>
        <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Adresse Professionnelle</label>
            <input type="text" id="adresse_pro" placeholder="123 rue du commerce, 75000 Paris" class="w-full px-4 py-2 border rounded-lg">
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">RIB (IBAN)</label>
            <input type="text" id="rib" class="w-full px-4 py-2 border rounded-lg uppercase">
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Téléphone Pro</label>
            <input type="tel" id="telephone_pro" class="w-full px-4 py-2 border rounded-lg">
        </div>
        <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Bio / Présentation</label>
            <textarea id="bio" rows="3" class="w-full px-4 py-2 border rounded-lg"></textarea>
        </div>
    </div>
</div>

                            <div class="flex justify-end pt-6 border-t">
                                <button type="submit" class="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg flex items-center">
                                    <i class="fas fa-save mr-2"></i> Créer l'utilisateur
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const roleSelect = document.getElementById('role');
            const profileToggle = document.getElementById('complete_profile');
            const profileSection = document.getElementById('profileSection');
            
            const fieldsAdminSenior = document.getElementById('fieldsAdminSenior');
            const fieldsSenior = document.getElementById('fieldsSenior');
            const fieldsPro = document.getElementById('fieldsPro');

            roleSelect.addEventListener('change', (e) => {
                profileToggle.disabled = e.target.value === "";
                if(!profileToggle.checked) return;
                updateVisibility(e.target.value);
            });

            profileToggle.addEventListener('change', (e) => {
                if(e.target.checked) {
                    profileSection.classList.remove('hidden');
                    updateVisibility(roleSelect.value);
                } else {
                    profileSection.classList.add('hidden');
                }
            });

function updateVisibility(role) {

    document.getElementById('fieldDateNaissance').classList.add('hidden');
    document.getElementById('fieldsSenior').classList.add('hidden');
    document.getElementById('fieldsPro').classList.add('hidden');

    if(role === 'senior') {
        document.getElementById('fieldDateNaissance').classList.remove('hidden');
        document.getElementById('fieldsSenior').classList.remove('hidden');
    } else if(role === 'pro') {
        document.getElementById('fieldDateNaissance').classList.remove('hidden');
        document.getElementById('fieldsPro').classList.remove('hidden');
    }

}
        });
    </script>
    
    <script>
        document.addEventListener("DOMContentLoaded", () => {
            const form = document.getElementById("createFullUserForm");
            
            form.addEventListener("submit", async (e) => {

                e.preventDefault();
                

                const role = document.getElementById("role").value;
                const isComplete = document.getElementById("complete_profile").checked;
                
                const userData = {
                    email: document.getElementById("email").value,
                    password_hash: document.getElementById("password").value,
                    role: role,
                    is_profile_completed: isComplete ? 1 : 0,
                };

                if (isComplete) {
                    userData.nom = document.getElementById("nom").value;
                    userData.prenom = document.getElementById("prenom").value;
                    userData.genre = document.getElementById("genre").value;

                    if (role === "senior") {
                        userData.date_naissance = document.getElementById("date_naissance").value;
                        userData.telephone = document.getElementById("telephone").value;
                    } else if (role === "pro") {
                        userData.date_naissance = document.getElementById("date_naissance").value;
                        userData.nom_societe = document.getElementById("nom_societe").value;
                        userData.adresse_pro = document.getElementById("adresse_pro").value;
                        userData.siret = document.getElementById("siret").value;
                        userData.rib = document.getElementById("rib").value;
                        
                        const bioElement = document.getElementById("bio");
                        userData.bio = bioElement ? bioElement.value : "";
                        userData.telephone_pro = document.getElementById("telephone_pro").value;
                    }
                }


                try {

                    const response = await fetch("http://localhost:8082/admin/users/create", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(userData),
                    });

                    if (response.ok) {
                        alert("✅ Utilisateur créé avec succès !");
                        window.location.href = "admin_users.php";
                    } else {
                        const errorMsg = await response.text();
                        alert("❌ Erreur de l'API Go : " + errorMsg);
                    }
                } catch (error) {
                    alert("❌ Erreur réseau : Impossible de contacter l'API Go sur localhost:8082");
                }
            });
        });
    </script>
</body>
</html>