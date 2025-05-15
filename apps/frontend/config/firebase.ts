import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { env } from "./env";

const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
  appId: env.FIREBASE_APP_ID,
  measurementId: env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

// Connect to emulators if in development environment
if (env.USE_FIREBASE_EMULATOR === "true") {
  const authEmulatorHost = env.FIREBASE_AUTH_EMULATOR_HOST || "localhost";
  const authEmulatorPort = env.FIREBASE_AUTH_EMULATOR_PORT || "9099";
  const firestoreEmulatorHost =
    env.FIREBASE_FIRESTORE_EMULATOR_HOST || "localhost";
  const firestoreEmulatorPort = env.FIREBASE_FIRESTORE_EMULATOR_PORT || "8080";

  // Connect to Auth emulator
  connectAuthEmulator(auth, `http://${authEmulatorHost}:${authEmulatorPort}`, {
    disableWarnings: false,
  });
  console.log(
    `Connected to Firebase Auth emulator on ${authEmulatorHost}:${authEmulatorPort}`,
  );

  // Connect to Firestore emulator
  connectFirestoreEmulator(
    db,
    firestoreEmulatorHost,
    parseInt(firestoreEmulatorPort),
  );
  console.log(
    `Connected to Firestore emulator on ${firestoreEmulatorHost}:${firestoreEmulatorPort}`,
  );
}

export { app, auth, db };
