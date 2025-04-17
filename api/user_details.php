<?php
require_once __DIR__ . '/utils/utils.php';
header('Content-Type: application/json');

if (isLoggedIn()) {
    echo json_encode(['status'=>'success','data'=>$_SESSION['utilisateur']]);
} else {
    http_response_code(401);
    echo json_encode(['status'=>'error','message'=>'Non connecté']);
}
