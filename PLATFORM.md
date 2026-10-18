# Dual deploy overview

This repository contains two independently buildable surfaces:

1. **Marketing website** (repository root) — static Next.js export for Hostinger (`output: "export"`). Production: https://www.authorspilot.com
2. **Publishing platform** (`apps/platform`) — Next.js App Router with Supabase Auth/DB/Storage. Intended production: https://app.authorspilot.com

Do not treat `/live`, `/publish`, or `/store` marketing prototypes as production data sources.

- Platform setup: [`apps/platform/README.md`](./apps/platform/README.md)
- Deploy checklist: [`apps/platform/DEPLOY.md`](./apps/platform/DEPLOY.md)
- Security review: [`apps/platform/SECURITY.md`](./apps/platform/SECURITY.md)

DNS for `app.authorspilot.com` is documented but **not** changed by this repository.
