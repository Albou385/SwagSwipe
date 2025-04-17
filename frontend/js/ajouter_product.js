/**
 * ajouter_produit.js
 * Handles product form validation and submission
 */

document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const productForm = document.getElementById('product-form');
    const nomProduit = document.getElementById('nom_produit');
    const marqueProduit = document.getElementById('marque_produit');
    const prixProduit = document.getElementById('prix_produit');
    const grandeurProduit = document.getElementById('grandeur_produit');
    const typeProduit = document.getElementById('type_produit');
    const fichierProduit = document.getElementById('fichier_produit');
    const descriptionProduit = document.getElementById('description_produit');
    const btnAjouter = document.getElementById('btnAjouter');
    
    // Form validation function
    function verifierChamps() {
        const isValid = 
            nomProduit.value.trim() !== "" && 
            marqueProduit.value.trim() !== "" && 
            prixProduit.value.trim() !== "" && 
            grandeurProduit.value !== "" && 
            typeProduit.value !== "" && 
            fichierProduit.files.length > 0 && 
            descriptionProduit.value.trim() !== "";
        
        btnAjouter.disabled = !isValid;
        
        // Visual feedback for validation
        const formFields = [nomProduit, marqueProduit, prixProduit, grandeurProduit, 
                           typeProduit, fichierProduit, descriptionProduit];
        
        formFields.forEach(field => {
            const isFieldValid = field.type === 'file' ? 
                field.files.length > 0 : 
                field.value.trim() !== "";
            
            if (field.type !== 'file') {
                field.style.borderColor = field.value.trim() ? '#ddd' : '#ff6b6b';
            }
        });
    }
    
    // Form submission handler
    async function handleFormSubmit(event) {
        event.preventDefault();
        
        if (btnAjouter.disabled) {
            return;
        }
        
        btnAjouter.disabled = true;
        btnAjouter.textContent = 'Traitement en cours...';
        
        try {
            const formData = new FormData(productForm);
            
            const response = await fetch('/api/image', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.status === 'success') {
                alert('Produit ajouté avec succès!');
                window.location.href = '/afficher_produits';
            } else {
                alert('Erreur: ' + (result.message || 'Échec de l\'ajout du produit'));
                btnAjouter.disabled = false;
                btnAjouter.textContent = 'Ajouter le produit';
            }
        } catch (error) {
            console.error('Error submitting product:', error);
            alert('Erreur de connexion au serveur');
            btnAjouter.disabled = false;
            btnAjouter.textContent = 'Ajouter le produit';
        }
    }
    
    // Add event listeners
    const formInputs = [nomProduit, marqueProduit, prixProduit, grandeurProduit, 
                        typeProduit, fichierProduit, descriptionProduit];
    
    formInputs.forEach(input => {
        if (input.type === 'file') {
            input.addEventListener('change', verifierChamps);
        } else {
            input.addEventListener('input', verifierChamps);
        }
    });
    
    productForm.addEventListener('submit', handleFormSubmit);
    
    // Validate fields on page load
    verifierChamps();
    
    // Image preview functionality
    fichierProduit.addEventListener('change', function() {
        const previewContainer = document.getElementById('image-preview');
        
        if (fichierProduit.files && fichierProduit.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                previewContainer.innerHTML = `
                    <img src="${e.target.result}" alt="Aperçu de l'image" 
                         style="max-width: 100%; max-height: 200px; margin-top: 10px;">
                `;
                previewContainer.style.display = 'block';
            };
            
            reader.readAsDataURL(fichierProduit.files[0]);
        } else {
            previewContainer.style.display = 'none';
        }
    });
    
    // Price formatting
    prixProduit.addEventListener('blur', function() {
        if (prixProduit.value) {
            prixProduit.value = parseFloat(prixProduit.value).toFixed(2);
        }
    });
});