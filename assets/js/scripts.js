document.addEventListener("DOMContentLoaded", () => {
    const productGrid = document.getElementById("productGrid");
    const searchBar = document.getElementById("searchBar");
    const filterCategory = document.getElementById("filterCategory");
    const sortOptions = document.getElementById("sortOptions");
    const loadingIndicator = document.getElementById("loading");

    let allProducts = [];
    let displayedProducts = 0;
    const productsPerLoad = 6;
    let displayedProductKeys = new Set(); // ✅ Unicité par contenu
    let endMessageDisplayed = false;

    function generateProductKey(product) {
        return `${product.nom}-${product.description}-${product.taille}-${product.condition}-${product.ville}-${product.pays}`;
    }

    async function loadProducts() {
        try {
            const response = await fetch("../sql/products.json");
            const data = await response.json();

            // ✅ Éliminer les doublons par "caractéristiques visibles"
            const productMap = new Map();
            data.forEach(product => {
                const key = generateProductKey(product);
                if (!productMap.has(key)) {
                    productMap.set(key, product);
                }
            });

            allProducts = Array.from(productMap.values());
            resetDisplayedProducts();
        } catch (error) {
            console.error("Erreur de chargement des produits :", error);
        }
    }

    function resetDisplayedProducts() {
        displayedProducts = 0;
        displayedProductKeys.clear();
        endMessageDisplayed = false;
        productGrid.innerHTML = "";
        displayMoreProducts();
    }

    function displayMoreProducts() {
        let filteredProducts = filterAndSortProducts();

        const nextBatch = filteredProducts
            .filter(p => !displayedProductKeys.has(generateProductKey(p)))
            .slice(0, productsPerLoad);

        if (nextBatch.length === 0) {
            loadingIndicator.style.display = "none";

            if (!endMessageDisplayed) {
                const endMessage = document.createElement("p");
                endMessage.textContent = "🎉 Tous les produits ont été affichés !";
                endMessage.style.textAlign = "center";
                endMessage.style.marginTop = "20px";
                endMessage.style.color = "black";
                endMessage.style.fontWeight = "bold";
                endMessage.id = "message-fin";
                productGrid.appendChild(endMessage);
                endMessageDisplayed = true;
            }

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
            displayedProductKeys.add(generateProductKey(product));
        });

        displayedProducts += nextBatch.length;
        loadingIndicator.style.display = "block";

        // Ajouter les événements "Favoris"
        document.querySelectorAll(".btn-favori").forEach(button => {
            button.addEventListener("click", event => {
                const productId = parseInt(event.target.dataset.id, 10);
                const product = allProducts.find(p => p.id === productId);
                saveToFavorites(product);
            });
        });
    }

    function filterAndSortProducts() {
        let filtered = [...allProducts];

        const selectedCategory = filterCategory.value;
        if (selectedCategory) {
            filtered = filtered.filter(p => p.categorie === selectedCategory);
        }

        const searchText = searchBar.value.toLowerCase().trim();
        if (searchText) {
            filtered = filtered.filter(p => p.nom.toLowerCase().includes(searchText));
        }

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
    
        // Évite les doublons
        if (!favorites.some(fav => fav.id === product.id)) {
            favorites.push(product);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            alert("Produit ajouté aux favoris !");
        }
    }
    

    searchBar.addEventListener("input", resetDisplayedProducts);
    filterCategory.addEventListener("change", resetDisplayedProducts);
    sortOptions.addEventListener("change", resetDisplayedProducts);

    window.addEventListener("scroll", () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            displayMoreProducts();
        }
    });

    loadProducts();
});
