<?php
require_once __DIR__ . '/utils/utils.php';
header('Content-Type: application/json');

requireLogin();            // 401 if not logged

if (!isAdmin()) {
    http_response_code(403);
    echo json_encode(['status'=>'error','message'=>'Accès refusé']);
    exit;
}

$pdo = $GLOBALS['pdo'];
$all = $pdo->query('SELECT id_user, nom, prenom, email, role FROM utilisateur')
           ->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(['status'=>'success','data'=>$all]);
