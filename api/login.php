<?php
require_once(__DIR__ . "/utils/utils.php");

header("Content-Type: application/json");

$response = [];

try {
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $data = json_decode(file_get_contents("php://input"), true);
        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';

        if (loginUser($email, $password)) {
            $response['status'] = 'success';
            $response['message'] = 'Connexion réussie.';
            $response['redirect'] = '/accueil'; // Redirige vers accueil, change au besoin
        } else {
            $response['status'] = 'error';
            $response['message'] = 'Courriel ou mot de passe invalide.';
            $response['redirect'] = '/login';
        }
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Méthode de requête invalide.';
    }
} catch (Exception $e) {
    $response['status'] = 'error';
    $response['message'] = 'Erreur : ' . $e->getMessage();
}

echo json_encode($response);
?>
