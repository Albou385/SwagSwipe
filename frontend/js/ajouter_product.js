document.addEventListener('DOMContentLoaded', function () {
    const productForm = document.getElementById('formAjoutProduit');
    const nom = document.getElementById('nom');
    const marque = document.getElementById('marque');
    const prix = document.getElementById('prix');
    const grandeur = document.getElementById('grandeur');
    const categorie = document.getElementById('categorie');
    const image = document.getElementById('image');
    const description = document.getElementById('description');
    const btnAjouter = document.getElementById('btnAjouter');

    function verifierChamps() {
        const isValid =
            nom.value.trim() !== "" &&
            marque.value.trim() !== "" &&
            prix.value.trim() !== "" &&
            grandeur.value !== "" &&
            categorie.value !== "" &&
            image.files.length > 0 &&
            description.value.trim() !== "";

        btnAjouter.disabled = !isValid;

        [nom, marque, prix, grandeur, categorie, description].forEach(field => {
            field.style.borderColor = field.value.trim() !== "" ? "#ddd" : "#ff6b6b";
        });
    }

    async function handleFormSubmit(event) {
        event.preventDefault();
        if (btnAjouter.disabled) return;

        btnAjouter.disabled = true;
        btnAjouter.textContent = 'Traitement...';

        try {
            const formData = new FormData(productForm);

            const response = await fetch('/api/image', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                alert('Produit ajouté avec succès !');
                window.location.href = '/afficher_produits';
            } else {
                alert('Erreur : ' + (result.message || 'Échec de l\'ajout du produit'));
                btnAjouter.disabled = false;
                btnAjouter.textContent = 'Ajouter le produit';
            }
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire :', error);
            alert('Erreur de communication avec le serveur');
            btnAjouter.disabled = false;
            btnAjouter.textContent = 'Ajouter le produit';
        }
    }

    [nom, marque, prix, grandeur, categorie, image, description].forEach(input => {
        if (input.type === 'file') {
            input.addEventListener('change', verifierChamps);
        } else {
            input.addEventListener('input', verifierChamps);
        }
    });

    productForm.addEventListener('submit', handleFormSubmit);
    verifierChamps();

    // Aperçu de l’image
    image.addEventListener('change', function () {
        const previewContainer = document.getElementById('image-preview');
        if (image.files && image.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewContainer.innerHTML = `<img src="${e.target.result}" alt="Aperçu" style="max-width:100%; max-height:200px;">`;
                previewContainer.style.display = 'block';
            };
            reader.readAsDataURL(image.files[0]);
        } else {
            previewContainer.style.display = 'none';
        }
    });

    prix.addEventListener('blur', function () {
        if (prix.value) {
            prix.value = parseFloat(prix.value).toFixed(2);
        }
    });
});
