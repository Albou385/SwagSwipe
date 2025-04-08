<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Determine the environment (local or cloud)
$isCloudEnv = getenv('CLOUD_ENV') == 'true';

// Local environment settings
$host = "SwagSwipe-db";
$db   = "mydatabase";
$user = "user";
$pass = "password";
$port = '3306';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;port=$port;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
    PDO::MYSQL_ATTR_SSL_CA       => '/path/to/ca-cert.pem',
    PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => false, // Set to true if you want to verify server certificate
];

try {
    // Declare the PDO object as a global variable
    $GLOBALS['pdo'] = new PDO($dsn, $user, $pass, $options);
    echo "Database connection successful.";
} catch (\PDOException $e) {
    throw new \PDOException($e->getMessage(), (int)$e->getCode());
}
