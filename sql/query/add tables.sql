

CREATE TABLE utilisateur (
    id_user INT(10) AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    telephone VARCHAR(12) NOT NULL,
    mdp VARCHAR(255) NOT NULL,
    num_civique VARCHAR(255) NOT NULL,
    rue VARCHAR(255) NOT NULL,
    ville VARCHAR(255) NOT NULL,
    code_postal VARCHAR(255) NOT NULL,
    role ENUM('admin', 'usager') NOT NULL DEFAULT 'usager'
    
) COMMENT='Table des utilisateurs';

--CONSTRAINT chk_mdp_format CHECK (mdp REGEXP '^(?=.*[A-Z])(?=.*[0-9]).*$')--
CREATE TABLE produit (
    id_produit INT(10) PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prix DECIMAL(65,2) NOT NULL,
    image VARCHAR(255) NOT NULL,
    taille VARCHAR(255) NOT NULL,
    conditions VARCHAR(255) NOT NULL, -- "condition" est un mot réservé, renommé en "conditions"
    marque VARCHAR(255),
    description VARCHAR(255),
    categorie VARCHAR(255) NOT NULL,
    id_user INT(10) NOT NULL,
    FOREIGN KEY (id_user) REFERENCES utilisateur(id_user)
) COMMENT='Table des produits';

CREATE TABLE avis (
    id_avis INT(10) AUTO_INCREMENT PRIMARY KEY,
    id_user INT(10),
    avis VARCHAR(255) NOT NULL,
    note INT(1) NOT NULL,
    FOREIGN KEY (id_user) REFERENCES utilisateur(id_user)
) COMMENT='Table des avis';

