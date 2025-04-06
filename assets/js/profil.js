function estConnecte() {
    return localStorage.getItem("utilisateurConnecte") !== null;
}

if (!estConnecte()) {
    alert("Vous devez être connecté pour consulter votre profil.");
    window.location.href = "connexion.html";
    return; // Stopper l'exécution ici
}