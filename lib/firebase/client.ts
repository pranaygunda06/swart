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

let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;
let _db: Firestore | null = null;
let _storage: FirebaseStorage | null = null;

function getFirebaseApp() {
  if (!_app) {
    _app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  }
  return _app;
}

export function getClientAuth() {
  if (!_auth) {
    _auth = getAuth(getFirebaseApp());
    if (
      typeof window !== "undefined" &&
      process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === "true"
    ) {
      try {
        connectAuthEmulator(_auth, "http://127.0.0.1:9099", { disableWarnings: true });
      } catch {
        // already connected
      }
    }
  }
  return _auth;
}

export function getClientDb() {
  if (!_db) {
    _db = getFirestore(getFirebaseApp());
    if (
      typeof window !== "undefined" &&
      process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === "true"
    ) {
      try {
        connectFirestoreEmulator(_db, "127.0.0.1", 8080);
      } catch {
        // already connected
      }
    }
  }
  return _db;
}

export function getClientStorage() {
  if (!_storage) {
    _storage = getStorage(getFirebaseApp());
    if (
      typeof window !== "undefined" &&
      process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === "true"
    ) {
      try {
        connectStorageEmulator(_storage, "127.0.0.1", 9199);
      } catch {
        // already connected
      }
    }
  }
  return _storage;
}

export default getFirebaseApp;
