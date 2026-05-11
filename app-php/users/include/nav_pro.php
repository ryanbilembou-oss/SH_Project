
<nav class="navbar navbar-expand-lg navbar-dark" style="background: linear-gradient(135deg, #1a3a5c 0%, #2d6a9f 100%); box-shadow: 0 2px 10px rgba(0,0,0,0.2);">
    <div class="container-fluid px-4">

        <a class="navbar-brand d-flex align-items-center gap-2" href="accueil_pro.php">
            <img src="../../img/logo-clear.png" alt="Silver Happy" height="40">
            <span class="fw-bold" style="font-size:1.1rem;">Espace Prestataire</span>
        </a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navPro">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navPro">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link " href="accueil_pro.php">
                        <i class="bi bi-house-door me-1"></i>Tableau de bord
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link " href="interventions_pro.php">
                        <i class="bi bi-calendar-check me-1"></i>Interventions
                    </a>
                </li>
                <li class = "nav-item">
                    <a href="/users/pro/demandes_pro.php" id="demandes" class="flex items-center gap-2 font-fira pb-2 border-b-2 border-transparent hover:border-[#FCE297] hover:text-[#7CABD3] transition-all">
                        <iconify-icon icon="mdi:account-clock"></iconify-icon> Demandes
                    </a>
                </li>
                
                <li class="nav-item">
                    <a class="nav-link " href="offres_pro.php">
                        <i class="bi bi-briefcase me-1"></i>Mes Offres
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link " href="planning_pro.php">
                        <i class="bi bi-clock me-1"></i>Planning
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link " href="avis_pro.php">
                        <i class="bi bi-star me-1"></i>Avis
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link " href="profil_pro.php">
                        <i class="bi bi-person me-1"></i>Mon Profil
                    </a>
                </li>
            </ul>

            <div class="d-flex align-items-center gap-3">
 
                <a href="messagerie_pro.php" class="text-white position-relative" title="Messagerie">
                    <i class="bi bi-chat-dots fs-5"></i>
                    <span id="badge-messages" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger d-none" style="font-size:.6rem;"></span>
                </a>

                <span class="text-white-50 d-none d-lg-inline" id="nav-nom-pro"></span>

                <a href="../../logout.php" class="btn btn-sm btn-outline-light">
                    <i class="bi bi-box-arrow-right me-1"></i>Déconnexion
                </a>
            </div>
        </div>
    </div>
</nav>