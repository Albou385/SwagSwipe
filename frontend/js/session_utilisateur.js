/**
 * session_utilisateur.js
 * Manages dynamic user session elements in the header
 */

document.addEventListener('DOMContentLoaded', function() {
    const userZone = document.getElementById('zone-utilisateur');
    
    // Function to fetch current user details
    async function getUserDetails() {
        try {
            const response = await fetch('/api/user_details');
            
            if (response.status === 200) {
                const data = await response.json();
                return data.data; // The user data
            } else {
                // Not logged in or error
                return null;
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
            return null;
        }
    }
    
    // Function to handle logout
    async function handleLogout() {
        try {
            await fetch('/api/logout', {
                method: 'POST'
            });
            // Redirect to home page after logout
            window.location.href = '/';
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }
    
    // Function to update the UI based on user status
    function updateUI(user) {
        if (user) {
            // User is logged in
            userZone.innerHTML = `
                <span style="margin-right: 10px;">Bonjour, ${user.prenom}</span>
                <button class="button-style" id="logout-btn">Déconnexion</button>
            `;
            
            // Add logout event listener
            document.getElementById('logout-btn').addEventListener('click', handleLogout);
        } else {
            // User is not logged in
            userZone.innerHTML = `
                <button class="button-style" onclick="window.location.href='/login'">Connexion</button>
                <button class="button-style" onclick="window.location.href='/signup'">Inscription</button>
            `;
        }
    }
    
    // Initialize - check user status and update UI
    async function init() {
        const user = await getUserDetails();
        updateUI(user);
    }
    
    // Start the initialization
    init();
});