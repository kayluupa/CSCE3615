import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

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
const storage = getStorage(app);

export function writeApartmentData(apartmentId, bedroom, bathroom, price, zipcode, amenities, photos, website) {
    const reference = ref(database, 'apartments/' + apartmentId);
    set(reference, {
        Bedroom: bedroom,
        Bathroom: bathroom,
        Price: price,
        ZipCode: zipcode,
        Amenities: amenities,
        Photos: photos, // Ensure this line correctly saves the photo URLs
        Website: website
    })
    .then(() => {
        console.log("Data saved successfully!");
        alert("Data saved successfully!");
    })
    .catch((error) => {
        console.error("Data could not be saved. ", error);
        alert("Data could not be saved. " + error);
    });
}


export async function uploadPhotos(apartmentId, files) {
    const maxPhotos = 10;
    const limitedFiles = Array.from(files).slice(0, maxPhotos); // Limit to 10 files

    const uploadPromises = limitedFiles.map(async (file, index) => {
        const storageReference = storageRef(storage, `apartments/${apartmentId}/${file.name}`);
        await uploadBytes(storageReference, file);
        return await getDownloadURL(storageReference);
    });

    try {
        return await Promise.all(uploadPromises);
    } catch (error) {
        console.error("Error uploading photos: ", error);
        throw error;
    }
}


export async function fetchApartmentData(apartmentId = null) {
    const dbRef = ref(database);
    console.log(`Fetching data for apartment ID: ${apartmentId}`);
    try {
        const snapshot = apartmentId ? 
            await get(child(dbRef, `apartments/${apartmentId}`)) :
            await get(child(dbRef, 'apartments'));

        if (snapshot.exists()) {
            console.log("Data fetched successfully: ", snapshot.val());
            return snapshot.val();
        } else {
            console.log("No data available");
            return null;
        }
    } catch (error) {
        console.error("Error fetching data: ", error);
        return null;
    }
}


