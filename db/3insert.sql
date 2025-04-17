/* ------------------------------------------------------------------
   INSERTION DE DONNÉES INITIALES : UTILISATEURS + PRODUITS
------------------------------------------------------------------*/
START TRANSACTION;

/* ----------  UTILISATEURS DE DÉMO  ---------- */
INSERT INTO utilisateur
(id_user, nom, prenom, email, telephone, mdp,
 num_civique, rue, ville, code_postal, role)
VALUES
(2,   'Démo',    'Longueuil', 'demo2@example.com',      '000‑000‑0000', 'mdp2',   '', '', '', '', 'usager'),
(101, 'Vendeur', 'TR',        'vendeur101@example.com', '000‑000‑0000', 'mdp101', '', '', '', '', 'usager'),
(789, 'Vendeur', 'Quebec',    'vendeur789@example.com', '000‑000‑0000', 'mdp789', '', '', '', '', 'usager');

/* ----------  PRODUITS  ---------- */
INSERT INTO produit
(id_produit, nom, prix, image, categorie, description, taille, conditions, marque, id_user) VALUES
(3,  'Soulier Sport',        59.99, 'img/soulier_test4.jpg',
     'soulier', 'Des souliers de sport légers et confortables pour la course.',
     '42', 'Bon état', 'Adidas',                 789),

(4,  'Veste en denim',       34.99, 'img/veste_test1.jpg',
     'plein_air', 'Une veste en denim intemporelle pour un style classique.',
     'M', 'Très bon état', 'Levi''s',            101),

(12, 'Camisole légère',      23.22, 'img/camisole1.jpg',
     'camisoles', 'Idéal pour un look décontracté.',
     'XL', 'neuf', 'Puma',                       2),

(13, 'Camisole respirante',  12.34, 'img/camisole2.jpg',
     'camisoles', 'Parfaite pour l''entraînement ou les journées chaudes.',
     'M', 'neuf', 'Nike',                        2),

(14, 'Débardeur sport',      23.88, 'img/camisole3.jpg',
     'camisoles', 'Idéal pour un look décontracté.',
     'L', 'neuf', 'Reebok',                      2),

(15, 'Débardeur sport',      22.29, 'img/camisole4.jpg',
     'camisoles', 'Tissu doux et agréable à porter.',
     'S', 'neuf', 'Under Armour',                2),

(16, 'Camisole respirante',  17.42, 'img/camisole5.jpg',
     'camisoles', 'Parfaite pour l''entraînement ou les journées chaudes.',
     'S', 'neuf', 'Adidas',                      2),

(18, 'Camisole respirante',  18.29, 'img/camisole7.jpg',
     'camisoles', 'Conçue pour offrir confort et légèreté.',
     'S', 'neuf', 'Adidas',                      2),

(19, 'Haut d''été',          22.42, 'img/camisole8.jpg',
     'camisoles', 'Parfaite pour l''entraînement ou les journées chaudes.',
     'M', 'neuf', 'Adidas',                      2),

(20, 'Pull décontracté',     23.14, 'img/chandail3.jpg',
     'chandails', 'Facile à assortir avec vos tenues.',
     'M', 'neuf', 'Adidas',                      2),

(21, 'Chandail en laine',    20.96, 'img/chandail1.jpg',
     'chandails', 'Restez au chaud avec style.',
     'L', 'neuf', 'Nike',                        2),

(22, 'Haut confortable',     14.31, 'img/chandail2.jpg',
     'chandails', 'Facile à assortir avec vos tenues.',
     'L', 'neuf', 'Puma',                        2),

(23, 'Chandail chaud',       11.84, 'img/chandail4.jpg',
     'chandails', 'Restez au chaud avec style.',
     'S', 'neuf', 'Puma',                        2),

(24, 'Chandail en laine',    12.61, 'img/chandail5.jpg',
     'chandails', 'Facile à assortir avec vos tenues.',
     'S', 'neuf', 'Nike',                        2),

(26, 'Chandail chaud',       21.99, 'img/chandail7.jpg',
     'chandails', 'Parfait pour les journées plus fraîches.',
     'XL', 'neuf', 'Puma',                       2),

