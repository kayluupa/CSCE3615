import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function loadNavbar() {
    try {
        console.log('Loading navbar...');
        const response = await fetch('/navbar/navbar.html');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.text();
        document.getElementById('navbar-container').innerHTML = data;
        console.log('Navbar loaded successfully.');
        initNavbarToggle();
        initAuthState();
    } catch (error) {
        console.error('Error loading navbar:', error);
    }
}

function initNavbarToggle() {
    console.log('Initializing navbar toggle...');
    const mobileMenu = document.getElementById('mobile-menu');
    const navbarMenu = document.querySelector('.navbar__menu');
    const bars = document.querySelectorAll('.bar');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', function () {
            navbarMenu.classList.toggle('active');
            mobileMenu.classList.toggle('is-active');
        });
        console.log('Navbar toggle initialized.');
    } else {
        console.error('Mobile menu element not found.');
    }
}

function initAuthState() {
    console.log('Initializing auth state...');
    onAuthStateChanged(auth, (user) => {
        const registerBtn = document.getElementById('registerBtn');
        const userMenu = document.getElementById('userMenu');
        const userEmail = document.getElementById('userEmail');
        const logoutBtn = document.getElementById('logoutBtn');
        const loginItem = document.querySelector('.navbar__item a[href="/login.html"]');

        if (user) {
            console.log('User is signed in:', user.email);
            if (registerBtn) registerBtn.style.display = 'none';
            if (userMenu) userMenu.style.display = 'flex';
            if (userEmail) userEmail.textContent = user.email;
            if (loginItem) loginItem.style.display = 'none';

            if (logoutBtn) {
                logoutBtn.addEventListener('click', async (e) => {
                    e.preventDefault();
                    await signOut(auth);
                    window.location.href = '/'; // Redirect to home page after logout
                });
            }
        } else {
            console.log('No user is signed in.');
            if (registerBtn) registerBtn.style.display = 'block';
            if (userMenu) userMenu.style.display = 'none';
            if (loginItem) loginItem.style.display = 'block';
        }
    });
}

document.addEventListener('DOMContentLoaded', loadNavbar);
