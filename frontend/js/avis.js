/**
 * avis.js
 * Handles star rating functionality and form validation for reviews
 */

document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.star');
    const noteInput = document.getElementById('note');
    const reviewForm = document.getElementById('review-form');
    const averageRatingElement = document.getElementById('average-rating');
    const reviewsContainer = document.getElementById('reviews-container');

    // Star rating functionality
    stars.forEach(star => {
        star.addEventListener('mouseover', () => {
            const val = parseInt(star.dataset.value);
            stars.forEach(s => {
                s.style.color = parseInt(s.dataset.value) <= val ? '#FFD700' : '#ccc';
            });
        });

        star.addEventListener('mouseout', () => {
            const currentVal = parseInt(noteInput.value);
            stars.forEach(s => {
                s.style.color = parseInt(s.dataset.value) <= currentVal ? '#FFD700' : '#ccc';
            });
        });

        star.addEventListener('click', () => {
            noteInput.value = star.dataset.value;
            stars.forEach(s => s.classList.remove('selected'));
            star.classList.add('selected');
        });
    });

    // Form validation function
    function verifierNote() {
        if (parseInt(noteInput.value) === 0) {
            alert("Veuillez sélectionner une note.");
            return false;
        }
        return true;
    }

    // Fetch reviews from API
    async function fetchReviews() {
        try {
            const response = await fetch('/api/avis');
            const result = await response.json();
            
            if (result.status === 'success') {
                // Update average rating
                if (averageRatingElement) {
                    averageRatingElement.textContent = result.moyenne.toFixed(1);
                }
                
                // Display reviews if container exists
                if (reviewsContainer && result.data.length > 0) {
                    displayReviews(result.data);
                }
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    }
    
    // Display reviews from API data
    function displayReviews(reviews) {
        reviewsContainer.innerHTML = '';
        
        reviews.forEach(review => {
            const stars = '⭐'.repeat(review.note);
            
            const reviewElement = document.createElement('div');
            reviewElement.className = 'review';
            reviewElement.innerHTML = `
                <h3>${review.prenom} ${review.nom}</h3>
                <p>${review.avis}</p>
                <div class="stars">${stars}</div>
            `;
            
            reviewsContainer.appendChild(reviewElement);
        });
    }
    
    // Handle form submission
    if (reviewForm) {
        reviewForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            if (!verifierNote()) {
                return;
            }
            
            const formData = new FormData(reviewForm);
            const reviewData = {
                prenom: formData.get('prenom'),
                nom: formData.get('nom'),
                avis: formData.get('avis'),
                note: parseInt(formData.get('note'))
            };
            
            try {
                const response = await fetch('/api/avis', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(reviewData)
                });
                
                const result = await response.json();
                
                if (result.status === 'success') {
                    window.location.href = '/retour_avis';
                } else {
                    alert('Erreur: ' + (result.message || 'Échec de l\'envoi de l\'avis'));
                }
            } catch (error) {
                console.error('Error submitting review:', error);
                alert('Erreur de connexion au serveur');
            }
        });
    }
    
    // Initial fetch of reviews
    fetchReviews();
});