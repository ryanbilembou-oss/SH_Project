<?php
session_start();

// On accepte les données de deux façons pour être sûr
if (isset($_POST['email'])) {
    $_SESSION['utilisateur_connecte'] = true;
    $_SESSION['user_email'] = $_POST['email'];
    echo "SESSION_OK"; 
} else {
    // Si ça arrive ici, c'est que le JS n'a pas bien envoyé l'email
    echo "ERREUR_EMAIL_MANQUANT";
}
?>