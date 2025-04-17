<?php
/**
 *  GET /api/products
 *      → { status:'success', data:[ … ] }
 *        ‑ ?categorie=soulier  pour filtrer
 *
 *  GET /api/products?id=123
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
$idProd    = isset($_GET['id'])        ? (int)$_GET['id']        : 0;
$categorie = isset($_GET['categorie']) ? $_GET['categorie']      : null;
$userId    = isset($_GET['user_id'])   ? (int)$_GET['user_id']   : null;
$limit     = isset($_GET['limit'])     ? (int)$_GET['limit']     : null;
$offset    = isset($_GET['offset'])    ? (int)$_GET['offset']    : 0;

/* ----------  Requête produits (+ moyenne)  ---------- */
$sql = <<<SQL
SELECT  p.*,
        u.nom AS vendeur_nom,
        u.prenom AS vendeur_prenom,
        u.ville AS ville,
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
    // Handle both singular and plural forms of categories
    if (substr($categorie, -1) === 's') {
        $singular = substr($categorie, 0, -1);
        $conds[]  = '(p.categorie = ? OR p.categorie = ?)';
        $params[] = $categorie;
        $params[] = $singular;
    } else {
        $plural = $categorie . 's';
        $conds[]  = '(p.categorie = ? OR p.categorie = ?)';
        $params[] = $categorie;
        $params[] = $plural;
    }
}
if ($userId) {
    $conds[]  = 'p.id_user = ?';
    $params[] = $userId;
}
if ($conds) {
    $sql .= ' WHERE ' . implode(' AND ', $conds);
}

// Add ORDER BY and LIMIT clauses
$sql .= ' ORDER BY p.id_produit DESC';  // Newest first by default

if ($limit) {
    $sql .= ' LIMIT ?, ?';
    $params[] = $offset;
    $params[] = $limit;
}

try {
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $produits = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Add default country for all products
    foreach ($produits as &$p) {
        $p['pays'] = 'Canada'; // Default value since pays column doesn't exist
    }

    /* ----------  Ajout info "favori" si loggé  ---------- */
    if ($loggedIn && $produits) {
        $fav = $pdo->prepare('SELECT id_produit FROM favori WHERE id_user = ?');
        $fav->execute([$_SESSION['utilisateur']['id']]);
        $set = $fav->fetchAll(PDO::FETCH_COLUMN);      // [123, 456, …]

        foreach ($produits as &$p) {
            $p['favori'] = in_array($p['id_produit'], $set);
        }
    } else {
        // Set favori to false for non-logged in users
        foreach ($produits as &$p) {
            $p['favori'] = false;
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
        // Count total products for pagination
        if ($limit) {
            $countSql = "SELECT COUNT(*) FROM produit p";
            if ($conds) {
                $countSql .= ' WHERE ' . implode(' AND ', $conds);
            }
            $countStmt = $pdo->prepare($countSql);
            $countParams = array_slice($params, 0, count($params) - 2); // Remove LIMIT params
            $countStmt->execute($countParams);
            $totalCount = $countStmt->fetchColumn();
            
            echo json_encode([
                'status' => 'success', 
                'data' => $produits,
                'pagination' => [
                    'total' => $totalCount,
                    'offset' => $offset,
                    'limit' => $limit
                ]
            ]);
        } else {
            echo json_encode(['status' => 'success', 'data' => $produits]);
        }
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Erreur de base de données: ' . $e->getMessage()]);
}
?>