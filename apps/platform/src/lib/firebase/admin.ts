import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { isFirebaseConfigured } from "@/lib/firebase/config";

function initAdmin(): App | null {
  if (!isFirebaseConfigured()) return null;
  if (getApps().length) return getApps()[0]!;

  const privateKey = (process.env.FIREBASE_PRIVATE_KEY ?? "").replace(
    /\\n/g,
    "\n"
  );

  return initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey,
    }),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
}

export function getFirebaseAdminApp(): App | null {
  try {
    return initAdmin();
  } catch (err) {
    console.warn(
      "[firebase-admin] init failed:",
      err instanceof Error ? err.message : err
    );
    return null;
  }
}

export function adminAuth() {
  const app = getFirebaseAdminApp();
  if (!app) return null;
  return getAuth(app);
}

export function adminDb() {
  const app = getFirebaseAdminApp();
  if (!app) return null;
  return getFirestore(app);
}

export function adminStorage() {
  const app = getFirebaseAdminApp();
  if (!app) return null;
  return getStorage(app);
}
