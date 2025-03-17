

CREATE DATABASE onlineShop CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE onlineShop;

--Creation de la table de donnees pour les produits
CREATE TABLE produit{

    id_produit INTEGER(10) PRIMARY KEY,
    name VARCHAR2(255) NOT NULL,
    prix DECIMAL(100,2) NOT NULL,
    image VARCHAR2(255) NOT NULL,
    taille VARCHAR2(255) NOT NULL,
    condition VARCHAR2(255) NOT NULL,
    marque  VARCHAR(255),
    description VARCHAR(255),
    id_user INTEGER(10) NOT NULL,
    FOREIGN KEY (id_user) REFERENCES utilisateur(id_user)

};

--Creation de la table de donnees pour les utilisateurs
CREATE TABLE utilisateur{

    id_user INTEGER(10) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR2(255) NOT NULL,
    prenom VARCHAR2(255) NOT NULL,
    adresse_courriel VARCHAR2(255) NOT NULL UNIQUE,
    telephone VARCHAR2(10) NOT NULL,
    mdp VARCHAR2(255) NOT NULL,
    ville VARCHAR2(255) NOT NULL,
    pays VARCHAR2(255) NOT NULL,
    code_postal VARCHAR2(255) NOT NULL,
    CONSTRAINT chk_mdp_format CHECK (mdp REGEXP '^(?=.*[A-Z])(?=.*[0-9]).*$')

};

--Creation de la table de donnees pour les avis
CREATE TABLE avis{

    id_avis INTEGER(10) AUTO_INCREMENT PRIMARY KEY,
    id_user INTEGER(10) 
    avis VARCHAR2(255) NOT NULL,
    note INTEGER(1) NOT NULL,
    FOREIGN KEY (id_user) REFERENCES utilisateur(id_user)

}

--Insertion des donnees dans la table utilisateurs
--Pas besoin de mettre le id vu que la base de donnee compte l'auto incrementation
INSERT INTO utilisateur (nom, prenom, adresse_courriel, telephone, mdp, ville, pays, code_postal) VALUES

--Insertion des donnees dans la table produits
--Pas besoin de mettre le id vu que la base de donnee compte l'auto incrementation
INSERT INTO produit (name, prix, image, taille)
