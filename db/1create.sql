/* -----------------------------------------------------------
Réinitialisation complète du schéma
-----------------------------------------------------------*/
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS favori;
DROP TABLE IF EXISTS avis;
DROP TABLE IF EXISTS produit;
DROP TABLE IF EXISTS utilisateur;

/* ----------  utilisateur  ---------- */
CREATE TABLE utilisateur (
    id_user      INT(10) AUTO_INCREMENT PRIMARY KEY,
    nom          VARCHAR(255) NOT NULL,
    prenom       VARCHAR(255) NOT NULL,
    email        VARCHAR(255) NOT NULL UNIQUE,
    telephone    VARCHAR(12)  NULL,
    mdp          VARCHAR(255) NOT NULL,
    num_civique  VARCHAR(255) NULL,
    rue          VARCHAR(255) NULL,
    ville        VARCHAR(255) NULL,
    code_postal  VARCHAR(255) NULL,
    role         ENUM('admin', 'usager') NOT NULL DEFAULT 'usager'
) COMMENT='Utilisateurs';

/* ----------  produit  ---------- */
CREATE TABLE produit (
    id_produit   INT(10) PRIMARY KEY,
    nom          VARCHAR(255)  NOT NULL,
    prix         DECIMAL(10,2) NOT NULL,
    image        VARCHAR(255)  NOT NULL,          -- chemin/URL
    image_data   LONGBLOB NULL,                   -- contenu binaire optionnel
    taille       VARCHAR(50)   NOT NULL,
    conditions   VARCHAR(255)  NOT NULL,          -- “condition” est réservé
    marque       VARCHAR(255),
    description  VARCHAR(255),
    categorie    VARCHAR(255)  NOT NULL,
    id_user      INT(10)       NOT NULL           -- FK dans 2contraines.sql
) COMMENT='Produits';

/* ----------  avis  ---------- */
CREATE TABLE avis (
    id_avis     INT(10) AUTO_INCREMENT PRIMARY KEY,
    id_user     INT(10) NOT NULL,                 -- FK dans 2contraines.sql
    id_produit  INT(10) NOT NULL,                 -- FK dans 2contraines.sql
    avis        VARCHAR(255) NOT NULL,
    note        TINYINT UNSIGNED NOT NULL         -- 1‑5
) COMMENT='Avis';

/* ----------  favori  (items aimés) ---------- */
CREATE TABLE favori (
    id_user    INT(10) NOT NULL,                  -- FK dans 2contraines.sql
    id_produit INT(10) NOT NULL,                  -- FK dans 2contraines.sql
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_user, id_produit)
) COMMENT='Produits aimés par l’utilisateur';

SET FOREIGN_KEY_CHECKS = 1;
