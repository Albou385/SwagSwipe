

<?php
session_start(); // Démarrer la session

// Connexion à la base de données
$host = "localhost";
$dbname = "SwagSwipe"; 
$username = "root";  // Change avec ton utilisateur MySQL
$password = "";      // Change si besoin

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $email = $_POST["email"];
        $mdp = $_POST["mot_de_passe"];

        // Vérifier si l'utilisateur existe
        $stmt = $pdo->prepare("SELECT * FROM utilisateur WHERE email = :email");
        $stmt->execute([":email" => $email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        //&& password_verify($mdp, $user["mdp"])
        if ($user && password_verify($mdp, $user["mdp"])) {
            // Connexion réussie -> Stocker les infos dans $_SESSION
            $_SESSION["id_user"] = $user["id_user"];
            $_SESSION["nom"] = $user["nom"];
            $_SESSION["prenom"] = $user["prenom"];
            $_SESSION["email"] = $user["email"];
            $_SESSION["role"] = $user["role"];

            echo "<script>
                    alert('Connexion réussie ! Bienvenue, " . $user["prenom"] . "');
                    window.location.href = '../../html/accueil.html'; // Rediriger vers la page principale
                  </script>";
        } else {
            echo "<script>
                alert('Identifiants incorrects.');
                window.location.href = '../../html/connexion.html'; // Rediriger vers la page principale
                </script>";
        }
    }
} catch (PDOException $e) {
    die("Erreur : " . $e->getMessage());
}
?>
