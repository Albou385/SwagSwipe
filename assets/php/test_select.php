require_once 'connexion.php';

try {
    $stmt = $pdo->query("SELECT id_user, nom, prenom FROM utilisateur");
    echo "<h2>Utilisateurs enregistrés :</h2>";
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo "👤 {$row['prenom']} {$row['nom']} (ID: {$row['id_user']})<br>";
    }
} catch (PDOException $e) {
    echo "❌ Erreur de lecture : " . $e->getMessage();
}
