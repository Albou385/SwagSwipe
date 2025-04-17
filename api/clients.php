<?php
require_once(__DIR__ . "/utils/utils.php");

header("Content-Type: application/json");

// Vérifie si l'utilisateur est connecté ET admin
if (isUserLoggedIn() && isAdmin()) {
    try {
        $pdo = $GLOBALS['pdo'];

        // Récupérer tous les utilisateurs
        $stmt = $pdo->prepare('SELECT id_user, nom, prenom, email, telephone, ville, code_postal, role FROM utilisateur');
        $stmt->execute();
        $utilisateurs = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'status' => 'success',
            'data' => $utilisateurs
        ]);
    } catch (PDOException $e) {
        echo json_encode([
            'status' => 'error',
            'message' => 'Erreur de base de données : ' . $e->getMessage()
        ]);
    } catch (Exception $e) {
        echo json_encode([
            'status' => 'error',
            'message' => 'Erreur inattendue : ' . $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Accès refusé',
        'redirect' => '/403'
    ]);
}
?>
