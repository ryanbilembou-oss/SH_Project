<?php

session_start();
header("Content-Type: application/json");

$input = json_decode(file_get_contents("php://input"), true);

if (!$input || !isset($input['id_user'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Données manquantes"]);
    exit;
}

$_SESSION['id_user'] = (int)$input['id_user'];
$_SESSION['email'] = $input['email'];
$_SESSION['role'] = $input['role'];
$_SESSION['is_first_login'] = (bool)$input['is_first_login'];
$_SESSION['statut_validation'] = $input['statut_validation'] ?? '';


error_log("Session créée pour user " . $input['id_user'] . " role: " . $input['role']);

echo json_encode(["success" => true]);
?>