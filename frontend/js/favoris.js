document.addEventListener("DOMContentLoaded", () => {
    // Vérification si l'utilisateur est connecté
    function estConnecte() {
        return localStorage.getItem("utilisateurConnecte") !== null;
    }

    if (!estConnecte()) {
        alert("Vous devez être connecté pour consulter vos favoris.");
        window.location.href = "/login";
        return;
    }

    const favoritesGrid = document.getElementById("favoritesGrid");
    const modal = document.getElementById("modal-message");
    const closeModalBtn = document.getElementById("close-modal");
    const messageText = document.getElementById("message-text");
    const historyList = document.getElementById("history-list");
    const clearBtn = document.getElementById("clearFavorites");

    function loadFavorites() {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        favoritesGrid.innerHTML = "";

        if (favorites.length === 0) {
            favoritesGrid.innerHTML = "<p>Aucun produit en favoris.</p>";
            return;
        }

        favorites.forEach(product => {
            const {
                id,
                nom = "Produit",
                prix = 0,
                image = "frontend/img/default.png",
                categorie = "N/A",
                description = "Aucune description",
                taille = "N/A",
                conditions = "Inconnue",
                marque = "Sans marque",
                id_user = "Inconnu",
                ville = "Inconnue",
                pays = "Canada"
            } = product;

            const productCard = document.createElement("div");
            productCard.classList.add("favorite-card");

            productCard.innerHTML = `
                <img src="${image}" alt="${nom}" class="favorite-image">
                <h3>${nom}</h3>
                <p class="favorite-price">💲 ${prix.toFixed(2)} $</p>
                <p class="favorite-category">📁 Catégorie : ${categorie}</p>
                <p class="favorite-description">📝 ${description}</p>
                <p class="favorite-size">🛍️ Taille : ${taille}</p>
                <p class="favorite-condition">🔍 État : ${conditions}</p>
                <p class="favorite-brand">🏷️ Marque : ${marque}</p>
                <p class="favorite-seller">👤 Vendu par : ${id_user}</p>
                <p class="favorite-location">📍 Localisation : ${ville}, ${pays}</p>
                <div class="btn-actions">
                    <button class="btn-remove" data-id="${id}">❌ Retirer</button>
                    <button class="btn-contact" data-id="${id}" data-nom="${nom}" data-vendeur="${id_user}" data-ville="${ville}">📩 Contacter</button>
                </div>
            `;

            favoritesGrid.appendChild(productCard);
        });

        // Actions : retirer des favoris
        document.querySelectorAll(".btn-remove").forEach(button => {
            button.addEventListener("click", event => {
                const productId = parseInt(event.target.dataset.id, 10);
                removeFromFavorites(productId);
            });
        });

        // Actions : contacter le vendeur
        document.querySelectorAll(".btn-contact").forEach(button => {
            button.addEventListener("click", event => {
                const nomProduit = event.target.dataset.nom;
                const vendeur = event.target.dataset.vendeur;
                const ville = event.target.dataset.ville;

                const message = `Bonjour, je suis intéressé(e) par votre produit "${nomProduit}" sur SwagSwipe. Est-il toujours disponible ?`;
                messageText.value = message;

                const numero = "15145551234"; // À remplacer par vendeur plus tard
                const smsURL = `sms:${numero}?body=${encodeURIComponent(message)}`;
                const whatsappURL = `https://wa.me/${numero}?text=${encodeURIComponent(message)}`;

                document.getElementById("send-whatsapp").href = whatsappURL;
                document.getElementById("send-sms").href = smsURL;

                document.getElementById("send-whatsapp").onclick = () => saveMessage(vendeur, nomProduit, message);
                document.getElementById("send-sms").onclick = () => saveMessage(vendeur, nomProduit, message);

                displayHistory(vendeur, nomProduit);
                modal.style.display = "flex";
            });
        });

        closeModalBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    function saveMessage(vendeurId, nomProduit, message) {
        const key = `history-${vendeurId}-${nomProduit}`;
        let history = JSON.parse(localStorage.getItem(key)) || [];
        const timestamp = new Date().toLocaleString();
        history.push({ message, timestamp });
        localStorage.setItem(key, JSON.stringify(history));
    }

    function displayHistory(vendeurId, nomProduit) {
        const key = `history-${vendeurId}-${nomProduit}`;
        const history = JSON.parse(localStorage.getItem(key)) || [];
        historyList.innerHTML = "";
        history.forEach(entry => {
            const li = document.createElement("li");
            li.textContent = `${entry.timestamp} - ${entry.message}`;
            historyList.appendChild(li);
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

    if (clearBtn) clearBtn.addEventListener("click", clearFavorites);
    loadFavorites();
});
