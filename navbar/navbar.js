// Import necessary functions from Firebase libraries
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

// Firebase configuration object containing keys and identifiers for your app
const firebaseConfig = {
    apiKey: "AIzaSyDzbLT3EPkXDhmkb8h1vdViuD1-afAuGvo",
    authDomain: "aptmate-b5eb0.firebaseapp.com",
    databaseURL: "https://aptmate-b5eb0-default-rtdb.firebaseio.com",
    projectId: "aptmate-b5eb0",
    storageBucket: "aptmate-b5eb0.appspot.com",
    messagingSenderId: "1030969940790",
    appId: "1:1030969940790:web:6c23201d5c1bc0e4aab197",
    measurementId: "G-HC8Y3HS30S"
};

// Initialize Firebase app with the provided configuration
const app = initializeApp(firebaseConfig);
// Get the authentication instance from the Firebase app
const auth = getAuth(app);

// Asynchronously load the navbar HTML and insert it into the page
async function loadNavbar() {
    try {
        console.log('Loading navbar...');
        const response = await fetch('/navbar/navbar.html'); // Fetch the navbar HTML
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`); // Handle fetch error
        }
        const data = await response.text(); // Read the response as text
        document.getElementById('navbar-container').innerHTML = data; // Insert the navbar HTML into the page
        console.log('Navbar loaded successfully.');
        initNavbarToggle(); // Initialize the navbar toggle functionality
        initAuthState(); // Initialize authentication state listener
    } catch (error) {
        console.error('Error loading navbar:', error); // Log any errors
    }
}

// Initialize the mobile menu toggle functionality
function initNavbarToggle() {
    console.log('Initializing navbar toggle...');
    const mobileMenu = document.getElementById('mobile-menu'); // Get the mobile menu element
    const navbarMenu = document.querySelector('.navbar__menu'); // Get the navbar menu element
    const bars = document.querySelectorAll('.bar'); // Get the bars in the mobile menu

    if (mobileMenu) {
        mobileMenu.addEventListener('click', function () { // Add click event listener to the mobile menu
            navbarMenu.classList.toggle('active'); // Toggle the active class on the navbar menu
            mobileMenu.classList.toggle('is-active'); // Toggle the is-active class on the mobile menu
        });
        console.log('Navbar toggle initialized.');
    } else {
        console.error('Mobile menu element not found.'); // Log error if mobile menu element is not found
    }
}

// Initialize authentication state listener
function initAuthState() {
    console.log('Initializing auth state...');
    onAuthStateChanged(auth, (user) => { // Listen for authentication state changes
        const registerBtn = document.getElementById('registerBtn'); // Get the register button element
        const userMenu = document.getElementById('userMenu'); // Get the user menu element
        const userEmail = document.getElementById('userEmail'); // Get the user email element
        const logoutBtn = document.getElementById('logoutBtn'); // Get the logout button element
        const loginItem = document.querySelector('.navbar__item a[href="/login.html"]'); // Get the login link element
        const favoritesItem = document.querySelector('.navbar__item a[href="/favorites.html"]');

        if (user) {
            // User is signed in
            console.log('User is signed in:', user.email);
            if (registerBtn) registerBtn.style.display = 'none'; // Hide the register button
            if (userMenu) userMenu.style.display = 'flex'; // Show the user menu
            if (userEmail) userEmail.textContent = user.email; // Set the user email text
            if (loginItem) loginItem.style.display = 'none'; // Hide the login link

            if (logoutBtn) {
                logoutBtn.addEventListener('click', async (e) => { // Add click event listener to the logout button
                    e.preventDefault();
                    await signOut(auth); // Sign out the user
                    window.location.href = '/'; // Redirect to home page after logout
                });
            }
        } else {
            // No user is signed in
            console.log('No user is signed in.');
            if (registerBtn) registerBtn.style.display = 'block'; // Show the register button
            if (userMenu) userMenu.style.display = 'none'; // Hide the user menu
            if (favoritesItem) favoritesItem.style.display = 'none';
        }
    });
}

// Add event listener to run loadNavbar when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', loadNavbar);
