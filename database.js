// Importing Firebase RealTime Database and its services
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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
const database = getDatabase(app);

// Function to write apartment data to the database
export function writeApartmentData(apartmentId, Bedroom, Bathroom, Price, ZipCode, Amenities) {
    const reference = ref(database, 'apartments/' + apartmentId);
    set(reference, {
        Bedroom: Bedroom,
        Bathroom: Bathroom,
        Price: Price,
        ZipCode: ZipCode,
        Amenities: Amenities
    })
    .then(() => {
        alert("Data saved successfully!");
    })
    .catch((error) => {
        alert("Data could not be saved. " + error);
    });
}

// Function to fetch apartment data from the database
export async function fetchApartmentData() {
    const dbRef = ref(getDatabase());
    try {
        const snapshot = await get(child(dbRef, `apartments`));
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log("No data available");
        }
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}
