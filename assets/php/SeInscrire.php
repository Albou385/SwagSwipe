<?php

require_once 'connexion.php'; // Ajuste le chemin si nécessaire

// Vérifier si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $prenom = $_POST["prenom"];
    $nom = $_POST["nom"];
    $email = $_POST["email"];
    $telephone = $_POST["telephone"];
    $numero_civil = $_POST["numero_civil"];
    $rue = $_POST["rue"];
    $ville = $_POST["ville"];
    $code_postal = $_POST["code_postal"];
    $mot_de_passe = $_POST["mot_de_passe"];
    $confirmation_mdp = $_POST["confirmation_mdp"];

    // Vérifier si les mots de passe correspondent
    if ($mot_de_passe !== $confirmation_mdp) {
        die("Les mots de passe ne correspondent pas !");
    }
    
    // Vérifier si l'email existe déjà
    $verif = $pdo->prepare("SELECT * FROM utilisateur WHERE adresse_courriel = ?");
    $verif->execute([$email]);

    if ($verif->rowCount() > 0) {
        die("Cet email est déjà utilisé !");
    }
    echo $mot_de_passe;

    // Insérer l'utilisateur dans la base de données
    $requete = $pdo->prepare("INSERT INTO utilisateur (nom, prenom, adresse_courriel, telephone, mdp, ville, pays, code_postal, role) 
                              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $requete->execute([$nom, $prenom, $email, $telephone, $motDePasse, $ville, 'Canada', $code_postal, 'usager' ]);

    echo "<script>
        alert('Votre compte a bien été créé. Vous pouvez maintenant vous connecter.');
        window.location.href = '../../html/connexion.html';
        </script>";

    //header("Location: ../../html/connexion.html");
    //exit();

}
?>

