# Firebase setup (Authors Pilot platform)

Permanent author accounts, books, covers, and password reset use **Google Firebase**.

## 1. Create project

1. Open [Firebase Console](https://console.firebase.google.com)
2. Add project → enable **Google Analytics** optional
3. Add a **Web app** → copy config into `.env.local`

## 2. Enable products

| Product | Setting |
|---------|---------|
| **Authentication** | Email/Password provider ON |
| **Firestore** | Create database (start in test mode for local, lock rules before production) |
| **Storage** | Enable default bucket |

## 3. Service account (server)

1. Project settings → **Service accounts** → **Generate new private key**
2. Set in `.env.local`:
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY` (keep `\n` escapes)

## 4. Password reset emails

Firebase sends reset mail from its templates (or a custom SMTP you attach in Google Cloud).

1. Authentication → **Templates** → Password reset  
2. Optionally set continue URL to `https://app.authorspilot.com/reset-password`  
3. For branded `no-reply@authorspilot.com`, configure custom SMTP / domain in Google Cloud Identity Platform or use Resend for transactional mail after reset.

Wrong password on login shows an error; **Forgot password** triggers Firebase `sendOobCode` to the author’s mailbox.

## 5. What is stored

| Collection / path | Contents |
|-------------------|----------|
| `profiles/{uid}` | Display name, bio, avatar path, socials |
| `books/{id}` | Title, description, status, cover/manuscript paths |
| `books/{id}/sales_links` | External purchase URLs |
| Storage `avatars/`, `books/` | Avatar, cover, manuscript files |

## 6. Local run

```bash
cp .env.example .env.local
# fill Firebase keys
npm run dev
```

Without Firebase env vars, the app still allows temporary **lead cookie** signup (inbox only) — data is not permanent until Firebase is connected.
