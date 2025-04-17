<?php
require_once(__DIR__ . "/utils/utils.php");

header("Content-Type: application/json");

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

if (isset($_SESSION['user_loggedin']) && isset($_SESSION['user_details'])) {
    echo json_encode([
        'status' => 'success',
        'data' => $_SESSION['user_details']
    ]);
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Utilisateur non connecté',
        'redirect' => '/login'
    ]);
}
?>
    