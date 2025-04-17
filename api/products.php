<?php
/**
 *  GET /api/produits
 *      → { status:'success', data:[ … ] }
 *        ‑ ?categorie=soulier  pour filtrer
 *
 *  GET /api/produits?id=123
 *      → { status:'success', data:{ … } }   (détails + moyenne + favori)
 */
require_once __DIR__ . '/utils/utils.php';
header('Content-Type: application/json');

$pdo      = $GLOBALS['pdo'];
$loggedIn = isLoggedIn();
$userId   = $loggedIn ? $_SESSION['utilisateur']['id'] : null;

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Méthode non permise']);
    exit;
}

/* ----------  Paramètres  ---------- */
$idProd   = isset($_GET['id'])        ? (int)$_GET['id']        : 0;
$categorie= isset($_GET['categorie']) ?        $_GET['categorie'] : null;

/* ----------  Requête produits (+ moyenne)  ---------- */
$sql = <<<SQL
SELECT  p.*,
        u.nom   AS vendeur_nom,
        u.prenom AS vendeur_prenom,
        (SELECT ROUND(AVG(a.note),2)
         FROM   avis a
         WHERE  a.id_produit = p.id_produit) AS note_moyenne
FROM    produit p
JOIN    utilisateur u ON u.id_user = p.id_user
SQL;

$conds = [];
$params = [];

if ($idProd) {
    $conds[]  = 'p.id_produit = ?';
    $params[] = $idProd;
}
if ($categorie) {
    $conds[]  = 'p.categorie = ?';
    $params[] = $categorie;
}
if ($conds) {
    $sql .= ' WHERE ' . implode(' AND ', $conds);
}

$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$produits = $stmt->fetchAll(PDO::FETCH_ASSOC);

/* ----------  Ajout info "favori" si loggé  ---------- */
if ($loggedIn && $produits) {
    $fav = $pdo->prepare('SELECT id_produit FROM favori WHERE id_user = ?');
    $fav->execute([$userId]);
    $set = $fav->fetchAll(PDO::FETCH_COLUMN);      // [123, 456, …]

    foreach ($produits as &$p) {
        $p['favori'] = in_array($p['id_produit'], $set);
    }
}

/* ----------  Réponse  ---------- */
if ($idProd) {
    if ($produits) {
        echo json_encode(['status' => 'success', 'data' => $produits[0]]);
    } else {
        http_response_code(404);
        echo json_encode(['status' => 'error', 'message' => 'Produit introuvable']);
    }
} else {
    echo json_encode(['status' => 'success', 'data' => $produits]);
}
?>
