<nav class="bg-white px-6 pt-4 shadow-sm border-b-2 border-[#FCE297] sticky top-0 z-50">
    <div class="container mx-auto flex flex-col gap-4">
        <div class="flex justify-between items-center w-full">
            <a href="/users/seniors/accueil_senior.php"><img src="/img/logo.png" alt="Logo Silver Happy" class="h-14"></a>
            <div class="flex items-center gap-4">
                <a href="/users/seniors/profil.php" class="inline-block px-6 py-3 bg-[#7CABD3] rounded-full shadow text-white hover:text-[#7CABD3] hover:bg-white border-2 border-[#7CABD3] transition-all font-bold">Mon profil</a>
                <a href="/users/logout.php" onclick="localStorage.clear()" class="inline-block px-6 py-3 text-[#7CABD3] bg-white hover:text-white hover:bg-[#7CABD3] border-2 border-[#7CABD3] rounded-full shadow transition-all font-bold">Déconnexion</a>
            </div>
        </div>
        <div class="flex pb-4 gap-8 mx-auto justify-center flex-wrap text-base">
            <?php $page = basename($_SERVER['PHP_SELF']); ?>
            <a href="/users/seniors/accueil_senior.php" class="flex items-center gap-2 font-bold pb-2 border-b-2 <?php echo $page === 'accueil_senior.php' ? 'border-[#FCE297] text-[#7CABD3]' : 'border-transparent hover:border-[#FCE297] hover:text-[#7CABD3]'; ?> transition-all">
                <iconify-icon icon="mdi:view-dashboard"></iconify-icon> Tableau de bord
            </a>
            <a href="/users/seniors/evenements.php" class="flex items-center gap-2 font-bold pb-2 border-b-2 <?php echo $page === 'evenements.php' ? 'border-[#FCE297] text-[#7CABD3]' : 'border-transparent hover:border-[#FCE297] hover:text-[#7CABD3]'; ?> transition-all">
                <iconify-icon icon="mdi:calendar"></iconify-icon> Événements
            </a>
            <a href="/users/seniors/services.php" class="flex items-center gap-2 font-bold pb-2 border-b-2 <?php echo $page === 'services.php' ? 'border-[#FCE297] text-[#7CABD3]' : 'border-transparent hover:border-[#FCE297] hover:text-[#7CABD3]'; ?> transition-all">
                <iconify-icon icon="mdi:briefcase"></iconify-icon> Services
            </a>
            <a href="/users/seniors/boutique.php" class="flex items-center gap-2 font-bold pb-2 border-b-2 <?php echo $page === 'boutique.php' ? 'border-[#FCE297] text-[#7CABD3]' : 'border-transparent hover:border-[#FCE297] hover:text-[#7CABD3]'; ?> transition-all">
                <iconify-icon icon="mdi:shopping"></iconify-icon> Boutique
            </a>
            <a href="/users/seniors/planning.php" class="flex items-center gap-2 font-bold pb-2 border-b-2 <?php echo $page === 'planning.php' ? 'border-[#FCE297] text-[#7CABD3]' : 'border-transparent hover:border-[#FCE297] hover:text-[#7CABD3]'; ?> transition-all">
                <iconify-icon icon="mdi:calendar-clock"></iconify-icon> Mon Planning
            </a>
            <a href="/users/seniors/devis.php" class="flex items-center gap-2 font-bold pb-2 border-b-2 <?php echo $page === 'devis.php' ? 'border-[#FCE297] text-[#7CABD3]' : 'border-transparent hover:border-[#FCE297] hover:text-[#7CABD3]'; ?> transition-all">
                <iconify-icon icon="mdi:file-document"></iconify-icon> Devis & Factures
            </a>
            <a href="/users/seniors/conseils.php" class="flex items-center gap-2 font-bold pb-2 border-b-2 <?php echo $page === 'conseils.php' ? 'border-[#FCE297] text-[#7CABD3]' : 'border-transparent hover:border-[#FCE297] hover:text-[#7CABD3]'; ?> transition-all">
                <iconify-icon icon="mdi:lightbulb"></iconify-icon> Conseils
            </a>
        </div>
    </div>
</nav>