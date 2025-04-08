document.addEventListener("DOMContentLoaded", () => {
    const boutonAjout = document.querySelector("#form-ajout-produit");

    if (boutonAjout) {
        boutonAjout.addEventListener("submit", (e) => {
            const estConnecte = localStorage.getItem("utilisateurConnecte");

            if (!estConnecte) {
                e.preventDefault(); // Stopper l'envoi du formulaire
                alert("Veuillez vous connecter pour ajouter un produit.");
                window.location.href = "connexion.html";
            }
        });
    }
});
