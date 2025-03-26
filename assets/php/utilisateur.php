<?php
// Inclusion du fichier de connexion
require_once 'connexion.php';

// Validation des champs requis
$required_fields = ['prenom', 'nom', 'email', 'telephone', 'numero_civil', 'rue', 'ville', 'code_postal', 'mot_de_passe', 'confirmation_mdp'];
foreach ($required_fields as $field) {
    if (empty($_POST[$field])) {
        die("Erreur : Le champ $field est requis.");
    }
}

// Récupération des données du formulaire
$prenom = htmlspecialchars(trim($_POST['prenom']));
$nom = htmlspecialchars(trim($_POST['nom']));
$email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) ? $_POST['email'] : die("Email invalide");
$telephone = preg_match("/^[0-9]{10}$/", $_POST['telephone']) ? $_POST['telephone'] : die("Numéro de téléphone invalide");
$numero_civil = htmlspecialchars(trim($_POST['numero_civil']));
$rue = htmlspecialchars(trim($_POST['rue']));
$ville = htmlspecialchars(trim($_POST['ville']));
$code_postal = preg_match("/^[A-Za-z0-9]{3} [A-Za-z0-9]{3}$/", $_POST['code_postal']) ? $_POST['code_postal'] : die("Code postal invalide");
$mot_de_passe = $_POST['mot_de_passe'];
$confirmation_mdp = $_POST['confirmation_mdp'];

// Vérification de la correspondance des mots de passe
if ($mot_de_passe !== $confirmation_mdp) {
    die("Les mots de passe ne correspondent pas.");
}

// Hachage du mot de passe
$mot_de_passe_hash = password_hash($mot_de_passe, PASSWORD_BCRYPT);

// Gestion de l'upload de l'image
if ($_FILES['image_profil']['error'] == UPLOAD_ERR_OK) {
    $image_tmp = $_FILES['image_profil']['tmp_name'];
    $image_nom = basename($_FILES['image_profil']['name']);
    $extension = strtolower(pathinfo($image_nom, PATHINFO_EXTENSION));

    if ($extension != 'png') {
        die("Seuls les fichiers PNG sont autorisés.");
    }

    $chemin_image = "uploads/" . uniqid() . ".png";
    if (!move_uploaded_file($image_tmp, $chemin_image)) {
        die("Erreur lors du téléchargement de l'image.");
    }
} else {
    die("Erreur de téléchargement de l'image.");
}

// Insertion des données dans la base de données
try {
    $stmt = $pdo->prepare("INSERT INTO utilisateurs (prenom, nom, email, telephone, numero_civil, rue, ville, code_postal, mot_de_passe, image_profil) VALUES (:prenom, :nom, :email, :telephone, :numero_civil, :rue, :ville, :code_postal, :mot_de_passe, :image_profil)");

    $stmt->execute([
        'prenom' => $prenom,
        'nom' => $nom,
        'email' => $email,
        'telephone' => $telephone,
        'numero_civil' => $numero_civil,
        'rue' => $rue,
        'ville' => $ville,
        'code_postal' => $code_postal,
        'mot_de_passe' => $mot_de_passe_hash,
        'image_profil' => $chemin_image
    ]);

    echo "Inscription réussie !";
} catch (PDOException $e) {
    die("Erreur lors de l'insertion : " . $e->getMessage());
}
?>
