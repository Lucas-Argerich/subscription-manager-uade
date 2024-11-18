import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: 'AIzaSyDOpmn2oajHZ8USNXO6_3_uO-2LeH6OTGo',
  authDomain: 'subscription-manager-uade.firebaseapp.com',
  projectId: 'subscription-manager-uade',
  storageBucket: 'subscription-manager-uade.appspot.com',
  messagingSenderId: '1041561023629',
  appId: '1:1041561023629:web:ff741fe05a2eac35f61ec4',
  measurementId: 'G-LLNJV3J0KD'
}

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
