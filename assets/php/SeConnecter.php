<?php
require_once 'connexion.php';

header('Content-Type: application/json');

// Vérifie la présence des champs requis
if (!isset($_POST['email']) || !isset($_POST['mot_de_passe'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Champs requis manquants.'
    ]);
    exit;
}

$email = trim($_POST['email']);
$motDePasse = $_POST['mot_de_passe'];

try {
    $stmt = $pdo->prepare("SELECT * FROM utilisateur WHERE email = ?");
    $stmt->execute([$email]);

    $utilisateur = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$utilisateur) {
        echo json_encode([
            'success' => false,
            'message' => 'Aucun utilisateur trouvé avec cet email.'
        ]);
        exit;
    }

    if ($motDePasse !== $utilisateur['mdp']) {
        echo json_encode([
            'success' => false,
            'message' => 'Mot de passe incorrect.'
        ]);
        exit;
    }

    unset($utilisateur['mdp']); // Ne pas exposer le mot de passe

    echo json_encode([
        'success' => true,
        'utilisateur' => $utilisateur
    ]);

} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Erreur serveur : ' . $e->getMessage()
    ]);
    exit;
}
?>
