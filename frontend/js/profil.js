/**
 * profil.js
 * Handles user profile display and functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const profileContainer = document.querySelector('.profil');
    const profileImage = document.querySelector('.pdp');
    const profileName = document.querySelector('.profil h2');
    const profileEmail = document.querySelector('.profil p:nth-of-type(1)');
    const profileLocation = document.querySelector('.profil p:nth-of-type(2)');
    const addProductButton = document.querySelector('.profil .nav-button');
    
    // User information placeholder in case API fails
    const defaultUser = {
        prenom: 'Utilisateur',
        nom: '',
        email: 'Non connecté',
        ville: 'Inconnu',
        code_postal: '',
        pays: 'Canada'
    };
    
    /**
     * Load user profile information
     */
    async function loadUserProfile() {
        try {
            // Show loading state
            profileContainer.classList.add('loading');
            
            const response = await fetch('/api/user_details');
            const result = await response.json();
            
            if (result.status === 'success') {
                displayUserProfile(result.data);
            } else {
                // User not logged in or error
                handleNotLoggedIn();
            }
        } catch (error) {
            console.error('Error loading profile:', error);
            handleError();
        } finally {
            profileContainer.classList.remove('loading');
        }
    }
    
    /**
     * Display user profile information
     * @param {Object} user - User data from API
     */
    function displayUserProfile(user) {
        // Update profile information
        profileName.textContent = `${user.prenom} ${user.nom}`;
        profileEmail.textContent = `Email : ${user.email}`;
        profileLocation.textContent = `Localisation : ${user.pays}, ${user.ville}, ${user.code_postal}`;
        
        // Check if user has a custom profile image
        if (user.image_profile) {
            profileImage.src = user.image_profile;
        }
        
        // Show add product button
        addProductButton.style.display = 'inline-block';
        
        // Add edit profile button
        const editButton = document.createElement('button');
        editButton.className = 'nav-button edit-profile-btn';
        editButton.textContent = '✏️ Modifier mon profil';
        editButton.addEventListener('click', () => {
            window.location.href = '/edit_profile';
        });
        
        profileContainer.appendChild(editButton);
        
        // Add user's products section if user has products
        loadUserProducts(user.id);
    }
    
    /**
     * Load and display user's products
     * @param {number} userId - User ID
     */
    async function loadUserProducts(userId) {
        try {
            const response = await fetch(`/api/products?user_id=${userId}`);
            const result = await response.json();
            
            if (result.status === 'success' && result.data.length > 0) {
                // Create products section
                const productsSection = document.createElement('div');
                productsSection.className = 'user-products-section';
                
                const heading = document.createElement('h3');
                heading.textContent = 'Mes Produits';
                productsSection.appendChild(heading);
                
                const productsGrid = document.createElement('div');
                productsGrid.className = 'products-grid';
                
                // Add each product
                result.data.forEach(product => {
                    const productCard = createProductCard(product);
                    productsGrid.appendChild(productCard);
                });
                
                productsSection.appendChild(productsGrid);
                profileContainer.appendChild(productsSection);
            }
        } catch (error) {
            console.error('Error loading user products:', error);
        }
    }
    
    /**
     * Create a product card element
     * @param {Object} product - Product data
     * @returns {HTMLElement} Product card element
     */
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        // Format price to 2 decimal places
        const formattedPrice = parseFloat(product.prix).toFixed(2);
        
        card.innerHTML = `
            <img src="${product.image}" alt="${product.nom}">
            <h4>${product.nom}</h4>
            <p class="product-price">${formattedPrice} $</p>
            <div class="product-actions">
                <button class="edit-btn" data-id="${product.id_produit}">✏️ Modifier</button>
                <button class="delete-btn" data-id="${product.id_produit}">🗑️ Supprimer</button>
            </div>
        `;
        
        // Add event listeners
        const editBtn = card.querySelector('.edit-btn');
        const deleteBtn = card.querySelector('.delete-btn');
        
        editBtn.addEventListener('click', () => editProduct(product.id_produit));
        deleteBtn.addEventListener('click', () => deleteProduct(product.id_produit, card));
        
        return card;
    }
    
    /**
     * Handle edit product action
     * @param {number} productId - Product ID to edit
     */
    function editProduct(productId) {
        window.location.href = `/edit_product?id=${productId}`;
    }
    
    /**
     * Handle delete product action
     * @param {number} productId - Product ID to delete
     * @param {HTMLElement} card - Card element to remove from DOM
     */
    async function deleteProduct(productId, card) {
        if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
            return;
        }
        
        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: 'DELETE'
            });
            
            const result = await response.json();
            
            if (result.status === 'success') {
                // Remove card with animation
                card.style.transition = 'opacity 0.3s, transform 0.3s';
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    card.remove();
                    
                    // Check if grid is now empty
                    const grid = document.querySelector('.products-grid');
                    if (grid && grid.children.length === 0) {
                        const section = document.querySelector('.user-products-section');
                        if (section) {
                            section.remove();
                        }
                    }
                }, 300);
            } else {
                alert('Erreur: ' + (result.message || 'Échec de la suppression'));
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Erreur de connexion au serveur');
        }
    }
    
    /**
     * Handle not logged in state
     */
    function handleNotLoggedIn() {
        profileName.textContent = 'Non connecté';
        profileEmail.textContent = 'Veuillez vous connecter pour accéder à votre profil';
        profileLocation.textContent = '';
        
        // Hide add product button
        addProductButton.style.display = 'none';
        
        // Add login button
        const loginButton = document.createElement('button');
        loginButton.className = 'nav-button login-btn';
        loginButton.textContent = 'Se connecter';
        loginButton.addEventListener('click', () => {
            window.location.href = '/login';
        });
        
        // Add signup button
        const signupButton = document.createElement('button');
        signupButton.className = 'nav-button signup-btn';
        signupButton.textContent = 'Créer un compte';
        signupButton.addEventListener('click', () => {
            window.location.href = '/signup';
        });
        
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'auth-buttons';
        buttonContainer.appendChild(loginButton);
        buttonContainer.appendChild(signupButton);
        
        profileContainer.appendChild(buttonContainer);
    }
    
    /**
     * Handle error loading profile
     */
    function handleError() {
        profileName.textContent = 'Erreur';
        profileEmail.textContent = 'Impossible de charger le profil';
        profileLocation.textContent = 'Veuillez réessayer plus tard';
        
        // Hide add product button
        addProductButton.style.display = 'none';
    }
    
    // Load profile on page load
    loadUserProfile();
});