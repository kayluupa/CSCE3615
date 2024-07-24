// Function to toggle heart icon
export function toggleHeart(element) {
    // Stop event propagation
    event.stopPropagation();

    const listingItem = element.closest('.listing');
    const id = listingItem.getAttribute('data-id');
    console.log('Toggling favorite for listing ID:', id);

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (element.classList.contains('liked')) {
        // If liked, remove the liked class and from favorites
        element.classList.remove('liked');
        element.querySelector('img').src = 'images/heart-icon.svg';
        favorites = favorites.filter(fav => fav !== id);
    } else {
        // If not liked, add the liked class and to favorites
        element.classList.add('liked');
        element.querySelector('img').src = 'images/red-heart-icon.svg';
        favorites.push(id);
    }

    // Save updated favorites to localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
    console.log('Favorites updated:', favorites);
}

// Initialize liked state from localStorage
export function initializeFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.forEach(id => {
        const heartIcon = document.querySelector(`.listing[data-id="${id}"] .heart-icon`);
        if (heartIcon) {
            heartIcon.classList.add('liked');
            heartIcon.querySelector('img').src = 'images/red-heart-icon.svg';
        }
    });
}
