import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBtv_fQCNRCajn85u9mgUdVG2PqLp_I7UU",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "visit-kzn-81e0b.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "visit-kzn-81e0b",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "visit-kzn-81e0b.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "710014743425",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:710014743425:web:3ae4035c8bef94815cee80"
};

// Initialize Firebase
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Local storage key for fallback persistence when offline or demoing
export const STORAGE_KEYS = {
  BOOKINGS: 'visit_kzn_user_bookings',
  FAVORITES: 'visit_kzn_user_favorites',
  USER: 'visit_kzn_user_profile',
  BUSINESS_LISTINGS: 'visit_kzn_business_listings'
};

