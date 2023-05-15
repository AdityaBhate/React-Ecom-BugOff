// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, set } from 'firebase/database';


const firebaseConfig = {
	apiKey: "AIzaSyDgjyJrk76l06ohClKZEZlB70oy0xCkFYE",
	authDomain: "ecommerce-app-246d2.firebaseapp.com",
	projectId: "ecommerce-app-246d2",
	storageBucket: "ecommerce-app-246d2.appspot.com",
	messagingSenderId: "521587305347",
	appId: "1:521587305347:web:4a3a92df2ccb80bf4de4b6",
	measurementId: "G-4M1GFTMSMN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
const database = getDatabase();

export { database, ref, set };
