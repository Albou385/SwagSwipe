<?php
// Inclusion du fichier de connexion
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST["prenom"])) {
    // Connexion à la base de données
    try {
        $pdo = new PDO("mysql:host=localhost;dbname=swagswipe", "root", "", [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]);

        // Préparation de la requête
        $sql = "INSERT INTO utilisateur (nom, prenom, adresse_courriel, telephone, mdp, ville, pays, code_postal) 
                VALUES (:nom, :prenom, :email, :telephone, :mdp, :ville, :pays, :code_postal)";
        $stmt = $pdo->prepare($sql);

        // Exécution avec les valeurs du formulaire
        $stmt->execute([
            'nom' => $_POST['nom'],
            'prenom' => $_POST['prenom'],
            'email' => $_POST['adresse_courriel'],
            'telephone' => $_POST['telephone'],
            'mdp' => $_POST['mdp'], // Toujours stocker un mot de passe haché
            'ville' => $_POST['ville'],
            'pays' => $_POST['pays'],
            'code_postal' => $_POST['code_postal'],
        ]);

        echo "Utilisateur ajouté avec succès !";
    } catch (PDOException $e) {
        echo "Erreur : " . $e->getMessage();
    }
}
?>

