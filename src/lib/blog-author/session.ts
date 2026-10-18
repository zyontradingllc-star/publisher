const VERIFICATION_KEY = "authorspilot_blog_verify";
const VERIFIED_KEY = "authorspilot_blog_author";
const CODE_TTL_MS = 10 * 60 * 1000;
const VERIFIED_TTL_MS = 7 * 24 * 60 * 60 * 1000;

type PendingVerification = {
  email: string;
  code: string;
  expiresAt: number;
};

type VerifiedAuthor = {
  email: string;
  verifiedAt: number;
};

const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidAuthorEmail(email: string) {
  return emailOk.test(email.trim().toLowerCase());
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function createVerificationCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export function savePendingVerification(email: string, code: string) {
  const payload: PendingVerification = {
    email: normalizeEmail(email),
    code,
    expiresAt: Date.now() + CODE_TTL_MS,
  };
  sessionStorage.setItem(VERIFICATION_KEY, JSON.stringify(payload));
}

export function verifyCode(email: string, code: string) {
  const raw = sessionStorage.getItem(VERIFICATION_KEY);
  if (!raw) return { ok: false as const, message: "Request a new verification code first." };

  let pending: PendingVerification;
  try {
    pending = JSON.parse(raw) as PendingVerification;
  } catch {
    return { ok: false as const, message: "Verification expired. Request a new code." };
  }

  const normalized = normalizeEmail(email);

  if (pending.email !== normalized) {
    return { ok: false as const, message: "Email does not match the verification request." };
  }

  if (Date.now() > pending.expiresAt) {
    sessionStorage.removeItem(VERIFICATION_KEY);
    return { ok: false as const, message: "Code expired. Request a new one." };
  }

  if (pending.code !== code.trim()) {
    return { ok: false as const, message: "Incorrect code. Please try again." };
  }

  const verified: VerifiedAuthor = {
    email: normalized,
    verifiedAt: Date.now(),
  };

  localStorage.setItem(VERIFIED_KEY, JSON.stringify(verified));
  sessionStorage.removeItem(VERIFICATION_KEY);

  return { ok: true as const, email: normalized };
}

export function getVerifiedAuthor(): VerifiedAuthor | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(VERIFIED_KEY);
  if (!raw) return null;

  try {
    const author = JSON.parse(raw) as VerifiedAuthor;
    if (Date.now() - author.verifiedAt > VERIFIED_TTL_MS) {
      localStorage.removeItem(VERIFIED_KEY);
      return null;
    }
    return author;
  } catch {
    localStorage.removeItem(VERIFIED_KEY);
    return null;
  }
}

export function clearVerifiedAuthor() {
  localStorage.removeItem(VERIFIED_KEY);
  sessionStorage.removeItem(VERIFICATION_KEY);
}

export function saveVerifiedAuthor(email: string) {
  const verified: VerifiedAuthor = {
    email: normalizeEmail(email),
    verifiedAt: Date.now(),
  };
  localStorage.setItem(VERIFIED_KEY, JSON.stringify(verified));
}
