// src/js/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set } from "firebase/database";

// Configuración con variables de entorno
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export { database };

// Función para guardar el voto
export function saveVote(productId) {
  const votesRef = ref(database, 'votes');
  const newVoteRef = push(votesRef);
  const data = {
    product: productId,
    timestamp: new Date().toISOString()
  };
  return set(newVoteRef, data); // Solo devuelve la promesa
}

