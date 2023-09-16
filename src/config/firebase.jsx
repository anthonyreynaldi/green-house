import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAzTJfig9jYMHBJXst3afeJvEMeKNYmryg",
  authDomain: "dev-green-house.firebaseapp.com",
  projectId: "dev-green-house",
  storageBucket: "dev-green-house.appspot.com",
  messagingSenderId: "372358242273",
  appId: "1:372358242273:web:d196eeb9a9d0b3631fbca0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const collectionName = "plants";
export const plantsCollectionRef = collection(db, collectionName);
export const storage = getStorage(app);
export const plantImageFolder = "plant-images/";