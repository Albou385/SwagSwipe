document.addEventListener("DOMContentLoaded", () => {
    // Vérification si l'utilisateur est connecté
    function estConnecte() {
        return localStorage.getItem("utilisateurConnecte") !== null;
    }

    if (!estConnecte()) {
        alert("Vous devez être connecté pour consulter vos favoris.");
        window.location.href = "connexion.html";
        return; // Stopper l'exécution ici
    }

    // Le reste du code ne s'exécutera que si connecté
    const favoritesGrid = document.getElementById("favoritesGrid");
    const modal = document.getElementById("modal-message");
    const closeModalBtn = document.getElementById("close-modal");
    const messageText = document.getElementById("message-text");
    const historyList = document.getElementById("history-list");

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

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.nom}" class="favorite-image">
                <h3>${product.nom}</h3>
                <p class="favorite-price">Prix: ${product.prix.toFixed(2)} $</p>
                <p class="favorite-category">Catégorie: ${product.categorie}</p>
                <p class="favorite-description">${product.description}</p>
                <p class="favorite-size">🛍️ Taille: ${product.taille}</p>
                <p class="favorite-condition">🔍 État: ${product.condition}</p>
                <p class="favorite-brand">🏷️ Marque: ${product.marque}</p>
                <p class="favorite-seller">👤 Vendu par: ${product.id_user}</p>
                <p class="favorite-location">📍 Localisation: ${product.ville}, ${product.pays}</p>
                <div class="btn-actions">
                    <button class="btn-remove" data-id="${product.id}">❌ Retirer</button>
                    <button class="btn-contact" data-id="${product.id}" data-nom="${product.nom}" data-vendeur="${product.id_user}" data-ville="${product.ville}">📩 Contacter</button>
                </div>
            `;
            favoritesGrid.appendChild(productCard);
        });

        // Actions bouton "Retirer"
        document.querySelectorAll(".btn-remove").forEach(button => {
            button.addEventListener("click", event => {
                const productId = parseInt(event.target.dataset.id, 10);
                removeFromFavorites(productId);
            });
        });

        // Actions bouton "Contacter"
        document.querySelectorAll(".btn-contact").forEach(button => {
            button.addEventListener("click", event => {
                const nomProduit = event.target.dataset.nom;
                const vendeur = event.target.dataset.vendeur;
                const ville = event.target.dataset.ville;

                const message = `Bonjour, je suis intéressé(e) par votre produit "${nomProduit}" sur SwagSwipe. Est-il toujours disponible ?`;
                messageText.value = message;

                const numero = "15145551234";
                const smsURL = `sms:${numero}?body=${encodeURIComponent(message)}`;
                const whatsappURL = `https://wa.me/${numero}?text=${encodeURIComponent(message)}`;

                document.getElementById("send-whatsapp").href = whatsappURL;
                document.getElementById("send-sms").href = smsURL;

                // Sauvegarde de l’envoi
                document.getElementById("send-whatsapp").onclick = () => saveMessage(vendeur, nomProduit, message);
                document.getElementById("send-sms").onclick = () => saveMessage(vendeur, nomProduit, message);

                displayHistory(vendeur, nomProduit);
                modal.style.display = "flex";
            });
        });

        // Fermer la modale
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

    document.getElementById("clearFavorites").addEventListener("click", clearFavorites);
    loadFavorites();
});