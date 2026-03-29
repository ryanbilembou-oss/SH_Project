<?php
session_start();

function requireLogin() {
    if (!isset($_SESSION['id_user']) || !isset($_SESSION['role'])) {
        error_log("Session manquante — redirect login");
        header('Location: /users/login.php');
        exit;
    }
}

function requireRole($role) {
    requireLogin();
    if ($_SESSION['role'] !== $role) {
        error_log("Mauvais role: " . $_SESSION['role'] . " != " . $role);
        header('Location: /users/login.php');
        exit;
    }
}

function getUser() {
    return [
        'id_user' => $_SESSION['id_user'] ?? null,
        'email' => $_SESSION['email'] ?? null,
        'role' => $_SESSION['role'] ?? null,
        'is_first_login' => $_SESSION['is_first_login'] ?? true,
        'statut_validation' => $_SESSION['statut_validation'] ?? null,
    ];
}
?>