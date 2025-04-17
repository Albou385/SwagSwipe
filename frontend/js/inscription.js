/**
 * inscription.js
 * Handles user registration form validation and submission
 */

document.addEventListener('DOMContentLoaded', function() {
    // Form and form elements
    const form = document.getElementById('formulaire-inscription');
    const errorContainer = document.getElementById('message-erreur');
    const passwordInput = document.getElementById('mot_de_passe');
    const confirmPasswordInput = document.getElementById('confirmation_mdp');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('telephone');
    const postalCodeInput = document.getElementById('code_postal');
    const profileImageInput = document.getElementById('image_profil');
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Postal code formatter
    postalCodeInput.addEventListener('input', function(e) {
        let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
        
        if (value.length > 3) {
            value = value.slice(0, 3) + ' ' + value.slice(3, 6);
        }
        
        e.target.value = value;
    });
    
    // Phone number formatter
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        
        e.target.value = value;
    });
    
    // Password strength check
    passwordInput.addEventListener('input', checkPasswordStrength);
    
    function checkPasswordStrength() {
        const password = passwordInput.value;
        let strength = 0;
        
        // Remove any existing password feedback
        const existingFeedback = document.getElementById('password-strength');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        
        if (password.length < 6) {
            addPasswordFeedback('faible', 'Le mot de passe doit contenir au moins 6 caractères.');
            return;
        }
        
        // Check for mixed case
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
            strength += 1;
        }
        
        // Check for numbers
        if (password.match(/\d/)) {
            strength += 1;
        }
        
        // Check for special characters
        if (password.match(/[^a-zA-Z\d]/)) {
            strength += 1;
        }
        
        // Determine strength level
        let strengthText, message;
        if (strength === 1) {
            strengthText = 'faible';
            message = 'Mot de passe faible. Ajoutez des majuscules, chiffres ou caractères spéciaux.';
        } else if (strength === 2) {
            strengthText = 'moyen';
            message = 'Mot de passe moyen. Ajoutez un autre type de caractère pour plus de sécurité.';
        } else if (strength >= 3) {
            strengthText = 'fort';
            message = 'Mot de passe fort!';
        }
        
        addPasswordFeedback(strengthText, message);
    }
    
    function addPasswordFeedback(strength, message) {
        const feedback = document.createElement('div');
        feedback.id = 'password-strength';
        feedback.className = `password-strength ${strength}`;
        feedback.textContent = message;
        
        if (strength === 'faible') {
            feedback.style.color = 'red';
        } else if (strength === 'moyen') {
            feedback.style.color = 'orange';
        } else {
            feedback.style.color = 'green';
        }
        
        // Insert after password field
        passwordInput.parentNode.insertBefore(feedback, passwordInput.nextSibling);
    }
    
    // Confirm password match check
    confirmPasswordInput.addEventListener('input', function() {
        const existingFeedback = document.getElementById('password-match');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        
        if (confirmPasswordInput.value && confirmPasswordInput.value !== passwordInput.value) {
            const feedback = document.createElement('div');
            feedback.id = 'password-match';
            feedback.style.color = 'red';
            feedback.textContent = 'Les mots de passe ne correspondent pas.';
            confirmPasswordInput.parentNode.insertBefore(feedback, confirmPasswordInput.nextSibling);
        }
    });
    
    // Image preview
    if (profileImageInput) {
        profileImageInput.addEventListener('change', function() {
            const previewContainer = document.getElementById('image-preview') || createImagePreviewContainer();
            
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    previewContainer.innerHTML = `<img src="${e.target.result}" alt="Aperçu de l'image" style="max-width: 200px; max-height: 200px;">`;
                    previewContainer.style.display = 'block';
                };
                
                reader.readAsDataURL(this.files[0]);
            } else {
                previewContainer.style.display = 'none';
            }
        });
    }
    
    function createImagePreviewContainer() {
        const container = document.createElement('div');
        container.id = 'image-preview';
        container.style.marginTop = '10px';
        container.style.textAlign = 'center';
        container.style.display = 'none';
        
        profileImageInput.parentNode.appendChild(container);
        return container;
    }
    
    // Form validation
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Clear previous errors
        errorContainer.innerHTML = '';
        errorContainer.style.display = 'none';
        
        const errors = [];
        
        // Validate password match
        if (passwordInput.value !== confirmPasswordInput.value) {
            errors.push('Les mots de passe ne correspondent pas.');
        }
        
        // Validate password length
        if (passwordInput.value.length < 6) {
            errors.push('Le mot de passe doit contenir au moins 6 caractères.');
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            errors.push('L\'adresse courriel n\'est pas valide.');
        }
        
        // Validate phone format
        if (phoneInput.value.length !== 10) {
            errors.push('Le numéro de téléphone doit contenir 10 chiffres.');
        }
        
        // Validate postal code format
        const postalCodeRegex = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
        if (!postalCodeRegex.test(postalCodeInput.value)) {
            errors.push('Le code postal n\'est pas valide. Format attendu: A1A 1A1');
        }
        
        // Display errors if any
        if (errors.length > 0) {
            errorContainer.innerHTML = errors.map(error => `<p>${error}</p>`).join('');
            errorContainer.style.display = 'block';
            errorContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
        }
        
        // Disable submit button to prevent multiple submissions
        submitButton.disabled = true;
        submitButton.innerHTML = 'Inscription en cours...';
        
        // Submit form data
        try {
            const formData = new FormData(form);
            
            const response = await fetch('/api/signup', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.status === 'success') {
                // Redirect to login page
                window.location.href = result.redirect || '/login';
            } else {
                // Display error message
                errorContainer.innerHTML = `<p>${result.message || 'Une erreur est survenue lors de l\'inscription.'}</p>`;
                errorContainer.style.display = 'block';
                submitButton.disabled = false;
                submitButton.innerHTML = 'S\'inscrire';
            }
        } catch (error) {
            console.error('Error during registration:', error);
            errorContainer.innerHTML = '<p>Erreur de connexion au serveur. Veuillez réessayer plus tard.</p>';
            errorContainer.style.display = 'block';
            submitButton.disabled = false;
            submitButton.innerHTML = 'S\'inscrire';
        }
    });
});