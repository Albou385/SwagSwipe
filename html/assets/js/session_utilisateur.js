
  document.addEventListener("DOMContentLoaded", () => {
    const zoneUtilisateur = document.getElementById("zone-utilisateur");
    const utilisateur = JSON.parse(localStorage.getItem("utilisateurConnecte"));

    if (zoneUtilisateur) {
      if (utilisateur) {
        zoneUtilisateur.innerHTML = `
          <span style="margin-right: 10px; font-weight: bold;">
            👋 Bonjour, ${utilisateur.prenom}
          </span>
          <button class="nav-button" onclick="deconnecter()">Se déconnecter</button>
        `;
      } else {
        zoneUtilisateur.innerHTML = `
          <button class="nav-button" onclick="window.location.href='creation_utilisateur.html'">Inscription</button>
          <button class="nav-button" onclick="window.location.href='connexion.html'">Connexion</button>
        `;
      }
    }
  });

  function deconnecter() {
    localStorage.removeItem("utilisateurConnecte");
    alert("👋 Vous avez été déconnecté.");
    window.location.href = "accueil.html"; // Redirection après déconnexion
  }

