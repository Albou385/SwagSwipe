<?php
session_start();
echo "<h1>Profil Utilisateur</h1>";

// Redirection si l'utilisateur n'est pas connecté
if (!isset($_SESSION['user_id'])) {
    header("Location: connexion.html");
    exit();
}

require_once "../php/connexion.php"; // Connexion à Azure

// Récupérer les infos de l'utilisateur
$stmt = $pdo->prepare("SELECT * FROM utilisateur WHERE id_user = ?");
$stmt->execute([$_SESSION['user_id']]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user) {
    die("Utilisateur introuvable.");
}

// Traitement du formulaire si soumis
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $ville = $_POST['ville'];
    $code_postal = $_POST['code_postal'];
    $nouveau_mdp = $_POST['nouveau_mdp'];

    $sql = "UPDATE utilisateur SET email = ?, ville = ?, code_postal = ?";
    $params = [$email, $ville, $code_postal];

    if (!empty($nouveau_mdp)) {
        $mdp_hash = password_hash($nouveau_mdp, PASSWORD_DEFAULT);
        $sql .= ", mdp = ?";
        $params[] = $mdp_hash;
    }

    $sql .= " WHERE id_user = ?";
    $params[] = $_SESSION['user_id'];

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    echo "<script>alert('✅ Profil mis à jour avec succès !'); window.location.href='profil.php';</script>";
    exit();
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Profil - SwagSwipe</title>
  <link rel="stylesheet" href="./assets/css/styleAccueil.css">
</head>
<body class="body-style">
  <header class="header-style">
    <img src="./assets/img/logo.png" alt="logo" class="logo">
    <h1 class="site-title"><a href="swipe.html">SwagSwipe</a></h1>
    <p class="slogan">Le style à petit prix</p>
    <div class="nav-style">
      <button class="nav-button" onclick="window.location.href='accueil.html'">Accueil</button>
      <button class="nav-button" onclick="window.location.href='afficher_produits.html'">Produits</button>
      <button class="nav-button" onclick="window.location.href='favoris.html'">Favoris</button>
      <button class="nav-button" onclick="window.location.href='profil.php'">Profil</button>
    </div>
  </header>

  <div class="profil">
    <img class="pdp" src="https://cdn-icons-png.flaticon.com/512/11789/11789135.png" alt="Photo de Profil" />
    <h2><?php echo htmlspecialchars($user['prenom'] . ' ' . $user['nom']); ?></h2>

    <form method="POST" action="">
      <label>Email :</label><br>
      <input type="email" name="email" value="<?php echo htmlspecialchars($user['email']); ?>" required><br><br>

      <label>Ville :</label><br>
      <input type="text" name="ville" value="<?php echo htmlspecialchars($user['ville']); ?>" required><br><br>

      <label>Code postal :</label><br>
      <input type="text" name="code_postal" value="<?php echo htmlspecialchars($user['code_postal']); ?>" required><br><br>

      <label>Mot de passe (laisser vide pour ne pas modifier) :</label><br>
      <input type="password" name="nouveau_mdp"><br><br>

      <input class="nav-button" type="submit" value="Mettre à jour">
    </form>
  </div>

  <footer>
    <div class="droit_auteur">
      <p>&copy; 2025 SwagSwipe</p>
    </div>
  </footer>
</body>
</html>
