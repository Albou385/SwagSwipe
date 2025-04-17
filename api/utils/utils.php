<?php
// Always start session once per request
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require_once __DIR__ . '/../../../config.php';   // $pdo comes from config.php

/** ----------------------------------------------------------------
 *  Auth helpers
 * ----------------------------------------------------------------*/
function loginUser(string $email, string $password): bool
{
    $pdo = $GLOBALS['pdo'];

    $stmt = $pdo->prepare('SELECT * FROM utilisateur WHERE email = ?');
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['mdp'])) {
        $_SESSION['utilisateur'] = [
            'id'    => $user['id_user'],
            'email' => $user['email'],
            'role'  => $user['role'],
            'nom'   => $user['nom'],
            'prenom'=> $user['prenom']
        ];
        return true;
    }
    return false;
}

function registerUser(
    string $nom,
    string $prenom,
    string $email,
    string $password,
    string $telephone,
    string $role = 'usager'
): bool {
    $pdo = $GLOBALS['pdo'];
    $validRoles = ['admin', 'usager'];

    if (!in_array($role, $validRoles, true)) {
        throw new InvalidArgumentException('Rôle invalide');
    }

    // Unique e‑mail enforced at DB, but catch duplicate for UX
    $exists = $pdo->prepare('SELECT 1 FROM utilisateur WHERE email = ?');
    $exists->execute([$email]);
    if ($exists->fetchColumn()) {
        throw new RuntimeException('Adresse courriel déjà utilisée');
    }

    $stmt = $pdo->prepare(
        'INSERT INTO utilisateur
         (nom, prenom, email, telephone, mdp, num_civique, rue, ville, code_postal, role)
         VALUES (?, ?, ?, ?, ?, "", "", "", "", ?)'   -- minimal fields; adjust as needed
    );

    $hash = password_hash($password, PASSWORD_DEFAULT);
    return $stmt->execute([$nom, $prenom, $email, $telephone, $hash, $role]);
}

function isLoggedIn(): bool
{
    return isset($_SESSION['utilisateur']);
}

function requireLogin(): void
{
    if (!isLoggedIn()) {
        http_response_code(401);
        echo json_encode(['status' => 'error', 'message' => 'Non autorisé']);
        exit;
    }
}

function isAdmin(): bool
{
    return isLoggedIn() && $_SESSION['utilisateur']['role'] === 'admin';
}

function logoutUser(): void
{
    session_unset();
    session_destroy();
}
