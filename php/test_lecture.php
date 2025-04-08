<?php
require_once 'connexion.php'; // Assure-toi que ce chemin est correct

echo "<h2>✅ Connexion réussie à la base de données Azure</h2>";

try {
    $stmt = $pdo->query("SELECT id_user, nom, prenom FROM utilisateur");

    echo "<h3>👥 Utilisateurs dans la base :</h3>";
    echo "<ul>";

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo "<li>👤 {$row['prenom']} {$row['nom']} (ID: {$row['id_user']})</li>";
    }

    echo "</ul>";
} catch (PDOException $e) {
    echo "<p style='color:red;'>❌ Erreur de lecture : " . $e->getMessage() . "</p>";
}
?>