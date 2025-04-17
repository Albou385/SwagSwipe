<?php
/**
 *  GET  /api/avis?id=123       → liste des avis pour un produit + moyenne
 *  POST /api/avis              → { "id_produit":123, "avis":"...", "note":4 }
 *                                (crée ou met à jour l’avis de l’utilisateur)
 */
require_once __DIR__ . '/utils/utils.php';
header('Content-Type: application/json');

requireLogin();
$pdo   = $GLOBALS['pdo'];
$user  = $_SESSION['utilisateur']['id'];

switch ($_SERVER['REQUEST_METHOD']) {
    /* ----------  Lister par produit  ---------- */
    case 'GET':
        $idProd = (int)($_GET['id'] ?? 0);
        if (!$idProd) {
            http_response_code(400);
            echo json_encode(['status'=>'error','message'=>'Paramètre id manquant']);
            exit;
        }

        $all = $pdo->prepare(
            'SELECT a.id_avis, a.avis, a.note,
                    u.nom, u.prenom
             FROM avis a
             JOIN utilisateur u ON u.id_user = a.id_user
             WHERE a.id_produit = ?'
        );
        $all->execute([$idProd]);
        $rows = $all->fetchAll(PDO::FETCH_ASSOC);

        $avg = $pdo->prepare('SELECT AVG(note) FROM avis WHERE id_produit = ?');
        $avg->execute([$idProd]);

        echo json_encode([
            'status' => 'success',
            'moyenne'=> round($avg->fetchColumn(), 2),
            'data'   => $rows
        ]);
        break;

    /* ----------  Créer / Mettre à jour  ---------- */
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $idProd = (int)($data['id_produit'] ?? 0);
        $text   = trim($data['avis']  ?? '');
        $note   = (int)($data['note'] ?? 0);

        if (!$idProd || !$note || $note < 1 || $note > 5) {
            http_response_code(400);
            echo json_encode(['status'=>'error','message'=>'Données invalides']);
            exit;
        }

        // Upsert : un avis par (user, produit)
        $stmt = $pdo->prepare(
            'INSERT INTO avis (id_user, id_produit, avis, note)
             VALUES (?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE avis = VALUES(avis), note = VALUES(note)'
        );

        try {
            $stmt->execute([$user, $idProd, $text, $note]);
            echo json_encode(['status'=>'success','message'=>'Avis enregistré']);
        } catch (Throwable $e) {
            http_response_code(500);
            echo json_encode(['status'=>'error','message'=>$e->getMessage()]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['status'=>'error','message'=>'Méthode non permise']);
}
