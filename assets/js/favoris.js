document.addEventListener("DOMContentLoaded", () => {
    const favoritesGrid = document.getElementById("favoritesGrid");

    function loadFavorites() {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        favoritesGrid.innerHTML = "";

        if (favorites.length === 0) {
            favoritesGrid.innerHTML = "<p>Aucun produit en favoris.</p>";
            return;
        }

        favorites.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("favorite-card");

            // Création de la liste des caractéristiques
            const featuresList = product.features ? 
                `<ul class="product-features">
                    ${product.features.map(feature => `<li>✔️ ${feature}</li>`).join("")}
                </ul>` 
                : "";

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="favorite-image">
                <h3>${product.name}</h3>
                <p class="favorite-price">Prix: ${product.price.toFixed(2)} $</p>
                <p class="favorite-category">Catégorie: ${product.category}</p>
                <p class="favorite-description">${product.description}</p>
                <p class="favorite-size">🛍️ Taille: ${product.size || "N/A"}</p>
                <p class="favorite-condition">🔍 État: ${product.condition || "N/A"}</p>
                <p class="favorite-brand">🏷️ Marque: ${product.brand || "N/A"}</p>
                <p class="favorite-seller">👤 Vendu par: ${product.seller || "Inconnu"}</p>
                <p class="favorite-location">📍 Localisation: ${product.location || "Non spécifié"}</p>
                <p class="favorite-date">📅 Ajouté le: ${product.date_added || "Non spécifié"}</p>
                ${featuresList}
                <button class="btn-remove" data-id="${product.id}">❌ Retirer des Favoris</button>
            `;

            favoritesGrid.appendChild(productCard);
        });

        document.querySelectorAll(".btn-remove").forEach(button => {
            button.addEventListener("click", event => {
                const productId = parseInt(event.target.dataset.id, 10);
                removeFromFavorites(productId);
            });
        });
    }

    function removeFromFavorites(productId) {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        favorites = favorites.filter(product => product.id !== productId);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        loadFavorites();
    }

    function clearFavorites() {
        localStorage.removeItem("favorites");
        loadFavorites();
    }

    document.getElementById("clearFavorites").addEventListener("click", clearFavorites);
    loadFavorites();
});
