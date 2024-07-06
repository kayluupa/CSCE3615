// Importing Firebase and its services
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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
const database = getDatabase(app);

// Function to write apartment data to the database
function writeApartmentData(apartmentId, Bedroom, Bathroom, Price, ZipCode) {
    const reference = ref(database, 'apartments/' + apartmentId);
    set(reference, {
        Bedroom: Bedroom,
        Bathroom: Bathroom,
        Price: Price,
        ZipCode: ZipCode
    })
    .then(() => {
        alert("Data saved successfully!");
    })
    .catch((error) => {
        alert("Data could not be saved. " + error);
    });
}

// Event listener for the register submit button
document.getElementById('authForm').addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert("Account created successfully!");
        window.location.href = "favorites.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
});

// Event listener for the save apartment button
document.getElementById('apartmentForm').addEventListener("submit", function (event) {
    event.preventDefault();

    const apartmentId = document.getElementById('apartmentId').value;
    const bedroom = document.getElementById('bedroom').value;
    const bathroom = document.getElementById('bathroom').value;
    const price = document.getElementById('price').value;
    const zipcode = document.getElementById('zipcode').value;

    writeApartmentData(apartmentId, bedroom, bathroom, price, zipcode);
});
