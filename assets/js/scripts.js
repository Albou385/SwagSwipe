document.addEventListener("DOMContentLoaded", () => {
    const productGrid = document.getElementById("productGrid");
    const searchBar = document.getElementById("searchBar");
    const filterCategory = document.getElementById("filterCategory");
    const sortOptions = document.getElementById("sortOptions");
    const loadingIndicator = document.getElementById("loading");

    let products = [];
    let displayedProducts = 0;
    const productsPerLoad = 6;
    let displayedProductIds = new Set(); // ✅ Stocke les ID des produits déjà affichés pour éviter les doublons

    async function loadProducts() {
        try {
            const response = await fetch("./sql/products.json");
            products = await response.json();
            console.log("Produits chargés :", products.length, "produits");

            // ✅ Réinitialisation des données uniquement lors d'un filtrage ou d'une recherche
            resetDisplayedProducts();
        } catch (error) {
            console.error("Erreur de chargement des produits :", error);
        }
    }

    function resetDisplayedProducts() {
        displayedProducts = 0;
        displayedProductIds.clear(); // ✅ Réinitialisation des ID affichés uniquement au changement de filtre
        productGrid.innerHTML = "";
        displayMoreProducts(); // 🔥 Recharge correctement les produits
    }

    function displayMoreProducts() {
        let filteredProducts = filterAndSortProducts();

        console.log(`Produits déjà affichés : ${displayedProducts}`);
        console.log(`Produits restants : ${filteredProducts.length - displayedProducts}`);

        let nextBatch = filteredProducts
            .filter(p => !displayedProductIds.has(p.id)) // ✅ Filtrer les produits déjà affichés
            .slice(0, productsPerLoad);

        if (nextBatch.length === 0) {
            console.log("Tous les produits ont été chargés.");
            loadingIndicator.style.display = "none";
            return;
        }

        nextBatch.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.nom}" class="product-image">
                <h3>${product.nom}</h3>
                <p class="product-price">${product.prix.toFixed(2)} $</p>
                <p class="product-category">Catégorie: ${product.categorie}</p>
                <p class="product-description">${product.description}</p>
                <p class="product-size">Taille: ${product.taille}</p>
                <p class="product-condition">État: ${product.condition}</p>
                <p class="product-location">Localisation: ${product.ville}, ${product.pays}</p>
                <button class="btn-favori" data-id="${product.id}">❤️ Ajouter aux Favoris</button>
            `;

            productGrid.appendChild(productCard);
            displayedProductIds.add(product.id); // ✅ Ajouter l'ID du produit aux produits affichés
        });

        displayedProducts += nextBatch.length; // ✅ Mise à jour correcte du compteur

        if (displayedProducts >= filteredProducts.length) {
            console.log("Tous les produits affichés !");
            loadingIndicator.style.display = "none";
        } else {
            loadingIndicator.style.display = "block";
        }

        // ✅ Ajouter les événements sur les nouveaux boutons "Ajouter aux Favoris"
        document.querySelectorAll(".btn-favori").forEach(button => {
            button.addEventListener("click", event => {
                const productId = parseInt(event.target.dataset.id, 10);
                const product = products.find(p => p.id === productId);
                saveToFavorites(product);
            });
        });
    }

    function filterAndSortProducts() {
        let filtered = [...products]; // ✅ Créer une copie de `products` pour éviter les modifications involontaires

        // 🔥 Appliquer le filtre de catégorie
        const selectedCategory = filterCategory.value;
        if (selectedCategory) {
            filtered = filtered.filter(product => product.categorie === selectedCategory);
        }

        // 🔥 Appliquer le filtre de recherche
        const searchText = searchBar.value.toLowerCase().trim();
        if (searchText) {
            filtered = filtered.filter(product => product.nom.toLowerCase().includes(searchText));
        }

        // 🔥 Appliquer le tri
        const sortValue = sortOptions.value;
        if (sortValue === "prix-asc") {
            filtered.sort((a, b) => a.prix - b.prix);
        } else if (sortValue === "prix-desc") {
            filtered.sort((a, b) => b.prix - a.prix);
        } else if (sortValue === "alpha-asc") {
            filtered.sort((a, b) => a.nom.localeCompare(b.nom));
        } else if (sortValue === "alpha-desc") {
            filtered.sort((a, b) => b.nom.localeCompare(a.nom));
        }

        return filtered;
    }

    function saveToFavorites(product) {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        if (!favorites.some(fav => fav.id === product.id)) {
            favorites.push(product);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            alert("Produit ajouté aux favoris !");
        }
    }

    // ✅ Ajouter les événements pour filtrer dynamiquement
    searchBar.addEventListener("input", resetDisplayedProducts);
    filterCategory.addEventListener("change", resetDisplayedProducts);
    sortOptions.addEventListener("change", resetDisplayedProducts);

    // ✅ Scroll Infini
    window.addEventListener("scroll", () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            displayMoreProducts();
        }
    });

    loadProducts();
});
