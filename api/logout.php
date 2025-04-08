<?php
require_once(__DIR__ . "/utils/utils.php");

header("Content-Type: application/json");
session_unset();
session_destroy();

echo json_encode([
    'status' => 'success',
    'message' => 'Logout successful'
]);
?>
