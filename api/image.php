<?php
require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 1. Champs reçus
    $nom = $_POST['nom'] ?? '';
    $marque = $_POST['marque'] ?? '';
    $prix = $_POST['prix'] ?? '';
    $grandeur = $_POST['grandeur'] ?? '';
    $categorie = $_POST['categorie'] ?? '';
    $description = $_POST['description'] ?? '';
    $image = $_FILES['image'] ?? null;

    // 2. Validation de base
    if (
        empty($nom) || empty($prix) || empty($marque) || empty($grandeur) ||
        empty($categorie) || empty($description) || !$image
    ) {
        http_response_code(400);
        echo json_encode(['error' => 'Champs requis manquants']);
        exit;
    }

    // 3. Gestion de l’image
    $upload_dir = __DIR__ . '/../frontend/img/';
    $ext = pathinfo($image['name'], PATHINFO_EXTENSION);
    $image_name = uniqid('img_') . '.' . $ext;
    $target_path = $upload_dir . $image_name;

    // Vérifie que le dossier existe
    if (!is_dir($upload_dir)) {
        mkdir($upload_dir, 0777, true);
    }

    if (!move_uploaded_file($image['tmp_name'], $target_path)) {
        http_response_code(500);
        echo json_encode(['error' => 'Erreur lors de l’upload de l’image.']);
        exit;
    }

    // 4. Insertion dans la base
    try {
        $stmt = $GLOBALS['pdo']->prepare(
            "INSERT INTO produit (nom, marque, prix, grandeur, categorie, description, image) 
             VALUES (?, ?, ?, ?, ?, ?, ?)"
        );
        $stmt->execute([
            $nom, $marque, $prix, $grandeur, $categorie, $description, "img/" . $image_name
        ]);

        echo json_encode(['success' => true]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Erreur base de données : ' . $e->getMessage()]);
    }
}
