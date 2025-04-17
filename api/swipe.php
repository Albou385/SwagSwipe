<?php
/**
 *  GET  /api/swipe         → Liste des produits à swiper (non likés)
 *  POST /api/swipe         → { id_produit: 123 } → ajoute au favori
 */

require_once __DIR__ . '/utils/utils.php';
header('Content-Type: application/json');

requireLogin();
$pdo   = $GLOBALS['pdo'];
$user  = $_SESSION['utilisateur']['id'];

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        // Produits que l’utilisateur n’a pas encore mis en favori
        $stmt = $pdo->prepare("
            SELECT p.*
            FROM produit p
            WHERE p.id_produit NOT IN (
                SELECT f.id_produit FROM favori f WHERE f.id_user = ?
            )
            ORDER BY RAND() LIMIT 10
        ");
        $stmt->execute([$user]);
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'status' => 'success',
            'data' => $rows
        ]);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        $idProd = (int)($data['id_produit'] ?? 0);

        if (!$idProd) {
            http_response_code(400);
            echo json_encode(['status'=>'error','message'=>'id_produit manquant']);
            exit;
        }

        try {
            $stmt = $pdo->prepare("
                INSERT IGNORE INTO favori (id_user, id_produit)
                VALUES (?, ?)
            ");
            $stmt->execute([$user, $idProd]);

            echo json_encode(['status'=>'success','message'=>'Produit liké']);
        } catch (Throwable $e) {
            http_response_code(500);
            echo json_encode(['status'=>'error','message'=>$e->getMessage()]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['status'=>'error','message'=>'Méthode non permise']);
}
