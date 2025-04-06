<?php
require_once 'connexion.php';

// Définir le header JSON
header('Content-Type: application/json');

// Vérifier si les champs nécessaires sont présents
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
    // Préparer la requête SQL
    $stmt = $pdo->prepare("SELECT * FROM utilisateur WHERE adresse_courriel = ?");
    $stmt->execute([$email]);

    $utilisateur = $stmt->fetch(PDO::FETCH_ASSOC);

    // Vérification : utilisateur trouvé
    if (!$utilisateur) {
        echo json_encode([
            'success' => false,
            'message' => 'Aucun utilisateur trouvé avec cet email.'
        ]);
        exit;
    }

    // Vérification : mot de passe (actuellement en clair — à remplacer par hashé plus tard)
    if ($motDePasse !== $utilisateur['mdp']) {
        echo json_encode([
            'success' => false,
            'message' => 'Mot de passe incorrect.'
        ]);
        exit;
    }

    // Supprimer le mot de passe du tableau avant envoi
    unset($utilisateur['mdp']);

    // ✅ Réponse positive
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
