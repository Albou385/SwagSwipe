<?php
require_once(__DIR__ . "/utils/utils.php");

header("Content-Type: application/json");

if (isset($_SESSION['user_loggedin'])) {
    $userDetails = $_SESSION['user_details'];
    echo json_encode([
        'status' => 'success',
        'data' => $userDetails
    ]);
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'User not logged in',
        'redirect' => 'login'
    ]);
}
?>
