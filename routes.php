<?php
require_once __DIR__.'/router.php';

// Home Routes
get('/', 'frontend/pages/accueil.html');

// Authentication Routes
get('/login', 'frontend/pages/login.html'); // GET
get('/signup', 'frontend/pages/signup.html'); // GET
post('/signup', 'frontend/pages/signup.html'); // POST

// Frontend Pages Routes
get('/hello-world', 'frontend/pages/hello-world.html'); // GET

// Admin Route Check Permission
get('/admin', function() {
    if (isAdmin()) {
        include_once __DIR__ . '/frontend/pages/admin.html';
    }    
}); // GET

// API Routes
post('/api/login', 'api/login.php'); // POST
post('/api/signup', 'api/signup.php'); // POST
post('/api/logout', 'api/logout.php'); // POST
get('/api/user_details', 'api/user_details.php'); // GET

get('/api/clients', 'api/clients.php'); // GET

post('/api/hello-world/$langue', 'api/hello-world.php'); // POST
get('/api/hello-world/$langue', 'api/hello-world.php'); // GET

get('/api/random-image', 'api/random-image.php'); // GET
post('/api/random-image', 'api/random-image.php'); // POST


// 404 Route
any('/404', 'frontend/pages/404.html');
// 403 Route
any('/403', 'frontend/pages/403.html');
?>