(27, 'Haut confortable',     24.99, 'img/chandail8.jpg',
     'chandails', 'Confort absolu pour l''automne.',
     'XL', 'neuf', 'Reebok',                     2),

(28, 'Chapeau d''été',       15.46, 'img/chapeau_test7.webp',
     'chapeaux', 'Ajoutez du style à vos looks.',
     'S', 'neuf', 'Nike',                        2),

(29, 'Hoodie tendance',      10.97, 'img/hoodie_test3.jpg',
     'chandails', 'Confort et chaleur au rendez‑vous.',
     'M', 'neuf', 'Reebok',                      2),

(30, 'Jupe d''été',          19.47, 'img/jupe_test9.webp',
     'jupes', 'Légère et élégante pour l''été.',
     'XL', 'neuf', 'Puma',                       2),

(31, 'Jupe plissée',         21.73, 'img/jupe1.jpg',
     'jupes', 'Légère et élégante pour l''été.',
     'L', 'neuf', 'Adidas',                      2),

(32, 'Jupe casual',          21.29, 'img/jupe2.jpg',
     'jupes', 'Légère et élégante pour l''été.',
     'M', 'neuf', 'Puma',                        2),

(33, 'Jupe casual',          11.89, 'img/jupe3.jpg',
     'jupes', 'Ajoute une touche féminine à votre look.',
     'M', 'neuf', 'Under Armour',                2),

(34, 'Mini‑jupe élégante',   10.23, 'img/jupe4.jpg',
     'jupes', 'Tissu fluide et agréable.',
     'S', 'neuf', 'Under Armour',                2),

(35, 'Jupe d''été',          21.54, 'img/jupe5.jpg',
     'jupes', 'Ajoute une touche féminine à votre look.',
     'XL', 'neuf', 'Under Armour',               2),

(36, 'Jupe plissée',         17.34, 'img/jupe6.jpg',
     'jupes', 'Ajoute une touche féminine à votre look.',
     'XL', 'neuf', 'Nike',                       2),

(37, 'Jean slim',            10.43, 'img/pantalon_test5.jpg',
     'pantalons', 'Look urbain et moderne.',
     'M', 'neuf', 'Reebok',                      2),

(38, 'Jean slim',            17.27, 'img/pantalon1.jpg',
     'pantalons', 'Polyvalent et confortable au quotidien.',
     'S', 'neuf', 'Under Armour',                2),

(39, 'Jogging confortable',  19.01, 'img/pantalon2.jpg',
     'pantalons', 'Polyvalent et confortable au quotidien.',
     'S', 'neuf', 'Nike',                        2),

(40, 'Jogging confortable',  17.25, 'img/pantalon3.jpg',
     'pantalons', 'Tissu de qualité et coupe parfaite.',
     'L', 'neuf', 'Under Armour',                2),

(41, 'Pantalon cargo',       22.48, 'img/pantalon4.jpg',
     'pantalons', 'Tissu de qualité et coupe parfaite.',
     'L', 'neuf', 'Adidas',                      2),

(42, 'Jean slim',            23.86, 'img/pantalon5.jpg',
     'pantalons', 'Parfait pour un style casual ou habillé.',
     'M', 'neuf', 'Puma',                        2),

(43, 'Pantalon de ville',    14.84, 'img/pantalon6.jpg',
     'pantalons', 'Look urbain et moderne.',
     'M', 'neuf', 'Nike',                        2),

(44, 'Pantalon cargo',       18.17, 'img/pantalon7.jpg',
     'pantalons', 'Polyvalent et confortable au quotidien.',
     'S', 'neuf', 'Reebok',                      2),

(45, 'Pantalon cargo',       24.51, 'img/pantalon8.jpg',
     'pantalons', 'Parfait pour un style casual ou habillé.',
     'XL', 'neuf', 'Nike',                       2),

(46, 'Jogging confortable',  11.26, 'img/pantalon9.jpg',
     'pantalons', 'Tissu de qualité et coupe parfaite.',
     'S', 'neuf', 'Reebok',                      2),

