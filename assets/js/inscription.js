
// Validation des champs de création de compte
function validateForm() {
    const prenom = document.getElementById("prenom").value.trim();
    const nom = document.getElementById("nom").value.trim();
    const email = document.getElementById("email").value.trim();
    const telephone = document.getElementById("telephone").value.trim();
    const numero = document.getElementById("numero_civil").value.trim();
    const rue = document.getElementById("rue").value.trim();
    const ville = document.getElementById("ville").value.trim();
    const codePostal = document.getElementById("code_postal").value.trim();
    const motDePasse = document.getElementById("mot_de_passe").value;
    const confirmation = document.getElementById("confirmation_mdp").value;
    const image = document.getElementById("image_profil").files[0];

    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const codePostalRegex = /^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

    if (prenom.length < 2 || prenom.length > 30) {
        alert("Le prénom doit contenir entre 2 et 30 caractères.");
        isValid = false;
    }

    if (nom.length < 2 || nom.length > 30) {
        alert("Le nom doit contenir entre 2 et 30 caractères.");
        isValid = false;
    }

    if (!emailRegex.test(email)) {
        alert("Adresse courriel invalide.");
        isValid = false;
    }

    if (!phoneRegex.test(telephone)) {
        alert("Numéro de téléphone invalide (10 chiffres requis).");
        isValid = false;
    }

    if (!numero || !rue || !ville || !codePostalRegex.test(codePostal)) {
        alert("Veuillez remplir correctement tous les champs d'adresse.");
        isValid = false;
    }

    if (!passwordRegex.test(motDePasse)) {
        alert("Mot de passe trop faible. Il doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.");
        isValid = false;
    }

    if (motDePasse !== confirmation) {
        alert("Les mots de passe ne correspondent pas.");
        isValid = false;
    }

    if (!image || image.type !== "image/png") {
        alert("Veuillez fournir une image de profil au format PNG.");
        isValid = false;
    }

    return isValid;
}

// Ajout du bouton "S'inscrire" dynamiquement
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const inscriptionBtn = document.createElement("button");
    inscriptionBtn.type = "submit";
    inscriptionBtn.textContent = "S'inscrire";
    inscriptionBtn.classList.add("button");
    form.appendChild(inscriptionBtn);

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        if (validateForm()) {
            alert("Inscription réussie !");
        } else {
            alert("Veuillez corriger les erreurs avant de vous inscrire.");
        }
    });
});
