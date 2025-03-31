

<?php

//Connexion a la base de donnee
$host = "localhost"; // Adresse du serveur (127.0.0.1 en local)
$dbname = "swagswipe"; // Nom de la base de données
$username = "root"; // Nom d'utilisateur MySQL
$password = ""; // Mot de passe MySQL

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connexion réussie !<br>";

} catch (PDOException $e) {
    die("Erreur de connexion : " . $e->getMessage());
    echo "Test";
}



?>