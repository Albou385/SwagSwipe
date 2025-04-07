<?php
// Connexion sécurisée à la base de données Azure avec test de requête

$host = 'swagswipeserveur.mysql.database.azure.com';
$dbname = 'SwagSwipe';
$username = 'adminSwag'; 
$password = 'SwaggySwipe123';
$sslCertPath = __DIR__ . '/../BaltimoreCyberTrustRoot.crt.pem';

if (!file_exists($sslCertPath)) {
    die("❌ Le certificat SSL n'a pas été trouvé à : $sslCertPath");
}

try {
    $pdo = new PDO(
        "mysql:host=$host;port=3306;dbname=$dbname;charset=utf8",
        $username,
        $password,
        [
            PDO::MYSQL_ATTR_SSL_CA => $sslCertPath,
            PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => false,
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]
    );

    echo "✅ Connexion réussie à la base de données Azure !<br>";

    // Requête de test
    $stmt = $pdo->query("SELECT id_user, nom, prenom FROM utilisateur");

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo "👤 {$row['prenom']} {$row['nom']} (ID: {$row['id_user']})<br>";
    }

} catch (PDOException $e) {
    echo "❌ Erreur de connexion ou de requête : " . $e->getMessage();
    exit();
}
?>
