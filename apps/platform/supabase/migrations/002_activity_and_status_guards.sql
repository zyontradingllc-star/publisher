-- Phase 1 additions: activity events + publication status transition guards
-- Authors Pilot: clicks are NOT sales. No royalty ledger.

-- ---------------------------------------------------------------------------
-- Book page views (public catalog analytics — not sales)
-- ---------------------------------------------------------------------------
create table public.book_views (
  id uuid primary key default gen_random_uuid(),
  book_id uuid not null references public.books (id) on delete cascade,
  viewed_at timestamptz not null default now(),
  referrer_host text,
  constraint book_views_referrer_host_len check (
    referrer_host is null or char_length(referrer_host) <= 120
  )
);

create index book_views_book_id_idx on public.book_views (book_id);
create index book_views_viewed_at_idx on public.book_views (viewed_at desc);

-- ---------------------------------------------------------------------------
-- Author profile views
-- ---------------------------------------------------------------------------
create table public.author_profile_views (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  viewed_at timestamptz not null default now(),
  referrer_host text,
  constraint author_profile_views_referrer_host_len check (
    referrer_host is null or char_length(referrer_host) <= 120
  )
);

create index author_profile_views_profile_id_idx on public.author_profile_views (profile_id);
create index author_profile_views_viewed_at_idx on public.author_profile_views (viewed_at desc);

-- ---------------------------------------------------------------------------
-- Marketing CTA clicks (Author Website Design) — not purchases
-- ---------------------------------------------------------------------------
create type public.cta_kind as enum ('author_website_design');

create table public.cta_clicks (
  id uuid primary key default gen_random_uuid(),
  cta_kind public.cta_kind not null default 'author_website_design',
  profile_id uuid references public.profiles (id) on delete set null,
  book_id uuid references public.books (id) on delete set null,
  source_path text,
  created_at timestamptz not null default now(),
  constraint cta_clicks_source_path_len check (
    source_path is null or char_length(source_path) <= 200
  )
);

create index cta_clicks_profile_id_idx on public.cta_clicks (profile_id);
create index cta_clicks_created_at_idx on public.cta_clicks (created_at desc);

-- ---------------------------------------------------------------------------
-- Enforce valid publication status transitions (DB-level; UI is not security)
-- ---------------------------------------------------------------------------
create or replace function public.is_valid_book_status_transition(
  from_status public.book_status,
  to_status public.book_status
)
returns boolean
language sql
immutable
as $$
  select case
    when from_status is null then to_status = 'draft'
    when from_status = to_status then true
    when from_status = 'draft' and to_status in ('pending_review') then true
    when from_status = 'pending_review' and to_status in ('published', 'changes_requested', 'rejected') then true
    when from_status = 'changes_requested' and to_status in ('pending_review', 'draft') then true
    when from_status = 'rejected' and to_status in ('draft', 'pending_review') then true
    when from_status = 'published' and to_status in ('unpublished', 'changes_requested') then true
    when from_status = 'unpublished' and to_status in ('pending_review', 'draft', 'published') then true
    else false
  end;
$$;

create or replace function public.enforce_book_status_transition()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'UPDATE' and new.status is distinct from old.status then
    if not public.is_valid_book_status_transition(old.status, new.status) then
      raise exception 'Invalid book status transition: % → %', old.status, new.status;
    end if;

    -- Authors must never self-publish. Only admins may move to published.
    if new.status = 'published' and not public.is_admin() then
      raise exception 'Only administrators may publish books';
    end if;

    -- Authors may submit for review from editable states; admins may also set status.
    if new.status = 'pending_review'
       and old.status in ('draft', 'changes_requested', 'rejected', 'unpublished')
       and not public.is_admin()
       and new.author_id <> auth.uid() then
      raise exception 'Not allowed to submit this book';
    end if;
  end if;

  -- Unpublish removes public catalog visibility
  if new.status = 'unpublished' then
    new.is_public := false;
  end if;

  if new.status = 'published' then
    new.is_public := true;
    if new.published_at is null then
      new.published_at := now();
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists books_enforce_status_transition on public.books;
create trigger books_enforce_status_transition
  before update of status on public.books
  for each row execute function public.enforce_book_status_transition();

-- ---------------------------------------------------------------------------
-- RLS for activity tables
-- ---------------------------------------------------------------------------
alter table public.book_views enable row level security;
alter table public.author_profile_views enable row level security;
alter table public.cta_clicks enable row level security;

-- Anyone may record a view of a published public book (abuse limited in app layer)
create policy "Insert book views for published books"
  on public.book_views for insert
  with check (
    exists (
      select 1 from public.books b
      where b.id = book_id
        and b.status = 'published'
        and b.is_public = true
    )
  );

create policy "Authors read own book views"
  on public.book_views for select
  using (
    public.is_admin()
    or exists (
      select 1 from public.books b
      where b.id = book_id and b.author_id = auth.uid()
    )
  );

create policy "Insert author profile views for public profiles"
  on public.author_profile_views for insert
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = profile_id and p.is_public = true
    )
  );

create policy "Authors read own profile views"
  on public.author_profile_views for select
  using (
    public.is_admin()
    or profile_id = auth.uid()
  );

create policy "Anyone may record CTA clicks"
  on public.cta_clicks for insert
  with check (true);

create policy "Authors read own CTA clicks"
  on public.cta_clicks for select
  using (
    public.is_admin()
    or profile_id = auth.uid()
  );

-- Prevent authors from updating published book core fields (status stays published)
-- Existing update policy already restricts edits by status; this hardens metadata.
create or replace function public.protect_published_book_core_fields()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if old.status = 'published'
     and new.status = 'published'
     and not public.is_admin() then
    if new.title is distinct from old.title
       or new.subtitle is distinct from old.subtitle
       or new.slug is distinct from old.slug
       or new.description is distinct from old.description
       or new.genre_id is distinct from old.genre_id
       or new.cover_path is distinct from old.cover_path
       or new.manuscript_path is distinct from old.manuscript_path
       or new.author_display_name is distinct from old.author_display_name then
      raise exception
        'Published book details cannot be changed by authors. Request unpublish or changes from an administrator.';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists books_protect_published_core on public.books;
create trigger books_protect_published_core
  before update on public.books
  for each row execute function public.protect_published_book_core_fields();

-- Allow authors to touch published rows for non-core fields (e.g. primary_sales_link_id).
-- Core metadata remains locked by protect_published_book_core_fields.
create policy "Authors update own published books non-core"
  on public.books for update
  using (author_id = auth.uid() and status = 'published')
  with check (author_id = auth.uid() and status = 'published');
