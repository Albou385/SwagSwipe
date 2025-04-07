<?php
$host = 'swagswipeserveur.mysql.database.azure.com';
$dbname = 'SwagSwipe';
$username = 'adminSwag';
$password = 'SwaggySwipe123';
$sslCertPath = __DIR__ . '/../BaltimoreCyberTrustRoot.crt.pem';

$options = [
    PDO::MYSQL_ATTR_SSL_CA => $sslCertPath,
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
];

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
            PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => false, // ← ajoute ça
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]
    );
    
    //echo "✅ Connexion réussie à la base de données Azure !";
} catch (PDOException $e) {
    echo "❌ Erreur de connexion : " . $e->getMessage();
    exit();
}
?>