(47, 'Jean slim',            16.98, 'img/pantalon10.jpg',
     'pantalons', 'Parfait pour un style casual ou habillé.',
     'XL', 'neuf', 'Under Armour',               2),

(48, 'Polo classique',       12.16, 'img/polo_test2.jpg',
     'chandails', 'Un classique indémodable.',
     'M', 'neuf', 'Adidas',                      2),

(49, 'Robe élégante',        13.53, 'img/robe_test8.jpg',
     'robes', 'Confortable et élégante.',
     'S', 'neuf', 'Under Armour',                2),

(50, 'Robe de soirée',       24.30, 'img/robe1.jpg',
     'robes', 'Idéale pour vos soirées ou sorties.',
     'S', 'neuf', 'Nike',                        2),

(51, 'Robe fluide',          21.67, 'img/robe2.jpg',
     'robes', 'Parfaite pour la saison estivale.',
     'L', 'neuf', 'Under Armour',                2),

(52, 'Robe d''été',          21.00, 'img/robe3.jpg',
     'robes', 'Confortable et élégante.',
     'S', 'neuf', 'Adidas',                      2),

(53, 'Robe de soirée',       13.14, 'img/robe4.jpg',
     'robes', 'Parfaite pour la saison estivale.',
     'XL', 'neuf', 'Under Armour',               2),

(54, 'Robe élégante',        20.04, 'img/robe5.jpg',
     'robes', 'Matière douce et légère.',
     'M', 'neuf', 'Adidas',                      2),

(55, 'Robe d''été',          18.38, 'img/robe6.jpg',
     'robes', 'Parfaite pour la saison estivale.',
     'L', 'neuf', 'Nike',                        2),

(56, 'Robe d''été',          12.77, 'img/robe7.jpg',
     'robes', 'Matière douce et légère.',
     'S', 'neuf', 'Reebok',                      2),

(57, 'Robe élégante',        22.25, 'img/robe8.jpg',
     'robes', 'Parfaite pour la saison estivale.',
     'S', 'neuf', 'Puma',                        2),

(58, 'Robe d''été',          21.41, 'img/robe9.jpg',
     'robes', 'Matière douce et légère.',
     'L', 'neuf', 'Reebok',                      2),

(59, 'Robe d''été',          13.31, 'img/robe10.jpg',
     'robes', 'Confortable et élégante.',
     'S', 'neuf', 'Adidas',                      2),

(60, 'Robe élégante',        10.23, 'img/robe11.jpg',
     'robes', 'Confortable et élégante.',
     'XL', 'neuf', 'Reebok',                     2),

(61, 'Robe fluide',          18.19, 'img/robe12.jpg',
     'robes', 'Matière douce et légère.',
     'XL', 'neuf', 'Under Armour',               2),

(62, 'Robe fluide',          22.89, 'img/robe13.jpg',
     'robes', 'Matière douce et légère.',
     'M', 'neuf', 'Nike',                        2),

(63, 'Robe d''été',          21.13, 'img/robe14.jpg',
     'robes', 'Confortable et élégante.',
     'M', 'neuf', 'Under Armour',               2),

(64, 'Robe élégante',        16.92, 'img/robe15.jpg',
     'robes', 'Parfaite pour la saison estivale.',
     'M', 'neuf', 'Nike',                        2),

(65, 'Robe d''été',          13.35, 'img/robe16.jpg',
     'robes', 'Parfaite pour la saison estivale.',
     'L', 'neuf', 'Puma',                        2),

(66, 'Short de sport',       14.79, 'img/short_test6.webp',
     'shorts', 'Conçu pour vos activités estivales.',
     'S', 'neuf', 'Reebok',                      2),

(67, 'Short en jean',        15.64, 'img/short1.jpg',
     'shorts', 'Parfait pour la plage ou la ville.',
     'S', 'neuf', 'Adidas',                      2),

(68, 'Short en jean',        17.87, 'img/short2.jpg',
     'shorts', 'Tissu léger et respirant.',
     'L', 'neuf', 'Reebok',                      2);

COMMIT;
