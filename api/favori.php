<?php
/**
 *  GET  /api/favori            → retourne tous les id_produit favoris de l’utilisateur
 *  GET  /api/favori?id=123     → true | false si le produit est déjà en favori
 *  POST /api/favori            →  { "id_produit":123, "action":"add" | "remove" }
 */
require_once __DIR__ . '/utils/utils.php';
header('Content-Type: application/json');

requireLogin();                       // 401 si non connecté
$pdo   = $GLOBALS['pdo'];
$user  = $_SESSION['utilisateur']['id'];

switch ($_SERVER['REQUEST_METHOD']) {
    /* ----------  Lister  ---------- */
    case 'GET':
        $idProd = $_GET['id'] ?? null;
        if ($idProd) {
            $stmt = $pdo->prepare(
                'SELECT 1 FROM favori WHERE id_user = ? AND id_produit = ? LIMIT 1'
            );
            $stmt->execute([$user, $idProd]);
            echo json_encode(['status'=>'success','favori'=> (bool) $stmt->fetchColumn()]);
        } else {
            $fav = $pdo->prepare('SELECT id_produit FROM favori WHERE id_user = ?');
            $fav->execute([$user]);
            echo json_encode(['status'=>'success','data'=> $fav->fetchAll(PDO::FETCH_COLUMN)]);
        }
        break;

    /* ----------  Ajouter / Retirer  ---------- */
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $idProd = (int)($data['id_produit'] ?? 0);
        $action = $data['action']   ?? 'add';

        if (!$idProd) {
            http_response_code(400);
            echo json_encode(['status'=>'error','message'=>'id_produit requis']);
            exit;
        }

        try {
            if ($action === 'remove') {
                $stmt = $pdo->prepare(
                    'DELETE FROM favori WHERE id_user = ? AND id_produit = ?'
                );
                $stmt->execute([$user, $idProd]);
                echo json_encode(['status'=>'success','message'=>'Retiré des favoris']);
            } else {                                // default : add
                $stmt = $pdo->prepare(
                    'INSERT IGNORE INTO favori (id_user, id_produit) VALUES (?, ?)'
                );
                $stmt->execute([$user, $idProd]);
                echo json_encode(['status'=>'success','message'=>'Ajouté aux favoris']);
            }
        } catch (Throwable $e) {
            http_response_code(500);
            echo json_encode(['status'=>'error','message'=>$e->getMessage()]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['status'=>'error','message'=>'Méthode non permise']);
}
