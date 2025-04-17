
-- Insertion des utilisateurs
INSERT INTO utilisateur (nom, prenom, email, telephone, mdp, num_civique, rue, ville, code_postal, role) VALUES
('Martin', 'Vincent', 'vincent.martin.2@ens.etsmtl.ca', '111-111-1111', 'mdp1', '123', 'notre dame', 'Montreal', 'h1x 2v3', 'usager'),
('Stoia', 'Maria Sandra', 'sandra-maria.stoia.1@ens.etsmtl.ca', '111-111-1111', 'mdp2', '123', 'notre dame', 'Montreal', 'h1x 2v3', 'usager'),
('Wilmot', 'Xavier', 'xavier.wilmot.1@ens.etsmtl.ca', '111-111-1111', 'mdp3', '123', 'notre dame', 'Montreal', 'h1x 2v3', 'usager'),
('Berard', 'Nicolas', 'nicolas.berard.1@ens.etsmtl.ca', '111-111-1111', 'mdp4', '123', 'notre dame', 'Montreal', 'h1x 2v3', 'usager'),
('Dubois', 'Rose-Anne', 'rose-anne.dubois.1@ens.etsmtl.ca', '111-111-1111', 'mdp5', '123', 'notre dame', 'Montreal', 'h1x 2v3', 'usager'),
('Bouchard', 'Alexandre', 'alexandre.bouchard.6@ens.etsmtl.ca', '111-111-1111', 'mdp6', '123', 'notre dame', 'Montreal', 'h1x 2v3', 'usager');


INSERT INTO produit (
        id_produit, nom, prix, image, categorie, description, taille, conditions, marque, id_user
    ) VALUES (
        3, 'Soulier Sport', 59.99, 'img/soulier_test4.jpg', 
        'soulier', 'Des souliers de sport légers et confortables pour la course.', '42', 
        'Bon état', 'Adidas', 789
    );
INSERT INTO produit (
        id_produit, nom, prix, image, categorie, description, taille, conditions, marque, id_user
    ) VALUES (
        4, 'Veste en denim', 34.99, 'img/veste_test1.jpg', 
        'plein_air', 'Une veste en denim intemporelle pour un style classique.', 'M', 
        'Très bon état', 'Levi's', 101
    );