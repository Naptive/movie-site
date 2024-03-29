
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSFKvjyHgS6aLUm1uffKmfai6n9Mo7Y9o",
  authDomain: "social-media-app-21213.firebaseapp.com",
  databaseURL: "https://social-media-app-21213-default-rtdb.firebaseio.com",
  projectId: "social-media-app-21213",
  storageBucket: "social-media-app-21213.appspot.com",
  messagingSenderId: "793944993689",
  appId: "1:793944993689:web:8225f178ec7d23c6062d08",
  measurementId: "G-K3RJRVD0Z0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
