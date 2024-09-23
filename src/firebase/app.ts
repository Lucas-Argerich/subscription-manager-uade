// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOpmn2oajHZ8USNXO6_3_uO-2LeH6OTGo",
  authDomain: "subscription-manager-uade.firebaseapp.com",
  projectId: "subscription-manager-uade",
  storageBucket: "subscription-manager-uade.appspot.com",
  messagingSenderId: "1041561023629",
  appId: "1:1041561023629:web:ff741fe05a2eac35f61ec4",
  measurementId: "G-LLNJV3J0KD"
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const analytics = getAnalytics(app)
