// app/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAGPAeDy2LogTUMEJDoxyW1MOJE9o1ecQc",
  authDomain: "app-tuso.firebaseapp.com",
  projectId: "app-tuso",
  storageBucket: "app-tuso.firebasestorage.app",
  messagingSenderId: "380318633215",
  appId: "1:380318633215:web:421071a71862f36ef250ca",
  measurementId: "G-PL32923Y5Z"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
