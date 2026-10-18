-- Authors Pilot Platform — Phase 1 schema
-- Run in Supabase SQL Editor (or via supabase db push)
-- Authors keep 100% of book earnings. No royalty ledger. No platform checkout.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
create type public.user_role as enum ('author', 'admin');
create type public.book_status as enum (
  'draft',
  'pending_review',
  'changes_requested',
  'published',
  'rejected',
  'unpublished'
);
create type public.sales_link_type as enum (
  'author_website',
  'amazon',
  'facebook',
  'instagram',
  'whatsapp',
  'other'
);
create type public.report_status as enum ('open', 'reviewing', 'resolved', 'dismissed');

-- ---------------------------------------------------------------------------
-- Profiles (1:1 with auth.users)
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role public.user_role not null default 'author',
  email text,
  display_name text,
  slug text unique,
  bio text,
  avatar_path text,
  website_url text,
  has_author_website boolean not null default false,
  social_facebook text,
  social_instagram text,
  social_twitter text,
  social_linkedin text,
  social_whatsapp text,
  is_public boolean not null default true,
  profile_complete boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_slug_format check (
    slug is null or slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'
  )
);

create index profiles_slug_idx on public.profiles (slug);
create index profiles_role_idx on public.profiles (role);

-- ---------------------------------------------------------------------------
-- Genres
-- ---------------------------------------------------------------------------
create table public.genres (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null unique,
  description text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

insert into public.genres (slug, name, description, sort_order) values
  ('fiction', 'Fiction', 'Novels and imaginative storytelling.', 1),
  ('non-fiction', 'Non-Fiction', 'Fact-based writing and memoirs.', 2),
  ('romance', 'Romance', 'Love stories and relationships.', 3),
  ('mystery-thriller', 'Mystery & Thriller', 'Suspense, crime, and intrigue.', 4),
  ('fantasy', 'Fantasy', 'Magic, myth, and other worlds.', 5),
  ('science-fiction', 'Science Fiction', 'Future tech and speculative worlds.', 6),
  ('children', 'Children', 'Books for young readers.', 7),
  ('young-adult', 'Young Adult', 'Stories for teens and young adults.', 8),
  ('poetry', 'Poetry', 'Verse and poetic collections.', 9),
  ('self-help', 'Self-Help', 'Personal growth and practical guidance.', 10),
  ('business', 'Business', 'Entrepreneurship and professional topics.', 11),
  ('religion-spirituality', 'Religion & Spirituality', 'Faith, belief, and spiritual practice.', 12),
  ('history', 'History', 'Historical accounts and analysis.', 13),
  ('biography', 'Biography', 'Lives of notable people.', 14),
  ('other', 'Other', 'Works that do not fit other genres.', 99);

-- ---------------------------------------------------------------------------
-- Books
-- ---------------------------------------------------------------------------
create table public.books (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  subtitle text,
  slug text not null unique,
  description text not null default '',
  author_display_name text not null,
  genre_id uuid references public.genres (id),
  language text not null default 'en',
  publication_date date,
  cover_path text,
  manuscript_path text,
  manuscript_filename text,
  manuscript_mime text,
  manuscript_size_bytes bigint,
  status public.book_status not null default 'draft',
  rights_confirmed boolean not null default false,
  content_policy_accepted boolean not null default false,
  primary_sales_link_id uuid,
  admin_notes text,
  rejection_reason text,
  changes_requested_reason text,
  published_at timestamptz,
  submitted_at timestamptz,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint books_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint books_title_len check (char_length(title) between 1 and 200)
);

create index books_author_id_idx on public.books (author_id);
create index books_status_idx on public.books (status);
create index books_genre_id_idx on public.books (genre_id);
create index books_published_at_idx on public.books (published_at desc);

-- ---------------------------------------------------------------------------
-- Sales links (external destinations only — no platform checkout)
-- ---------------------------------------------------------------------------
create table public.sales_links (
  id uuid primary key default gen_random_uuid(),
  book_id uuid not null references public.books (id) on delete cascade,
  link_type public.sales_link_type not null default 'other',
  label text not null,
  url text not null,
  is_active boolean not null default true,
  is_primary boolean not null default false,
  display_order int not null default 0,
  click_count bigint not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint sales_links_url_http check (url ~* '^https?://')
);

create index sales_links_book_id_idx on public.sales_links (book_id);

alter table public.books
  add constraint books_primary_sales_link_fk
  foreign key (primary_sales_link_id) references public.sales_links (id)
  on delete set null;

-- ---------------------------------------------------------------------------
-- Book status history (audit trail for review workflow)
-- ---------------------------------------------------------------------------
create table public.book_status_events (
  id uuid primary key default gen_random_uuid(),
  book_id uuid not null references public.books (id) on delete cascade,
  actor_id uuid references public.profiles (id) on delete set null,
  from_status public.book_status,
  to_status public.book_status not null,
  note text,
  created_at timestamptz not null default now()
);

create index book_status_events_book_id_idx on public.book_status_events (book_id);

-- ---------------------------------------------------------------------------
-- Content reports
-- ---------------------------------------------------------------------------
create table public.content_reports (
  id uuid primary key default gen_random_uuid(),
  book_id uuid not null references public.books (id) on delete cascade,
  reporter_email text,
  reporter_user_id uuid references public.profiles (id) on delete set null,
  reason text not null,
  details text,
  status public.report_status not null default 'open',
  admin_notes text,
  resolved_by uuid references public.profiles (id) on delete set null,
  resolved_at timestamptz,
  created_at timestamptz not null default now()
);

create index content_reports_status_idx on public.content_reports (status);

-- ---------------------------------------------------------------------------
-- Admin audit log
-- ---------------------------------------------------------------------------
create table public.admin_audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles (id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index admin_audit_log_created_at_idx on public.admin_audit_log (created_at desc);

-- ---------------------------------------------------------------------------
-- Outbound click analytics (NOT sales / NOT revenue)
-- ---------------------------------------------------------------------------
create table public.outbound_clicks (
  id uuid primary key default gen_random_uuid(),
  sales_link_id uuid not null references public.sales_links (id) on delete cascade,
  book_id uuid not null references public.books (id) on delete cascade,
  created_at timestamptz not null default now()
);

create index outbound_clicks_book_id_idx on public.outbound_clicks (book_id);

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger books_updated_at
  before update on public.books
  for each row execute function public.set_updated_at();

create trigger sales_links_updated_at
  before update on public.sales_links
  for each row execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  base_slug text;
  final_slug text;
  n int := 0;
begin
  base_slug := lower(regexp_replace(
    coalesce(
      nullif(trim(new.raw_user_meta_data->>'display_name'), ''),
      split_part(new.email, '@', 1),
      'author'
    ),
    '[^a-z0-9]+', '-', 'g'
  ));
  base_slug := trim(both '-' from base_slug);
  if base_slug = '' then
    base_slug := 'author';
  end if;
  final_slug := base_slug;
  while exists (select 1 from public.profiles where slug = final_slug) loop
    n := n + 1;
    final_slug := base_slug || '-' || n::text;
  end loop;

  insert into public.profiles (id, email, display_name, slug, role)
  values (
    new.id,
    new.email,
    coalesce(nullif(trim(new.raw_user_meta_data->>'display_name'), ''), split_part(new.email, '@', 1)),
    final_slug,
    'author'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Prevent non-admins from elevating their own role
create or replace function public.protect_profile_role()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role is distinct from old.role then
    if not public.is_admin() then
      raise exception 'Only administrators can change roles';
    end if;
  end if;
  return new;
end;
$$;

create trigger profiles_protect_role
  before update on public.profiles
  for each row execute function public.protect_profile_role();

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.genres enable row level security;
alter table public.books enable row level security;
alter table public.sales_links enable row level security;
alter table public.book_status_events enable row level security;
alter table public.content_reports enable row level security;
alter table public.admin_audit_log enable row level security;
alter table public.outbound_clicks enable row level security;

-- Profiles
create policy "Public profiles are viewable"
  on public.profiles for select
  using (
    is_public = true
    or id = auth.uid()
    or public.is_admin()
  );

create policy "Users update own profile"
  on public.profiles for update
  using (id = auth.uid() or public.is_admin())
  with check (id = auth.uid() or public.is_admin());

create policy "Admins insert profiles"
  on public.profiles for insert
  with check (id = auth.uid() or public.is_admin());

-- Genres (public read)
create policy "Genres are public"
  on public.genres for select
  using (true);

create policy "Admins manage genres"
  on public.genres for all
  using (public.is_admin())
  with check (public.is_admin());

-- Books
create policy "Published books are public"
  on public.books for select
  using (
    (status = 'published' and is_public = true)
    or author_id = auth.uid()
    or public.is_admin()
  );

create policy "Authors insert own books"
  on public.books for insert
  with check (author_id = auth.uid());

create policy "Authors update own editable books"
  on public.books for update
  using (
    public.is_admin()
    or (
      author_id = auth.uid()
      and status in ('draft', 'changes_requested', 'rejected', 'unpublished')
    )
  )
  with check (
    public.is_admin()
    or author_id = auth.uid()
  );

create policy "Authors delete own drafts"
  on public.books for delete
  using (
    public.is_admin()
    or (author_id = auth.uid() and status = 'draft')
  );

-- Sales links
create policy "Sales links visible with book"
  on public.sales_links for select
  using (
    exists (
      select 1 from public.books b
      where b.id = book_id
        and (
          (b.status = 'published' and b.is_public = true and is_active = true)
          or b.author_id = auth.uid()
          or public.is_admin()
        )
    )
  );

create policy "Authors manage own sales links"
  on public.sales_links for insert
  with check (
    exists (
      select 1 from public.books b
      where b.id = book_id and (b.author_id = auth.uid() or public.is_admin())
    )
  );

create policy "Authors update own sales links"
  on public.sales_links for update
  using (
    exists (
      select 1 from public.books b
      where b.id = book_id and (b.author_id = auth.uid() or public.is_admin())
    )
  );

create policy "Authors delete own sales links"
  on public.sales_links for delete
  using (
    exists (
      select 1 from public.books b
      where b.id = book_id and (b.author_id = auth.uid() or public.is_admin())
    )
  );

-- Status events
create policy "Authors read own book events"
  on public.book_status_events for select
  using (
    public.is_admin()
    or exists (
      select 1 from public.books b
      where b.id = book_id and b.author_id = auth.uid()
    )
  );

create policy "Admins insert status events"
  on public.book_status_events for insert
  with check (public.is_admin() or actor_id = auth.uid());

-- Content reports
create policy "Anyone can file a report"
  on public.content_reports for insert
  with check (true);

create policy "Admins manage reports"
  on public.content_reports for select
  using (public.is_admin() or reporter_user_id = auth.uid());

create policy "Admins update reports"
  on public.content_reports for update
  using (public.is_admin());

-- Audit log (admin only)
create policy "Admins read audit log"
  on public.admin_audit_log for select
  using (public.is_admin());

create policy "Admins insert audit log"
  on public.admin_audit_log for insert
  with check (public.is_admin());

-- Outbound clicks (insert public, read admin/author)
create policy "Anyone can record outbound clicks"
  on public.outbound_clicks for insert
  with check (true);

create policy "Authors and admins read click analytics"
  on public.outbound_clicks for select
  using (
    public.is_admin()
    or exists (
      select 1 from public.books b
      where b.id = book_id and b.author_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- Storage buckets
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  (
    'book-covers',
    'book-covers',
    true,
    5242880,
    array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  ),
  (
    'manuscripts',
    'manuscripts',
    false,
    26214400,
    array[
      'application/pdf',
      'application/epub+zip',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ]
  ),
  (
    'avatars',
    'avatars',
    true,
    2097152,
    array['image/jpeg', 'image/png', 'image/webp']
  )
on conflict (id) do nothing;

-- Cover policies: public read for published path convention; authors upload to own folder
create policy "Public read book covers"
  on storage.objects for select
  using (bucket_id = 'book-covers');

create policy "Authors upload covers to own folder"
  on storage.objects for insert
  with check (
    bucket_id = 'book-covers'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Authors update own covers"
  on storage.objects for update
  using (
    bucket_id = 'book-covers'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Authors delete own covers"
  on storage.objects for delete
  using (
    bucket_id = 'book-covers'
    and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin())
  );

-- Manuscripts: private — owner or admin only
create policy "Authors read own manuscripts"
  on storage.objects for select
  using (
    bucket_id = 'manuscripts'
    and (
      (storage.foldername(name))[1] = auth.uid()::text
      or public.is_admin()
    )
  );

create policy "Authors upload manuscripts to own folder"
  on storage.objects for insert
  with check (
    bucket_id = 'manuscripts'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Authors update own manuscripts"
  on storage.objects for update
  using (
    bucket_id = 'manuscripts'
    and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin())
  );

create policy "Authors delete own manuscripts"
  on storage.objects for delete
  using (
    bucket_id = 'manuscripts'
    and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin())
  );

-- Avatars
create policy "Public read avatars"
  on storage.objects for select
  using (bucket_id = 'avatars');

create policy "Users upload own avatar"
  on storage.objects for insert
  with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users update own avatar"
  on storage.objects for update
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users delete own avatar"
  on storage.objects for delete
  using (
    bucket_id = 'avatars'
    and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin())
  );

-- ---------------------------------------------------------------------------
-- Promote first admin (run manually after signup):
-- update public.profiles set role = 'admin' where email = 'you@example.com';
-- ---------------------------------------------------------------------------
