import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chat-app-3534f.firebaseapp.com",
  projectId: "chat-app-3534f",
  storageBucket: "chat-app-3534f.firebasestorage.app",
  messagingSenderId: "120958519406",
  appId: "1:120958519406:web:c97748c800b29ba8497e7f",
  measurementId: "G-TPYXVJSVB6",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
