<?php $role = $_SESSION['role'] ?? null; ?>

<?php if ($role === 'senior'): ?>
<nav class="bg-white px-6 pt-4 shadow-sm border-b-2 border-[#FCE297] sticky top-0 z-50">
    <div class="container mx-auto flex flex-col gap-4">
        <div class="flex justify-between items-center w-full">
            <a href="/users/seniors/accueil_senior.php"><img src="/img/logo.png" alt="Logo Silver Happy" class="h-14"></a>
            <div class="flex items-center gap-4">
                <a href="/users/seniors/profil.php" id="profil" class="inline-block px-6 py-3 bg-[#7CABD3] rounded-full shadow text-white hover:text-[#7CABD3] hover:bg-white border-2 border-[#7CABD3] transition-all font-fira">Mon profil</a>
                <a href="/logout.php" onclick="localStorage.clear()" id="deconnexion" class="inline-block px-6 py-3 text-[#7CABD3] bg-white hover:text-white hover:bg-[#7CABD3] border-2 border-[#7CABD3] rounded-full shadow transition-all font-fira">Déconnexion</a>
                <a href="/users/seniors/panier/panier.php" id="panier" class="flex items-center gap-2 font-fira pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all">
                    <iconify-icon icon="mdi:cart-plus"></iconify-icon>
                </a>
            </div>
        </div>
        <div class="flex pb-4 gap-8 mx-auto justify-center flex-wrap text-base">
            <a href="/users/seniors/accueil_senior.php" id="tab-bord" class="flex items-center gap-2 font-fira pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all">
                <iconify-icon icon="mdi:view-dashboard"></iconify-icon> Tableau de bord
            </a>
            <a href="/users/seniors/evenement/evenements.php" id="event" class="flex items-center gap-2 font-fira pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all">
                <iconify-icon icon="mdi:calendar"></iconify-icon> Événements
            </a>
            <a href="/users/seniors/services.php" id="services" class="flex items-center gap-2 font-fira pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all">
                <iconify-icon icon="mdi:briefcase"></iconify-icon> Services
            </a>
            <a href="/users/seniors/boutique.php" id="boutique" class="flex items-center gap-2 font-fira pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all">
                <iconify-icon icon="mdi:shopping"></iconify-icon> Boutique
            </a>
            <a href="/users/seniors/planning.php" id="planning" class="flex items-center gap-2 font-fira pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all">
                <iconify-icon icon="mdi:calendar-clock"></iconify-icon> Mon Planning
            </a>
            <a href="/users/seniors/devis.php" id="devisfacture" class="flex items-center gap-2 font-fira pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all">
                <iconify-icon icon="mdi:file-document"></iconify-icon> Devis & Factures
            </a>
            <a href="/users/seniors/conseils.php" id="conseils" class="flex items-center gap-2 font-fira pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all">
                <iconify-icon icon="mdi:lightbulb"></iconify-icon> Conseils
            </a>
            <a href="/users/seniors/interventions_senior.php" id="interventions" class="flex items-center gap-2 font-fira pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all">
    <iconify-icon icon="mdi:calendar-check"></iconify-icon> Mes Interventions
</a>
<a href="/users/seniors/messagerie_senior.php" id="messagerie" class="flex items-center gap-2 font-fira pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all">
    <iconify-icon icon="mdi:message-text"></iconify-icon> Messagerie
</a>


        </div>
    </div>
</nav>

<?php elseif ($role === 'pro'): ?>
<nav class="bg-white px-6 pt-4 shadow-sm border-b-2 border-[#FCE297] sticky top-0 z-50">
    <div class="container mx-auto flex flex-col gap-4">
        <div class="flex justify-between items-center w-full">
            <a href="/users/pro/accueil_pro.php"><img src="../../img/logo.png" alt="Logo Silver Happy" class="h-14"></a>
            <div class="flex items-center gap-4">
                <a href="/users/pro/profil_pro.php" id="profil" class="inline-block px-6 py-3 bg-[#7CABD3] rounded-full shadow text-white hover:text-[#7CABD3] hover:bg-white border-2 border-[#7CABD3] transition-all font-fira">Mon profil</a>
                <a href="/logout.php" onclick="localStorage.clear()" id="deconnexion" class="inline-block px-6 py-3 text-[#7CABD3] bg-white hover:text-white hover:bg-[#7CABD3] border-2 border-[#7CABD3] rounded-full shadow transition-all font-fira">Déconnexion</a>
            </div>
        </div>
        <div class="flex pb-4 gap-8 mx-auto justify-center flex-wrap text-base">
            <a href="/users/pro/accueil_pro.php" id="tab-bord" class="flex items-center gap-2 font-fira pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all">
                <iconify-icon icon="mdi:view-dashboard"></iconify-icon> Tableau de bord
            </a>
            <a href="/users/pro/interventions_pro.php" id="interventions" class="flex items-center gap-2 font-fira pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all">
                <iconify-icon icon="mdi:calendar-check"></iconify-icon> Interventions
            </a>
            <a href="/users/pro/offres_pro.php" id="offres" class="flex items-center gap-2 font-fira pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all">
                <iconify-icon icon="mdi:briefcase"></iconify-icon> Mes Offres
            </a>
            <a href="/users/pro/planning_pro.php" id="planning" class="flex items-center gap-2 font-fira pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all">
                <iconify-icon icon="mdi:calendar-clock"></iconify-icon> Mon Planning
            </a>
            <a href="/users/pro/devis_pro.php" id="devisfacture" class="flex items-center gap-2 font-fira pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all">
                <iconify-icon icon="mdi:file-document"></iconify-icon> Devis & Factures
            </a>
            <a href="/users/pro/avis_pro.php" id="avis" class="flex items-center gap-2 font-fira pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all">
                <iconify-icon icon="mdi:star"></iconify-icon> Mes Avis
            </a>
            <a href="/users/pro/demandes_pro.php" id="demandes" class="flex items-center gap-2 font-fira pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all">
                <iconify-icon icon="mdi:account-clock"></iconify-icon> Demandes
            </a>
            <a href="/users/pro/abonnement_pro.php" class="flex items-center gap-2 font-fira pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all">
                <iconify-icon icon="mdi:credit-card"></iconify-icon> Mon abonnement
            </a>
            <a href="/users/pro/messagerie_pro.php" id="messagerie" class="flex items-center gap-2 font-fira pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all">
                <iconify-icon icon="mdi:message-text"></iconify-icon> Messagerie
            </a><a href="/users/pro/negociation_pro.php" class="flex items-center gap-2 font-fira pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all">
                <iconify-icon icon="mdi:handshake"></iconify-icon> Négociation
            </a>
            <a href="/users/pro/referencement_pro.php" class="flex items-center gap-2 font-fira pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all">
                <iconify-icon icon="mdi:star-circle"></iconify-icon> Référencement
            </a>
        </div>
        
    </div>
</nav>

<?php endif; ?>