<?php
require_once(__DIR__ . "/utils/utils.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $body = json_decode(file_get_contents("php://input")); // Get the body of the request
    $nom = $body->nom ?? 'Doe';
    $prenom = $body->prenom ?? 'John';
} else if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // ?nom=John&prenom=Doe
    $langue = isset($_GET['langue']) ? $_GET['langue'] : 'fr';
    $body = json_decode(file_get_contents('php://input'));
    $nom = $_GET['nom'] ?? 'Doe';
    $prenom = $_GET['prenom'] ?? 'John';
} else {
    // Handle other request methods or respond with an error
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit();
}

// Check if user is logged in and modify the nom if authenticated
if (isset($_SESSION['user_loggedin'])) {
    $userDetails = $_SESSION['user_details'];
    $prenom = $userDetails['username']; // Change the nom to the logged-in user's username
}

$reponse = [
    "nom" => $nom,
    "prenom" => $prenom,
    "langue" => $langue
];

switch ($langue) {
    case "es":
        $reponse["message"] = "Hola Mundo " . $nom . " " . $prenom . "!";
        break;
    case "fr":
        $reponse["message"] = "Bonjour le monde " . $nom . " " . $prenom . "!";
        break;
    case "de":
        $reponse["message"] = "Hallo Welt " . $nom . " " . $prenom . "!";
        break;
    case "en":
        $reponse["message"] = "Hello World " . $nom . " " . $prenom . "!";
        break;
    default:
        $reponse["message"] = "Bonjour le monde " . $nom . " " . $prenom . "!";
}

echo json_encode($reponse);
?>
