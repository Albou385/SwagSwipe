<?php
require_once(__DIR__ . "/utils/utils.php");

header("Content-Type: application/json");

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Réinitialiser et détruire la session
$_SESSION = [];
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}
session_destroy();

echo json_encode([
    'status' => 'success',
    'message' => 'Déconnexion réussie',
    'redirect' => '/login'
]);
?>
