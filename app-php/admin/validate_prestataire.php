<?php

// session_start();
// if($_SESSION['role'] !== 'admin') { header('Location: login.php'); exit(); }

//$id_pro = $_GET['id'] ?? null;
//if (!$id_pro) { header('Location: admin_users.php'); exit(); 
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Validation Prestataire | Silver Happy</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body class="bg-gray-100 min-h-screen">
    <div class="flex flex-col md:flex-row">
        <?php include('../include/sidebar.php'); ?>

        <div class="flex-1 p-8">
            <div class="flex justify-between items-center mb-8">
                <h1 class="text-2xl font-bold text-gray-800 uppercase tracking-tight">
                    <i class="fas fa-user-shield mr-3 text-green-600"></i>Audit du Prestataire #<?php echo $id_pro; ?>
                </h1>
                <a href="admin_users.php" class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition">
                    <i class="fas fa-arrow-left mr-2"></i>Retour
                </a>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                <div class="space-y-6">
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                        <h2 class="text-sm font-black text-gray-400 uppercase mb-4 tracking-widest">Informations Commerciales</h2>
                        
                        <div class="space-y-4">
                            <div>
                                <label class="block text-xs font-bold text-gray-500 uppercase">Tarif Horaire Négocié (€)</label>
                                <input type="number" id="tarif_negocie" step="0.50" 
                                       class="w-full mt-1 p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none font-bold text-xl">
                                <p class="text-xs text-gray-400 mt-1 italic">Le tarif sera fixé par Silver Happy après audit.</p>
                            </div>

                            <div>
                                <label class="block text-xs font-bold text-gray-500 uppercase">Type de Référencement</label>
                                <select id="referencement" class="w-full mt-1 p-3 bg-gray-50 border border-gray-300 rounded-xl">
                                    <option value="standard">Standard (Gratuit)</option>
                                    <option value="premium">Premium (Visibilité +)</option>
                                    <option value="boost">Boost (Haut de page)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                        <h2 class="text-sm font-black text-gray-400 uppercase mb-4 tracking-widest">Actions Finales</h2>
                        <div class="grid grid-cols-2 gap-4">
                            <button onclick="updateStatus('refuse')" class="bg-red-100 text-red-700 font-bold py-4 rounded-xl hover:bg-red-200 transition">
                                <i class="fas fa-times-circle mr-2"></i>REJETER LE DOSSIER
                            </button>
                            <button onclick="updateStatus('valide')" class="bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-700 shadow-lg shadow-green-200 transition">
                                <i class="fas fa-check-circle mr-2"></i>VALIDER LE PROFIL
                            </button>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                    <h2 class="text-sm font-black text-gray-400 uppercase mb-6 tracking-widest">Documents "Patte Blanche"</h2>
                    
                    <div id="documentsContainer" class="space-y-4">
                        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                            <div class="flex items-center">
                                <i class="fas fa-file-pdf text-red-500 text-2xl mr-4"></i>
                                <div>
                                    <p class="font-bold text-gray-700">Extrait de Casier Judiciaire</p>
                                    <p class="text-xs text-gray-400">En attente de lecture</p>
                                </div>
                            </div>
                            <a href="#" target="_blank" class="text-blue-600 font-bold text-sm hover:underline">Consulter <i class="fas fa-external-link-alt ml-1"></i></a>
                        </div>
                        </div>
                </div>

            </div>
        </div>
    </div>

    <script>
        async function updateStatus(status) {
            const tarif = document.getElementById('tarif_negocie').value;
            const ref = document.getElementById('referencement').value;
            
            if(status === 'valide' && !tarif) {
                alert("⚠️ Vous devez fixer un tarif négocié avant de valider.");
                return;
            }

 
            console.log("Envoi de la validation...", {id: <?php echo $id_pro; ?>, status, tarif, ref});
        }
    </script>
</body>
</html>