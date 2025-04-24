<?php
require_once __DIR__ . '/utils/utils.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status'=>'error','message'=>'Méthode non permise']);
    exit;
}

try {
    // Validation minimale
    if (
        empty($_POST['nom']) || empty($_POST['prenom']) || empty($_POST['email']) ||
        empty($_POST['mdp']) || empty($_POST['telephone'])
    ) {
        throw new Exception("Certains champs obligatoires sont manquants.");
    }

    // Gestion de l’image
    $imagePath = '';
    if (isset($_FILES['image_profil']) && $_FILES['image_profil']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = __DIR__ . '/../frontend/img/users/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $ext = pathinfo($_FILES['image_profil']['name'], PATHINFO_EXTENSION);
        $filename = uniqid('avatar_') . '.' . $ext;
        $targetPath = $uploadDir . $filename;

        if (move_uploaded_file($_FILES['image_profil']['tmp_name'], $targetPath)) {
            $imagePath = 'img/users/' . $filename;
        } else {
            throw new Exception("Erreur lors de l’upload de l’image.");
        }
    }

    // Lecture des données POST
    $nom       = $_POST['nom'];
    $prenom    = $_POST['prenom'];
    $email     = $_POST['email'];
    $mdp       = $_POST['mdp'];
    $telephone = $_POST['telephone'];
    $numero    = $_POST['numero']        ?? '';
    $rue       = $_POST['rue']           ?? '';
    $ville     = $_POST['ville']         ?? '';
    $code_postal = $_POST['code_postal'] ?? '';
    $role      = 'usager';

    // Appel de la fonction d’inscription
    registerUser(
        $nom, $prenom, $email, $mdp, $telephone,
        $numero, $rue, $ville, $code_postal,
        $imagePath, $role
    );

    echo json_encode(['status'=>'success','redirect'=>'/login']);
} catch (Throwable $e) {
    http_response_code(400);
    echo json_encode(['status'=>'error','message'=>$e->getMessage()]);
}
