<?php
require_once(__DIR__ . "/utils/utils.php");

header("Content-Type: application/json");

$response = [];

try {
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $data = json_decode(file_get_contents("php://input"), true);
        $username = $data['username'] ?? '';
        $password = $data['password'] ?? '';

        if (loginUser($username, $password)) {
            $response['status'] = 'success';
            $response['message'] = 'Login successful';
            $response['redirect'] = '/home';
        } else {
            $response['status'] = 'error';
            $response['message'] = 'Invalid username or password';
            $response['redirect'] = '/login';
        }
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Invalid request method';
    }
} catch (Exception $e) {
    $response['status'] = 'error';
    $response['message'] = 'An error occurred: ' . $e->getMessage();
}

echo json_encode($response);
?>
