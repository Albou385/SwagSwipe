<?php
require_once(__DIR__ . "/utils/utils.php");

if (isset($_SESSION['user_loggedin']) && $_SESSION['user_details']['role'] === 'admin') {
    try {
        $pdo = $GLOBALS['pdo'];

        // Fetch all clients
        $stmt = $pdo->prepare('SELECT * FROM Clients');
        $stmt->execute();
        $clients = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'status' => 'success',
            'data' => $clients
        ]);
    } catch (PDOException $e) {
        echo json_encode([
            'status' => 'error',
            'message' => 'Database error: ' . $e->getMessage()
        ]);
    } catch (Exception $e) {
        echo json_encode([
            'status' => 'error',
            'message' => 'An unexpected error occurred: ' . $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Access denied',
        'redirect' => '/home'
    ]);
}
?>
