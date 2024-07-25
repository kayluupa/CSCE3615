// Function to toggle heart icon
export function toggleHeart(element) {
    try {
        // Stop event propagation to prevent unwanted behavior
        event.stopPropagation();

        // Log the element received
        console.log('Element received:', element);

        // Find the closest listing element to ensure we're modifying the correct listing
        const listingItem = element.closest('.listing');

        // Log the closest listing element found
        console.log('Closest listing item:', listingItem);

        if (!listingItem) {
            throw new Error('No listing item found. Ensure the element has the correct structure.');
        }

        // Get the unique ID of the listing from its data-id attribute
        const id = listingItem.getAttribute('data-id');
        console.log('Listing ID:', id);

        if (!id) {
            throw new Error('No data-id attribute found on the listing item.');
        }

        // Retrieve the current list of favorites from localStorage, or initialize an empty array if none exist
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        console.log('Current favorites:', favorites);

        // Check if the heart icon is already liked
        if (element.classList.contains('liked')) {
            // If liked, remove the liked class and change the icon to the default heart icon
            element.classList.remove('liked');
            element.querySelector('img').src = 'images/heart-icon.svg';
            // Remove the listing ID from the favorites array
            favorites = favorites.filter(fav => fav !== id);
        } else {
            // If not liked, add the liked class and change the icon to the red heart icon
            element.classList.add('liked');
            element.querySelector('img').src = 'images/red-heart-icon.svg';
            // Add the listing ID to the favorites array
            favorites.push(id);
        }

        // Save the updated favorites array back to localStorage
        localStorage.setItem('favorites', JSON.stringify(favorites));
        console.log('Favorites updated:', favorites);
    } catch (error) {
        console.error('Error in toggleHeart function:', error);
    }
}

// Function to initialize liked state from localStorage
export function initializeFavorites() {
    try {
        // Retrieve the current list of favorites from localStorage, or initialize an empty array if none exist
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        console.log('Initializing favorites with:', favorites);

        // Iterate over each favorite ID and set the corresponding heart icon to liked state
        favorites.forEach(id => {
            const heartIcon = document.querySelector(`.listing[data-id="${id}"] .heart-icon`);
            console.log(`Setting liked state for listing ID ${id}:`, heartIcon);

            if (heartIcon) {
                heartIcon.classList.add('liked');
                heartIcon.querySelector('img').src = 'images/red-heart-icon.svg';
            } else {
                console.warn(`No heart icon found for listing ID ${id}.`);
            }
        });
    } catch (error) {
        console.error('Error in initializeFavorites function:', error);
    }
}
