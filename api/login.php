<?php
require_once __DIR__ . '/utils/utils.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status'=>'error','message'=>'Méthode non permise']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$email    = $data['email']    ?? '';
$password = $data['password'] ?? '';

if (loginUser($email, $password)) {
    echo json_encode(['status'=>'success','redirect'=>'/home']);
} else {
    http_response_code(401);
    echo json_encode(['status'=>'error','message'=>'Identifiants invalides']);
}
