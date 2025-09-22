# SwagSwipe

SwagSwipe est une application web vitrine (HTML/CSS/JS) avec un backend PHP minimal orienté formulaires pour la connexion/inscription et une base de données MySQL hébergée (Azure). L’interface propose une expérience type « swipe » pour découvrir des vêtements usagés, un catalogue avec recherche/tri/pagination progressive, une gestion des favoris côté navigateur et des pages d’inscription/connexion.

## Sommaire
- Présentation rapide
- Démo locale (comment lancer)
- Structure du projet
- Fonctionnalités clés
- Données et persistance
- Backend PHP et base de données
- Sécurité et bonnes pratiques
- Déploiement (hébergement statique + PHP)
- Roadmap / améliorations

## Présentation rapide
- Front statique en HTML/CSS/JS dans `html/` et `assets/`.
- Données produits en JSON dans `sql/products.json` (utilisé par le swipe et le catalogue).
- Favoris et session utilisateur simulée via `localStorage` (pas de JWT côté front).
- Pages d’authentification connectées à des endpoints PHP (`assets/php/`).
- Connexion à MySQL Azure via `assets/php/connexion.php` (avec SSL attendu).

## Démo locale
Étant donné que l’application charge des fichiers via `fetch()` et envoie des formulaires vers du PHP, vous devez utiliser un serveur web local.

### Option 1 — PHP intégré
1. Ouvrez un terminal à la racine du projet.
2. Lancez: `php -S localhost:8000 -t .`
3. Ouvrez `http://localhost:8000/html/accueil.html` dans votre navigateur.

### Option 2 — Serveur simple Python (front uniquement)
Uniquement pour les pages qui ne nécessitent pas de PHP. Le swipe et le catalogue fonctionneront, mais la soumission de formulaire vers PHP échouera.
1. `python -m http.server 8000`
2. `http://localhost:8000/html/accueil.html`

## Structure du projet
```
SwagSwipe/
  html/                      # Pages HTML (accueil, swipe, produits, favoris, profil, auth)
  assets/
    css/                    # Styles par page
    img/                    # Images (produits, logo, icônes)
    js/                     # Scripts front (swipe, catalogue, favoris, session, etc.)
    php/                    # Endpoints PHP (connexion, inscription, config DB)
  sql/
    products.json           # Jeu de données produits (utilisé par le front)
```

## Fonctionnalités clés
- Swipe (`html/swipe.html` + `assets/js/swipe.js`):
  - Affiche au hasard des produits non encore swipés.
  - Swipe droite = ajout aux favoris (stocké en `localStorage`).
  - Navigation au clavier (flèches gauche/droite).

- Catalogue (`html/afficher_produits.html` + `assets/js/scripts.js`):
  - Chargement des produits depuis `sql/products.json`.
  - Filtre par catégorie, recherche texte, tri (prix/alpha).
  - « Infinite scroll » par lots, suppression des doublons par caractéristiques visibles.

- Favoris (`html/favoris.html` + `assets/js/favoris.js`):
  - Affichage des favoris enregistrés (localStorage).
  - Retrait individuel / vidage global.
  - Simulation de contact vendeur (WhatsApp/SMS) + historique local.
  - Redirection vers la page de connexion si non connecté (via localStorage).

- Session utilisateur UI (`assets/js/session_utilisateur.js`):
  - Zone utilisateur dynamique dans l’en-tête selon `localStorage.utilisateurConnecte`.
  - Boutons Inscription/Connexion ou bouton Déconnexion.

- Authentification (HTML + PHP):
  - `html/creation_utilisateur.html` → `assets/php/SeInscrire.php`.
  - `html/connexion.html` → `assets/php/SeConnecter.php`.

## Données et persistance
- Produits: `sql/products.json`. Les images référencées doivent exister dans `assets/img/` ou être servies depuis un CDN.
- Favoris: `localStorage.favorites` (tableau d’objets produits). Pas de serveur requis.
- Session UI: `localStorage.utilisateurConnecte` (objet minimal pour afficher le prénom + actions). La vraie session côté serveur est distincte si vous utilisez PHP.

## Backend PHP et base de données
- Fichier de connexion DB: `assets/php/connexion.php` (MySQL Azure).
  - Variables actuelles dans le code: `host`, `dbname`, `username`, `password`.
  - Un certificat SSL est attendu (variable `$sslCertPath` commentée) et vérification serveur désactivée.
  - Recommandé: charger la config depuis des variables d’environnement et sécuriser le chemin du certificat.

- Connexion (`assets/php/SeConnecter.php`):
  - Lit `email` et `mot_de_passe` (POST), récupère l’utilisateur, compare le mot de passe en clair, renvoie JSON puis démarre une session et redirige.
  - Points à corriger: hashage des mots de passe, réponse unique (JSON OU redirection), gestion d’erreurs HTTP.

- Inscription (`assets/php/SeInscrire.php`):
  - Valide la correspondance des mots de passe, refuse les doublons d’email, insère l’utilisateur.
  - Conflit de fusion présent dans le fichier (marqueurs `<<<<<<<`, `=======`, `>>>>>>>`) à résoudre.
  - Points à corriger: hashage des mots de passe, validations serveurs complètes, upload image (si requis), messages d’erreur structurés.

## Sécurité et bonnes pratiques (recommandé)
- Ne jamais stocker ni comparer des mots de passe en clair. Utiliser `password_hash()` et `password_verify()`.
- Éviter d’exposer des identifiants en clair dans le dépôt. Utiliser des variables d’environnement (ex: `.env` chargé via `vlucas/phpdotenv`).
- Gérer le SSL correctement (fournir un certificat valide et activer la vérification serveur).
- Nettoyer/valider toutes les entrées côté serveur (email, téléphone, adresse, etc.).
- Séparer strictement les réponses JSON des redirections HTML.
- Protéger les endpoints sensibles par session/CSRF, limiter le debug en production.

## Déploiement
L’application comporte deux parties: statique (HTML/CSS/JS) et PHP.

- Hébergement statique (pages, JS, CSS):
  - N’importe quel hébergeur statique (Netlify, Vercel, GitHub Pages) convient, mais les pages qui POSTent vers PHP ne fonctionneront pas sans backend.

- Hébergement PHP:
  - Utiliser un hébergement compatible PHP 8.x + MySQL (ou un App Service Azure/VM).
  - Configurer les variables d’environnement (DB_HOST, DB_NAME, DB_USER, DB_PASS, SSL_CA_PATH) et adapter `connexion.php`.
  - Vérifier que les chemins des redirections pointent vers les URLs publiques.

## Roadmap / améliorations
- Résoudre le conflit Git dans `assets/php/SeInscrire.php` et unifier le style de code.
- Implémenter le hashage des mots de passe et la vérification sécurisée.
- Centraliser la configuration (variables d’env + loader) et retirer les secrets du code.
- Uniformiser l’authentification: choisir JSON API (fetch) OU formulaire/redirect, pas un mélange.
- Ajouter une vraie persistance pour les favoris côté serveur (optionnel) et la messagerie.
- Ajouter des tests basiques (ex.: validation JS, endpoints PHP avec PHPUnit/Pest).
- Mettre en place lints/formatters (ESLint/Prettier pour JS, PHP-CS-Fixer).

## Crédits
- Icônes/visuels: voir sources dans les pages HTML.
- Données produits: `sql/products.json` (jeu d’exemple).


