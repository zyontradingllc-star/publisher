# Option B — Node deploy (Publish / Dashboard live)

## Pehle ye samajh lo

| Goal | Reality |
|------|---------|
| Marketing + dashboard **ek hi `out/` folder** | **Nahi** — dashboard Node mangta hai |
| Marketing Hostinger pe + platform Node pe | **Haan** — ye practical Option B hai |
| Baad mein dono ek Node app / ek domain | Possible, lekin alag bada merge project |

**Abhi karna hai:** platform ko Node pe live karo → `https://app.authorspilot.com`  
Marketing `authorspilot.com` Hostinger pe rehti hai. Publish / Dashboard Node pe chalte hain.

---

## Step 0 — Pehle ye ready hon

1. **Firebase** project (Auth Email/Password + Firestore + Storage) — keys `apps/platform/.env.example` mein listed  
2. **MongoDB Atlas** (Payload CMS / book submissions) — `DATABASE_URL`  
3. Domain DNS access (Hostinger / Cloudflare) taake `app.authorspilot.com` CNAME set ho

Bina Firebase + Mongo ke deploy ho jayega lekin form/login kaam nahi karega.

---

## Step 1 — Railway pe Node deploy (sabse asaan)

1. [railway.app](https://railway.app) pe account → **New Project** → **Deploy from GitHub**  
2. Ye repo connect karo  
3. Service settings:
   - **Root Directory:** `apps/platform`
   - **Builder:** Dockerfile (repo mein `apps/platform/Dockerfile` hai)  
     *ya* Nixpacks: Build `npm run build`, Start `npm run start`
4. **Variables** (Railway → Variables) — production values:

```env
NEXT_PUBLIC_APP_URL=https://app.authorspilot.com
NEXT_PUBLIC_SITE_URL=https://app.authorspilot.com
PUBLIC_SITE_URL=https://authorspilot.com
NEXT_PUBLIC_MARKETING_URL=https://authorspilot.com

NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY=...

DATABASE_URL=mongodb+srv://...
MONGODB_URI=mongodb+srv://...
PAYLOAD_SECRET=long-random-string

EMAIL_FROM=Authors Pilot <no-reply@authorspilot.com>
ADMIN_NOTIFICATION_EMAIL=hello@authorspilot.com
```

5. Deploy → Railway temporary URL milegi (e.g. `xxx.up.railway.app`)  
6. Test: `https://xxx.up.railway.app/publish/` open hona chahiye

### Render.com alternative

- New **Web Service** → root `apps/platform`  
- Build: `npm install && npm run build`  
- Start: `npm run start`  
- Same env vars

### Hostinger VPS (agar Node VPS hai)

```bash
cd apps/platform
npm ci
npm run build
NODE_ENV=production npm run start
# ya pm2: pm2 start npm --name authorspilot -- start
```

Nginx/Caddy se HTTPS + `app.authorspilot.com` proxy to `localhost:3001`.

---

## Step 2 — Domain: `app.authorspilot.com`

1. Railway/Render → **Custom Domain** → `app.authorspilot.com`  
2. DNS (Hostinger):

| Type | Name | Value |
|------|------|--------|
| CNAME | `app` | Railway/Render jo bole (e.g. `xxx.up.railway.app`) |

3. HTTPS green hone ka wait  
4. Firebase Auth → Authorized domains mein `app.authorspilot.com` add  
5. Confirm:

- `https://app.authorspilot.com/publish/`  
- `https://app.authorspilot.com/publish/start` → `/dashboard/books/new`  
- `https://app.authorspilot.com/bookstore/`

---

## Step 3 — Marketing links Node pe point karo

Jab Step 2 **200** de, tab marketing rebuild:

`.env.production` (repo root):

```env
NEXT_PUBLIC_SITE_URL=https://authorspilot.com
NEXT_PUBLIC_PLATFORM_URL=https://app.authorspilot.com
```

Phir:

```bash
npm run build
```

Naya `out/` Hostinger pe upload. Ab:

- Publish / BookStore / Submit → `app.authorspilot.com/...`  
- Home / Services / Blog → `authorspilot.com` (static)

---

## Step 4 — Smoke test

- [ ] `app.authorspilot.com/publish/` = green landing  
- [ ] Submit Your Book → book details form  
- [ ] Marketing site Publish nav → app subdomain (404 nahi)  
- [ ] `authorspilot.com` marketing pages pehle jaisi

---

## “Ek hi domain” baad mein (optional)

Jab Node stable ho, Cloudflare/Nginx se:

- `authorspilot.com/publish` → platform  
- `authorspilot.com/dashboard` → platform  
- baaki → Hostinger static  

Ya poori marketing ko bhi Node pe merge — alag project.

---

## Ab tum kya karo (checklist)

1. Firebase + Mongo keys ready karo  
2. Railway pe `apps/platform` deploy  
3. `app.authorspilot.com` CNAME  
4. Test publish/dashboard  
5. Bolo “platform live hai” → marketing `.env.production` + rebuild + `out/` upload  

Detail / security: `apps/platform/DEPLOY.md`
