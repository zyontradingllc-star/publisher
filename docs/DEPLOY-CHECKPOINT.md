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

## Next — Render (Railway currently paused / outage)

1. [Render](https://dashboard.render.com) → **New** → **Blueprint** → repo `zyontradingllc-star/publisher`
2. Uses root `render.yaml` → service `authorspilot-platform` (`apps/platform` + Dockerfile)
3. Paste secrets from `apps/platform/.env.local` (Atlas Mongo + Firebase)
4. Deploy → open `*.onrender.com/publish/`
5. Custom domain `app.authorspilot.com` + Hostinger CNAME `app`
6. When app.* returns 200:
   - set root `.env.production` → `NEXT_PUBLIC_PLATFORM_URL=https://app.authorspilot.com`
   - `npm run build` → upload new `out/` to Hostinger

### Railway (backup only)

Same app: root `apps/platform`, Dockerfile, Mongo `${{MongoDB.MONGO_PRIVATE_URL}}` **or** Atlas URI from `.env.local`.

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
