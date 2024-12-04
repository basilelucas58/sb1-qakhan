import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDm5jo8MHEpMucigxSOVb7cb2lXBgEkkEA",
  authDomain: "argentinalabura-78866.firebaseapp.com",
  projectId: "argentinalabura-78866",
  storageBucket: "argentinalabura-78866.firebasestorage.app",
  messagingSenderId: "761184814969",
  appId: "1:761184814969:web:896097ee689e3ae68f91a8"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;