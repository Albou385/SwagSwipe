<?php
// routes.php
 
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = str_replace('/assets/php', '', rtrim($uri, '/')); // Clean base path
 
switch ($uri) {
    case '':
    case '/':
        require_once __DIR__ . '/assets/php/connexion.php';
        break;
 
    case '/profile':
        require_once __DIR__ . '/assets/php/profile.php';
        break;
 
    default:
        http_response_code(404);
        echo "<h1>404 Not Found</h1>";
        break;
}