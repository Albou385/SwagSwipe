<?php
$host = '127.0.0.1';
$db = 'swagswipe';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';
$port = '3306';

$dsn = "mysql:host=$host;port=$port;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $GLOBALS['pdo'] = new PDO($dsn, $user, $pass, $options);
    echo "✅ Connexion à la base de données réussie.";
} catch (\PDOException $e) {
    die("❌ Erreur PDO : " . $e->getMessage());
}
