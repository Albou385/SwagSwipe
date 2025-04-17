/* -----------------------------------------------------------
Contraintes & relations
-----------------------------------------------------------*/
ALTER TABLE produit
    ADD CONSTRAINT fk_produit_utilisateur
        FOREIGN KEY (id_user)
        REFERENCES utilisateur(id_user)
        ON UPDATE CASCADE
        ON DELETE CASCADE;

ALTER TABLE avis
    ADD CONSTRAINT fk_avis_utilisateur
        FOREIGN KEY (id_user)
        REFERENCES utilisateur(id_user)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    ADD CONSTRAINT fk_avis_produit
        FOREIGN KEY (id_produit)
        REFERENCES produit(id_produit)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    ADD CONSTRAINT chk_note_range
        CHECK (note BETWEEN 1 AND 5);

ALTER TABLE favori
    ADD CONSTRAINT fk_favori_utilisateur
        FOREIGN KEY (id_user)
        REFERENCES utilisateur(id_user)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    ADD CONSTRAINT fk_favori_produit
        FOREIGN KEY (id_produit)
        REFERENCES produit(id_produit)
        ON UPDATE CASCADE
        ON DELETE CASCADE;
