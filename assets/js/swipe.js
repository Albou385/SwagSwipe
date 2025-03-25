document.addEventListener("DOMContentLoaded", () => {
    // Sélection des éléments HTML en fonction des nouveaux id
    const productImage       = document.getElementById("product-image");
    const productNom         = document.getElementById("product-nom");
    const productPrix        = document.getElementById("product-prix");
    const productCategorie   = document.getElementById("product-categorie");
    const productDescription = document.getElementById("product-description");
    const productTaille      = document.getElementById("product-taille");
    const productCondition   = document.getElementById("product-condition");
    const productMarque      = document.getElementById("product-marque");
    const productVille       = document.getElementById("product-ville");
    const productPays        = document.getElementById("product-pays");

    const rejectBtn = document.getElementById("reject-btn");
    const acceptBtn = document.getElementById("accept-btn");
    const resetBtn  = document.getElementById("reset-btn"); // Bouton de réinitialisation des swipes

    let isSwiping = false; // Empêche le spam de swipe
    let products = [];               // Liste des produits
    let swipedProducts = new Set();  // Stocke les ID des produits déjà swipés

    // Charger les produits depuis le fichier JSON
    fetch("./sql/products.json")
        .then(response => response.json())
        .then(data => {
            products = data;
            showRandomProduct();
        })
        .catch(error => console.error("Erreur de chargement des produits :", error));

    // Afficher un produit aléatoire qui n'a pas encore été swipé
    function showRandomProduct() {
        const availableProducts = products.filter(p => !swipedProducts.has(p.id));

        if (availableProducts.length === 0) {
            alert("Tous les produits ont été swipés !");
            return;
        }

        // Sélection aléatoire
        const randomIndex = Math.floor(Math.random() * availableProducts.length);
        const product = availableProducts[randomIndex];

        // Mettre à jour l'affichage du produit
        // Remarque : le chemin vers l'image dépend de votre structure de dossiers
        productImage.src = product.image;
        productImage.alt = product.nom;

        productNom.textContent         = product.nom;
        productPrix.textContent        = `Prix : ${product.prix} $`;
        productDescription.textContent = product.description;
        productTaille.textContent      = `Taille : ${product.taille}`;
        productCondition.textContent   = `Condition : ${product.condition}`;
        productVille.textContent = `Ville : ${product.ville}`;


        // Stocke l'ID du produit actuellement affiché dans l'attribut data-id de l'image
        productImage.dataset.id = product.id;
    }

    // Gérer le swipe (acceptation ou rejet)
    function handleSwipe(isAccepted) {
        if (isSwiping) return;
        isSwiping = true;
    
        const productId = parseInt(productImage.dataset.id, 10);
        const product = products.find(p => p.id === productId);
    
        if (isAccepted) {
            saveToFavorites(product);
        }
    
        if (!swipedProducts.has(productId)) {
            swipedProducts.add(productId);
        }
    
        const productCard = document.getElementById("product-card");
        const swipeClass = isAccepted ? "swipe-right" : "swipe-left";
    
        productCard.classList.add(swipeClass);
        productCard.style.transition = "transform 0.5s ease-out";
        productCard.style.transform = isAccepted ? "translateX(100vw)" : "translateX(-100vw)";
    
        setTimeout(() => {
            productCard.classList.remove(swipeClass);
            productCard.style.transition = "none";
            productCard.style.transform = "translateX(0)";
            showRandomProduct();
            isSwiping = false;
        }, 800);
    }    
    

    // Sauvegarde en favoris
    function saveToFavorites(product) {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        // Vérifier si le produit n'est pas déjà en favoris
        if (!favorites.some(fav => fav.id === product.id)) {
            favorites.push(product);
            localStorage.setItem("favorites", JSON.stringify(favorites));
        }
    }

    // Réinitialiser les produits swipés
    function resetSwipes() {
        swipedProducts.clear();
        showRandomProduct();
    }

    // Ajout des événements sur les boutons
    rejectBtn.addEventListener("click", () => handleSwipe(false));
    acceptBtn.addEventListener("click", () => handleSwipe(true));
    resetBtn.addEventListener("click", resetSwipes); // Bouton de réinitialisation

    // Gestion des touches du clavier
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            handleSwipe(false);
        } else if (event.key === "ArrowRight") {
            handleSwipe(true);
        }
    });
});
