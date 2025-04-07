document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-connexion");
    const erreurDiv = document.getElementById("message-erreur");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = form.email.value.trim();
        const motDePasse = form.mot_de_passe.value.trim();

        if (!email || !motDePasse) {
            erreurDiv.textContent = "Tous les champs sont requis.";
            erreurDiv.style.display = "block";
            return;
        }

        const formData = new FormData(form);

        console.log("Tentative de connexion avec :", email, motDePasse);

        fetch(form.action, {
            method: "POST",
            body: formData
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.success) {
                // ✅ Connexion réussie : enregistrer les infos dans localStorage
                localStorage.setItem("utilisateurConnecte", JSON.stringify(data.utilisateur));
                alert("Bienvenue, " + data.utilisateur.prenom + " !");
                window.location.href = "profil.html";
            } else {
                erreurDiv.textContent = data.message;
                erreurDiv.style.display = "block";
            }
        })
        .catch(error => {
            console.error("Erreur :", error);
            erreurDiv.textContent = "Une erreur est survenue. Réessayez.";
            erreurDiv.style.display = "block";
        });
    });
});
