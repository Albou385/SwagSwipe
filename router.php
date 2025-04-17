<?php

// Error handling
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Access Control Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

require_once __DIR__.'/api/utils/utils.php';

// Define routing functions
function get($route, $path_to_include) {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        route($route, $path_to_include);
    }
}

function post($route, $path_to_include) {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        route($route, $path_to_include);
    }
}

function put($route, $path_to_include) {
    if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
        route($route, $path_to_include);
    }
}

function patch($route, $path_to_include) {
    if ($_SERVER['REQUEST_METHOD'] == 'PATCH') {
        route($route, $path_to_include);
    }
}

function delete($route, $path_to_include) {
    if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
        route($route, $path_to_include);
    }
}

function any($route, $path_to_include) {
    route($route, $path_to_include);
}

function route($route, $path_to_include) {
    $callback = $path_to_include;
    if (!is_callable($callback)) {
        if (!strpos($path_to_include, '.php') && !strpos($path_to_include, '.html')) {
            $path_to_include .= '.php';
        }
    }
    if ($route == "/404") {
        include_once __DIR__ . "/frontend/pages/404.html";
        exit();
    }
    if ($route == "/403") {
        include_once __DIR__ . "/frontend/pages/403.html";
        exit();
    }
    $request_url = filter_var($_SERVER['REQUEST_URI'], FILTER_SANITIZE_URL);
    $request_url = rtrim($request_url, '/');
    $request_url = strtok($request_url, '?');
    $route_parts = explode('/', $route);
    $request_url_parts = explode('/', $request_url);
    array_shift($route_parts);
    array_shift($request_url_parts);

    if ($route_parts[0] == '' && count($request_url_parts) == 0) {
        if (is_callable($callback)) {
            call_user_func_array($callback, []);
            exit();
        }
        include_once __DIR__ . "/$path_to_include";
        exit();
    }

    // Handle wildcard routes like /css/*
    if ($route_parts[count($route_parts) - 1] == '*' && count($request_url_parts) >= count($route_parts) - 1) {
        $wildcard_route_parts = array_slice($request_url_parts, count($route_parts) - 1);
        $wildcard_path = implode('/', $wildcard_route_parts);
        if (is_callable($callback)) {
            call_user_func_array($callback, [$wildcard_path]);
            exit();
        }
        include_once __DIR__ . "/$path_to_include";
        exit();
    }

    if (count($route_parts) != count($request_url_parts)) {
        return;
    }

    $parameters = [];
    for ($__i__ = 0; $__i__ < count($route_parts); $__i__++) {
        $route_part = $route_parts[$__i__];
        if (preg_match("/^[$]/", $route_part)) {
            $route_part = ltrim($route_part, '$');
            array_push($parameters, $request_url_parts[$__i__]);
            $$route_part = $request_url_parts[$__i__];
        } else if ($route_parts[$__i__] != $request_url_parts[$__i__]) {
            return;
        }
    }
    if (is_callable($callback)) {
        call_user_func_array($callback, $parameters);
        exit();
    }
    include_once __DIR__ . "/$path_to_include";
    exit();
}

function out($text) {
    echo htmlspecialchars($text);
}

function set_csrf() {
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }
    if (!isset($_SESSION["csrf"])) {
        $_SESSION["csrf"] = bin2hex(random_bytes(50));
    }
    echo '<input type="hidden" name="csrf" value="' . $_SESSION["csrf"] . '">';
}

function is_csrf_valid() {
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }
    if (!isset($_SESSION['csrf']) || !isset($_POST['csrf'])) {
        return false;
    }
    if ($_SESSION['csrf'] != $_POST['csrf']) {
        return false;
    }
    return true;
}

// Custom error handler to nicely format errors
set_error_handler(function($errno, $errstr, $errfile, $errline) {
    if (!(error_reporting() & $errno)) {
        return;
    }
    switch ($errno) {
        case E_USER_ERROR:
            echo "<b>ERROR</b> [$errno] $errstr<br />\n";
            echo "  Fatal error on line $errline in file $errfile";
            echo ", PHP " . PHP_VERSION . " (" . PHP_OS . ")<br />\n";
            echo "Aborting...<br />\n";
            exit(1);
            break;

        case E_USER_WARNING:
            echo "<b>WARNING</b> [$errno] $errstr<br />\n";
            break;

        case E_USER_NOTICE:
            echo "<b>NOTICE</b> [$errno] $errstr<br />\n";
            break;

        default:
            echo "Unknown error type: [$errno] $errstr<br />\n";
            break;
    }

    /* Don't execute PHP internal error handler */
    return true;
});

// Custom exception handler to nicely format exceptions
set_exception_handler(function($exception) {
    echo "<b>Exception:</b> " . $exception->getMessage() . "<br />";
    echo "In file: " . $exception->getFile() . " on line " . $exception->getLine() . "<br />";
});

// Function to handle shutdown and catch fatal errors
register_shutdown_function(function() {
    $error = error_get_last();
    if ($error && ($error['type'] === E_ERROR || $error['type'] === E_PARSE)) {
        echo "<b>Fatal Error:</b> " . $error['message'] . "<br />";
        echo "In file: " . $error['file'] . " on line " . $error['line'] . "<br />";
    }
});

function serve_static_file($dir, $mimeType, $path) {
    $file = __DIR__ . $dir . '/' . $path;
    if (file_exists($file)) {
        header("Content-Type: $mimeType");
        readfile($file);
        exit();
    } else {
        http_response_code(404);
        include_once __DIR__ . "/frontend/pages/404.html";
        exit();
    }
}

require_once __DIR__.'/routes.php';
?>
