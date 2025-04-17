<?php
require_once(__DIR__ . "/utils/utils.php");

header("Content-Type: application/json");
$response = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    // Récupération des champs requis
    $nom = $data['nom'] ?? '';
    $prenom = $data['prenom'] ?? '';
    $email = $data['email'] ?? '';
    $telephone = $data['telephone'] ?? '';
    $password = $data['password'] ?? '';
    $num_civique = $data['num_civique'] ?? '';
    $rue = $data['rue'] ?? '';
    $ville = $data['ville'] ?? '';
    $code_postal = $data['code_postal'] ?? '';
    $role = $data['role'] ?? 'usager';

    $validRoles = ['admin', 'usager'];
    if (!in_array($role, $validRoles)) {
        $response['status'] = 'error';
        $response['message'] = 'Rôle invalide.';
        echo json_encode($response);
        exit;
    }

    global $pdo;
    $stmt = $pdo->prepare('SELECT * FROM utilisateur WHERE email = ?');
    $stmt->execute([$email]);

    if ($stmt->fetch()) {
        $response['status'] = 'error';
        $response['message'] = 'Un compte avec ce courriel existe déjà.';
    } else {
        $success = registerUser($nom, $prenom, $email, $telephone, $password, $num_civique, $rue, $ville, $code_postal, $role);
        if ($success) {
            $response['status'] = 'success';
            $response['message'] = 'Inscription réussie';
            $response['redirect'] = '/login';
        } else {
            $response['status'] = 'error';
            $response['message'] = 'Une erreur est survenue lors de l\'inscription.';
        }
    }
} else {
    $response['status'] = 'error';
    $response['message'] = 'Méthode invalide.';
}

echo json_encode($response);
?>
