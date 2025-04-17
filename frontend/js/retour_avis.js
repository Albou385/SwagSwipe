/**
 * retour_avis.js
 * Adds simple animations and auto-redirect functionality to the thank you page
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const container = document.querySelector('.container');
    const heading = container.querySelector('h1');
    const paragraphs = container.querySelectorAll('p');
    const button = container.querySelector('.button');
    
    // Set initial state (hide elements)
    container.style.opacity = '0';
    container.style.transform = 'translateY(20px)';
    heading.style.opacity = '0';
    
    paragraphs.forEach(p => {
        p.style.opacity = '0';
        p.style.transform = 'translateY(15px)';
    });
    
    button.style.opacity = '0';
    
    // Add transitions
    container.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    heading.style.transition = 'opacity 0.6s ease 0.3s';
    
    paragraphs.forEach((p, index) => {
        p.style.transition = `opacity 0.6s ease ${0.5 + (index * 0.2)}s, transform 0.6s ease ${0.5 + (index * 0.2)}s`;
    });
    
    button.style.transition = 'opacity 0.6s ease 1.2s, background-color 0.3s';
    
    // Animate in
    setTimeout(() => {
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
        heading.style.opacity = '1';
        
        paragraphs.forEach(p => {
            p.style.opacity = '1';
            p.style.transform = 'translateY(0)';
        });
        
        button.style.opacity = '1';
    }, 100);
    
    // Auto-redirect after delay (optional)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('redirect') === 'auto') {
        const countdown = document.createElement('p');
        countdown.className = 'countdown';
        countdown.textContent = 'Redirection automatique dans 10 secondes...';
        container.appendChild(countdown);
        
        let secondsLeft = 10;
        const countdownInterval = setInterval(() => {
            secondsLeft--;
            countdown.textContent = `Redirection automatique dans ${secondsLeft} seconde${secondsLeft !== 1 ? 's' : ''}...`;
            
            if (secondsLeft <= 0) {
                clearInterval(countdownInterval);
                window.location.href = '/';
            }
        }, 1000);
        
        // Allow canceling auto-redirect
        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'cancel-redirect';
        cancelBtn.textContent = 'Annuler la redirection';
        cancelBtn.style.marginTop = '10px';
        cancelBtn.style.background = 'transparent';
        cancelBtn.style.border = '1px solid #ccc';
        cancelBtn.style.padding = '5px 10px';
        cancelBtn.style.cursor = 'pointer';
        cancelBtn.style.borderRadius = '4px';
        
        cancelBtn.addEventListener('click', () => {
            clearInterval(countdownInterval);
            countdown.remove();
            cancelBtn.remove();
        });
        
        container.appendChild(cancelBtn);
    }
    
    // Track when the user clicks the return button
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Animate out
        container.style.opacity = '0';
        container.style.transform = 'translateY(-20px)';
        
        // Redirect after animation completes
        setTimeout(() => {
            window.location.href = '/';
        }, 500);
    });
});