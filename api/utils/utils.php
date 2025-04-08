<?php
require_once __DIR__ . '/../../config.php';

function loginUser($username, $password) {
    $pdo = $GLOBALS['pdo'];
    $stmt = $pdo->prepare('SELECT * FROM Clients WHERE username = ?');
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
        $_SESSION['user_loggedin'] = $user['id'];
        $_SESSION['user_details'] = [
            'username' => $user['username'],
            'email' => $user['email'],
            'role' => $user['role']
        ];
        return true;
    }
    return false;
}

function registerUser($username, $password, $email, $role) {
    $pdo = $GLOBALS['pdo'];

    $validRoles = ['admin', 'client'];
    if (!in_array($role, $validRoles)) {
        throw new Exception('Invalid role provided');
    }

    $passwordHash = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare('INSERT INTO Clients (username, password, email, role) VALUES (?, ?, ?, ?)');
    return $stmt->execute([$username, $passwordHash, $email, $role]);
}

// The rest of your functions should follow the same pattern:
function isUserLoggedIn() {
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }
    return isset($_SESSION['user_loggedin']);
}

function logoutUser() {
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }
    session_unset();
    session_destroy();
}

function redirectIfNotLoggedIn() {
    if (!isUserLoggedIn()) {
        header('Location: /login');
        exit();
    }
}

function ensureLoggedIn() {
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }
    if (!isset($_SESSION['usager'])) {
        header("Location: /login");
        exit();
    }
}

function isAdmin() {
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }
    if (isset($_SESSION['user_details']) && $_SESSION['user_details']['role'] === 'admin') {
        return true;
    }
    return false;
}
?>
