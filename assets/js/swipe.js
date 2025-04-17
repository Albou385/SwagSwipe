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
    fetch("../sql/products.json")
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
        productMarque.textContent = `Marque : ${product.marque}`;
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
    
        if (!product) {
            console.error("Produit introuvable pour l'ID :", productId);
            isSwiping = false;
            return;
        }
    
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
    
        setTimeout(() => {
            productCard.classList.remove(swipeClass);
            productCard.style.transition = "none";
            productCard.style.transform = "none";
            showRandomProduct();
            isSwiping = false;
            console.log("Swipe terminé");
        }, 800);
    }
      
    

    // Sauvegarde en favoris
    function saveToFavorites(product) {
        if (!product || !product.id) {
            console.error("Produit invalide :", product);
            return;
        }
    
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    
        // 🔒 Nettoyer les valeurs nulles ou invalides
        favorites = favorites.filter(fav => fav && typeof fav === 'object' && 'id' in fav);
    
        // ✅ Ajouter si pas déjà présent
        if (!favorites.some(fav => fav.id === product.id)) {
            favorites.push(product);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            console.log("Produit ajouté aux favoris :", product);
        } else {
            console.log("Produit déjà en favoris :", product);
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
    //resetBtn.addEventListener("click", resetSwipes); // Bouton de réinitialisation

    // Gestion des touches du clavier
    window.addEventListener("keydown", (event) => {
        // Ne réagit pas si une zone de texte est active
        if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;
    
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            handleSwipe(false);
        } else if (event.key === "ArrowRight") {
            event.preventDefault();
            handleSwipe(true);
        }
    });
    
});
