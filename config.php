<?php
// Démarrage de session si nécessaire
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Affichage des erreurs pour le développement local
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// ➤ Paramètres de connexion MySQL locale
$host     = '127.0.0.1';
$port     = '3306';
$db       = 'swagswipe';
$user     = 'root';
$pass     = '';
$charset  = 'utf8mb4';

// ➤ Construction du DSN (Data Source Name)
$dsn = "mysql:host=$host;port=$port;dbname=$db;charset=$charset";

// ➤ Options PDO
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

// ➤ Connexion à la base de données
try {
    $GLOBALS['pdo'] = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    exit("Erreur de connexion à la base de données : " . $e->getMessage());
}
