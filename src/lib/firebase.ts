import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAaA3LLWt4z1Z1mWXz2rz4UjuYI8YcR1Ns",
  authDomain: "dersflix3-2739c.firebaseapp.com",
  projectId: "dersflix3-2739c",
  storageBucket: "dersflix3-2739c.firebasestorage.app",
  messagingSenderId: "390346749869",
  appId: "1:390346749869:web:f39abb977b5108ff929324"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);