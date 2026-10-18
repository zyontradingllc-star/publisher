# Authors Pilot Platform — Deployment Guide

The publishing platform lives in `apps/platform` and is intended for **https://app.authorspilot.com**.

The marketing website at the repository root stays on its current Hostinger static-export hosting (**https://www.authorspilot.com**). Do not change production DNS or proxy settings until you are ready.

## Architecture

| Surface | Path | Runtime | Host |
|---|---|---|---|
| Marketing site | repo root | Static export (`output: "export"`) + PHP mail | Current Hostinger |
| Publishing platform | `apps/platform` | Next.js Node server | Managed Node host (Vercel, Railway, Render, etc.) |

Business rules enforced in product copy and workflows:

- Authors sell through **their own websites / external retailers**.
- Authors keep **100% of book earnings** from those sales (no royalty ledger, no platform checkout).
- Phase 1: **Free Access During Launch / Paid Plans Coming Soon** — no billing code.
- Author Website Design CTA is **optional and non-blocking**.

## 1. Create a Supabase project

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** and run migrations **in order**:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_activity_and_status_guards.sql`
3. Confirm storage buckets exist: `book-covers` (public), `manuscripts` (private), `avatars` (public).
4. Authentication → Providers → enable **Email**.
5. Authentication → URL configuration:
   - Site URL: `https://app.authorspilot.com` (or your staging URL)
   - Redirect URLs:  
     `https://app.authorspilot.com/**`  
     `http://localhost:3001/**`
6. Promote your first admin after signup:

```sql
update public.profiles
set role = 'admin'
where email = 'your-admin@example.com';
```

Only database admins (or the service role) should change `role`. Client updates cannot self-promote because of the `protect_profile_role` trigger and RLS.

## 2. Environment variables

Copy `apps/platform/.env.example` to `apps/platform/.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://app.authorspilot.com
NEXT_PUBLIC_MARKETING_URL=https://www.authorspilot.com
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...   # server only — never expose to the browser
RESEND_API_KEY=...              # optional in Phase 1
RESEND_FROM_EMAIL=Authors Pilot <noreply@your-verified-domain>
ADMIN_NOTIFICATION_EMAIL=admin@authorspilot.com
MAX_COVER_BYTES=5242880
MAX_MANUSCRIPT_BYTES=26214400
```

### Remaining setup that requires external credentials

| Requirement | Status without credentials |
|---|---|
| Supabase Auth / Postgres / Storage | App builds; auth & data need project keys |
| Resend (or SMTP) transactional email | Notifications are skipped when unset |
| Production DNS for `app.authorspilot.com` | Documented below — do not auto-change |
| Custom email domain verification | Required for reliable auth/reset emails |
| Malware scanning of manuscripts | **Not implemented in Phase 1** — document limitation to authors/admins |

## 3. Local development

```bash
cd apps/platform
cp .env.example .env.local
# fill Supabase keys
npm install
npm run dev          # http://localhost:3001
npm run test
npm run typecheck
npm run build
```

Marketing site remains independently runnable from the repo root:

```bash
# from repo root
npm run dev          # marketing site
npm run build        # static export unchanged
```

## 4. Deploy the platform (Node host)

Recommended: Vercel / Railway / Render / Fly.io with Node runtime.

1. Set Root Directory to `apps/platform` (or deploy from that folder).
2. Build command: `npm run build`
3. Start command: `npm run start` (or platform default for Next.js)
4. Add all env vars from `.env.example`.
5. Deploy and confirm `https://YOUR_PLATFORM_URL/`.

### Connect `app.authorspilot.com` (manual DNS — do not automate)

When credentials and DNS access are available:

1. In your DNS provider, create a **CNAME** (or A/AAAA per host docs) for `app` → your platform host.
2. Attach the custom domain in the hosting dashboard and enable HTTPS.
3. Update Supabase Auth Site URL + redirect allowlist to `https://app.authorspilot.com`.
4. Update `NEXT_PUBLIC_SITE_URL` and redeploy.

**Do not** change apex/`www` Hostinger DNS for the marketing site as part of this deploy.

### Optional later: proxy public catalog onto the marketing domain

Public book/author pages currently live on the platform domain:

- `https://app.authorspilot.com/books/[slug]`
- `https://app.authorspilot.com/authors/[slug]`
- `https://app.authorspilot.com/genres/[slug]`

If you later want `www.authorspilot.com/books/...`, configure a reverse proxy or rewrite on Hostinger/Cloudflare. That is **out of Phase 1** and must be done manually.

## 5. Marketing site cross-links (manual, optional)

After the platform is live, you may add CTAs on the marketing site pointing to:

- `https://app.authorspilot.com/signup`
- `https://app.authorspilot.com/books`

Do not rewrite the marketing static export contract.

## 6. Smoke-test checklist

- [ ] Sign up → verify email → log in
- [ ] Complete author profile (slug, bio, website Yes/No)
- [ ] Create draft book → upload cover → optional manuscript → add external sales link
- [ ] Submit for review
- [ ] Admin: approve / request changes / reject
- [ ] Published book appears on `/books` and `/books/[slug]`
- [ ] Purchase CTA opens **external** URL (not platform checkout)
- [ ] Outbound click increments analytics (not labeled as a sale)
- [ ] Author Website Design CTA opens marketing service page in a new tab
- [ ] Non-admin cannot open `/admin`
- [ ] Manuscript remains private (signed URL for admin only)

## 7. Security notes

- Never put `SUPABASE_SERVICE_ROLE_KEY` in client bundles or public env.
- Manuscripts use a **private** bucket + short-lived signed URLs.
- Role elevation is blocked for non-admins in the database trigger.
- Phase 1 does **not** include antivirus/malware scanning of uploads — treat manuscripts as untrusted binaries and open only in controlled environments.
