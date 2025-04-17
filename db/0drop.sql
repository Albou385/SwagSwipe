/* -----------------------------------------------------------
   Drop every table in the right order, ignoring FK constraints
-----------------------------------------------------------*/
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS favori;
DROP TABLE IF EXISTS avis;
DROP TABLE IF EXISTS produit;
DROP TABLE IF EXISTS utilisateur;

SET FOREIGN_KEY_CHECKS = 1;
