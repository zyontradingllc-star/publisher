# Deploy checkpoint — save for tomorrow (2026-10-20)

## Done today

### Marketing (Hostinger / `out/`)
- Publish landing = platform-style green page (`/publish/`)
- Submit form = `/publish/start/`
- BookStore Coming Soon = `/bookstore/`
- Dashboard URLs on static → redirect to publish wizard (no 404)
- `NEXT_PUBLIC_PLATFORM_URL` empty until `app.authorspilot.com` is live
- Fresh `npm run build` → upload **`out/`** to Hostinger when ready

### Local
- `npm run dev:all` → marketing `:3000` proxies platform `:3001`
- Real form: `http://localhost:3000/dashboard/books/new/` (via proxy)

### Railway
- **MongoDB service:** Active / Deployment successful
- **Platform Next.js service:** NOT created yet (next step)

### Firebase
- Project: **Authors Pilot** (`authors-pilot`)
- Web config exists; local `apps/platform/.env.local` already has Firebase + Mongo keys

### Docs / files added
- `docs/NODE-DEPLOY-OPTION-B.md` — full Node deploy guide
- `apps/platform/Dockerfile` — for Railway
- `docs/DEPLOY-CHECKPOINT.md` — this file

---

## Architecture (remember)

| App | Where | Live |
|-----|--------|------|
| Marketing | repo root → `out/` | Hostinger `authorspilot.com` |
| Platform | `apps/platform` Node | Railway → `app.authorspilot.com` (pending) |

Static `out/` alone **cannot** run real `/dashboard/books/new/`.

---

## Tomorrow — do this first

1. Railway project → **+ Create** → **GitHub Repo**
2. Root Directory: **`apps/platform`**
3. Dockerfile
4. Variables on that **new** service:

```env
DATABASE_URL=${{MongoDB.MONGO_PRIVATE_URL}}
MONGODB_URI=${{MongoDB.MONGO_PRIVATE_URL}}
PAYLOAD_SECRET=<long-random-string>
NEXT_PUBLIC_SITE_URL=https://app.authorspilot.com
NEXT_PUBLIC_APP_URL=https://app.authorspilot.com
NEXT_PUBLIC_MARKETING_URL=https://authorspilot.com
```

Plus copy from `apps/platform/.env.local`:
- all `NEXT_PUBLIC_FIREBASE_*`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

5. Deploy → open Railway URL `/publish/`
6. DNS: CNAME `app` → Railway domain → `https://app.authorspilot.com`
7. When app.* returns 200:
   - set root `.env.production` → `NEXT_PUBLIC_PLATFORM_URL=https://app.authorspilot.com`
   - `npm run build` → upload new `out/` to Hostinger

---

## Do not

- Expect dashboard inside Hostinger `out/` alone
- Put `localhost:3001` in production env
- Share Firebase private key / Mongo password in chat
- Enable Mongo HA yet (extra cost)

---

## Quick test after tomorrow deploy

- [ ] `app.authorspilot.com/publish/`
- [ ] Submit → `/dashboard/books/new`
- [ ] Marketing Publish nav → app subdomain
