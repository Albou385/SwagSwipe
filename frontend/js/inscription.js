document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formulaire-inscription');
    const errorContainer = document.getElementById('message-erreur');
    const passwordInput = document.getElementById('mot_de_passe');
    const confirmPasswordInput = document.getElementById('confirmation_mdp');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('telephone');
    const postalCodeInput = document.getElementById('code_postal');
    const profileImageInput = document.getElementById('image_profil');
    const submitButton = form.querySelector('button[type="submit"]');

    // Formattage du code postal
    postalCodeInput.addEventListener('input', function (e) {
        let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
        if (value.length > 3) {
            value = value.slice(0, 3) + ' ' + value.slice(3, 6);
        }
        e.target.value = value;
    });

    // Formattage téléphone
    phoneInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        e.target.value = value;
    });

    // Vérification force du mot de passe
    passwordInput.addEventListener('input', checkPasswordStrength);
    function checkPasswordStrength() {
        const password = passwordInput.value;
        const feedbackId = 'password-strength';
        document.getElementById(feedbackId)?.remove();

        let strength = 0;
        if (password.length >= 6) {
            if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
            if (/\d/.test(password)) strength++;
            if (/[^a-zA-Z\d]/.test(password)) strength++;
        }

        let message = '', level = '';
        if (password.length < 6) {
            message = 'Le mot de passe doit contenir au moins 6 caractères.';
            level = 'faible';
        } else if (strength === 1) {
            message = 'Mot de passe faible. Ajoutez des majuscules, chiffres ou caractères spéciaux.';
            level = 'faible';
        } else if (strength === 2) {
            message = 'Mot de passe moyen. Ajoutez un autre type de caractère pour plus de sécurité.';
            level = 'moyen';
        } else {
            message = 'Mot de passe fort!';
            level = 'fort';
        }

        const feedback = document.createElement('div');
        feedback.id = feedbackId;
        feedback.className = `password-strength ${level}`;
        feedback.textContent = message;
        feedback.style.color = level === 'faible' ? 'red' : level === 'moyen' ? 'orange' : 'green';
        passwordInput.parentNode.insertBefore(feedback, passwordInput.nextSibling);
    }

    // Vérification de correspondance des mots de passe
    confirmPasswordInput.addEventListener('input', function () {
        const feedbackId = 'password-match';
        document.getElementById(feedbackId)?.remove();

        if (confirmPasswordInput.value && confirmPasswordInput.value !== passwordInput.value) {
            const feedback = document.createElement('div');
            feedback.id = feedbackId;
            feedback.style.color = 'red';
            feedback.textContent = 'Les mots de passe ne correspondent pas.';
            confirmPasswordInput.parentNode.insertBefore(feedback, confirmPasswordInput.nextSibling);
        }
    });

    // Prévisualisation image
    if (profileImageInput) {
        profileImageInput.addEventListener('change', function () {
            const file = this.files[0];
            const previewContainer = document.getElementById('image-preview') || createImagePreviewContainer();

            if (file && file.type === 'image/png') {
                const reader = new FileReader();
                reader.onload = e => {
                    previewContainer.innerHTML = `<img src="${e.target.result}" alt="Aperçu" style="max-width:200px;">`;
                    previewContainer.style.display = 'block';
                };
                reader.readAsDataURL(file);
            } else {
                previewContainer.innerHTML = '<p style="color:red;">Veuillez sélectionner un fichier PNG.</p>';
                previewContainer.style.display = 'block';
                this.value = '';
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

    // Validation finale du formulaire
    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        errorContainer.innerHTML = '';
        errorContainer.style.display = 'none';

        const errors = [];

        if (passwordInput.value !== confirmPasswordInput.value) {
            errors.push('Les mots de passe ne correspondent pas.');
        }

        if (passwordInput.value.length < 6) {
            errors.push('Le mot de passe doit contenir au moins 6 caractères.');
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
            errors.push('Adresse courriel invalide.');
        }

        if (phoneInput.value.length !== 10) {
            errors.push('Numéro de téléphone invalide.');
        }

        if (!/^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/.test(postalCodeInput.value)) {
            errors.push('Code postal invalide. Format attendu : A1A 1A1');
        }

        if (errors.length > 0) {
            errorContainer.innerHTML = errors.map(e => `<p>${e}</p>`).join('');
            errorContainer.style.display = 'block';
            errorContainer.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        // Désactivation du bouton
        submitButton.disabled = true;
        submitButton.innerHTML = 'Inscription en cours...';

        try {
            const formData = new FormData(form);
            const response = await fetch('/api/signup', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.status === 'success') {
                window.location.href = result.redirect || '/login';
            } else {
                throw new Error(result.message || 'Erreur inconnue');
            }
        } catch (error) {
            console.error('Erreur:', error);
            errorContainer.innerHTML = `<p>${error.message}</p>`;
            errorContainer.style.display = 'block';
            submitButton.disabled = false;
            submitButton.innerHTML = "S'inscrire";
        }
    });
});
