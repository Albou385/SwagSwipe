<?php
require_once __DIR__ . '/../../config.php';

function loginUser($email, $password) {
    $pdo = $GLOBALS['pdo'];
    $stmt = $pdo->prepare('SELECT * FROM utilisateur WHERE email = ?');
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['mdp'])) {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        $_SESSION['user_loggedin'] = $user['id_user'];
        $_SESSION['user_details'] = [
            'nom' => $user['nom'],
            'prenom' => $user['prenom'],
            'email' => $user['email'],
            'role' => $user['role']
        ];
        return true;
    }
    return false;
}

function registerUser($nom, $prenom, $email, $telephone, $password, $num_civique, $rue, $ville, $code_postal, $role = 'usager') {
    $pdo = $GLOBALS['pdo'];

    $validRoles = ['admin', 'usager'];
    if (!in_array($role, $validRoles)) {
        throw new Exception('Invalid role provided');
    }

    $passwordHash = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare('INSERT INTO utilisateur (nom, prenom, email, telephone, mdp, num_civique, rue, ville, code_postal, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    return $stmt->execute([$nom, $prenom, $email, $telephone, $passwordHash, $num_civique, $rue, $ville, $code_postal, $role]);
}

function isUserLoggedIn() {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    return isset($_SESSION['user_loggedin']);
}

function logoutUser() {
    if (session_status() === PHP_SESSION_NONE) {
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
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    if (!isset($_SESSION['user_loggedin'])) {
        header("Location: /login");
        exit();
    }
}

function isAdmin() {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    return isset($_SESSION['user_details']) && $_SESSION['user_details']['role'] === 'admin';
}
?>
