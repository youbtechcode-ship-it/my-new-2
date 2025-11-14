import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAzuHCoiP9tvZaCeZWGcwl4qodXiu8XG3Y",
  authDomain: "celebration-platform.firebaseapp.com",
  projectId: "celebration-platform",
  storageBucket: "celebration-platform.firebasestorage.app",
  messagingSenderId: "31584641860",
  appId: "1:31584641860:web:898f4f3922cb32b44c2d11",
  measurementId: "G-497JZN0W8F"
};

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getFirestore(app);

export { app, db };
