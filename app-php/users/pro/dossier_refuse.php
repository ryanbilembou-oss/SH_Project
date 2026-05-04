<?php
require_once('../../auth.php');

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Happy - Dossier refusé</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:wght@400;700;900&display=swap" rel="stylesheet">
    <link rel="icon" href="/img/logo-clear.png">
    <style>
        body { font-family: 'Fira Sans Condensed', sans-serif; background-color: #FFFFF6; font-size: 18px; }
    </style>
</head>
<body class="bg-[#FFFFF6] min-h-screen flex flex-col">

    <?php include('../include/navbar.php'); ?>

    <main class="flex-1 flex items-center justify-center px-4 py-16">
        <div class="max-w-xl w-full text-center">

            <iconify-icon icon="mdi:file-cancel" class="text-8xl text-red-300 mb-6 block"></iconify-icon>

            <h2 class="text-5xl font-fira uppercase tracking-tighter text-[#1A2B49] mb-4">
                Dossier <span class="text-red-400">refusé</span>
            </h2>

            <p class="text-gray-400 text-lg mb-2">
                Votre dossier de candidature n'a pas pu être validé par notre équipe.
            </p>
            <p class="text-gray-400 text-lg mb-10">
                Certains documents fournis ne répondent pas à nos critères de validation.
            </p>

            <div class="flex flex-col sm:flex-row gap-4 justify-center">

                <button onclick="resoumettresDossier()"
                  class="bg-[#7CABD3] text-white px-8 py-4 rounded-full shadow font-fira uppercase tracking-wide
                          hover:text-[#7CABD3] hover:bg-white border-2 border-[#7CABD3] transition-all duration-300">
                    <iconify-icon icon="mdi:folder-upload" class="mr-2"></iconify-icon>
                    Soumettre un nouveau dossier
                </button>

                <a href="mailto:contact@silverhappy.fr"
                   class="text-[#7CABD3] bg-white px-8 py-4 rounded-full shadow font-fira uppercase tracking-wide
                          hover:text-white hover:bg-[#7CABD3] border-2 border-[#7CABD3] transition-all duration-300">
                    <iconify-icon icon="mdi:email-outline" class="mr-2"></iconify-icon>
                    Contacter le support
                </a>
            </div>

            <p class="text-gray-300 text-sm mt-10 font-fira italic">
                Si vous pensez qu'il s'agit d'une erreur, contactez-nous à
                <a href="mailto:contact@silverhappy.fr" class="text-[#7CABD3] underline">contact@silverhappy.fr</a>
            </p>

        </div>
    </main>

    <?php include('../include/footer.php'); ?>

    <script>
        const API_BASE = "http://localhost:8082";
        const userId = Number(localStorage.getItem("id_user"));

        (async () => {
            try {
                const res = await fetch(`${API_BASE}/admin/profile_pro/getone?id=${userId}`);
                if (!res.ok) return;
                const profil = await res.json();
                if (profil.statut_validation === "valide") {
                    window.location.href = "/users/pro/accueil_pro.php";
                } else if (profil.statut_validation === "en_attente") {
                    window.location.href = "/users/pro/upload_documents.php";
                }
            } catch {}
        })();
        async function resoumettresDossier() {
    try {
        const res = await fetch(`${API_BASE}/admin/profile_pro/update_statut`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_user: userId, statut_validation: "en_attente" }),
        });
        if (res.ok) {
            window.location.href = "/users/pro/upload_documents.php";
        } else {
            alert("Erreur, veuillez réessayer.");
        }
    } catch {
        alert("Erreur réseau.");
    }
}
    </script>
</body>
</html>