"use client";

import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import {
  getFirebasePublicConfig,
  isFirebaseClientConfigured,
} from "@/lib/firebase/config";

export { isFirebaseClientConfigured };

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

/** Browser-only Firebase app (Auth). Safe to call from client components. */
export function getFirebaseApp(): FirebaseApp {
  if (app) return app;
  const existing = getApps()[0];
  if (existing) {
    app = existing;
    return app;
  }
  app = initializeApp(getFirebasePublicConfig());
  return app;
}

export function getFirebaseAuth(): Auth {
  if (auth) return auth;
  auth = getAuth(getFirebaseApp());
  return auth;
}
