

<?php
// Configuration de la base de données
$host = 'localhost'; // Nom d'hôte de la base de données (par exemple, 'localhost')
$dbname = 'SwagSwipe'; // Nom de la base de données
$username = 'root'; // Nom d'utilisateur de la base de données
$password = ''; // Mot de passe de la base de données

// Tentative de connexion
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    // Configuration pour afficher les erreurs en mode développement
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connexion réussie à la base de données !<br> Httdocs";


} catch (PDOException $e) {
    echo "Erreur de connexion à la base de données : " . $e->getMessage();
    echo "Test";
    exit();
}
?>