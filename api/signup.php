<?php
require_once __DIR__ . '/utils/utils.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status'=>'error','message'=>'Méthode non permise']);
    exit;
}

try {
    $data = json_decode(file_get_contents('php://input'), true);

    registerUser(
        $data['nom']       ?? '',
        $data['prenom']    ?? '',
        $data['email']     ?? '',
        $data['password']  ?? '',
        $data['telephone'] ?? '',
        $data['role']      ?? 'usager'
    );

    echo json_encode(['status'=>'success','redirect'=>'/login']);
} catch (Throwable $e) {
    http_response_code(400);
    echo json_encode(['status'=>'error','message'=>$e->getMessage()]);
}
