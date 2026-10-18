# Security review — Authors Pilot Platform (Phase 1)

This document records the security posture of `apps/platform`. Being logged in is **not** sufficient authorization; server actions, middleware, RLS, and storage policies must agree.

## Authentication & sessions

| Control | Status |
|---|---|
| Supabase Auth for email/password | Implemented |
| Passwords never stored in app tables | Yes — Auth only |
| Session refresh via middleware cookies | Implemented |
| Protected `/dashboard` and `/admin` routes | Middleware + `requireProfile` / `requireAdmin` |
| Expired / missing session redirects to login | Yes |

## Authorization

| Control | Status |
|---|---|
| Role stored on `profiles.role` | Yes (`author` \| `admin`) |
| Authors cannot self-assign admin | DB trigger `protect_profile_role` + app never exposes role editor |
| Authors cannot approve/publish own books | App `canTransition(..., asAdmin)` + DB trigger `enforce_book_status_transition` |
| Authors only mutate own books | Server actions filter `author_id` + RLS |
| Admin APIs check role server-side | `requireAdmin()` on admin actions |
| UI hiding is not the security boundary | Documented; DB/RLS enforce |

## Publication workflow

Valid transitions are enforced in TypeScript (`status-transitions.ts`) and Postgres (`is_valid_book_status_transition`). Books stay private until `status = published` and `is_public = true`. Catalog queries filter both. Unpublished books leave the catalog (`is_public = false`).

**Published core edits:** authors cannot change title/description/cover/manuscript while published (DB trigger + app editable-status checks). Sales links may still be updated. Important metadata changes require admin unpublish or `changes_requested`.

## Row Level Security

- Public read: published + public books; public profiles; genres; active sales links on published books.
- Authors: own profile/books/events/analytics.
- Manuscripts: private storage bucket; owner or admin; signed URLs for admin download.
- `is_admin()` is `SECURITY DEFINER` with fixed `search_path` to avoid recursive RLS.
- Anonymous users cannot update books; view/click inserts are append-only with checks that the book/profile is public where applicable.

## Storage & uploads

| Control | Status |
|---|---|
| MIME + extension allowlists | Covers, manuscripts, avatars |
| Configurable max sizes | `MAX_COVER_BYTES` / `MAX_MANUSCRIPT_BYTES` |
| Safe storage paths (`{userId}/…`) | Yes — not user-supplied path traversal |
| Private manuscripts | Non-public bucket |
| Malware scanning | **Not implemented** — treat uploads as untrusted |

## External URLs & XSS

- Sales links and social URLs validated as `http`/`https` only (Zod + DB check).
- Outbound click redirect verifies link belongs to book and URL matches stored value.
- Website Design CTA opens a fixed marketing URL (not client-supplied).
- Email HTML escapes user-provided titles/notes.
- React escapes text by default; no `dangerouslySetInnerHTML` on user content.

## Secrets & env

- `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY` are server-only.
- Never prefixed with `NEXT_PUBLIC_`.
- `.env.example` contains placeholders only.
- Email send logs subject/recipient locally but not API keys; skipped sends are logged as skipped (not “delivered”).

## Abuse & privacy

- Activity events store minimal non-sensitive fields (IDs, timestamps, optional referrer host).
- Authors see only their own activity; admins can see broader sets via RLS.
- Query limits on activity aggregation (bounded selects).
- Content reports for copyright/policy complaints.
- Admin audit log for review actions.

## Residual risks / follow-ups

1. Configure Supabase Auth rate limits and CAPTCHA for production signup.
2. Add WAF / edge rate limits for public view & report endpoints.
3. Optional ClamAV or vendor malware scan for manuscripts.
4. Rotate service-role key if ever exposed.
5. Legal review of draft privacy/terms pages before claiming compliance.

**Do not claim the platform is production-hardened solely because authentication works.** Re-verify RLS in the Supabase dashboard after each migration.
