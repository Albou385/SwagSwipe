<?php

require_once 'connexion.php'; // Ajuste le chemin si nécessaire

// Vérifier si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $prenom = $_POST["prenom"];
    $nom = $_POST["nom"];
    $email = $_POST["email"];
    $telephone = $_POST["telephone"];
    $numero_civique = $_POST["numero_civil"];
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
    $verif = $pdo->prepare("SELECT * FROM utilisateur WHERE email = ?");
    $verif->execute([$email]);

    if ($verif->rowCount() > 0) {
        die("Cet email est déjà utilisé !");
    }

    // Insérer l'utilisateur dans la base de données
<<<<<<< HEAD
    $requete = $pdo->prepare("INSERT INTO utilisateur 
        (nom, prenom, email, telephone, mdp, num_civique, rue, ville, code_postal, role)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    $requete->execute([
        $nom,
        $prenom,
        $email,
        $telephone,
        $mot_de_passe,
        $numero_civil,
        $rue,
        $ville,
        $code_postal,
        'usager'
    ]);


=======
    $requete = $pdo->prepare("INSERT INTO utilisateur (nom, prenom, email, telephone, mdp, num_civique, rue, ville, code_postal, role)
                              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $requete->execute([$nom, $prenom, $email, $telephone, $mot_de_passe, $numero_civique, $rue, $ville, $code_postal, 'usager']);
>>>>>>> aaf2dc172c84c660dc5805d091eafe0d3b9eaf79

    echo "<script>
        alert('Votre compte a bien été créé. Vous pouvez maintenant vous connecter.');
        window.location.href = '../../html/connexion.html';
        </script>";

    //header("Location: ../../html/connexion.html");
    //exit();

}
?>

