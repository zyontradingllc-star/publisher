# Dual deploy overview

This repository contains two surfaces that work together:

1. **Marketing website** (repository root) — Authors Pilot marketing site. Production: https://www.authorspilot.com
2. **Publishing platform** (`apps/platform`) — book submit / catalog / CMS. Production: https://app.authorspilot.com

**Local (one URL):** run `npm run dev:all` from the repo root.

- Open **http://localhost:3000** (marketing home)
- **Publish** → **http://localhost:3000/publish** (proxied to platform `:3001` via `src/middleware.ts`)
- Platform still listens on `:3001` internally; you do not need to open it in the browser

Do not treat `/live`, `/publish`, or `/store` marketing prototypes as production data sources.

- Platform setup: [`apps/platform/README.md`](./apps/platform/README.md)
- Deploy checklist: [`apps/platform/DEPLOY.md`](./apps/platform/DEPLOY.md)
- Security review: [`apps/platform/SECURITY.md`](./apps/platform/SECURITY.md)

DNS for `app.authorspilot.com` is documented but **not** changed by this repository.
