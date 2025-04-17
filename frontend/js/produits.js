// ✅ Script robuste pour afficher_produits.js avec création DOM sans duplication

document.addEventListener("DOMContentLoaded", () => {
    const productGrid = document.getElementById("productGrid");
    const searchBar = document.getElementById("searchBar");
    const filterCategory = document.getElementById("filterCategory");
    const sortOptions = document.getElementById("sortOptions");
    const loadingIndicator = document.getElementById("loading");

    let allProducts = [];
    let displayedProducts = 0;
    const productsPerLoad = 6;
    let displayedProductIds = new Set();
    let endMessageDisplayed = false;

    // 🔄 Charger les produits
    async function loadProducts() {
        try {
            const response = await fetch("../../db/products.json");
            const data = await response.json();
            allProducts = data.map(p => ({ ...p, id: Number(p.id) }));
            resetDisplayedProducts();
        } catch (error) {
            console.error("Erreur de chargement des produits :", error);
        }
    }

    function resetDisplayedProducts() {
        displayedProducts = 0;
        displayedProductIds.clear();
        endMessageDisplayed = false;
        productGrid.innerHTML = "";
        displayMoreProducts();
    }

    function displayMoreProducts() {
        let filteredProducts = filterAndSortProducts();

        const nextBatch = filteredProducts
            .filter(p => !displayedProductIds.has(p.id))
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

            const image = document.createElement("img");
            image.src = product.image;
            image.alt = product.nom;
            image.className = "product-image";

            const title = document.createElement("h3");
            title.textContent = product.nom;

            const price = document.createElement("p");
            price.className = "product-price";
            price.textContent = `${product.prix.toFixed(2)} $`;

            const category = document.createElement("p");
            category.className = "product-category";
            category.textContent = `Catégorie: ${product.categorie}`;

            const description = document.createElement("p");
            description.className = "product-description";
            description.textContent = product.description;

            const size = document.createElement("p");
            size.className = "product-size";
            size.textContent = `Taille: ${product.taille}`;

            const condition = document.createElement("p");
            condition.className = "product-condition";
            condition.textContent = `État: ${product.condition}`;

            const location = document.createElement("p");
            location.className = "product-location";
            location.textContent = `Localisation: ${product.ville}, ${product.pays}`;

            const favButton = document.createElement("button");
            favButton.className = "btn-favori";
            favButton.setAttribute("data-id", product.id);
            favButton.textContent = "❤️ Ajouter aux Favoris";
            favButton.addEventListener("click", () => {
                saveToFavorites(product);
            });

            productCard.appendChild(image);
            productCard.appendChild(title);
            productCard.appendChild(price);
            productCard.appendChild(category);
            productCard.appendChild(description);
            productCard.appendChild(size);
            productCard.appendChild(condition);
            productCard.appendChild(location);
            productCard.appendChild(favButton);

            productGrid.appendChild(productCard);
            displayedProductIds.add(product.id);
        });

        displayedProducts += nextBatch.length;
        loadingIndicator.style.display = "block";
    }

    function filterAndSortProducts() {
        let filtered = [...allProducts];

        const selectedCategory = filterCategory.value;
        if (selectedCategory && selectedCategory !== "") {
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
