<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Détection automatique ou manuelle de l’environnement
// $isCloudEnv = getenv('CLOUD_ENV') === 'true';
$isCloudEnv = false;

// Paramètres de base
$db   = "swagswipe";
$charset = 'utf8mb4';
$port = '3306';

if ($isCloudEnv) {
    // ➤ ENVIRONNEMENT CLOUD (Azure)
    $host = "swagswipeserveur.mysql.database.azure.com";
    $user = "xavier123";
    $pass = "Swagswipe1234";
    //$ssl_ca = __DIR__ . '/certs/DigiCertGlobalRootCA.crt.pem'; // adapte le chemin

    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
        //PDO::MYSQL_ATTR_SSL_CA       => $ssl_ca,
        //PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => false,
    ];
} else {
    // ➤ ENVIRONNEMENT LOCAL (XAMPP)
    $host = "127.0.0.1";  // localhost
    $user = "root";
    $pass = "";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
}

// Construction du DSN
$dsn = "mysql:host=$host;port=$port;dbname=$db;charset=$charset";

// Connexion à la base de données
try {
    $GLOBALS['pdo'] = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    throw new \PDOException($e->getMessage(), (int)$e->getCode());
}
