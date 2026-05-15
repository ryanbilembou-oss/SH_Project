<?php
session_start();

function requireLogin() {
    if (!isset($_SESSION['id_user']) || !isset($_SESSION['role'])) {
        error_log("Session manquante — redirect login");
        header('Location: /users/login.php');
        exit;
    }
}

function verifie_role($role) {
    requireLogin();

    if ($_SESSION['role'] !== $role) {
        error_log("Mauvais rôle: " . $_SESSION['role'] . " attendu: " . $role);

        if ($role === 'admin') {
            header('Location: /admin/login_admin.php');
        } else {
            header('Location: /users/login.php');
        }
        exit;
    }

    if ($role === 'senior') {
        checkSeniorAccess();
    } elseif ($role === 'pro') {
        checkProAccess();
    }
}


function requireRole($role) {
    verifie_role($role);
}

function checkSeniorAccess() {

    if (isset($_SESSION['is_subscription_valid']) && !$_SESSION['is_subscription_valid']) {
        $page = basename($_SERVER['PHP_SELF']);

        $pagesLibres = ['abonnement.php', 'profil.php', 'logout.php'];
        if (!in_array($page, $pagesLibres)) {
            header('Location: /users/seniors/abonnement.php');
            exit;
        }
    }
}
function checkProAccess() {
    $page = basename($_SERVER['PHP_SELF']);
    $pagesLibresDocuments = ['upload_documents.php', 'dossier_refuse.php', 'logout.php'];
    $pagesLibresAbonnement = ['abonnement_pro.php', 'profil_pro.php', 'upload_documents.php', 'dossier_refuse.php', 'logout.php'];

    $statut = $_SESSION['statut_validation'] ?? null;

    if ($statut === 'en_attente' || $statut === 'refuse' || $statut === null) {
        if (!in_array($page, $pagesLibresDocuments)) {
            header('Location: /users/pro/upload_documents.php');
            exit;
        }
        return;
    }

    if (isset($_SESSION['is_subscription_valid']) && !$_SESSION['is_subscription_valid']) {
        if (!in_array($page, $pagesLibresAbonnement)) {
            header('Location: /users/pro/abonnement_pro.php');
            exit;
        }
    }
}


function getUser() {
    return [
        'id_user'            => $_SESSION['id_user']            ?? null,
        'email'              => $_SESSION['email']              ?? null,
        'role'               => $_SESSION['role']               ?? null,
        'is_first_login'     => $_SESSION['is_first_login']     ?? true,
        'statut_validation'  => $_SESSION['statut_validation']  ?? null,
        'is_subscription_valid' => $_SESSION['is_subscription_valid'] ?? false,
    ];
}
?>