# Authors Pilot — Publishing Platform

Self-publishing and book-discovery application for **Authors Pilot**.

| | |
|---|---|
| Platform (this app) | `apps/platform` → intended **https://app.authorspilot.com** |
| Marketing website | Repository root → **https://www.authorspilot.com** (static Hostinger export) |

This app does **not** process book payments, take royalties, or run Phase‑1 billing.

## Product rules (non-negotiable)

1. Authors sell through **their own websites / external retailers**. Purchase CTAs redirect off-platform.
2. Authors keep **100% of book earnings** from those sales (subject to their own processors). No royalty ledger, no sales commission.
3. Outbound clicks and page views are **analytics only** — never labeled as sales or revenue.
4. Phase 1: **Free Access During Launch / Paid Plans Coming Soon** — no subscriptions or checkout.
5. Author Website Design CTA is optional and **never blocks publishing**.

## Install & run — marketing site (repo root)

```bash
# from repository root
npm install
npm run dev      # marketing site
npm run build    # static export (unchanged)
```

## Install & run — platform (`apps/platform`)

```bash
cd apps/platform
cp .env.example .env.local
# fill Supabase keys (see below)
npm install
npm run dev          # http://localhost:3001
npm run test
npm run typecheck
npm run build
npm run start
```

## Configure Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. **SQL → run migrations in order:**
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_activity_and_status_guards.sql`
3. Confirm storage buckets: `book-covers` (public), `manuscripts` (private), `avatars` (public). Policies are included in `001`.
4. **Authentication → Providers:** enable Email.
5. **Authentication → URL configuration:**
   - Site URL: `http://localhost:3001` (dev) or `https://app.authorspilot.com` (prod)
   - Redirect URLs allowlist:  
     `http://localhost:3001/**`  
     `https://app.authorspilot.com/**`
6. Email verification & password reset use Supabase Auth’s configured email provider (or custom SMTP in Supabase settings).

### Assign the first administrator (secure)

After you sign up once via the app:

```sql
update public.profiles
set role = 'admin'
where email = 'your-admin@example.com';
```

Only run this in the SQL editor (or with the service role). The app and RLS prevent authors from elevating themselves.

## Environment variables

See `.env.example`. Required for a working auth/data path:

| Variable | Where | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Supabase API URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | Anon / publishable key |
| `SUPABASE_SERVICE_ROLE_KEY` | **Server only** | Signed manuscript URLs, privileged admin ops |
| `NEXT_PUBLIC_APP_URL` / `NEXT_PUBLIC_SITE_URL` | Public | Platform base URL (callbacks, emails) |
| `PUBLIC_SITE_URL` / `NEXT_PUBLIC_MARKETING_URL` | Public | Marketing site links |
| `RESEND_API_KEY` + `EMAIL_FROM` | **Server only** | Optional transactional mail |
| `ADMIN_NOTIFICATION_EMAIL` | Server | New-submission alerts |

When email is unset, the app **skips** sending and logs that delivery was skipped — it does not claim messages were delivered.

## Email notifications

| Event | Channel |
|---|---|
| Email verification | Supabase Auth |
| Password reset | Supabase Auth |
| Book submitted | Resend → author + admin (if configured) |
| Approved / changes requested / rejected / unpublished | Resend → author |

Sender identity: set `EMAIL_FROM` (e.g. `Authors Pilot <noreply@your-verified-domain>`). Verify the domain in Resend before production.

## Publication statuses

`draft` → `pending_review` → (`published` \| `changes_requested` \| `rejected`)  
`published` → `unpublished` / `changes_requested`  
`unpublished` / `changes_requested` / `rejected` can return to review when rules allow.

Authors **cannot** publish. Admins approve. Unpublished listings leave public catalog queries.

**Published core details** (title, description, cover, manuscript, etc.) are locked for authors until an admin unpublishes or requests changes. Sales links may still be updated.

## Activity (Phase 1)

Persisted events: book views, author profile views, outbound sales-link clicks, Website Design CTA clicks.  
Authors view totals for **their own** books/profile under `/dashboard/activity`. No fabricated revenue.

## Deploy the platform

1. Host on a **Node** platform (Vercel, Railway, Render, Fly, etc.) with root directory `apps/platform`.
2. Set all env vars from `.env.example`.
3. Build: `npm run build` · Start: `npm run start` (or host default).
4. Confirm the deploy URL works (signup, submit, admin approve, public `/books`).

### Connect `app.authorspilot.com` (manual DNS)

Do **not** change production DNS until you are ready:

1. Create DNS CNAME/A for `app` → your host.
2. Attach the domain + HTTPS in the host dashboard.
3. Update Supabase Auth Site URL + redirects.
4. Set `NEXT_PUBLIC_APP_URL=https://app.authorspilot.com` and redeploy.

The marketing site on Hostinger stays on its current DNS. This repo does not automate DNS changes and does not claim the platform is live until you verify a successful deploy.

Full checklist: **[DEPLOY.md](./DEPLOY.md)** · Security notes: **[SECURITY.md](./SECURITY.md)**

## Tests & production build

```bash
npm run test         # Vitest unit tests
npm run typecheck    # TypeScript
npm run build        # Next.js production build
```

## Test the deployed application

- [ ] Sign up, verify email, log in / out, password reset
- [ ] Complete profile (website Yes/No does not block publishing)
- [ ] Create draft → cover → sales link → submit
- [ ] Admin: approve / request changes / reject / unpublish
- [ ] Published book on `/books` and `/books/[slug]`; purchase CTA opens **external** URL
- [ ] Activity shows views/clicks without calling them sales
- [ ] Non-admin blocked from `/admin`
- [ ] Manuscript private (admin signed URL only)
- [ ] Website Design CTA opens marketing URL in a new tab

## Stack

Next.js App Router · TypeScript · Tailwind · Supabase Auth / Postgres / Storage · Resend (optional)
