<?php
require_once __DIR__ . '/router.php';

/* ------------------------------------------------------------------
|  Front‑facing pages
* -----------------------------------------------------------------*/

// Home
get('/', 'frontend/pages/accueil.html');

// Auth forms
get('/login',  'frontend/pages/connexion.html');
get('/signup', 'frontend/pages/creation_utilisateur.html');

// Product pages
get('/afficher_produits', 'frontend/pages/afficher_produits.html');
get('/ajouter_produit',   'frontend/pages/ajouter_produit.html');

// User pages
get('/profil',  'frontend/pages/profil.html');
get('/favoris', 'frontend/pages/favoris.html');

// Social / reviews
get('/avis',        'frontend/pages/avis.html');
get('/retour_avis', 'frontend/pages/retour_avis.html');

// Extra UX
get('/swipe', 'frontend/pages/swipe.html');


/* ------------------------------------------------------------------
|  API – Auth & user session
* -----------------------------------------------------------------*/

post('/api/login',  'api/login.php');
post('/api/signup', 'api/signup.php');
post('/api/logout', 'api/logout.php');
get ('/api/user_details', 'api/user_details.php');


/* ------------------------------------------------------------------
|  API – produits, favoris, avis
* -----------------------------------------------------------------*/

get ('/api/favori',  'api/favori.php');   // list / check fav
post('/api/favori',  'api/favori.php');   // add / remove fav

get ('/api/avis',    'api/avis.php');     // list avis for produit
post('/api/avis',    'api/avis.php');     // create / update avis

get ('/api/produits', 'api/products.php');   // ?id=123 → detail | sans id → liste
get ('/api/products', 'api/products.php');   // optional alias


/* ------------------------------------------------------------------
|  API – swipe & upload
* -----------------------------------------------------------------*/

get ('/api/swipe',    'api/swipe.php');      // renvoie produits à swiper
post('/api/swipe',    'api/swipe.php');      // enregistre un like

post('/api/image',    'api/image.php');      // upload d’image produit


/* ------------------------------------------------------------------
|  API – admin / outils divers
* -----------------------------------------------------------------*/

get('/api/utilisateurs', 'api/utilisateurs.php');   // admin-only user list
get('/api/hello-world',  'api/hello-world.php');    // test route


/* ------------------------------------------------------------------
|  Admin page (protected)
* -----------------------------------------------------------------*/

get('/admin', function () {
    if (isAdmin()) {
        include_once __DIR__ . '/frontend/pages/admin.html';
    } else {
        header('Location: /403');
        exit;
    }
});


/* ------------------------------------------------------------------
|  Fallbacks – 403, 404
* -----------------------------------------------------------------*/

any('/403', 'frontend/pages/403.html');
any('/404', 'frontend/pages/404.html');
