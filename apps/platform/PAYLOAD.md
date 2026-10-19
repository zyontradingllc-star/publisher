# Payload CMS + MongoDB (Book Submissions)

## What was wired

Existing **Book Details** form (unchanged UI):

- Page: `src/app/dashboard/books/new/page.tsx`
- Form: `src/components/forms/PublishBookDetailsForm.tsx`
- Action: `savePublishDetailsAction` in `src/app/actions/publish-book.ts`

On submit → creates a **Book Submissions** document in Payload/Mongo with `status: pending`.

## Admin

- URL: **http://localhost:3001/cms** (not `/admin` — that remains the Firebase ops UI)
- Collection: **Book Submissions**
- List columns: title, author, email, status, submitted date
- Status actions: Pending → Under Review → Request Changes → **Approve** / Reject

**Approve** finds/creates an **Author** by email, creates a published **Book**, links Author ↔ Book, and keeps the submission as an audit record.

## Env

```env
DATABASE_URL=mongodb://127.0.0.1:27017/authorspilot
PAYLOAD_SECRET=replace-with-a-long-random-string
```

See `.env.example`.

## First-time CMS login

1. Start MongoDB
2. `npm run dev` in `apps/platform`
3. Open `/cms` and create the first admin user
4. Submit a book via **Submit Your Book** → `/publish`
5. In CMS, open the submission → set status to **Approved**

## Public URLs after approve

- `/authors/[slug]`
- `/books/[slug]`
- `/books` bookstore catalog
