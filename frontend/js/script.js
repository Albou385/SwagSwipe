/**
 * scripts.js
 * Handles product display, filtering and sorting functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const productGrid = document.getElementById('productGrid');
    const searchBar = document.getElementById('searchBar');
    const filterCategory = document.getElementById('filterCategory');
    const sortOptions = document.getElementById('sortOptions');
    const loadingIndicator = document.getElementById('loading');
    
    // Store all products from API
    let allProducts = [];
    
    // Fetch products from API
    async function fetchProducts() {
        try {
            loadingIndicator.style.display = 'block';
            
            // Get category filter from URL if present
            const urlParams = new URLSearchParams(window.location.search);
            const categoryParam = urlParams.get('categorie');
            
            // Build API URL with category filter if present
            let apiUrl = '/api/products';
            if (categoryParam) {
                apiUrl += `?categorie=${categoryParam}`;
                // Also preselect the category in the dropdown
                if (filterCategory) {
                    filterCategory.value = categoryParam;
                }
            }
            
            const response = await fetch(apiUrl);
            const result = await response.json();
            
            if (result.status === 'success') {
                allProducts = result.data;
                displayProducts(allProducts);
            } else {
                showError('Erreur lors du chargement des produits');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            showError('Erreur de connexion au serveur');
        } finally {
            loadingIndicator.style.display = 'none';
        }
    }
    
    // Display products in grid
    function displayProducts(products) {
        productGrid.innerHTML = '';
        
        if (products.length === 0) {
            productGrid.innerHTML = '<p class="no-results">Aucun produit trouvé</p>';
            return;
        }
        
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            
            // Format price to 2 decimal places
            const formattedPrice = parseFloat(product.prix).toFixed(2);
            
            // Create vendor name from first name and last name
            const vendorName = product.vendeur_prenom ? 
                `${product.vendeur_prenom} ${product.vendeur_nom}` : 
                product.vendeur_nom;
            
            // Fix image path if needed
            let imagePath = product.image;
            if (imagePath.startsWith('img/')) {
                imagePath = `/frontend/img/${imagePath.substring(4)}`;
            } else if (!imagePath.startsWith('/')) {
                imagePath = `/frontend/img/${imagePath}`;
            }
            
            card.innerHTML = `
                <img src="${imagePath}" alt="${product.nom}" loading="lazy">
                <h3>${product.nom}</h3>
                <p class="product-price">${formattedPrice} $</p>
                <p class="product-brand">${product.marque}</p>
                <p class="product-size">Taille: ${product.taille}</p>
                <div class="product-rating">
                    ${product.note_moyenne ? 
                      `<span class="stars">${'★'.repeat(Math.round(product.note_moyenne))}</span>
                       <span class="rating-value">(${product.note_moyenne})</span>` : 
                      '<span class="no-rating">Pas encore d\'avis</span>'}
                </div>
                <a href="/produit?id=${product.id_produit}" class="btn-details">Voir détails</a>
                <button class="btn-favori ${product.favori ? 'active' : ''}" data-id="${product.id_produit}">
                    ${product.favori ? '❤️ Retiré des favoris' : '🤍 Ajouter aux favoris'}
                </button>
            `;
            
            productGrid.appendChild(card);
            
            // Add event listener to favorite button
            const favBtn = card.querySelector('.btn-favori');
            favBtn.addEventListener('click', function(e) {
                e.preventDefault();
                toggleFavorite(product.id_produit, favBtn);
            });
        });
    }
    
    // Toggle product as favorite
    async function toggleFavorite(productId, button) {
        try {
            const isActive = button.classList.contains('active');
            const action = isActive ? 'remove' : 'add';
            
            const response = await fetch('/api/favori', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_produit: productId,
                    action: action
                })
            });
            
            const result = await response.json();
            
            if (result.status === 'success') {
                // Update button text and class
                if (action === 'add') {
                    button.textContent = '❤️ Retiré des favoris';
                    button.classList.add('active');
                } else {
                    button.textContent = '🤍 Ajouter aux favoris';
                    button.classList.remove('active');
                }
                
                // Update product in allProducts array
                const product = allProducts.find(p => p.id_produit === productId);
                if (product) {
                    product.favori = action === 'add';
                }
            } else {
                // Check if user is not logged in
                if (result.message && result.message.toLowerCase().includes('non autorisé')) {
                    // Redirect to login page
                    window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
                } else {
                    alert('Erreur: ' + (result.message || 'Opération échouée'));
                }
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
            alert('Erreur de connexion au serveur');
        }
    }
    
    // Filter products based on search term and category
    function filterProducts() {
        const searchTerm = searchBar.value.toLowerCase();
        const category = filterCategory.value.toLowerCase();
        
        const filtered = allProducts.filter(product => {
            // Search by name, description, or brand
            const matchesSearch = 
                product.nom.toLowerCase().includes(searchTerm) || 
                (product.description && product.description.toLowerCase().includes(searchTerm)) ||
                product.marque.toLowerCase().includes(searchTerm);
                
            // Handle both singular and plural forms of categories
            const matchesCategory = 
                category === '' || 
                product.categorie.toLowerCase() === category || 
                product.categorie.toLowerCase() === `${category}s` || // Handle singular to plural
                product.categorie.toLowerCase().replace(/s$/, '') === category; // Handle plural to singular
            
            return matchesSearch && matchesCategory;
        });
        
        return filtered;
    }
    
    // Sort products based on selected option
    function sortProducts(products) {
        const sortBy = sortOptions.value;
        
        return [...products].sort((a, b) => {
            switch (sortBy) {
                case 'prix-asc':
                    return parseFloat(a.prix) - parseFloat(b.prix);
                case 'prix-desc':
                    return parseFloat(b.prix) - parseFloat(a.prix);
                case 'alpha-asc':
                    return a.nom.localeCompare(b.nom);
                case 'alpha-desc':
                    return b.nom.localeCompare(a.nom);
                default:
                    return 0;
            }
        });
    }
    
    // Update display when filters or sort options change
    function updateDisplay() {
        const filtered = filterProducts();
        const sorted = sortProducts(filtered);
        displayProducts(sorted);
        
        // Update URL with filter parameters without page reload
        const url = new URL(window.location);
        if (filterCategory.value) {
            url.searchParams.set('categorie', filterCategory.value);
        } else {
            url.searchParams.delete('categorie');
        }
        window.history.pushState({}, '', url);
    }
    
    // Show error message in product grid
    function showError(message) {
        productGrid.innerHTML = `
            <div class="error-message">
                <p>${message}</p>
                <button id="retry-btn" class="nav-button">Réessayer</button>
            </div>
        `;
        
        document.getElementById('retry-btn').addEventListener('click', fetchProducts);
    }
    
    // Event listeners
    searchBar.addEventListener('input', debounce(updateDisplay, 300));
    filterCategory.addEventListener('change', updateDisplay);
    sortOptions.addEventListener('change', updateDisplay);
    
    // Helper function to debounce search input
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(context, args);
            }, wait);
        };
    }
    
    // Initial load
    fetchProducts();
});