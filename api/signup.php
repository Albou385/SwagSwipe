<?php
require_once(__DIR__ . "/utils/utils.php");

header("Content-Type: application/json");

$response = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $username = $data['username'] ?? '';
    $password = $data['password'] ?? '';
    $email = $data['email'] ?? '';
    $role = $data['role'] ?? 'client';

    // Ensure role is valid
    $validRoles = ['admin', 'client'];
    if (!in_array($role, $validRoles)) {
        $response['status'] = 'error';
        $response['message'] = 'Invalid role provided';
        echo json_encode($response);
        exit;
    }

    global $pdo; // Ensure the global $pdo is accessible here
    $stmt = $pdo->prepare('SELECT * FROM Clients WHERE username = ?');
    $stmt->execute([$username]);
    if ($stmt->fetch()) {
        $response['status'] = 'error';
        $response['message'] = 'Username already taken';
    } else {
        if (registerUser($username, $password, $email, $role)) {
            $response['status'] = 'success';
            $response['message'] = 'Signup successful';
            $response['redirect'] = '/login';
        } else {
            $response['status'] = 'error';
            $response['message'] = 'Error creating account';
        }
    }
} else {
    $response['status'] = 'error';
    $response['message'] = 'Invalid request method';
}

echo json_encode($response);
?>
