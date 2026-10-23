/** Public URL for a Firebase Storage object path (or passthrough https URL). */
export function firebasePublicUrl(
  path: string | null | undefined
): string | null {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const bucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  if (!bucket) return null;
  return `https://storage.googleapis.com/${bucket}/${path}`;
}
