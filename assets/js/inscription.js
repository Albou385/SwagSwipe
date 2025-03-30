let generatedEmailCode = null;
let generatedSMSCode = null;
let verificationPhase = false;

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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const codePostalRegex = /^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

    if (prenom.length < 2 || prenom.length > 30) return alert("Le prénom doit contenir entre 2 et 30 caractères."), false;
    if (nom.length < 2 || nom.length > 30) return alert("Le nom doit contenir entre 2 et 30 caractères."), false;
    if (!emailRegex.test(email)) return alert("Adresse courriel invalide."), false;
    if (!phoneRegex.test(telephone)) return alert("Numéro de téléphone invalide (10 chiffres requis)."), false;
    if (!numero || !rue || !ville || !codePostalRegex.test(codePostal)) return alert("Veuillez remplir correctement tous les champs d'adresse."), false;
    if (!passwordRegex.test(motDePasse)) return alert("Mot de passe trop faible."), false;
    if (motDePasse !== confirmation) return alert("Les mots de passe ne correspondent pas."), false;
    if (image && image.type !== "image/png") return alert("L'image de profil doit être un fichier PNG."), false;

    return true;
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formulaire-inscription");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // PHASE 1 — Validation et envoi des codes
        if (!verificationPhase) {
            if (validateForm()) {
                generatedEmailCode = Math.floor(100000 + Math.random() * 900000).toString();
                generatedSMSCode = Math.floor(100000 + Math.random() * 900000).toString();

                alert(`(Simulé) Code envoyé à votre courriel : ${generatedEmailCode}`);
                alert(`(Simulé) Code envoyé par SMS : ${generatedSMSCode}`);

                document.getElementById("verification-section").style.display = "block";
                verificationPhase = true;
            }
        } else {
            // PHASE 2 — Vérification des codes
            const userEmailCode = document.getElementById("code-email").value.trim();
            const userSMSCode = document.getElementById("code-sms").value.trim();

            if (userEmailCode === generatedEmailCode && userSMSCode === generatedSMSCode) {
                alert("Inscription réussie ! ✅ Vérification complétée.");
                form.reset();
                document.getElementById("verification-section").style.display = "none";
                verificationPhase = false;
            } else {
                alert("Les codes sont incorrects. Veuillez réessayer.");
            }
        }
    });
});
