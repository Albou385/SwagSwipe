<?php
// Informations de connexion
$host = "localhost";       // ou 127.0.0.1
$user = "root";            // par défaut avec XAMPP
$password = "";            // mot de passe vide par défaut
$database = "SwagSwipe"; // change ceci par le nom réel de ta base

// Créer la connexion
$conn = new mysqli($host, $user, $password, $database);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Échec de la connexion : " . $conn->connect_error);
} else {
    echo "Connexion réussie à la base de données.";
}
?>