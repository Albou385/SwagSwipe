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
            const response = await fetch('/api/products');
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
            
            card.innerHTML = `
                <img src="${product.image}" alt="${product.nom}">
                <h3>${product.nom}</h3>
                <p class="product-price">${formattedPrice} $</p>
                <p class="product-brand">${product.marque}</p>
                <p class="product-size">Taille: ${product.taille}</p>
                <a href="/produit?id=${product.id_produit}" class="btn-details">Voir détails</a>
                <button class="btn-favori" data-id="${product.id_produit}">
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
            const action = button.textContent.includes('Ajouter') ? 'add' : 'remove';
            
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
                // Update button text
                if (action === 'add') {
                    button.textContent = '❤️ Retiré des favoris';
                } else {
                    button.textContent = '🤍 Ajouter aux favoris';
                }
                
                // Update product in allProducts array
                const product = allProducts.find(p => p.id_produit === productId);
                if (product) {
                    product.favori = action === 'add';
                }
            } else {
                alert('Erreur: ' + (result.message || 'Opération échouée'));
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
            const matchesSearch = 
                product.nom.toLowerCase().includes(searchTerm) || 
                product.description.toLowerCase().includes(searchTerm) ||
                product.marque.toLowerCase().includes(searchTerm);
                
            const matchesCategory = category === '' || product.categorie.toLowerCase() === category;
            
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
    }
    
    // Show error message in product grid
    function showError(message) {
        productGrid.innerHTML = `<p class="error-message">${message}</p>`;
    }
    
    // Event listeners
    searchBar.addEventListener('input', updateDisplay);
    filterCategory.addEventListener('change', updateDisplay);
    sortOptions.addEventListener('change', updateDisplay);
    
    // Initial load
    fetchProducts();
});