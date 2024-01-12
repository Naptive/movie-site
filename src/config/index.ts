// Import the functions you need from the SDKs you need
import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
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
  appId: "1:793944993689:web:8225f178ec7d23c6062d08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth: any = getAuth(app);
export const storage = getStorage(app);
export let analytics: any

isSupported().then((supportStatus) => {
  if (supportStatus) {
    analytics = getAnalytics(app)
  } else {
  }
 });


