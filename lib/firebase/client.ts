import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, connectAuthEmulator, type Auth } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator, type Firestore } from "firebase/firestore";
import { getStorage, connectStorageEmulator, type FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "demo.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "demo.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "0",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "demo",
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

function getFirebaseApp() {
  if (!app) {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  }
  return app;
}

export function getClientAuth() {
  if (!auth) {
    auth = getAuth(getFirebaseApp());
    if (
      typeof window !== "undefined" &&
      process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === "true"
    ) {
      try {
        connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
      } catch {
        // already connected
      }
    }
  }
  return auth;
}

export function getClientDb() {
  if (!db) {
    db = getFirestore(getFirebaseApp());
    if (
      typeof window !== "undefined" &&
      process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === "true"
    ) {
      try {
        connectFirestoreEmulator(db, "127.0.0.1", 8080);
      } catch {
        // already connected
      }
    }
  }
  return db;
}

export function getClientStorage() {
  if (!storage) {
    storage = getStorage(getFirebaseApp());
    if (
      typeof window !== "undefined" &&
      process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === "true"
    ) {
      try {
        connectStorageEmulator(storage, "127.0.0.1", 9199);
      } catch {
        // already connected
      }
    }
  }
  return storage;
}

// Backwards-compatible exports (lazy)
export const auth = typeof window !== "undefined" ? getClientAuth() : (null as any);
export const db = typeof window !== "undefined" ? getClientDb() : (null as any);
export const storage = typeof window !== "undefined" ? getClientStorage() : (null as any);

export default getFirebaseApp;
