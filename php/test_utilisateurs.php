<?php
require_once 'connexion.php';

try {
    $stmt = $pdo->query("SELECT id_user, nom, prenom, email FROM utilisateur");
    echo "<h3>Utilisateurs enregistrés :</h3><ul>";
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo "<li>{$row['prenom']} {$row['nom']} — {$row['email']}</li>";
    }
    echo "</ul>";
} catch (PDOException $e) {
    echo "❌ Erreur lors de la lecture : " . $e->getMessage();
}
?>
