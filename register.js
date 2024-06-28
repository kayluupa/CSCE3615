// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your web app's Firebase configuration
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

//Submit button
const submitbutton = document.getElementById('submitbutton');
submitbutton.addEventListener("click", function (event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert("Account created successfully!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
});
