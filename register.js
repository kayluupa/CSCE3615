import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
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

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('Registered as:', user.email);
        window.location.href = '/'; // Redirect to home page after successful registration
    } catch (error) {
        console.error('Error registering:', error.message);
        const registerError = document.createElement('div');
        registerError.style.color = 'red';
        registerError.innerText = `Error: ${error.message}`;
        document.getElementById('registerForm').appendChild(registerError);
    }
});
