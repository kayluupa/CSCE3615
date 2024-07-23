// Function to toggle heart icon
export function toggleHeart(element) {
    const img = element.querySelector('img');
    if (img.src.includes('heart-icon.svg')) {
        img.src = 'images/red-heart-icon.svg';
    } else {
        img.src = 'images/heart-icon.svg';
    }
}
