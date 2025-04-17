/**
 * login.js
 * Handles login form validation and submission
 */

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('form-connexion');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('mot_de_passe');
    const errorMessage = document.getElementById('message-erreur');
    
    /**
     * Validates the form inputs
     * @returns {boolean} Whether the form is valid
     */
    function validateForm() {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const errors = [];
        
        // Email validation
        if (!email) {
            errors.push("L'adresse courriel est requise.");
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                errors.push("L'adresse courriel n'est pas valide.");
            }
        }
        
        // Password validation
        if (!password) {
            errors.push("Le mot de passe est requis.");
        }
        
        // Display errors if any
        if (errors.length > 0) {
            errorMessage.innerHTML = errors.map(e => `<p>${e}</p>`).join("");
            errorMessage.style.display = "block";
            return false;
        }
        
        // Clear previous errors
        errorMessage.innerHTML = "";
        errorMessage.style.display = "none";
        return true;
    }
    
    /**
     * Handles form submission
     * @param {Event} event The submit event
     */
    async function handleSubmit(event) {
        event.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        const submitButton = loginForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Connexion en cours...';
        
        try {
            const formData = {
                email: emailInput.value.trim(),
                password: passwordInput.value.trim()
            };
            
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            if (result.status === 'success') {
                // Redirect to home or specified redirect URL
                window.location.href = result.redirect || '/';
            } else {
                // Display error message
                errorMessage.innerHTML = `<p>${result.message || 'Échec de la connexion. Veuillez vérifier vos identifiants.'}</p>`;
                errorMessage.style.display = 'block';
                submitButton.disabled = false;
                submitButton.textContent = 'Se Connecter';
            }
        } catch (error) {
            console.error('Error during login:', error);
            errorMessage.innerHTML = '<p>Erreur de connexion au serveur. Veuillez réessayer plus tard.</p>';
            errorMessage.style.display = 'block';
            submitButton.disabled = false;
            submitButton.textContent = 'Se Connecter';
        }
    }
    
    // Add event listeners
    loginForm.addEventListener('submit', handleSubmit);
    
    // Add input event listeners for real-time validation
    emailInput.addEventListener('input', function() {
        if (errorMessage.style.display === 'block') {
            validateForm();
        }
    });
    
    passwordInput.addEventListener('input', function() {
        if (errorMessage.style.display === 'block') {
            validateForm();
        }
    });
});