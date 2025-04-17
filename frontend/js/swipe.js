/**
 * swipe.js
 * Handles Tinder-like product swiping functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const productCard = document.getElementById('product-card');
    const productImage = document.getElementById('product-image');
    const productNom = document.getElementById('product-nom');
    const productPrix = document.getElementById('product-prix');
    const productCategorie = document.getElementById('product-categorie');
    const productDescription = document.getElementById('product-description');
    const productTaille = document.getElementById('product-taille');
    const productCondition = document.getElementById('product-condition');
    const productMarque = document.getElementById('product-marque');
    const productVille = document.getElementById('product-ville');
    const productPays = document.getElementById('product-pays');
    
    const rejectBtn = document.getElementById('reject-btn');
    const acceptBtn = document.getElementById('accept-btn');
    const swipeFeedback = document.getElementById('swipe-feedback');
    
    // Product queue and current product
    let productsQueue = [];
    let currentProduct = null;
    let isAnimating = false;
    
    /**
     * Fetch products for swiping
     */
    async function fetchProducts() {
        try {
            showLoadingState();
            
            const response = await fetch('/api/swipe');
            const result = await response.json();
            
            if (result.status === 'success' && result.data.length > 0) {
                productsQueue = result.data;
                showNextProduct();
            } else {
                showEmptyState();
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            showErrorState();
        }
    }
    
    /**
     * Show the next product in the queue
     */
    function showNextProduct() {
        if (productsQueue.length === 0) {
            showEmptyState();
            return;
        }
        
        currentProduct = productsQueue.shift();
        displayProduct(currentProduct);
    }
    
    /**
     * Display a product in the card
     * @param {Object} product - Product data
     */
    function displayProduct(product) {
        // Reset any animation classes
        productCard.className = 'product-card';
        
        // Set product image with loading state
        productImage.src = product.image;
        productImage.onload = () => {
            // Remove loading state once image is loaded
            productCard.classList.remove('loading');
        };
        productCard.classList.add('loading');
        
        // Format price to 2 decimal places
        const formattedPrice = parseFloat(product.prix).toFixed(2);
        
        // Update product info
        productNom.textContent = product.nom;
        productPrix.textContent = `${formattedPrice} $`;
        productCategorie.textContent = `Catégorie: ${product.categorie}`;
        productDescription.textContent = product.description;
        productTaille.textContent = `Taille: ${product.taille}`;
        productCondition.textContent = `État: ${product.condition || 'Non spécifié'}`;
        productMarque.textContent = `Marque: ${product.marque}`;
        productVille.textContent = `Ville: ${product.ville || 'Non spécifié'}`;
        productPays.textContent = `Pays: ${product.pays || 'Canada'}`;
        
        // Show the card with animation
        productCard.style.opacity = '0';
        productCard.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            productCard.style.opacity = '1';
            productCard.style.transform = 'scale(1)';
        }, 50);
    }
    
    /**
     * Handle like action
     */
    function likeProduct() {
        if (isAnimating || !currentProduct) return;
        
        isAnimating = true;
        
        // Add animation class
        productCard.classList.add('swipe-right');
        
        // Show feedback
        showFeedback('like');
        
        // Save to favorites
        saveToFavorites(currentProduct.id_produit);
        
        // Wait for animation to complete then show next product
        setTimeout(() => {
            isAnimating = false;
            showNextProduct();
        }, 500);
    }
    
    /**
     * Handle dislike action
     */
    function dislikeProduct() {
        if (isAnimating || !currentProduct) return;
        
        isAnimating = true;
        
        // Add animation class
        productCard.classList.add('swipe-left');
        
        // Show feedback
        showFeedback('dislike');
        
        // Wait for animation to complete then show next product
        setTimeout(() => {
            isAnimating = false;
            showNextProduct();
        }, 500);
    }
    
    /**
     * Show feedback animation
     * @param {string} type - 'like' or 'dislike'
     */
    function showFeedback(type) {
        swipeFeedback.className = 'swipe-feedback';
        swipeFeedback.textContent = type === 'like' ? '❤️' : '✖️';
        
        // Use setTimeout to ensure the DOM updates before adding the animation class
        setTimeout(() => {
            swipeFeedback.classList.add(type);
            
            // Clear feedback after animation
            setTimeout(() => {
                swipeFeedback.className = 'swipe-feedback';
            }, 1000);
        }, 10);
    }
    
    /**
     * Save product to favorites
     * @param {number} productId - Product ID to save
     */
    async function saveToFavorites(productId) {
        try {
            const response = await fetch('/api/swipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_produit: productId
                })
            });
            
            // We don't need to wait for the response to continue
            // This ensures the swiping experience remains smooth
        } catch (error) {
            console.error('Error saving to favorites:', error);
            // Continue swiping even if saving fails
        }
    }
    
    /**
     * Show loading state
     */
    function showLoadingState() {
        productCard.innerHTML = '<div class="loading-spinner"></div><p>Chargement des produits...</p>';
    }
    
    /**
     * Show empty state when no more products
     */
    function showEmptyState() {
        productCard.innerHTML = `
            <div class="empty-state">
                <h3>Aucun produit à découvrir</h3>
                <p>Revenez plus tard pour découvrir de nouveaux articles ou consultez nos suggestions.</p>
                <a href="/afficher_produits" class="nav-button">Voir tous les produits</a>
            </div>
        `;
        
        // Hide swipe actions
        document.querySelector('.swipe-actions').style.display = 'none';
    }
    
    /**
     * Show error state
     */
    function showErrorState() {
        productCard.innerHTML = `
            <div class="error-state">
                <h3>Une erreur est survenue</h3>
                <p>Impossible de charger les produits. Veuillez réessayer plus tard.</p>
                <button id="retry-btn" class="nav-button">Réessayer</button>
            </div>
        `;
        
        // Hide swipe actions
        document.querySelector('.swipe-actions').style.display = 'none';
        
        // Add retry button listener
        document.getElementById('retry-btn').addEventListener('click', fetchProducts);
    }
    
    /**
     * Handle touch swiping
     */
    function setupTouchSwipe() {
        let startX;
        let startY;
        let moveX;
        let moveY;
        
        productCard.addEventListener('touchstart', function(e) {
            if (isAnimating) return;
            
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        productCard.addEventListener('touchmove', function(e) {
            if (isAnimating || !startX) return;
            
            moveX = e.touches[0].clientX;
            moveY = e.touches[0].clientY;
            
            const diffX = moveX - startX;
            const diffY = moveY - startY;
            
            // Only handle horizontal swipes (prevent vertical scrolling interference)
            if (Math.abs(diffX) > Math.abs(diffY)) {
                e.preventDefault();
                
                // Calculate rotation based on swipe distance
                const rotation = diffX / 10;
                
                // Apply transform to card
                productCard.style.transform = `translateX(${diffX}px) rotate(${rotation}deg)`;
                
                // Show visual cue for like/dislike
                if (diffX > 50) {
                    productCard.classList.add('swipe-right-hint');
                    productCard.classList.remove('swipe-left-hint');
                } else if (diffX < -50) {
                    productCard.classList.add('swipe-left-hint');
                    productCard.classList.remove('swipe-right-hint');
                } else {
                    productCard.classList.remove('swipe-left-hint', 'swipe-right-hint');
                }
            }
        });
        
        productCard.addEventListener('touchend', function(e) {
            if (isAnimating || !startX || !moveX) {
                // Reset
                startX = null;
                moveX = null;
                return;
            }
            
            const diffX = moveX - startX;
            
            // Clear inline styles
            productCard.style.transform = '';
            productCard.classList.remove('swipe-left-hint', 'swipe-right-hint');
            
            // Determine if swipe was decisive enough
            if (diffX > 100) {
                likeProduct();
            } else if (diffX < -100) {
                dislikeProduct();
            }
            
            // Reset
            startX = null;
            moveX = null;
        });
    }
    
    /**
     * Set up keyboard navigation
     */
    function setupKeyboardNavigation() {
        document.addEventListener('keydown', function(e) {
            if (isAnimating) return;
            
            switch(e.key) {
                case 'ArrowLeft':
                    dislikeProduct();
                    break;
                case 'ArrowRight':
                    likeProduct();
                    break;
            }
        });
    }
    
    // Set up event listeners
    acceptBtn.addEventListener('click', likeProduct);
    rejectBtn.addEventListener('click', dislikeProduct);
    
    // Initialize touch swiping
    setupTouchSwipe();
    
    // Initialize keyboard navigation
    setupKeyboardNavigation();
    
    // Start loading products
    fetchProducts();
});